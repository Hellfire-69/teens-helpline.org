import Link from "next/link"
import { ArrowLeft, Shield, EyeSlash, PhoneCall } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Safety & Privacy | TeensHelpline",
  description: "Learn how we protect your data and safety on TeensHelpline."
}

export default function SafetyPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-content mx-auto pt-28">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white mb-space-4">
          Safety & Privacy Core
        </h1>

        <p className="text-type-body-lg text-ink-600 dark:text-ink-300 leading-relaxed mb-space-8">
          TeensHelpline is built with security and clinical safety as its highest priorities. We make sure you can talk about your worries without fearing your information will be leaked or mishandled.
        </p>

        {/* Sections */}
        <div className="space-y-space-8">
          <div className="flex gap-space-4 items-start">
            <div className="w-10 h-10 rounded-radius-md bg-signal-crisis/10 flex items-center justify-center text-signal-crisis shrink-0">
              <PhoneCall className="w-5 h-5" weight="duotone" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-type-title-md text-ink-900 dark:text-white mb-space-2">Rule-Based Escalation</h3>
              <p className="text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                Nova never handles crisis situations. If our system detects keywords or patterns associated with self-harm, suicide, or illegal substances, it bypasses the AI provider completely. You are immediately shown our persistent block of Indian crisis helplines for instant human connection.
              </p>
            </div>
          </div>

          <div className="flex gap-space-4 items-start">
            <div className="w-10 h-10 rounded-radius-md bg-aurora-sea/10 flex items-center justify-center text-aurora-sea shrink-0">
              <EyeSlash className="w-5 h-5" weight="duotone" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-type-title-md text-ink-900 dark:text-white mb-space-2">Response Validation</h3>
              <p className="text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                Every AI response is double-checked in milliseconds by our independent validator after generation. This ensures Nova never mistakenly suggests medical diagnosis, medication, or therapy replacements.
              </p>
            </div>
          </div>

          <div className="flex gap-space-4 items-start">
            <div className="w-10 h-10 rounded-radius-md bg-aurora-dusk/10 flex items-center justify-center text-aurora-dusk shrink-0">
              <Shield className="w-5 h-5" weight="duotone" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-type-title-md text-ink-900 dark:text-white mb-space-2">Data Minimization</h3>
              <p className="text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                Anonymous users leave no database trace whatsoever. If you choose to log in, we only save your alias and a restricted history scoped strictly behind Row-Level Security (RLS). We never sell your data or trace IP addresses.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-space-10 pt-space-6 border-t border-ink-300/10 dark:border-white/5 text-center">
          <Button variant="primary" size="md" asChild>
            <Link href="/crisis-info">View Helpline Directory</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
