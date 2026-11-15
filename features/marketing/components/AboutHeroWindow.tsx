// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
const heroImage = "/images/about/about-1.jpg"
import { AboutHeroChat } from "./AboutHeroChat"

export function AboutHeroWindow() {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 85%", "center center"],
  })

  // Framed window expands to full-bleed as user scrolls
  const clipInset = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : 24, 0]
  )
  const clipRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 24 : 32, 0]
  )
  const clipPath = useTransform(
    [clipInset, clipRadius],
    ([inset, radius]) => `inset(0px ${inset}px round ${radius}px)`
  )

  return (
    <section className="w-full flex flex-col items-center">
      {/* Intro Copy */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-10 md:mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-aurora-sea/10 dark:bg-aurora-sea/20 text-aurora-sea text-xs font-semibold tracking-wider uppercase mb-6 border border-aurora-sea/20">
          About TeensHelpline
        </span>

        <h1 className="font-fraunces text-4xl md:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white mb-6">
          A quiet place to catch your breath.
        </h1>

        <p className="font-sans text-lg md:text-xl text-ink-700 dark:text-ink-200 max-w-2xl mx-auto leading-relaxed">
          TeensHelpline was built by young people, for young people, to provide immediate emotional support whenever you need to talk.
        </p>
      </div>

      {/* Hero Window with Scroll-Linked Expansion */}
      <div ref={stageRef} className="w-full relative">
        <motion.div
          style={{ clipPath: shouldReduceMotion ? undefined : clipPath }}
          className={`relative w-full overflow-hidden min-h-[520px] md:min-h-[640px] flex items-center justify-center p-4 sm:p-8 md:p-12 ${
            shouldReduceMotion ? "rounded-3xl" : ""
          }`}
        >
          {/* Background Vista Image */}
          <Image
            src={heroImage}
            alt="Tranquil foggy mountain lake landscape"
            priority
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* Soft contrast overlay for legibility */}
          <div
            className="absolute inset-0 bg-black/30 dark:bg-black/50 pointer-events-none"
            aria-hidden="true"
          />

          {/* Floating Nova Conversation Card */}
          <div className="relative z-10 w-full flex justify-center py-6">
            <AboutHeroChat />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
