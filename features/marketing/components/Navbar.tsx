"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import {
  House,
  BookOpen,
  UsersThree,
  User,
  Brain,
  Info,
  Warning,
  CaretDown,
  X,
  List
} from "@phosphor-icons/react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null)
  const [hoveredDropdownPath, setHoveredDropdownPath] = React.useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const handleOtherEnter = () => {
    setHoveredPath('other')
    setDropdownOpen(true)
  }

  const handleOtherLeave = () => {
    setDropdownOpen(false)
  }

  return (
    <>
      {/* ─── DESKTOP TOP BAR NAV (lg breakpoint and up) ─── */}
      <header className="hidden lg:block fixed top-14 left-1/2 -translate-x-1/2 z-50 w-max transition-all duration-300">
        <nav
          className="rounded-full bg-white/80 dark:bg-night-950/80 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-1.5 flex items-center gap-2"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-full pl-3 pr-5 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea group"
            aria-label="TeensHelpline Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image src="/images/logo-v2.png" alt="TeensHelpline Logo" fill className="object-contain scale-[2]" />
            </div>
            <span className="font-fraunces text-lg font-semibold text-ink-900 dark:text-white tracking-tight">
              TeensHelpline
            </span>
          </Link>

          <div className="w-px h-6 bg-ink-900/10 dark:bg-white/10 mx-1" />

          {/* Navigation Links */}
          <div className="flex items-center gap-0.5">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/get-help', label: 'Help' }
            ].map(link => {
              const isActive = pathname === link.href;
              const isHovered = hoveredPath === link.href;
              const showDarkPill = hoveredPath ? isHovered : isActive;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300",
                    showDarkPill
                      ? "text-white dark:text-ink-900"
                      : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                  )}
                >
                  {showDarkPill && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-ink-900 dark:bg-white rounded-full shadow-md"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}

            {/* Dropdown for Other */}
            <div
              className="relative"
              onMouseEnter={handleOtherEnter}
              onMouseLeave={handleOtherLeave}
            >
              <button
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-1.5",
                  (hoveredPath ? hoveredPath === 'other' : false)
                    ? "text-white dark:text-ink-900"
                    : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                )}
              >
                {(hoveredPath ? hoveredPath === 'other' : false) && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-ink-900 dark:bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">Other</span>
                <motion.span className="relative z-10" animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <CaretDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-white/90 dark:bg-night-950/90 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl rounded-2xl p-2 flex flex-col gap-1 z-50 overflow-hidden"
                    onMouseLeave={() => setHoveredDropdownPath(null)}
                  >
                    {[
                      { href: '/peer-support', icon: UsersThree, label: 'Peer Support' },
                      { href: '/study-hub', icon: BookOpen, label: 'Study Hub' },
                      { href: '/parents', icon: User, label: 'For Parents' },
                      { href: '/schools', icon: Brain, label: 'For Schools' }
                    ].map(item => {
                      const isDropdownHovered = hoveredDropdownPath === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onMouseEnter={() => setHoveredDropdownPath(item.href)}
                          className={cn(
                            "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-300 text-sm font-medium group",
                            isDropdownHovered ? "text-white dark:text-ink-900" : "text-ink-900 dark:text-white hover:text-ink-600 dark:hover:text-ink-300"
                          )}
                        >
                          {isDropdownHovered && (
                            <motion.div
                              layoutId="dropdown-pill"
                              className="absolute inset-0 bg-ink-900 dark:bg-white rounded-xl shadow-sm"
                              transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                          )}
                          <item.icon className={cn("w-4 h-4 transition-opacity relative z-10", isDropdownHovered ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
                          <span className="relative z-10">{item.label}</span>
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-px h-6 bg-ink-900/10 dark:bg-white/10 mx-1" />

          {/* Action CTAs */}
          <div className="flex items-center pl-1 pr-1">
            <Link
              href="/signin"
              className="bg-gradient-to-r from-aurora-dusk to-aurora-sea hover:opacity-90 text-white font-inter font-semibold px-7 py-2.5 rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── MOBILE TOP BAR (lg breakpoint and below) ─── */}
      <header className="lg:hidden fixed top-14 left-4 right-4 z-50 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/80 dark:bg-night-950/80 backdrop-blur-md shadow-lg border border-white/40 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
          aria-label="TeensHelpline Home"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image src="/images/logo-v2.png" alt="TeensHelpline Logo" fill className="object-contain scale-[2]" />
          </div>
          <span className="font-fraunces text-sm font-semibold text-ink-900 dark:text-white tracking-tight">
            TeensHelpline
          </span>
        </Link>

        {/* Crisis Button */}
        <Link
          href="/get-help"
          className="bg-signal-crisis hover:bg-signal-crisis/90 text-white font-inter font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-glow-crisis active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-crisis"
          aria-label="I need help now"
        >
          <Warning className="w-4 h-4" weight="bold" />
          <span>I Need Help Now</span>
        </Link>
      </header>

      {/* ─── MOBILE BOTTOM TAB BAR ─── */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/80 dark:bg-night-950/80 backdrop-blur-xl rounded-full px-4 py-2 shadow-2xl border border-white/40 dark:border-white/10 flex items-center justify-around">
        <Link
          href="/"
          className={cn(
            "p-2 rounded-full flex flex-col items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
            pathname === "/" ? "text-aurora-dusk dark:text-white" : "text-ink-600 dark:text-ink-300"
          )}
          aria-label="Home"
        >
          <House className="w-6 h-6" weight={pathname === "/" ? "fill" : "regular"} />
        </Link>

        <Link
          href="/study-hub"
          className={cn(
            "p-2 rounded-full flex flex-col items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
            pathname.startsWith("/study-hub") ? "text-aurora-sea dark:text-white" : "text-ink-600 dark:text-ink-300"
          )}
          aria-label="Study Hub"
        >
          <BookOpen className="w-6 h-6" weight={pathname.startsWith("/study-hub") ? "fill" : "regular"} />
        </Link>

        <Link
          href="/peer-support"
          className={cn(
            "p-2 rounded-full flex flex-col items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
            pathname.startsWith("/peer-support") ? "text-aurora-blush dark:text-white" : "text-ink-600 dark:text-ink-300"
          )}
          aria-label="Peer Support"
        >
          <UsersThree className="w-6 h-6" weight={pathname.startsWith("/peer-support") ? "fill" : "regular"} />
        </Link>

        {/* Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className={cn(
            "p-2 rounded-full flex flex-col items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea",
            mobileMenuOpen ? "text-aurora-dusk dark:text-white" : "text-ink-600 dark:text-ink-300"
          )}
          aria-expanded={mobileMenuOpen}
          aria-label="More navigation links"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" weight="bold" />
          ) : (
            <List className="w-6 h-6" weight="regular" />
          )}
        </button>
      </nav>

      {/* ─── MOBILE DRAWER MENU OVERLAY ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed inset-x-4 bottom-24 z-40 bg-white/90 dark:bg-night-950/90 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl p-5 flex flex-col gap-4 overflow-hidden"
          >
            <div className="flex flex-col gap-2 relative z-10">
              <span className="text-xs font-semibold text-ink-400 dark:text-ink-500 px-3 uppercase tracking-wider">Navigate</span>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-inter font-medium text-ink-900 dark:text-white hover:bg-ink-100 dark:hover:bg-white/10 transition-colors"
              >
                <Info className="w-5 h-5 text-ink-600 dark:text-ink-300" weight="duotone" />
                <span>About TH</span>
              </Link>
              <Link
                href="/parents"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-inter font-medium text-ink-900 dark:text-white hover:bg-ink-100 dark:hover:bg-white/10 transition-colors"
              >
                <User className="w-5 h-5 text-ink-600 dark:text-ink-300" weight="duotone" />
                <span>For Parents</span>
              </Link>
              <Link
                href="/schools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-inter font-medium text-ink-900 dark:text-white hover:bg-ink-100 dark:hover:bg-white/10 transition-colors"
              >
                <Brain className="w-5 h-5 text-ink-600 dark:text-ink-300" weight="duotone" />
                <span>For Schools</span>
              </Link>
            </div>

            <div className="h-px bg-ink-900/10 dark:bg-white/10 my-1 relative z-10" />

            <div className="flex flex-col gap-3 relative z-10">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-gradient-to-r from-aurora-dusk to-aurora-sea text-white py-3 rounded-full font-semibold shadow-lg transition-all"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
