import { test, expect } from "@playwright/test";

test("AX prototype renders with intact assets at each viewport", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
  });
  await page.goto("/ax-home/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /혼자의 가능성을,\s*함께 만드는\s*변화로\./,
  );
  const measurements = await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    );
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      broken: [...document.images]
        .filter((i) => !i.naturalWidth)
        .map((i) => i.src),
    };
  });
  expect(measurements).toEqual({ overflow: false, broken: [] });
  expect(errors).toEqual([]);
  await page.getByRole("button", { name: "모션 멈추기" }).click();
  await page.screenshot({
    path: `artifacts/ax-home/${testInfo.project.name}.png`,
    fullPage: false,
  });
  await page.screenshot({
    path: `artifacts/ax-home/${testInfo.project.name}-full.png`,
    fullPage: true,
  });
});

test("mission teaches through retry, preserves source access, and completes with reusable prompt", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/ax-home/");
  await page.getByRole("link", { name: "3분 AX 미션 해보기" }).click();
  await page.getByRole("button", { name: "AI가 만든 요약 살펴보기" }).click();
  await expect(
    page.getByRole("button", { name: "피드백 확인하기" }),
  ).toBeDisabled();
  await page
    .getByRole("radio", { name: "짧고 명확하니 그대로 공유해도 됩니다." })
    .check();
  await page.getByRole("button", { name: "피드백 확인하기" }).click();
  await expect(page.locator("#mission-feedback")).toContainText(
    "간결함보다 정확함이 먼저",
  );
  await page.getByRole("button", { name: "원문 다시 읽기" }).click();
  await expect(page.locator("#mission-content")).toContainText(
    "검토 결과를 보고 다시 정해요.",
  );
  await page.getByRole("button", { name: "AI가 만든 요약 살펴보기" }).click();
  await page
    .getByRole("radio", {
      name: "담당자가 빠졌어요. 개발팀을 담당자로 지정하면 됩니다.",
    })
    .check();
  await page.getByRole("button", { name: "피드백 확인하기" }).click();
  await expect(page.locator("#mission-feedback")).toContainText(
    "원문에 없는 사실",
  );
  await page
    .getByRole("radio", {
      name: "제안을 확정으로 바꿨어요. 보안 검토 후 일정을 결정한다는 조건을 담아야 합니다.",
    })
    .check();
  await page.getByRole("button", { name: "피드백 확인하기" }).click();
  await expect(page.locator("#mission-feedback")).toContainText("잘 찾았어요");
  await page
    .getByRole("button", { name: "개선한 결과와 프롬프트 보기" })
    .click();
  await expect(page.locator("#mission-content h3")).toBeFocused();
  await expect(page.getByLabel("다음 업무에 가져갈 검토 프롬프트")).toHaveValue(
    /확정 사항, 제안, 확인할 내용을 구분/,
  );
  await page.getByRole("button", { name: "프롬프트 복사하기" }).click();
  await expect(page.locator("#copy-status")).toContainText("복사했습니다");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "원문에 없는 담당자나 일정은 추측하지 말고",
  );
  await page.getByRole("button", { name: "다시 해보기" }).click();
  await expect(page.locator("#mission-count")).toHaveText("STEP 01 / 03");
});

test("navigation, audience selection and reduced motion work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ax-home/");
  if (page.viewportSize()!.width <= 760) {
    const menu = page.getByRole("button", { name: "메뉴", exact: true });
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "배우는 방식" })
      .click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
  await expect(page.locator("#learning-universe")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await expect(
    page.getByRole("button", { name: "모션 줄임 적용" }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "기관 맞춤 연수 문의하기" }).click();
  await expect(page.getByLabel("어떤 교육을 찾고 계신가요?")).toHaveValue(
    "대학·교육기관",
  );
  await page
    .getByLabel("교육을 통해 바꾸고 싶은 것")
    .fill("교직원의 반복 보고서 작성 개선");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  const duplicateIds = await page
    .locator("[id]")
    .evaluateAll((els) =>
      els.map((e) => e.id).filter((id, i, ids) => ids.indexOf(id) !== i),
    );
  expect(duplicateIds).toEqual([]);
});

test("motion can be paused and restarted, and preview aliases resolve", async ({
  page,
}) => {
  for (const path of ["/ax-home", "/ax-home/"]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/ax-home\/index.html$/);
    await expect(page.locator("h1")).toContainText("혼자의 가능성을,");
  }
  await page.getByRole("button", { name: "모션 멈추기" }).click();
  await expect(page.locator("#learning-universe")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  const paused = await page
    .locator("#learning-universe")
    .evaluate((el: HTMLCanvasElement) => el.toDataURL());
  await page.waitForTimeout(150);
  expect(
    await page
      .locator("#learning-universe")
      .evaluate((el: HTMLCanvasElement) => el.toDataURL()),
  ).toBe(paused);
  await page.getByRole("button", { name: "모션 재생하기" }).click();
  await expect
    .poll(() =>
      page
        .locator("#learning-universe")
        .evaluate((el: HTMLCanvasElement) => el.toDataURL()),
    )
    .not.toBe(paused);
});
