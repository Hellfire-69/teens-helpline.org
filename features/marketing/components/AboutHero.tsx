// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { AboutRidgeWindow, RIDGE_PALETTES } from "./AboutRidges"
import { AboutHeroChat } from "./AboutHeroChat"

export function AboutHero() {
  return (
    <section className="w-full pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-10 flex flex-col items-start text-left">
      {/* Eyebrow badge */}
      <span className="inline-block px-3.5 py-1 rounded-full bg-aurora-sea/10 dark:bg-aurora-sea/20 text-aurora-sea text-xs font-semibold tracking-wider uppercase mb-5 border border-aurora-sea/20">
        About TeensHelpline
      </span>

      {/* Main Headline */}
      <h1 className="font-fraunces text-4xl sm:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white mb-5 max-w-3xl text-left">
        A quiet place to catch your breath.
      </h1>

      {/* Subtitle */}
      <p className="font-sans text-lg md:text-xl text-ink-700 dark:text-ink-300 max-w-2xl leading-relaxed mb-8 text-left">
        TeensHelpline was built by young people, for young people, to provide immediate emotional support whenever you need to talk.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
        <Button
          size="lg"
          asChild
          className="rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 px-7 py-6 text-base font-semibold shadow-sm transition-colors"
        >
          <Link href="/onboarding" className="flex items-center gap-2.5">
            <span>Continue Anonymously</span>
            <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </Button>

        <Link
          href="/get-help"
          className="text-base font-medium text-ink-700 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white underline underline-offset-4 transition-colors py-2"
        >
          Need urgent help right now?
        </Link>
      </div>

      {/* Ridge Window with Floating Nova Example Card (No photos, no scroll-linking, no fake counters) */}
      <AboutRidgeWindow
        tones={RIDGE_PALETTES.dawn}
        className="min-h-[460px] md:min-h-[520px] flex items-center justify-center p-5 sm:p-8 md:p-12"
      >
        <div className="w-full flex justify-center py-4">
          <AboutHeroChat />
        </div>
      </AboutRidgeWindow>
    </section>
  )
}
