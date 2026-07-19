"use client";

import { useEffect, useState, useRef } from "react";
import { useNovaStore } from "@/features/nova/store";
import { NovaAvatar } from "@/features/nova/components/nova-avatar";
import { ChatMessage } from "@/features/nova/components/chat-message";
import { ChatComposer } from "@/features/nova/components/chat-composer";
import { motion, AnimatePresence } from "motion/react";
import { WarningCircle, Lightning, Leaf, Brain } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const { messages, setMessages, setConversationId, sendMessage, isEscalated, error, status } = useNovaStore();
  const [initialLoading, setInitialLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch conversation history on mount
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chat/history");
        const data = await res.json();
        
        if (data.success) {
          setConversationId(data.data.conversationId);
          setMessages(data.data.messages || []);
        }
      } catch (err) {
        console.error("Failed to load chat history", err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchHistory();
  }, [setConversationId, setMessages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isEscalated, status]);

  if (initialLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
        <NovaAvatar />
        <p className="mt-4 text-ink-400 text-type-body-sm font-medium tracking-widest uppercase animate-pulse">Connecting</p>
      </div>
    );
  }

  const starterChips = [
    { text: "I'm feeling really overwhelmed right now", icon: Lightning },
    { text: "Can we practice a grounding exercise?", icon: Leaf },
    { text: "I need help untangling my thoughts", icon: Brain }
  ];

  return (
    <div className="relative flex flex-col h-[calc(100vh-140px)] w-full overflow-hidden pt-4">
      
      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto pb-48 px-4 md:px-space-8 scroll-smooth scrollbar-hide">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-start min-h-full">
          
          {messages.length === 0 && !error && (
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex-1 w-full flex flex-col items-center justify-center mt-12 md:mt-24"
            >
              <NovaAvatar />
              <h2 className="mt-space-8 text-type-display font-fraunces text-ink-900 dark:text-white mb-space-3 text-center">
                Hi, I'm Nova.
              </h2>
              <p className="text-type-body-lg text-ink-600 dark:text-ink-300 text-center max-w-md mb-space-12">
                This is a safe, completely confidential space. You can share whatever is on your mind without judgment.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-4 w-full">
                {starterChips.map((chip, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, type: "spring", stiffness: 300, damping: 30 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => sendMessage(chip.text)}
                    aria-label={`Start conversation: ${chip.text}`}
                    className="flex flex-col items-center text-center p-space-4 bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 border border-white/20 dark:border-white/10 rounded-radius-lg shadow-sm transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2"
                  >
                    <chip.icon weight="duotone" className="w-6 h-6 text-aurora-sea mb-space-3" aria-hidden="true" />
                    <span className="text-type-body-sm font-medium text-ink-900 dark:text-white leading-tight">{chip.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {error && messages.length === 0 && (
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              <div className="p-space-8 bg-paper-100 dark:bg-night-900 rounded-radius-lg border border-border/50 max-w-md text-center shadow-sm">
                <WarningCircle className="w-8 h-8 text-signal-error mx-auto mb-space-4" />
                <h3 className="text-type-title-md text-ink-900 dark:text-white mb-space-2">Nova is currently unavailable</h3>
                <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-space-6">
                  We're having trouble connecting to Nova right now. Please try again later, or explore our library of resources.
                </p>
                <Button asChild variant="secondary">
                  <Link href="/study-hub">Visit Study Hub</Link>
                </Button>
              </div>
            </div>
          )}

          <div className="w-full space-y-space-8 mt-space-8">
            {messages.map((msg, index) => {
              const isNova = msg.role === "assistant";
              const isLatestNova = isNova && index === messages.length - 1;

              return (
                <div key={index} className={`w-full flex ${isNova ? "justify-start gap-space-4" : "justify-end"}`}>
                  {isNova && (
                    <div className="shrink-0 mt-2 hidden sm:block">
                      <NovaAvatar />
                    </div>
                  )}
                  <ChatMessage message={msg} isLatestNovaMessage={isLatestNova} />
                </div>
              );
            })}
          </div>
          
          <div ref={bottomRef} className="h-8 w-full shrink-0" />
        </div>
      </div>

      {/* Floating Crisis Banner (Mid-chat Escalation) */}
      <AnimatePresence>
        {isEscalated && (
          <div className="absolute bottom-28 left-0 right-0 z-40 px-4 md:px-space-8 pointer-events-none flex justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="max-w-2xl w-full pointer-events-auto"
            >
              <div 
                role="alert" 
                aria-live="assertive" 
                data-testid="crisis-banner"
                className="bg-white dark:bg-night-900 border-2 border-signal-crisis shadow-glow-crisis rounded-radius-lg p-space-4 flex items-start gap-space-4 backdrop-blur-md"
              >
                <div className="w-10 h-10 rounded-radius-full bg-signal-crisis/10 flex items-center justify-center shrink-0">
                  <WarningCircle weight="fill" className="w-6 h-6 text-signal-crisis" />
                </div>
                <div className="flex-1">
                  <h4 className="text-type-title-sm font-semibold text-ink-900 dark:text-white mb-1">
                    Need immediate help? You're not alone.
                  </h4>
                  <p className="text-type-body-sm text-ink-600 dark:text-ink-300">
                    We noticed you might be in distress. Nova cannot provide crisis support, but there are people ready to help you 24/7.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ChatComposer />
    </div>
  );
}
