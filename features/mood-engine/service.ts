/**
 * mood-engine feature — service layer
 */
import { checkRiskSignal } from "../nova/escalation";
import { getUserMoodHistory as fetchUserMoodHistory } from "./data";
import type { MoodRequest } from "./schema";
import type { MoodEngineResult, RecommendationCategory } from "./types";

export async function getUserMoodHistory(userId: string) {
  return fetchUserMoodHistory(userId);
}

export function processMoodEntry(req: MoodRequest): MoodEngineResult {
  // 1. Stage 2: Check Escalation Layer on the note
  if (req.note) {
    const riskCheck = checkRiskSignal(req.note);
    if (riskCheck.escalate && riskCheck.signal) {
      return {
        escalation: true,
        escalationReason: riskCheck.signal,
        safeReply: "I'm hearing that you're going through something really difficult. I want you to know you're not alone, but I'm an AI and not equipped to help with this. Please reach out to a trusted adult or one of the crisis helplines on your screen right now."
      };
    }
  }

  // 2. Derive recommendation
  let recommendationCategory: RecommendationCategory = "article"; // fallback

  const isPositive = req.mood_value === "Happy" || req.mood_value === "Okay";
  const isStressed = req.mood_value === "Overwhelmed" || req.mood_value === "Anxious";
  
  if (req.concern === "Academic Stress" || req.concern === "Career") {
    recommendationCategory = isStressed ? "breathing-exercise" : "study-hub-tool";
  } else if (req.concern === "Family" || req.concern === "Friends" || req.concern === "Bullying") {
    recommendationCategory = isPositive ? "journal" : "peer-support";
  } else if (req.concern === "Identity") {
    recommendationCategory = "peer-support";
  } else if (isStressed) {
    recommendationCategory = "breathing-exercise";
  } else if (req.mood_value === "Sad") {
    recommendationCategory = "journal";
  } else {
    recommendationCategory = "article";
  }
  
  return {
    escalation: false,
    recommendationCategory
  };
}
