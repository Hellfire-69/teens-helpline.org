"use client";

import { useTransition } from "react";
import type { Appointment } from "../../types";
import { cancelSimulatedBookingAction } from "../../actions";
import { Button } from "@/components/ui/button";
import { CalendarBlank, CheckCircle, XCircle, WarningCircle, ChatText, BookOpenText } from "@phosphor-icons/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export function ProfessionalBookingList({ appointments }: { appointments: Appointment[] }) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = (id: string) => {
    startTransition(async () => {
      await cancelSimulatedBookingAction(id);
    });
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-paper-100 dark:bg-night-950 border border-ink-200 dark:border-ink-700 rounded-radius-lg p-space-8 text-center flex flex-col items-center">
        <div className="w-12 h-12 bg-aurora-sea/10 text-aurora-sea rounded-radius-full flex items-center justify-center mb-4">
          <CalendarBlank className="w-6 h-6" weight="duotone" />
        </div>
        <h4 className="text-type-title-sm font-semibold text-ink-900 dark:text-white mb-2">No active requests</h4>
        <p className="text-type-body-sm text-ink-600 dark:text-ink-300 max-w-sm mb-6">
          You don't have any professional consultation bookings yet. You can request one above, or explore other support options.
        </p>
        <div className="flex gap-3">
          <Button asChild variant="secondary">
            <Link href="/study-hub"><BookOpenText className="mr-2" />Study Hub</Link>
          </Button>
          <Button asChild variant="primary">
            <Link href="/chat"><ChatText className="mr-2" />Talk to Nova</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-type-title-sm font-semibold text-ink-900 dark:text-white mb-2">Your Booking Requests</h4>
      {appointments.map((appointment) => {
        const isUnavailableOrCancelled = appointment.status === "unavailable" || appointment.status === "cancelled";

        return (
          <div 
            key={appointment.id} 
            className={`border rounded-radius-lg p-space-4 relative overflow-hidden transition-colors ${
              isUnavailableOrCancelled 
                ? "bg-paper-100 dark:bg-night-950 border-ink-200 dark:border-ink-800" 
                : "bg-white dark:bg-night-900 border-ink-200 dark:border-ink-700 shadow-sm"
            }`}
          >
            {/* Status indicator line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              appointment.status === 'requested' ? 'bg-aurora-sea' :
              appointment.status === 'confirmed' ? 'bg-signal-success' :
              appointment.status === 'cancelled' ? 'bg-ink-400' :
              'bg-signal-caution'
            }`} />

            <div className="pl-2">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {appointment.status === 'requested' && <CalendarBlank className="w-4 h-4 text-aurora-sea" />}
                    {appointment.status === 'confirmed' && <CheckCircle className="w-4 h-4 text-signal-success" />}
                    {appointment.status === 'cancelled' && <XCircle className="w-4 h-4 text-ink-400" />}
                    {appointment.status === 'unavailable' && <WarningCircle className="w-4 h-4 text-signal-caution" />}
                    <span className="text-type-body-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-white">
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-type-body-md font-medium text-ink-900 dark:text-white">
                    {appointment.simulated_slot}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-500 dark:text-ink-400">
                    Requested {formatDistanceToNow(new Date(appointment.created_at))} ago
                  </p>
                </div>
              </div>

              {isUnavailableOrCancelled && (
                <div className="mt-4 bg-white/50 dark:bg-black/20 p-3 rounded-radius-md border border-ink-200/50 dark:border-ink-700/50">
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300 mb-3">
                    {appointment.status === "cancelled" 
                      ? "You cancelled this booking request. We're still here to support you in other ways."
                      : "We couldn't secure this simulated slot. Don't worry, there are still people ready to listen."}
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant="secondary" size="sm" className="h-8 text-xs">
                      <Link href="/chat"><ChatText className="mr-1.5 w-3.5 h-3.5" /> Talk to Nova</Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm" className="h-8 text-xs">
                      <Link href="/study-hub"><BookOpenText className="mr-1.5 w-3.5 h-3.5" /> Explore Study Hub</Link>
                    </Button>
                  </div>
                </div>
              )}

              {appointment.status === "requested" && (
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleCancel(appointment.id)}
                    disabled={isPending}
                    className="h-8 text-xs text-signal-error border-signal-error/20 hover:bg-signal-error/10 hover:text-signal-error"
                  >
                    Cancel Request
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
