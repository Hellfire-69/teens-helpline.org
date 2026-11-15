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
    <main className="w-full min-h-screen bg-paper-50 dark:bg-night-950 text-ink-900 dark:text-white px-4 sm:px-6 md:px-8 max-w-6xl mx-auto flex flex-col gap-20 md:gap-28">
      {/* 1. Static Hero with warm cream tone, SVG ridges window, and Nova example card */}
      <AboutHero />

      {/* 2. "How it works" story adapted from Agent Canvas (desktop tabbed, mobile accordion) */}
      <AboutHowItWorks />

      {/* 3. Frequently Asked Questions */}
      <AboutFAQ />

      {/* 4. Closing Window */}
      <AboutClosingWindow />
    </main>
  )
}
