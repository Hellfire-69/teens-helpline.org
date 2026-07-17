/**
 * Auth feature — service layer
 *
 * Business logic for anonymous session creation, magic link sign-in,
 * Google OAuth, and session/role resolution.
 */

import { createClient } from "@/lib/supabase/server";
import { createProfile, getProfile } from "./data";
import type { AuthUserContext } from "./types";

export async function continueAnonymously() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw new Error(error.message);
  return data;
}

export async function signInWithEmail(email: string, redirectTo: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function signInWithGoogle(redirectTo: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUserWithRole(): Promise<AuthUserContext> {
  const supabase = await createClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return { type: "guest", user: null, profile: null };
  }

  const { user } = session;
  
  if (user.is_anonymous) {
    return { type: "anonymous", user: { ...user, is_anonymous: !!user.is_anonymous }, profile: null };
  }

  const profile = await getProfile(supabase, user.id);
  
  // If the user has a session but no profile, they likely just signed in for the first time via OAuth or Magic Link.
  // In a real app, we might redirect to an onboarding flow. For now, if profile is missing, we create it.
  if (!profile) {
    const newProfile = await createProfile(user.id);
    return { type: "authenticated", user: { ...user, is_anonymous: !!user.is_anonymous }, profile: newProfile };
  }

  return { type: "authenticated", user: { ...user, is_anonymous: !!user.is_anonymous }, profile };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
