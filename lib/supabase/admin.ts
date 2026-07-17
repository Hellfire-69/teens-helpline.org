/**
 * Server-only Supabase admin client — TRD §16 / AGENTS.md §14
 *
 * Uses the SUPABASE_SERVICE_ROLE_KEY to bypass Row Level Security.
 * This must ONLY be used for trusted server-side operations (like profile creation
 * after sign-up) where RLS would otherwise block the action.
 *
 * NEVER import this file into a Client Component or expose it to client-reachable code.
 */
import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env";

export function createAdminClient() {
  return createClient(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    }
  );
}
