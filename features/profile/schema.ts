import { z } from "zod";

export const profileSchema = z.object({
  alias: z.string().min(1, "Alias is required").max(32, "Alias must be under 32 characters"),
  age_band: z.string().min(1, "Age band is required"),
  avatar_id: z.string().nullable().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
