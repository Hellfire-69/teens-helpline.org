"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ShieldCheck, Users } from "@phosphor-icons/react"

export function Trust() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="pt-8 pb-16 px-4 md:px-8 max-w-content mx-auto w-full -mt-8 relative z-10">
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.1 }}
        className="relative bg-white/5 dark:bg-night-950/40 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-8 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        {/* Color fade-in vibe */}
        <div className="absolute inset-0 bg-gradient-to-r from-aurora-sea/15 via-transparent to-aurora-blush/15 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          
          {/* Item 1 */}
          <div className="flex items-center gap-5 w-full md:w-auto justify-center px-6 py-4 hover:bg-white/10 dark:hover:bg-white/5 rounded-3xl transition-colors cursor-default">
            <div className="w-14 h-14 rounded-full bg-aurora-sea/10 flex items-center justify-center text-aurora-sea shrink-0 shadow-inner">
              <ShieldCheck className="w-7 h-7" weight="duotone" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-fraunces font-semibold text-xl text-ink-900 dark:text-white mb-1">Privacy First</span>
              <span className="text-sm font-medium text-ink-600 dark:text-ink-400">100% Anonymous & Zero Logs</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-ink-900/10 dark:bg-white/10" />

          {/* Item 2 */}
          <div className="flex items-center gap-5 w-full md:w-auto justify-center px-6 py-4 hover:bg-white/10 dark:hover:bg-white/5 rounded-3xl transition-colors cursor-default">
            <div className="w-14 h-14 rounded-full bg-aurora-blush/10 flex items-center justify-center text-aurora-blush shrink-0 shadow-inner">
              <Users className="w-7 h-7" weight="duotone" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-fraunces font-semibold text-xl text-ink-900 dark:text-white mb-1">Moderated Community</span>
              <span className="text-sm font-medium text-ink-600 dark:text-ink-400">Safe, trained teen support</span>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
