import { z } from "zod";

export const PERSONA_IDS = ["big_brother", "big_sister", "mentor", "best_friend"] as const;
export type PersonaId = typeof PERSONA_IDS[number];
export const personaIdSchema = z.enum(PERSONA_IDS);

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(2000, "Message too long"),
  conversationId: z.string().uuid().optional(),
  persona: personaIdSchema.optional(),
  // Anonymous users pass their recent history in-memory since we don't persist it.
  recentHistory: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string()
  })).optional(),
  moodContext: z.object({
    moodValue: z.string(),
    note: z.string().optional()
  }).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
