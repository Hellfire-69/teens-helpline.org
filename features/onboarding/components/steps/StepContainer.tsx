import { motion } from "framer-motion";

export function StepContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "brightness(1.2) blur(8px)", x: 60 }}
      animate={{ opacity: 1, filter: "brightness(1) blur(0px)", x: 0 }}
      exit={{ opacity: 0, filter: "brightness(1.2) blur(8px)", x: -60 }}
      transition={{ 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom smooth decelerating ease
      }}
      className={`absolute inset-0 pointer-events-none flex ${className}`}
    >
      <div className="pointer-events-auto w-full">
        {children}
      </div>
    </motion.div>
  );
}
