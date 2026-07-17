/**
 * Mood state — current session's mood entry and optional note. In-memory for anonymous; synced to Supabase only for logged-in users via features/mood-engine/service.ts.
 *
 * State shape and actions implemented on the corresponding feature branch.
 * Stub exports the store name so imports resolve without errors at scaffold stage.
 */
import { create } from "zustand";

// Placeholder state shape — replaced with real types on the feature branch
type MoodState = {
  _placeholder: null;
};

export const useMoodStore = create<MoodState>(() => ({
  _placeholder: null,
}));
