/**
 * mood-engine feature — TypeScript types
 */

export type RecommendationCategory =
  | "article"
  | "study-hub-tool"
  | "breathing-exercise"
  | "journal"
  | "peer-support"
  | "professional-help";

export type MoodEngineResult = {
  escalation: boolean;
  escalationReason?: string | null;
  recommendationCategory?: RecommendationCategory | null;
  safeReply?: string; // Used if escalation is true
};
