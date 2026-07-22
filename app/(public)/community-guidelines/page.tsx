import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export const metadata = {
  title: "Community Guidelines | TeensHelpline",
  description: "Read the rules for engaging in peer support and conversations on TeensHelpline."
}

export default function CommunityGuidelinesPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-3xl mx-auto pt-28 leading-relaxed text-ink-600 dark:text-ink-300">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white mb-space-4">
        Community Guidelines
      </h1>
      <span className="text-type-body-sm text-ink-300 mb-space-6 block">Last updated: July 2026</span>

      <div className="space-y-space-6">
        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">1. Respect & Empathy</h2>
          <p>
            TeensHelpline peer support is a warm, non-judgmental space. Bullying, hate speech, trolling, or aggressive behavior will result in an immediate block from the platform.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">2. Respect Privacy</h2>
          <p>
            Do not request or share personal contact information (e.g. phone numbers, Instagram handles, real names, addresses) in peer chat sessions.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">3. Keep it Non-Clinical</h2>
          <p>
            Peer volunteers are here to listen and validate your feelings. Do not request or offer diagnoses, treatment scripts, or recommendations for medications.
          </p>
        </section>
      </div>
    </main>
  )
}
