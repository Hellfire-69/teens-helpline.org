// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ArrowRight, Sparkle, Heart, Shield, Warning } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { AboutRidgeWindow, RIDGE_PALETTES, type RidgeTones } from "./AboutRidges"

interface StepData {
  id: string
  num: string
  title: string
  summary: string
  tones: RidgeTones
}

const STEPS: StepData[] = [
  {
    id: "step-1",
    num: "01",
    title: "Start without an account",
    summary:
      "You can click 'Continue Anonymously' to start using the platform right away without entering any personal info.",
    tones: RIDGE_PALETTES.dawn,
  },
  {
    id: "step-2",
    num: "02",
    title: "Talk to Nova",
    summary:
      "Nova is an AI companion that acts as a supportive elder sibling, providing a warm and present sounding board.",
    tones: RIDGE_PALETTES.midday,
  },
  {
    id: "step-3",
    num: "03",
    title: "Talk to someone who gets it",
    summary:
      "Connect securely with trained teenage volunteers who understand the pressure and listen without judgment.",
    tones: RIDGE_PALETTES.dawn,
  },
  {
    id: "step-4",
    num: "04",
    title: "Help is always visible",
    summary:
      "Every message passes through keyword safety detection before reaching the AI. Emergency help is always one tap away.",
    tones: RIDGE_PALETTES.dusk,
  },
]

