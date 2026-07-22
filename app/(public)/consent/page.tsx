import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export const metadata = {
  title: "Consent Policy | TeensHelpline",
  description: "Learn about our user consent guidelines for teenagers and parents."
}

export default function ConsentPolicyPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-3xl mx-auto pt-28 leading-relaxed text-ink-600 dark:text-ink-300">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white mb-space-4">
        Consent Policy
      </h1>
      <span className="text-type-body-sm text-ink-300 mb-space-6 block">Last updated: July 2026</span>

      <div className="space-y-space-6">
        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">1. Teen Consent (13–19)</h2>
          <p>
            By continuing on TeensHelpline, you consent to interacting with Nova (our automated assistant) and using our peer support portal. You acknowledge that Nova is an AI tool and not a clinical therapist.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">2. Parent & Guardian Consent</h2>
          <p>
            Self-help browsing and anonymous conversations require no parental consent. Professional counselling sessions (simulated in this prototype) would require verifiable parent/guardian consent in a production release.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">3. Retraction of Consent</h2>
          <p>
            You can revoke your consent at any time by closing the application or requesting account deletion, which wipes your data from our database.
          </p>
        </section>
      </div>
    </main>
  )
}
