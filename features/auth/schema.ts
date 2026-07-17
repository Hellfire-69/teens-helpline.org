/**
 * Auth feature — Zod validation schemas
 *
 * Schemas are colocated with the feature they validate (per AGENTS.md §8)
 * and exported for reuse on both client (React Hook Form) and server
 * (Route Handler validation) sides.
 */
import { z } from "zod";

export const emailLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  redirectTo: z.string().optional(),
});

export type EmailLoginInput = z.infer<typeof emailLoginSchema>;
