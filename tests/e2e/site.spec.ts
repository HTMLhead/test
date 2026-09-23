import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/masters",
  "/olive",
  "/partners",
  "/learning-method",
  "/about",
  "/missing-page",
];

for (const route of routes) {
  test(`renders ${route} without overflow, missing images or runtime errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(route);
    await expect(page.locator("main h1")).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    const broken = await page.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images.map(async (image) => {
          image.loading = "eager";
          await image.decode().catch(() => {});
        }),
      );
      return images
        .filter((image) => !image.naturalWidth)
        .map((image) => image.src);
    });
    expect(broken).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBe(true);
    if (route === "/missing-page")
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex, nofollow",
      );
    expect(errors).toEqual([]);
  });
}

test("internal navigation preserves document and browser history", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as Window & { spaMarker?: string }).spaMarker = "same-document";
  });
  if (page.viewportSize()!.width < 1200)
    await page.getByRole("button", { name: "메뉴 열기" }).click();
  await page
    .getByRole("navigation", {
      name:
        page.viewportSize()!.width < 1200 ? "모바일 주요 메뉴" : "주요 메뉴",
      exact: true,
    })
    .getByRole("link", { name: "회사 소개", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page).toHaveTitle("회사 소개 | 코드스쿼드");
  expect(
    await page.evaluate(
      () => (window as Window & { spaMarker?: string }).spaMarker,
    ),
  ).toBe("same-document");
  if (page.viewportSize()!.width < 1200)
    await expect(
      page.getByRole("button", { name: "메뉴 열기" }),
    ).toHaveAttribute("aria-expanded", "false");
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("link", { name: "우리의 교육 만나보기" }),
  ).toBeVisible();
  await page.goForward();
  await expect(page).toHaveURL(/\/about$/);
});

test("master tabs and history respond to pointer and keyboard", async ({
  page,
}) => {
  await page.goto("/about");
  const tabs = page.getByRole("tab");
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
  await tabs.nth(1).press("End");
  await expect(tabs.nth(3)).toBeFocused();
  await expect(tabs.nth(3)).toHaveAttribute("aria-selected", "true");
  const years = page
    .getByRole("navigation", { name: "연도별 교육 연혁" })
    .getByRole("button");
  await years.nth(1).click();
  await expect(years.nth(1)).toHaveAttribute("aria-current", "true");
});

test("FAQ remains interactive", async ({ page }) => {
  await page.goto("/olive");
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});

test("header menu supports keyboard dismissal", async ({ page }) => {
  await page.goto("/");
  if (page.viewportSize()!.width < 1200) {
    const trigger = page.getByRole("button", { name: "메뉴 열기" });
    await trigger.click();
    await expect(
      page.getByRole("navigation", { name: "모바일 주요 메뉴" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  } else {
    const trigger = page.getByRole("button", { name: "기업 교육" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  }
});

test("back navigation restores the previous scroll position", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "교육 이야기 이동" })
    .getByRole("button", { name: "B2B 교육으로 이동" })
    .click();
  const link = page.getByRole("link", { name: "기업 교육 알아보기" });
  await expect(link).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("[data-logo-story]")
        .evaluate((el) =>
          Number((el as HTMLElement).style.getPropertyValue("--center")),
        ),
    )
    .toBe(1);
  const previousY = await page.evaluate(() => window.scrollY);
  await link.click();
  await expect(page).toHaveURL(/\/partners$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect
    .poll(async () =>
      Math.abs((await page.evaluate(() => window.scrollY)) - previousY),
    )
    .toBeLessThan(3);
});
