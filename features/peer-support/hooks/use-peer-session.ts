import { useState, useEffect, useCallback, useRef } from "react";
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
  const [sessionClosed, setSessionClosed] = useState(false);
  const [peerLeft, setPeerLeft] = useState(false);
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const initPromise = useRef<Promise<{ success: boolean; data?: { id: string; status: string }; error?: { message: string } }> | null>(null);

  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      if (!initPromise.current) {
        initPromise.current = fetch("/api/peer-support/session", { method: "POST" }).then(res => res.json());
      }

      try {
        const [{ data: authData }, json] = await Promise.all([
          supabase.auth.getUser(),
          initPromise.current
        ]);
        
        if (mounted) {
          setMyUserId(authData.user?.id || null);
        }

        if (!json.success) {
          throw new Error(json.error?.message || "Failed to join session");
        }
        
        if (mounted) {
          setSessionId(json.data.id);
          if (json.data.status === "active") {
            setHasPeerJoined(true);
          }
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
  }, [supabase]);

  useEffect(() => {
    if (!sessionId) return;

    // Subscribe to realtime messages
    const messageChannel = supabase
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

    // Subscribe to session status changes
    const sessionChannel = supabase
      .channel(`peer_session_status:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "peer_support_sessions",
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          const updatedSession = payload.new;
          if (updatedSession.status === "active") {
            setHasPeerJoined(true);
          } else if (updatedSession.status === "closed") {
            setPeerLeft(true);
            setSessionClosed(true);
          } else if (updatedSession.status === "flagged") {
            setSessionClosed(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(sessionChannel);
    };
  }, [sessionId, supabase]);

  const leaveSession = useCallback(async () => {
    if (!sessionId) return;
    try {
      await fetch("/api/peer-support/session", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId })
      });
      setSessionClosed(true);
    } catch (err) {
      console.error("Failed to leave session", err);
    }
  }, [sessionId]);

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
    sessionClosed,
    peerLeft,
    myUserId,
    leaveSession,
    sendMessage,
    report
  };
}
