"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

import type { PersonaId } from "../nova/schema";
import { updatePreferredPersona } from "./data";
import { getCurrentUserWithRole } from "./service";
import { logger } from "@/lib/logger";

export async function savePreferredPersonaAction(personaId: PersonaId) {
  const auth = await getCurrentUserWithRole();
  if (auth.type !== "authenticated" || !auth.user || auth.user.is_anonymous) {
    // Only logged in users have their persona persisted in DB
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();
  try {
    await updatePreferredPersona(supabase, auth.user.id, personaId);
    return { success: true };
  } catch (error) {
    logger.error("Failed to save preferred persona", { error: String(error) });
    return { success: false, error: "Failed to update persona" };
  }
}
