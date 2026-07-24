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
      className="bg-signal-crisis/10 border-b border-signal-crisis/20 px-4 py-3 shadow-glow-crisis backdrop-blur-md"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-medium">
          <AlertTriangle className="h-5 w-5 text-signal-crisis" />
          <span className="text-[#A8341D]">Need immediate help? You're not alone. Reach out 24/7.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {helplines.map((line) => (
            <a
              key={line.name}
              href={`tel:${line.number}`}
              className="flex items-center gap-1.5 text-sm hover:text-[#A8341D] transition-colors font-medium text-foreground/80"
            >
              <Phone className="h-4 w-4 text-signal-crisis" />
              <span>{line.name}</span>
              <span className="font-bold text-[#A8341D]">{line.number}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
