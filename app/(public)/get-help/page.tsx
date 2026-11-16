import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Phone, Clock, Chats, BookOpen } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { HelpRidgeWindow } from "@/features/marketing/components/HelpRidgeWindow"

export const metadata: Metadata = {
  title: "Get Help Now | TeensHelpline",
  description: "Access immediate crisis resources, peer chat support, or self-help materials.",
}

const HELPLINES = [
  { name: "CHILDLINE (Youth Emergency)", number: "1098", availability: "24/7, Free", desc: "Government emergency response service for children and teenagers." },
  { name: "TeleMANAS", number: "14416", availability: "24/7, Free", desc: "Government tele-mental health helpline available in multiple languages." },
  { name: "KIRAN Helpline", number: "1800-599-0019", availability: "24/7, Free", desc: "National mental health rehabilitation helpline under Ministry of Social Justice." },
  { name: "Vandrevala Foundation", number: "1860-266-2345", availability: "24/7, Free", desc: "Non-profit crisis intervention counselling via call or online chat." },
  { name: "iCALL (TISS Initiative)", number: "9152987821", availability: "Mon-Sat, 10am-8pm", desc: "Professional psychosocial counselling service run by trained counselors." }
]

export default function GetHelpPage() {
  return (
    <div className="w-full min-h-screen bg-paper-50 dark:bg-night-950 text-ink-900 dark:text-white selection:bg-aurora-dawn/20">
      <style>{`
        @keyframes helpFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .help-fade-in {
            animation: helpFadeIn 0.35s ease-out both;
          }
        }
      `}</style>

      <main className="flex-1 flex flex-col py-space-12 px-4 sm:px-6 md:px-8 w-full max-w-4xl mx-auto pt-24 sm:pt-28 pb-20 help-fade-in">
        <div className="mb-space-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-semibold text-aurora-sea hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Quiet decorative ridge window */}
        <HelpRidgeWindow className="mb-space-8" />

        {/* Page Heading & Calm reassurance */}
        <div className="mb-space-10">
          <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white mb-2">
            I Need Help Now
          </h1>
          <p className="font-sans text-lg sm:text-xl font-medium text-aurora-sea dark:text-aurora-sea mb-4">
            You don't have to carry it all alone.
          </p>
          <p className="font-sans text-base sm:text-lg text-ink-700 dark:text-ink-300 leading-relaxed max-w-2xl">
            If you are in immediate danger, feeling overwhelmed, or need to talk to a professional right now, please reach out to one of the free, confidential Indian helplines below.
          </p>
        </div>

        {/* Helplines List — rows sit directly on cream page with thin dividers */}
        <section aria-label="Helplines Directory" className="w-full divide-y divide-ink-900/10 dark:divide-white/10 mb-space-12">
          {HELPLINES.map((line) => (
            <div
              key={line.name}
              className="py-space-8 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <span className="font-inter font-semibold text-base sm:text-lg text-ink-900 dark:text-white block mb-1">
                  {line.name}
                </span>
                <span className="font-fraunces text-3xl md:text-4xl font-semibold tracking-tight text-ink-900 dark:text-white block mb-2">
                  {line.number}
                </span>
                <p className="font-sans text-base text-ink-700 dark:text-ink-300 leading-relaxed max-w-xl mb-3">
                  {line.desc}
                </p>
                <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-ink-600 dark:text-ink-400">
                  <Clock className="w-4 h-4 text-aurora-sea shrink-0" weight="bold" aria-hidden="true" />
                  <span>{line.availability}</span>
                </div>
              </div>

              <Button
                asChild
                className="shrink-0 w-full md:w-auto rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 min-h-[44px] px-6 py-3 text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2"
              >
                <a
                  href={`tel:${line.number.replace(/[^0-9]/g, "")}`}
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 shrink-0" weight="fill" aria-hidden="true" />
                  <span>Call {line.number}</span>
                </a>
              </Button>
            </div>
          ))}
        </section>

        {/* Not in a crisis? Options */}
        <section
          aria-labelledby="non-crisis-heading"
          className="pt-space-8 border-t border-ink-900/10 dark:border-white/10"
        >
          <h2
            id="non-crisis-heading"
            className="font-fraunces text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white mb-6"
          >
            Not in a crisis?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col items-start justify-between gap-4">
              <div>
                <h3 className="font-inter font-semibold text-lg text-ink-900 dark:text-white flex items-center gap-2">
                  <Chats className="w-5 h-5 text-aurora-blush shrink-0" weight="duotone" aria-hidden="true" />
                  <span>Talk with a Peer</span>
                </h3>
                <p className="font-sans text-base text-ink-700 dark:text-ink-300 leading-relaxed mt-2">
                  If you aren&apos;t in a crisis but want to talk anonymously with another teenager who gets it.
                </p>
              </div>
              <Button
                asChild
                className="rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 min-h-[44px] px-6 py-2.5 text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2"
              >
                <Link href="/peer-support">
                  Start Peer Chat
                </Link>
              </Button>
            </div>

            <div className="flex flex-col items-start justify-between gap-4">
              <div>
                <h3 className="font-inter font-semibold text-lg text-ink-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-aurora-sea shrink-0" weight="duotone" aria-hidden="true" />
                  <span>Explore Study Hub</span>
                </h3>
                <p className="font-sans text-base text-ink-700 dark:text-ink-300 leading-relaxed mt-2">
                  Find articles on stress management, bullying guidance, and focus tools.
                </p>
              </div>
              <Button
                asChild
                className="rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 min-h-[44px] px-6 py-2.5 text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2"
              >
                <Link href="/study-hub">
                  Open Study Hub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
