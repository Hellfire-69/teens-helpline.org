"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import type { Message, usePeerSession } from "../hooks/use-peer-session";
import { ReportDialog } from "./report-dialog";
import { User, ShieldCheck } from "@phosphor-icons/react";
import { motion } from "motion/react";

interface MessageBubbleProps {
  message: Message;
  sessionHook: ReturnType<typeof usePeerSession>;
  isSequential?: boolean;
}

// Memoized to avoid re-renders when the message list grows
const MessageBubble = memo(function MessageBubble({
  message,
  sessionHook,
  isSequential = false
}: MessageBubbleProps) {
  let isMine = false;
  let senderName = "Peer Supporter";
  let isTrained = false;

  if (message.sender_ref.includes("::")) {
    const [senderId, ...nameParts] = message.sender_ref.split("::");
    isMine = senderId === sessionHook.myUserId;
    senderName = isMine ? "You" : nameParts.join("::");
    isTrained = !isMine;
  } else {
    // Fallback for old messages
    isMine = message.sender_ref === "user" || message.sender_ref === "anonymous";
    senderName = isMine ? "You" : "Peer Supporter";
    isTrained = !isMine;
  }

  const timestamp = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "group flex w-full relative px-4 md:px-space-6 py-1",
        !isSequential && "mt-space-4",
        isMine ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex gap-space-3 max-w-[85%] md:max-w-[75%]",
        isMine ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar column */}
        {!isSequential ? (
          <div className={cn(
            "shrink-0 w-8 h-8 rounded-radius-full flex items-center justify-center text-white shadow-sm mt-0.5 select-none",
            isMine ? "bg-aurora-sea" : "bg-aurora-blush"
          )} aria-hidden="true">
            {isMine
              ? <User weight="fill" className="w-4 h-4" />
              : <ShieldCheck weight="fill" className="w-4 h-4" />
            }
          </div>
        ) : (
          <div className="shrink-0 w-8 h-8" />
        )}

        {/* Content column */}
        <div className={cn("flex flex-col min-w-0", isMine ? "items-end" : "items-start")}>
          {!isSequential && (
            <div className={cn("flex items-center gap-2 mb-1", isMine ? "flex-row-reverse" : "flex-row")}>
              <span className={cn(
                "font-semibold text-type-body-sm leading-none",
                isMine ? "text-aurora-sea" : "text-aurora-blush"
              )}>
                {senderName}
              </span>
              {isTrained && (
                <span className="bg-aurora-blush/15 text-aurora-blush text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                  <ShieldCheck weight="fill" className="w-3 h-3" aria-hidden="true" />
                  Trained
                </span>
              )}
              <span className="text-[11px] text-ink-400 font-medium select-none">{timestamp}</span>
            </div>
          )}
          
          <div className={cn(
            "px-4 py-2.5 rounded-2xl relative group-hover:shadow-sm transition-shadow",
            isMine 
              ? "bg-aurora-sea/10 dark:bg-aurora-sea/20 text-ink-900 dark:text-white rounded-tr-sm" 
              : "bg-white dark:bg-night-900 border border-border shadow-sm text-ink-900 dark:text-white rounded-tl-sm"
          )}>
            <p className="text-type-body-md leading-relaxed break-words whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      </div>

      {/* Report action (only for peer messages) */}
      {!isMine && (
        <div className="absolute top-2 right-6 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-100">
          <div className="bg-white dark:bg-night-950 border border-border shadow-sm rounded-radius-md flex items-center p-0.5">
            <ReportDialog messageId={message.id} reporterHook={sessionHook} />
          </div>
        </div>
      )}
    </motion.div>
  );
});

export { MessageBubble };
