"use client";

import { motion, useReducedMotion } from "motion/react";

export function AuroraMesh() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-paper-50 dark:bg-night-950" />
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-10 dark:opacity-15 blur-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Dusk */}
        <motion.div
          className="absolute top-0 left-0 w-2/3 h-2/3 rounded-full bg-aurora-dusk mix-blend-multiply dark:mix-blend-screen"
          animate={shouldReduceMotion ? { scale: 1, x: 0, y: 0 } : {
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "5%", "-10%", "0%"],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 120,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        {/* Sea */}
        <motion.div
          className="absolute bottom-0 right-1/4 w-3/4 h-3/4 rounded-full bg-aurora-sea mix-blend-multiply dark:mix-blend-screen"
          animate={shouldReduceMotion ? { scale: 1, x: 0, y: 0 } : {
            x: ["0%", "-15%", "5%", "0%"],
            y: ["0%", "-10%", "15%", "0%"],
            scale: [1, 1.05, 1.15, 1],
          }}
          transition={{
            duration: 150,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        {/* Dawn */}
        <motion.div
          className="absolute top-1/3 right-0 w-1/2 h-1/2 rounded-full bg-aurora-dawn mix-blend-multiply dark:mix-blend-screen"
          animate={shouldReduceMotion ? { scale: 1, x: 0, y: 0 } : {
            x: ["0%", "20%", "-10%", "0%"],
            y: ["0%", "15%", "-20%", "0%"],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 180,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </motion.div>
    </div>
  );
}
