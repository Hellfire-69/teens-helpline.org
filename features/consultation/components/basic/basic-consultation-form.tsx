"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { basicConsultationSchema } from "../../schemas";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { Sparkle, ArrowRight, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useNovaStore } from "@/features/nova/store";
import Link from "next/link";

type FormData = z.infer<typeof basicConsultationSchema>;

export function BasicConsultationForm() {
  const { sendMessage, status, messages, error } = useNovaStore();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [initialMessageCount, setInitialMessageCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(basicConsultationSchema),
    defaultValues: { issue: "" },
  });

  const onSubmit = async (data: FormData) => {
    setHasSubmitted(true);
    setInitialMessageCount(messages.length);
    const contextPrompt = `I'd like a basic consultation about this: ${data.issue}`;
    await sendMessage(contextPrompt);
  };

  // Determine if we are waiting for Nova's reply to THIS specific submission
  const isWaitingForReply = hasSubmitted && status === "responding";
  // Determine if Nova has successfully replied to THIS specific submission
  const hasReply = hasSubmitted && status === "resting" && messages.length > initialMessageCount + 1;
  const replyMessage = hasReply ? messages[messages.length - 1] : null;

  return (
    <div className="bg-glass-subtle dark:bg-night-900 border border-white/20 dark:border-white/10 rounded-radius-lg p-space-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aurora-sea to-aurora-dusk" />
      <div className="flex items-center gap-2 mb-4">
        <Sparkle className="w-6 h-6 text-aurora-sea" weight="duotone" />
        <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white">Quick Guidance</h3>
        <span className="ml-auto bg-aurora-sea/10 text-aurora-sea px-2 py-0.5 rounded-radius-full text-xs font-semibold uppercase tracking-wider">
          Available Now
        </span>
      </div>
      
      {!hasSubmitted ? (
        <>
          <p className="text-type-body-md text-ink-600 dark:text-ink-300 mb-6">
            Need quick guidance without scheduling a session? Tell us what's on your mind and Nova will help you sort through it immediately.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="issue" className="block text-type-body-sm font-medium text-ink-900 dark:text-ink-100 mb-2">
                What's on your mind?
              </label>
              <div className="relative">
                <TextareaAutosize
                  {...register("issue")}
                  id="issue"
                  minRows={3}
                  placeholder="e.g. I've been feeling really overwhelmed with exams coming up..."
                  className={`w-full bg-paper-100 dark:bg-night-950 border ${
                    errors.issue ? "border-signal-error focus-visible:ring-signal-error" : "border-ink-200 dark:border-ink-700 focus-visible:ring-aurora-sea"
                  } rounded-radius-md px-4 py-3 text-type-body-md text-ink-900 dark:text-white transition-all duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:border-transparent resize-none`}
                />
              </div>
              {errors.issue && (
                <p className="text-signal-error text-type-body-sm mt-1.5 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal-error" />
                  {errors.issue.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto" variant="primary">
              {isSubmitting ? "Connecting..." : "Talk to Nova now"}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>
        </>
      ) : (
        <div className="mt-space-6 space-y-space-6">
          {/* Status / Loading State */}
          {isWaitingForReply && (
            <div className="flex items-center gap-3 p-4 bg-paper-100 dark:bg-night-950 rounded-radius-md animate-pulse">
              <div className="w-8 h-8 rounded-full bg-aurora-sea/20 flex items-center justify-center">
                <Sparkle className="w-4 h-4 text-aurora-sea animate-spin-slow" />
              </div>
              <p className="text-type-body-md text-ink-600 dark:text-ink-300">Nova is thinking...</p>
            </div>
          )}

          {/* Error State */}
          {hasSubmitted && status === "resting" && error && (
            <div className="flex items-start gap-3 p-4 bg-signal-error/10 border border-signal-error/20 rounded-radius-md">
              <WarningCircle className="w-5 h-5 text-signal-error shrink-0 mt-0.5" />
              <div>
                <p className="text-type-body-sm font-semibold text-signal-error">Something went wrong</p>
                <p className="text-type-body-sm text-signal-error/80">{error}</p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setHasSubmitted(false)}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Inline Reply Panel */}
          {hasReply && replyMessage && (
            <div className="space-y-4">
              <div className="flex gap-4 p-space-6 bg-paper-100 dark:bg-night-950 rounded-radius-md border border-ink-200 dark:border-ink-800">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-sea to-aurora-dusk flex items-center justify-center text-white font-fraunces text-xl shadow-sm">
                    N
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-type-body-sm font-semibold text-ink-900 dark:text-white mb-1">Nova</p>
                  <div className="text-type-body-md text-ink-700 dark:text-ink-300 leading-relaxed whitespace-pre-wrap">
                    {replyMessage.content}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="primary" className="flex-1">
                  <Link href="/chat">
                    Continue this in Nova Chat <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="secondary" onClick={() => setHasSubmitted(false)}>
                  Ask something else
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
