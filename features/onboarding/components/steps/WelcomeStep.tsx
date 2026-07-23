import { useOnboardingStore } from "@/stores/onboardingStore";
import { StepContainer } from "./StepContainer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function WelcomeStep() {
  const nextStep = useOnboardingStore((s) => s.nextStep);

  return (
    <StepContainer className="items-center justify-center p-4">
      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center text-center gap-6">
        
        {/* Door Opening Effect / Light spreading */}
        <motion.div 
          className="absolute inset-0 bg-white blur-[80px] rounded-full mix-blend-overlay -z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2, 1.5], opacity: [0, 0.8, 0.4] }}
          transition={{ duration: 4, ease: "easeOut" }}
        />

        <motion.h1 
          className="font-fraunces text-5xl md:text-6xl font-light text-[#1C1B29] tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          You found a safe place.
        </motion.h1>

        <motion.div
          className="mt-12 w-full max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        >
          <Button 
            onClick={nextStep} 
            className="w-full h-14 rounded-full bg-white/40 hover:bg-white/60 text-[#1C1B29] font-medium border border-white/40 backdrop-blur-md shadow-[0_8px_32px_rgba(123,201,200,0.2)] transition-all duration-500 hover:shadow-[0_0_24px_rgba(255,255,255,0.6)] text-lg"
          >
            Enter
          </Button>
        </motion.div>
      </div>
    </StepContainer>
  );
}
