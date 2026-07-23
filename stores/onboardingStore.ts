import { create } from "zustand";

export type Role = "teen" | "parent" | null;
export type Avatar = "lumina" | "bramble" | "pip" | "zephyr" | "orion" | "nova-spark" | "ember" | "moss" | "puddle" | "cloud" | null;
export type Mood = "happy" | "okay" | "sad" | "overwhelmed" | "anxious" | null;
export type AgeBand = "13-15" | "16-19" | "Prefer not to say" | null;

interface OnboardingState {
  currentStep: number;
  role: Role;
  age_band: AgeBand;
  avatar: Avatar;
  mood: Mood;
  concern: string | null;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setRole: (role: Role) => void;
  setAgeBand: (age_band: AgeBand) => void;
  setAvatar: (avatar: Avatar) => void;
  setMood: (mood: Mood) => void;
  setConcern: (concern: string | null) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  role: null,
  age_band: null,
  avatar: null,
  mood: null,
  concern: null,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  setRole: (role) => set({ role }),
  setAgeBand: (age_band) => set({ age_band }),
  setAvatar: (avatar) => set({ avatar }),
  setMood: (mood) => set({ mood }),
  setConcern: (concern) => set({ concern }),
  reset: () => set({ currentStep: 0, role: null, age_band: null, avatar: null, mood: null, concern: null }),
}));
