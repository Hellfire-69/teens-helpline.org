/**
 * dashboard feature — service layer stub
 *
 * Dashboard stub. Teen/Parent dashboard data aggregation — read-side composition of Auth + Mood + Study Hub + Peer Support summaries. Implemented on feature/dashboard.
 *
 * This file establishes the module boundary. No logic is implemented yet.
 * See TRD §6 for this module's full responsibility definition.
 */

import { getCurrentUserWithRole } from "@/features/auth/server";
import { getUserMoodHistory } from "@/features/mood-engine/service";
import { getUserSessions } from "@/features/peer-support/service";
import type { TeenDashboardData, ParentDashboardData } from "./types";

export async function getTeenDashboardData(): Promise<TeenDashboardData> {
  const { user, profile } = await getCurrentUserWithRole();
  
  if (!user || !profile) {
    return {
      profile: null,
      moodHistory: [],
      peerSessions: [],
    };
  }

  const [moodHistory, peerSessions] = await Promise.all([
    getUserMoodHistory(user.id),
    getUserSessions(user.id),
  ]);

  return {
    profile,
    moodHistory,
    peerSessions,
  };
}

export async function getParentDashboardData(): Promise<ParentDashboardData> {
  return {
    guidanceAvailable: true,
  };
}
