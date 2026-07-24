"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { PersonaId } from "../nova/schema";
import { AuthService } from "./service";
import { getCurrentUserWithRole } from "./server";
import { logger } from "@/lib/logger";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function savePreferredPersonaAction(personaId: PersonaId) {
  const auth = await getCurrentUserWithRole();
  if (auth.type !== "authenticated" || !auth.user || auth.user.is_anonymous) {
    // Only logged in users have their persona persisted in DB
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  const authService = new AuthService(supabase);

  try {
    await authService.updateProfile(auth.user.id, { preferred_persona: personaId });
    return { success: true };
  } catch (error) {
    logger.error("Failed to save preferred persona", { error: String(error) });
    return { success: false, error: "Failed to update persona" };
  }
}

export async function completeOnboardingAction(data?: { avatarId?: string; role?: "teen" | "parent"; mood?: string; concern?: string; ageBand?: string }) {
  const auth = await getCurrentUserWithRole();
  if (auth.type !== "authenticated" || !auth.user || auth.user.is_anonymous) {
    if (auth.type === "anonymous" || auth.user?.is_anonymous) {
      const cookieStore = await cookies();
      cookieStore.set('anon_onboarding_completed', 'true', { 
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax'
      });
      return { success: true };
    }
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  const authService = new AuthService(supabase);

  try {
    // Using updateProfile to persist preferences and onboarding state
    await authService.updateProfile(auth.user.id, {
      ...(data?.avatarId && { avatar_id: data.avatarId }),
      ...(data?.role && { role: data.role }),
      ...(data?.ageBand && { age_band: data.ageBand }),
      onboarding_completed: true,
    });

    return { success: true };
  } catch (error) {
    logger.error("Failed to mark onboarding complete", { error: String(error) });
    return { success: false, error: "Failed to mark onboarding complete" };
  }
}
