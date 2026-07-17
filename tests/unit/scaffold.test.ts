/**
 * Trivial passing unit test — gives CI a real test to run from day one.
 *
 * The safety-critical test suite (Escalation Layer, Response Validator,
 * Prompt Builder, crisis banner E2E) will be added on the feature branches
 * that implement those modules, per TRD §29 and AGENTS.md §12.
 */
import { describe, it, expect } from "vitest";

describe("Scaffold smoke test", () => {
  it("environment is set up correctly", () => {
    // Verifies the test runner itself works — not application logic.
    expect(true).toBe(true);
  });

  it("string utilities work as expected", () => {
    const trim = (s: string) => s.trim();
    expect(trim("  hello  ")).toBe("hello");
  });
});
