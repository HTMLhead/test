import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const output = new URL("../output/design-comparison/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
const routes = (
  process.env.COMPARE_ROUTES ||
  "/,/masters,/olive,/partners,/learning-method,/about,/404"
).split(",");
const results = [];
try {
  for (const width of (process.env.COMPARE_WIDTHS || "390,834,1440")
    .split(",")
    .map(Number)) {
    for (const route of routes) {
      const snapshots = [];
      for (const [label, port] of [
        ["original", 4324],
        ["react", Number(process.env.REACT_PORT || 4323)],
      ]) {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
        });
        await page.route(/google-analytics|googletagmanager/, (request) =>
          request.abort(),
        );
        await page.goto(`http://127.0.0.1:${port}${route}`, {
          waitUntil: "networkidle",
        });
        await page.evaluate(() => document.fonts.ready);
        await page.locator("img").evaluateAll((images) =>
          Promise.all(
            images.map((image) => {
              image.loading = "eager";
              return image.decode().catch(() => {});
            }),
          ),
        );
        await page
          .locator("astro-dev-toolbar")
          .evaluateAll((elements) =>
            elements.forEach((element) => element.remove()),
          );
        const pause = page.getByRole("button", {
          name: "배너 자동 재생 일시정지",
        });
        if (await pause.count()) {
          await pause.click();
          await page
            .getByRole("button", {
              name: "함께 배우는 AI, Olive 배너 보기",
              exact: true,
            })
            .click();
        }
        await page.addStyleTag({
          content:
            "*, *::before, *::after { animation: none !important; transition: none !important; }",
        });
        await page.evaluate(() => window.scrollTo(0, 0));
        const file = `${width}-${route.slice(1) || "home"}-${label}.png`;
        await page.screenshot({
          path: new URL(file, output).pathname,
          fullPage: true,
        });
        snapshots.push(
          await page
            .locator("main h1, main section, footer")
            .evaluateAll((elements) =>
              elements.map((element) => {
                const rect = element.getBoundingClientRect();
                return {
                  tag: element.tagName,
                  text:
                    element.tagName === "H1"
                      ? element.textContent?.trim()
                      : undefined,
                  x: rect.x,
                  y: rect.y,
                  width: rect.width,
                  height: rect.height,
                };
              }),
            ),
        );
        await page.close();
      }
      results.push({
        width,
        route,
        original: snapshots[0],
        react: snapshots[1],
      });
      console.log(`Captured ${width} ${route}`);
    }
  }
  await writeFile(
    new URL(process.env.COMPARE_REPORT || "geometry.json", output),
    JSON.stringify(results, null, 2),
  );
} finally {
  await browser.close();
}
