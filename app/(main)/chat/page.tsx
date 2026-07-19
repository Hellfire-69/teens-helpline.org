"use client";

import { useEffect, useState, useRef } from "react";
import { useNovaStore } from "@/features/nova/store";
import { NovaAvatar } from "@/features/nova/components/nova-avatar";
import { ChatMessage } from "@/features/nova/components/chat-message";
import { ChatComposer } from "@/features/nova/components/chat-composer";
import { PersonaSwitcher } from "@/features/nova/components/persona-switcher";
import { PERSONA_THEMES } from "@/features/nova/persona-theme";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { WarningCircle, Lightning, Leaf, Brain } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const { messages, setMessages, setConversationId, sendMessage, isEscalated, error, status, setActivePersona, activePersona } = useNovaStore();
  const [initialLoading, setInitialLoading] = useState(true);
  const [waveTrigger, setWaveTrigger] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activePersona) {
      setWaveTrigger(prev => prev + 1);
    }
  }, [activePersona]);

  useEffect(() => {
    // Fetch conversation history on mount
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chat/history");
        const data = await res.json();
        
        if (data.success) {
          setConversationId(data.data.conversationId);
          setMessages(data.data.messages || []);
          if (data.data.preferredPersona) {
            setActivePersona(data.data.preferredPersona);
          }
        }
      } catch (err) {
        console.error("Failed to load chat history", err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchHistory();
  }, [setConversationId, setMessages, setActivePersona]);

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

  const activeTheme = PERSONA_THEMES[activePersona] || PERSONA_THEMES.big_brother;
  const chipIcons = [Lightning, Leaf, Brain];
  const starterChips = activeTheme.starterPrompts.map((text, idx) => ({
    text,
    icon: chipIcons[idx] || Brain
  }));

  return (
    <div className="relative flex flex-col h-[calc(100vh-140px)] w-full overflow-hidden pt-4">
      {/* 1. Visual connection wave sweeping from the selector to the entire scene */}
      <AnimatePresence>
        {!shouldReduceMotion && (
          <motion.div
            key={`wave-${waveTrigger}`}
            initial={{ scale: 0.05, opacity: 0 }}
            animate={{ 
              scale: [0.05, 3],
              opacity: [0, 0.45, 0.25, 0]
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[60dvw] h-[60dvw] rounded-radius-full pointer-events-none -z-10 blur-[110px]"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${activeTheme.colorHex} 0%, ${activeTheme.secondaryColorHex}50 40%, transparent 80%)`,
              transformOrigin: "top right"
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. Dynamic Ambient Background Mesh Glow (Breathes slowly, reacts to status) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden -z-20"
        animate={{
          opacity: status === "responding" 
            ? 0.4 
            : status === "listening" 
              ? 0.2 
              : 0.3,
          scale: shouldReduceMotion ? 1 : (status === "responding" ? 1.03 : status === "listening" ? 0.97 : 1)
        }}
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 20 }}
      >
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-radius-full blur-[130px]"
          animate={shouldReduceMotion ? { backgroundColor: activeTheme.colorHex } : { 
            backgroundColor: activeTheme.colorHex,
            scale: [1, 1.05, 0.95, 1],
            x: [0, 15, -15, 0],
            y: [0, -10, 10, 0]
          }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            backgroundColor: { type: "spring", stiffness: 60, damping: 24 },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute top-[25%] -right-[15%] w-[65%] h-[65%] rounded-radius-full blur-[140px]"
          animate={shouldReduceMotion ? { backgroundColor: activePersona === "mentor" ? "#FAF9FC" : "#6B5B95" } : { 
            backgroundColor: activePersona === "mentor" ? "#FAF9FC" : "#6B5B95",
            scale: [1, 0.95, 1.05, 1],
            x: [0, -20, 20, 0],
            y: [0, 15, -15, 0]
          }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            backgroundColor: { type: "spring", stiffness: 50, damping: 22 },
            scale: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 28, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 26, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute -bottom-[15%] left-[10%] w-[55%] h-[55%] rounded-radius-full blur-[120px]"
          animate={shouldReduceMotion ? { backgroundColor: activePersona === "best_friend" ? "#FAF9FC" : activeTheme.colorHex } : { 
            backgroundColor: activePersona === "best_friend" ? "#FAF9FC" : activeTheme.colorHex,
            scale: [1, 1.03, 0.97, 1],
            x: [0, 10, -10, 0],
            y: [0, -8, 8, 0]
          }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            backgroundColor: { type: "spring", stiffness: 55, damping: 20 },
            scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>

      <div className="absolute top-2 right-4 z-50 md:top-4 md:right-8">
        <PersonaSwitcher />
      </div>
      
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
                    transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.15 + idx * 0.08, type: "spring", stiffness: 300, damping: 30 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -2, borderColor: activeTheme.colorHex }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    onClick={() => sendMessage(chip.text)}
                    aria-label={`Start conversation: ${chip.text}`}
                    className={`flex flex-col items-center text-center p-space-4 bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 border border-white/20 dark:border-white/10 rounded-radius-lg shadow-sm transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      activePersona === "big_brother" ? "focus-visible:ring-aurora-sea" :
                      activePersona === "big_sister" ? "focus-visible:ring-aurora-blush" :
                      activePersona === "mentor" ? "focus-visible:ring-aurora-dusk" :
                      "focus-visible:ring-aurora-dawn"
                    }`}
                  >
                    <chip.icon weight="duotone" className={`w-6 h-6 mb-space-3 ${activeTheme.textClass}`} aria-hidden="true" />
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
