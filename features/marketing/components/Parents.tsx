"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Lock, Shield, Heart, BookOpen, ArrowRight, User } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

const PARENT_RESOURCES = [
  {
    title: "Understanding Teen Mental Health",
    description: "Clear guides on anxiety, depression, academic stress, and identity — written for parents, not clinicians.",
    icon: BookOpen,
  },
  {
    title: "How to Start the Conversation",
    description: "Scripts and approaches for opening dialogue without pressure. What to say, what to avoid, when to listen.",
    icon: Heart,
  },
  {
    title: "Recognizing Warning Signs",
    description: "Subtle and overt indicators that your teen might need professional support. When to step in, when to step back.",
    icon: Shield,
  },
] as const

const CONFIDENTIALITY_POINTS = [
  { label: "Chat content", detail: "Never shared with parents — ever.", icon: Lock, status: "private" },
  { label: "Mood check-ins", detail: "Anonymous by default. Only visible to you if your teen chooses to share.", icon: Heart, status: "private" },
  { label: "Crisis escalation", detail: "You are notified ONLY if there's imminent danger to life.", icon: Shield, status: "conditional" },
  { label: "Professional booking", detail: "Requires your consent for teens under 18 (simulated in prototype).", icon: User, status: "consent" },
] as const

export function Parents() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-space-12 px-4 md:px-space-8 max-w-content mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-space-10">
        <span className="inline-block px-space-3 py-space-1.5 rounded-radius-full bg-aurora-dusk/10 dark:bg-aurora-dusk/20 text-aurora-dusk text-type-label font-inter font-medium mb-space-4">
          For Parents
        </span>
        <h2 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white mb-space-3">
          Supporting your teen, respecting their privacy
        </h2>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300 max-w-[50ch] mx-auto">
          You don&apos;t need access to their private chat to be a great support. We give you the resources and guidance to help, without violating their trust.
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6 mb-space-10">
        {PARENT_RESOURCES.map((resource, index) => {
          const Icon = resource.icon
          return (
            <motion.article
              key={resource.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 200, damping: 26, delay: shouldReduceMotion ? 0 : index * 0.05 }}
              className="group p-space-6 bg-paper-100 dark:bg-night-900 rounded-radius-md border border-ink-300/20 dark:border-ink-600/20 hover:shadow-md transition-all duration-fast flex flex-col gap-space-4"
            >
              <div className="w-12 h-12 rounded-radius-md flex items-center justify-center bg-white dark:bg-night-950 border border-ink-300/10 dark:border-ink-600/10 text-aurora-dusk">
                <Icon className="w-6 h-6" weight="duotone" />
              </div>
              <div>
                <h3 className="text-type-title-md font-inter font-semibold text-ink-900 dark:text-white mb-space-2 group-hover:text-aurora-dusk transition-colors duration-fast">
                  {resource.title}
                </h3>
                <p className="text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Confidentiality Block */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="bg-paper-100 dark:bg-night-900 rounded-radius-lg p-space-6 md:p-space-8 border border-ink-300/20 dark:border-ink-600/20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-space-2 mb-space-4">
            <Lock className="w-6 h-6 text-aurora-dusk" weight="duotone" />
            <span className="text-type-label font-inter font-semibold text-aurora-dusk uppercase tracking-wider">
              Confidentiality Made Clear
            </span>
          </div>

          <h3 className="text-type-title-lg font-fraunces font-semibold text-ink-900 dark:text-white mb-space-6 text-center">
            What stays private, what doesn&apos;t, and why
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-4 mb-space-8">
            {CONFIDENTIALITY_POINTS.map((point) => {
              const Icon = point.icon
              return (
                <div
                  key={point.label}
                  className="p-space-4 rounded-radius-md border bg-white dark:bg-night-950 border-ink-300/10 dark:border-white/5 shadow-sm"
                >
                  <div className="flex items-start gap-space-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-radius-md flex items-center justify-center bg-aurora-dusk/10 text-aurora-dusk">
                      <Icon className="w-4 h-4" weight="duotone" />
                    </div>
                    <div>
                      <h4 className="text-type-body-sm font-inter font-semibold text-ink-900 dark:text-white">
                        {point.label}
                      </h4>
                      <p className="text-[11px] font-inter text-ink-600 dark:text-ink-400 mt-0.5 leading-snug">
                        {point.detail}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-space-6 border-t border-ink-300/20 dark:border-ink-600/20 flex flex-col items-center gap-space-4 text-center">
            <p className="text-type-body-md text-ink-600 dark:text-ink-300 max-w-[55ch]">
              Your teen&apos;s trust is the foundation of their safety. We protect it so you can support them without creating distance.
            </p>
            <Button variant="secondary" size="md" asChild>
              <Link href="/parents" className="gap-space-2">
                <span>Explore Parent Resources</span>
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
