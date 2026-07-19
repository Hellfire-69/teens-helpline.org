/**
 * peer-support feature — data access stub
 *
 * Supabase data-access functions for the peer-support module.
 * All queries go through the Supabase client — no raw SQL from client-reachable paths.
 * Implemented on the corresponding feature branch.
 */

import { createClient } from "@/lib/supabase/server";
import type { PeerSession } from "./types";

export async function getUserSessions(userId: string): Promise<PeerSession[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("peer_support_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch peer sessions: ${error.message}`);
  }

  return data as PeerSession[];
}
