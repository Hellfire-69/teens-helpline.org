"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { signOutAction } from "@/features/auth/actions";
import { anonymizeProfileData } from "./data";
import { redirect } from "next/navigation";

export async function anonymizeUserData() {
  const auth = await getCurrentUserWithRole();
  if (auth.type !== "authenticated" || !auth.user || !auth.profile) {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();
  await anonymizeProfileData(supabase, auth.user.id);
  
  // Sign out after anonymization
  await signOutAction();
  redirect("/");
}

export async function signOut() {
  await signOutAction();
  redirect("/");
}
