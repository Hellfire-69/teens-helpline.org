/**
 * Auth feature — Zod validation schemas stub
 *
 * Schemas are colocated with the feature they validate (per AGENTS.md §8)
 * and exported for reuse on both client (React Hook Form) and server
 * (Route Handler validation) sides. Implemented on feature/auth-scaffold.
 */
import { z } from "zod";

// Placeholder export so the module resolves without errors at scaffold stage.
export const authSchemaPlaceholder = z.object({});
