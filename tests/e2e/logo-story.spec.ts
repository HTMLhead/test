import { test, expect } from "@playwright/test";

test("logo colors follow each chapter and reverse with scrolling", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const story = page.locator("[data-logo-story]");
  const moveTo = async (progress: number) => {
    await story.evaluate((element, p) => {
      window.scrollTo(
        0,
        element.getBoundingClientRect().top +
          window.scrollY +
          (((element as HTMLElement).offsetHeight - window.innerHeight) * p) /
            4.8,
      );
    }, progress);
  };
  const value = (name: string) =>
    story.evaluate(
      (el, key) => Number((el as HTMLElement).style.getPropertyValue(key)),
      name,
    );
  const logo = story.locator("svg").locator("..");
  await expect(logo).toHaveCSS("opacity", "0.4");
  for (const [p, scene, part] of [
    [1.3, "ax", "dots"],
    [2.35, "b2b", "center"],
    [3.45, "lucas", "outer"],
    [4.55, "codesquad", "complete"],
    [3.45, "lucas", "outer"],
    [2.35, "b2b", "center"],
    [1.3, "ax", "dots"],
  ] as const) {
    await moveTo(p);
    await expect(story).toHaveAttribute("data-scene", scene);
    await expect(logo).toHaveCSS("opacity", "1");
    const order = ["dots", "center", "outer", "complete"];
    for (const key of order) {
      await expect
        .poll(() => value(`--${key}`))
        .toBe(order.indexOf(key) <= order.indexOf(part) ? 1 : 0);
    }
    await expect(page.locator(`#${scene}`)).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(
      await page.locator(`#${scene} a`).evaluate((el) => {
        const bounds = el.getBoundingClientRect();
        return bounds.top >= 0 && bounds.bottom < window.innerHeight;
      }),
    ).toBe(true);
  }
  await moveTo(0);
  await expect(story).toHaveAttribute("data-scene", "intro");
  await expect(logo).toHaveCSS("opacity", "0.4");
  await expect.poll(() => value("--move")).toBe(0);
  expect(errors).toEqual([]);
});

test("chapter navigation lands on a readable and fully colored scene", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "교육 이야기 이동" })
    .getByRole("button", { name: "루카스로 이동" })
    .click();
  await expect
    .poll(() =>
      page
        .locator("[data-logo-story]")
        .evaluate((el) =>
          (el as HTMLElement).style.getPropertyValue("--outer"),
        ),
    )
    .toBe("1");
  await expect(page.locator("#lucas")).toContainText("교육 플랫폼, 루카스");
  await expect(page.locator("#ax")).toHaveAttribute("inert", "");
});

test("reduced motion presents all chapters in normal reading order", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const id of ["ax", "b2b", "lucas", "codesquad"]) {
    const chapter = page.locator(`#${id}`);
    await chapter.scrollIntoViewIfNeeded();
    await expect(chapter).toHaveCSS("opacity", "1");
    await expect(chapter).not.toHaveAttribute("inert", "");
    await expect(chapter.locator("a")).toBeVisible();
  }
});

test("the next state grows downward over a fully intact previous state", async ({
  page,
}) => {
  await page.goto("/");
  const story = page.locator("[data-logo-story]");
  for (const [progress, previous, next] of [
    [1.9, "dots", "center"],
    [2.95, "center", "outer"],
    [4.05, "outer", "complete"],
  ] as const) {
    await story.evaluate((element, p) => {
      window.scrollTo(
        0,
        element.getBoundingClientRect().top +
          window.scrollY +
          (((element as HTMLElement).offsetHeight - window.innerHeight) * p) /
            4.8,
      );
    }, progress);
    await expect
      .poll(() =>
        story.evaluate(
          (element, key) =>
            Number((element as HTMLElement).style.getPropertyValue(`--${key}`)),
          next,
        ),
      )
      .toBeCloseTo(0.5, 2);
    const oldBoundary = page.locator(`[data-wipe="${previous}"]`);
    const newBoundary = page.locator(`[data-wipe="${next}"]`);
    const scaleY = (locator: typeof oldBoundary) =>
      locator.evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).d,
      );
    expect(await scaleY(oldBoundary)).toBe(1);
    expect(await scaleY(newBoundary)).toBeCloseTo(0.5, 2);
    // Advancing the scroll must only extend the incoming state downward.
    await page.evaluate(() => window.scrollBy(0, 60));
    await expect.poll(() => scaleY(newBoundary)).toBeGreaterThan(0.5);
    expect(await scaleY(oldBoundary)).toBe(1);
    await page.screenshot({
      path: `artifacts/logo-wipe-${next}-${page.viewportSize()!.width}.png`,
    });
  }
});

test("bottom dots visibly fill from the first scroll and retain completed progress", async ({
  page,
}) => {
  await page.goto("/");
  const fills = page.locator("[data-dot-fill]");
  for (const [position, heights] of [
    [0, [0, 0, 0, 0]],
    [0.875, [9, 0, 0, 0]],
    [2.275, [18, 9, 0, 0]],
    [3.3, [18, 18, 9, 0]],
    [3.8, [18, 18, 18, 0]],
    [4.3, [18, 18, 18, 9]],
    [4.8, [18, 18, 18, 18]],
    [0.875, [9, 0, 0, 0]],
  ] as const) {
    await page.locator("[data-logo-story]").evaluate((element, p) => {
      window.scrollTo(
        0,
        element.getBoundingClientRect().top +
          window.scrollY +
          (((element as HTMLElement).offsetHeight - window.innerHeight) * p) /
            4.8,
      );
    }, position);
    for (let index = 0; index < 4; index++) {
      await expect
        .poll(() =>
          fills
            .nth(index)
            .evaluate((element) => element.getBoundingClientRect().height),
        )
        .toBeCloseTo(heights[index], 0);
      await expect(fills.nth(index)).toHaveCSS(
        "background-color",
        "rgb(96, 183, 28)",
      );
    }
    if (position === 2.275) {
      await page
        .getByRole("navigation", { name: "교육 이야기 이동" })
        .screenshot({
          path: `artifacts/scroll-dots-${page.viewportSize()!.width}.png`,
        });
    }
  }
});

test("final chapter completes the original logo and introduces CodeSquad", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "코드스쿼드로 이동" }).click();
  const story = page.locator("[data-logo-story]");
  await expect
    .poll(() =>
      story.evaluate((element) =>
        Number((element as HTMLElement).style.getPropertyValue("--complete")),
      ),
    )
    .toBe(1);
  await expect(story).toHaveAttribute("data-scene", "codesquad");
  await expect(page.locator("#codesquad")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect(page.locator("#codesquad h2")).toContainText(
    "코드스쿼드입니다.",
  );
  const link = page.getByRole("link", { name: "코드스쿼드 알아보기" });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/about");
  await page.screenshot({
    path: `artifacts/logo-finale-${page.viewportSize()!.width}.png`,
  });
  await link.click();
  await expect(page).toHaveURL(/\/about$/);
});
