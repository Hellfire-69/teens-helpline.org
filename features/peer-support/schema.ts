import { z } from "zod";

export const submitMessageSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  content: z.string().min(1, "Message cannot be empty").max(2000, "Message is too long"),
});

export type SubmitMessagePayload = z.infer<typeof submitMessageSchema>;
