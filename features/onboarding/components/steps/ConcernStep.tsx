import { useOnboardingStore } from "@/stores/onboarding-store";
import { motion } from "framer-motion";
import { StepContainer } from "./StepContainer";

const CONCERNS = [
  { id: "School & Academics", color: "#7BC9C8", icon: (
    <svg viewBox="0 0 100 100" className="w-16 h-16 mb-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 80 V20 Q20 10 30 10 H80 V70 H30 Q20 70 20 80 Z" />
      <path d="M20 80 Q20 90 30 90 H80" />
      <line x1="40" y1="30" x2="60" y2="30" />
      <line x1="40" y1="45" x2="60" y2="45" />
    </svg>
  )},
  { id: "Anxiety or Stress", color: "#CFC8FF", icon: (
    <svg viewBox="0 0 100 100" className="w-16 h-16 mb-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 50 Q35 20 50 50 T80 50" />
      <path d="M20 70 Q35 40 50 70 T80 70" />
    </svg>
  )},
  { id: "Relationships & Friends", color: "#F5D9C7", icon: (
    <svg viewBox="0 0 100 100" className="w-16 h-16 mb-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="35" cy="40" r="15" />
      <circle cx="65" cy="60" r="15" />
      <path d="M45 40 Q55 50 55 60" strokeDasharray="4 4" />
    </svg>
  )},
  { id: "Family Issues", color: "#DCEFFF", icon: (
    <svg viewBox="0 0 100 100" className="w-16 h-16 mb-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 60 L50 30 L80 60 V85 H20 Z" />
      <rect x="40" y="60" width="20" height="25" />
    </svg>
  )},
  { id: "Just feeling down", color: "#7BC9C8", icon: (
    <svg viewBox="0 0 100 100" className="w-16 h-16 mb-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="50" cy="50" r="30" strokeDasharray="10 10" />
      <path d="M40 60 Q50 65 60 60" />
    </svg>
  )},
  { id: "Something else", color: "#FAF7F2", icon: (
    <svg viewBox="0 0 100 100" className="w-16 h-16 mb-4 opacity-80" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="30" cy="50" r="4" fill="currentColor" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      <circle cx="70" cy="50" r="4" fill="currentColor" />
    </svg>
  )}
];

export function ConcernStep() {
  const { concern, setConcern, nextStep } = useOnboardingStore();

  const handleSelect = (c: string) => {
    setConcern(c);
    setTimeout(nextStep, 700);
  };

  return (
    <StepContainer className="items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-12 text-center relative z-10">
        
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-light text-[#1C1B29] tracking-tight"
          >
            What is on your mind?
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full max-w-4xl">
          {CONCERNS.map((c, i) => {
            const isSelected = concern === c.id;
            return (
              <motion.button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                whileTap={{ scale: 0.98 }}
                className={`
                  p-8 h-[200px] rounded-[32px] flex flex-col items-center justify-center gap-2 relative overflow-hidden backdrop-blur-2xl transition-all duration-700 text-center
                  ${isSelected 
                    ? "bg-white/60 border border-white/80 shadow-[0_0_40px_rgba(255,255,255,0.9)]" 
                    : "bg-white/20 border border-white/30 hover:bg-white/40 shadow-lg"
                  }
                `}
              >
                {isSelected && <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full" />}
                <div 
                  className="relative z-10 transition-colors duration-500" 
                  style={{ color: isSelected ? "#1C1B29" : c.color }}
                >
                  {c.icon}
                </div>
                <span className="font-medium text-[17px] text-[#1C1B29] relative z-10">{c.id}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </StepContainer>
  );
}
