import { create } from "zustand";
import type { PersonaId } from "./schema";

export type Message = {
  role: "user" | "assistant";
  content: string;
  isEscalated?: boolean;
};

type NovaState = {
  messages: Message[];
  status: "resting" | "listening" | "responding";
  conversationId: string | null;
  error: string | null;
  isEscalated: boolean; // Controls crisis banner display
  activePersona: PersonaId;
  
  setMessages: (messages: Message[]) => void;
  setActivePersona: (persona: PersonaId) => void;
  setConversationId: (id: string | null) => void;
  setStatus: (status: "resting" | "listening" | "responding") => void;
  setError: (error: string | null) => void;
  
  sendMessage: (content: string) => Promise<void>;
  resetChat: () => void;
};

export const useNovaStore = create<NovaState>((set, get) => ({
  messages: [],
  status: "resting",
  conversationId: null,
  error: null,
  isEscalated: false,
  activePersona: "big_brother",

  setMessages: (messages) => set({ messages }),
  setActivePersona: (persona) => set({ activePersona: persona }),
  setConversationId: (id) => set({ conversationId: id }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),

  sendMessage: async (content: string) => {
    const { messages, conversationId } = get();
    
    // Add user message immediately
    const newMessages: Message[] = [...messages, { role: "user", content }];
    set({ messages: newMessages, status: "responding", error: null });

    try {
      // Recent history payload for anonymous context
      const recentHistory = newMessages.slice(-7, -1); // Exclude the one just sent

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          conversationId: conversationId || undefined,
          persona: get().activePersona,
          recentHistory: recentHistory.length > 0 ? recentHistory : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to fetch response from Nova");
      }

      set((state) => ({
        messages: [
          ...state.messages,
          { 
            role: "assistant", 
            content: data.data.reply,
            isEscalated: data.data.escalation
          }
        ],
        conversationId: data.data.conversationId || state.conversationId,
        isEscalated: state.isEscalated || data.data.escalation,
        status: "resting"
      }));

    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : "An unexpected error occurred",
        status: "resting"
      });
    }
  },

  resetChat: () => set({
    messages: [],
    status: "resting",
    conversationId: null,
    error: null,
    isEscalated: false
  })
}));
