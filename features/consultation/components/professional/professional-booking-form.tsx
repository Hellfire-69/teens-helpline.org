"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { professionalBookingSchema } from "../../schemas";
import { createSimulatedBookingAction } from "../../actions";
import { Button } from "@/components/ui/button";
import { CalendarBlank, CheckCircle, WarningCircle, Clock, ShieldCheck } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type FormData = z.infer<typeof professionalBookingSchema>;

const SIMULATED_SLOTS = [
  "Monday, 10:00 AM - 11:00 AM",
  "Tuesday, 4:00 PM - 5:00 PM",
  "Wednesday, 2:30 PM - 3:30 PM",
  "Friday, 11:00 AM - 12:00 PM",
];

export function ProfessionalBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(professionalBookingSchema),
    defaultValues: {
      simulatedSlot: "",
      guardianApproved: false,
    },
  });

  const guardianApproved = watch("guardianApproved");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerError(null);

    const formData = new FormData();
    formData.append("simulatedSlot", data.simulatedSlot);
    formData.append("guardianApproved", "true"); // Must be true to pass validation

    const res = await createSimulatedBookingAction(formData);
    setIsSubmitting(false);

    if (!res.success) {
      setServerError(res.error || "Failed to create booking.");
    } else {
      // The server action already called revalidatePath("/consultation")
      // so the page will automatically refresh with the new data.
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-radius-lg p-space-6 shadow-sm",
      "bg-white/72 dark:bg-night-950/65 backdrop-blur-[12px]",
      "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
    )}>
      {/* 4-6% aurora.dusk tint overlay */}
      <div className="absolute inset-0 bg-[#6B5B95]/[0.05] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <CalendarBlank className="w-6 h-6 text-ink-600 dark:text-ink-400" />
          <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white">Professional Support</h3>
          <span className="ml-auto bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 px-2 py-0.5 rounded-radius-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Simulated
          </span>
        </div>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-6">
          Request a structured session with a professional. (This flow is a prototype simulation; no real counsellor exists.)
        </p>

        {serverError && (
          <div className="mb-6 bg-signal-error/10 border border-signal-error/20 rounded-radius-md p-3 flex items-start gap-2">
            <WarningCircle className="w-5 h-5 text-signal-error shrink-0 mt-0.5" />
            <p className="text-type-body-sm text-signal-error">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-type-body-sm font-medium text-ink-900 dark:text-ink-100">
              Select a Simulated Time Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SIMULATED_SLOTS.map((slot) => {
                const isSelected = watch("simulatedSlot") === slot;
                const [date, time] = slot.split(", ");
                return (
                  <motion.button
                    key={slot}
                    type="button"
                    onClick={() => setValue("simulatedSlot", slot, { shouldValidate: true })}
                    style={{ transformStyle: "preserve-3d" }}
                    whileHover={{ rotateX: 6, rotateY: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{ scale: isSelected ? 1.03 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={cn(
                      "relative flex flex-col text-left p-4 rounded-radius-md transition-all duration-base overflow-hidden",
                      "bg-white/40 dark:bg-night-900/40 backdrop-blur-[12px]",
                      "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
                      isSelected ? "shadow-glow-sea border border-aurora-sea" : "hover:shadow-md border border-transparent"
                    )}
                  >
                    {/* Tint for sub-card */}
                    <div className="absolute inset-0 bg-[#6B5B95]/[0.05] pointer-events-none" />
                    {/* 3D Light Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-white/10 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-fast" />

                    <div className="relative z-10">
                      <span className="text-type-label text-ink-600 dark:text-ink-400 mb-1 block">
                        {date}
                      </span>
                      <span className="text-type-title-md font-semibold text-ink-900 dark:text-white block">
                        {time}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-4 right-4 text-aurora-sea z-10">
                        <CheckCircle weight="fill" className="w-5 h-5" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
            {errors.simulatedSlot && (
              <p className="text-signal-error text-type-body-sm mt-1 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal-error" />
                {errors.simulatedSlot.message}
              </p>
            )}
          </div>

          <div className={cn(
            "relative p-4 rounded-radius-md overflow-hidden",
            "bg-white/40 dark:bg-night-900/40 backdrop-blur-[12px]",
            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          )}>
            <div className="absolute inset-0 bg-[#6B5B95]/[0.05] pointer-events-none" />
            <div className="relative z-10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-ink-600 dark:text-ink-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="guardianApproved" className="text-type-body-sm font-medium text-ink-900 dark:text-white cursor-pointer">
                    PROTOTYPE: Simulate Guardian Approval
                  </label>
                  <input 
                    type="checkbox"
                    id="guardianApproved" 
                    checked={guardianApproved} 
                    onChange={(e) => setValue("guardianApproved", e.target.checked, { shouldValidate: true })} 
                    className="w-4 h-4 text-aurora-sea rounded focus:ring-aurora-sea"
                  />
                </div>
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                  In a real production environment, this would trigger a legal consent flow for your guardian. Toggle this to simulate approval.
                </p>
              </div>
            </div>
            {errors.guardianApproved && (
              <p className="text-signal-error text-type-body-sm mt-3 flex items-center gap-1 ml-8 relative z-10">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal-error" />
                {errors.guardianApproved.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" variant="primary">
            {isSubmitting ? "Requesting..." : "Request Booking"}
            {!isSubmitting && <CheckCircle className="w-4 h-4 ml-2" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
