/**
 * Mood state — current session's mood entry and optional note.
 * In-memory for anonymous; synced to Supabase only for logged-in users via API.
 * TRD §20 explicitly forbids localStorage here.
 */
import { create } from "zustand";

type MoodState = {
  moodValue: string | null;
  note: string | null;
  setMood: (moodValue: string, note?: string) => void;
  clearMood: () => void;
};

export const useMoodStore = create<MoodState>((set) => ({
  moodValue: null,
  note: null,
  setMood: (moodValue, note = "") => set({ moodValue, note }),
  clearMood: () => set({ moodValue: null, note: null }),
}));
