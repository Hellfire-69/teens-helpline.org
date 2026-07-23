import type { UserRole } from "@/types";
import type { PersonaId } from "../nova/schema";

export interface UserPreferences {
  preferred_persona: PersonaId | null;
  avatar_id: string | null;
}

export interface Profile {
  id: string;
  alias: string;
  email: string | null;
  age_band: string;
  role: UserRole;
  onboarding_completed: boolean;
  created_at: string;
}

export interface AuthState {
  user: {
    id: string;
    is_anonymous: boolean;
    email?: string;
  } | null;
  profile: Profile | null;
  preferences: UserPreferences | null;
  loading: boolean;
}

export interface AuthUserContext {
  type: "guest" | "anonymous" | "authenticated";
  user: {
    id: string;
    is_anonymous: boolean;
    email?: string;
  } | null;
  profile: Profile | null;
  preferences: UserPreferences | null;
}
