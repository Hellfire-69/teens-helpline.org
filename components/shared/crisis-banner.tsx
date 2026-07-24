"use client";

import { motion } from "motion/react";
import { Phone, AlertTriangle } from "lucide-react";

export function CrisisBanner() {
  const helplines = [
    { name: "CHILDLINE", number: "1098" },
    { name: "TeleMANAS", number: "14416" },
    { name: "KIRAN", number: "1800-599-0019" },
    { name: "Vandrevala", number: "1860-266-2345" },
    { name: "iCALL", number: "9152987821" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 34, bounce: 0 }}
      className="bg-signal-crisis/10 border-b border-signal-crisis/20 px-4 py-3 shadow-glow-crisis backdrop-blur-md group/banner"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-signal-crisis font-medium">
          <AlertTriangle className="h-5 w-5" />
          <span>Need immediate help? You're not alone. Reach out 24/7.</span>
        </div>
        
        {/* Screen Reader Only: Stable accessible list for assertive announcement */}
        <div className="sr-only" aria-live="assertive" aria-atomic="true">
          Crisis helplines:
          {helplines.map((line) => ` ${line.name} at ${line.number},`)}
        </div>

        {/* Desktop: Standard flex wrap */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {helplines.map((line) => (
            <a
              key={line.name}
              href={`tel:${line.number}`}
              className="flex items-center gap-1.5 text-sm hover:text-signal-crisis transition-colors font-medium text-foreground/80"
            >
              <Phone className="h-4 w-4 text-signal-crisis" />
              <span>{line.name}</span>
              <span className="font-bold text-signal-crisis">{line.number}</span>
            </a>
          ))}
        </div>

        {/* Mobile: Marquee */}
        <div className="md:hidden w-full overflow-hidden flex relative group/marquee">
          <style>{`
            @keyframes mobile-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-mobile-marquee {
              animation: mobile-marquee 20s linear infinite;
            }
            .group-hover\\/banner\\:pause-marquee:hover .animate-mobile-marquee,
            .group-focus-within\\/banner\\:pause-marquee:focus-within .animate-mobile-marquee {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .animate-mobile-marquee {
                animation: none !important;
                transform: none !important;
              }
            }
            body:has(a[aria-label="I need help now"]:hover) .animate-mobile-marquee,
            body:has(a[aria-label="I need help now"]:focus-visible) .animate-mobile-marquee {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="flex w-max animate-mobile-marquee motion-reduce:!animate-none motion-reduce:!transform-none motion-reduce:flex-wrap motion-reduce:justify-center gap-x-6 gap-y-2 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {[...helplines, ...helplines].map((line, idx) => (
              <a
                key={`${line.name}-${idx}`}
                href={`tel:${line.number}`}
                className="flex items-center gap-1.5 text-sm hover:text-signal-crisis transition-colors font-medium text-foreground/80 shrink-0"
                aria-hidden={idx >= helplines.length ? "true" : undefined}
                tabIndex={idx >= helplines.length ? -1 : undefined}
              >
                <Phone className="h-4 w-4 text-signal-crisis" />
                <span>{line.name}</span>
                <span className="font-bold text-signal-crisis">{line.number}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
