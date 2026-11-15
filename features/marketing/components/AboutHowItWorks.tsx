// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from "motion/react"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { AboutRidges, RIDGE_PALETTES, type RidgeTones } from "./AboutRidges"

interface StepData {
  id: string
  num: string
  title: string
  sentence: string
  tones: RidgeTones
}

const STEPS: StepData[] = [
  {
    id: "step-1",
    num: "01",
    title: "Start without an account",
    sentence: "Start immediately without personal info. Your session is private and memory-only.",
    tones: RIDGE_PALETTES.dawn,
  },
  {
    id: "step-2",
    num: "02",
    title: "Talk to Nova",
    sentence: "A calm, grounded AI companion ready to listen, reflect, and help you work through everyday thoughts.",
    tones: RIDGE_PALETTES.midday,
  },
  {
    id: "step-3",
    num: "03",
    title: "Talk to someone who gets it",
    sentence: "Connect 1-on-1 with trained teenage peers who understand school and life pressure.",
    tones: RIDGE_PALETTES.dawn,
  },
  {
    id: "step-4",
    num: "04",
    title: "Help is always visible",
    sentence: "Every message passes keyword safety checks, surfacing direct emergency help if acute risk is detected.",
    tones: RIDGE_PALETTES.dusk,
  },
]

/* ─── 01 Demo: Mini Mood Selection ─── */
const MOOD_OPTIONS = [
  {
    id: "happy",
    label: "Happy",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: "okay",
    label: "Okay",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="15" x2="16" y2="15" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: "sad",
    label: "Sad",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: "anxious",
    label: "Anxious",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15h8" />
        <path d="M8 9h2" />
        <path d="M14 9h2" />
      </svg>
    ),
  },
  {
    id: "overwhelmed",
    label: "Overwhelmed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15 c 1 -1 3 -1 4 0 c 1 1 3 1 4 0" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
]

