"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"
import { Sparkle, ChatCircleText } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface TestimonialItem {
  quote: string
  alias: string
  age: number
  avatarColor: string
  avatarChar: string
  reaction?: string
}

const ROW_1: TestimonialItem[] = [
  {
    quote: "tbh Nova helped me calm down so much last night. actually felt like i was talking to an older sister 🙏",
    alias: "Aarav",
    age: 16,
    avatarColor: "bg-aurora-sea/20 text-aurora-sea",
    avatarChar: "A",
    reaction: "❤️ 3"
  },
  {
    quote: "was super nervous to join peer support ngl, but feeling way less alone now.",
    alias: "Diya",
    age: 17,
    avatarColor: "bg-aurora-blush/20 text-aurora-blush",
    avatarChar: "D",
  },
  {
    quote: "the study hub schedules are insane. didn't even have to log in to get them 💯",
    alias: "Kabir",
    age: 15,
    avatarColor: "bg-aurora-dawn/20 text-aurora-dawn",
    avatarChar: "K",
    reaction: "🔥 5"
  },
  {
    quote: "finally found a place where i don't feel judged. W platform fr.",
    alias: "Sneha",
    age: 18,
    avatarColor: "bg-aurora-dusk/20 text-aurora-dusk",
    avatarChar: "S"
  }
]

const ROW_2: TestimonialItem[] = [
  {
    quote: "literally used the grounding exercise before my math exam and it actually worked 😭",
    alias: "Rohan",
    age: 16,
    avatarColor: "bg-signal-crisis/10 text-signal-crisis",
    avatarChar: "R",
    reaction: "🙌 2"
  },
  {
    quote: "so glad this is anonymous. getting advice without sharing my number is a massive W.",
    alias: "Priya",
    age: 15,
    avatarColor: "bg-aurora-sea/20 text-aurora-sea",
    avatarChar: "P"
  },
  {
    quote: "peer support feels so safe. the mods actually do their job here. rare.",
    alias: "Arjun",
    age: 17,
    avatarColor: "bg-aurora-blush/20 text-aurora-blush",
    avatarChar: "A",
    reaction: "💯 4"
  },
  {
    quote: "whenever my anxiety spikes i just open the app. it just gets it.",
    alias: "Ananya",
    age: 16,
    avatarColor: "bg-aurora-dawn/20 text-aurora-dawn",
    avatarChar: "A"
  }
]

function ChatBubble({ item }: { item: TestimonialItem }) {
  return (
    <div className="relative bg-white dark:bg-night-900 border border-ink-100 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2rem] rounded-bl-sm p-6 max-w-sm shrink-0 w-[320px] transition-transform duration-300 hover:scale-105 hover:-translate-y-2 group cursor-default">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm", item.avatarColor)}>
          {item.avatarChar}
        </div>
        <div>
          <div className="font-semibold text-ink-900 dark:text-white text-sm">{item.alias}</div>
          <div className="text-ink-400 dark:text-ink-500 text-xs">Age {item.age}</div>
        </div>
      </div>
      <p className="text-ink-700 dark:text-ink-300 text-[15px] leading-relaxed">
        {item.quote}
      </p>
      {item.reaction && (
        <div className="absolute -bottom-3 -right-2 bg-white dark:bg-night-800 border border-ink-100 dark:border-white/10 rounded-full px-3 py-1 text-xs font-semibold shadow-md z-10 group-hover:scale-110 transition-transform">
          {item.reaction}
        </div>
      )}
    </div>
  )
}

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-24 md:py-32 w-full bg-paper-50 dark:bg-night-950 overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center mb-16 px-4">
        <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-ink-200 dark:border-white/10 text-ink-600 dark:text-white/80 text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm">
          <ChatCircleText className="w-4 h-4" /> Feedback
        </span>
        <h2 className="font-fraunces text-4xl md:text-5xl font-semibold text-ink-900 dark:text-white mb-4 tracking-tight">
          Don&apos;t just take it from us.
        </h2>
        <p className="text-lg text-ink-600 dark:text-ink-300 max-w-lg mx-auto">
          See what other teenagers are saying about the community.
        </p>
      </div>

      <div className="relative flex flex-col gap-8 py-4">
        {/* Left/Right Edge Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-paper-50 dark:from-night-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-paper-50 dark:from-night-950 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Moves Left */}
        <div className="flex w-max">
          <div className={cn("flex gap-8 px-4", !shouldReduceMotion && "animate-marquee-left")}>
            {[...ROW_1, ...ROW_1].map((item, idx) => (
              <ChatBubble key={`r1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex w-max -ml-[300px]">
          <div className={cn("flex gap-8 px-4", !shouldReduceMotion && "animate-marquee-right")}>
            {[...ROW_2, ...ROW_2].map((item, idx) => (
              <ChatBubble key={`r2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Illustrative Notice Disclaimer */}
      <div className="flex items-center justify-center gap-2 text-center text-xs text-ink-500 dark:text-ink-400 max-w-xl mx-auto px-4 mt-16 font-medium">
        <Sparkle className="w-4 h-4 text-aurora-dawn shrink-0" weight="fill" />
        <p className="italic">
          Note: To protect teenager privacy, all names and quotes are composite illustrations representing common user feedback.
        </p>
      </div>
    </section>
  )
}
