// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { AboutRidges, RIDGE_PALETTES } from "./AboutRidges"
import { AboutHeroChat } from "./AboutHeroChat"

export function AboutHero() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "start 25%"],
  })

  // Responsive, low-latency spring matching Cairn scrub 0.5 without sluggish drag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.15,
    restDelta: 0.001,
  })

  // Expanding window clip-path: starts framed & rounded, expands as it scrolls into view
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(12% 9% 12% 9% round 40px)", "inset(0% 0% 0% 0% round 14px)"]
  )

  // Subtle parallax drift on the background mountain ridges
  const ridgeY = useTransform(smoothProgress, [0, 1], ["-6%", "6%"])

  return (
    <section className="w-full pt-20 sm:pt-24 md:pt-28 pb-6 flex flex-col items-start text-left">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8">
        {/* Main Headline (starts ~48px below floating navbar) */}
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
      </div>

      {/* Ridge Window with Expanding Frame & Floating Nova Example Card */}
      <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 overflow-hidden">
        <motion.div
          style={{
            clipPath: prefersReduced ? "inset(0% 0% 0% 0% round 14px)" : clipPath,
          }}
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-ink-900/10 dark:border-white/10 min-h-[480px] md:min-h-[540px] flex items-center justify-center p-5 sm:p-8 md:p-12 shadow-xl"
        >
          {/* Parallax Mountains Container */}
          <motion.div
            style={{
              y: prefersReduced ? 0 : ridgeY,
            }}
            className="absolute -inset-x-0 -top-[10%] -bottom-[10%] w-full h-[120%] pointer-events-none"
          >
            <AboutRidges tones={RIDGE_PALETTES.dawn} />
          </motion.div>

          {/* Floating Nova Card */}
          <div className="relative z-10 w-full flex justify-center py-4">
            <AboutHeroChat />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
