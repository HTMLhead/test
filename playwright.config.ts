import { defineConfig } from "@playwright/test";
import { readFileSync } from "node:fs";

// Follow the development port even when another task changes package.json.
const { scripts } = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);
const devPort = scripts.dev.match(/--port\s+(\d+)/)?.[1] ?? "4321";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${devPort}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
    { name: "tablet", use: { viewport: { width: 834, height: 1000 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
  ],
  webServer: {
    command: "npm run dev -- --strictPort",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
