"use client";

import { useEffect, useState, useRef } from "react";
import { useNovaStore } from "@/features/nova/store";
import { NovaAvatar } from "@/features/nova/components/nova-avatar";
import { ChatMessage } from "@/features/nova/components/chat-message";
import { ChatComposer } from "@/features/nova/components/chat-composer";
import { PersonaSwitcher } from "@/features/nova/components/persona-switcher";
import { PersonaCard } from "@/features/nova/components/persona-card";
import { PERSONA_THEMES } from "@/features/nova/persona-theme";
import type { PersonaId } from "@/features/nova/schema";
import { savePreferredPersonaAction } from "@/features/auth/actions";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { WarningCircle, Lightning, Leaf, Brain } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

function ChatPageContent() {
  const { messages, setMessages, setConversationId, sendMessage, isEscalated, error, status, setActivePersona, activePersona } = useNovaStore();
  const [initialLoading, setInitialLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Onboarding states
  const [hasSelectedPersona, setHasSelectedPersona] = useState(false);
  const [activeOnboardingCard, setActiveOnboardingCard] = useState<PersonaId | null>(null);

  // Cinematic wave & flight states
  const [waveTrigger, setWaveTrigger] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);
  const [flightCoordinates, setFlightCoordinates] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  // References to locate components during particle flight
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch conversation history on mount
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chat/history");
        const data = await res.json();

        if (data.success) {
          setConversationId(data.data.conversationId);
          const historyMessages = data.data.messages || [];
          setMessages(historyMessages);

          if (data.data.preferredPersona) {
            setActivePersona(data.data.preferredPersona);
          }

          // If there is existing message history, skip onboarding (TEMPORARILY DISABLED FOR QA)
          if (false) {
            setHasSelectedPersona(true);
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
    // Scroll to bottom when messages change (new message added)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isEscalated]);

  const handleCardSelect = async (e: React.MouseEvent<HTMLDivElement>, id: PersonaId) => {
    console.log("handleCardSelect called for", id);
    if (activeOnboardingCard) return; // Prevent double-clicks

    setActiveOnboardingCard(id);
    const cardRect = e.currentTarget.getBoundingClientRect();
    const avatarRect = avatarRef.current?.getBoundingClientRect();

    const startX = cardRect.left + cardRect.width / 2;
    const startY = cardRect.top + cardRect.height / 2;
    const endX = avatarRect ? (avatarRect.left + avatarRect.width / 2) : window.innerWidth / 2;
    const endY = avatarRect ? (avatarRect.top + avatarRect.height / 2) : window.innerHeight / 2 - 80;

    setFlightCoordinates({ startX, startY, endX, endY });

    if (shouldReduceMotion) {
      // Direct update for reduced motion
      setActivePersona(id);
      savePreferredPersonaAction(id).catch(console.error);
      setHasSelectedPersona(true);
    } else {
      // Trigger cinematic sequence
      setTimeout(() => {
        setIsTraveling(true);
      }, 350); // Small pause for click card feedback
    }
  };

  const handleFlightComplete = () => {
    setIsTraveling(false);
    setIsBlooming(true);

    // Set active persona and save
    if (activeOnboardingCard) {
      setActivePersona(activeOnboardingCard);
      savePreferredPersonaAction(activeOnboardingCard).catch(console.error);
      setWaveTrigger(prev => prev + 1);
    }
  };

  const handleBloomComplete = () => {
    setIsBlooming(false);
    setHasSelectedPersona(true);
  };

  if (initialLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
        <NovaAvatar />
        <p className="mt-4 text-ink-400 text-type-body-sm font-medium tracking-widest uppercase animate-pulse">Connecting</p>
      </div>
    );
  }

  const activeTheme = PERSONA_THEMES[activePersona] || PERSONA_THEMES.big_brother;
  const onboardingTheme = activeOnboardingCard ? PERSONA_THEMES[activeOnboardingCard] : activeTheme;

  const chipIcons = [Lightning, Leaf, Brain];
  const starterChips = activeTheme.starterPrompts.map((text, idx) => ({
    text,
    icon: chipIcons[idx] || Brain
  }));

  return (
    <div className="relative flex flex-col flex-1 h-[calc(100vh-80px)] md:h-[calc(100vh-64px)] max-h-[calc(100vh-80px)] md:max-h-[calc(100vh-64px)] min-h-0 w-full overflow-hidden pt-4">

      {/* 1. Dynamic Page-wide Scene Warmth Layer (Mood lighting) */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-30 transition-colors duration-[1000ms]"
        animate={{
          backgroundColor: activePersona === "big_sister"
            ? "rgba(232,160,160,0.015)"
            : activePersona === "mentor"
              ? "rgba(107,91,149,0.01)"
              : activePersona === "best_friend"
                ? "rgba(242,166,90,0.02)"
                : "rgba(91,154,160,0.01)"
        }}
      />

      {/* 2. Glass Refraction Overlay for depth */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 bg-gradient-to-tr from-white/2 via-transparent to-white/5 mix-blend-overlay -z-30" />

      {/* 3. Visual connection wave sweeping from the selector */}
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

      {/* 4. Cinematic Connection Particle Flight */}
      <AnimatePresence>
        {isTraveling && (
          <motion.div
            initial={{
              x: flightCoordinates.startX,
              y: flightCoordinates.startY,
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              // Curving bezier paths to make it feel organic and fluid
              x: [flightCoordinates.startX, (flightCoordinates.startX + flightCoordinates.endX) / 2 - 25, flightCoordinates.endX],
              y: [flightCoordinates.startY, (flightCoordinates.startY + flightCoordinates.endY) / 2 - 60, flightCoordinates.endY],
              scale: [0.5, 1.25, 0.8],
              opacity: [0, 1, 1, 0]
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={handleFlightComplete}
            className="fixed w-3.5 h-3.5 rounded-radius-full bg-white z-50 pointer-events-none blur-[0.5px]"
            style={{
              left: 0,
              top: 0,
              boxShadow: `0 0 24px 8px ${onboardingTheme.colorHex}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* 5. Dynamic Ambient Background Mesh Glow (Reacts to status) */}
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

      {/* Conditionally render header switcher once onboarded */}
      {hasSelectedPersona && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute top-2 right-4 z-50 md:top-4 md:right-8"
        >
          <PersonaSwitcher />
        </motion.div>
      )}

      {/* Main Content Area */}
      {hasSelectedPersona ? (
        // ACTIVE CHAT SCENE
        // Note: calc(100vh-80px) and calc(100vh-64px) are magic numbers tied to current header/nav height; update if header height tokens change.
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex-1 flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-64px)] max-h-[calc(100vh-80px)] md:max-h-[calc(100vh-64px)] min-h-0 w-full overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto min-h-0 pb-72 px-4 md:px-space-8 scroll-smooth scrollbar-hide" ref={scrollContainerRef}>
            <div className={`max-w-3xl mx-auto w-full flex flex-col items-start ${messages.length === 0 ? "min-h-full" : ""}`}>
              {messages.length === 0 && !error && (
                <div className="flex-1 w-full flex flex-col items-center justify-center mt-12 md:mt-24">
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
                        className={`flex flex-col items-center text-center p-space-4 bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 border border-white/20 dark:border-white/10 rounded-radius-lg shadow-sm transition-all duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${activePersona === "big_brother" ? "focus-visible:ring-aurora-sea" :
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
                </div>
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

              <div className="h-36 w-full shrink-0" />
            </div>
          </div>



          <ChatComposer />
        </motion.div>
      ) : (
        // ONBOARDING PERSONA SELECTION SCENE
        <div className="flex-1 w-full flex flex-col items-center justify-center px-4">
          <div className="max-w-4xl w-full flex flex-col items-center mt-4">

            {/* Centered avatar with bloom binding */}
            <div ref={avatarRef} data-testid="onboarding-avatar" className="mb-4">
              <NovaAvatar isBlooming={isBlooming} onBloomComplete={handleBloomComplete} />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-type-display font-fraunces text-ink-900 dark:text-white mb-1 text-center"
            >
              Who should Nova become?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-type-body-md text-ink-600 dark:text-ink-300 mb-8 text-center max-w-sm"
            >
              Choose how Nova will walk beside you. You can adjust this anytime.
            </motion.p>

            {/* Grid of 4 premium interactive cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mt-2">
              {Object.values(PERSONA_THEMES).map((theme) => (
                <PersonaCard
                  key={theme.id}
                  theme={theme}
                  onClick={(e) => { void handleCardSelect(e, theme.id); }}
                  isSelected={activeOnboardingCard === theme.id}
                  isAnySelected={activeOnboardingCard !== null}
                />
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]"><p className="text-ink-400 font-medium uppercase tracking-widest animate-pulse">Loading</p></div>}>
      <ChatPageContent />
    </Suspense>
  )
}
