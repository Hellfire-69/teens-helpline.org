import { create } from "zustand";

import type { JournalEntry } from "./types";

interface JournalState {
  entries: JournalEntry[];
  addEntry: (content: string, moodEntryId?: string | null) => JournalEntry;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
}

export const useJournalStore = create<JournalState>((set) => ({
  entries: [],
  addEntry: (content, moodEntryId = null) => {
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      user_id: "anonymous", // In-memory only
      content,
      mood_entry_id: moodEntryId,
      risk_flagged: false, // In-memory entries are checked before adding
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    set((state) => ({ entries: [newEntry, ...state.entries] }));
    return newEntry;
  },
  removeEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
  clearEntries: () => set({ entries: [] }),
}));
