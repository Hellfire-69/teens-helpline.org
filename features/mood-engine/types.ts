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

export type MoodEntry = {
  id: string;
  user_id: string | null;
  mood_value: string;
  note: string | null;
  risk_flagged: boolean;
  created_at: string;
};
