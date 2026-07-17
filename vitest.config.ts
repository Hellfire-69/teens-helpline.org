import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    // Unit and integration test folders are both wired here.
    // E2E lives in tests/e2e/ and is run via Playwright separately (npm run test:e2e).
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx", "tests/integration/**/*.test.ts", "tests/integration/**/*.test.tsx"],
    exclude: ["tests/e2e/**", "node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/e2e/",
        ".next/",
        "tailwind.config.ts",
        "postcss.config.mjs",
        "next.config.ts",
        "playwright.config.ts",
      ],
    },
  },
});
