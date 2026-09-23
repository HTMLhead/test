import { test, expect } from "@playwright/test";

const courses = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  title: `공개 코스 ${index + 1}`,
  path: `course-${index + 1}`,
  description: "직접 미션을 해결하며 배우는 과정입니다.",
  thumbnailUrl: null,
}));

test("shows three public courses with working Olive destinations", async ({
  page,
}) => {
  await page.route("**/api/olive/graphql", async (route) => {
    expect(route.request().headers()["x-locale"]).toBe("ko");
    expect(route.request().headers().cookie).toBeUndefined();
    await route.fulfill({ json: { data: { getCourses: courses } } });
  });
  await page.goto("/olive");
  const section = page.getByRole("region", {
    name: "지금 만나볼 수 있는 코스",
  });
  await expect(section.getByRole("listitem")).toHaveCount(3);
  await expect(
    section.getByRole("heading", { name: "공개 코스 4" }),
  ).toHaveCount(0);
  await expect(
    section.getByRole("link", { name: /공개 코스 1/ }),
  ).toHaveAttribute("href", "https://olive.codesquad.kr/course/u/course-1");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("recovers from a failed request when the visitor retries", async ({
  page,
}) => {
  let fail = true;
  await page.route("**/api/olive/graphql", async (route) => {
    await route.fulfill(
      fail
        ? { status: 503, json: { errors: [{ message: "Unavailable" }] } }
        : { json: { data: { getCourses: courses } } },
    );
  });
  await page.goto("/olive");
  await expect(page.getByRole("alert")).toContainText(
    "코스를 불러오지 못했어요",
  );
  fail = false;
  await page.getByRole("button", { name: "다시 불러오기" }).click();
  await expect(page.locator("#olive-courses li")).toHaveCount(3);
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("shows an empty state when no courses are published", async ({ page }) => {
  await page.route("**/api/olive/graphql", (route) =>
    route.fulfill({
      json: { data: { getCourses: [] } },
    }),
  );
  await page.goto("/olive");
  await expect(page.locator("#olive-courses")).toContainText(
    "새로운 코스를 준비하고 있어요",
  );
  await expect(page.locator("#olive-courses li")).toHaveCount(0);
});
