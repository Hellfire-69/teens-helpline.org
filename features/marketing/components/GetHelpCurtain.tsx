"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"
import { ArrowDown, Sparkle, ShieldCheck, Heart } from "@phosphor-icons/react"

interface GetHelpCurtainProps {
  /** Optional custom illustration asset path */
  illustrationSrc?: string
}

/**
 * Almost vertical seam slightly offset from the exact centre (x = 800 in 1600x900 viewBox).
 * Starts at top (824, 0) and flows with subtle organic deckle curves to bottom (784, 900).
 * Total lateral drift is ~40px across 900px height (~2.5° inclination).
 * No dramatic diagonal, no lightning bolts, no repetitive sharp zigzags.
 */
const SEAM_VERTICES =
  "C 828 120, 818 200, 822 280 " +
  "C 826 360, 812 440, 816 520 " +
  "C 820 600, 804 680, 808 760 " +
  "C 812 830, 786 870, 784 900"

const LEFT_SEAM_PATH = `M 0 0 L 824 0 ${SEAM_VERTICES} L 0 900 Z`
const RIGHT_SEAM_PATH = `M 1600 0 L 824 0 ${SEAM_VERTICES} L 1600 900 Z`
const DECKLE_EDGE_PATH = `M 824 0 ${SEAM_VERTICES}`

/**
 * SanctuaryDawnArtwork
 * An original, art-directed vector sanctuary environment behind the curtain.
 * Evokes a peaceful morning dawn over soft layered terrain, quiet sanctuary lighting,
 * and warm atmospheric reassurance.
 */
