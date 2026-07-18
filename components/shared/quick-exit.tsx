"use client";

import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickExit() {
  const handleExit = () => {
    // Quickly replace the page in history so back button doesn't work, and go to an innocuous site
    window.location.replace("https://www.google.com/search?q=weather+today");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        variant="destructive"
        size="lg"
        onClick={handleExit}
        className="rounded-full shadow-glow-crisis h-14 px-6 gap-2"
      >
        <LogOut className="h-5 w-5" />
        <span className="font-semibold">Quick Exit</span>
      </Button>
    </motion.div>
  );
}
