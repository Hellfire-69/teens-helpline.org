"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  Users,
  House,
  Heart,
  UserGear,
  Flame,
  ArrowRight
} from "@phosphor-icons/react"

interface ConcernItem {
  icon: React.ComponentType<{ className?: string; weight?: "fill" | "duotone" | "regular" | "bold" }>
  title: string
  description: string
  slug: string
  colorClass: string
}

const CONCERNS: ConcernItem[] = [
  {
    icon: GraduationCap,
    title: "Academic Stress",
    description: "Dealing with exam anxiety, study pressure, workload, and expectations.",
    slug: "academic-stress",
    colorClass: "bg-aurora-dusk/10 border-aurora-dusk/20 shadow-aurora-dusk/5"
  },
  {
    icon: Users,
    title: "Bullying",
    description: "Navigating school teasing, rumors, peer exclusion, or online bullying.",
    slug: "bullying",
    colorClass: "bg-aurora-blush/10 border-aurora-blush/20 shadow-aurora-blush/5"
  },
  {
    icon: House,
    title: "Family Concerns",
    description: "Navigating strict rules at home, conflict with parents, or sibling tensions.",
    slug: "family-concerns",
    colorClass: "bg-aurora-sea/10 border-aurora-sea/20 shadow-aurora-sea/5"
  },
  {
    icon: Heart,
    title: "Friendships",
    description: "Managing arguments with friends, peer pressure, and relationship boundaries.",
    slug: "friendships-relationships",
    colorClass: "bg-aurora-dawn/10 border-aurora-dawn/20 shadow-aurora-dawn/5"
  },
  {
    icon: UserGear,
    title: "Identity & Confidence",
    description: "Understanding your identity, building self-esteem, and finding confidence.",
    slug: "confidence-identity",
    colorClass: "bg-aurora-blush/10 border-aurora-blush/20 shadow-aurora-blush/5"
  },
  {
    icon: Flame,
    title: "Anxiety & Overwhelm",
    description: "Finding grounding exercises and advice when feeling emotionally overloaded.",
    slug: "emotional-overwhelm",
    colorClass: "bg-signal-crisis/10 border-signal-crisis/20 shadow-signal-crisis/5"
  }
]

export function ConcernsGrid() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = React.useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // We define the final fan-out states for each of the 6 cards.
  const rotations = [-28, -16, -4, 4, 16, 28]
  const xTranslations = ["-130%", "-80%", "-28%", "28%", "80%", "130%"]
  const yTranslations = ["15%", "8%", "1%", "1%", "8%", "15%"]

  return (
    <section 
      ref={containerRef} 
      className="relative h-[210vh] w-full bg-night-950 text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-16 md:pt-24">
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="absolute w-[80vw] h-[50vh] bg-aurora-sea/5 blur-[120px] rounded-[100%]" />
        </div>

        <div className="relative z-20 text-center px-4 mb-16 md:mb-24 flex-shrink-0">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm border border-white/10 backdrop-blur-md">
            Self-Help Resources
          </span>
          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-white tracking-tight">
            Common things teens talk to us about
          </h2>
          <p className="text-lg md:text-xl text-ink-300 max-w-2xl mx-auto mb-8">
            Explore articles, guided toolsets, and exercises written by professionals to help you regulate.
          </p>
          <Link href="/study-hub">
            <Button className="rounded-full px-8 bg-white text-night-950 hover:bg-white/90 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Browse all resources
            </Button>
          </Link>
        </div>

        <div className="relative w-[300px] md:w-[340px] h-[460px] md:h-[540px] z-10 flex-shrink-0">
          {CONCERNS.map((item, idx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const rotate = useTransform(smoothProgress, [0.15, 0.65], [0, rotations[idx]])
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const x = useTransform(smoothProgress, [0.15, 0.65], ["0%", xTranslations[idx]])
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(smoothProgress, [0.15, 0.65], ["0%", yTranslations[idx]])

            const Icon = item.icon
            const categoryUrl = `/study-hub/${item.slug}`

            return (
              <motion.div
                key={item.slug}
                style={shouldReduceMotion ? {} : { rotate, x, y, originY: "120%", zIndex: idx }}
                whileHover={shouldReduceMotion ? {} : { 
                  y: -40, 
                  scale: 1.05, 
                  zIndex: 50,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={cn(
                  "absolute inset-0 rounded-[2rem] overflow-hidden group cursor-pointer flex flex-col justify-between p-8 transition-colors will-change-transform backdrop-blur-md",
                  "bg-night-900 border border-white/10 shadow-2xl",
                  item.colorClass
                )}
              >
                {/* 3D Glass Light reflection (top edge) */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
                
                <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
                  <div>
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md border border-white/10 mb-6 shadow-xl relative overflow-hidden">
                      {/* Icon subtle inner glow */}
                      <div className="absolute inset-0 bg-white/10" />
                      <Icon className="w-7 h-7 text-white relative z-10" weight="duotone" />
                    </div>
                    <h3 className="text-2xl font-inter font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <Link href={categoryUrl} className="mt-8 flex items-center gap-2 text-white font-semibold group/link">
                    Explore resources 
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