function SanctuaryDawnArtwork({ idPrefix = "sanctuary" }: { idPrefix?: string }) {
  const skyGradId = `${idPrefix}-sky-grad`
  const sunGradId = `${idPrefix}-sun-grad`
  const riverGradId = `${idPrefix}-river-grad`
  const hillGradId = `${idPrefix}-hill-grad`

  return (
    <svg
      className="w-full h-full object-cover select-none pointer-events-none"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Soft morning sky gradient from twilight violet to warm dawn apricot */}
        <linearGradient id={skyGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2440" />
          <stop offset="35%" stopColor="#4A3B69" />
          <stop offset="65%" stopColor="#96607C" />
          <stop offset="85%" stopColor="#D98A72" />
          <stop offset="100%" stopColor="#F5C088" />
        </linearGradient>

        {/* Radiant low sun aura */}
        <radialGradient id={sunGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#FCE4A6" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#F3A966" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F3A966" stopOpacity="0" />
        </radialGradient>

        {/* Dawn light reflection on the sanctuary stream */}
        <linearGradient id={riverGradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FADBB3" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#E2A18D" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5E4F7C" stopOpacity="0.4" />
        </linearGradient>

        {/* Foreground terrain mist blend */}
        <linearGradient id={hillGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3F3459" />
          <stop offset="100%" stopColor="#1E192E" />
        </linearGradient>
      </defs>

      {/* 1. Base Sky */}
      <rect width="1600" height="900" fill={`url(#${skyGradId})`} />

      {/* 2. Soft Sunrise Glow (Near center, gentle morning dawn) */}
      <circle cx="830" cy="460" r="280" fill={`url(#${sunGradId})`} />
      <circle cx="830" cy="460" r="90" fill="#FFFBE8" opacity="0.9" />

      {/* 3. Distant Mountain Ridge — Pale Rose & Lavender mist */}
      <path
        d="M 0 460 Q 280 390 580 430 T 1180 410 Q 1420 380 1600 440 L 1600 900 L 0 900 Z"
        fill="#B57F8E"
        opacity="0.45"
      />

      {/* 4. Mid-Distant Mountain Ridge — Warm Dusk Violet */}
      <path
        d="M 0 530 Q 320 460 720 500 T 1360 480 Q 1500 470 1600 520 L 1600 900 L 0 900 Z"
        fill="#7A5274"
        opacity="0.65"
      />

      {/* 5. Serene Hillside Sanctuary with Warm Guiding Lantern */}
      <g opacity="0.9">
        {/* Sanctuary Lookout Cottage on the right ridge */}
        <path
          d="M 1240 540 L 1270 515 L 1300 540 Z"
          fill="#3B3054"
        />
        <rect
          x="1248"
          y="540"
          width="44"
          height="32"
          rx="3"
          fill="#2C2342"
        />
        {/* Soft glowing amber lantern window */}
        <rect
          x="1262"
          y="546"
          width="16"
          height="18"
          rx="2"
          fill="#FDE49E"
        />
        <circle cx="1270" cy="555" r="16" fill="#F4A261" opacity="0.4" />
        <circle cx="1270" cy="555" r="32" fill="#F4A261" opacity="0.15" />
      </g>

      {/* 6. Rolling Foothills — Deep Twilight Lavender */}
      <path
        d="M 0 620 Q 420 540 880 590 T 1600 570 L 1600 900 L 0 900 Z"
        fill="#55416B"
        opacity="0.8"
      />

      {/* 7. Gentle Meandering Sanctuary Stream / Path of Morning Light */}
      <path
        d="M 830 520 C 810 590, 870 650, 820 720 C 770 790, 710 830, 680 900 L 860 900 C 900 840, 940 780, 910 710 C 880 640, 890 580, 850 520 Z"
        fill={`url(#${riverGradId})`}
      />

      {/* 8. Foreground Hill Slopes */}
      <path
        d="M 0 710 Q 380 640 740 720 T 1600 680 L 1600 900 L 0 900 Z"
        fill="#392C4D"
        opacity="0.92"
      />

      {/* 9. Front Ground — Solid rich night soil anchoring the view */}
      <path
        d="M 0 810 Q 520 750 1020 800 T 1600 780 L 1600 900 L 0 900 Z"
        fill={`url(#${hillGradId})`}
      />

      {/* 10. Organic Cypress / Pine Silhouettes on Hill Edges */}
      <g fill="#1E172B" opacity="0.85">
        {/* Left cluster */}
        <path d="M 120 720 L 132 660 L 144 720 Z" />
        <path d="M 136 730 L 148 640 L 160 730 Z" />
        <path d="M 154 735 L 164 675 L 174 735 Z" />
        {/* Right cluster near sanctuary */}
        <path d="M 1320 690 L 1332 630 L 1344 690 Z" />
        <path d="M 1340 705 L 1354 615 L 1368 705 Z" />
        <path d="M 1362 700 L 1372 645 L 1382 700 Z" />
      </g>

      {/* 11. Subtle Morning Light Mists across the valley */}
      <path
        d="M 0 670 C 400 630 800 690 1200 640 C 1400 620 1520 650 1600 640"
        stroke="#F5C088"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        fill="none"
      />
      <path
        d="M 0 750 C 450 710 950 770 1600 720"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeOpacity="0.18"
        fill="none"
      />
    </svg>
  )
}

/**
 * GetHelpCurtain
 *
 * Self-contained 130svh sticky hero reveal component.
 * Features an almost vertical, subtly inclined near-center seam (~2.5° lateral drift).
 * Two distinct panels part smoothly left and right to reveal a warm sanctuary dawn,
 * offering emotional reassurance and immediate unblocked access to help.
 */
export function GetHelpCurtain({ illustrationSrc }: GetHelpCurtainProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Track progress strictly within the dedicated sticky reveal stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  })

  // Weighted tactile spring matching natural fabric/cardstock inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    mass: 0.1,
  })

  // Parting transforms: panels slide laterally to opposite sides with subtle natural rotation
  const leftX = useTransform(smoothProgress, [0, 0.85], ["0%", "-104%"])
  const rightX = useTransform(smoothProgress, [0, 0.85], ["0%", "104%"])
  const leftRotate = useTransform(smoothProgress, [0, 0.85], [0, -1.2])
  const rightRotate = useTransform(smoothProgress, [0, 0.85], [0, 1.2])
  const curtainOpacity = useTransform(smoothProgress, [0.76, 0.92], [1, 0])

  // Centered hero reveal transforms
  const heroScale = useTransform(smoothProgress, [0.04, 0.82], [0.94, 1])
  const heroOpacity = useTransform(smoothProgress, [0.04, 0.72], [0.35, 1])

  // Scroll cue affordance transforms
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0])
  const scrollCueY = useTransform(smoothProgress, [0, 0.18], [0, -14])

  // Reduced motion and SSR fallback: render static hero in plain document flow
  if (!mounted || prefersReduced) {
    return (
      <section
        ref={containerRef}
        aria-label="Welcome Sanctuary"
        style={{ position: "relative" }}
        className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12 pb-6 text-center"
      >
        {/* Reassuring badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aurora-sea/10 border border-aurora-sea/20 text-aurora-sea text-sm font-medium mb-4">
          <Heart className="w-3.5 h-3.5 text-aurora-blush" weight="fill" />
          <span>You are welcome here. Take all the time you need.</span>
        </div>

        <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-900 dark:text-white mb-4 text-balance">
          Take a gentle breath. You don&apos;t have to carry this alone.
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl text-ink-700 dark:text-ink-200 leading-relaxed max-w-2xl mx-auto mb-6">
          Whatever you are facing right now—heavy thoughts, confusion, exhaustion, or distress—take it one step at a time. Confidential support is here for you.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#emergency-triage"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 font-semibold text-sm sm:text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
          >
            <span>Jump to Helplines Directory</span>
            <ArrowDown className="w-4 h-4" weight="bold" />
          </a>
          <div className="inline-flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
            <ShieldCheck className="w-4 h-4 text-aurora-sea" weight="fill" />
            <span>100% Free &amp; Confidential</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      aria-label="Welcome Sanctuary and Helpline Reveal"
      style={{ position: "relative" }}
      className="relative w-full h-[125svh] md:h-[135svh]"
    >
      {/* ─── STICKY 100svh VIEWPORT STAGE ─── */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* ─── LAYER 1 (z-10): REVEALED SANCTUARY ARTWORK & REASSURING MESSAGE ─── */}
        <div className="absolute inset-0 w-full h-full z-10">
          {/* Peaceful vector dawn environment */}
          {illustrationSrc ? (
            <Image
              src={illustrationSrc}
              alt="Calming sanctuary dawn"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <SanctuaryDawnArtwork idPrefix="sanctuary-revealed" />
          )}

          {/* Soft central gradient scrim to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-paper-50 via-paper-50/70 to-transparent dark:from-night-950 dark:via-night-950/75 dark:to-transparent pointer-events-none" />
        </div>

        {/* ─── LAYER 1.5: CENTERED HERO REVEAL CONTENT ─── */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center py-6 pointer-events-auto"
        >
          {/* Empathetic eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-50/90 dark:bg-night-900/90 border border-ink-900/10 dark:border-white/10 text-ink-800 dark:text-ink-100 text-sm font-medium shadow-sm backdrop-blur-md mb-4">
            <Heart className="w-3.5 h-3.5 text-aurora-blush" weight="fill" />
            <span>You are safe here. Take all the time you need.</span>
          </div>

          <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-900 dark:text-white mb-4 text-balance">
            Take a gentle breath. You don&apos;t have to carry this alone.
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-ink-700 dark:text-ink-200 leading-relaxed max-w-2xl mx-auto mb-6">
            Whatever you are facing right now—heavy thoughts, confusion, exhaustion, or distress—take it one step at a time. Free support is waiting just below.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#emergency-triage"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 font-semibold text-sm sm:text-base shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
            >
              <span>Scroll down for all helplines</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" weight="bold" />
            </a>
            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 dark:text-ink-300">
              <ShieldCheck className="w-4 h-4 text-aurora-sea" weight="fill" />
              <span>Official Indian Helplines</span>
            </div>
          </div>
        </motion.div>

        {/* ─── LAYER 2 (z-30): SCROLL AFFORDANCE CUE ─── */}
        <motion.div
          style={{ opacity: scrollCueOpacity, y: scrollCueY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper-50/90 dark:bg-night-950/90 text-ink-900 dark:text-white border border-ink-900/15 dark:border-white/15 text-sm font-semibold shadow-md backdrop-blur-sm">
            <Sparkle className="w-3.5 h-3.5 text-aurora-dawn shrink-0" weight="fill" />
            <span>Scroll gently to part the curtains</span>
            <ArrowDown className="w-3.5 h-3.5 text-aurora-sea shrink-0" weight="bold" />
          </span>
        </motion.div>

        {/* ─── LAYER 3 (z-20): NEAR-VERTICAL PARTING CURTAIN PANELS ─── */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          aria-hidden="true"
        >
          {/* LEFT CURTAIN PANEL */}
          <motion.div
            style={{
              x: leftX,
              rotate: leftRotate,
              opacity: curtainOpacity,
              transformOrigin: "bottom left",
              filter: "drop-shadow(-8px 12px 28px rgba(28,27,41,0.22))",
            }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <svg
              className="w-full h-full object-cover select-none pointer-events-none"
              viewBox="0 0 1600 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <clipPath id="left-curtain-clip">
                  <path d={LEFT_SEAM_PATH} />
                </clipPath>
              </defs>

              <g clipPath="url(#left-curtain-clip)">
                {illustrationSrc ? (
                  <image
                    href={illustrationSrc}
                    width="1600"
                    height="900"
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <SanctuaryDawnArtwork idPrefix="sanctuary-left-curtain" />
                )}
              </g>

              {/* Delicate tactile edge highlight along the open seam */}
              <path
                d={DECKLE_EDGE_PATH}
                className="stroke-paper-50/90 dark:stroke-aurora-dawn/50"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* RIGHT CURTAIN PANEL */}
          <motion.div
            style={{
              x: rightX,
              rotate: rightRotate,
              opacity: curtainOpacity,
              transformOrigin: "bottom right",
              filter: "drop-shadow(8px 12px 28px rgba(28,27,41,0.22))",
            }}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <svg
              className="w-full h-full object-cover select-none pointer-events-none"
              viewBox="0 0 1600 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <clipPath id="right-curtain-clip">
                  <path d={RIGHT_SEAM_PATH} />
                </clipPath>
              </defs>

              <g clipPath="url(#right-curtain-clip)">
                {illustrationSrc ? (
                  <image
                    href={illustrationSrc}
                    width="1600"
                    height="900"
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <SanctuaryDawnArtwork idPrefix="sanctuary-right-curtain" />
                )}
              </g>

              {/* Delicate tactile edge highlight along the open seam */}
              <path
                d={DECKLE_EDGE_PATH}
                className="stroke-paper-50/90 dark:stroke-aurora-dawn/50"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
