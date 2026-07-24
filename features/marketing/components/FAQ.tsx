"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { CaretDown, Question } from "@phosphor-icons/react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQGroup {
  category: string
  items: FAQItem[]
}

const FAQ_DATA: FAQGroup[] = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I begin using TeensHelpline?",
        answer: "You can click 'Continue Anonymously' to start using the platform right away without entering any personal info. If you want the system to remember your conversations, mood trends, and saved articles across devices, you can choose to register and sign in with your Email or Google account."
      }
    ]
  },
  {
    category: "Privacy & Safety",
    items: [
      {
        question: "Is my data secure? What do you store?",
        answer: "Privacy is our non-negotiable commit. For anonymous guests, we store absolutely no personal information, chat logs, or mood notes in our database. For logged-in users, your history is kept secure using Supabase Row-Level Security (RLS) so it's only readable by you. We never share or sell any conversation logs."
      },
      {
        question: "What are the limits of confidentiality?",
        answer: "Conversations with Nova or peers are private. However, if a severe risk to life or self-harm is detected in text content, our safety layer immediately escalates by showing the crisis banner and direct helpline numbers. Additionally, all peer support chat logs are monitored by human moderators to prevent bullying and maintain a safe space."
      }
    ]
  },
  {
    category: "About Nova & Features",
    items: [
      {
        question: "Is Nova a real person? What can Nova help with?",
        answer: "Nova is an AI companion, not a human and not a therapist. Nova acts as a supportive elder sibling, providing a warm and present sounding board. Nova is trained to help you plan your study sessions, deal with school stress, manage friendships, and discuss everyday worries. Nova never diagnoses conditions or discusses medical treatments."
      }
    ]
  },
  {
    category: "Peer Support",
    items: [
      {
        question: "How does anonymous peer support work?",
        answer: "You are matched with a trained teenage volunteer. Chats are text-only, confidential, and monitored by moderators to make sure everyone stays safe. It's a space for listening and sharing experiences, not crisis intervention. You can exit the chat session or report content at any time."
      }
    ]
  },
  {
    category: "Technical",
    items: [
      {
        question: "What happens if my connection drops?",
        answer: "For anonymous sessions, data is memory-only; a page refresh or connection drop will reset the conversation. Registered accounts have their chat history preserved. The crisis banner requires no data dependencies and remains functional even during server-side outages."
      }
    ]
  }
]

export function FAQ() {
  const shouldReduceMotion = useReducedMotion()
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const toggleItem = (id: string) => {
    setActiveId(prev => (prev === id ? null : id))
  }

  return (
    <section className="py-space-12 px-4 md:px-space-8 max-w-content mx-auto w-full">
      <div className="text-center mb-space-10">
        <span className="text-type-label text-aurora-sea tracking-wider uppercase mb-space-2 block">
          Support
        </span>
        <h2 className="font-fraunces text-type-title-xl font-semibold text-ink-900 dark:text-white mb-space-3">
          Frequently Asked Questions
        </h2>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300 max-w-lg mx-auto">
          Clear answers about confidentiality, how Nova works, and getting started on the platform.
        </p>
      </div>

      <div className="flex flex-col gap-space-8 max-w-3xl mx-auto">
        {FAQ_DATA.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-space-3">
            {/* Category Header */}
            <h3 className="text-type-title-md font-inter font-semibold text-ink-900 dark:text-white border-b border-ink-900/10 dark:border-white/10 pb-space-2 mb-space-1">
              {group.category}
            </h3>

            {/* Accordion Group */}
            <div className="flex flex-col gap-space-3">
              {group.items.map((item, itemIdx) => {
                const itemId = `${groupIdx}-${itemIdx}`
                const isOpen = activeId === itemId

                return (
                  <div
                    key={itemId}
                    className="glass-subtle rounded-radius-md border border-white/10 dark:border-white/5 overflow-hidden shadow-sm transition-all duration-fast"
                  >
                    <button
                      onClick={() => toggleItem(itemId)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-space-4 md:p-space-5 text-left font-inter font-semibold text-type-body-md text-ink-900 dark:text-white hover:text-aurora-sea dark:hover:text-white transition-colors outline-none focus-visible:bg-ink-900/5 focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-inset"
                    >
                      <div className="flex items-center gap-space-3 pr-space-4">
                        <Question className="w-5 h-5 text-aurora-sea shrink-0" weight="duotone" />
                        <span>{item.question}</span>
                      </div>
                      <motion.div
                        animate={shouldReduceMotion ? {} : { rotate: isOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-ink-600 dark:text-ink-300 shrink-0"
                      >
                        <CaretDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                          animate={shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                          exit={shouldReduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="px-space-4 pb-space-4 md:px-space-5 md:pb-space-5 pt-0 text-type-body-sm text-ink-600 dark:text-ink-300 leading-relaxed max-w-[65ch]">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
