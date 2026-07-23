import type { SupabaseClient } from "@supabase/supabase-js";
import { getProfileData, updateProfileData } from "./data";
import type { Profile, UserPreferences } from "./types";

export class AuthService {
  constructor(private supabase: SupabaseClient) { }

  async signUp(email: string, password: string, displayName: string, role: "teen" | "parent") {
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          role,
        },
      },
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error("No user returned from signup");

    // Profile creation is now handled entirely by the handle_new_user DB trigger.
    return { user: authData.user, profile: null, preferences: null };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data.user;
  }

  async signInAnonymously() {
    const { data, error } = await this.supabase.auth.signInAnonymously();
    if (error) throw new Error(error.message);
    return data.user;
  }

  async signInWithGoogle(redirectTo: string) {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
    if (error) throw new Error(error.message);
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async refreshSession() {
    const { data, error } = await this.supabase.auth.refreshSession();
    if (error) throw new Error(error.message);
    return data.session;
  }



  async updateProfile(userId: string, updates: Partial<Profile & UserPreferences>) {
    await updateProfileData(this.supabase, userId, updates);
  }

  async loadProfile(userId: string) {
    return await getProfileData(this.supabase, userId);
  }

  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  }
}
