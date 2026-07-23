/**
 * Server-side Supabase client — TRD §21 / AGENTS.md §5
 *
 * Uses @supabase/ssr's createServerClient so the session is read/written via
 * Next.js cookies() — never localStorage. This client is for use in:
 *   - Server Components
 *   - Route Handlers
 *   - Server Actions
 *   - Middleware
 *
 * Each call to createClient() creates a fresh instance scoped to the current
 * request's cookie context — do not create a singleton at module level.
 *
 * The service-role key is NEVER used here — that key bypasses RLS entirely and
 * is only permitted in trusted server-side contexts that explicitly need it.
 * If you need service-role access, create a separate function that requires
 * a deliberate import of serverEnv.SUPABASE_SERVICE_ROLE_KEY.
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll throws in Server Components — that's expected behavior.
            // The session will still be read correctly; writes only matter in
            // Route Handlers and Server Actions where cookies() is mutable.
          }
        },
      },
    }
  );
}
