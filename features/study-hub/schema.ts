/**
 * study-hub feature — Zod validation schemas
 */
import { z } from "zod";

export const getResourcesQuerySchema = z.object({
  category: z.string().optional(),
  contentType: z.enum(["article", "breathing-exercise", "study-hub-tool", "journal"]).optional(),
  q: z.string().optional(),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(10),
});

export type GetResourcesQuery = z.infer<typeof getResourcesQuerySchema>;
