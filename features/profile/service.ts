"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { updateProfileData } from "./data";
import { profileSchema, type ProfileFormValues } from "./schema";

export async function updateProfile(values: ProfileFormValues) {
  // Validate input
  const parsed = profileSchema.parse(values);

  // Check auth
  const auth = await getCurrentUserWithRole();
  if (auth.type !== "authenticated" || !auth.user || !auth.profile) {
    throw new Error("Unauthorized: Must be logged in to update profile.");
  }

  const supabase = await createClient();
  await updateProfileData(supabase, auth.user.id, parsed);
}
