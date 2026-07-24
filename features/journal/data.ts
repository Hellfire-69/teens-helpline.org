import { createClient } from "@/lib/supabase/server";
import type { JournalEntry } from "./types";

export async function fetchJournalEntries(userId: string): Promise<JournalEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch journal entries: ${error.message}`);
  }

  return data as JournalEntry[];
}

export async function createJournalEntry(
  userId: string,
  content: string,
  moodEntryId?: string | null,
  riskFlagged: boolean = false
): Promise<JournalEntry> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("journal_entries")
    .insert({
      user_id: userId,
      content,
      mood_entry_id: moodEntryId || null,
      risk_flagged: riskFlagged,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create journal entry: ${error.message}`);
  }

  return data as JournalEntry;
}

export async function deleteJournalEntry(id: string, userId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to delete journal entry: ${error.message}`);
  }
}
