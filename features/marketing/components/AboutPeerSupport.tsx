"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { UsersThree, CheckCircle, Warning, ArrowRight } from "@phosphor-icons/react"

export function AboutPeerSupport() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="about-peer-support-heading"
      className="w-full max-w-6xl mx-auto my-16 md:my-24 px-4"
    >
      <div className="rounded-[2.5rem] bg-white/80 dark:bg-night-900/60 backdrop-blur-xl border border-ink-900/10 dark:border-white/10 shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-aurora-blush/10 dark:bg-aurora-blush/20 border border-aurora-blush/20 flex items-center justify-center text-aurora-blush shadow-sm">
            <UsersThree className="w-6 h-6" weight="fill" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-aurora-blush uppercase block">
              Community
            </span>
            <h2
              id="about-peer-support-heading"
              className="font-fraunces text-2xl md:text-3xl font-semibold text-ink-900 dark:text-white"
            >
              Talk to someone who gets it
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Why & How */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Why Peer Support Works */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-ink-900 dark:text-white">
                Why peer support works
              </h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Shared Experiences</h4>
                    <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      Volunteers are teenagers who have been there themselves and understand the pressure.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Low Pressure</h4>
                    <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      Text-only anonymous chat allows you to speak openly without feeling exposed or judged.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Active Listening</h4>
                    <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      Our peers are trained to validate and support your feelings, not direct your actions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* How It Works */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-ink-900 dark:text-white">
                How it works
              </h3>
              <ol className="flex flex-col gap-3">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-ink-600 dark:text-ink-300 shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Enter Your Way</h4>
                    <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      Access the peer module using your anonymous session or registered profile.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-ink-600 dark:text-ink-300 shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Get Matched</h4>
                    <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      Wait to connect securely with a trained teen volunteer who is currently online.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-ink-600 dark:text-ink-300 shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Moderated for Safety</h4>
                    <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      Our safety moderators monitor chat reports to keep conversations healthy.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-ink-600 dark:text-ink-300 shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white">Stay in Sync</h4>
                    <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      Chat and share feelings at a comfortable pace. End the chat session whenever you wish.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column: Caution Card & CTA */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border border-aurora-dawn/30 bg-aurora-dawn/5 dark:bg-aurora-dawn/10 rounded-2xl p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 text-aurora-dawn">
                <Warning className="w-5 h-5" weight="duotone" />
                <h4 className="font-semibold text-sm text-ink-900 dark:text-white">
                  What peer supporters don&apos;t do
                </h4>
              </div>
              <p className="text-xs md:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                Peer supporters are <strong>not</strong> professional counsellors, therapists, or doctors. They cannot diagnose mental conditions, prescribe medication, or handle active crisis turns. Any live crisis signals will route immediately to professional emergency helplines.
              </p>
            </motion.div>

            <Button
              variant="primary"
              size="lg"
              className="w-full gap-2 rounded-full py-5 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              asChild
            >
              <Link href="/peer-support" className="flex items-center justify-center gap-2">
                <span>Connect with a Peer</span>
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
