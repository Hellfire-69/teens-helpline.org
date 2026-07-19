/**
 * dashboard feature — TypeScript types stub
 *
 * Feature-specific types. Cross-cutting types (UserRole, ApiResponse) live in
 * /types/index.ts and are imported from there — never duplicated here.
 * Implemented on the corresponding feature branch.
 */

import type { AuthUserContext } from "@/features/auth/types";
import type { MoodEntry } from "@/features/mood-engine/types";
import type { PeerSession } from "@/features/peer-support/types";

export type TeenDashboardData = {
  profile: NonNullable<AuthUserContext["profile"]> | null;
  moodHistory: MoodEntry[];
  peerSessions: PeerSession[];
};

export type ParentDashboardData = {
  // Static content guidance for MVP
  guidanceAvailable: boolean;
};
