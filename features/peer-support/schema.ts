import { z } from "zod";

export const submitMessageSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  content: z.string().min(1, "Message cannot be empty").max(2000, "Message is too long"),
});

export type SubmitMessagePayload = z.infer<typeof submitMessageSchema>;

export const reportMessageSchema = z.object({
  messageId: z.string().uuid("Invalid message ID"),
  reasonSlug: z.string().min(1, "Reason is required"),
  details: z.string().max(1000, "Details too long").optional(),
});

export type ReportMessagePayload = z.infer<typeof reportMessageSchema>;
