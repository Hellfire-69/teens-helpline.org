/**
 * Onboarding state — current step, avatar choice, selected role, mood-at-onboarding, stated concern. In-memory only — never written to browser storage (privacy, TRD §20).
 *
 * State shape and actions implemented on the corresponding feature branch.
 * Stub exports the store name so imports resolve without errors at scaffold stage.
 */
import { create } from "zustand";

// Placeholder state shape — replaced with real types on the feature branch
type OnboardingState = {
  _placeholder: null;
};

export const useOnboardingStore = create<OnboardingState>(() => ({
  _placeholder: null,
}));
