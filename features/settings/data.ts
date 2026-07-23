import type { SupabaseClient } from "@supabase/supabase-js";

export async function anonymizeProfileData(
  supabase: SupabaseClient,
  userId: string
): Promise<void> {
  // Nulls out alias and avatar per DB schema requirement for "delete my data"
  // Leaves age_band as it is not uniquely identifying.
  const { error } = await supabase
    .from("profiles")
    .update({
      alias: "Anonymous",
      avatar_id: null,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to anonymize profile: ${error.message}`);
  }
}
