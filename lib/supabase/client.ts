/**
 * Browser-side Supabase client — TRD §21 / AGENTS.md §5
 *
 * Uses @supabase/ssr's createBrowserClient so the session is managed via
 * cookies (HttpOnly, Secure, SameSite=Lax) rather than localStorage.
 *
 * IMPORTANT: localStorage/sessionStorage persistence is explicitly disabled
 * by using @supabase/ssr instead of bare @supabase/supabase-js — this
 * enforces TRD ADR-006 and AGENTS.md §5's no-browser-storage rule for all
 * teen-identifying and conversation data.
 */
import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env";

export function createClient() {
  console.log(
    "DEBUG URL:", publicEnv.NEXT_PUBLIC_SUPABASE_URL, 
    "DEBUG KEY:", publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return createBrowserClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
