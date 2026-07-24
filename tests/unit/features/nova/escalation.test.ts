import { describe, it, expect } from "vitest";
import { checkRiskSignal } from "@/features/nova/escalation";

describe("Escalation Layer - Rule-based risk detection", () => {
  describe("Direct phrasing", () => {
    it("detects suicidal ideation", () => {
      const result = checkRiskSignal("I want to end it all.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("suicidal_ideation");
    });

    it("detects self-harm", () => {
      const result = checkRiskSignal("I'm going to cut myself tonight.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("self_harm");
    });

    it("detects substance use", () => {
      const result = checkRiskSignal("I think I might overdose.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("substance_use");
    });

    it("detects abuse", () => {
      const result = checkRiskSignal("My dad beats me when he's angry.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("abuse");
    });

    it("detects violence", () => {
      const result = checkRiskSignal("I'm going to shoot up the school.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("violence");
    });
  });

  describe("Adversarial & edge cases (Persona.md §9)", () => {
    it("detects hypothetical framing", () => {
      const result = checkRiskSignal("What if someone wanted to go to sleep forever?");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("suicidal_ideation");
      
      const result2 = checkRiskSignal("If a person wanted to overdose, how many would it take?");
      expect(result2.escalate).toBe(true);
      expect(result2.signal).toBe("substance_use");
    });

    it("detects 'for a friend' framing", () => {
      const result = checkRiskSignal("Asking for a friend, but how do they stop wanting to kill themselves?");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("suicidal_ideation");
      
      const result2 = checkRiskSignal("My friend cuts themselves, what should I do?");
      expect(result2.escalate).toBe(true);
      expect(result2.signal).toBe("self_harm");
    });

    it("detects indirect phrasing", () => {
      const result = checkRiskSignal("I just don't want to be here anymore.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("suicidal_ideation");

      const result2 = checkRiskSignal("I'm so tired of living.");
      expect(result2.escalate).toBe(true);
      expect(result2.signal).toBe("suicidal_ideation");
    });

    it("detects teen slang and euphemisms", () => {
      const result = checkRiskSignal("I think I'm going to unalive myself.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("suicidal_ideation");

      const result2 = checkRiskSignal("What if they try to unalive themselves?");
      expect(result2.escalate).toBe(true);
      expect(result2.signal).toBe("suicidal_ideation");
    });

    it("detects 'thoughts about dying' phrasing", () => {
      const result = checkRiskSignal("I have been having thoughts about dying.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("suicidal_ideation");

      const result2 = checkRiskSignal("I think about death a lot lately.");
      expect(result2.escalate).toBe(true);
      expect(result2.signal).toBe("suicidal_ideation");
      
      const result3 = checkRiskSignal("I keep thinking about not existing anymore.");
      expect(result3.escalate).toBe(true);
      expect(result3.signal).toBe("suicidal_ideation");
    });

    it("detects broadened self-harm patterns", () => {
      const result = checkRiskSignal("I want to hurt myself with a blade.");
      expect(result.escalate).toBe(true);
      expect(result.signal).toBe("self_harm");

      const result2 = checkRiskSignal("I started scratching myself until I bled.");
      expect(result2.escalate).toBe(true);
      expect(result2.signal).toBe("self_harm");

      const result3 = checkRiskSignal("I've been burning myself to cope.");
      expect(result3.escalate).toBe(true);
      expect(result3.signal).toBe("self_harm");
    });
  });

  describe("Safe content (should not escalate)", () => {
    it("allows academic stress", () => {
      const result = checkRiskSignal("I failed my exam and I feel like such an idiot.");
      expect(result.escalate).toBe(false);
      expect(result.signal).toBeNull();
    });

    it("allows relationship issues", () => {
      const result = checkRiskSignal("My best friend isn't talking to me anymore and I don't know why.");
      expect(result.escalate).toBe(false);
      expect(result.signal).toBeNull();
    });

    it("allows general overwhelm", () => {
      const result = checkRiskSignal("I don't know what I want to do with my life and everyone keeps asking me.");
      expect(result.escalate).toBe(false);
      expect(result.signal).toBeNull();
    });
    
    it("allows medical questions that are safe", () => {
      const result = checkRiskSignal("I have a headache from studying too much.");
      expect(result.escalate).toBe(false);
      expect(result.signal).toBeNull();
    });
  });
});
