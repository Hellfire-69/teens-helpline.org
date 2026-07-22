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
    <footer className="relative pt-32 pb-32 lg:pb-16 px-4 md:px-8 w-full mt-auto overflow-hidden bg-night-950 text-white">
      
      {/* Seamless White to Dark Blend */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-paper-50 to-transparent z-10 pointer-events-none" />

      {/* Background Colormorphic Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex justify-between items-end">
        <div className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-aurora-sea/50 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-aurora-blush/40 blur-[100px] rounded-full translate-y-1/4 translate-x-1/4" />
      </div>

      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 z-0 bg-night-950/60 backdrop-blur-[80px]" />
      
      {/* Top Border Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
        {/* Brand column */}
        <div className="md:col-span-4 flex flex-col items-start gap-5">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
            aria-label="TeensHelpline Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-aurora-dusk to-aurora-sea flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-aurora-sea/20">
              TH
            </div>
            <span className="font-fraunces text-2xl font-semibold text-white tracking-tight">
              TeensHelpline
            </span>
          </Link>
          <p className="text-sm text-ink-300 max-w-[28ch] leading-relaxed">
            A safe, privacy-first emotional support space for Indian teenagers (13–19) to breathe and find their next step.
          </p>
          <div className="flex items-center gap-2 text-sm text-ink-300 font-medium">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-aurora-blush" weight="fill" />
            <span>in India</span>
          </div>
        </div>

        {/* Explore Links */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs text-white uppercase font-bold tracking-widest opacity-80">
            Explore
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-ink-300 font-medium">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-aurora-sea hover:translate-x-1 transition-all duration-200 inline-block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Policies */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs text-white uppercase font-bold tracking-widest opacity-80">
            Legal & Trust
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-ink-300 font-medium">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-aurora-sea hover:translate-x-1 transition-all duration-200 inline-block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help & Contact */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs text-white uppercase font-bold tracking-widest flex items-center gap-2 opacity-80">
            <ShieldWarning className="w-4 h-4 text-signal-crisis" weight="duotone" />
            <span>Crisis & Contact</span>
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-ink-300 mb-2 font-medium">
            {CRISIS_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-signal-crisis hover:translate-x-1 transition-all duration-200 inline-block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4 bg-night-900/50 backdrop-blur-md rounded-2xl border border-white/10 text-xs text-ink-400 leading-relaxed shadow-sm">
            <strong className="text-white">Disclaimer:</strong> TeensHelpline is not a clinical mental health clinic or suicide prevention line. If you are experiencing a life-threatening crisis, please contact local emergency services immediately.
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-400 font-medium">
        <span>&copy; {currentYear} TeensHelpline.org. All rights reserved.</span>
        <div className="flex gap-4 items-center">
          <span>Prototype Version 2.0</span>
          <span className="px-3 py-1 bg-aurora-sea/10 text-aurora-sea rounded-full text-xs font-bold tracking-wide">-- PROTOTYPE: simulated</span>
        </div>
      </div>
    </footer>
  )
}
