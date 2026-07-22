"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import { PERSONA_THEMES, type PersonaTheme } from "../persona-theme";
import React from "react";

interface PersonaCardProps {
  theme: PersonaTheme;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  isSelected?: boolean;
  isAnySelected?: boolean;
}

export function PersonaCard({ theme, onClick, isSelected, isAnySelected }: PersonaCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // 3D Tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map to max 6 degrees of rotation per Design.md §9
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { Glyph, pulseProfile } = theme;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => onClick(e)}
      style={shouldReduceMotion ? {
        borderColor: isSelected ? theme.colorHex : undefined,
      } : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        borderColor: isSelected ? theme.colorHex : undefined,
      }}
      whileHover={shouldReduceMotion ? undefined : { 
        y: -4, 
        scale: 1.02,
        boxShadow: `0 8px 32px ${theme.colorHex}20` 
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      className={`group relative w-full h-44 rounded-radius-lg p-space-4 flex flex-col justify-between cursor-pointer transition-all duration-280 select-none overflow-hidden ${
        isSelected 
          ? "bg-white/90 dark:bg-white/15 border-2 shadow-md"
          : isAnySelected
            ? "bg-white/10 dark:bg-black/10 opacity-30 scale-95 border-white/5 pointer-events-none"
            : "bg-white/40 dark:bg-night-900/30 border border-white/20 dark:border-white/5 shadow-sm"
      }`}
    >
      {/* 1. Dynamic Glass Refraction Background & Ambient Shadow Glow */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-[500ms] group-hover:opacity-40 -z-10 ${
          isSelected ? "opacity-30" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.colorHex}25 0%, transparent 80%)`,
        }}
      />
      <div className="absolute inset-0.5 rounded-[12px] border border-white/10 dark:border-white/5 pointer-events-none -z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />

      {/* 2. Card Header */}
      <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-2">
          <span 
            className={`w-2 h-2 rounded-radius-full ${theme.colorClass} transition-transform duration-280 group-hover:scale-125`}
            style={{
              boxShadow: `0 0 8px ${theme.colorHex}`,
            }}
          />
          <h3 className="text-type-body-sm font-semibold text-ink-900 dark:text-white group-hover:text-ink-900 dark:group-hover:text-white transition-colors duration-180">
            {theme.label}
          </h3>
        </div>
      </div>

      {/* 3. Volumetric SVG Glyph Container */}
      <div className="flex justify-center items-center h-20" style={{ transform: "translateZ(30px)" }}>
        <motion.div
          animate={shouldReduceMotion ? {} : {
            y: [0, -3, 3, 0],
            scale: [1, 1.03, 0.97, 1]
          }}
          transition={{
            duration: pulseProfile.restingDuration,
            ease: "easeInOut",
            repeat: Infinity
          }}
          className={`w-12 h-12 flex items-center justify-center transition-colors duration-280 ${theme.textClass} group-hover:text-white/90`}
        >
          <Glyph className="w-10 h-10 drop-shadow-[0_2px_8px_currentColor]" />
        </motion.div>
      </div>

      {/* 4. Descriptor Footer */}
      <div className="text-center" style={{ transform: "translateZ(15px)" }}>
        <p className="text-[10px] font-medium text-ink-600 dark:text-ink-300 italic group-hover:text-ink-900 dark:group-hover:text-white/80 transition-colors duration-180">
          {theme.descriptor}
        </p>
      </div>
    </motion.div>
  );
}
