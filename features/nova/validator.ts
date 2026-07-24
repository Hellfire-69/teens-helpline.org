import { checkRiskSignal } from "./escalation";
import type { RiskSignal } from "./escalation";
import { logger } from "@/lib/logger";

export interface ValidationResult {
  isValid: boolean;
  safeReply: string;
  blockedSignal: RiskSignal;
}

export const FALLBACK_MESSAGE =
  "I'm having a little trouble thinking of the right thing to say right now, but I want you to know I'm here. If you need immediate help, please reach out to a trusted adult or a crisis helpline.";

/**
 * Validates the AI's generated response against the Escalation Layer rules.
 * TRD §17: "independent post-check on the model's own output against the same
 * banned-content patterns as the Escalation Layer"
 */
export function validateResponse(reply: string): ValidationResult {
  const result = checkRiskSignal(reply);

  if (result.escalate) {
    // TRD: "The violation is logged for review."
    // AGENTS.md §5: logs must never contain raw chat content, even in this case.
    // Record only the category (signal).
    logger.error("Response Validator blocked an unsafe AI reply", {
      signal: result.signal,
    });

    return {
      isValid: false,
      safeReply: FALLBACK_MESSAGE,
      blockedSignal: result.signal,
    };
  }

  return {
    isValid: true,
    safeReply: reply,
    blockedSignal: null,
  };
}
