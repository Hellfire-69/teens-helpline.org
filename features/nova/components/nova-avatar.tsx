"use client";

import { motion } from "motion/react";
import { useNovaStore } from "../store";

export function NovaAvatar() {
  const status = useNovaStore((state) => state.status);
  const activePersona = useNovaStore((state) => state.activePersona);

  const bgClass = {
    big_brother: "bg-aurora-sea",
    big_sister: "bg-aurora-blush",
    mentor: "bg-aurora-dusk",
    best_friend: "bg-aurora-dawn",
  }[activePersona] || "bg-aurora-sea";

  const shadowClass = {
    big_brother: "shadow-glow-sea",
    big_sister: "shadow-glow-blush",
    mentor: "shadow-glow-dusk",
    best_friend: "shadow-glow-dawn",
  }[activePersona] || "shadow-glow-sea";

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
        className={`absolute inset-0 rounded-full mix-blend-screen blur-xl ${bgClass}`}
        variants={variants}
        animate={status}
      />
      {/* Core Shape */}
      <motion.div
        className={`absolute w-8 h-8 rounded-full bg-white opacity-80 blur-sm ${shadowClass}`}
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
