import { z } from "zod";

export const journalEntrySchema = z.object({
  content: z
    .string()
    .min(1, "Journal entry cannot be empty")
    .max(5000, "Journal entry is too long (maximum 5000 characters)"),
  mood_entry_id: z.string().uuid().optional().nullable(),
});

export type JournalEntryInput = z.infer<typeof journalEntrySchema>;
