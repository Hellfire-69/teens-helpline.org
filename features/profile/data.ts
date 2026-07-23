import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProfileFormValues } from "./schema";

export async function updateProfileData(
  supabase: SupabaseClient,
  userId: string,
  data: Partial<ProfileFormValues> & { role?: "teen" | "parent", onboarding_completed?: boolean }
): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({
      ...(data.alias && { alias: data.alias }),
      ...(data.age_band && { age_band: data.age_band }),
      ...(data.avatar_id !== undefined && { avatar_id: data.avatar_id }),
      ...(data.role && { role: data.role }),
      ...(data.onboarding_completed !== undefined && { onboarding_completed: data.onboarding_completed }),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}
