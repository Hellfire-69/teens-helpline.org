import { describe, it, expect } from "vitest";
import { processMoodEntry } from "@/features/mood-engine/service";
import { moodRequestSchema } from "@/features/mood-engine/schema";

describe("Mood Engine Unit Tests", () => {
  describe("processMoodEntry", () => {
    it("should short-circuit and escalate if risk signal is detected in note", () => {
      const result = processMoodEntry({
        mood_value: "Anxious",
        note: "I want to end it all",
      });
      expect(result.escalation).toBe(true);
      expect(result.escalationReason).toBe("suicidal_ideation");
      expect(result.safeReply).toContain("I want you to know you're not alone");
      expect(result.recommendationCategory).toBeUndefined();
    });

    it("should map Happy + Family to journal", () => {
      const result = processMoodEntry({ mood_value: "Happy", concern: "Family" });
      expect(result.escalation).toBe(false);
      expect(result.recommendationCategory).toBe("journal");
    });

    it("should map Anxious + Academic Stress to breathing-exercise", () => {
      const result = processMoodEntry({ mood_value: "Anxious", concern: "Academic Stress" });
      expect(result.escalation).toBe(false);
      expect(result.recommendationCategory).toBe("breathing-exercise");
    });

    it("should map Sad + Friends to peer-support", () => {
      const result = processMoodEntry({ mood_value: "Sad", concern: "Friends" });
      expect(result.escalation).toBe(false);
      expect(result.recommendationCategory).toBe("peer-support");
    });

    it("should default to journal if no concern is provided for Sad", () => {
      const result = processMoodEntry({ mood_value: "Sad" });
      expect(result.escalation).toBe(false);
      expect(result.recommendationCategory).toBe("journal");
    });
  });

  describe("moodRequestSchema", () => {
    it("should pass valid inputs", () => {
      const result = moodRequestSchema.safeParse({ mood_value: "Happy", note: "Great day" });
      expect(result.success).toBe(true);
    });

    it("should fail if mood_value is missing", () => {
      const result = moodRequestSchema.safeParse({ note: "Great day" });
      expect(result.success).toBe(false);
    });

    it("should fail if mood_value is invalid enum", () => {
      const result = moodRequestSchema.safeParse({ mood_value: "Angry" });
      expect(result.success).toBe(false);
    });

    it("should fail if note is over 2000 characters", () => {
      const longNote = "a".repeat(2001);
      const result = moodRequestSchema.safeParse({ mood_value: "Happy", note: longNote });
      expect(result.success).toBe(false);
    });
  });
});
