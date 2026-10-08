"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatCircleDots, Heartbeat, UsersThree, Books, Sparkle, ArrowRight, Clock, PlayCircle, SmileySticker, CalendarCheck, HandsClapping } from "@phosphor-icons/react";
import type { TeenDashboardData } from "@/features/dashboard/types";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useOnboardingStore } from "@/stores/onboarding-store";

export function TeenDashboard({ data }: { data: TeenDashboardData }) {
  const isAnonymous = !data.profile;
  const alias = data.profile?.alias || "there";
  const activeSessions = data.peerSessions.filter(s => s.status === 'active').length;
  const recentMood = data.moodHistory[0]; // Assuming sorted by date descending

  useEffect(() => {
    // We safely clear onboarding state only after dashboard has mounted
    useOnboardingStore.getState().reset();
  }, []);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-space-6 pb-space-12"
    >
      {/* Hero Welcome Section */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-radius-xl bg-gradient-to-br from-aurora-dusk/8 via-aurora-sea/5 to-transparent border border-white/20 dark:border-white/10 p-space-8 md:p-space-12">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-6">
          <div className="max-w-2xl">
            <h1 className="text-type-display font-fraunces font-semibold text-ink-900 dark:text-white mb-space-3 tracking-tight">
              {isAnonymous ? "Welcome to your space" : `Good to see you, ${alias}`}
            </h1>
            <p className="text-type-title-md text-ink-600 dark:text-ink-300 font-normal leading-relaxed mb-space-6">
              {isAnonymous 
                ? "You're browsing anonymously. We're here to help you figure things out, completely off the record." 
                : "Take a deep breath. You're exactly where you need to be today."}
            </p>
            <div className="flex flex-wrap items-center gap-space-3">
              <Button asChild variant="primary" size="lg" className="rounded-radius-full">
                <Link href="/chat">
                  <ChatCircleDots weight="fill" className="w-5 h-5 mr-2" />
                  Talk to Nova Now
                </Link>
              </Button>
              {isAnonymous && (
                <Button asChild variant="secondary" size="lg" className="rounded-radius-full">
                  <Link href="/signup">Create an account</Link>
                </Button>
              )}
            </div>
          </div>
          
          <div className="hidden lg:flex shrink-0">
            {/* Daily Affirmation Card — elevation.1 per Design.md §14 */}
            <div className="bg-white/70 dark:bg-night-950/70 border border-white/30 dark:border-white/10 p-space-6 rounded-radius-lg max-w-xs shadow-sm rotate-1">
              <Sparkle weight="duotone" className="w-5 h-5 text-aurora-dawn mb-space-3" aria-hidden="true" />
              <p className="text-type-body-md text-ink-700 dark:text-ink-200 leading-relaxed">
                "It's okay to not have it all figured out right now. Just taking one small step is enough."
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-6">
        
        {/* Nova Primary Card */}
        <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-8">
          <Card interactive variant="glass" radius="lg" className="h-full bg-white/60 dark:bg-night-950/60 shadow-sm border-white/20 relative overflow-hidden group">
            <CardContent className="p-space-8 flex flex-col md:flex-row items-center gap-space-8 h-full">
              <div className="flex-1 space-y-space-4">
                <div className="inline-flex items-center gap-2 bg-aurora-sea/20 text-aurora-sea px-3 py-1 rounded-radius-full text-type-body-sm font-semibold uppercase tracking-wider mb-space-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-radius-full bg-aurora-sea opacity-75"></span>
                    <span className="relative inline-flex rounded-radius-full h-2 w-2 bg-aurora-sea"></span>
                  </span>
                  Online 24/7
                </div>
                <h2 className="text-type-title-xl font-semibold text-ink-900 dark:text-white">What's on your mind?</h2>
                <p className="text-type-body-lg text-ink-600 dark:text-ink-300 max-w-md">
                  Nova is here to listen without judgment. Tap into a safe space to vent, explore your feelings, or just chat.
                </p>
                <div className="pt-space-4 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white/50 dark:bg-black/30 rounded-radius-full text-type-body-sm text-ink-600 dark:text-ink-300 border border-white/20 cursor-default">“I'm feeling overwhelmed”</span>
                  <span className="px-3 py-1.5 bg-white/50 dark:bg-black/30 rounded-radius-full text-type-body-sm text-ink-600 dark:text-ink-300 border border-white/20 cursor-default">“Just need to vent”</span>
                </div>
              </div>
              <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 relative">
                {/* Nova Orb Representation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-aurora-sea to-aurora-dusk rounded-radius-full opacity-20 blur-2xl group-hover:opacity-35 group-hover:scale-105 transition-all duration-[700ms]" />
                <div className="absolute inset-4 bg-gradient-to-tr from-aurora-sea to-aurora-dusk rounded-radius-full opacity-60 blur-md group-hover:opacity-80 transition-all duration-500 animate-pulse" style={{ animationDuration: "4s" }} />
                <Link href="/chat" className="absolute inset-0 z-10 flex items-center justify-center rounded-radius-full" aria-label="Start a conversation with Nova">
                  <div className="w-14 h-14 bg-white/20 border border-white/40 rounded-radius-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-[300ms]">
                    <ArrowRight weight="bold" className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mood Widget */}
        <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-4">
          <Card interactive variant="glass" radius="lg" className="h-full bg-aurora-dawn/5 dark:bg-aurora-dawn/10 border-aurora-dawn/20 shadow-sm flex flex-col">
            <div className="p-space-6 border-b border-aurora-dawn/10 flex items-center justify-between">
              <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white flex items-center gap-2">
                <Heartbeat weight="fill" className="w-5 h-5 text-aurora-dawn" /> 
                Mood Check
              </h3>
              <Link href="/mood" className="text-type-body-sm text-aurora-dawn hover:underline font-medium">History</Link>
            </div>
            <CardContent className="p-space-6 flex-1 flex flex-col justify-center items-center text-center">
              {recentMood ? (
                <>
                  <div className="w-16 h-16 bg-aurora-dawn/20 rounded-radius-full flex items-center justify-center mb-space-4">
                    <SmileySticker weight="duotone" className="w-8 h-8 text-aurora-dawn" />
                  </div>
                  <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-space-6">
                    You logged <strong className="text-ink-900 dark:text-white capitalize">{recentMood.mood_value}</strong> recently. How are things now?
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-ink-100 dark:bg-ink-800 rounded-radius-full flex items-center justify-center mb-space-4">
                    <CalendarCheck weight="duotone" className="w-8 h-8 text-ink-400" />
                  </div>
                  <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-space-6">
                    Take a moment to check in with yourself. How are you feeling right now?
                  </p>
                </>
              )}
              <Button asChild variant="secondary" className="w-full bg-white/60 dark:bg-black/40 hover:bg-white border-white/40">
                <Link href="/mood">Update Mood</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Peer Support Widget */}
        <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-4">
          <Card interactive variant="glass" radius="lg" className="h-full bg-aurora-blush/5 dark:bg-aurora-blush/10 border-aurora-blush/20 shadow-sm flex flex-col">
            <div className="p-space-6 border-b border-aurora-blush/10 flex items-center justify-between">
              <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white flex items-center gap-2">
                <UsersThree weight="fill" className="w-5 h-5 text-aurora-blush" /> 
                Peer Support
              </h3>
            </div>
            <CardContent className="p-space-6 flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-aurora-blush/20 rounded-radius-full flex items-center justify-center mb-space-4 relative">
                <HandsClapping weight="duotone" className="w-8 h-8 text-aurora-blush" />
                {activeSessions > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-signal-safe rounded-radius-full border-2 border-white dark:border-night-900" />
                )}
              </div>
              
              {activeSessions > 0 ? (
                <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-space-6">
                  You have <span className="font-semibold text-ink-900 dark:text-white">{activeSessions}</span> active session{activeSessions > 1 ? 's' : ''}. People are here for you.
                </p>
              ) : (
                <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-space-6">
                  Connect anonymously with someone who understands what you're going through.
                </p>
              )}
              <Button asChild variant="secondary" className="w-full bg-white/60 dark:bg-black/40 hover:bg-white border-white/40">
                <Link href="/peer-support">Go to Sessions</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Study Hub / Continue Learning */}
        <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-8">
          <Card interactive variant="glass" radius="lg" className="h-full bg-paper-100/50 dark:bg-night-900/50 border-ink-300/10 shadow-sm flex flex-col">
            <div className="p-space-6 border-b border-ink-300/10 flex items-center justify-between">
              <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white flex items-center gap-2">
                <Books weight="fill" className="w-5 h-5 text-aurora-dusk" /> 
                Today's Recommendation
              </h3>
              <Link href="/study-hub" className="text-type-body-sm text-aurora-dusk hover:underline font-medium">Explore Hub</Link>
            </div>
            <CardContent className="p-space-6 flex flex-col sm:flex-row gap-space-6 items-center">
              <div className="w-full sm:w-1/3 aspect-video sm:aspect-square bg-gradient-to-br from-aurora-dusk/20 to-aurora-sea/20 rounded-radius-md flex items-center justify-center relative overflow-hidden group">
                <PlayCircle weight="fill" className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-radius-sm flex items-center gap-1 font-medium">
                  <Clock weight="fill" className="w-3 h-3" /> 5 min
                </div>
              </div>
              <div className="w-full sm:w-2/3 space-y-space-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-aurora-dusk bg-aurora-dusk/10 px-2 py-1 rounded-radius-sm">Anxiety</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-aurora-sea bg-aurora-sea/10 px-2 py-1 rounded-radius-sm">Exercise</span>
                </div>
                <h4 className="text-type-title-lg font-semibold text-ink-900 dark:text-white">Grounding Techniques for Overwhelm</h4>
                <p className="text-type-body-md text-ink-600 dark:text-ink-300 line-clamp-2">
                  When everything feels like too much, bringing your focus back to your physical senses can help break the cycle of panic. Learn the 5-4-3-2-1 method.
                </p>
                <div className="pt-2">
                  <Button asChild variant="secondary" size="sm" className="bg-white hover:bg-ink-50 dark:bg-night-950 dark:hover:bg-ink-900">
                    <Link href="/study-hub">Read Article</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>



      </div>
    </motion.div>
  );
}
