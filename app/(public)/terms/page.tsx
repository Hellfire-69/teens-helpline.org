import React from "react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | TeensHelpline",
  description: "Terms and conditions for using the TeensHelpline platform.",
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-paper-50 dark:bg-night-950 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-aurora-blush/10 text-aurora-blush text-[11px] font-bold tracking-widest uppercase mb-4">
            Legal & Trust Center
          </span>
          <h1 className="font-fraunces text-4xl md:text-5xl font-semibold text-ink-900 dark:text-white mb-4">
            Terms of Use
          </h1>
          <p className="text-ink-500 dark:text-ink-400 font-medium">
            Last updated: October 24, 2026
          </p>
        </header>

        <div className="space-y-8 text-ink-700 dark:text-ink-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using TeensHelpline (the "Platform"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Platform. The Platform is designed specifically for teenagers aged 13-19 residing in India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">2. Nature of the Service</h2>
            <p className="mb-4">
              TeensHelpline is an emotional support, self-regulation, and peer-community platform. <strong>It is not a clinical mental health clinic, nor is it a suicide prevention hotline.</strong> 
            </p>
            <p>
              The resources, AI companions, and peer support networks provided here are for educational and emotional grounding purposes only. They do not replace professional medical or psychiatric advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">3. User Conduct and Community Guidelines</h2>
            <p className="mb-4">
              To maintain a safe environment for all users, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Treat all members of the community with respect and empathy.</li>
              <li>Refrain from posting hate speech, bullying, harassment, or discriminatory content.</li>
              <li>Not attempt to deanonymize other users or share their personal information.</li>
              <li>Use the AI companion (Nova) appropriately and not attempt to bypass its safety filters.</li>
            </ul>
            <p className="mt-4">
              Violation of these guidelines will result in immediate suspension or termination of your access to the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">4. Intellectual Property</h2>
            <p>
              All original content, designs, texts, graphics, and software on the Platform are the property of TeensHelpline.org. You may not copy, reproduce, or distribute any part of the Platform without our explicit written permission.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