export function AboutHowItWorks() {
  const [active, setActive] = React.useState(0)
  const shouldReduceMotion = useReducedMotion()
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      nextIndex = (index + 1) % STEPS.length
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      nextIndex = (index - 1 + STEPS.length) % STEPS.length
    } else if (e.key === "Home") {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === "End") {
      e.preventDefault()
      nextIndex = STEPS.length - 1
    }

    if (nextIndex !== null) {
      setActive(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const renderCardContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="flex flex-col gap-5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-aurora-dawn/15 dark:bg-aurora-dawn/25 text-aurora-dawn flex items-center justify-center">
              <Heart className="w-6 h-6" weight="duotone" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400 block mb-1">
                Anonymous First
              </span>
              <h3 className="font-fraunces text-2xl font-semibold text-ink-900 dark:text-white tracking-tight mb-3">
                Start without an account
              </h3>
            </div>
            <p className="text-base text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              You can click &apos;Continue Anonymously&apos; to start using the platform right away without entering any personal info. If you want the system to remember your conversations, mood trends, and saved articles across devices, you can choose to register and sign in with your Email or Google account.
            </p>
            <p className="text-base font-medium text-ink-900 dark:text-white bg-paper-100/70 dark:bg-night-800/70 border border-ink-900/10 dark:border-white/10 rounded-xl p-3.5 leading-relaxed">
              Chat content is never shared with parents.
            </p>
            <div className="pt-2">
              <Button
                asChild
                className="rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 px-6 py-5 text-base font-semibold shadow-sm transition-colors"
              >
                <Link href="/onboarding" className="flex items-center gap-2">
                  <span>Continue Anonymously</span>
                  <ArrowRight className="w-4 h-4" weight="bold" />
                </Link>
              </Button>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="flex flex-col gap-5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-aurora-sea/15 dark:bg-aurora-sea/25 text-aurora-sea flex items-center justify-center">
              <Sparkle className="w-6 h-6" weight="fill" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400 block mb-1">
                AI Companion
              </span>
              <h3 className="font-fraunces text-2xl font-semibold text-ink-900 dark:text-white tracking-tight mb-3">
                Talk to Nova
              </h3>
            </div>
            <p className="text-base text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              Nova is an AI companion, not a human and not a therapist. Nova acts as a supportive elder sibling, providing a warm and present sounding board. Nova is trained to help you plan your study sessions, deal with school stress, manage friendships, and discuss everyday worries. Nova never diagnoses conditions or discusses medical treatments.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-xs font-semibold text-ink-500 dark:text-ink-400 uppercase tracking-wider">
                What Nova can help with:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Plan study sessions",
                  "School stress",
                  "Manage friendships",
                  "Everyday worries",
                  "Warm sounding board",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-paper-100 dark:bg-night-800 border border-ink-900/10 dark:border-white/10 text-ink-800 dark:text-ink-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex flex-col gap-5 text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400 block mb-1">
                Peer Support
              </span>
              <h3 className="font-fraunces text-2xl font-semibold text-ink-900 dark:text-white tracking-tight mb-3">
                Talk to someone who gets it
              </h3>
            </div>
            <ol className="flex flex-col gap-3 font-sans">
              {[
                {
                  step: "1",
                  title: "Enter Your Way",
                  text: "Access the peer module using your anonymous session or registered profile.",
                },
                {
                  step: "2",
                  title: "Get Matched",
                  text: "Wait to connect securely with a trained teen volunteer who is currently online.",
                },
                {
                  step: "3",
                  title: "Moderated for Safety",
                  text: "Our safety moderators monitor chat reports to keep conversations healthy.",
                },
                {
                  step: "4",
                  title: "Stay in Sync",
                  text: "Chat and share feelings at a comfortable pace. End the chat session whenever you wish.",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-2.5 text-base">
                  <span className="w-6 h-6 rounded-full bg-paper-100 dark:bg-night-800 border border-ink-900/10 dark:border-white/10 flex items-center justify-center text-xs font-bold text-ink-700 dark:text-ink-300 shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <strong className="text-ink-900 dark:text-white font-semibold">
                      {item.title}:
                    </strong>{" "}
                    <span className="text-ink-700 dark:text-ink-300">
                      {item.text}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="pt-2 border-t border-ink-900/10 dark:border-white/10 flex items-start gap-2.5 text-base">
              <Warning className="w-5 h-5 text-aurora-dawn shrink-0 mt-0.5" weight="duotone" />
              <p className="text-base text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
                <strong className="text-ink-900 dark:text-white">What peer supporters don&apos;t do:</strong> Peer supporters are not professional counsellors, therapists, or doctors. They cannot diagnose mental conditions, prescribe medication, or handle active crisis turns. Any live crisis signals will route immediately to professional emergency helplines.
              </p>
            </div>
          </div>
        )
      case 3:
      default:
        return (
          <div className="flex flex-col gap-5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-aurora-dusk/15 dark:bg-aurora-dusk/25 text-aurora-dusk flex items-center justify-center">
              <Shield className="w-6 h-6" weight="duotone" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400 block mb-1">
                Safety First
              </span>
              <h3 className="font-fraunces text-2xl font-semibold text-ink-900 dark:text-white tracking-tight mb-3">
                Help is always visible
              </h3>
            </div>
            <p className="text-base text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              Every message passes through keyword safety detection before reaching the AI. If acute risk or self-harm is detected, a crisis banner immediately displays direct emergency helpline numbers.
            </p>
            <p className="text-base text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              The crisis banner requires no data dependencies and remains functional even during server-side outages, accessible from every page on the platform.
            </p>
            <div className="pt-2">
              <Link
                href="/get-help"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 dark:border-white/20 text-ink-900 dark:text-white hover:bg-ink-900/5 dark:hover:bg-white/10 px-6 py-3.5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
              >
                <span>See all helplines</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )
    }
  }

  return (
    <section aria-labelledby="how-it-works-heading" className="w-full text-left">
      <div className="mb-10 text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-aurora-sea block mb-2">
          Experience
        </span>
        <h2
          id="how-it-works-heading"
          className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white"
        >
          How it works
        </h2>
      </div>

      {/* Desktop Layout (1024px+): Left steps list + Right ridge window */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10 items-start">
        {/* Left Column: Numbered steps */}
        <div
          role="tablist"
          aria-label="How TeensHelpline works steps"
          aria-orientation="vertical"
          className="lg:col-span-5 flex flex-col divide-y divide-ink-900/10 dark:divide-white/10 border-y border-ink-900/10 dark:border-white/10"
        >
          {STEPS.map((step, idx) => {
            const isSelected = active === idx
            return (
              <button
                key={step.id}
                ref={(el) => {
                  tabRefs.current[idx] = el
                }}
                role="tab"
                id={`how-tab-${idx}`}
                aria-selected={isSelected}
                aria-controls={`how-panel-${idx}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActive(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`w-full py-6 text-left transition-colors flex flex-col gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm ${
                  isSelected
                    ? "text-ink-900 dark:text-white"
                    : "text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-sm font-semibold transition-colors ${
                      isSelected
                        ? "text-aurora-sea font-bold"
                        : "text-ink-400 dark:text-ink-500"
                    }`}
                  >
                    {step.num}
                  </span>
                  <h3 className="font-fraunces text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out pl-8 ${
                    isSelected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base text-ink-600 dark:text-ink-300 leading-relaxed font-sans pt-1">
                      {step.summary}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Column: Ridge Window with active Card */}
        <div className="lg:col-span-7 sticky top-36">
          <AboutRidgeWindow
            tones={STEPS[active]?.tones || RIDGE_PALETTES.dawn}
            className="min-h-[480px] flex items-center justify-center p-6 sm:p-10"
          >
            <div
              role="tabpanel"
              id={`how-panel-${active}`}
              aria-labelledby={`how-tab-${active}`}
              className="w-full flex justify-center py-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full max-w-lg rounded-2xl bg-paper-50/95 dark:bg-night-900/95 border border-ink-900/10 dark:border-white/10 p-7 sm:p-8 shadow-xl"
                >
                  {renderCardContent(active)}
                </motion.div>
              </AnimatePresence>
            </div>
          </AboutRidgeWindow>
        </div>
      </div>

      {/* Mobile & Tablet Layout (< 1024px): Stacked Accordion */}
      <div className="lg:hidden flex flex-col gap-6">
        {STEPS.map((step, idx) => {
          const isOpen = active === idx
          return (
            <div
              key={step.id}
              className="rounded-2xl border border-ink-900/10 dark:border-white/10 overflow-hidden bg-paper-50 dark:bg-night-900 transition-colors"
            >
              <button
                type="button"
                onClick={() => setActive(isOpen ? -1 : idx)}
                aria-expanded={isOpen}
                aria-controls={`mobile-panel-${idx}`}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-aurora-sea">
                    {step.num}
                  </span>
                  <h3 className="font-fraunces text-lg sm:text-xl font-semibold text-ink-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <span
                  className={`text-ink-400 dark:text-ink-500 font-bold text-xl transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div id={`mobile-panel-${idx}`} className="px-5 sm:px-6 pb-6 pt-2">
                  <AboutRidgeWindow
                    tones={step.tones}
                    className="p-5 sm:p-7 min-h-[380px] flex items-center justify-center"
                  >
                    <div className="w-full max-w-lg rounded-xl bg-paper-50/95 dark:bg-night-900/95 border border-ink-900/10 dark:border-white/10 p-5 sm:p-7 shadow-lg">
                      {renderCardContent(idx)}
                    </div>
                  </AboutRidgeWindow>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
