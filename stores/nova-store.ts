/**
 * Nova UI state — typing indicator, current escalation flag, active persona. In-memory only — anonymous conversation state dies with the tab per ADR-006.
 *
 * State shape and actions implemented on the corresponding feature branch.
 * Stub exports the store name so imports resolve without errors at scaffold stage.
 */
import { create } from "zustand";

// Placeholder state shape — replaced with real types on the feature branch
type NovaState = {
  _placeholder: null;
};

export const useNovaStore = create<NovaState>(() => ({
  _placeholder: null,
}));
