"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import {
  ChatTeardropText,
  Smiley,
  BookOpen,
  UsersThree,
  Wind,
  Notebook,
  Sparkle,
  ArrowRight
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

interface FeatureItem {
  pill: string
  title: string
  description: string
  metric1: { value: string; label: string }
  metric2: { value: string; label: string }
  colorClass: string
  icon: React.ComponentType<{ className?: string; weight?: "fill" | "duotone" | "regular" | "bold" }>
  href?: string
}

const FEATURES: FeatureItem[] = [
  {
    pill: "AI COMPANION",
    title: "Chat with Nova",
    description: "Receive elder-sibling styled guidance for daily school stress and family issues.",
    metric1: { value: "24/7", label: "Availability" },
    metric2: { value: "< 2s", label: "Response time" },
    colorClass: "from-aurora-sea to-aurora-dusk",
    icon: ChatTeardropText,
    href: "/onboarding"
  },
  {
    pill: "WELLNESS",
    title: "Mood Check-Ins",
    description: "Track your emotions and get customized tool and article suggestions tailored to your state.",
    metric1: { value: "100%", label: "Private" },
    metric2: { value: "Daily", label: "Insights" },
    colorClass: "from-aurora-dawn to-aurora-sea",
    icon: Smiley,
    href: "/onboarding"
  },
  {
    pill: "PRODUCTIVITY",
    title: "Study Hub",
    description: "Access focus techniques, study templates, time management, and career planning tools.",
    metric1: { value: "50+", label: "Templates" },
    metric2: { value: "Focus", label: "Timers" },
    colorClass: "from-aurora-dusk to-aurora-blush",
    icon: BookOpen,
    href: "/study-hub"
  },
  {
    pill: "COMMUNITY",
    title: "Peer Support",
    description: "Connect anonymously with a trained teen volunteer in a safely moderated portal.",
    metric1: { value: "Trained", label: "Volunteers" },
    metric2: { value: "Zero", label: "Judgment" },
    colorClass: "from-aurora-blush to-aurora-sea",
    icon: UsersThree,
    href: "/peer-support"
  },
  {
    pill: "REGULATION",
    title: "Breathing Exercises",
    description: "Interactive visual exercises to help you slow down, regulate, and center yourself.",
    metric1: { value: "4-7-8", label: "Method" },
    metric2: { value: "Visual", label: "Guidance" },
    colorClass: "from-aurora-sea to-aurora-dawn",
    icon: Wind
  },
  {
    pill: "REFLECTION",
    title: "Private Journal",
    description: "Jot down your daily reflections in a secure, memory-only session notepad.",
    metric1: { value: "Zero", label: "Data saved" },
    metric2: { value: "Secure", label: "Session" },
    colorClass: "from-aurora-dawn to-aurora-dusk",
    icon: Notebook
  }
]

