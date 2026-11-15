// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import closingImage from "@/public/images/about/about-6.jpg"

export function AboutClosingWindow() {
  return (
    <section className="w-full relative rounded-3xl overflow-hidden min-h-[460px] md:min-h-[520px] flex items-center justify-center p-6 sm:p-10 md:p-14 border border-ink-900/10 dark:border-white/10">
      {/* Background Vista Image in warm dusk tones */}
      <Image
        src={closingImage}
        alt="Tranquil lake view with warm evening dusk tones"
        placeholder="blur"
        loading="lazy"
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover"
      />

      {/* Soft warm dusk overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/25 pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Call to Action Card */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl md:rounded-3xl bg-paper-50/95 dark:bg-night-900/95 border border-ink-900/10 dark:border-white/10 p-8 sm:p-10 md:p-12 text-center shadow-xl">
        <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-semibold text-ink-900 dark:text-white mb-6 tracking-tight">
          Ready to take your next right step?
        </h2>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            variant="primary"
            className="rounded-full px-8 py-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            asChild
          >
            <Link href="/onboarding" className="flex items-center gap-2.5">
              <span>Continue Anonymously</span>
              <ArrowRight className="w-5 h-5" weight="bold" />
            </Link>
          </Button>

          <Link
            href="/get-help"
            className="text-base md:text-lg font-medium text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline rounded-sm mt-2"
          >
            Need urgent help right now?
          </Link>
        </div>
      </div>
    </section>
  )
}
