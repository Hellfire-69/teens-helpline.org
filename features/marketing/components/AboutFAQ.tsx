"use client"

import * as React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

const ABOUT_FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I begin using TeensHelpline?",
    answer:
      "You can click 'Continue Anonymously' to start using the platform right away without entering any personal info. If you want the system to remember your conversations, mood trends, and saved articles across devices, you can choose to register and sign in with your Email or Google account.",
  },
  {
    question: "Is my data secure? What do you store?",
    answer:
      "Privacy is our non-negotiable commit. For anonymous guests, we store absolutely no personal information, chat logs, or mood notes in our database. For logged-in users, your history is kept secure using Supabase Row-Level Security (RLS) so it's only readable by you. We never share or sell any conversation logs.",
  },
  {
    question: "What are the limits of confidentiality?",
    answer:
      "Conversations with Nova or peers are private. However, if a severe risk to life or self-harm is detected in text content, our safety layer immediately escalates by showing the crisis banner and direct helpline numbers. Additionally, all peer support chat logs are monitored by human moderators to prevent bullying and maintain a safe space.",
  },
  {
    question: "Is Nova a real person? What can Nova help with?",
    answer:
      "Nova is an AI companion, not a human and not a therapist. Nova acts as a supportive elder sibling, providing a warm and present sounding board. Nova is trained to help you plan your study sessions, deal with school stress, manage friendships, and discuss everyday worries. Nova never diagnoses conditions or discusses medical treatments.",
  },
  {
    question: "How does anonymous peer support work?",
    answer:
      "You are matched with a trained teenage volunteer. Chats are text-only, confidential, and monitored by moderators to make sure everyone stays safe. It's a space for listening and sharing experiences, not crisis intervention. You can exit the chat session or report content at any time.",
  },
  {
    question: "What happens if my connection drops?",
    answer:
      "For anonymous sessions, data is memory-only; a page refresh or connection drop will reset the conversation. Registered accounts have their chat history preserved. The crisis banner requires no data dependencies and remains functional even during server-side outages.",
  },
]

export function AboutFAQ() {
  return (
    <section
      aria-labelledby="about-faq-heading"
      className="w-full max-w-4xl mx-auto my-16 md:my-24 px-4"
    >
      <div className="rounded-[2.5rem] bg-white/80 dark:bg-night-900/60 backdrop-blur-xl border border-ink-900/10 dark:border-white/10 shadow-lg p-8 md:p-12">
        <h2
          id="about-faq-heading"
          className="font-fraunces text-3xl md:text-4xl font-semibold text-ink-900 dark:text-white text-center mb-8 tracking-tight"
        >
          Frequently Asked Questions
        </h2>

        <Accordion className="w-full">
          {ABOUT_FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`about-faq-${index}`}>
              <AccordionTrigger className="text-base md:text-lg font-medium text-ink-900 dark:text-white hover:text-aurora-sea dark:hover:text-aurora-sea py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-ink-600 dark:text-ink-300 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
