"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Heart, EyeSlash, Shield, ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PeerSupportSection } from "@/features/marketing/components/PeerSupportSection"
import { FAQ } from "@/features/marketing/components/FAQ"

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="w-full min-h-screen pt-28 md:pt-36 pb-20 px-4 md:px-8">
      {/* ─── Hero Section ─── */}
      <section className="max-w-4xl mx-auto text-center mb-16 md:mb-24 mt-6 md:mt-10">
        <motion.span
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 rounded-full bg-aurora-sea/10 dark:bg-aurora-sea/20 text-aurora-sea text-xs font-semibold tracking-wider uppercase mb-6 border border-aurora-sea/20 backdrop-blur-md"
        >
          About TeensHelpline
        </motion.span>

        <motion.h1
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.05, ease: "easeOut" }}
          className="font-fraunces text-4xl md:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white mb-6"
        >
          A quiet place to catch your breath.
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.1, ease: "easeOut" }}
          className="text-lg md:text-xl text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed"
        >
          TeensHelpline was built by young people, for young people, to provide immediate emotional support whenever you need to talk.
        </motion.p>
      </section>

      {/* ─── Three Pillar Cards ─── */}
      <section aria-label="Core Pillars" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-32">
        {/* Pillar 1: Warm Support */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, rotate: -1.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-[2.5rem] bg-white/80 dark:bg-night-900/60 backdrop-blur-xl border border-ink-900/10 dark:border-white/10 shadow-lg p-8 md:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-aurora-sea/10 border border-aurora-sea/20 flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-aurora-sea" weight="duotone" />
            </div>
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-ink-900 dark:text-white mb-3">
              Warm Support
            </h2>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed text-base md:text-lg">
              Empathy first. No sterile clinical language. We meet you where you are, sounding like a supportive companion who understands everyday stress.
            </p>
          </div>
        </motion.div>

        {/* Pillar 2: Anonymous First */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, rotate: 1.5 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.08, ease: "easeOut" }}
          className="rounded-[2.5rem] bg-white/80 dark:bg-night-900/60 backdrop-blur-xl border border-ink-900/10 dark:border-white/10 shadow-lg p-8 md:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-aurora-dusk/10 border border-aurora-dusk/20 flex items-center justify-center mb-6">
              <EyeSlash className="w-7 h-7 text-aurora-dusk" weight="duotone" />
            </div>
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-ink-900 dark:text-white mb-3">
              Anonymous First
            </h2>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed text-base md:text-lg">
              You can start right away without creating an account or giving your real name, through the &apos;Continue Anonymously&apos; flow. Chat content is never shared with parents.
            </p>
          </div>
        </motion.div>

        {/* Pillar 3: Safety Layer & Crisis Support */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, rotate: -1.5 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.16, ease: "easeOut" }}
          className="rounded-[2.5rem] bg-white/80 dark:bg-night-900/60 backdrop-blur-xl border border-ink-900/10 dark:border-white/10 shadow-lg p-8 md:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-aurora-blush/10 border border-aurora-blush/20 flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-aurora-blush" weight="duotone" />
            </div>
            <h2 className="font-fraunces text-2xl md:text-3xl font-semibold text-ink-900 dark:text-white mb-3">
              Safety Layer &amp; Crisis Support
            </h2>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed text-base md:text-lg">
              Every message passes through keyword safety detection before reaching the AI. If acute risk or self-harm is detected, a crisis banner immediately displays direct emergency helpline numbers. Peer chats include automated filtering and a report button to flag unsafe messages.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── Peer Support Section ─── */}
      <PeerSupportSection />

      {/* ─── Frequently Asked Questions ─── */}
      <FAQ />

      {/* ─── Closing Block ─── */}
      <section className="max-w-4xl mx-auto text-center my-16 md:my-24">
        <div className="rounded-[2.5rem] bg-white/80 dark:bg-night-900/60 backdrop-blur-xl border border-ink-900/10 dark:border-white/10 shadow-lg p-10 md:p-14 flex flex-col items-center justify-center gap-6">
          <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink-900 dark:text-white tracking-tight">
            Ready to take your next right step?
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              variant="primary"
              className="group relative overflow-hidden rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/onboarding" className="flex items-center gap-3">
                <span className="font-semibold text-lg">Continue Anonymously</span>
                <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <Link
            href="/get-help"
            className="text-sm md:text-base font-medium text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm"
          >
            Need urgent help right now?
          </Link>
        </div>
      </section>
    </main>
  )
}
