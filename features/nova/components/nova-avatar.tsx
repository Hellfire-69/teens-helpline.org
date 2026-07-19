"use client";

import { motion } from "motion/react";
import { useNovaStore } from "../store";

export function NovaAvatar() {
  const status = useNovaStore((state) => state.status);

  // Define animations for each state per Design.md §20
  const variants = {
    resting: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    listening: {
      scale: 0.95,
      opacity: 0.6,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    responding: {
      scale: [1, 1.15, 1],
      opacity: [0.9, 1, 0.9],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-aurora-sea mix-blend-screen blur-xl"
        variants={variants}
        animate={status}
      />
      {/* Core Shape */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-white opacity-80 blur-sm shadow-glow-sea"
        variants={variants}
        animate={status}
      />
      {/* Inner bright point */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white blur-[2px]"
        variants={{
          resting: { opacity: [0.5, 0.8, 0.5], transition: { duration: 4, repeat: Infinity } },
          listening: { opacity: 0.4 },
          responding: { opacity: [0.8, 1, 0.8], transition: { duration: 2, repeat: Infinity } }
        }}
        animate={status}
      />
    </div>
  );
}
