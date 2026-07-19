/**
 * Auth feature — TypeScript types
 *
 * Feature-specific types for the auth module. Cross-cutting types (UserRole,
 * ApiResponse) live in /types/index.ts — import from there, not duplicated here.
 */

import type { UserRole } from "@/types";
import type { PersonaId } from "../nova/schema";

export interface Profile {
  id: string;
  alias: string;
  age_band: string;
  role: UserRole;
  preferred_persona: PersonaId | null;
  avatar_id: string | null;
  created_at: string;
}

export interface AuthUserContext {
  type: "guest" | "anonymous" | "authenticated";
  user: {
    id: string;
    is_anonymous: boolean;
    email?: string;
  } | null;
  profile: Profile | null;
}
