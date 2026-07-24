"use client";

import { useNovaStore } from "../store";
import { PERSONA_THEMES } from "../persona-theme";
import type { PersonaId } from "../schema";
import { savePreferredPersonaAction } from "@/features/auth/actions";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useRef } from "react";

const PERSONA_OPTIONS: { id: PersonaId; label: string }[] = [
  { id: "big_brother", label: "Big Brother" },
  { id: "big_sister", label: "Big Sister" },
  { id: "mentor", label: "Mentor" },
  { id: "best_friend", label: "Best Friend" },
];

export function PersonaSwitcher() {
  const activePersona = useNovaStore((state) => state.activePersona);
  const setActivePersona = useNovaStore((state) => state.setActivePersona);
  
  const [hoveredPersona, setHoveredPersona] = useState<PersonaId | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const switcherRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: PersonaId) => {
    setActivePersona(id);
    savePreferredPersonaAction(id).catch(console.error);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % PERSONA_OPTIONS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + PERSONA_OPTIONS.length) % PERSONA_OPTIONS.length;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const defaultId = PERSONA_OPTIONS[0]?.id ?? "big_brother";
      handleSelect(PERSONA_OPTIONS[currentIndex]?.id ?? defaultId);
      return;
    } else {
      return;
    }

    e.preventDefault();
    const nextOption = PERSONA_OPTIONS[nextIndex];
    if (!nextOption) return;
    handleSelect(nextOption.id);

    const buttons = switcherRef.current?.querySelectorAll("button[role='radio']");
    if (buttons && buttons[nextIndex]) {
      (buttons[nextIndex] as HTMLButtonElement).focus();
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none" ref={switcherRef}>
      {/* 1. Dynamic Tooltip above the switcher */}
      <AnimatePresence>
        {hoveredPersona && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={shouldReduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-full mb-2.5 px-2.5 py-1.5 bg-ink-900/90 dark:bg-night-900/95 text-white rounded-radius-md shadow-lg backdrop-blur-md border border-white/10 whitespace-nowrap z-50 text-center pointer-events-none"
            style={{ x: "-50%", left: "50%" }}
          >
            <div className="font-semibold text-[11px] flex items-center gap-1.5 justify-center">
              <span className={`w-1.5 h-1.5 rounded-full ${PERSONA_THEMES[hoveredPersona].colorClass}`} />
              {PERSONA_THEMES[hoveredPersona].label}
            </div>
            <div className="text-white/50 text-[9px] mt-0.5 font-medium">
              {PERSONA_THEMES[hoveredPersona].descriptor}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Tiny Glass Switcher Tray (Footprint reduced to h-9, minimal UI) */}
      <div 
        role="radiogroup"
        aria-label="Nova Persona Selector"
        className="relative flex items-center gap-1.5 p-1 bg-white/20 dark:bg-night-900/20 backdrop-blur-[20px] border border-white/15 dark:border-white/5 rounded-radius-full shadow-sm"
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
              className="relative w-8 h-8 flex items-center justify-center rounded-radius-full transition-all outline-none"
              style={{
                boxShadow: isSelectedOrHovered && !shouldReduceMotion
                  ? `0 0 12px ${theme.colorHex}15`
                  : "none",
              }}
            >
              {/* Rotating Dashed Halo for Active state */}
              {isActive && !shouldReduceMotion && (
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                  style={{ color: theme.colorHex }}
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="13.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.0"
                    strokeDasharray="3 2"
                    className="opacity-75"
                  />
                </motion.svg>
              )}

              {/* Glass bead */}
              <div 
                className={`absolute inset-0.5 rounded-radius-full border transition-all duration-280 flex items-center justify-center ${
                  isActive 
                    ? "bg-white dark:bg-white/15 border-white/30 dark:border-white/10 shadow-sm scale-105" 
                    : "bg-white/10 dark:bg-black/5 hover:bg-white/20 dark:hover:bg-white/5 border-white/5"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-radius-full ${theme.colorClass}`}
                  style={{
                    boxShadow: `0 0 6px ${theme.colorHex}`,
                    opacity: isActive ? 1.0 : 0.45,
                  }}
                />
              </div>
              <span className="sr-only">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