export function FeaturesGrid() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 w-full bg-white dark:bg-night-950 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-100 dark:bg-white/10 text-ink-900 dark:text-white text-[11px] font-bold tracking-widest uppercase mb-6">
            Everything you need
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-900 dark:text-white mb-6 tracking-tight max-w-3xl leading-[1.1]">
            Plug-and-play agents ready to deploy.
          </h2>
          <p className="text-lg md:text-xl text-ink-600 dark:text-ink-300 max-w-xl leading-relaxed">
            No cluttered stubs. We build what is genuinely helpful to get you to your next right step. Every feature is tested, secure, and ready.
          </p>
        </div>

        {/* Sticky Card Stack */}
        <div className="flex flex-col relative pb-32">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon

            return (
              <div
                key={idx}
                className="sticky w-full h-[600px] md:h-[450px] mb-8 origin-top"
                style={{ top: `calc(12vh + ${idx * 24}px)` }}
              >
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                  className="relative w-full h-full bg-white dark:bg-night-900 border border-ink-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden group origin-top will-change-transform"
                >
                  {/* 1. Base Shared Aurora Mesh across the entire card */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 dark:opacity-50 blur-[100px] transition-opacity duration-700 group-hover:opacity-60", feature.colorClass)} />
                  
                  {/* 2. Soft readability mask fading from solid left to transparent right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-night-900/95 dark:via-night-900/80 dark:to-transparent pointer-events-none" />
                  
                  {/* 3. The 3D Visuals (Absolutely positioned on the right to bleed ambient light everywhere) */}
                  <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 flex items-center justify-center pointer-events-none z-0">
                    {/* Giant ambient bloom centered behind the 3D object */}
                    <div className={cn("absolute inset-0 m-auto w-[120%] h-[120%] bg-gradient-to-tr opacity-30 dark:opacity-40 blur-[120px] rounded-full", feature.colorClass)} />
                    
                    {/* 3D Glass Object Simulation */}
                    <motion.div
                      animate={shouldReduceMotion ? {} : { y: [-8, 8, -8] }}
                      transition={{ duration: 6 + idx, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 w-40 h-40 md:w-64 md:h-64 rounded-full border border-white/60 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex items-center justify-center bg-white/20 dark:bg-white/5 backdrop-blur-md"
                    >
                      {/* Inner glowing orb */}
                      <div className={cn("absolute inset-3 md:inset-5 rounded-full bg-gradient-to-tr opacity-50 blur-2xl", feature.colorClass)} />
                      
                      {/* Phosphor Icon as the core */}
                      <Icon className="w-16 h-16 md:w-24 md:h-24 text-ink-900 dark:text-white drop-shadow-2xl z-20" weight="duotone" />
                      
                      {/* Specular highlight */}
                      <div className="absolute top-2 md:top-4 left-4 md:left-6 w-12 h-6 md:w-16 md:h-8 rounded-full bg-white/80 dark:bg-white/20 blur-md rotate-[-30deg]" />
                    </motion.div>

                    {/* Small orbiting gems */}
                    <motion.div 
                      animate={shouldReduceMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute w-[20rem] h-[20rem] md:w-[26rem] md:h-[26rem] pointer-events-none"
                    >
                      <div className="absolute top-0 left-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/60 dark:bg-white/10 border border-white/80 dark:border-white/30 shadow-xl flex items-center justify-center backdrop-blur-md">
                        <Sparkle className="w-3 h-3 md:w-4 md:h-4 text-ink-900/60 dark:text-white" weight="fill" />
                      </div>
                      <div className="absolute bottom-10 right-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/20 shadow-lg backdrop-blur-sm" />
                    </motion.div>
                  </div>

                  {/* 4. Left Side: Text Content */}
                  <div className="relative z-10 w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col justify-between pointer-events-auto">
                    <div>
                      <div className="inline-block px-3 py-1.5 rounded-full bg-white dark:bg-night-800 text-ink-600 dark:text-white/80 text-[10px] font-bold tracking-widest uppercase mb-5 shadow-sm border border-ink-100 dark:border-white/10 backdrop-blur-md">
                        {feature.pill}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-inter font-semibold text-ink-900 dark:text-white mb-3 tracking-tight leading-[1.1]">
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg text-ink-600 dark:text-ink-300 leading-relaxed max-w-sm font-medium">
                        {feature.description}
                      </p>
                      {feature.href && (
                        <div className="mt-5">
                          <Link href={feature.href}>
                            <Button variant="ghost" className="rounded-full px-0 hover:bg-transparent text-ink-900 dark:text-white font-semibold transition-colors group/btn relative z-20">
                              Explore feature
                              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-12 mt-6 border-t border-ink-200/50 dark:border-white/10 pt-6">
                      <div>
                        <div className="text-2xl font-inter font-light text-ink-900 dark:text-white tracking-tight drop-shadow-sm">
                          {feature.metric1.value}
                        </div>
                        <div className="text-[10px] font-bold text-ink-400 dark:text-ink-400 uppercase tracking-widest mt-1">
                          {feature.metric1.label}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-inter font-light text-ink-900 dark:text-white tracking-tight drop-shadow-sm">
                          {feature.metric2.value}
                        </div>
                        <div className="text-[10px] font-bold text-ink-400 dark:text-ink-400 uppercase tracking-widest mt-1">
                          {feature.metric2.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
