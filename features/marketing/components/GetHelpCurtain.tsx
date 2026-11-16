"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"
import { ArrowDown, Sparkle } from "@phosphor-icons/react"

interface GetHelpCurtainProps {
  /** Optional custom 16:9 illustration asset path (e.g., from Recraft) */
  illustrationSrc?: string
}

// Shared deterministic diagonal zigzag seam from top-right (1080, 0) to bottom-left (520, 900)
// Irregular organic deckle vertices with subtle natural jitter
const SEAM_VERTICES =
  "L 1028 95 L 955 190 L 914 285 L 838 380 L 792 475 L 718 570 L 674 665 L 596 760 L 552 835 L 520 900"
const LEFT_SEAM_PATH = `M 0 0 L 1080 0 ${SEAM_VERTICES} L 0 900 Z`
const RIGHT_SEAM_PATH = `M 1600 0 L 1080 0 ${SEAM_VERTICES} L 1600 900 Z`
const DECKLE_EDGE_PATH = `M 1080 0 ${SEAM_VERTICES}`

/**
 * GetHelpCurtain
 *
 * Self-contained 155svh sticky hero reveal component with tactile diagonal paper-tear
 * physics, edge highlights, drop shadows, and calm storytelling artwork.
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
  })

  // Weighted tactile spring matching cardstock inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.12,
  })

  // Parting transforms with subtle organic paper rotation
  const leftX = useTransform(smoothProgress, [0, 0.82], ["0%", "-108%"])
  const rightX = useTransform(smoothProgress, [0, 0.82], ["0%", "108%"])
  const leftRotate = useTransform(smoothProgress, [0, 0.82], [0, -2.5])
  const rightRotate = useTransform(smoothProgress, [0, 0.82], [0, 2.5])
  const curtainOpacity = useTransform(smoothProgress, [0.75, 0.88], [1, 0])

  // Centered hero reveal transforms
  const heroScale = useTransform(smoothProgress, [0.05, 0.82], [0.95, 1])
  const heroOpacity = useTransform(smoothProgress, [0.05, 0.75], [0.4, 1])

  // Scroll cue affordance transforms
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.16], [1, 0])
  const scrollCueY = useTransform(smoothProgress, [0, 0.16], [0, -12])

  // Reduced motion and SSR fallback: render static hero in plain document flow
  if (!mounted || prefersReduced) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-8 text-center">
        <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white mb-3">
          I Need Help Now
        </h1>
        <p className="font-sans text-lg sm:text-xl font-medium text-aurora-sea dark:text-aurora-sea mb-4">
          You don't have to carry it all alone.
        </p>
        <p className="font-sans text-base sm:text-lg text-ink-700 dark:text-ink-300 leading-relaxed max-w-2xl mx-auto mb-6">
          If you are in immediate danger, feeling overwhelmed, or need to talk to a professional right now, please reach out to one of the free, confidential Indian helplines below.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[135svh] md:h-[155svh]"
    >
      {/* ─── STICKY 100svh VIEWPORT STAGE ─── */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* ─── LAYER 1 (z-10): CENTERED HERO REVEAL CONTENT ─── */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center flex flex-col items-center justify-center py-12"
        >
          <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink-900 dark:text-white mb-3">
            I Need Help Now
          </h1>
          <p className="font-sans text-lg sm:text-xl font-medium text-aurora-sea dark:text-aurora-sea mb-4">
            You don't have to carry it all alone.
          </p>
          <p className="font-sans text-base sm:text-lg text-ink-700 dark:text-ink-300 leading-relaxed max-w-2xl mx-auto mb-8">
            If you are in immediate danger, feeling overwhelmed, or need to talk to a professional right now, please reach out to one of the free, confidential Indian helplines below.
          </p>
          <a
            href="#helplines-list"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-aurora-sea hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm py-2 px-3 transition-colors"
          >
            <span>Scroll down to view all 5 helplines</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* ─── LAYER 2 (z-30): SCROLL AFFORDANCE CUE ─── */}
        <motion.div
          style={{ opacity: scrollCueOpacity, y: scrollCueY }}
          className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none select-none flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper-50/90 dark:bg-night-950/90 text-ink-900 dark:text-white border border-ink-900/15 dark:border-white/15 text-xs sm:text-sm font-semibold shadow-md backdrop-blur-sm animate-pulse-subtle">
            <Sparkle className="w-3.5 h-3.5 text-aurora-dawn shrink-0" weight="fill" />
            <span>Scroll to part the mist</span>
            <ArrowDown className="w-3.5 h-3.5 text-aurora-sea shrink-0" weight="bold" />
          </span>
        </motion.div>

        {/* ─── LAYER 3 (z-20): DIAGONAL PARTING CARDSTOCK CURTAIN PANELS ─── */}
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
              filter: "drop-shadow(-8px 12px 28px rgba(28,27,41,0.28))",
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
                <clipPath id="left-tear-clip">
                  <path d={LEFT_SEAM_PATH} />
                </clipPath>
              </defs>

              <g clipPath="url(#left-tear-clip)">
                {illustrationSrc ? (
                  <image
                    href={illustrationSrc}
                    width="1600"
                    height="900"
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <>
                    {/* Sky Background */}
                    <rect
                      width="1600"
                      height="900"
                      className="fill-paper-100 dark:fill-night-900 transition-colors"
                    />

                    {/* Atmospheric Mist & Gradient Bands */}
                    <path
                      d="M 0 320 C 450 280 850 340 1600 300 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dawn/15 dark:fill-aurora-dawn/10"
                    />
                    <path
                      d="M 0 440 C 400 400 900 460 1600 420 L 1600 900 L 0 900 Z"
                      className="fill-aurora-blush/25 dark:fill-aurora-blush/15"
                    />

                    {/* Diagonal Mist / Starlight River along the tear line */}
                    <path
                      d="M 1120 0 L 1040 0 L 480 900 L 560 900 Z"
                      className="fill-aurora-sea/15 dark:fill-aurora-sea/10"
                    />
                    <circle cx="980" cy="150" r="2.5" className="fill-aurora-dawn/70" />
                    <circle cx="900" cy="270" r="3" className="fill-white/80" />
                    <circle cx="820" cy="410" r="2" className="fill-aurora-sea/70" />
                    <circle cx="750" cy="520" r="3" className="fill-aurora-dawn/70" />
                    <circle cx="650" cy="680" r="2.5" className="fill-white/80" />
                    <circle cx="580" cy="800" r="3" className="fill-aurora-sea/70" />

                    {/* Layered Mountain Ridges */}
                    <path
                      d="M 0 540 Q 380 470 780 520 T 1600 490 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dawn/30 dark:fill-aurora-dawn/20"
                    />
                    <path
                      d="M 0 640 Q 420 570 900 620 T 1600 600 L 1600 900 L 0 900 Z"
                      className="fill-aurora-blush/45 dark:fill-aurora-blush/30"
                    />
                    <path
                      d="M 0 740 Q 460 670 980 720 T 1600 700 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dusk/75 dark:fill-aurora-dusk/60"
                    />
                    <path
                      d="M 0 830 Q 520 780 1050 820 T 1600 800 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dusk dark:fill-night-950"
                    />

                    {/* LEFT STORYTELLING LANDMARK: Hilltop Lookout Under Stars ("You") */}
                    <g transform="translate(40, 20)">
                      <path
                        d="M 210 560 L 240 535 L 270 560 Z"
                        className="fill-aurora-dusk/90 dark:fill-night-950"
                      />
                      <line
                        x1="220"
                        y1="560"
                        x2="220"
                        y2="585"
                        className="stroke-aurora-dusk/90 dark:stroke-night-900"
                        strokeWidth="2.5"
                      />
                      <line
                        x1="260"
                        y1="560"
                        x2="260"
                        y2="585"
                        className="stroke-aurora-dusk/90 dark:stroke-night-900"
                        strokeWidth="2.5"
                      />
                      {/* Quiet amber beacon light */}
                      <circle cx="240" cy="565" r="10" className="fill-aurora-dawn/40" />
                      <circle cx="240" cy="565" r="5" className="fill-aurora-dawn" />
                      <circle cx="240" cy="565" r="2" className="fill-white" />
                      {/* Quiet starry constellation above */}
                      <circle cx="190" cy="460" r="2" className="fill-aurora-dawn/80" />
                      <circle cx="240" cy="430" r="2.5" className="fill-white/90" />
                      <circle cx="290" cy="450" r="1.5" className="fill-aurora-dawn/70" />
                      <circle cx="260" cy="390" r="2" className="fill-white/90" />
                    </g>
                  </>
                )}
              </g>

              {/* Delicate Torn-Paper Edge Highlight along the open seam */}
              <path
                d={DECKLE_EDGE_PATH}
                className="stroke-paper-50/80 dark:stroke-aurora-dawn/50"
                strokeWidth="3.5"
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
              filter: "drop-shadow(8px 12px 28px rgba(28,27,41,0.28))",
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
                <clipPath id="right-tear-clip">
                  <path d={RIGHT_SEAM_PATH} />
                </clipPath>
              </defs>

              <g clipPath="url(#right-tear-clip)">
                {illustrationSrc ? (
                  <image
                    href={illustrationSrc}
                    width="1600"
                    height="900"
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <>
                    {/* Sky Background */}
                    <rect
                      width="1600"
                      height="900"
                      className="fill-paper-100 dark:fill-night-900 transition-colors"
                    />

                    {/* Atmospheric Mist & Gradient Bands */}
                    <path
                      d="M 0 320 C 450 280 850 340 1600 300 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dawn/15 dark:fill-aurora-dawn/10"
                    />
                    <path
                      d="M 0 440 C 400 400 900 460 1600 420 L 1600 900 L 0 900 Z"
                      className="fill-aurora-blush/25 dark:fill-aurora-blush/15"
                    />

                    {/* Diagonal Mist / Starlight River along the tear line */}
                    <path
                      d="M 1120 0 L 1040 0 L 480 900 L 560 900 Z"
                      className="fill-aurora-sea/15 dark:fill-aurora-sea/10"
                    />
                    <circle cx="980" cy="150" r="2.5" className="fill-aurora-dawn/70" />
                    <circle cx="900" cy="270" r="3" className="fill-white/80" />
                    <circle cx="820" cy="410" r="2" className="fill-aurora-sea/70" />
                    <circle cx="750" cy="520" r="3" className="fill-aurora-dawn/70" />
                    <circle cx="650" cy="680" r="2.5" className="fill-white/80" />
                    <circle cx="580" cy="800" r="3" className="fill-aurora-sea/70" />

                    {/* Layered Mountain Ridges */}
                    <path
                      d="M 0 540 Q 380 470 780 520 T 1600 490 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dawn/30 dark:fill-aurora-dawn/20"
                    />
                    <path
                      d="M 0 640 Q 420 570 900 620 T 1600 600 L 1600 900 L 0 900 Z"
                      className="fill-aurora-blush/45 dark:fill-aurora-blush/30"
                    />
                    <path
                      d="M 0 740 Q 460 670 980 720 T 1600 700 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dusk/75 dark:fill-aurora-dusk/60"
                    />
                    <path
                      d="M 0 830 Q 520 780 1050 820 T 1600 800 L 1600 900 L 0 900 Z"
                      className="fill-aurora-dusk dark:fill-night-950"
                    />

                    {/* RIGHT STORYTELLING LANDMARK: Welcoming Sanctuary Shelter & Lantern ("Someone who can help") */}
                    <g transform="translate(10, 10)">
                      <path
                        d="M 1315 620 L 1340 595 L 1365 620 Z"
                        className="fill-aurora-sea/90 dark:fill-night-950"
                      />
                      <rect
                        x="1324"
                        y="620"
                        width="32"
                        height="36"
                        rx="4"
                        className="fill-aurora-dusk/80 dark:fill-night-900"
                      />
                      <path
                        d="M 1332 656 L 1332 635 A 8 8 0 0 1 1348 635 L 1348 656 Z"
                        className="fill-aurora-sea/30"
                      />
                      {/* Welcoming lantern light */}
                      <circle cx="1340" cy="636" r="14" className="fill-aurora-sea/40" />
                      <circle cx="1340" cy="636" r="7" className="fill-aurora-dawn" />
                      <circle cx="1340" cy="636" r="2.5" className="fill-white" />
                      {/* Quiet guiding starlight */}
                      <circle cx="1300" cy="530" r="2" className="fill-white/80" />
                      <circle cx="1380" cy="510" r="2.5" className="fill-aurora-sea/80" />
                      <circle cx="1350" cy="470" r="1.5" className="fill-aurora-dawn/70" />
                    </g>
                  </>
                )}
              </g>

              {/* Delicate Torn-Paper Edge Highlight along the open seam */}
              <path
                d={DECKLE_EDGE_PATH}
                className="stroke-paper-50/80 dark:stroke-aurora-dawn/50"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
