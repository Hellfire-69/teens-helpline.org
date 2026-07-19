import type { PersonaId } from "./schema";

export interface PulseProfile {
  restingDuration: number;
  restingScale: number;
  listeningScale: number;
  respondingScale: number;
}

export interface PersonaTheme {
  id: PersonaId;
  label: string;
  descriptor: string;
  colorClass: string;
  textClass: string;
  colorHex: string;
  secondaryColorHex: string;
  glowClass: string;
  glowStrength: string;
  bloomIntensity: string;
  focusRingClass: string;
  borderColorClass: string;
  pulseProfile: PulseProfile;
  meshColors: string[]; // Tailwind class gradient stops or Hex values for custom mesh
  starterPrompts: string[];
}

export const PERSONA_THEMES: Record<PersonaId, PersonaTheme> = {
  big_brother: {
    id: "big_brother",
    label: "Big Brother",
    descriptor: "Direct. Protective. Grounded.",
    colorClass: "bg-aurora-sea",
    textClass: "text-aurora-sea",
    colorHex: "#5B9AA0",
    secondaryColorHex: "#6B5B95",
    glowClass: "shadow-glow-sea",
    glowStrength: "rgba(91,154,160,0.35)",
    bloomIntensity: "opacity-25 blur-[110px]",
    focusRingClass: "focus-within:ring-aurora-sea/30 focus-within:border-aurora-sea",
    borderColorClass: "border-aurora-sea",
    pulseProfile: {
      restingDuration: 5,
      restingScale: 1.03,
      listeningScale: 0.94,
      respondingScale: 1.10,
    },
    meshColors: ["rgba(91,154,160,0.12)", "rgba(107,91,149,0.05)", "rgba(242,166,90,0.02)"],
    starterPrompts: [
      "I need help getting back on track.",
      "Can we make a plan for school stress?",
      "I need a straight answer on conflict."
    ]
  },
  big_sister: {
    id: "big_sister",
    label: "Big Sister",
    descriptor: "Warm. Gentle. Validating.",
    colorClass: "bg-aurora-blush",
    textClass: "text-aurora-blush",
    colorHex: "#E8A0A0",
    secondaryColorHex: "#F2A65A",
    glowClass: "shadow-glow-blush",
    glowStrength: "rgba(232,160,160,0.4)",
    bloomIntensity: "opacity-35 blur-[130px]",
    focusRingClass: "focus-within:ring-aurora-blush/30 focus-within:border-aurora-blush",
    borderColorClass: "border-aurora-blush",
    pulseProfile: {
      restingDuration: 4,
      restingScale: 1.06,
      listeningScale: 0.92,
      respondingScale: 1.14,
    },
    meshColors: ["rgba(232,160,160,0.15)", "rgba(107,91,149,0.06)", "rgba(91,154,160,0.04)"],
    starterPrompts: [
      "I've been carrying a lot lately.",
      "I feel like crying and don't know why.",
      "Can we just take a deep breath together?"
    ]
  },
  mentor: {
    id: "mentor",
    label: "Mentor",
    descriptor: "Calm. Thoughtful. Reflective.",
    colorClass: "bg-aurora-dusk",
    textClass: "text-aurora-dusk",
    colorHex: "#6B5B95",
    secondaryColorHex: "#5B9AA0",
    glowClass: "shadow-glow-dusk",
    glowStrength: "rgba(107,91,149,0.28)",
    bloomIntensity: "opacity-20 blur-[120px]",
    focusRingClass: "focus-within:ring-aurora-dusk/30 focus-within:border-aurora-dusk",
    borderColorClass: "border-aurora-dusk",
    pulseProfile: {
      restingDuration: 6,
      restingScale: 1.02,
      listeningScale: 0.95,
      respondingScale: 1.08,
    },
    meshColors: ["rgba(107,91,149,0.14)", "rgba(91,154,160,0.07)", "rgba(232,160,160,0.03)"],
    starterPrompts: [
      "Can we think through something together?",
      "I'm feeling stuck on a big decision.",
      "How do I set boundaries with people?"
    ]
  },
  best_friend: {
    id: "best_friend",
    label: "Best Friend",
    descriptor: "Casual. Supportive. Easygoing.",
    colorClass: "bg-aurora-dawn",
    textClass: "text-aurora-dawn",
    colorHex: "#F2A65A",
    secondaryColorHex: "#E8A0A0",
    glowClass: "shadow-glow-dawn",
    glowStrength: "rgba(242,166,90,0.32)",
    bloomIntensity: "opacity-30 blur-[100px]",
    focusRingClass: "focus-within:ring-aurora-dawn/30 focus-within:border-aurora-dawn",
    borderColorClass: "border-aurora-dawn",
    pulseProfile: {
      restingDuration: 3.2,
      restingScale: 1.04,
      listeningScale: 0.93,
      respondingScale: 1.12,
    },
    meshColors: ["rgba(242,166,90,0.12)", "rgba(232,160,160,0.06)", "rgba(91,154,160,0.03)"],
    starterPrompts: [
      "Can I vent for a minute?",
      "Some drama happened at school today.",
      "I need someone to celebrate a small win with!"
    ]
  }
};
