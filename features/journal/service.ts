"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRiskSignal, logEscalationEvent } from "@/features/nova";
import sanitizeHtml from "sanitize-html";
import { logger } from "@/lib/logger";
import { createJournalEntry, fetchJournalEntries, deleteJournalEntry as dbDelete } from "./data";
import type { JournalEntry } from "./types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function submitJournalEntry(content: string, moodEntryId?: string | null) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  const isAnonymous = session?.user?.is_anonymous;

  // 1. Sanitization
  const cleanContent = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
  if (!cleanContent.trim()) {
    throw new Error("Journal entry cannot be empty");
  }

  // 2. Escalation Pre-check
  const riskCheck = checkRiskSignal(cleanContent);
  let riskFlagged = false;

  if (riskCheck.escalate && riskCheck.signal) {
    riskFlagged = true;
    try {
      const adminClient = createAdminClient();
      await logEscalationEvent(adminClient as SupabaseClient, userId || null, "journal", riskCheck.signal);
    } catch (err) {
      logger.error("Failed to log escalation event to DB", { error: String(err) });
    }
  }

  // 3. Database Persistence for Logged-In Users
  if (userId && !isAnonymous) {
    const entry = await createJournalEntry(userId, cleanContent, moodEntryId, riskFlagged);
    return { success: true, entry, escalated: riskFlagged, reason: riskCheck.signal };
  } else {
    // For anonymous users, we just return the sanitized content and risk status.
    // The client will save it in Zustand.
    return {
      success: true,
      entry: { 
        content: cleanContent, 
        risk_flagged: riskFlagged, 
        mood_entry_id: moodEntryId 
      } as Partial<JournalEntry>,
      escalated: riskFlagged,
      reason: riskCheck.signal,
    };
  }
}

export async function getUserJournalEntries() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  const isAnonymous = session?.user?.is_anonymous;

  if (!userId || isAnonymous) {
    return { entries: [] }; // Anonymous users use Zustand state locally
  }

  const entries = await fetchJournalEntries(userId);
  return { entries };
}

export async function removeJournalEntry(entryId: string) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await dbDelete(entryId, userId);
  return { success: true };
}
