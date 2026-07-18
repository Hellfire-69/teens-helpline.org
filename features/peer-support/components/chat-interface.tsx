"use client";

import { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { usePeerSession } from "../hooks/use-peer-session";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";

export function ChatInterface() {
  const session = usePeerSession();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.messages]);

  if (session.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-aurora-blush" />
        <p>Connecting to a secure session...</p>
      </div>
    );
  }

  if (session.error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="bg-destructive/10 text-destructive p-4 rounded-xl max-w-sm">
          <p className="font-semibold mb-1">Connection Error</p>
          <p className="text-sm">{session.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="bg-white/80 border-b border-border/40 px-6 py-4 flex items-center justify-between z-10 backdrop-blur-md">
        <div>
          <h2 className="font-fraunces text-lg font-medium text-foreground">Peer Support</h2>
          <div className="flex items-center gap-2 text-sm mt-0.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${session.hasPeerJoined ? 'bg-green-400' : 'bg-aurora-blush'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${session.hasPeerJoined ? 'bg-green-500' : 'bg-aurora-blush'}`}></span>
            </span>
            <span className="text-muted-foreground font-medium">
              {session.hasPeerJoined ? "Connected with Peer" : "Waiting for a peer to join..."}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {session.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-3 p-4">
            <div className="bg-aurora-blush/10 p-4 rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aurora-blush"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
            </div>
            <p className="max-w-xs text-sm">
              Your session is active. A trained peer supporter will join shortly. Feel free to say hello!
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-end min-h-full">
            {session.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} sessionHook={session} />
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/60 border-t border-border/40 backdrop-blur-md">
        <ChatInput onSendMessage={session.sendMessage} />
      </div>
    </div>
  );
}
