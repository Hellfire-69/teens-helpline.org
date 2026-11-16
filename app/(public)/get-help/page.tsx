import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Phone, Clock, Chats, BookOpen, ArrowDown } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { HelpRidgeWindow } from "@/features/marketing/components/HelpRidgeWindow"
import { GetHelpCurtain } from "@/features/marketing/components/GetHelpCurtain"

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

      {/* ─── UNBLOCKED TOP CRISIS TRIAGE BAR ─── */}
      <header className="sticky top-0 z-40 w-full bg-paper-50/90 dark:bg-night-950/90 backdrop-blur-md border-b border-ink-900/10 dark:border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-aurora-sea hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Quick-dial crisis pills & skip jump button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400 hidden lg:inline">
              Immediate 24/7 Crisis:
            </span>
            <a
              href="tel:1098"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-900 hover:bg-ink-800 dark:hover:bg-paper-100 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea min-h-[36px]"
            >
              <Phone className="w-3.5 h-3.5" weight="fill" />
              <span>CHILDLINE 1098</span>
            </a>
            <a
              href="tel:14416"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 text-ink-900 dark:text-white hover:border-aurora-sea text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea min-h-[36px]"
            >
              <Phone className="w-3.5 h-3.5" weight="fill" />
              <span>TeleMANAS 14416</span>
            </a>
            <a
              href="#helplines-list"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-aurora-sea/10 text-aurora-sea hover:bg-aurora-sea/20 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea min-h-[36px]"
            >
              <span>Skip to helplines</span>
              <ArrowDown className="w-3.5 h-3.5" weight="bold" />
            </a>
          </div>
        </div>
      </header>

      {/* ─── DEDICATED 155svh STICKY HERO REVEAL STAGE ─── */}
      <GetHelpCurtain />

      {/* ─── MAIN CONTENT: HELPLINES DIRECTORY & ALTERNATE SUPPORT ─── */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-20 help-fade-in">
        {/* Helplines List — rows sit directly on cream page with thin dividers */}
        <section
          id="helplines-list"
          aria-label="Helplines Directory"
          className="w-full divide-y divide-ink-900/10 dark:divide-white/10 mb-space-16 scroll-mt-24 pt-4"
        >
          {HELPLINES.map((line) => (
            <div
              key={line.name}
              className="py-space-8 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
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
                className="shrink-0 w-full sm:w-auto rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 min-h-[44px] px-6 py-3 text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2"
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

        {/* Quiet decorative ridge window positioned as an artistic divider before alternate support */}
        <div className="my-space-12">
          <HelpRidgeWindow className="shadow-sm" />
        </div>

        {/* If you aren't in a crisis Options */}
        <section
          aria-labelledby="non-crisis-heading"
          className="pt-space-8 border-t border-ink-900/10 dark:border-white/10"
        >
          <h2
            id="non-crisis-heading"
            className="font-fraunces text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white mb-6"
          >
            If you aren&apos;t in a crisis
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
