"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UsersThree, CheckCircle, Warning, ArrowRight } from "@phosphor-icons/react"

export function AboutPeerSupport() {
  return (
    <section
      aria-labelledby="about-peer-support-heading"
      className="w-full rounded-3xl bg-paper-50 dark:bg-night-900 border border-ink-900/10 dark:border-white/10 shadow-lg p-8 sm:p-10 md:p-14 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-ink-900/10 dark:border-white/10">
        <div className="w-12 h-12 rounded-2xl bg-aurora-blush/15 dark:bg-aurora-blush/25 border border-aurora-blush/25 flex items-center justify-center text-aurora-blush shrink-0">
          <UsersThree className="w-6 h-6" weight="fill" />
        </div>
        <div>
          <span className="text-xs font-semibold tracking-wider text-aurora-blush uppercase block mb-1">
            Community
          </span>
          <h2
            id="about-peer-support-heading"
            className="font-fraunces text-3xl md:text-4xl font-semibold text-ink-900 dark:text-white tracking-tight"
          >
            Talk to someone who gets it
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Why & How */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Why Peer Support Works */}
          <div className="flex flex-col gap-5">
            <h3 className="font-fraunces text-xl md:text-2xl font-semibold text-ink-900 dark:text-white">
              Why peer support works
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-ink-900 dark:text-white">Shared Experiences</h4>
                  <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed mt-1">
                    Volunteers are teenagers who have been there themselves and understand the pressure.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-ink-900 dark:text-white">Low Pressure</h4>
                  <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed mt-1">
                    Text-only anonymous chat allows you to speak openly without feeling exposed or judged.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-aurora-blush shrink-0 mt-0.5" weight="duotone" />
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-ink-900 dark:text-white">Active Listening</h4>
                  <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed mt-1">
                    Our peers are trained to validate and support your feelings, not direct your actions.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* How It Works */}
          <div className="flex flex-col gap-5">
            <h3 className="font-fraunces text-xl md:text-2xl font-semibold text-ink-900 dark:text-white">
              How it works
            </h3>
            <ol className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-paper-100 dark:bg-night-800 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-sm font-bold text-ink-700 dark:text-ink-300 shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-ink-900 dark:text-white">Enter Your Way</h4>
                  <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed mt-1">
                    Access the peer module using your anonymous session or registered profile.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-paper-100 dark:bg-night-800 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-sm font-bold text-ink-700 dark:text-ink-300 shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-ink-900 dark:text-white">Get Matched</h4>
                  <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed mt-1">
                    Wait to connect securely with a trained teen volunteer who is currently online.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-paper-100 dark:bg-night-800 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-sm font-bold text-ink-700 dark:text-ink-300 shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-ink-900 dark:text-white">Moderated for Safety</h4>
                  <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed mt-1">
                    Our safety moderators monitor chat reports to keep conversations healthy.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-paper-100 dark:bg-night-800 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-sm font-bold text-ink-700 dark:text-ink-300 shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-ink-900 dark:text-white">Stay in Sync</h4>
                  <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed mt-1">
                    Chat and share feelings at a comfortable pace. End the chat session whenever you wish.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column: Caution Callout & CTA (No card inside a card) */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2.5 py-1">
            <div className="flex items-center gap-2 text-aurora-dawn">
              <Warning className="w-5 h-5 shrink-0" weight="duotone" />
              <h4 className="font-semibold text-base text-ink-900 dark:text-white">
                What peer supporters don&apos;t do
              </h4>
            </div>
            <p className="text-lg text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              Peer supporters are <strong>not</strong> professional counsellors, therapists, or doctors. They cannot diagnose mental conditions, prescribe medication, or handle active crisis turns. Any live crisis signals will route immediately to professional emergency helplines.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full gap-2 rounded-full py-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
            asChild
          >
            <Link href="/peer-support" className="flex items-center justify-center gap-2">
              <span>Connect with a Peer</span>
              <ArrowRight className="w-5 h-5" weight="bold" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
