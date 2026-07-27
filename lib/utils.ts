import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const easing = {
  standard: { type: "spring", stiffness: 300, damping: 30 } as const,
  gentle: { type: "spring", stiffness: 200, damping: 26, bounce: 0.1 } as const,
  settle: { type: "spring", stiffness: 260, damping: 34, bounce: 0 } as const,
  snappy: { type: "spring", stiffness: 420, damping: 32 } as const,
};

export const duration = {
  instant: 0,
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
};
