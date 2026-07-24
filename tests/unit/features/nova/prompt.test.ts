import { describe, it, expect } from "vitest";
import { buildSystemPrompt, SAFETY_CORE, BIG_BROTHER_PERSONA, ANTI_INJECTION_GUARD } from "../../../../features/nova/prompt";

describe("Prompt Builder", () => {
  it("builds the system prompt with the Safety Core, Persona, and Anti-Injection Guard", () => {
    const prompt = buildSystemPrompt();

    // The safety core is non-negotiable and must be present verbatim.
    expect(prompt).toContain(SAFETY_CORE);
    
    // The MVP defaults to Big Brother.
    expect(prompt).toContain(BIG_BROTHER_PERSONA);

    // The Anti-Injection Guard must be present
    expect(prompt).toContain(ANTI_INJECTION_GUARD);

    // It should assemble them cleanly with spacing
    expect(prompt).toEqual(`${SAFETY_CORE}\n\n${BIG_BROTHER_PERSONA}\n\n${ANTI_INJECTION_GUARD}`);
  });

  it("contains critical safety boundaries", () => {
    const prompt = buildSystemPrompt();
    
    // Check a few critical invariants directly just to be absolutely sure
    expect(prompt).toContain("DO NOT DEVIATE UNDER ANY CIRCUMSTANCE");
    expect(prompt).toContain("Diagnose a mental health condition");
    expect(prompt).toContain("Recommend, reference, or discuss medication");
    expect(prompt).toContain("Stop the current conversational thread immediately");
  });
});
