import React from "react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | TeensHelpline",
  description: "Learn how TeensHelpline protects your privacy and data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-paper-50 dark:bg-night-950 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-aurora-sea/10 text-aurora-sea text-[11px] font-bold tracking-widest uppercase mb-4">
            Legal & Trust Center
          </span>
          <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-ink-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-ink-500 dark:text-ink-400 font-medium">
            Last updated: October 24, 2026
          </p>
        </header>

        <div className="space-y-8 text-ink-700 dark:text-ink-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">1. Our Commitment to Your Privacy</h2>
            <p>
              At TeensHelpline, your safety and privacy are our highest priorities. We understand that discussing emotional wellbeing requires a foundation of absolute trust. This policy explains what information we collect, how we anonymize it, and how we protect it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">2. Information We Do Not Collect</h2>
            <p className="mb-4">
              Unlike social media platforms, we deliberately minimize the data we gather:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not require your real name, phone number, or address to use the Study Hub or Peer Support.</li>
              <li>We do not track your location via GPS.</li>
              <li>We do not sell any of your data to advertisers or third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">3. Data Anonymization & Security</h2>
            <p>
              All interactions with our AI companion, Nova, and within the Peer Support portal are strictly anonymized. Chat logs used for moderation or system improvement are stripped of personal identifiers. Any composite feedback displayed on our site is an illustration designed to protect user identities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">4. Safeguarding and Escalation</h2>
            <p>
              Our systems include automated safety checks. If our system detects an imminent risk to your life or the life of someone else, we are required by safeguarding protocols to intervene. In these rare, life-threatening scenarios, we may escalate the issue to emergency services using the limited technical data available to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">5. Your Rights</h2>
            <p>
              You have the right to request the deletion of your account and any associated data at any time. You can do this through the account settings panel or by contacting our Trust & Safety team.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
