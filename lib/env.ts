/**
 * Environment variable validation — TRD §21 / AGENTS.md §8
 *
 * Fails fast at boot with a clear error if any required variable is missing,
 * rather than failing obscurely at runtime when the missing var is first used.
 *
 * Client-safe vars (NEXT_PUBLIC_*) are validated in a separate export so they
 * can be safely imported from Client Components without bundling server secrets.
 */
import { z } from "zod";

// ─── Server-only env vars ────────────────────────────────────────────────────
// Never import `serverEnv` from a Client Component — it would expose service
// role keys and AI provider keys to the client bundle.
const serverEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// ─── Public (client-safe) env vars ──────────────────────────────────────────
// Safe to import from any component — contains only NEXT_PUBLIC_* vars.
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
});

function validateEnv<T extends z.ZodTypeAny>(
  schema: T,
  data: Record<string, string | undefined>
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const missing = result.error.issues
      .map((issue) => `  • ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `\n[env] Boot validation failed — missing or invalid environment variables:\n${missing}\n\nCopy .env.example to .env.local and fill in the required values.\n`
    );
  }
  return result.data as z.infer<T>;
}

// These run at module import time. To prevent client-side crashes when a 
// Client Component imports publicEnv from this file, we only validate serverEnv 
// if we are running in a Node.js/server context.
export const serverEnv = typeof window === "undefined"
  ? validateEnv(serverEnvSchema, process.env as Record<string, string | undefined>)
  : ({} as z.infer<typeof serverEnvSchema>);
export const publicEnv = validateEnv(publicEnvSchema, {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
