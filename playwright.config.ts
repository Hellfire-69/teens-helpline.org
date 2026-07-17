import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — skeleton only.
 *
 * No E2E tests exist yet: Nova, the Escalation Layer, and the crisis banner
 * are not implemented in this scaffold. The safety-critical E2E suite (crisis
 * banner rendering, quick-exit from every route, Nova risk-signal scenarios)
 * will be added on feature/nova-conversation, per TRD §29 and AGENTS.md §12.
 *
 * The CI job for E2E is scaffolded in .github/workflows/ci.yml but is not
 * required to pass until those tests exist.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  workers: process.env["CI"] ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env["PLAYWRIGHT_BASE_URL"] ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Start the dev server before running tests locally
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env["CI"],
    timeout: 120_000,
  },
});
