/**
 * Auth feature — data access
 *
 * Supabase data-access functions for the auth module.
 * All queries go through the Supabase client — no raw SQL from client-reachable paths.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "./types";
import type { PersonaId } from "../nova/schema";

export async function createProfile(userId: string): Promise<Profile> {
  const adminClient = createAdminClient();
  
  // Auto-generate placeholder values per requirements.
  // These are expected to be overwritten once the onboarding feature exists.
  const placeholderAlias = `TeenUser${Math.floor(Math.random() * 10000)}`;
  const placeholderAgeBand = "13-15"; // Sensible placeholder

  const { data, error } = await adminClient
    .from("profiles")
    .insert({
      id: userId,
      alias: placeholderAlias,
      age_band: placeholderAgeBand,
      role: "teen",
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create profile: ${error.message}`);
  }

  return data as Profile;
}

export async function getProfile(supabase: SupabaseClient, userId: string): Promise<Profile | null> {
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

  return data as Profile;
}

export async function updatePreferredPersona(
  supabase: SupabaseClient, 
  userId: string, 
  personaId: PersonaId
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ preferred_persona: personaId })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to update preferred persona: ${error.message}`);
  }
}

