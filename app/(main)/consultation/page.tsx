import { type Metadata } from "next";
import Link from "next/link";
import { Sparkle, ShieldCheck, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Support | TeensHelpline",
  description: "Get quick guidance or request a professional consultation.",
};

export default function ConsultationChooserPage() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-space-8 py-space-12 flex flex-col items-center justify-center">
      <div className="text-center mb-space-12">
        <h1 className="text-type-display font-fraunces text-ink-900 dark:text-white mb-space-4">
          How can we support you today?
        </h1>
        <p className="text-type-body-lg text-ink-600 dark:text-ink-300 max-w-2xl mx-auto">
          Choose the option that feels right for you. You can talk to Nova right now, or request a structured session.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6 w-full max-w-3xl">
        {/* Basic Consultation Card */}
        <Link 
          href="/consultation/basic"
          className="group relative flex flex-col bg-white dark:bg-night-950 rounded-radius-lg border border-ink-200 dark:border-ink-800 p-space-8 hover:shadow-elevation-md hover:border-aurora-sea/50 transition-all duration-300"
        >
          <div className="w-12 h-12 bg-aurora-sea/10 text-aurora-sea rounded-radius-md flex items-center justify-center mb-space-6 group-hover:scale-110 transition-transform duration-300">
            <Sparkle weight="fill" className="w-6 h-6" />
          </div>
          <h2 className="text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">
            Quick Guidance
          </h2>
          <p className="text-type-body-md text-ink-600 dark:text-ink-400 mb-space-8 flex-1">
            Talk to Nova immediately. Ask a question, vent, or get immediate support in a safe space.
          </p>
          <div className="flex items-center text-aurora-sea font-semibold text-type-body-sm group-hover:underline">
            Start talking <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </Link>

        {/* Professional Booking Card */}
        <Link 
          href="/consultation/professional"
          className="group relative flex flex-col bg-white dark:bg-night-950 rounded-radius-lg border border-ink-200 dark:border-ink-800 p-space-8 hover:shadow-elevation-md hover:border-aurora-sea/50 transition-all duration-300"
        >
          <div className="w-12 h-12 bg-aurora-sea/10 text-aurora-sea rounded-radius-md flex items-center justify-center mb-space-6 group-hover:scale-110 transition-transform duration-300">
            <ShieldCheck weight="fill" className="w-6 h-6" />
          </div>
          <h2 className="text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">
            Professional Support
          </h2>
          <p className="text-type-body-md text-ink-600 dark:text-ink-400 mb-space-8 flex-1">
            Request a structured consultation session. Requires an account and guardian approval.
          </p>
          <div className="flex items-center text-aurora-sea font-semibold text-type-body-sm group-hover:underline">
            Request booking <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
}
