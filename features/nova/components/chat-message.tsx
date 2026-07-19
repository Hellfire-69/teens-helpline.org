"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Message } from "../store";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  isLatestNovaMessage?: boolean;
}

export function ChatMessage({ message, isLatestNovaMessage }: ChatMessageProps) {
  const isUser = message.role === "user";
  
  // Minimal stream simulation for the very latest Nova message.
  const [displayedText, setDisplayedText] = useState(isUser || !isLatestNovaMessage ? message.content : "");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isUser || !isLatestNovaMessage || shouldReduceMotion) {
      setDisplayedText(message.content);
      return;
    }

    // Reset and stream text
    setDisplayedText("");
    let i = 0;
    const words = message.content.split(" ");
    
    const interval = setInterval(() => {
      if (i < words.length) {
        const currentWord = words[i];
        setDisplayedText(prev => prev + (prev ? " " : "") + currentWord);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60); // Roughly ~160 wpm natural reading pace simulation

    return () => clearInterval(interval);
  }, [message.content, isUser, isLatestNovaMessage, shouldReduceMotion]);

  if (isUser) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex justify-end mb-space-6 w-full" 
        data-testid="chat-message-user"
      >
        <div className="max-w-[85%] md:max-w-[75%] bg-ink-900 dark:bg-white text-white dark:text-ink-900 shadow-sm rounded-[24px] rounded-tr-[8px] px-space-5 py-space-3 text-type-body-md leading-relaxed">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start mb-space-8 w-full" 
      data-testid="chat-message-nova"
    >
      <div className={cn(
        "max-w-[95%] md:max-w-[85%] text-type-body-md text-ink-900 dark:text-white leading-relaxed prose dark:prose-invert prose-p:leading-relaxed prose-a:text-aurora-sea hover:prose-a:text-aurora-sea/80 prose-strong:font-semibold prose-ul:my-2 prose-li:my-0.5",
        !isLatestNovaMessage && "opacity-90"
      )}>
        <ReactMarkdown>{displayedText}</ReactMarkdown>
      </div>
    </motion.div>
  );
}
