"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { WelcomeStep } from "./steps/WelcomeStep";
import { AvatarStep } from "./steps/AvatarStep";
import { MoodStep } from "./steps/MoodStep";
import { ConcernStep } from "./steps/ConcernStep";
import { NovaWelcomeStep } from "./steps/NovaWelcomeStep";
import { Companion } from "./companions/Companions";

const NUM_STEPS = 5;

// New Custom Light Palette
const PALETTE = {
  ivory: "#FAF7F2",
  peach: "#F5D9C7",
  teal: "#7BC9C8",
  sky: "#DCEFFF",
  lavender: "#CFC8FF"
};

export function OnboardingEnvironment() {
  const { currentStep, avatar, mood, prevStep } = useOnboardingStore();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Throttled mouse move for performance
    let raf: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted) return null;

  // Determine dynamic background colors based on step and mood
  let bgGradient = `linear-gradient(135deg, ${PALETTE.ivory} 0%, ${PALETTE.sky} 100%)`;
  let blob1 = PALETTE.peach;
  let blob2 = PALETTE.lavender;
  
  if (mood === "sad") {
    bgGradient = `linear-gradient(135deg, ${PALETTE.sky} 0%, ${PALETTE.lavender} 100%)`;
    blob1 = PALETTE.sky;
    blob2 = PALETTE.teal;
  } else if (mood === "happy") {
    bgGradient = `linear-gradient(135deg, ${PALETTE.ivory} 0%, ${PALETTE.peach} 100%)`;
    blob1 = PALETTE.peach;
    blob2 = PALETTE.lavender;
  } else if (mood === "anxious") {
    bgGradient = `linear-gradient(135deg, ${PALETTE.ivory} 0%, ${PALETTE.lavender} 100%)`;
    blob1 = PALETTE.teal;
    blob2 = PALETTE.sky;
  } else if (mood === "overwhelmed") {
    bgGradient = `linear-gradient(135deg, ${PALETTE.sky} 0%, ${PALETTE.teal} 100%)`;
    blob1 = PALETTE.lavender;
    blob2 = PALETTE.sky;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-[2000ms]"
      style={{ background: bgGradient }}
    >
      {/* 0. Back Button */}
      <AnimatePresence>
        {currentStep > 0 && currentStep < 4 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            onClick={prevStep}
            className="absolute top-8 left-8 z-[100] pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/40 hover:bg-white/60 border border-white/40 backdrop-blur-md shadow-sm transition-all"
            aria-label="Go back"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#1C1B29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 1. Ambient Lighting & Animated Blobs (Optimized) */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] blur-[80px] rounded-full opacity-50 will-change-transform"
          style={{ backgroundColor: blob1 }}
          animate={{
            x: ["0%", "5%", "-5%", "0%"],
            y: ["0%", "-5%", "5%", "0%"],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] blur-[80px] rounded-full opacity-50 will-change-transform"
          style={{ backgroundColor: blob2 }}
          animate={{
            x: ["0%", "-10%", "5%", "0%"],
            y: ["0%", "10%", "-5%", "0%"],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 2. Cursor Follower Light */}
      <motion.div
        className="absolute w-[30vw] h-[30vw] rounded-full blur-[80px] bg-white opacity-20 pointer-events-none z-10 will-change-transform"
        animate={{
          x: mousePos.x - window.innerWidth * 0.15,
          y: mousePos.y - window.innerWidth * 0.15,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
      />

      {/* 3. Floating Particles (Restored full count for atmosphere) */}
      <div className="absolute inset-0 z-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full blur-[1px] bg-white will-change-transform"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              opacity: Math.random() * 0.4 + 0.1
            }}
            animate={{
              y: [null, `${Math.random() * -20 - 10}vh`],
              x: [null, `${Math.random() * 20 - 10}vw`],
              opacity: [null, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* 4. Constellation Progress Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center z-30 opacity-70">
        <div className="flex items-center gap-4">
          {Array.from({ length: NUM_STEPS }).map((_, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                className="rounded-full bg-[#1C1B29]"
                animate={{
                  width: currentStep === i ? 12 : 6,
                  height: currentStep === i ? 12 : 6,
                  opacity: currentStep >= i ? 0.8 : 0.2,
                  boxShadow: currentStep === i ? `0 0 12px ${PALETTE.teal}` : "none"
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              {i < NUM_STEPS - 1 && (
                <motion.div
                  className="h-[1px] bg-[#1C1B29] mx-2"
                  animate={{
                    width: currentStep > i ? 30 : 16,
                    opacity: currentStep > i ? 0.4 : 0.1
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Companion Following (with glow and sparkles) */}
      {avatar && currentStep > 0 && currentStep < 4 && (
        <motion.div
          className="absolute z-40"
          initial={{ opacity: 0, x: "5vw", y: "60vh" }}
          animate={{
            opacity: 1,
            x: `${10 + (currentStep * 8)}vw`,
            y: "65vh",
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Avatar Glow */}
          <motion.div
            className="absolute inset-0 bg-white/60 blur-[30px] rounded-full z-0"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-10"
            animate={{ y: ["-10px", "10px"], rotate: [-2, 2] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <Companion id={avatar} size={100} />
            
            {/* Sparkle Trail */}
            <motion.div 
              className="absolute -bottom-2 -left-2 w-2 h-2 bg-white rounded-full blur-[1px]"
              animate={{ y: [0, -20], x: [0, -10], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="absolute top-4 -right-4 w-1.5 h-1.5 bg-white rounded-full blur-[1px]"
              animate={{ y: [0, -15], x: [0, 10], opacity: [0, 0.8, 0], scale: [0, 1.2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* 6. Active Step Content (pointer events re-enabled) */}
      <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 0 && <WelcomeStep key="step0" />}
          {currentStep === 1 && <AvatarStep key="step1" />}
          {currentStep === 2 && <MoodStep key="step2" />}
          {currentStep === 3 && <ConcernStep key="step3" />}
          {currentStep === 4 && <NovaWelcomeStep key="step4" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
