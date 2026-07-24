"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ 
          duration: 0.28, 
          ease: "easeInOut"
        }}
        className="flex-1 flex flex-col min-h-full"
      >
        {/* We stagger the children's enter by 60ms by putting a nested delay if needed, 
            but for the page level, wait mode is fine. If we use mode="sync", we can add delay to enter. */}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
