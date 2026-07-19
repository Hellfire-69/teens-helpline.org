"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Books, UsersThree, ChatCircleDots, Heartbeat, Gear, SignOut, ShieldCheck } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { signOutAction } from "@/features/auth/actions";

export function Navigation({ role }: { role: string | null }) {
  const pathname = usePathname();
  const [showSettingsToast, setShowSettingsToast] = useState(false);

  // The dashboard route defaults to teen for anonymous/guests.
  const dashboardHref = role === "parent" ? "/dashboard/parent" : "/dashboard/teen";

  const primaryNavItems = [
    { name: "Dashboard", href: dashboardHref, icon: House, disabled: false },
    { name: "Nova", href: "/chat", icon: ChatCircleDots, disabled: false },
    { name: "Mood Check", href: "/mood", icon: Heartbeat, disabled: false },
    { name: "Peer Support", href: "/peer-support", icon: UsersThree, disabled: false },
    { name: "Study Hub", href: "/study-hub", icon: Books, disabled: false },
  ];

  const handleSettingsClick = () => {
    setShowSettingsToast(true);
    setTimeout(() => setShowSettingsToast(false), 3000);
  };

  return (
    <>
      {/* Mobile Tab Bar (Bottom) */}
      <nav
        aria-label="Main navigation"
        className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/70 dark:bg-night-950/70 backdrop-blur-[20px] rounded-radius-2xl shadow-sm border border-white/10 flex items-center justify-around p-2"
      >
        {primaryNavItems.map((item) => {
          const isActive = pathname === item.href || (item.name === "Dashboard" && pathname.startsWith("/dashboard"));
          const Icon = item.icon;
          
          if (item.disabled) {
            return (
              <div key={item.name} className="flex flex-col items-center p-2 text-ink-300 opacity-50 cursor-not-allowed" aria-disabled="true">
                <Icon weight="duotone" className="w-6 h-6 mb-1" aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">{item.name}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center p-2 rounded-radius-xl transition-all duration-fast",
                isActive ? "text-aurora-sea" : "text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 bg-aurora-sea/10 rounded-radius-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <Icon weight={isActive ? "fill" : "duotone"} className="w-6 h-6 mb-1 relative z-10" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-wider relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sidebar (Left) */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 z-40 bg-white/60 dark:bg-night-950/60 backdrop-blur-[20px] border-r border-white/10 flex-col py-6 px-4"
      >
        
        {/* Brand Logo */}
        <div className="flex items-center px-4 mb-8">
          <Link href={dashboardHref} className="flex items-center gap-2 outline-none rounded-radius-sm focus-visible:ring-2 focus-visible:ring-aurora-sea">
            <div className="w-8 h-8 rounded-radius-md bg-gradient-to-br from-aurora-dusk to-aurora-sea flex items-center justify-center text-white shadow-sm" aria-hidden="true">
              <ShieldCheck weight="fill" className="w-5 h-5" />
            </div>
            <h1 className="font-fraunces text-[1.1875rem] font-semibold tracking-tight text-ink-900 dark:text-white">
              TeensHelpline
            </h1>
          </Link>
        </div>

        {/* Primary Navigation */}
        <div className="flex-1 space-y-1">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-ink-300 mb-2 mt-4" aria-hidden="true">Menu</p>
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Dashboard" && pathname.startsWith("/dashboard"));
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <div key={item.name} className="flex items-center gap-3 px-4 py-2.5 rounded-radius-lg text-ink-300 opacity-50 cursor-not-allowed" aria-disabled="true">
                  <Icon weight="duotone" className="w-5 h-5" aria-hidden="true" />
                  <span className="text-type-body-md font-medium">{item.name}</span>
                  <span className="text-[10px] uppercase ml-auto bg-ink-200 dark:bg-ink-800 px-2 py-0.5 rounded-radius-full">Soon</span>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-2.5 rounded-radius-lg transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
                  isActive ? "text-aurora-sea" : "text-ink-600 dark:text-ink-300 hover:bg-ink-100/50 dark:hover:bg-ink-800/50 hover:text-ink-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-indicator"
                    className="absolute inset-0 bg-aurora-sea/10 border border-aurora-sea/20 rounded-radius-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}
                <Icon weight={isActive ? "fill" : "duotone"} className="w-5 h-5 relative z-10" aria-hidden="true" />
                <span className={cn("text-type-body-md relative z-10", isActive ? "font-semibold" : "font-medium")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: Support & Settings */}
        <div className="space-y-1 mt-auto pt-4 border-t border-ink-300/10 relative">
          
          {/* Support Status (decorative, no dead interaction) */}
          <div className="flex items-center gap-3 px-4 py-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-signal-safe" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal-safe" />
            </span>
            <span className="text-type-body-sm font-medium text-ink-600 dark:text-ink-300">Support is available 24/7</span>
          </div>

          {/* Settings — Coming Soon */}
          <button
            onClick={handleSettingsClick}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-radius-lg text-ink-600 dark:text-ink-300 hover:bg-ink-100/50 dark:hover:bg-ink-800/50 transition-colors text-left"
            aria-label="Settings (coming soon)"
          >
            <Gear weight="duotone" className="w-5 h-5" aria-hidden="true" />
            <span className="text-type-body-md font-medium">Settings</span>
            <span className="ml-auto text-[10px] uppercase bg-ink-200 dark:bg-ink-800 text-ink-500 dark:text-ink-400 px-2 py-0.5 rounded-radius-full font-bold tracking-wide">Soon</span>
          </button>

          {/* Log Out — functional via server action */}
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-radius-lg text-ink-600 dark:text-ink-300 hover:bg-signal-crisis/10 hover:text-signal-crisis transition-colors text-left"
              aria-label="Log out of your account"
            >
              <SignOut weight="duotone" className="w-5 h-5" aria-hidden="true" />
              <span className="text-type-body-md font-medium">Log out</span>
            </button>
          </form>

          {/* Settings Coming Soon Toast */}
          <AnimatePresence>
            {showSettingsToast && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute bottom-full mb-2 left-2 right-2 bg-ink-900 dark:bg-white text-white dark:text-ink-900 text-type-body-sm font-medium px-4 py-3 rounded-radius-lg shadow-lg text-center"
                role="status"
                aria-live="polite"
              >
                ⚙️ Settings will be available soon!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
