"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function ErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Dashboard error", { error: error.message });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center flex-1">
      <AlertTriangle className="w-12 h-12 text-signal-caution mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-ink-900 dark:text-white">Something went wrong</h2>
      <p className="text-ink-600 dark:text-ink-300 mb-6 max-w-md">
        We couldn't load your dashboard right now. Your data is safe, but we're having trouble displaying it.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="secondary">Try Again</Button>
        <Button asChild>
          <Link href="/study-hub">Visit Study Hub</Link>
        </Button>
      </div>
    </div>
  );
}
