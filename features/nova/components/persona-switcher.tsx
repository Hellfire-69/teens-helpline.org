"use client";

import { useNovaStore } from "../store";
import { PERSONA_THEMES } from "../persona-theme";
import type { PersonaId } from "../schema";
import { savePreferredPersonaAction } from "@/features/auth/actions";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useRef, useEffect } from "react";

const PERSONA_OPTIONS: { id: PersonaId; label: string; abbrev: string }[] = [
  { id: "big_brother", label: "Big Brother", abbrev: "Br" },
  { id: "big_sister", label: "Big Sister", abbrev: "Si" },
  { id: "mentor", label: "Mentor", abbrev: "Me" },
  { id: "best_friend", label: "Best Friend", abbrev: "Fr" },
];

export function PersonaSwitcher() {
  const activePersona = useNovaStore((state) => state.activePersona);
  const setActivePersona = useNovaStore((state) => state.setActivePersona);
  
  // Display persona tracks either hovered persona or falls back to active
  const [hoveredPersona, setHoveredPersona] = useState<PersonaId | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const switcherRef = useRef<HTMLDivElement>(null);

  const displayPersona = hoveredPersona || activePersona;
  const displayTheme = PERSONA_THEMES[displayPersona];

  const handleSelect = (id: PersonaId) => {
    setActivePersona(id);
    savePreferredPersonaAction(id).catch(console.error);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % PERSONA_OPTIONS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + PERSONA_OPTIONS.length) % PERSONA_OPTIONS.length;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(PERSONA_OPTIONS[currentIndex].id);
      return;
    } else {
      return;
    }

    e.preventDefault();
    const nextOption = PERSONA_OPTIONS[nextIndex];
    handleSelect(nextOption.id);

    // Focus the next segment button
    const buttons = switcherRef.current?.querySelectorAll("button[role='radio']");
    if (buttons && buttons[nextIndex]) {
      (buttons[nextIndex] as HTMLButtonElement).focus();
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none z-50" ref={switcherRef}>
      {/* Living Aurora Glass Selector Container */}
      <div 
        role="radiogroup"
        aria-label="Nova Persona Selector"
        className="relative flex items-center gap-3 p-2 bg-white/30 dark:bg-night-900/30 backdrop-blur-[24px] border border-white/20 dark:border-white/5 rounded-radius-full shadow-lg"
      >
        {PERSONA_OPTIONS.map((option, index) => {
          const isActive = activePersona === option.id;
          const isHovered = hoveredPersona === option.id;
          const theme = PERSONA_THEMES[option.id];
          const isSelectedOrHovered = isActive || isHovered;

          return (
            <button
              key={option.id}
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(option.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onMouseEnter={() => setHoveredPersona(option.id)}
              onMouseLeave={() => setHoveredPersona(null)}
              onFocus={() => setHoveredPersona(option.id)}
              onBlur={() => setHoveredPersona(null)}
              className="relative w-11 h-11 flex items-center justify-center rounded-radius-full transition-all outline-none"
              style={{
                // Light glow expansion on active or hover
                boxShadow: isSelectedOrHovered && !shouldReduceMotion
                  ? `0 0 16px ${theme.colorHex}25`
                  : "none",
              }}
            >
              {/* Rotating Dashed Halo / Orbit Ring for Active state */}
              {isActive && !shouldReduceMotion && (
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  style={{ color: theme.colorHex }}
                >
                  <circle
                    cx="22"
                    cy="22"
                    r="19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    className="opacity-70 dark:opacity-80"
                  />
                </motion.svg>
              )}

              {/* Glass Capsule Button Body */}
              <div 
                className={`absolute inset-0.5 rounded-radius-full border transition-all duration-280 flex items-center justify-center ${
                  isActive 
                    ? "bg-white/80 dark:bg-white/10 border-white/40 dark:border-white/20 shadow-sm scale-105" 
                    : "bg-white/20 dark:bg-black/10 hover:bg-white/40 dark:hover:bg-white/5 border-white/10 dark:border-white/5"
                }`}
              >
                {/* Dynamic Inner Glowing Core */}
                <motion.div
                  className={`w-3.5 h-3.5 rounded-radius-full ${theme.colorClass}`}
                  animate={shouldReduceMotion ? {} : {
                    scale: isActive ? [1, 1.15, 1] : [1, 1.05, 1],
                    opacity: isActive ? [0.8, 1, 0.8] : 0.6,
                  }}
                  transition={{
                    duration: theme.pulseProfile.restingDuration,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  style={{
                    boxShadow: `0 0 10px ${theme.colorHex}`,
                  }}
                />
              </div>

              {/* Hidden text for screen-readers */}
              <span className="sr-only">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Active Descriptor Glass Banner below the selector */}
      <div className="mt-2.5 h-6 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayPersona}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center gap-2 px-3 py-1 bg-white/20 dark:bg-night-900/20 border border-white/15 dark:border-white/5 rounded-radius-full backdrop-blur-md shadow-sm"
          >
            <span className={`w-1.5 h-1.5 rounded-radius-full ${displayTheme.colorClass} shadow-[0_0_6px_currentColor]`} />
            <span className="text-[11px] font-semibold text-ink-900 dark:text-white uppercase tracking-wider">
              {displayTheme.label}
            </span>
            <span className="w-1 h-1 rounded-radius-full bg-ink-300 dark:bg-ink-600" />
            <span className="text-[10px] font-medium text-ink-600 dark:text-ink-300 italic">
              {displayTheme.descriptor}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
