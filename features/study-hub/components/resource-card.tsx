"use client";

import { useState } from "react";
import Link from "next/link";
import type { Resource, ResourceCategory } from "@/features/study-hub/types";
import { Card, CardContent } from "@/components/ui/card";
import { EyeSlash, ArrowRight } from "@phosphor-icons/react";

interface ResourceCardProps {
  resource: Resource & { category?: ResourceCategory };
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isRevealed, setIsRevealed] = useState(!resource.content_warning_flag);

  const categorySlug = resource.category?.slug || "general";
  const href = `/study-hub/${categorySlug}/${resource.slug}`;

  const content = (
    <CardContent className="p-space-6 h-full flex flex-col justify-between relative z-10">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-type-label text-aurora-sea uppercase tracking-wider">
            {resource.content_type?.replace(/-/g, " ")}
          </span>
        </div>
        <h3 className="text-type-title-lg text-ink-900 dark:text-white mb-3">
          {resource.title}
        </h3>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300 line-clamp-3">
          {resource.summary}
        </p>
      </div>
      
      <div className="mt-space-6 flex items-center text-aurora-sea font-medium group-hover:translate-x-1 transition-transform duration-fast">
        Read article <ArrowRight weight="bold" className="ml-2" />
      </div>
    </CardContent>
  );

  if (!isRevealed) {
    return (
      <Card variant="flat" className="h-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-paper-100/50 dark:bg-night-900/50 backdrop-blur-[24px] z-20 flex flex-col items-center justify-center p-6 text-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-inset"
             onClick={() => setIsRevealed(true)}
             role="button"
             tabIndex={0}
             onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsRevealed(true); } }}
             aria-label={`Content may be sensitive: ${resource.content_warning_text || 'Tap to reveal'}`}
        >
          <EyeSlash size={32} className="text-ink-300 mb-4" />
          <p className="text-type-body-md font-medium text-ink-600 dark:text-white mb-2">
            May be sensitive content
          </p>
          <p className="text-type-body-sm text-ink-300 max-w-[200px]">
            {resource.content_warning_text || "Tap to view"}
          </p>
        </div>
        {/* Render content underneath, but hide it from screen readers until revealed */}
        <div aria-hidden="true" className="select-none pointer-events-none">
          {content}
        </div>
      </Card>
    );
  }

  return (
    <Link href={href} className="group outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2 rounded-radius-md block h-full">
      <Card variant="flat" interactive className="h-full">
        {content}
      </Card>
    </Link>
  );
}
