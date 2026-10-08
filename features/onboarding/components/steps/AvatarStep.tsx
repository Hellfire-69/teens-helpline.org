import { useOnboardingStore, type Avatar } from "@/stores/onboarding-store";
import { motion, AnimatePresence } from "framer-motion";
import { StepContainer } from "./StepContainer";
import { Button } from "@/components/ui/button";
import { Companion } from "../companions/Companions";

const COMPANIONS: { id: Avatar; name: string }[] = [
  { id: "lumina", name: "Lumina" },
  { id: "bramble", name: "Bramble" },
  { id: "pip", name: "Pip" },
  { id: "zephyr", name: "Zephyr" },
  { id: "orion", name: "Orion" },
  { id: "nova-spark", name: "Nova Spark" },
  { id: "ember", name: "Ember" },
  { id: "moss", name: "Moss" },
  { id: "puddle", name: "Puddle" },
  { id: "cloud", name: "Cloud" },
];

export function AvatarStep() {
  const { avatar, setAvatar, nextStep } = useOnboardingStore();

  return (
    <StepContainer className="items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8 text-center relative z-10">
        
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="text-4xl font-light text-[#1C1B29] tracking-tight"
          >
            Choose a companion for the journey.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-[#4A4863] text-lg mt-3"
          >
            They will walk beside you.
          </motion.p>
        </div>

        {/* Floating Cards Grid */}
        <div className="w-full flex flex-wrap justify-center gap-6 mt-4 pb-12">
          {COMPANIONS.map((c, i) => {
            const isSelected = avatar === c.id;
            return (
              <motion.button
                key={c.id}
                onClick={() => setAvatar(c.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: isSelected ? -10 : 0,
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.05,
                  y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } // ambient float
                }}
                whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-[120px] h-[140px] rounded-[24px] flex flex-col items-center justify-center gap-2 relative overflow-hidden backdrop-blur-xl transition-all duration-700
                  ${isSelected 
                    ? "bg-white/40 border border-white/60 shadow-[0_0_40px_rgba(255,255,255,0.8)]" 
                    : "bg-white/10 border border-white/20 hover:bg-white/20 shadow-sm"
                  }
                `}
              >
                {isSelected && (
                  <motion.div 
                    className="absolute inset-0 bg-white/30 blur-2xl rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <div className="relative z-10">
                  <Companion id={c.id} size={64} animate={isSelected} />
                </div>
                <span className={`text-[13px] font-medium relative z-10 ${isSelected ? "text-[#1C1B29]" : "text-[#4A4863]"}`}>
                  {c.name}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Floating Continue Button */}
        <AnimatePresence>
          {avatar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
              className="fixed bottom-10 z-50"
            >
              <Button 
                onClick={nextStep} 
                className="h-14 px-12 rounded-full bg-white/60 hover:bg-white/80 text-[#1C1B29] font-medium border border-white/60 backdrop-blur-md shadow-[0_8px_32px_rgba(255,255,255,0.4)] transition-all duration-500 hover:shadow-[0_0_24px_rgba(255,255,255,0.8)] text-lg"
              >
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StepContainer>
  );
}
