/**
 * Global UI state — quick-exit triggered state, active modal/dialog. In-memory only.
 *
 * State shape and actions implemented on the corresponding feature branch.
 * Stub exports the store name so imports resolve without errors at scaffold stage.
 */
import { create } from "zustand";

// Placeholder state shape — replaced with real types on the feature branch
type UiState = {
  _placeholder: null;
};

export const useUiStore = create<UiState>(() => ({
  _placeholder: null,
}));
