import { z } from "zod";

export const basicConsultationSchema = z.object({
  issue: z.string().min(5, "Please tell us a bit more so we can help."),
});

export const professionalBookingSchema = z.object({
  simulatedSlot: z.string().min(1, "Please select a time slot"),
  guardianApproved: z.boolean().refine(val => val === true, "Guardian approval must be simulated to continue"),
});
