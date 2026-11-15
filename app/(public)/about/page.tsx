import type { Metadata } from "next"
import { AboutHero } from "@/features/marketing/components/AboutHero"
import { AboutHowItWorks } from "@/features/marketing/components/AboutHowItWorks"
import { AboutFAQ } from "@/features/marketing/components/AboutFAQ"
import { AboutClosingWindow } from "@/features/marketing/components/AboutClosingWindow"

export const metadata: Metadata = {
  title: "About | TeensHelpline",
  description:
    "TeensHelpline was built by young people, for young people, to provide immediate emotional support whenever you need to talk.",
}

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-paper-50 dark:bg-night-950 text-ink-900 dark:text-white selection:bg-aurora-dawn/20">
      <main className="w-full flex flex-col gap-20 md:gap-32">
        {/* 1. Hero with expanding ridge window & Nova example card */}
        <AboutHero />

        {/* 2. "How it works" story adapted from Agent Canvas */}
        <div className="w-full">
          <AboutHowItWorks />
        </div>

        {/* 3. Frequently Asked Questions */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8">
          <AboutFAQ />
        </div>

        {/* 4. Closing Window */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 pb-16">
          <AboutClosingWindow />
        </div>
      </main>
    </div>
  )
}
