"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { BookOpen, Shield, ArrowRight, Check, Building, Lightbulb, Download } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

const SCHOOL_RESOURCES = [
  {
    category: "Classroom Strategies",
    items: [
      "Emotional check-in routines (2 min daily)",
      "Trauma-informed teaching practices",
      "Reducing academic pressure safely",
      "Creating psychologically safe classrooms",
    ],
    icon: BookOpen,
  },
  {
    category: "Early Warning Signs",
    items: [
      "Behavioral changes that signal distress",
      "Academic decline patterns to watch for",
      "Social withdrawal indicators",
      "Subtle cries for help in assignments",
    ],
    icon: Lightbulb,
  },
  {
    category: "Crisis Response",
    items: [
      "Step-by-step protocol for student crisis",
      "Coordinating with school counselors & admin",
      "Post-crisis support for the classroom",
      "When to involve professional emergency teams",
    ],
    icon: Shield,
  },
] as const

const SAFEGUARDING_PRINCIPLES = [
  "Student data is never shared with school staff — not mood, not chats, not peer sessions",
  "Teachers see only aggregate, anonymized trends (e.g., \"30% of students reported overwhelm this week\")",
  "No individual student tracking, profiling, or flagging — ever",
  "School dashboards are informational only: resources, guidance, referral pathways",
  "All educator resources are downloadable and usable offline — no platform dependency",
] as const

export function Schools() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-space-12 px-4 md:px-space-8 max-w-content mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-space-10">
        <span className="inline-block px-space-3 py-space-1.5 rounded-radius-full bg-aurora-sea/10 dark:bg-aurora-sea/20 text-aurora-sea text-type-label font-inter font-medium mb-space-4">
          For Schools
        </span>
        <h2 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white mb-space-3">
          Equipping educators to support student wellbeing
        </h2>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300 max-w-[50ch] mx-auto">
          Teachers are often the first to notice. We give you the resources and framework to respond — without ever accessing a specific student&apos;s private data.
        </p>
      </div>

      {/* Resource Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6 mb-space-10">
        {SCHOOL_RESOURCES.map((resource, index) => {
          const Icon = resource.icon
          return (
            <motion.article
              key={resource.category}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 200, damping: 26, delay: shouldReduceMotion ? 0 : index * 0.05 }}
              className="group p-space-6 bg-paper-100 dark:bg-night-900 rounded-radius-md border border-ink-300/20 dark:border-ink-600/20 hover:shadow-md transition-all duration-fast flex flex-col gap-space-4"
            >
              <div className="w-12 h-12 rounded-radius-md flex items-center justify-center bg-white dark:bg-night-950 border border-ink-300/10 dark:border-ink-600/10 text-aurora-sea">
                <Icon className="w-6 h-6" weight="duotone" />
              </div>
              <div>
                <h3 className="text-type-title-md font-inter font-semibold text-ink-900 dark:text-white mb-space-3 group-hover:text-aurora-sea transition-colors duration-fast">
                  {resource.category}
                </h3>
                <ul className="flex flex-col gap-space-2 text-type-body-sm text-ink-600 dark:text-ink-300">
                  {resource.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-space-2">
                      <Check className="w-4 h-4 text-aurora-sea shrink-0 mt-0.5" weight="bold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Safeguarding & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-6 relative z-10">
        {/* Left Column: Dashboard Preview */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          className="bg-paper-100 dark:bg-night-900 rounded-radius-lg p-space-6 md:p-space-8 border border-ink-300/20 dark:border-ink-600/20 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-space-4">
            <div className="flex items-center gap-space-2">
              <Building className="w-6 h-6 text-aurora-sea" weight="duotone" />
              <span className="text-type-label font-inter font-semibold text-aurora-sea uppercase tracking-wider">
                Teacher Dashboard (Coming Soon)
              </span>
            </div>

            <h3 className="text-type-title-lg font-fraunces font-semibold text-ink-900 dark:text-white">
              A dedicated space for educators — no student data, ever
            </h3>

            <p className="text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              The Teacher/Educator Dashboard is designed as a pure resource hub. It will never show individual student moods, chats, or peer sessions — by architectural design, not just policy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-2 mt-space-2 mb-space-6">
              {[
                "Classroom resources & lessons",
                "Safeguarding legal frameworks",
                "Crisis response pathways",
                "Professional dev webinars",
                "Parent communication scripts",
                "Anonymized wellbeing trends",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-space-2 text-type-body-sm text-ink-700 dark:text-ink-200">
                  <Download className="w-4 h-4 text-aurora-sea shrink-0" weight="duotone" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="secondary" size="md" asChild className="w-full sm:w-auto">
            <Link href="/schools" className="gap-space-2">
              <span>View School Resources</span>
              <ArrowRight className="w-4 h-4" weight="bold" />
            </Link>
          </Button>
        </motion.div>

        {/* Right Column: Safeguarding Promise */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 200, damping: 26, delay: shouldReduceMotion ? 0 : 0.05 }}
          className="bg-paper-100 dark:bg-night-900 rounded-radius-lg p-space-6 md:p-space-8 border border-ink-300/20 dark:border-ink-600/20 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-space-2 mb-space-4">
              <Shield className="w-6 h-6 text-signal-crisis" weight="duotone" />
              <span className="text-type-label font-inter font-semibold text-signal-crisis uppercase tracking-wider">
                Safeguarding Promise
              </span>
            </div>

            <h3 className="text-type-title-lg font-fraunces font-semibold text-ink-900 dark:text-white mb-space-4">
              Student privacy is not negotiable
            </h3>

            <ul className="flex flex-col gap-space-3 mb-space-6">
              {SAFEGUARDING_PRINCIPLES.map((principle, i) => (
                <li key={i} className="flex items-start gap-space-3 text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                  <Check className="w-4 h-4 text-signal-crisis shrink-0 mt-1" weight="bold" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-space-4 bg-white/50 dark:bg-night-950/50 rounded-radius-md border border-signal-crisis/20 dark:border-signal-crisis/30">
            <p className="text-[11px] font-inter text-ink-600 dark:text-ink-300 leading-normal">
              <strong>Prototype note:</strong> Teacher dashboards, school verification, and district wellbeing metrics are Coming Soon. Current school resources are accessible without login or platform tracking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
