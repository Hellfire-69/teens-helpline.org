"use client";

import { useState } from "react";
import Link from "next/link";
import type { Resource, ResourceCategory } from "@/features/study-hub/types";
import { Card, CardContent } from "@/components/ui/card";
import { EyeSlash, ArrowRight, Article, PlayCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: Resource & { category?: ResourceCategory };
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isRevealed, setIsRevealed] = useState(!resource.content_warning_flag);

  const categorySlug = resource.category?.slug || "general";
  const href = `/study-hub/${categorySlug}/${resource.slug}`;
  const isVideo = (resource.content_type as string) === "video";

  const contentTypeLabel = resource.content_type?.replace(/-/g, " ") ?? "article";

  const content = (
    <CardContent className="p-0 h-full flex flex-col">
      {/* Media thumbnail */}
      <div className={cn(
        "h-28 w-full flex items-center justify-center relative overflow-hidden",
        isVideo
          ? "bg-gradient-to-br from-aurora-sea/20 to-aurora-dusk/20"
          : "bg-gradient-to-br from-paper-100 to-paper-200 dark:from-night-900 dark:to-night-950"
      )}>
        {isVideo ? (
          <PlayCircle
            weight="fill"
            className="w-10 h-10 text-aurora-sea opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-200"
            aria-hidden="true"
          />
        ) : (
          <Article
            weight="duotone"
            className="w-10 h-10 text-ink-300 dark:text-ink-600 group-hover:scale-110 group-hover:text-aurora-sea transition-all duration-200"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="p-space-5 flex flex-col flex-1 bg-white/90 dark:bg-night-950/90">
        {/* Type badge */}
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 px-2 py-0.5 rounded-sm mb-3 w-fit capitalize">
          {contentTypeLabel}
        </span>

        <h3 className="text-type-title-sm font-semibold text-ink-900 dark:text-white mb-2 line-clamp-2 leading-snug flex-1">
          {resource.title}
        </h3>

        <p className="text-type-body-sm text-ink-600 dark:text-ink-300 line-clamp-2 mb-space-4">
          {resource.summary}
        </p>

        <div className="mt-auto flex items-center text-aurora-sea font-semibold text-type-body-sm group-hover:translate-x-1 transition-transform duration-200">
          Read article <ArrowRight weight="bold" className="ml-1.5 w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    </CardContent>
  );

  if (!isRevealed) {
    return (
      <div className="h-full">
        <Card variant="glass" radius="lg" className="h-full overflow-hidden border-white/20 dark:border-white/10 relative">
          {/* Blurred preview underneath */}
          <div aria-hidden="true" className="select-none pointer-events-none blur-sm opacity-50">
            {content}
          </div>
          {/* Warning overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-ink-900/85 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
              <EyeSlash weight="duotone" className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <p className="text-type-title-sm font-semibold text-white mb-2">Sensitive Content</p>
            <p className="text-type-body-sm text-ink-300 max-w-[180px] mb-5">
              {resource.content_warning_text || "This content may be difficult. Tap to view."}
            </p>
            <button
              onClick={() => setIsRevealed(true)}
              className="px-5 py-2 rounded-radius-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Reveal sensitive content: ${resource.title}`}
            >
              View anyway
            </button>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="revealed"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Link
          href={href}
          className="group outline-none block h-full focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2 rounded-radius-lg"
          aria-label={`${resource.title} — ${contentTypeLabel}`}
        >
          <Card interactive variant="glass" radius="lg" className="h-full overflow-hidden border-white/20 dark:border-white/10">
            {content}
          </Card>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
