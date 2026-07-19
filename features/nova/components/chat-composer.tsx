"use client";

import { useState, useRef, useEffect } from "react";
import { useNovaStore } from "../store";
import { PERSONA_THEMES } from "../persona-theme";
import { PaperPlaneRight, Stop } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import TextareaAutosize from "react-textarea-autosize";

export function ChatComposer() {
  const [input, setInput] = useState("");
  const { sendMessage, status, activePersona, setStatus } = useNovaStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const activeTheme = PERSONA_THEMES[activePersona] || PERSONA_THEMES.big_brother;

  const isResponding = status === "responding";

  useEffect(() => {
    // Focus the textarea when the component mounts or finishes responding
    if (!isResponding && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isResponding, setStatus]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isResponding) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 z-40 px-4 md:px-space-8 flex justify-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30, delay: 0.2 }}
        className="max-w-3xl w-full"
      >
        <form 
          onSubmit={handleSubmit}
          className={`relative flex items-end gap-space-3 bg-white/80 dark:bg-black/60 backdrop-blur-[24px] shadow-sm border border-white/40 dark:border-white/10 rounded-radius-2xl p-2 pl-4 md:p-3 md:pl-5 transition-all duration-base focus-within:shadow-md focus-within:ring-2 ${activeTheme.focusRingClass}`}
        >
          <TextareaAutosize
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (status === "resting") setStatus("listening");
            }}
            onBlur={() => {
              if (status === "listening") setStatus("resting");
            }}
            placeholder="Message Nova..."
            minRows={1}
            maxRows={5}
            className="flex-1 max-h-[160px] bg-transparent outline-none text-type-body-md text-ink-900 dark:text-white placeholder:text-ink-400 resize-none py-2 md:py-3 leading-relaxed scrollbar-hide"
            data-testid="composer-input"
          />
          
          <div className="shrink-0 mb-1">
            <AnimatePresence mode="wait">
              {isResponding ? (
                <motion.button
                  key="stop"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  type="button"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-radius-full flex items-center justify-center bg-ink-900 dark:bg-white text-white dark:text-ink-900 shadow-sm"
                >
                  <Stop weight="fill" className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="sr-only">Stop generating</span>
                </motion.button>
              ) : (
                <motion.button
                  key="send"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                  type="submit"
                  onClick={handleSubmit}
                  data-testid="send-button"
                  disabled={!input.trim()}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-radius-full flex items-center justify-center bg-aurora-sea text-white disabled:opacity-40 disabled:bg-ink-200 dark:disabled:bg-ink-800 disabled:text-ink-400 dark:disabled:text-ink-500 transition-colors shadow-sm"
                >
                  <PaperPlaneRight weight="fill" className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="sr-only">Send message</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
        <p className="text-center mt-3 text-[11px] text-ink-400 font-medium">
          Nova can make mistakes. Always reach out to a professional in an emergency.
        </p>
      </motion.div>
    </div>
  );
}
