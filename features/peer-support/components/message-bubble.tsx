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
  const isMine = message.sender_ref === "user" || message.sender_ref === "anonymous";
  const senderName = isMine ? "You" : "Peer Supporter";
  const timestamp = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "group flex gap-space-4 px-4 md:px-space-6 py-1 hover:bg-ink-100/30 dark:hover:bg-ink-900/30 transition-colors relative",
        !isSequential && "mt-space-4"
      )}
    >
      {/* Avatar column */}
      {!isSequential ? (
        <div className={cn(
          "shrink-0 w-9 h-9 rounded-radius-full flex items-center justify-center text-white shadow-sm mt-0.5 select-none",
          isMine ? "bg-aurora-sea" : "bg-aurora-blush"
        )} aria-hidden="true">
          {isMine
            ? <User weight="fill" className="w-4 h-4" />
            : <ShieldCheck weight="fill" className="w-4 h-4" />
          }
        </div>
      ) : (
        <div className="shrink-0 w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <span className="text-[10px] text-ink-400 select-none">{timestamp}</span>
        </div>
      )}

      {/* Content column */}
      <div className="flex-1 min-w-0 pb-0.5">
        {!isSequential && (
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "font-semibold text-type-body-md leading-none",
              isMine ? "text-aurora-sea" : "text-aurora-blush"
            )}>
              {senderName}
            </span>
            {!isMine && (
              <span className="bg-aurora-blush/15 text-aurora-blush text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                <ShieldCheck weight="fill" className="w-3 h-3" aria-hidden="true" />
                Trained
              </span>
            )}
            <span className="text-xs text-ink-400 font-medium ml-1 select-none">{timestamp}</span>
          </div>
        )}
        <p className="text-type-body-md text-ink-900 dark:text-white leading-relaxed break-words whitespace-pre-wrap">
          {message.content}
        </p>
      </div>

      {/* Report action (only for peer messages) */}
      {!isMine && (
        <div className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-100">
          <div className="bg-white dark:bg-night-950 border border-border shadow-sm rounded-radius-md flex items-center p-0.5">
            <ReportDialog messageId={message.id} reporterHook={sessionHook} />
          </div>
        </div>
      )}
    </motion.div>
  );
});

export { MessageBubble };
