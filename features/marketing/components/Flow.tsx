"use client"

import * as React from "react"
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react"
import { DoorOpen, Smiley, Sparkle, ShieldWarning } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const FLOW_STEPS = [
  {
    icon: DoorOpen,
    color: "text-aurora-dusk bg-aurora-dusk/10 border-aurora-dusk/20",
    glow: "bg-aurora-dusk/20",
    title: "Enter Your Way",
    description: "Choose your path — continue anonymously or sign in with your email or Google account."
  },
  {
    icon: Smiley,
    color: "text-aurora-dawn bg-aurora-dawn/10 border-aurora-dawn/20",
    glow: "bg-aurora-dawn/20",
    title: "Quick Mood Check",
    description: "Briefly share your current mood and optionally note down what is on your mind."
  },
  {
    icon: Sparkle,
    color: "text-aurora-sea bg-aurora-sea/10 border-aurora-sea/20",
    glow: "bg-aurora-sea/20",
    title: "Get Personalized Help",
    description: "Unlock recommendations, customized Study Hub resources, or discuss with Nova."
  },
  {
    icon: ShieldWarning,
    color: "text-signal-crisis bg-signal-crisis/10 border-signal-crisis/20",
    glow: "bg-signal-crisis/20",
    title: "Crisis Help Always Visible",
    description: "Connect to live support instantly. The emergency resources are always one click away."
  }
]

export function Flow() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"]
  })

  // Smooth the scroll progress for drawing the line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section ref={containerRef} className="py-24 px-4 max-w-5xl mx-auto w-full relative">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="font-fraunces text-3xl md:text-5xl font-semibold text-ink-900 dark:text-white mb-4 tracking-tight">
          From 'I feel bad' to a next step
        </h2>
        <p className="text-lg text-ink-600 dark:text-ink-300 max-w-2xl mx-auto">
          A seamless flow designed to reduce friction and help you regulate, reflect, and find support safely.
        </p>
      </div>

      <div className="relative">
        {/* Animated Connecting Wave (Vertical DNA-like) */}
        {!shouldReduceMotion && (
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-8 md:-ml-4 flex justify-center -z-10 overflow-hidden pointer-events-none">
            <svg width="24" height="100%" viewBox="0 0 24 1000" preserveAspectRatio="none" className="overflow-visible">
              <defs>
                <linearGradient id="flow-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="33%" stopColor="#f97316" />
                  <stop offset="66%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              
              {/* Background Track Line */}
              <path
                d="M12,0 C36,166 -12,333 12,500 C36,666 -12,833 12,1000"
                fill="transparent"
                stroke="currentColor"
                className="text-ink-900/10 dark:text-white/10"
                strokeWidth="2"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Animated Foreground Line */}
              <motion.path
                d="M12,0 C36,166 -12,333 12,500 C36,666 -12,833 12,1000"
                fill="transparent"
                stroke="url(#flow-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>
        )}

        <div className="flex flex-col gap-12 md:gap-24 relative">
          {FLOW_STEPS.map((step, idx) => {
            const Icon = step.icon
            const isEven = idx % 2 === 0
            return (
              <div key={idx} className={cn(
                "relative flex items-center md:justify-between",
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              )}>
                {/* Number Badge (Center) */}
                <div className="absolute left-6 md:left-1/2 -ml-5 md:-ml-6 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white/50 dark:border-white/10 bg-white dark:bg-night-900 flex items-center justify-center font-fraunces font-bold text-ink-900 dark:text-white shadow-xl z-10 group transition-transform duration-500 hover:scale-110">
                  0{idx + 1}
                </div>

                {/* Spacer for the other side on Desktop */}
                <div className="hidden md:block w-1/2" />

                {/* The Card */}
                <div className={cn(
                  "w-full pl-20 md:pl-0 md:w-1/2",
                  isEven ? "md:pr-16" : "md:pl-16"
                )}>
                  <motion.div
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: isEven ? -20 : 20, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, delay: shouldReduceMotion ? 0 : 0.1 }}
                    className="relative bg-white/40 dark:bg-night-900/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/60 dark:border-white/10 shadow-lg group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-white/80 dark:hover:border-white/20 hover:bg-white/60 dark:hover:bg-night-800/60 transition-all duration-500 overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10", step.glow)} />

                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner border transition-transform duration-500 group-hover:scale-110", step.color)}>
                      <Icon className="w-7 h-7" weight="duotone" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-fraunces font-semibold text-ink-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-ink-600 dark:text-ink-300 leading-relaxed max-w-[30ch]">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
