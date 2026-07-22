import Link from "next/link"
import { ArrowLeft, Warning } from "@phosphor-icons/react/dist/ssr"

export const metadata = {
  title: "Service Disclaimer | TeensHelpline",
  description: "Read our service disclaimer regarding clinical care and professional limits."
}

export default function ServiceDisclaimerPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-3xl mx-auto pt-28 leading-relaxed text-ink-600 dark:text-ink-300">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="flex items-center gap-space-3 mb-space-4 text-signal-caution">
        <Warning className="w-8 h-8" weight="fill" />
        <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white">
          Service Disclaimer
        </h1>
      </div>
      <span className="text-type-body-sm text-ink-300 mb-space-6 block">Last updated: July 2026</span>

      <div className="space-y-space-6 border border-signal-caution/20 bg-signal-caution/5 rounded-radius-md p-space-6 mb-space-6">
        <h2 className="font-inter font-semibold text-type-title-md text-ink-900 dark:text-white">Not a Clinical or Emergency Service</h2>
        <p>
          TeensHelpline.org is an emotional support platform. We provide peer-to-peer connection, self-guided focus resources, and automated conversational companionship. 
        </p>
        <p>
          <strong>We do not deliver medical diagnosis, clinical mental health therapy, or emergency crisis counselling.</strong> Interacting with our AI companion Nova is not a substitute for professional mental health care or medical advice.
        </p>
        <p>
          If you are experiencing suicidal ideation, self-harm, or any emergency crisis, please call CHILDLINE at 1098 or TeleMANAS at 14416 immediately.
        </p>
      </div>

      <div className="text-center mt-space-8">
        <Link href="/get-help" className="text-aurora-sea font-semibold hover:underline">
          View Emergency Helplines Directory &rarr;
        </Link>
      </div>
    </main>
  )
}
