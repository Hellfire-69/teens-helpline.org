"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react"
import { ArrowDown } from "@phosphor-icons/react"

interface GetHelpCurtainProps {
  children: React.ReactNode
}

/**
 * GetHelpCurtain
 *
 * Implements a scroll-driven "curtain" story reveal for the Help page.
 *
 * Story:
 * - CLOSED: One warm sunrise mountain scene. The soft sun sits right on the seam,
 *   bisected into two halves.
 * - OPENING: A gentle zigzag seam runs from top to bottom. As the user scrolls,
 *   the left panel slides left and the right panel slides right.
 *   - LEFT PANEL carries the Mountain Beacon ("You") resting on a high peak.
 *   - RIGHT PANEL carries the Guiding Lantern ("Someone who can help") in a calm valley.
 * - OPEN: As the curtains part, the headline, reassurance, and helplines appear.
 *
 * Safety & Accessibility:
 * - All content remains real server DOM text at all times (no display:none, no conditional drop).
 * - "Skip to helplines" visible pill allows instant bypass.
 * - Curtain panels are aria-hidden="true" and pointer-events-none.
 * - Keyboard tabbing to any helpline triggers native scrollIntoView, naturally opening the stage.
 * - prefers-reduced-motion: Bypasses curtain and sticky stage completely.
 */
