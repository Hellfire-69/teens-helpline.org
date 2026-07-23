"use client";


import { type Avatar } from "@/stores/onboardingStore";

interface CompanionProps {
  id: Avatar;
  size?: number;
  className?: string;
  animate?: boolean;
}

export function Companion({ id, size = 64, className = "", animate = true }: CompanionProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    className: `${className} ${animate ? "animate-pulse" : ""}`,
    style: { animationDuration: "4s" },
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };

  switch (id) {
    case "lumina":
      return (
        <svg {...commonProps}>
          <circle cx="50" cy="50" r="40" fill="var(--color-aurora-dawn)" opacity="0.8" />
          <circle cx="35" cy="40" r="6" fill="#1C1B29" />
          <circle cx="65" cy="40" r="6" fill="#1C1B29" />
          <path d="M40 65 Q50 75 60 65" stroke="#1C1B29" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "bramble":
      return (
        <svg {...commonProps}>
          <rect x="15" y="20" width="70" height="60" rx="30" fill="var(--color-aurora-sea)" opacity="0.9" />
          <circle cx="35" cy="45" r="5" fill="#1C1B29" />
          <circle cx="65" cy="45" r="5" fill="#1C1B29" />
          <path d="M45 60 Q50 65 55 60" stroke="#1C1B29" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "pip":
      return (
        <svg {...commonProps}>
          <path d="M20 70 Q50 10 80 70 Q50 90 20 70" fill="var(--color-aurora-dusk)" opacity="0.85" />
          <circle cx="40" cy="60" r="5" fill="#FAF9FC" />
          <circle cx="60" cy="60" r="5" fill="#FAF9FC" />
          <path d="M45 72 Q50 78 55 72" stroke="#FAF9FC" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "zephyr":
      return (
        <svg {...commonProps}>
          <ellipse cx="50" cy="50" rx="45" ry="30" fill="var(--color-aurora-blush)" opacity="0.85" />
          <circle cx="35" cy="45" r="5" fill="#1C1B29" />
          <circle cx="65" cy="45" r="5" fill="#1C1B29" />
          <path d="M42 60 Q50 65 58 60" stroke="#1C1B29" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "orion":
      return (
        <svg {...commonProps}>
          <polygon points="50,15 85,80 15,80" fill="var(--color-ink-300)" opacity="0.7" />
          <circle cx="40" cy="60" r="5" fill="#1C1B29" />
          <circle cx="60" cy="60" r="5" fill="#1C1B29" />
          <path d="M45 70 L55 70" stroke="#1C1B29" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "nova-spark":
      return (
        <svg {...commonProps}>
          <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="var(--color-aurora-dawn)" opacity="0.9" />
          <circle cx="50" cy="50" r="4" fill="#1C1B29" />
        </svg>
      );
    case "ember":
      return (
        <svg {...commonProps}>
          <circle cx="50" cy="60" r="35" fill="var(--color-signal-crisis)" opacity="0.7" />
          <circle cx="50" cy="30" r="20" fill="var(--color-signal-crisis)" opacity="0.5" />
          <circle cx="38" cy="55" r="4" fill="#FAF9FC" />
          <circle cx="62" cy="55" r="4" fill="#FAF9FC" />
          <path d="M45 68 Q50 72 55 68" stroke="#FAF9FC" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "moss":
      return (
        <svg {...commonProps}>
          <rect x="20" y="20" width="60" height="60" rx="20" fill="var(--color-signal-safe)" opacity="0.8" />
          <circle cx="35" cy="40" r="4" fill="#1C1B29" />
          <circle cx="65" cy="40" r="4" fill="#1C1B29" />
          <path d="M40 60 Q50 68 60 60" stroke="#1C1B29" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "puddle":
      return (
        <svg {...commonProps}>
          <path d="M20 60 C 20 20, 80 20, 80 60 C 80 90, 20 90, 20 60 Z" fill="var(--color-aurora-sea)" opacity="0.75" />
          <circle cx="35" cy="50" r="4" fill="#1C1B29" />
          <circle cx="65" cy="50" r="4" fill="#1C1B29" />
          <path d="M42 70 Q50 75 58 70" stroke="#1C1B29" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...commonProps}>
          <path d="M30 65 A 15 15 0 0 1 30 35 A 25 25 0 0 1 75 40 A 15 15 0 0 1 70 70 Z" fill="var(--color-paper-100)" opacity="0.9" stroke="var(--color-ink-300)" strokeWidth="2" />
          <circle cx="45" cy="50" r="4" fill="#1C1B29" />
          <circle cx="65" cy="50" r="4" fill="#1C1B29" />
          <path d="M50 60 Q55 65 60 60" stroke="#1C1B29" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="50" cy="50" r="40" fill="var(--color-ink-300)" opacity="0.2" />
          <circle cx="50" cy="50" r="10" fill="var(--color-ink-300)" opacity="0.5" />
        </svg>
      );
  }
}
