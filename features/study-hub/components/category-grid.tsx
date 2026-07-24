"use client";

import Link from "next/link";
import type { ResourceCategory } from "@/features/study-hub/types";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpenText, UsersThree, Lightning, CloudRain, Star, Briefcase, HandHeart, ShieldWarning } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  categories: ResourceCategory[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  // Map category slugs to icons and colors
  const styleMap: Record<string, { icon: React.ElementType, color: string, gradient: string }> = {
    "academic-stress": { icon: BookOpenText, color: "text-aurora-sea", gradient: "from-aurora-sea/10 to-transparent" },
    "bullying": { icon: ShieldWarning, color: "text-signal-crisis", gradient: "from-signal-crisis/10 to-transparent" },
    "family-concerns": { icon: UsersThree, color: "text-aurora-dusk", gradient: "from-aurora-dusk/10 to-transparent" },
    "friendships-relationships": { icon: HandHeart, color: "text-aurora-blush", gradient: "from-aurora-blush/10 to-transparent" },
    "emotional-overwhelm": { icon: CloudRain, color: "text-aurora-sea", gradient: "from-aurora-sea/10 to-transparent" },
    "behavioural-concerns": { icon: Lightning, color: "text-aurora-dawn", gradient: "from-aurora-dawn/10 to-transparent" },
    "confidence-identity": { icon: Star, color: "text-aurora-dusk", gradient: "from-aurora-dusk/10 to-transparent" },
    "career-exploration": { icon: Briefcase, color: "text-aurora-sea", gradient: "from-aurora-sea/10 to-transparent" },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-4 md:gap-space-6 w-full"
    >
      {categories.map((category) => {
        const style = styleMap[category.slug] || { icon: BookOpenText, color: "text-ink-500", gradient: "from-ink-500/10 to-transparent" };
        const Icon = style.icon;

        return (
          <motion.div variants={itemVariants} key={category.id} className="h-full">
            <Link
              href={`/study-hub/${category.slug}`}
              aria-label={`Browse ${category.label} resources`}
              className="group outline-none block h-full focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2 rounded-radius-lg"
            >
              <Card interactive variant="glass" radius="lg" className="h-full flex flex-col justify-between overflow-hidden bg-white/60 dark:bg-night-950/60 hover:bg-white/90 dark:hover:bg-night-900/90 transition-colors duration-[180ms] border-white/20 dark:border-white/10 shadow-sm">
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-300", style.gradient)} />
                <CardContent className="p-space-6 relative z-10 flex flex-col h-full gap-space-6">
                  
                  <div className="w-12 h-12 rounded-radius-full bg-white/60 dark:bg-black/20 flex items-center justify-center shadow-sm border border-white/30 dark:border-white/10 group-hover:scale-110 transition-transform duration-[180ms]">
                    <Icon weight="duotone" className={cn("w-6 h-6", style.color)} aria-hidden="true" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-type-title-md font-semibold text-ink-900 dark:text-white mb-2 leading-tight">
                      {category.label}
                    </h3>
                    <p className="text-type-body-sm text-ink-600 dark:text-ink-300 line-clamp-2">
                      Explore resources and tools about {category.label.toLowerCase()}.
                    </p>
                  </div>

                  <div className={cn("flex items-center text-type-label font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-[180ms]", style.color)}>
                    Explore <ArrowRight weight="bold" className="ml-1.5 w-4 h-4" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
