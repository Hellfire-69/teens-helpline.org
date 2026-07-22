import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export const metadata = {
  title: "Safeguarding Policy | TeensHelpline",
  description: "Read about our safeguarding guidelines and duty of care."
}

export default function SafeguardingPolicyPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-3xl mx-auto pt-28 leading-relaxed text-ink-600 dark:text-ink-300">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white mb-space-4">
        Safeguarding Policy
      </h1>
      <span className="text-type-body-sm text-ink-300 mb-space-6 block">Last updated: July 2026</span>

      <div className="space-y-space-6">
        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">1. Our Duty of Care</h2>
          <p>
            TeensHelpline has a strict duty of care to protect minors using the platform. While we prioritize anonymity, user safety overrides absolute privacy in cases of severe self-harm or threat to life.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">2. Escalation Protocol</h2>
          <p>
            If a minor discloses immediate suicide risk or self-harm, our safety core displays helpline links (such as CHILDLINE 1098 or TeleMANAS). In a production release, high-risk flags may trigger a call center notification to trained professionals.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">3. Peer Support Safety</h2>
          <p>
            All peer chats are monitored and subject to reporting guidelines. Bullying, harassment, or solicitation will lead to instant account ban and escalation to security.
          </p>
        </section>
      </div>
    </main>
  )
}
