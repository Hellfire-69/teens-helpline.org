/**
 * mood-engine feature — Zod validation schemas
 */
import { z } from "zod";

export const moodRequestSchema = z.object({
  mood_value: z.enum(["Happy", "Okay", "Sad", "Overwhelmed", "Anxious"]),
  note: z.string().max(2000, "Note too long").optional(),
  concern: z.enum([
    "Academic Stress",
    "Family",
    "Friends",
    "Career",
    "Identity",
    "Bullying",
    "Just Exploring"
  ]).optional(),
});

export type MoodRequest = z.infer<typeof moodRequestSchema>;
