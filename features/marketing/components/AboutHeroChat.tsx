// Adapted from Cairn Agents Landing (MIT, by Kedhareswer Naidu)
"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Sparkle, User } from "@phosphor-icons/react"

export function AboutHeroChat() {
  const shouldReduceMotion = useReducedMotion()
  const [isTyping, setIsTyping] = React.useState(!shouldReduceMotion)

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setIsTyping(false)
      return
    }

    const timer = setTimeout(() => {
      setIsTyping(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [shouldReduceMotion])

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-paper-50/95 dark:bg-night-900/95 border border-ink-900/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 text-left transition-colors">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-ink-900/10 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-aurora-sea/15 dark:bg-aurora-sea/25 text-aurora-sea flex items-center justify-center">
            <Sparkle className="w-4 h-4" weight="fill" />
          </div>
          <div>
            <span className="text-sm font-semibold text-ink-900 dark:text-white block leading-none">
              Nova
            </span>
            <span className="text-xs text-ink-500 dark:text-ink-400">
              AI Companion
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-ink-900/5 dark:bg-white/10 text-ink-600 dark:text-ink-300 border border-ink-900/10 dark:border-white/10">
          Example conversation
        </span>
      </div>

      {/* Messages thread */}
      <div className="flex flex-col gap-4">
        {/* User bubble */}
        <div className="self-end max-w-[85%] sm:max-w-[80%] rounded-2xl rounded-tr-sm bg-ink-900/5 dark:bg-white/10 border border-ink-900/10 dark:border-white/10 p-4 md:p-5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <User className="w-3.5 h-3.5 text-ink-500 dark:text-ink-400" weight="bold" />
            <span className="text-xs font-semibold text-ink-500 dark:text-ink-400 uppercase tracking-wider">
              You
            </span>
          </div>
          <p className="text-lg text-ink-900 dark:text-white font-normal leading-relaxed">
            I&apos;m just feeling so overwhelmed with everything today...
          </p>
        </div>

        {/* Nova bubble with typing -> reply morph */}
        <motion.div
          layout
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="self-start max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tl-sm bg-aurora-sea/10 dark:bg-aurora-sea/20 border border-aurora-sea/30 p-4 md:p-5 text-ink-900 dark:text-white"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkle className="w-3.5 h-3.5 text-aurora-sea" weight="fill" />
            <span className="text-xs font-semibold text-aurora-sea uppercase tracking-wider">
              Nova
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                key="typing-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 py-2 px-1"
                aria-label="Nova is typing an example response"
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                  className="w-2.5 h-2.5 rounded-full bg-aurora-sea"
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                  className="w-2.5 h-2.5 rounded-full bg-aurora-sea"
                />
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
                  className="w-2.5 h-2.5 rounded-full bg-aurora-sea"
                />
              </motion.div>
            ) : (
              <motion.p
                key="nova-reply"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-lg text-ink-900 dark:text-white font-normal leading-relaxed"
              >
                I hear you. It&apos;s completely okay to feel that way. Let&apos;s take a deep breath together. What&apos;s weighing on you the most right now?
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
