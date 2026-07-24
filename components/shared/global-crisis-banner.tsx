"use client";

import { useNovaStore } from "@/features/nova/store";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";

export function GlobalCrisisBanner() {
  const { isEscalated } = useNovaStore();

  return (
    <AnimatePresence>
      {isEscalated && (
        <div className="fixed bottom-6 md:bottom-12 left-0 right-0 z-[100] px-4 md:px-space-8 pointer-events-none flex justify-center">
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
  );
}
