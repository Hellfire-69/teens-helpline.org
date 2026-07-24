import { type Metadata } from "next";
import { ProfessionalBookingForm } from "@/features/consultation/components/professional/professional-booking-form";
import { ProfessionalBookingList } from "@/features/consultation/components/professional/professional-booking-list";
import { getAppointmentsAction } from "@/features/consultation/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Professional Support | TeensHelpline",
  description: "Request a structured professional consultation session.",
};

export default async function ProfessionalConsultationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Apply authentication gating logic
  if (!user) {
    return (
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-space-8 py-space-12 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-aurora-sea/10 rounded-radius-full flex items-center justify-center mb-space-6 text-aurora-sea">
          <ShieldCheck weight="fill" className="w-8 h-8" />
        </div>
        <h2 className="text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-4">
          Account Required
        </h2>
        <p className="text-type-body-md text-ink-600 dark:text-ink-400 text-center max-w-md mb-space-8">
          Professional Consultation Booking is a structured service that requires you to be signed in to your account.
        </p>
        <div className="flex gap-4">
          <Link href="/consultation" className="inline-flex items-center text-ink-600 hover:text-ink-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Support Options
          </Link>
          <Link href="/signin" className="bg-gradient-to-r from-aurora-dusk to-aurora-sea text-white h-11 px-6 rounded-radius-sm flex items-center justify-center font-semibold hover:brightness-110 transition-all">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const res = await getAppointmentsAction();
  const appointments = (res.success && res.data) ? res.data : [];

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-space-8 py-space-8">
      <Link href="/consultation" className="inline-flex items-center text-type-body-sm text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white mb-space-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Support Options
      </Link>
      <div className="space-y-space-12">
        <ProfessionalBookingForm />
        <ProfessionalBookingList appointments={appointments} />
      </div>
    </div>
  );
}
