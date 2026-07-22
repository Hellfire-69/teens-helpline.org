"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { UsersThree, CheckCircle, Warning, ArrowRight } from "@phosphor-icons/react"

export function PeerSupportSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-space-12 px-4 md:px-space-8 max-w-content mx-auto w-full">
      <div className="flex items-center gap-space-3 mb-space-8">
        <div className="w-12 h-12 rounded-radius-full bg-aurora-blush/10 dark:bg-aurora-blush/20 flex items-center justify-center text-aurora-blush shadow-sm">
          <UsersThree className="w-6 h-6" weight="fill" />
        </div>
        <div>
          <span className="text-type-label text-aurora-blush tracking-wider uppercase">Community</span>
          <h2 className="font-fraunces text-type-title-xl font-semibold text-ink-900 dark:text-white">
            Talk to someone who gets it
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-8 items-start">
        {/* Left Column: Why & How */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-space-6">
          {/* Why Peer Support Works */}
          <div className="flex flex-col gap-space-4">
            <h3 className="text-type-title-md font-inter font-semibold text-ink-900 dark:text-white">
              Why peer support works
            </h3>
            <ul className="flex flex-col gap-space-3">
              <li className="flex items-start gap-space-3">
                <CheckCircle className="w-5 h-5 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <h4 className="text-type-body-md font-semibold text-ink-900 dark:text-white">Shared Experiences</h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">Volunteers are teenagers who have been there themselves and understand the pressure.</p>
                </div>
              </li>
              <li className="flex items-start gap-space-3">
                <CheckCircle className="w-5 h-5 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <h4 className="text-type-body-md font-semibold text-ink-900 dark:text-white">Low Pressure</h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">Text-only anonymous chat allows you to speak openly without feeling exposed or judged.</p>
                </div>
              </li>
              <li className="flex items-start gap-space-3">
                <CheckCircle className="w-5 h-5 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <h4 className="text-type-body-md font-semibold text-ink-900 dark:text-white">Active Listening</h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">Our peers are trained to validate and support your feelings, not direct your actions.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* How It Works (Numbered steps) */}
          <div className="flex flex-col gap-space-4">
            <h3 className="text-type-title-md font-inter font-semibold text-ink-900 dark:text-white">
              How it works
            </h3>
            <ol className="flex flex-col gap-space-3">
              <li className="flex gap-space-3">
                <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-type-body-sm font-bold text-ink-600 dark:text-ink-300 shrink-0">
                  1
                </span>
                <div>
                  <h4 className="text-type-body-md font-semibold text-ink-900 dark:text-white">Enter Your Way</h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">Access the peer module using your anonymous session or registered profile.</p>
                </div>
              </li>
              <li className="flex gap-space-3">
                <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-type-body-sm font-bold text-ink-600 dark:text-ink-300 shrink-0">
                  2
                </span>
                <div>
                  <h4 className="text-type-body-md font-semibold text-ink-900 dark:text-white">Get Matched</h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">Wait to connect securely with a trained teen volunteer who is currently online.</p>
                </div>
              </li>
              <li className="flex gap-space-3">
                <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-type-body-sm font-bold text-ink-600 dark:text-ink-300 shrink-0">
                  3
                </span>
                <div>
                  <h4 className="text-type-body-md font-semibold text-ink-900 dark:text-white">Moderated for Safety</h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">Our safety moderators monitor chat reports to keep conversations healthy.</p>
                </div>
              </li>
              <li className="flex gap-space-3">
                <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-type-body-sm font-bold text-ink-600 dark:text-ink-300 shrink-0">
                  4
                </span>
                <div>
                  <h4 className="text-type-body-md font-semibold text-ink-900 dark:text-white">Stay in Sync</h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">Chat and share feelings at a comfortable pace. End the chat session whenever you wish.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column: Caution Card & CTA */}
        <div className="lg:col-span-4 flex flex-col gap-space-6 w-full">
          {/* Banned / Caution Callout Card */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            className="border-2 border-signal-caution/30 bg-signal-caution/5 rounded-radius-md p-space-5 shadow-sm flex flex-col gap-space-3"
          >
            <div className="flex items-center gap-space-2 text-signal-caution">
              <Warning className="w-6 h-6" weight="duotone" />
              <h4 className="font-semibold text-type-body-md">What peer supporters don&apos;t do</h4>
            </div>
            <p className="text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              Peer supporters are <strong>not</strong> professional counsellors, therapists, or doctors. They cannot diagnose mental conditions, prescribe medication, or handle active crisis turns. Any live crisis signals will route immediately to professional emergency helplines.
            </p>
          </motion.div>

          {/* Primary Action Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full gap-space-2 text-white bg-gradient-to-r from-aurora-dusk to-aurora-sea"
            asChild
          >
            <Link href="/peer-support">
              <span>Connect with a Peer</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
