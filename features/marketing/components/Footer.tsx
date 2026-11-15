"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, ShieldWarning } from "@phosphor-icons/react"

const EXPLORE_LINKS = [
  { href: "/get-help", label: "Get Help Resources" },
  { href: "/study-hub", label: "Study Hub / Self-Help" },
  { href: "/peer-support", label: "Peer Support Portal" },
  { href: "/parents", label: "For Parents" },
  { href: "/schools", label: "For Schools" },
  { href: "/about", label: "About Us" },
]

const POLICY_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
]

const CRISIS_LINKS = [
  { href: "/crisis-info", label: "Crisis Support Info" },
  { href: "/contact", label: "Contact Us" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      aria-label="Site Footer"
      className="relative w-full mt-auto border-t border-ink-900/10 dark:border-white/10 bg-paper-50/90 dark:bg-night-950/90 backdrop-blur-xl text-ink-900 dark:text-white pt-16 md:pt-20 pb-36 md:pb-28 px-4 md:px-8 overflow-hidden transition-colors duration-200"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14">
        {/* Brand column */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
            aria-label="TeensHelpline Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-aurora-dusk to-aurora-sea flex items-center justify-center text-white text-xs font-bold shadow-sm">
              TH
            </div>
            <span className="font-fraunces text-2xl font-semibold text-ink-900 dark:text-white tracking-tight">
              TeensHelpline
            </span>
          </Link>
          <p className="text-sm text-ink-600 dark:text-ink-300 max-w-[30ch] leading-relaxed">
            A safe, privacy-first emotional support space for Indian teenagers (13–19) to breathe and find their next step.
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm text-ink-500 dark:text-ink-400 font-medium">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-aurora-blush" weight="fill" aria-hidden="true" />
            <span>in India</span>
          </div>
        </div>

        {/* Explore Links */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h4 className="text-xs uppercase font-bold tracking-widest text-ink-900/80 dark:text-white/80">
            Explore
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink-600 dark:text-ink-300 hover:text-aurora-sea dark:hover:text-aurora-sea transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Policies */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="text-xs uppercase font-bold tracking-widest text-ink-900/80 dark:text-white/80">
            Legal &amp; Trust
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink-600 dark:text-ink-300 hover:text-aurora-sea dark:hover:text-aurora-sea transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Crisis & Contact */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="text-xs uppercase font-bold tracking-widest flex items-center gap-2 text-ink-900/80 dark:text-white/80">
            <ShieldWarning className="w-4 h-4 text-signal-crisis" weight="duotone" aria-hidden="true" />
            <span>Crisis &amp; Contact</span>
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium mb-1">
            {CRISIS_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink-600 dark:text-ink-300 hover:text-signal-crisis dark:hover:text-signal-crisis transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-sm inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-3.5 bg-paper-100 dark:bg-night-900/70 backdrop-blur-md rounded-2xl border border-ink-900/10 dark:border-white/10 text-xs text-ink-600 dark:text-ink-300 leading-relaxed shadow-sm">
            <strong className="text-ink-900 dark:text-white font-semibold">Disclaimer:</strong> TeensHelpline is not a clinical mental health clinic or suicide prevention line. If you are experiencing a life-threatening crisis, please contact local emergency services immediately.
          </div>
        </div>
      </div>

      {/* Very large wordmark fading to transparent with CSS mask */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden text-center mt-12 mb-4 pointer-events-none select-none"
        style={{
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.85) 15%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.85) 15%, transparent 95%)",
        }}
      >
        <span
          className="font-fraunces font-bold text-ink-900/20 dark:text-white/20 tracking-tighter whitespace-nowrap inline-block leading-none"
          style={{
            fontSize: "clamp(2.35rem, 11.2vw, 11rem)",
          }}
        >
          TeensHelpline
        </span>
      </div>

      {/* Thin divider line */}
      <div className="w-full border-t border-ink-900/10 dark:border-white/10 mb-6" aria-hidden="true" />

      {/* Bottom bar with Quick Exit safe padding */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs md:text-sm text-ink-500 dark:text-ink-400 font-medium md:pr-36">
        <span>&copy; {currentYear} TeensHelpline.org. All rights reserved.</span>
        <div className="flex flex-wrap gap-3 items-center">
          <span>Prototype Version 2.0</span>
          <span className="px-2.5 py-1 bg-aurora-sea/10 dark:bg-aurora-sea/20 text-aurora-sea border border-aurora-sea/20 rounded-full text-xs font-bold tracking-wide">
            -- PROTOTYPE: simulated
          </span>
        </div>
      </div>
    </footer>
  )
}
