// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { AboutRidgeWindow, RIDGE_PALETTES } from "./AboutRidges"

export function AboutClosingWindow() {
  return (
    <section className="w-full">
      <AboutRidgeWindow
        tones={RIDGE_PALETTES.dusk}
        className="min-h-[440px] md:min-h-[480px] flex items-center justify-center p-6 sm:p-10 md:p-14"
      >
        <div className="w-full max-w-xl rounded-2xl md:rounded-3xl bg-paper-50/95 dark:bg-night-900/95 border border-ink-900/10 dark:border-white/10 p-8 sm:p-10 md:p-12 text-left shadow-xl transition-colors">
          <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold text-ink-900 dark:text-white mb-6 tracking-tight text-left">
            Ready to take your next right step?
          </h2>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
        </div>
      </AboutRidgeWindow>
    </section>
  )
}
