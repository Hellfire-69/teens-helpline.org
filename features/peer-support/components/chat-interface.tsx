"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import { CircleNotch, ShieldCheck, Handshake, WarningCircle } from "@phosphor-icons/react";
import { usePeerSession } from "../hooks/use-peer-session";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { cn } from "@/lib/utils";

// Not using motion here — reduced to CSS transitions only for performance
// The backdrop-blur is only on the outer container, not layered inside
export const ChatInterface = memo(function ChatInterface() {
  const session = usePeerSession();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Stable callback — won't recreate on each render
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [session.messages, scrollToBottom]);

  if (session.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] gap-4" role="status" aria-live="polite">
        <CircleNotch weight="bold" className="h-8 w-8 animate-spin text-aurora-blush" aria-hidden="true" />
        <p className="text-ink-400 font-medium tracking-widest uppercase text-xs">Connecting securely</p>
      </div>
    );
  }

  if (session.error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] p-6 text-center" role="alert">
        <div className="bg-signal-error/10 border border-signal-error/20 text-signal-error p-space-6 rounded-radius-lg max-w-sm">
          <WarningCircle weight="fill" className="w-8 h-8 mx-auto mb-space-3" aria-hidden="true" />
          <p className="font-semibold text-type-title-md mb-1">Connection Error</p>
          <p className="text-type-body-md opacity-90">{session.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-80px)] bg-white/70 dark:bg-night-900/70 border border-white/30 dark:border-white/10 rounded-radius-2xl shadow-sm overflow-hidden w-full max-w-4xl mx-auto"
      style={{ backdropFilter: "blur(16px)" }}
    >
      {/* Header — single blur layer, no nested backdrop */}
      <header className="bg-white/90 dark:bg-night-950/90 border-b border-border/40 px-5 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-fraunces text-type-title-md font-semibold text-ink-900 dark:text-white flex items-center gap-2">
            <Handshake weight="duotone" className="w-5 h-5 text-aurora-blush" aria-hidden="true" />
            Peer Support Session
          </h1>
          <div className="flex items-center gap-2 mt-1" aria-live="polite" aria-atomic="true">
            <span
              className={cn(
                "relative flex h-2.5 w-2.5",
              )}
              aria-hidden="true"
            >
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                session.hasPeerJoined ? "bg-signal-safe" : "bg-aurora-blush"
              )} />
              <span className={cn(
                "relative inline-flex rounded-full h-2.5 w-2.5",
                session.hasPeerJoined ? "bg-signal-safe" : "bg-aurora-blush"
              )} />
            </span>
            <span className="text-type-body-sm font-medium text-ink-600 dark:text-ink-300">
              {session.hasPeerJoined ? "Connected with a trained peer" : "Waiting for a peer to join…"}
            </span>
          </div>
        </div>
        
        {session.hasPeerJoined && (
          <div className="hidden md:flex items-center gap-1.5 bg-aurora-blush/10 text-aurora-blush px-3 py-1.5 rounded-radius-full text-[11px] font-bold uppercase tracking-wider" aria-label="This is a safe space">
            <ShieldCheck weight="fill" className="w-4 h-4" aria-hidden="true" />
            Safe Space
          </div>
        )}
      </header>

      {/* Messages — no blur here, reduces GPU composite layers */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-4 scroll-smooth"
        aria-label="Chat messages"
        aria-live="polite"
        aria-relevant="additions"
      >
        {session.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-space-4">
            <div className="bg-aurora-blush/10 p-space-6 rounded-radius-full">
              <Handshake weight="duotone" className="w-12 h-12 text-aurora-blush" aria-hidden="true" />
            </div>
            <h2 className="text-type-title-lg font-semibold text-ink-900 dark:text-white">Your session is active</h2>
            <p className="max-w-sm text-type-body-md text-ink-600 dark:text-ink-300 leading-relaxed">
              A trained peer supporter will join shortly. They're here to listen without judgment. Take your time.
            </p>
          </div>
        ) : (
          <div className="flex flex-col pb-4">
            {session.messages.map((msg, idx) => {
              const prevMsg = idx > 0 ? session.messages[idx - 1] : null;
              const isSequential = !!(prevMsg
                && prevMsg.sender_ref === msg.sender_ref
                && (new Date(msg.created_at).getTime() - new Date(prevMsg.created_at).getTime() < 5 * 60 * 1000));

              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  sessionHook={session}
                  isSequential={isSequential}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Input — no backdrop, keep it simple */}
      <div className="px-4 py-4 bg-white/80 dark:bg-night-950/80 border-t border-border/30 shrink-0">
        <ChatInput
          onSendMessage={session.sendMessage}
          disabled={!session.hasPeerJoined && session.messages.length > 0}
        />
      </div>
    </div>
  );
});
