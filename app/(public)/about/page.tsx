import type { Metadata } from "next"
import { AboutHeroWindow } from "@/features/marketing/components/AboutHeroWindow"
import { AboutPillars } from "@/features/marketing/components/AboutPillars"
import { AboutPeerSupport } from "@/features/marketing/components/AboutPeerSupport"
import { AboutFAQ } from "@/features/marketing/components/AboutFAQ"
import { AboutClosingWindow } from "@/features/marketing/components/AboutClosingWindow"

export const metadata: Metadata = {
  title: "About | TeensHelpline",
  description:
    "TeensHelpline was built by young people, for young people, to provide immediate emotional support whenever you need to talk.",
}

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
      {/* 1. Hero Window onto calm landscape with floating Nova conversation */}
      <AboutHeroWindow />

      {/* 2. Core Pillar Windows: Warm Support, Anonymous First, Safety Layer */}
      <AboutPillars />

      {/* 3. Peer Support Section */}
      <AboutPeerSupport />

      {/* 4. Frequently Asked Questions */}
      <AboutFAQ />

      {/* 5. Closing Window in warm dusk tones */}
      <AboutClosingWindow />
    </main>
  )
}