export function GetHelpCurtain({ children }: GetHelpCurtainProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 180svh wrapper scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Responsive spring with low mass (0.08) for instant zero-lag responsiveness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    mass: 0.08,
    restDelta: 0.001,
  })

  // Parting transforms: 0% -> 72% scroll fully moves curtains out of view
  const leftX = useTransform(smoothProgress, [0, 0.72], ["0%", "-105%"])
  const rightX = useTransform(smoothProgress, [0, 0.72], ["0%", "105%"])
  const curtainOpacity = useTransform(smoothProgress, [0.65, 0.78], [1, 0])

  // Shared deterministic zigzag seam points across 1000x1600 viewBox
  // Top: (500,0) -> (485,220) -> (520,440) [sun center] -> (480,700) -> (525,960) -> (475,1200) -> (515,1420) -> Bottom: (500,1600)
  const leftSeamPath =
    "M 0 0 L 500 0 L 485 220 L 520 440 L 480 700 L 525 960 L 475 1200 L 515 1420 L 500 1600 L 0 1600 Z"
  const rightSeamPath =
    "M 1000 0 L 500 0 L 485 220 L 520 440 L 480 700 L 525 960 L 475 1200 L 515 1420 L 500 1600 L 1000 1600 Z"

  // If reduced motion is requested or before client mount, render plain accessible flow
  if (!mounted || prefersReduced) {
    return (
      <div className="relative w-full">
        {children}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-[180svh]">
      {/* ─── STICKY 100svh CURTAIN OVERLAY ─── */}
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden pointer-events-none z-30"
        aria-hidden="true"
      >
        {/* Visible Skip to Helplines button (pointer-events-auto for touch & click) */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-50 pointer-events-auto">
          <a
            href="#helplines-list"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper-100/95 dark:bg-night-900/95 border border-ink-900/15 dark:border-white/15 text-xs sm:text-sm font-semibold text-ink-900 dark:text-white hover:text-aurora-sea dark:hover:text-aurora-sea shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
          >
            <span>Skip to helplines</span>
            <ArrowDown className="w-3.5 h-3.5 text-aurora-sea shrink-0" weight="bold" />
          </a>
        </div>

        {/* ─── LEFT CURTAIN PANEL ─── */}
        <motion.div
          style={{ x: leftX, opacity: curtainOpacity }}
          className="absolute inset-y-0 left-0 w-full h-full pointer-events-none will-change-transform"
        >
          <svg
            className="w-full h-full object-cover select-none pointer-events-none"
            viewBox="0 0 1000 1600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="left-curtain-clip">
                <path d={leftSeamPath} />
              </clipPath>
            </defs>

            <g clipPath="url(#left-curtain-clip)">
              {/* Sky Background */}
              <rect
                width="1000"
                height="1600"
                className="fill-paper-100 dark:fill-night-900 transition-colors"
              />

              {/* Bisected Soft Low Sun (left half) */}
              <circle
                cx="500"
                cy="440"
                r="115"
                className="fill-aurora-dawn/50 dark:fill-aurora-dawn/30"
              />
              <circle
                cx="500"
                cy="440"
                r="75"
                className="fill-aurora-dawn/75 dark:fill-aurora-dawn/50"
              />

              {/* Distant Ridge - Warm Apricot / Dawn */}
              <path
                d="M 0 980 Q 240 880 500 930 T 1000 900 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-dawn/40 dark:fill-aurora-dawn/25"
              />

              {/* Mid-far Ridge - Rose / Blush */}
              <path
                d="M 0 1120 Q 300 1040 600 1100 T 1000 1060 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-blush/60 dark:fill-aurora-blush/40"
              />

              {/* LEFT SIDE ARTWORK: Mountain Beacon ("You") */}
              {/* Quiet peak beacon at cx=240, cy=1050 */}
              <circle
                cx="240"
                cy="1050"
                r="32"
                className="stroke-aurora-dawn/40 fill-none"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle
                cx="240"
                cy="1050"
                r="18"
                className="fill-aurora-dawn/40"
              />
              <circle
                cx="240"
                cy="1050"
                r="9"
                className="fill-aurora-dawn"
              />
              <circle
                cx="240"
                cy="1050"
                r="4"
                className="fill-paper-50 dark:fill-white"
              />
              {/* Natural peak support cairn */}
              <path
                d="M 226 1064 L 254 1064 L 248 1074 L 232 1074 Z"
                className="fill-aurora-dusk/60 dark:fill-night-950"
              />
              <path
                d="M 220 1074 L 260 1074 L 252 1088 L 228 1088 Z"
                className="fill-aurora-dusk/80 dark:fill-night-950"
              />

              {/* Mid Ridge - Plum / Dusk */}
              <path
                d="M 0 1280 Q 360 1200 700 1260 T 1000 1220 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-dusk/75 dark:fill-aurora-dusk/60"
              />

              {/* Foreground Twilight Ridge */}
              <path
                d="M 0 1440 Q 420 1380 800 1420 T 1000 1390 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-dusk dark:fill-night-950"
              />
            </g>
          </svg>
        </motion.div>

        {/* ─── RIGHT CURTAIN PANEL ─── */}
        <motion.div
          style={{ x: rightX, opacity: curtainOpacity }}
          className="absolute inset-y-0 right-0 w-full h-full pointer-events-none will-change-transform"
        >
          <svg
            className="w-full h-full object-cover select-none pointer-events-none"
            viewBox="0 0 1000 1600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="right-curtain-clip">
                <path d={rightSeamPath} />
              </clipPath>
            </defs>

            <g clipPath="url(#right-curtain-clip)">
              {/* Sky Background */}
              <rect
                width="1000"
                height="1600"
                className="fill-paper-100 dark:fill-night-900 transition-colors"
              />

              {/* Bisected Soft Low Sun (right half) */}
              <circle
                cx="500"
                cy="440"
                r="115"
                className="fill-aurora-dawn/50 dark:fill-aurora-dawn/30"
              />
              <circle
                cx="500"
                cy="440"
                r="75"
                className="fill-aurora-dawn/75 dark:fill-aurora-dawn/50"
              />

              {/* Distant Ridge - Warm Apricot / Dawn */}
              <path
                d="M 0 980 Q 240 880 500 930 T 1000 900 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-dawn/40 dark:fill-aurora-dawn/25"
              />

              {/* Mid-far Ridge - Rose / Blush */}
              <path
                d="M 0 1120 Q 300 1040 600 1100 T 1000 1060 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-blush/60 dark:fill-aurora-blush/40"
              />

              {/* RIGHT SIDE ARTWORK: Guiding Lantern ("Someone who can help") */}
              {/* Valley post lantern at cx=760, cy=1180 */}
              <circle
                cx="760"
                cy="1180"
                r="36"
                className="stroke-aurora-sea/40 fill-none"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle
                cx="760"
                cy="1180"
                r="22"
                className="fill-aurora-sea/30"
              />
              {/* Lantern housing */}
              <rect
                x="746"
                y="1166"
                width="28"
                height="30"
                rx="4"
                className="stroke-aurora-sea fill-aurora-sea/25"
                strokeWidth="2"
              />
              <path
                d="M 742 1166 L 760 1152 L 778 1166 Z"
                className="fill-aurora-sea"
              />
              <circle
                cx="760"
                cy="1181"
                r="7"
                className="fill-aurora-sea"
              />
              <circle
                cx="760"
                cy="1181"
                r="3"
                className="fill-white"
              />
              <line
                x1="760"
                y1="1196"
                x2="760"
                y2="1230"
                className="stroke-aurora-sea"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Mid Ridge - Plum / Dusk */}
              <path
                d="M 0 1280 Q 360 1200 700 1260 T 1000 1220 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-dusk/75 dark:fill-aurora-dusk/60"
              />

              {/* Foreground Twilight Ridge */}
              <path
                d="M 0 1440 Q 420 1380 800 1420 T 1000 1390 L 1000 1600 L 0 1600 Z"
                className="fill-aurora-dusk dark:fill-night-950"
              />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* ─── REAL SERVER CONTENT LAYER ─── */}
      {/* Positioned underneath the sticky curtain; uncurtains smoothly as you scroll */}
      <div className="relative z-10 -mt-[100svh]">
        {children}
      </div>
    </div>
  )
}
