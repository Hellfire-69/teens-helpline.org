"use client";

import { motion, useReducedMotion } from "motion/react";
import { useNovaStore } from "../store";
import { PERSONA_THEMES } from "../persona-theme";

interface NovaAvatarProps {
  isBlooming?: boolean;
  onBloomComplete?: () => void;
}

export function NovaAvatar({ isBlooming, onBloomComplete }: NovaAvatarProps) {
  const status = useNovaStore((state) => state.status);
  const activePersona = useNovaStore((state) => state.activePersona);
  const shouldReduceMotion = useReducedMotion();

  const theme = PERSONA_THEMES[activePersona] || PERSONA_THEMES.big_brother;
  const { pulseProfile } = theme;

  const activeState = isBlooming ? "blooming" : status;

  // Visual state animations using Framer Motion
  const outerGlowVariants = {
    resting: {
      scale: shouldReduceMotion ? 1 : [1, pulseProfile.restingScale, 1],
      opacity: shouldReduceMotion ? 0.75 : [0.65, 0.85, 0.65],
      transition: {
        duration: pulseProfile.restingDuration,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    listening: {
      scale: pulseProfile.listeningScale,
      opacity: 0.5,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 34,
      },
    },
    responding: {
      scale: shouldReduceMotion ? 1.05 : [1, pulseProfile.respondingScale, 1],
      opacity: shouldReduceMotion ? 0.95 : [0.75, 0.95, 0.75],
      transition: {
        duration: 2.2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    blooming: {
      scale: shouldReduceMotion ? 1.1 : [1, 1.45, 1],
      opacity: [0.6, 1.0, 0.75],
      transition: {
        duration: 1.3,
        ease: "easeOut",
      }
    }
  };

  const coreShapeVariants = {
    resting: {
      y: shouldReduceMotion ? 0 : [0, -2, 2, 0],
      scale: shouldReduceMotion ? 1 : [1, 1.03, 0.97, 1],
      transition: {
        duration: pulseProfile.restingDuration * 1.2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    listening: {
      y: 0,
      scale: pulseProfile.listeningScale * 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    responding: {
      scale: shouldReduceMotion ? 1.1 : [1, pulseProfile.respondingScale * 0.95, 1],
      y: 0,
      transition: {
        duration: 1.8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    blooming: {
      scale: shouldReduceMotion ? 1.15 : [1, 1.35, 1],
      y: 0,
      transition: {
        duration: 1.3,
        ease: "easeOut",
      }
    }
  };

  const ambientDrifterVariants = {
    resting: {
      x: shouldReduceMotion ? 0 : [0, 4, -3, 0],
      y: shouldReduceMotion ? 0 : [0, -4, 2, 0],
      opacity: shouldReduceMotion ? 0.4 : [0.3, 0.6, 0.3],
      scale: shouldReduceMotion ? 1 : [1, 1.1, 0.9, 1],
      transition: {
        duration: 6.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    listening: {
      x: 0,
      y: 0,
      opacity: 0.2,
      scale: 0.9,
    },
    responding: {
      scale: shouldReduceMotion ? 1.25 : [1, 1.35, 1],
      opacity: shouldReduceMotion ? 0.65 : [0.55, 0.85, 0.55],
      x: shouldReduceMotion ? 0 : [0, -2, 2, 0],
      y: shouldReduceMotion ? 0 : [0, 2, -2, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
    blooming: {
      scale: shouldReduceMotion ? 1.3 : [1, 1.6, 1],
      opacity: [0.3, 0.8, 0.4],
      transition: {
        duration: 1.3,
        ease: "easeOut",
      }
    }
  };

  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      {/* 1. Dynamic Ambient Bloom (Outer Aura) */}
      <motion.div
        className={`absolute inset-0 rounded-radius-full mix-blend-screen blur-xl ${theme.colorClass}`}
        variants={outerGlowVariants}
        animate={activeState}
        onAnimationComplete={() => {
          if (isBlooming && onBloomComplete) {
            onBloomComplete();
          }
        }}
        style={{
          boxShadow: `0 0 32px ${theme.colorHex}35`,
        }}
      />

      {/* 2. Shimmering Drifting Volumetric Light Layer */}
      <motion.div
        className="absolute w-6 h-6 rounded-radius-full mix-blend-screen blur-md opacity-35 bg-white/30"
        variants={ambientDrifterVariants}
        animate={activeState}
      />

      {/* 3. Core Glow Glass Shape */}
      <motion.div
        className={`absolute w-8 h-8 rounded-radius-full bg-white opacity-80 blur-[2.5px] transition-shadow duration-[400ms]`}
        variants={coreShapeVariants}
        animate={activeState}
        style={{
          boxShadow: `0 0 16px ${theme.colorHex}60`,
        }}
      />

      {/* 4. Inner Attentiveness Pinpoint (Nova's Soul/Energy center) */}
      <motion.div
        className="absolute w-3.5 h-3.5 rounded-radius-full bg-white blur-[1px]"
        variants={{
          resting: { 
            scale: shouldReduceMotion ? 1 : [0.95, 1.05, 0.95],
            opacity: shouldReduceMotion ? 0.85 : [0.65, 0.9, 0.65], 
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
          },
          listening: { 
            scale: 0.8, 
            opacity: 0.45 
          },
          responding: { 
            scale: shouldReduceMotion ? 1.15 : [1, 1.2, 1],
            opacity: shouldReduceMotion ? 0.95 : [0.85, 1, 0.85], 
            transition: { duration: 1.3, repeat: Infinity, ease: "easeInOut" } 
          },
          blooming: {
            scale: shouldReduceMotion ? 1.2 : [1, 1.4, 1],
            opacity: [0.5, 1.0, 0.85],
            transition: { duration: 1.3, ease: "easeOut" }
          }
        }}
        animate={activeState}
      />
    </div>
  );
}
