import * as React from "react"

/**
 * HelpRidgeWindow
 * A calm, static decorative ridge window for the Help page.
 * Uses system aurora tokens (apricot/dawn, rose/blush, plum/dusk).
 * Completely static SVG: no parallax, no scroll listener, no glow/blur.
 */
export function HelpRidgeWindow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-44 sm:h-56 md:h-64 lg:h-72 rounded-2xl md:rounded-3xl border border-ink-900/10 dark:border-white/10 overflow-hidden relative shadow-sm ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover pointer-events-none select-none"
        viewBox="0 0 1600 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Sky background */}
        <rect
          width="1600"
          height="700"
          className="fill-paper-100 dark:fill-night-900 transition-colors"
        />

        {/* Soft low sun */}
        <circle
          cx="1080"
          cy="360"
          r="110"
          className="fill-aurora-dawn/50 dark:fill-aurora-dawn/30"
        />

        {/* Far mountain ridge - Warm apricot / dawn */}
        <path
          d="M0 430 Q 180 380 380 415 T 780 395 T 1180 420 T 1600 390 L 1600 700 L 0 700 Z"
          className="fill-aurora-dawn/40 dark:fill-aurora-dawn/25"
        />

        {/* Mid-far mountain ridge - Warm rose / blush */}
        <path
          d="M0 495 Q 260 445 540 480 T 1020 460 T 1400 485 T 1600 470 L 1600 700 L 0 700 Z"
          className="fill-aurora-blush/60 dark:fill-aurora-blush/40"
        />

        {/* Mid mountain ridge - Plum / dusk with blush blend */}
        <path
          d="M0 560 Q 320 510 680 545 T 1150 525 T 1600 540 L 1600 700 L 0 700 Z"
          className="fill-aurora-dusk/75 dark:fill-aurora-dusk/60"
        />

        {/* Foreground mountain ridge - Deep twilight plum / dusk */}
        <path
          d="M0 625 Q 400 580 820 610 T 1320 595 T 1600 615 L 1600 700 L 0 700 Z"
          className="fill-aurora-dusk dark:fill-night-950"
        />
      </svg>
    </div>
  )
}
