"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WarningCircle, CircleNotch, Smiley, SmileySad, Confetti, CloudRain, Star, Wind } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { MoodRequest } from "@/features/mood-engine/schema";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

type MoodValue = NonNullable<MoodRequest["mood_value"]>;

const MOODS: { value: MoodValue; label: string; icon: React.ElementType; colorClass: string; activeClass: string; dotClass: string }[] = [
  { value: "Happy", label: "Happy", icon: Confetti, colorClass: "text-aurora-sea group-hover:bg-aurora-sea/10", activeClass: "bg-aurora-sea/15 ring-2 ring-aurora-sea", dotClass: "bg-aurora-sea" },
  { value: "Okay", label: "Okay", icon: Smiley, colorClass: "text-aurora-dusk group-hover:bg-aurora-dusk/10", activeClass: "bg-aurora-dusk/15 ring-2 ring-aurora-dusk", dotClass: "bg-aurora-dusk" },
  { value: "Sad", label: "Sad", icon: SmileySad, colorClass: "text-aurora-dawn group-hover:bg-aurora-dawn/10", activeClass: "bg-aurora-dawn/15 ring-2 ring-aurora-dawn", dotClass: "bg-aurora-dawn" },
  { value: "Overwhelmed", label: "Overwhelmed", icon: CloudRain, colorClass: "text-aurora-blush group-hover:bg-aurora-blush/10", activeClass: "bg-aurora-blush/15 ring-2 ring-aurora-blush", dotClass: "bg-aurora-blush" },
  { value: "Anxious", label: "Anxious", icon: Wind, colorClass: "text-aurora-blush group-hover:bg-aurora-blush/10", activeClass: "bg-aurora-blush/15 ring-2 ring-aurora-blush", dotClass: "bg-aurora-blush" },
];

export function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ escalation: boolean; recommendationCategory?: string; safeReply?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const payload: MoodRequest = { mood_value: selectedMood };
      if (note.trim()) payload.note = note.trim();

      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error?.message || "Failed to submit mood.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    if (result.escalation) {
      return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div 
            role="alert" 
            aria-live="assertive" 
            data-testid="crisis-banner"
            className="bg-white dark:bg-night-900 border-2 border-signal-crisis shadow-glow-crisis rounded-radius-lg p-space-6 flex items-start gap-space-4 backdrop-blur-md"
          >
            <div className="w-10 h-10 rounded-radius-full bg-signal-crisis/10 flex items-center justify-center shrink-0">
              <WarningCircle weight="fill" className="w-6 h-6 text-signal-crisis" />
            </div>
            <div>
              <h4 className="text-type-title-md font-semibold text-ink-900 dark:text-white mb-2">
                Need immediate help? You're not alone.
              </h4>
              <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-4 leading-relaxed">
                {result.safeReply || "Please reach out to a trusted adult or a crisis helpline. We cannot provide crisis support."}
              </p>
              <Button asChild variant="primary" className="bg-signal-crisis hover:bg-signal-crisis/90 text-white shadow-md">
                <a href="tel:1098">Call CHILDLINE (1098)</a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-xl mx-auto text-center space-y-6"
      >
        <div className="p-space-8 bg-white/60 dark:bg-night-950/60 backdrop-blur-[24px] rounded-radius-2xl border border-white/20 dark:border-white/10 shadow-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-aurora-sea/20 blur-3xl rounded-full" />
          <div className="w-16 h-16 bg-gradient-to-br from-aurora-dusk to-aurora-sea rounded-radius-full flex items-center justify-center mx-auto mb-space-6 shadow-sm">
            <Star weight="fill" className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white mb-space-2">
            Thank you for checking in
          </h3>
          <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-space-8 leading-relaxed max-w-md mx-auto">
            Acknowledging how you feel is the first step. Based on your mood, we've found something that might help right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-4">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto shadow-sm">
              <Link href={`/study-hub?q=${result.recommendationCategory}`}>
                Explore {result.recommendationCategory?.replace("-", " ")}
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto bg-white hover:bg-ink-50">
              <Link href="/chat">
                Talk to Nova
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center mb-space-10">
        <h2 className="text-type-display font-fraunces text-ink-900 dark:text-white mb-space-3 tracking-tight">How are you feeling?</h2>
        <p className="text-type-body-lg text-ink-600 dark:text-ink-300">Take a moment to check in with yourself.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-space-4 md:gap-space-6 mb-space-8 w-full">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.value;
          return (
            <button
              key={mood.value}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Select mood: ${mood.label}`}
              onClick={() => setSelectedMood(mood.value)}
              className="relative outline-none group focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-xl"
            >
              <div 
                className={cn(
                  "w-24 h-28 md:w-28 md:h-32 rounded-radius-xl flex flex-col items-center justify-center gap-space-3 transition-all duration-[180ms] border relative z-10",
                  isSelected
                    ? mood.activeClass + " shadow-sm border-transparent"
                    : "bg-white/50 dark:bg-black/20 border-white/30 dark:border-white/10 hover:shadow-sm " + mood.colorClass
                )}
              >
                <mood.icon weight={isSelected ? "fill" : "duotone"} className={cn("w-8 h-8 md:w-10 md:h-10 transition-transform duration-[180ms]", isSelected ? "scale-110" : "group-hover:scale-110")} aria-hidden="true" />
                <span className={cn("text-type-body-sm font-medium", isSelected ? "text-ink-900 dark:text-white" : "text-ink-600 dark:text-ink-300 group-hover:text-ink-900 dark:group-hover:text-white")}>
                  {mood.label}
                </span>
              </div>
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    layoutId="mood-glow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={cn("absolute inset-0 rounded-radius-xl -z-10 blur-xl", mood.dotClass)}
                  />
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-xl overflow-hidden"
          >
            <div className="pt-space-4 space-y-space-4 bg-white/50 dark:bg-night-950/70 p-space-6 rounded-radius-xl border border-white/20 dark:border-white/10 mt-space-4 shadow-sm">
              <label htmlFor="mood-note" className="block text-type-body-md font-semibold text-ink-900 dark:text-white mb-2">
                Would you like to add a note? <span className="text-ink-400 font-normal ml-1">(Optional)</span>
              </label>
              <TextareaAutosize
                id="mood-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? This helps Nova understand your context."
                minRows={3}
                maxRows={6}
                autoComplete="off"
                className="w-full bg-white/80 dark:bg-night-950/80 border border-ink-300/30 dark:border-white/10 rounded-radius-sm p-space-4 text-type-body-md text-ink-900 dark:text-white placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-aurora-sea focus:border-aurora-sea resize-none shadow-sm transition-shadow duration-[180ms]"
              />
              
              {error && (
                <div className="flex items-center gap-2 text-signal-error bg-signal-error/10 p-3 rounded-radius-md text-sm font-medium">
                  <WarningCircle weight="bold" className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="flex justify-end pt-space-2">
                <Button type="submit" disabled={isSubmitting || !selectedMood} size="lg" className="min-w-[140px] rounded-radius-full shadow-sm">
                  {isSubmitting ? <CircleNotch weight="bold" className="w-5 h-5 animate-spin" /> : "Check In"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