function DemoMood() {
  const [selectedMood, setSelectedMood] = React.useState("okay")

  return (
    <div className="flex flex-col gap-5 text-left w-full max-w-lg">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-ink-900/10 dark:bg-white/15 text-ink-700 dark:text-ink-200">
          Example
        </span>
        <span className="text-xs text-ink-500 dark:text-ink-400 font-mono">Step 1 of Onboarding</span>
      </div>

      <div>
        <h4 className="font-fraunces text-xl sm:text-2xl font-semibold text-ink-900 dark:text-white tracking-tight">
          What&apos;s closest to how today feels?
        </h4>
        <p className="text-sm text-ink-600 dark:text-ink-400 mt-1">Tap a mood to preview</p>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3 py-1">
        {MOOD_OPTIONS.map((m) => {
          const isSelected = selectedMood === m.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMood(m.id)}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea active:scale-95 ${
                isSelected
                  ? "bg-white dark:bg-night-800 border-ink-900/30 dark:border-white/40 shadow-md scale-105 text-ink-900 dark:text-white"
                  : "bg-white/60 dark:bg-night-900/60 border-ink-900/10 dark:border-white/10 hover:bg-white/80 dark:hover:bg-night-800/80 text-ink-700 dark:text-ink-300"
              }`}
            >
              <div className="mb-1 text-ink-800 dark:text-ink-200">{m.icon}</div>
              <span className="text-xs font-medium truncate w-full">{m.label}</span>
            </button>
          )
        })}
      </div>

      <p className="text-sm font-medium text-ink-800 dark:text-ink-200 bg-paper-100/90 dark:bg-night-800/90 border border-ink-900/10 dark:border-white/10 rounded-xl p-3">
        Chat content is never shared with parents.
      </p>

      <div className="pt-1">
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 px-6 py-3 text-sm sm:text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
        >
          <span>Continue Anonymously</span>
          <ArrowRight className="w-4 h-4" weight="bold" />
        </Link>
      </div>
    </div>
  )
}

/* ─── 02 Demo: Mini Nova Chat ─── */
const NOVA_PROMPTS = [
  {
    id: "school",
    title: "School stress",
    userText: "I'm overwhelmed with assignments this week.",
    reply: "School pressure can pile up fast when everything feels due at once. Want to break down what's on your plate first, or just take a breath?",
  },
  {
    id: "friends",
    title: "Friendships",
    userText: "My friend has been leaving me on read lately.",
    reply: "Friend drama takes a lot out of you, especially when you're not sure where you stand. I'm here if you want to talk it through.",
  },
  {
    id: "worries",
    title: "Everyday worries",
    userText: "I can't stop overthinking about tomorrow.",
    reply: "Some days just feel heavy for no clear reason. You don't need a huge problem to talk—what's on your mind right now?",
  },
]

function DemoNova() {
  const [activePromptIndex, setActivePromptIndex] = React.useState(0)
  const activePrompt = NOVA_PROMPTS[activePromptIndex] || NOVA_PROMPTS[0] || {
    id: "school",
    title: "School stress",
    userText: "I'm overwhelmed with assignments this week.",
    reply: "School pressure can pile up fast when everything feels due at once. Want to break down what's on your plate first, or just take a breath?",
  }

  return (
    <div className="flex flex-col gap-4 text-left w-full max-w-lg">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-ink-900/10 dark:bg-white/15 text-ink-700 dark:text-ink-200">
          Example
        </span>
        <span className="text-xs text-ink-500 dark:text-ink-400 font-mono">Interactive Nova Sounding Board</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {NOVA_PROMPTS.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePromptIndex(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea active:scale-95 ${
              activePromptIndex === idx
                ? "bg-aurora-sea text-white shadow-sm font-semibold"
                : "bg-white/70 dark:bg-night-800/70 border border-ink-900/10 dark:border-white/10 text-ink-700 dark:text-ink-300 hover:bg-white dark:hover:bg-night-800"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 py-2">
        {/* User bubble */}
        <div className="self-end bg-aurora-sea/15 dark:bg-aurora-sea/25 border border-aurora-sea/30 text-ink-900 dark:text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] text-sm font-sans">
          {activePrompt.userText}
        </div>

        {/* Nova bubble */}
        <div className="self-start flex items-start gap-2.5 max-w-[90%]">
          <div className="w-7 h-7 rounded-full bg-aurora-sea text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Sparkle className="w-3.5 h-3.5" weight="fill" />
          </div>
          <div className="bg-white dark:bg-night-900 border border-ink-900/10 dark:border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm text-sm text-ink-800 dark:text-ink-100 font-sans leading-relaxed">
            {activePrompt.reply}
          </div>
        </div>
      </div>

      <div className="pt-1">
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 px-6 py-2.5 text-sm sm:text-base font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
        >
          <span>Try Nova</span>
          <ArrowRight className="w-4 h-4" weight="bold" />
        </Link>
      </div>
    </div>
  )
}

/* ─── 03 Demo: Peer Support Animation ─── */
const PEER_STEPS = [
  { step: "1", title: "Enter Your Way", text: "Access with an anonymous session or registered profile." },
  { step: "2", title: "Get Matched", text: "Connected with an active, trained teen volunteer." },
  { step: "3", title: "Moderated for Safety", text: "Trained moderators protect conversation safety." },
  { step: "4", title: "Stay in Sync", text: "Share at your comfort level. Leave whenever you wish." },
]

function DemoPeer() {
  return (
    <div className="flex flex-col gap-4 text-left w-full max-w-lg">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-ink-900/10 dark:bg-white/15 text-ink-700 dark:text-ink-200">
          Example
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-aurora-sea font-medium font-mono">
          <span className="w-2 h-2 rounded-full bg-aurora-sea animate-pulse" />
          Online Peer Matching Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {PEER_STEPS.map((item) => (
          <div
            key={item.step}
            className="p-3 rounded-2xl bg-white/70 dark:bg-night-900/70 border border-ink-900/10 dark:border-white/10 shadow-sm flex items-start gap-2.5 text-left"
          >
            <span className="w-6 h-6 rounded-full bg-aurora-dawn/20 text-ink-900 dark:text-white border border-aurora-dawn/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {item.step}
            </span>
            <div>
              <strong className="block text-sm font-semibold text-ink-900 dark:text-white">
                {item.title}
              </strong>
              <span className="text-xs text-ink-600 dark:text-ink-400 leading-snug">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-base text-ink-700 dark:text-ink-300 leading-relaxed font-sans pt-1 border-t border-ink-900/10 dark:border-white/10">
        <strong className="text-ink-900 dark:text-white">What peer supporters don&apos;t do:</strong> Peer supporters are not therapists or doctors. They cannot diagnose, prescribe, or handle crisis turns.
      </p>
    </div>
  )
}

/* ─── 04 Demo: Keyword Safety Flow Diagram ─── */
function DemoSafety() {
  return (
    <div className="flex flex-col gap-4 text-left w-full max-w-lg">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-ink-900/10 dark:bg-white/15 text-ink-700 dark:text-ink-200">
          Example
        </span>
        <span className="text-xs text-ink-500 dark:text-ink-400 font-mono">Pre-AI Rule-Based Pipeline</span>
      </div>

      {/* Visual Flow Diagram */}
      <div className="flex flex-col items-center gap-2 py-1 w-full font-sans text-xs sm:text-sm">
        {/* Step 1: Input */}
        <div className="w-full text-center py-2 px-3 rounded-xl bg-white dark:bg-night-900 border border-ink-900/15 dark:border-white/15 font-medium text-ink-900 dark:text-white shadow-sm">
          Incoming Teen Message
        </div>

        {/* Down Arrow */}
        <div className="text-ink-400 dark:text-ink-500 text-xs font-mono">↓ Passes through synchronously</div>

        {/* Step 2: Safety Check */}
        <div className="w-full text-center py-2 px-3 rounded-xl bg-aurora-sea/15 dark:bg-aurora-sea/25 border border-aurora-sea/30 font-semibold text-ink-900 dark:text-white">
          Rule-Based Keyword Safety Detection
        </div>

        {/* Branch Split */}
        <div className="grid grid-cols-2 gap-3 w-full pt-1">
          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-night-900/70 border border-ink-900/10 dark:border-white/10 text-left">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-ink-500 block mb-1">
              No Risk Signal
            </span>
            <p className="text-xs font-medium text-ink-800 dark:text-ink-200">
              Nova replies with calm, supportive guidance
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-night-900/70 border border-ink-900/10 dark:border-white/10 text-left">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-aurora-dusk dark:text-ink-200 block mb-1">
              Risk Signal
            </span>
            <p className="text-xs font-medium text-ink-800 dark:text-ink-200">
              Helplines shown immediately instead of the AI
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
        Every message passes through keyword safety detection before reaching the AI. If acute risk or self-harm is detected, a crisis banner immediately displays direct emergency helpline numbers.
      </p>

      <div className="pt-1">
        <Link
          href="/get-help"
          className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 dark:border-white/20 text-ink-900 dark:text-white hover:bg-ink-900/5 dark:hover:bg-white/10 px-6 py-2.5 text-sm sm:text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
        >
          <span>See all helplines</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export function AboutHowItWorks() {
  const [active, setActive] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Ultra-snappy spring (mass 0.08) for instantaneous zero-lag response with smooth line glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    mass: 0.08,
    restDelta: 0.001,
  })

  // Update discrete step instantly on threshold crossing for crisp zero-lag interaction
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReduced) return
    const stepIndex = Math.min(STEPS.length - 1, Math.max(0, Math.floor(latest * STEPS.length)))
    setActive((prev) => (prev === stepIndex ? prev : stepIndex))
  })

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
    }
  }

  const renderCardContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <DemoMood />
      case 1:
        return <DemoNova />
      case 2:
        return <DemoPeer />
      case 3:
      default:
        return <DemoSafety />
    }
  }

  const currentStep = STEPS[active] || STEPS[0] || {
    id: "step-1",
    num: "01",
    title: "Start without an account",
    sentence: "Start immediately without personal info. Your session is private and memory-only.",
    tones: RIDGE_PALETTES.dawn,
  }

  return (
    <section aria-labelledby="how-it-works-heading" className="w-full text-left">
      {/* ─── DESKTOP PINNED SCROLL STORY (1024px+) ─── */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full h-[250vh]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full px-6 xl:px-8 flex items-center justify-between gap-12">
            {/* Left Column: 35% narrow list with step titles & active sentence */}
            <div className="w-[35%] shrink-0 flex flex-col gap-6 text-left">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-aurora-sea block mb-2 font-mono">
                  Experience
                </span>
                <h2
                  id="how-it-works-heading"
                  className="font-fraunces text-4xl xl:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white"
                >
                  How it works
                </h2>
              </div>

              {/* Scroll Progress Line right above the first part (Cairn style indicator) */}
              <div className="w-full flex flex-col gap-2 pt-1 pb-1">
                <div className="flex items-center justify-between text-xs font-mono text-ink-500 dark:text-ink-400">
                  <span className="uppercase tracking-widest font-semibold">
                    Step {active + 1} of {STEPS.length}
                  </span>
                  <span>{Math.round(((active + 1) / STEPS.length) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-ink-900/10 dark:bg-white/10 rounded-full overflow-hidden relative">
                  <motion.div
                    style={{
                      scaleX: prefersReduced ? (active + 1) / STEPS.length : smoothProgress,
                      transformOrigin: "0% 50%",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-aurora-sea via-aurora-dawn to-aurora-dusk rounded-full"
                  />
                </div>
              </div>

              {/* Step tabs */}
              <div
                role="tablist"
                aria-label="How TeensHelpline works steps"
                className="flex flex-col gap-3"
              >
                {STEPS.map((step, idx) => {
                  const isActive = active === idx
                  return (
                    <button
                      key={step.id}
                      role="tab"
                      id={`tab-${step.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${step.id}`}
                      onClick={() => setActive(idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`text-left p-4 rounded-2xl transition-all border relative overflow-hidden ${
                        isActive
                          ? "bg-white dark:bg-night-900 border-ink-900/15 dark:border-white/20 shadow-sm"
                          : "bg-transparent border-transparent hover:bg-paper-100/60 dark:hover:bg-night-900/40 text-ink-600 dark:text-ink-400"
                      }`}
                    >
                      {/* Active indicator bar along top edge */}
                      {isActive && (
                        <motion.span
                          layoutId="active-tab-indicator"
                          className="absolute top-0 left-0 right-0 h-0.5 bg-aurora-sea"
                        />
                      )}

                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900"
                              : "bg-paper-200 dark:bg-night-800 text-ink-600 dark:text-ink-400"
                          }`}
                        >
                          {step.num}
                        </span>
                        <h3 className="font-fraunces text-xl font-semibold text-ink-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>

                      {/* Active step short sentence (≤ 20 words) */}
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.25 }}
                          className="mt-2 text-sm text-ink-700 dark:text-ink-300 font-sans leading-relaxed pl-9"
                        >
                          {step.sentence}
                        </motion.p>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Column: 65% big window (~75vh tall) with shifting mountain ridges */}
            <div className="w-[65%] h-[75vh] relative rounded-3xl overflow-hidden border border-ink-900/10 dark:border-white/10 shadow-sm flex items-center justify-center p-8 xl:p-12">
              {/* Crossfade transitions for mountain sky palette between steps */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <AboutRidges tones={currentStep.tones} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Demo card container with template blur transition */}
              <div
                role="tabpanel"
                id={`panel-${currentStep.id}`}
                aria-labelledby={`tab-${currentStep.id}`}
                className="relative z-10 w-full max-w-xl bg-paper-50/95 dark:bg-night-950/95 backdrop-blur-md border border-ink-900/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={
                      prefersReduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: 14, filter: "blur(6px)" }
                    }
                    animate={
                      prefersReduced
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, filter: "blur(0px)" }
                    }
                    exit={
                      prefersReduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: -10, filter: "blur(6px)" }
                    }
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {renderCardContent(active)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE / TABLET STACKED SECTIONS (< 1024px) ─── */}
      <div className="lg:hidden max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-aurora-sea block mb-2 font-mono">
            Experience
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 dark:text-white">
            How it works
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl bg-white/50 dark:bg-night-900/50 border border-ink-900/10 dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-900">
                  {step.num}
                </span>
                <h3 className="font-fraunces text-xl font-semibold text-ink-900 dark:text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-ink-700 dark:text-ink-300 font-sans leading-relaxed">
                {step.sentence}
              </p>

              {/* Demo card inside ridge window */}
              <div className="relative rounded-2xl overflow-hidden border border-ink-900/10 dark:border-white/10 p-4 sm:p-6 min-h-[320px] flex items-center justify-center">
                <AboutRidges tones={step.tones} />
                <div className="relative z-10 w-full bg-paper-50/95 dark:bg-night-950/95 border border-ink-900/10 dark:border-white/10 rounded-xl p-4 sm:p-6 shadow-md">
                  {renderCardContent(idx)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
