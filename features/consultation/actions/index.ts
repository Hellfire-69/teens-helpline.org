"use server";

import { createClient } from "@/lib/supabase/server";
import { professionalBookingSchema } from "../schemas";
import { revalidatePath } from "next/cache";

export async function getAppointmentsAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function createSimulatedBookingAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const simulatedSlot = formData.get("simulatedSlot") as string;
  const guardianApproved = formData.get("guardianApproved") === "true";

  const parsed = professionalBookingSchema.safeParse({ simulatedSlot, guardianApproved });
  if (!parsed.success) return { success: false, error: "Invalid data" };

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      user_id: user.id,
      simulated_slot: parsed.data.simulatedSlot,
      status: "requested",
      guardian_approved: parsed.data.guardianApproved,
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/consultation");
  return { success: true, data };
}

export async function cancelSimulatedBookingAction(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data, error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", id)
    .eq("user_id", user.id) // Ensure only own row
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/consultation");
  return { success: true, data };
}
