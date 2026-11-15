// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
import * as React from "react"

/** Deterministic pseudo-random generator (mulberry32). */
function mulberry32(seed: number) {
  let a = seed | 0
  return function () {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Generates a smooth, closed mountain ridge path. */
function ridgePath(seed: number, base: number, amp: number, w = 1600, h = 900) {
  const rnd = mulberry32(seed)
  const ph = rnd() * 6.283
  const n = 40
  let d = `M0 ${h}`
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * w
    const y =
      base -
      amp *
        (0.55 * Math.sin(i * 0.33 + ph) +
          0.3 * Math.sin(i * 0.91 + ph * 2) +
          0.15 * (rnd() * 2 - 1))
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return `${d} L${w} ${h} Z`
}

export interface RidgeTones {
  skyTop: string
  skyBottom: string
  ridge1: string
  ridge2: string
  ridge3: string
  ridge4: string
}

export const RIDGE_PALETTES: Record<"dawn" | "midday" | "dusk", RidgeTones> = {
  dawn: {
    skyTop: "#FDF5ED",
    skyBottom: "#FCE7D0",
    ridge1: "#F7D5BA",
    ridge2: "#EEB289",
    ridge3: "#DF8D63",
    ridge4: "#B85C43",
  },
  midday: {
    skyTop: "#EEF8F6",
    skyBottom: "#DCF0EB",
    ridge1: "#BEE2DC",
    ridge2: "#8DCAC0",
    ridge3: "#5BAEA2",
    ridge4: "#3D8278",
  },
  dusk: {
    skyTop: "#F4EFF8",
    skyBottom: "#E9DFEF",
    ridge1: "#CFBFE2",
    ridge2: "#AB95C9",
    ridge3: "#856EAA",
    ridge4: "#5E4984",
  },
}

export function AboutRidges({
  tones = RIDGE_PALETTES.dawn,
  className = "",
}: {
  tones?: RidgeTones
  className?: string
}) {
  const id = "ridge" + React.useId().replace(/[^a-zA-Z0-9]/g, "")

  return (
    <svg
      className={`w-full h-full absolute inset-0 object-cover pointer-events-none select-none ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tones.skyTop} />
          <stop offset="85%" stopColor={tones.skyBottom} />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
      <path d={ridgePath(3, 460, 65)} fill={tones.ridge1} opacity="0.75" />
      <path d={ridgePath(11, 550, 75)} fill={tones.ridge2} opacity="0.85" />
      <path d={ridgePath(23, 650, 65)} fill={tones.ridge3} />
      <path d={ridgePath(41, 770, 55)} fill={tones.ridge4} />
    </svg>
  )
}

export function AboutRidgeWindow({
  tones = RIDGE_PALETTES.dawn,
  children,
  className = "",
}: {
  tones?: RidgeTones
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-ink-900/10 dark:border-white/10 ${className}`}
    >
      <AboutRidges tones={tones} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
