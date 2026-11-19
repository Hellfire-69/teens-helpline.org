import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr"
import { GetHelpCurtain } from "@/features/marketing/components/GetHelpCurtain"
import { HelplineDirectory } from "@/features/marketing/components/HelplineDirectory"
import { HelpRidgeWindow } from "@/features/marketing/components/HelpRidgeWindow"

export const metadata: Metadata = {
  title: "Get Help Now — Crisis & Mental Health Helplines | TeensHelpline",
  description:
    "Free, confidential Indian crisis helplines, 24/7 mental health support, peer chat, and self-care resources for teenagers.",
}

const FAQS = [
  {
    question: "What happens when I contact a helpline?",
    answer:
      "A counsellor answers the call. You can talk about what is on your mind or take a moment to pause. They will guide the conversation at your pace.",
  },
  {
    question: "Do I need to share my real name?",
    answer:
      "Helplines focus on your immediate wellbeing and safety. You only need to share what you feel comfortable sharing.",
  },
  {
    question: "Can teenagers contact these services?",
    answer:
      "Yes. Child Helpline 1098 is dedicated specifically to youth under 18. Tele-MANAS, Vandrevala Foundation, and iCALL also support teenagers of any age.",
  },
  {
    question: "What does Quick Exit actually do?",
    answer:
      "Clicking Quick Exit immediately replaces the current page in your browser with a Google search for today's weather, preventing someone nearby from seeing what you were reading and stopping the browser back button from returning here. It does not erase your device's overall browsing history.",
  },
]

export default function GetHelpPage() {
  return (
    <div className="w-full min-h-screen bg-paper-50 dark:bg-night-950 text-ink-900 dark:text-white selection:bg-aurora-dawn/20">
      {/* ─── SCROLL-LINKED SANCTUARY CURTAIN HERO ─── */}
      <GetHelpCurtain />

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 space-y-16">
        
        {/* ─── HELPLINES DIRECTORY ─── */}
        <HelplineDirectory />

        {/* ─── ARTISTIC DIVIDER ─── */}
        <div className="my-6 md:my-10">
          <HelpRidgeWindow className="shadow-sm" />
        </div>

        {/* ─── ALTERNATIVE PATHWAYS: TEENSHELPLINE ECOSYSTEM ─── */}
        <section
          aria-labelledby="alternative-support-heading"
          className="pt-6 border-t border-ink-900/10 dark:border-white/10"
        >
          <div className="mb-6">
            <span className="text-sm font-semibold text-aurora-sea dark:text-aurora-sea block mb-1">
              Alternative Support
            </span>
            <h2
              id="alternative-support-heading"
              className="font-fraunces text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white mb-1.5"
            >
              When you aren&apos;t in a crisis
            </h2>
            <p className="font-sans text-sm text-ink-600 dark:text-ink-300">
              Quiet, gentle ways to reflect, learn, or talk with someone who gets it.
            </p>
          </div>

          {/* Simple text-led list of three links */}
          <div className="divide-y divide-ink-900/10 dark:divide-white/10">
            {/* 1. Talk with a Peer */}
            <article className="py-6 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-inter font-semibold text-base sm:text-lg text-ink-900 dark:text-white mb-1">
                  Talk with a Peer
                </h3>
                <p className="font-sans text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  Talk anonymously with another teenager who gets it.
                </p>
              </div>
              <Link
                href="/peer-support"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white hover:text-aurora-sea dark:hover:text-aurora-sea transition-colors shrink-0 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurora-sea rounded py-1"
              >
                <span>Start Peer Chat</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>

            {/* 2. Explore Study Hub */}
            <article className="py-6 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-inter font-semibold text-base sm:text-lg text-ink-900 dark:text-white mb-1">
                  Explore Study Hub
                </h3>
                <p className="font-sans text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  Self-paced guides on exam anxiety, panic coping, and grounding exercises.
                </p>
              </div>
              <Link
                href="/study-hub"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white hover:text-aurora-sea dark:hover:text-aurora-sea transition-colors shrink-0 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurora-sea rounded py-1"
              >
                <span>Open Study Hub</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>

            {/* 3. Reflect with Nova */}
            <article className="py-6 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-inter font-semibold text-base sm:text-lg text-ink-900 dark:text-white mb-1">
                  Reflect with Nova
                </h3>
                <p className="font-sans text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  Have a quiet, judgment-free conversation with our elder-sibling AI companion.
                </p>
              </div>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white hover:text-aurora-sea dark:hover:text-aurora-sea transition-colors shrink-0 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurora-sea rounded py-1"
              >
                <span>Chat with Nova</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          </div>
        </section>

        {/* ─── QUIET DISCLOSURE-BASED FAQ SECTION ─── */}
        <section
          aria-labelledby="faq-heading"
          className="pt-6 border-t border-ink-900/10 dark:border-white/10"
        >
          <div className="mb-6">
            <span className="text-sm font-semibold text-ink-600 dark:text-ink-400 block mb-1">
              Common Questions
            </span>
            <h2
              id="faq-heading"
              className="font-fraunces text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white"
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="divide-y divide-ink-900/10 dark:divide-white/10">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group py-4 first:pt-0 last:pb-0"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer select-none font-inter font-medium text-sm sm:text-base text-ink-900 dark:text-white hover:text-aurora-sea dark:hover:text-aurora-sea transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurora-sea rounded">
                  <span>{faq.question}</span>
                  <CaretDown className="w-4 h-4 text-ink-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="font-sans text-sm text-ink-600 dark:text-ink-300 leading-relaxed pt-2.5 pb-1 pr-6">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
