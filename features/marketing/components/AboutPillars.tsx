// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import Image from "next/image"
import { Heart, EyeSlash, Shield } from "@phosphor-icons/react"
const dawnImage = "/images/about/about-2.jpg"
const middayImage = "/images/about/about-3.jpg"
const duskImage = "/images/about/about-4.jpg"

interface PillarItem {
  eyebrow: string
  title: string
  description: string
  icon: React.ReactNode
  image: string
  imageAlt: string
}

const PILLARS: PillarItem[] = [
  {
    eyebrow: "Pillar 01 • Warm Dawn",
    title: "Warm Support",
    description:
      "Empathy first. No sterile clinical language. We meet you where you are, sounding like a supportive companion who understands everyday stress.",
    icon: <Heart className="w-7 h-7 text-aurora-sea" weight="duotone" />,
    image: dawnImage,
    imageAlt: "Golden morning sunlight bathing an open landscape",
  },
  {
    eyebrow: "Pillar 02 • Midday Vista",
    title: "Anonymous First",
    description:
      "You can start right away without creating an account or giving your real name, through the 'Continue Anonymously' flow. Chat content is never shared with parents.",
    icon: <EyeSlash className="w-7 h-7 text-aurora-dusk" weight="duotone" />,
    image: middayImage,
    imageAlt: "Expansive mountain vista in clear midday daylight",
  },
  {
    eyebrow: "Pillar 03 • Twilight Dusk",
    title: "Safety Layer & Crisis Support",
    description:
      "Every message passes through keyword safety detection before reaching the AI. If acute risk or self-harm is detected, a crisis banner immediately displays direct emergency helpline numbers. Peer chats include automated filtering and a report button to flag unsafe messages.",
    icon: <Shield className="w-7 h-7 text-aurora-blush" weight="duotone" />,
    image: duskImage,
    imageAlt: "Peaceful dusk horizon with layered twilight tones",
  },
]

export function AboutPillars() {
  return (
    <section aria-label="Core Pillars" className="w-full flex flex-col gap-10 md:gap-14">
      {PILLARS.map((pillar, index) => (
        <div
          key={pillar.title}
          className="relative rounded-3xl overflow-hidden min-h-[460px] md:min-h-[500px] flex items-center justify-center p-6 sm:p-10 md:p-14 border border-ink-900/10 dark:border-white/10"
        >
          {/* Background Window Image */}
          <Image
            src={pillar.image}
            alt={pillar.imageAlt}
            loading="lazy"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />

          {/* Soft contrast shade */}
          <div
            className="absolute inset-0 bg-black/35 dark:bg-black/55 pointer-events-none"
            aria-hidden="true"
          />

          {/* Clean Floating Card */}
          <div
            className={`relative z-10 w-full max-w-xl rounded-2xl md:rounded-3xl bg-paper-50/95 dark:bg-night-900/95 border border-ink-900/10 dark:border-white/10 p-8 sm:p-10 md:p-12 shadow-xl ${
              index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-paper-100 dark:bg-night-800 border border-ink-900/10 dark:border-white/10 flex items-center justify-center shrink-0">
                {pillar.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                {pillar.eyebrow}
              </span>
            </div>

            <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-semibold text-ink-900 dark:text-white mb-4 tracking-tight">
              {pillar.title}
            </h2>

            <p className="font-sans text-lg md:text-xl text-ink-700 dark:text-ink-200 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
