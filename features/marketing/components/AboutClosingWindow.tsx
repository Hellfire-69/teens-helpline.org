// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Shield, CheckCircle, Heart, Sparkle } from "@phosphor-icons/react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { AboutRidges, RIDGE_PALETTES } from "./AboutRidges"

export function AboutClosingWindow() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // Track scroll progress from entering the viewport to reaching upper third
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
    <section ref={containerRef} className="relative w-full overflow-hidden">
      <motion.div
        style={{
          clipPath: prefersReduced ? "inset(0% 0% 0% 0% round 14px)" : clipPath,
        }}
        className="relative w-full h-[clamp(560px,86vh,820px)] rounded-2xl md:rounded-3xl overflow-hidden border border-ink-900/10 dark:border-white/10 flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-16 shadow-2xl"
      >
        {/* Parallax Mountains Container (Warm dusk ridges) */}
        <motion.div
          style={{
            y: prefersReduced ? 0 : ridgeY,
          }}
          className="absolute -inset-x-0 -top-[10%] -bottom-[10%] w-full h-[120%] pointer-events-none"
        >
          <AboutRidges tones={RIDGE_PALETTES.dusk} />
        </motion.div>

        {/* Ambient Dark Shade Overlay for contrast on text */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-night-950/20 via-night-950/45 to-night-950/70"
          aria-hidden="true"
        />

        {/* Floating Centered Content directly over the landscape (matches Cairn CTA template) */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center text-center">
          {/* Eyebrow kicker */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold uppercase tracking-wider mb-6 border border-white/20 shadow-sm">
            <Sparkle className="w-3.5 h-3.5 text-aurora-dawn" weight="fill" />
            <span>Always Here</span>
          </span>

          {/* Large Fraunces headline */}
          <h2 className="font-fraunces text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white text-center leading-[1.08] tracking-tight mb-5 drop-shadow-md">
            Ready to take your next right step?
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/85 text-center max-w-2xl leading-relaxed mb-9 drop-shadow-sm">
            TeensHelpline was built by young people, for young people, to provide immediate emotional support whenever you need to talk.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
            <Button
              size="lg"
              asChild
              className="rounded-full bg-white hover:bg-paper-100 text-ink-900 px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              <Link href="/onboarding" className="flex items-center gap-2.5">
                <span>Continue Anonymously</span>
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Link>
            </Button>

            <Link
              href="/get-help"
              className="text-base font-medium text-white/90 hover:text-white underline underline-offset-4 transition-colors py-2 drop-shadow-sm"
            >
              Need urgent help right now?
            </Link>
          </div>

          {/* Subtle Assurances (Cairn style, existing site copy) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-6 border-t border-white/15 text-xs sm:text-sm font-medium text-white/75">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-aurora-sea" weight="fill" />
              Anonymous First
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-aurora-dawn" weight="fill" />
              No Account Required
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-aurora-blush" weight="fill" />
              Free &amp; Confidential
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
