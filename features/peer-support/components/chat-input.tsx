"use client";

import { useState, useRef, useEffect } from "react";
import { PaperPlaneRight, CircleNotch } from "@phosphor-icons/react";
import TextareaAutosize from "react-textarea-autosize";
import { motion, AnimatePresence } from "motion/react";

export function ChatInput({
  onSendMessage,
  disabled
}: {
  onSendMessage: (msg: string) => Promise<void>;
  disabled?: boolean;
}) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled && !isSending && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled, isSending]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim() || disabled || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(content);
      setContent("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-end bg-ink-50 dark:bg-ink-900/50 rounded-radius-2xl border border-border shadow-sm p-2 pl-4 focus-within:ring-2 focus-within:ring-aurora-blush/50 focus-within:border-aurora-blush/30 transition-all"
    >
      <TextareaAutosize
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled || isSending}
        minRows={1}
        maxRows={6}
        className="flex-1 bg-transparent border-none outline-none py-2 text-type-body-md text-ink-900 dark:text-white placeholder:text-ink-400 resize-none leading-relaxed scrollbar-hide"
      />
      <div className="shrink-0 mb-1 ml-2">
        <AnimatePresence mode="wait">
          {isSending ? (
            <motion.div
              key="loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="h-10 w-10 flex items-center justify-center text-aurora-blush"
            >
              <CircleNotch weight="bold" className="w-5 h-5 animate-spin" />
            </motion.div>
          ) : (
            <motion.button
              key="send"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: content.trim() && !disabled ? 1.05 : 1 }}
              whileTap={{ scale: content.trim() && !disabled ? 0.95 : 1 }}
              type="submit"
              disabled={!content.trim() || disabled}
              className="rounded-radius-full h-10 w-10 flex items-center justify-center bg-aurora-blush text-white shadow-sm disabled:opacity-40 disabled:bg-ink-200 dark:disabled:bg-ink-800 disabled:text-ink-400 dark:disabled:text-ink-500 transition-colors"
            >
              <PaperPlaneRight weight="fill" className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
