import type { Metadata } from "next";
import { MoodForm } from "@/features/mood-engine/components/mood-form";
import { TrendUp, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mood Check-in | TeensHelpline",
  description: "Check in with yourself.",
};

export default function MoodPage() {
  return (
    <div className="w-full py-8 space-y-12">
      
      <div className="flex flex-col lg:flex-row gap-space-8 w-full">
        {/* Main Check-in Area */}
        <div className="flex-1 w-full flex flex-col items-center">
          <MoodForm />
        </div>

        {/* Insights Sidebar (Simulated for MVP) */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-space-6 hidden md:block">
          
          {/* Weekly Insights — simulated for MVP, data is decorative */}
          <div className="bg-white/60 dark:bg-night-950/60 rounded-radius-xl p-space-6 border border-white/20 dark:border-white/10 shadow-sm" aria-hidden="true">
            <h3 className="text-type-title-sm font-semibold text-ink-900 dark:text-white flex items-center gap-2 mb-space-4">
              <TrendUp weight="bold" className="w-4 h-4 text-aurora-sea" /> Weekly Insights
            </h3>
            
            {/* Simulated Mini Graph */}
            <div className="flex items-end justify-between h-24 mb-space-4 px-2 border-b border-ink-300/20 pb-2">
              <div className="w-4 bg-aurora-dusk/40 rounded-t-sm h-[40%]" />
              <div className="w-4 bg-aurora-sea/60 rounded-t-sm h-[80%]" />
              <div className="w-4 bg-aurora-dawn/40 rounded-t-sm h-[30%]" />
              <div className="w-4 bg-aurora-blush/60 rounded-t-sm h-[60%]" />
              <div className="w-4 bg-aurora-sea/80 rounded-t-sm h-[90%]" />
              <div className="w-4 bg-aurora-dusk/40 rounded-t-sm h-[50%]" />
              <div className="w-4 bg-aurora-sea/100 rounded-t-sm h-[100%]" />
            </div>
            <div className="flex justify-between px-2 text-[10px] text-ink-400 font-medium uppercase">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            
            <p className="text-type-body-sm text-ink-600 dark:text-ink-300 mt-space-4 leading-relaxed">
              You've been tracking consistently! Your mood has been trending upwards over the last 3 days.
            </p>
          </div>

          {/* Nova shortcut — functional */}
          <div className="bg-gradient-to-br from-aurora-dusk/10 to-aurora-sea/5 rounded-radius-xl p-space-6 border border-aurora-sea/20 shadow-sm">
            <h3 className="text-type-title-sm font-semibold text-ink-900 dark:text-white flex items-center gap-2 mb-space-2">
              <BookOpenText weight="duotone" className="w-4 h-4 text-aurora-dusk" aria-hidden="true" /> Talk to Nova
            </h3>
            <p className="text-type-body-sm text-ink-600 dark:text-ink-300 mb-space-4">
              Talk through what's on your mind with Nova — your confidential AI companion.
            </p>
            <Link
              href="/chat"
              className="block w-full text-center bg-white dark:bg-night-950 text-type-body-sm font-semibold text-ink-900 dark:text-white py-2.5 rounded-radius-md border border-ink-300/20 hover:bg-aurora-sea hover:text-white hover:border-aurora-sea transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea"
            >
              Talk to Nova
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
