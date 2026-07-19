/**
 * mood-engine feature — data access stub
 *
 * Supabase data-access functions for the mood-engine module.
 * All queries go through the Supabase client — no raw SQL from client-reachable paths.
 * Implemented on the corresponding feature branch.
 */

import { createClient } from "@/lib/supabase/server";
import type { MoodEntry } from "./types";

export async function getUserMoodHistory(userId: string): Promise<MoodEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mood_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch mood history: ${error.message}`);
  }

  return data as MoodEntry[];
}
