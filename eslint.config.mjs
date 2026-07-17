// @ts-check
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";

/** @type {import("typescript-eslint").Config} */
const config = tseslint.config(
  // TypeScript strict rules (no type-checking pass — avoids needing tsconfig paths in lint)
  ...tseslint.configs.recommended,

  // Next.js core-web-vitals flat config
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // React hooks exhaustive-deps — TRD §35
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
      react: reactPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },

  // Project-wide rules — AGENTS.md §8, TRD §35
  {
    rules: {
      // No unused variables
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // No explicit any
      "@typescript-eslint/no-explicit-any": "error",
      // Consistent type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      // No non-null assertions — prefer proper null checks
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // Exclude generated, config, and non-project files
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "coverage/**",
      "playwright-report/**",
      ".agents/**",      // Development tooling scripts — not project code
      "docs/**",         // Markdown documentation files
      "supabase/**",     // SQL/migration files managed via Supabase MCP
    ],
  }
);

export default config;
