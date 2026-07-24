"use client";

import { useState, useEffect } from "react";
import { Phone, CaretDown, Bell, Moon, Sun, WarningCircle } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard/teen": "Dashboard",
  "/dashboard/parent": "Dashboard",
  "/chat": "Nova Chat",
  "/peer-support": "Peer Support",
  "/study-hub": "Study Hub",
  "/mood": "Mood Check-in",
};

export function SafetyBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHelplines, setShowHelplines] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showNotifToast, setShowNotifToast] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync dark mode with document class
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  const handleNotifications = () => {
    setShowNotifToast(true);
    setTimeout(() => setShowNotifToast(false), 3000);
  };

  const currentSegment = pathname?.split("/").pop() || "";
  const defaultTitle = currentSegment
    ? currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1)
    : "Dashboard";
  const pageTitle = PAGE_TITLES[pathname] ?? defaultTitle;

  const helplines = [
    { name: "CHILDLINE", number: "1098" },
    { name: "TeleMANAS", number: "14416" },
    { name: "KIRAN", number: "1800-599-0019" },
    { name: "Vandrevala Foundation", number: "1860-266-2345" },
    { name: "iCALL", number: "9152987821" },
  ];

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 hidden md:block",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-radius-full border border-white/10 transition-all duration-300",
            isScrolled
              ? "bg-white/80 dark:bg-night-950/80 shadow-sm px-4 py-2"
              : "bg-white/50 dark:bg-night-950/50 shadow-none px-6 py-3",
          )}
          style={{ backdropFilter: "blur(20px)" }}
        >
          {/* Page title */}
          <h2 className="font-semibold text-ink-900 dark:text-white text-type-body-md tracking-tight">
            {pageTitle}
          </h2>

          {/* Actions */}
          <div className="flex items-center gap-2 relative">

            {/* Dark mode toggle — functional */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-radius-full text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark
                ? <Sun weight="duotone" className="w-5 h-5" aria-hidden="true" />
                : <Moon weight="duotone" className="w-5 h-5" aria-hidden="true" />
              }
            </button>

            {/* Notifications — Coming Soon toast */}
            <div className="relative">
              <button
                onClick={handleNotifications}
                className="p-2 rounded-radius-full text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
                aria-label="Notifications (coming soon)"
              >
                <Bell weight="duotone" className="w-5 h-5" aria-hidden="true" />
              </button>
              <AnimatePresence>
                {showNotifToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-ink-900 dark:bg-white text-white dark:text-ink-900 text-type-body-sm font-medium px-4 py-3 rounded-radius-lg shadow-lg whitespace-nowrap"
                    role="status"
                    aria-live="polite"
                  >
                    🔔 Notifications coming soon!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-4 w-px bg-ink-300/30 mx-1" aria-hidden="true" />

            {/* Emergency helplines — functional */}
            <div className="relative">
              <button
                onClick={() => setShowHelplines(!showHelplines)}
                aria-expanded={showHelplines}
                aria-haspopup="menu"
                aria-label="Emergency helplines"
                className="flex items-center gap-2 bg-signal-crisis/10 hover:bg-signal-crisis/20 text-signal-crisis px-3 py-1.5 rounded-radius-full transition-colors text-type-body-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-crisis"
              >
                <WarningCircle weight="fill" className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Emergency</span>
                <CaretDown
                  weight="bold"
                  className={cn("w-3 h-3 transition-transform duration-200", showHelplines && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {showHelplines && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute right-0 top-full mt-2 w-68 bg-white dark:bg-night-950 rounded-radius-xl shadow-lg border border-border overflow-hidden z-50"
                    role="menu"
                    aria-label="Crisis helplines"
                  >
                    <div className="p-3 border-b border-border bg-signal-crisis/5">
                      <p className="text-type-body-sm text-signal-crisis font-semibold">Need immediate help?</p>
                      <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">Free · Confidential · Available 24/7</p>
                    </div>
                    <div className="p-2 max-h-60 overflow-y-auto" role="list">
                      {helplines.map((line) => (
                        <a
                          key={line.name}
                          href={`tel:${line.number}`}
                          role="menuitem"
                          className="flex items-center justify-between p-2.5 hover:bg-ink-100 dark:hover:bg-ink-900 rounded-radius-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
                          onClick={() => setShowHelplines(false)}
                        >
                          <span className="flex items-center gap-2.5 text-type-body-sm font-medium text-ink-900 dark:text-white">
                            <Phone weight="fill" className="w-4 h-4 text-signal-crisis shrink-0" aria-hidden="true" />
                            {line.name}
                          </span>
                          <span className="text-xs font-bold text-signal-crisis ml-2 shrink-0">{line.number}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
