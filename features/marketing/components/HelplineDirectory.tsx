"use client"

import * as React from "react"
import {
  Phone,
  WhatsappLogo,
  Copy,
  Check,
  CaretDown,
  ArrowSquareOut,
  ShieldCheck,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export interface HelplineItem {
  id: string
  name: string
  subtitle: string
  number: string
  rawNumber: string
  authority: string
  availability: string
  is24x7: boolean
  isTollFree: boolean
  hasWhatsApp?: boolean
  whatsAppNumber?: string
  whatsAppLink?: string
  description: string
  eligibility: string
  channels: string[]
  languages: string
  officialUrl: string
  category: "emergency" | "youth" | "mental-health" | "counselling"
}

export const VERIFIED_HELPLINES: HelplineItem[] = [
  {
    id: "erss-112",
    name: "National Emergency (ERSS 112)",
    subtitle: "Police, Medical & Fire",
    number: "112",
    rawNumber: "112",
    authority: "Ministry of Home Affairs (MHA), Government of India",
    availability: "24/7 • 100% Toll-free",
    is24x7: true,
    isTollFree: true,
    description: "Immediate police, medical, or fire emergency response across India.",
    eligibility: "Anyone in India facing an immediate physical safety or medical emergency",
    channels: ["Voice Call (112)", "112 India Mobile App", "SMS", "SOS triggers"],
    languages: "All official Indian languages via regional emergency response centres",
    officialUrl: "https://112.gov.in",
    category: "emergency",
  },
  {
    id: "childline-1098",
    name: "Child Helpline 1098 (Mission Vatsalya)",
    subtitle: "Youth & Child Protection",
    number: "1098",
    rawNumber: "1098",
    authority: "Ministry of Women and Child Development (MWCD), Government of India",
    availability: "24/7 • 100% Toll-free",
    is24x7: true,
    isTollFree: true,
    description: "Support for children and teenagers who need protection, care, or immediate assistance.",
    eligibility: "Children and teenagers under 18, or anyone calling on their behalf",
    channels: ["Voice Call (1098)", "Integrated with ERSS-112"],
    languages: "Pan-India regional language coverage",
    officialUrl: "https://wcd.gov.in",
    category: "youth",
  },
  {
    id: "telemanas-14416",
    name: "Tele-MANAS",
    subtitle: "National Mental Health Programme",
    number: "14416 / 1800-891-4416",
    rawNumber: "14416",
    authority: "Ministry of Health and Family Welfare (MoHFW) & NIMHANS",
    availability: "24/7 • 100% Toll-free",
    is24x7: true,
    isTollFree: true,
    description: "Talk to someone when things feel overwhelming. Free mental health support around the clock.",
    eligibility: "Anyone experiencing mental health distress, anxiety, panic, depression, or suicidal ideation",
    channels: ["Voice Call (14416 / 1800-891-4416)"],
    languages: "20+ regional Indian languages across state cells",
    officialUrl: "https://telemanas.mohfw.gov.in",
    category: "mental-health",
  },
  {
    id: "kiran-18005990019",
    name: "KIRAN Helpline",
    subtitle: "Integrated with Tele-MANAS",
    number: "1800-599-0019",
    rawNumber: "18005990019",
    authority: "Ministry of Social Justice & Empowerment (DEPwD), routed via Tele-MANAS network",
    availability: "24/7 • 100% Toll-free",
    is24x7: true,
    isTollFree: true,
    description: "Free mental health rehabilitation and psychological first aid, integrated into Tele-MANAS.",
    eligibility: "Individuals experiencing psychological distress, adjustment issues, or panic",
    channels: ["Voice Call (1800-599-0019)"],
    languages: "13 regional Indian languages",
    officialUrl: "https://pib.gov.in",
    category: "mental-health",
  },
  {
    id: "vandrevala-foundation",
    name: "Vandrevala Foundation",
    subtitle: "Call & WhatsApp Support",
    number: "+91 9999 666 555",
    rawNumber: "919999666555",
    authority: "Cyrus & Priya Vandrevala Foundation (Non-profit NGO)",
    availability: "24/7 • Free counselling",
    is24x7: true,
    isTollFree: false, // Mobile line: free counselling, standard carrier airtime applies; free on WhatsApp
    hasWhatsApp: true,
    whatsAppNumber: "+91 9999 666 555",
    whatsAppLink: "https://wa.me/919999666555?text=Hello%2C%20I%20am%20reaching%20out%20for%20mental%20health%20support",
    description: "Confidential 24/7 crisis counselling available by phone call or WhatsApp message.",
    eligibility: "Anyone seeking emotional support, dealing with depression, anxiety, or crisis",
    channels: ["Voice Call (+91 9999 666 555)", "WhatsApp Chat", "Email (help@vandrevalafoundation.com)"],
    languages: "English, Hindi, and regional languages",
    officialUrl: "https://www.vandrevalafoundation.com",
    category: "counselling",
  },
  {
    id: "icall-tiss",
    name: "iCALL Psychosocial Helpline",
    subtitle: "TISS Mumbai",
    number: "9152987821",
    rawNumber: "9152987821",
    authority: "Tata Institute of Social Sciences (TISS)",
    availability: "Mon-Sat, 10am-8pm • Free counselling",
    is24x7: false,
    isTollFree: false, // Standard carrier call rate applies; counselling is free of charge
    description: "Free, professional psychosocial counselling with qualified counsellors from TISS Mumbai.",
    eligibility: "Individuals, adolescents, and youth dealing with psychosocial, relationship, or emotional distress",
    channels: ["Telephone (9152987821 / 022-25521111)", "Email (icall@tiss.edu)"],
    languages: "English, Hindi, Marathi, and other regional languages",
    officialUrl: "https://icallhelpline.org",
    category: "counselling",
  },
]

export function HelplineDirectory() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleCopy = async (id: string, textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = textToCopy
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const emergencyServices = VERIFIED_HELPLINES.filter(
    (h) => h.category === "emergency" || h.category === "youth"
  )
  const mentalHealthServices = VERIFIED_HELPLINES.filter(
    (h) => h.category === "mental-health" || h.category === "counselling"
  )

  return (
    <div className="w-full space-y-16">
      {/* ─── 1. COMPACT IMMEDIATE EMERGENCY SPOTLIGHT ─── */}
      <section
        id="emergency-triage"
        aria-labelledby="emergency-heading"
        className="scroll-mt-24 rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-paper-100/70 dark:bg-night-900/60 border border-ink-900/10 dark:border-white/10"
      >
        <div className="mb-6">
          <span className="text-sm font-semibold text-aurora-sea dark:text-aurora-sea block mb-1">
            Immediate Physical Danger
          </span>
          <h2
            id="emergency-heading"
            className="font-fraunces text-2xl sm:text-3xl font-semibold text-ink-900 dark:text-white"
          >
            Immediate Emergency Services
          </h2>
          <p className="text-sm text-ink-600 dark:text-ink-300 mt-1">
            Immediate support available 24 hours a day, 7 days a week across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-ink-900/10 dark:divide-white/10">
          {emergencyServices.map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between ${idx > 0 ? "pt-6 md:pt-0 md:pl-10" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold text-ink-700 dark:text-ink-300">
                    {item.name}
                  </span>
                  <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-paper-200 dark:bg-night-800 text-ink-800 dark:text-ink-200 border border-ink-900/10 dark:border-white/10">
                    24/7 • Toll-Free
                  </span>
                </div>

                <div className="font-fraunces text-4xl sm:text-5xl font-bold tracking-tight text-ink-900 dark:text-white mb-2">
                  {item.number}
                </div>

                <p className="font-sans text-sm text-ink-700 dark:text-ink-300 leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Button
                    asChild
                    className="flex-1 rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 min-h-[44px] px-6 text-sm font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
                  >
                    <a
                      href={`tel:${item.rawNumber}`}
                      aria-label={`Dial ${item.name} at ${item.number}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 shrink-0" weight="fill" aria-hidden="true" />
                      <span>Call {item.number}</span>
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleCopy(item.id, item.rawNumber)}
                    aria-label={`Copy phone number ${item.number}`}
                    className="rounded-full min-h-[44px] px-3.5 border border-ink-900/10 dark:border-white/10 text-ink-800 dark:text-white text-sm font-medium"
                  >
                    {copiedId === item.id ? (
                      <span className="inline-flex items-center gap-1 text-aurora-sea font-semibold">
                        <Check className="w-3.5 h-3.5" weight="bold" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </span>
                    )}
                  </Button>
                </div>

                {/* Quiet Expandable Secondary Details */}
                <details className="group text-sm text-ink-600 dark:text-ink-400">
                  <summary className="cursor-pointer select-none font-medium hover:text-ink-900 dark:hover:text-white inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurora-sea rounded py-1">
                    <span>Service scope &amp; channels</span>
                    <CaretDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pt-2 pb-1 space-y-1.5 pl-2 border-l border-ink-900/10 dark:border-white/10 mt-1">
                    <p>
                      <strong className="text-ink-800 dark:text-ink-200">Authority:</strong> {item.authority}
                    </p>
                    <p>
                      <strong className="text-ink-800 dark:text-ink-200">Who can reach out:</strong> {item.eligibility}
                    </p>
                    <p>
                      <strong className="text-ink-800 dark:text-ink-200">Channels:</strong> {item.channels.join(", ")}
                    </p>
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-aurora-sea hover:underline pt-0.5"
                    >
                      <span>Official government portal</span>
                      <ArrowSquareOut className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 2. EDITORIAL MENTAL HEALTH & COUNSELLING DIRECTORY ─── */}
      <section
        id="mental-health-directory"
        aria-labelledby="mental-health-heading"
        className="scroll-mt-24"
      >
        <div className="mb-8">
          <span className="text-sm font-semibold text-aurora-sea dark:text-aurora-sea block mb-1">
            Free &amp; Confidential
          </span>
          <h2
            id="mental-health-heading"
            className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-semibold text-ink-900 dark:text-white mb-2"
          >
            Talk with someone who can help
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-700 dark:text-ink-300 max-w-2xl">
            Free emotional support and crisis counselling from national and non-profit organisations. Take things at your own pace.
          </p>
        </div>

        {/* Quiet, hairline-divided vertical editorial list */}
        <div className="divide-y divide-ink-900/10 dark:divide-white/10">
          {mentalHealthServices.map((item) => (
            <article
              key={item.id}
              className="py-8 sm:py-9 first:pt-2 last:pb-2 flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Left Column: Name, Number, Single-Line Description */}
              <div className="flex-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <h3 className="font-inter font-bold text-base sm:text-lg text-ink-900 dark:text-white">
                    {item.name}
                  </h3>
                  <span className="text-sm font-medium text-ink-600 dark:text-ink-400">
                    {item.availability}
                  </span>
                  {item.hasWhatsApp && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-800 dark:text-ink-200 px-2.5 py-0.5 rounded-full bg-paper-200 dark:bg-night-800 border border-ink-900/10 dark:border-white/10">
                      <WhatsappLogo className="w-3.5 h-3.5 text-ink-700 dark:text-ink-300" weight="fill" />
                      <span>WhatsApp Available</span>
                    </span>
                  )}
                </div>

                {/* Big Editorial Fraunces Number */}
                <div className="font-fraunces text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 dark:text-white mb-2">
                  {item.number}
                </div>

                {/* Single Concise Human Sentence */}
                <p className="font-sans text-sm sm:text-base text-ink-700 dark:text-ink-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Accessible Expandable Details (Disclosure) */}
                <details className="group text-sm text-ink-600 dark:text-ink-400">
                  <summary className="cursor-pointer select-none font-medium hover:text-ink-900 dark:hover:text-white inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurora-sea rounded py-1">
                    <span>Details &amp; languages</span>
                    <CaretDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pt-2.5 pb-1 space-y-1.5 pl-3 border-l border-ink-900/10 dark:border-white/10 mt-1">
                    <p>
                      <strong className="text-ink-800 dark:text-ink-200">Operated by:</strong> {item.authority}
                    </p>
                    <p>
                      <strong className="text-ink-800 dark:text-ink-200">Languages:</strong> {item.languages}
                    </p>
                    <p>
                      <strong className="text-ink-800 dark:text-ink-200">Call charges:</strong>{" "}
                      {item.isTollFree
                        ? "100% Toll-free from any phone"
                        : "Counselling is completely free; standard local carrier airtime applies for calls."}
                    </p>
                    <div className="pt-1 flex items-center gap-4">
                      <a
                        href={item.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-aurora-sea hover:underline"
                      >
                        <span>Official source</span>
                        <ArrowSquareOut className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </details>
              </div>

              {/* Right Column: Obvious Primary Action + Optional WhatsApp / Copy */}
              <div className="flex flex-row md:flex-col items-center md:items-stretch gap-2.5 shrink-0 sm:w-auto md:w-44 pt-1">
                {/* Primary Call Action */}
                <Button
                  asChild
                  className="flex-1 md:flex-none rounded-full bg-ink-900 hover:bg-ink-800 text-white dark:bg-white dark:text-ink-900 dark:hover:bg-paper-100 min-h-[44px] px-6 text-sm font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
                >
                  <a
                    href={`tel:${item.rawNumber}`}
                    aria-label={`Call ${item.name} at ${item.number}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 shrink-0" weight="fill" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                </Button>

                {/* Optional WhatsApp Button (Vandrevala Foundation) — solid ink-900 or outline ink tokens */}
                {item.hasWhatsApp && item.whatsAppLink && (
                  <Button
                    asChild
                    variant="secondary"
                    className="flex-1 md:flex-none rounded-full min-h-[44px] px-5 border border-ink-900/20 dark:border-white/20 text-ink-900 dark:text-white hover:bg-paper-100 dark:hover:bg-night-800 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
                  >
                    <a
                      href={item.whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chat on WhatsApp with ${item.name}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <WhatsappLogo className="w-4 h-4 shrink-0 text-ink-900 dark:text-white" weight="fill" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </Button>
                )}

                {/* Compact Copy Number Action */}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleCopy(item.id, item.rawNumber)}
                  aria-label={`Copy phone number ${item.number}`}
                  className="rounded-full min-h-[38px] px-3 text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white text-sm font-medium"
                >
                  {copiedId === item.id ? (
                    <span className="inline-flex items-center gap-1.5 text-aurora-sea font-semibold">
                      <Check className="w-3.5 h-3.5" weight="bold" />
                      <span>Copied</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Number</span>
                    </span>
                  )}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Quiet Footnote on Cost & Anonymity */}
        <div className="mt-8 pt-6 border-t border-ink-900/10 dark:border-white/10 flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-aurora-sea shrink-0 mt-0.5" weight="fill" aria-hidden="true" />
          <p>
            Helpline counselling is provided at no charge. Numbers starting with 1800, 1098, 14416, and 112 are toll-free. Standard mobile lines incur standard local telecom airtime rates.
          </p>
        </div>
      </section>
    </div>
  )
}
