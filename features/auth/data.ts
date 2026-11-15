import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile, UserPreferences } from "./types";


export async function createProfileData(
  userId: string,
  alias: string,
  email: string | null,
  role: "teen" | "parent"
): Promise<{ profile: Profile; preferences: UserPreferences }> {
  const adminClient = createAdminClient();

  // Default age band written at profile creation; overwritten during onboarding (PRD §4.2).
  const ageBandDefault = "13-15";

  const { data, error } = await adminClient
    .from("profiles")
    .insert({
      id: userId,
      alias,
      email,
      age_band: ageBandDefault,
      role,
      onboarding_completed: false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create profile: ${error.message}`);
  }

  const profile: Profile = {
    id: data.id,
    alias: data.alias,
    email: data.email,
    age_band: data.age_band,
    role: data.role,
    onboarding_completed: data.onboarding_completed,
    created_at: data.created_at,
  };

  const preferences: UserPreferences = {
    preferred_persona: data.preferred_persona,
    avatar_id: data.avatar_id,
  };

  return { profile, preferences };
}

export async function getProfileData(supabase: SupabaseClient, userId: string): Promise<{ profile: Profile; preferences: UserPreferences } | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Row not found
      return null;
    }
    throw new Error(`Failed to get profile: ${error.message}`);
  }

  const profile: Profile = {
    id: data.id,
    alias: data.alias,
    email: data.email,
    age_band: data.age_band,
    role: data.role,
    onboarding_completed: data.onboarding_completed,
    created_at: data.created_at,
  };

  const preferences: UserPreferences = {
    preferred_persona: data.preferred_persona,
    avatar_id: data.avatar_id,
  };

  return { profile, preferences };
}

export async function updateProfileData(
  supabase: SupabaseClient,
  userId: string,
  updates: Partial<Profile & UserPreferences>
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}
