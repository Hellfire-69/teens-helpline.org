import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export type Message = {
  id: string;
  content: string;
  sender_ref: "user" | "anonymous" | "peer";
  created_at: string;
};

export function usePeerSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPeerJoined, setHasPeerJoined] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const res = await fetch("/api/peer-support/session", { method: "POST" });
        const json = await res.json();
        
        if (!json.success) {
          throw new Error(json.error?.message || "Failed to join session");
        }
        
        if (mounted) {
          setSessionId(json.data.id);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initSession();

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    // Subscribe to realtime messages
    const channel = supabase
      .channel(`peer_messages:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "peer_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
          
          if (newMessage.sender_ref === "peer") {
            setHasPeerJoined(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, supabase]);

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId) return;
    
    const res = await fetch("/api/peer-support/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, content })
    });
    const json = await res.json();

    if (!json.success) {
      throw new Error(json.error?.message || "Failed to send message");
    }

    if (json.data.escalated) {
      // Add the local escalation message directly to UI
      const escalationMsg: Message = {
        id: `escalation-${Date.now()}`,
        content: json.data.message,
        sender_ref: "peer", // Display it as coming from the system/peer side
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, escalationMsg]);
    } else {
      // Realtime subscription will receive the actual message from the DB
    }
  }, [sessionId]);

  const report = useCallback(async (messageId: string, reasonSlug: string, details?: string) => {
    const res = await fetch("/api/peer-support/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId, reasonSlug, details })
    });
    const json = await res.json();
    if (!json.success) {
      throw new Error(json.error?.message || "Failed to report message");
    }
  }, []);

  return {
    sessionId,
    messages,
    loading,
    error,
    hasPeerJoined,
    sendMessage,
    report
  };
}
