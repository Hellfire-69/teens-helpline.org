"use client";

import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickExit() {
  const handleExit = () => {
    // Quickly replace the page in history so back button doesn't work, and go to an innocuous site
    window.location.replace("https://www.google.com/search?q=weather+today");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed z-50 bottom-20 right-4 md:bottom-6 md:right-6"
    >
      {/* Mobile: icon-only 44×44px (Design.md §23 minimum touch target) */}
      <Button
        variant="destructive"
        onClick={handleExit}
        aria-label="Quick Exit — leave this page immediately"
        className="h-11 w-11 rounded-full shadow-glow-crisis p-0 flex items-center justify-center md:hidden"
      >
        <LogOut className="h-5 w-5" />
      </Button>

      {/* Desktop: full labeled pill button */}
      <Button
        variant="destructive"
        size="lg"
        onClick={handleExit}
        className="hidden md:flex rounded-full shadow-glow-crisis h-11 px-5 gap-2"
        aria-label="Quick Exit — leave this page immediately"
      >
        <LogOut className="h-5 w-5" />
        <span className="font-semibold">Quick Exit</span>
      </Button>
    </motion.div>
  );
}
