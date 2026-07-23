import { useOnboardingStore, type Mood } from "@/stores/onboardingStore";
import { motion } from "framer-motion";
import { StepContainer } from "./StepContainer";

const MOODS: { id: Mood; label: string; color: string; icon: React.ReactNode }[] = [
  { 
    id: "happy", label: "Happy", color: "#F5D9C7", // Peach
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  }, 
  { 
    id: "okay", label: "Okay", color: "#FAF7F2", // Ivory
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="15" x2="16" y2="15" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  }, 
  { 
    id: "sad", label: "Sad", color: "#CFC8FF", // Lavender
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  }, 
  { 
    id: "anxious", label: "Anxious", color: "#7BC9C8", // Teal
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15h8" />
        <path d="M8 9h2" />
        <path d="M14 9h2" />
      </svg>
    )
  }, 
  { 
    id: "overwhelmed", label: "Overwhelmed", color: "#DCEFFF", // Sky
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15 c 1 -1 3 -1 4 0 c 1 1 3 1 4 0" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  }, 
];

export function MoodStep() {
  const { mood, setMood, nextStep } = useOnboardingStore();

  const handleSelect = (m: Mood) => {
    setMood(m);
    setTimeout(nextStep, 1000); // Give the background time to morph before transitioning
  };

  return (
    <StepContainer className="items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-12 text-center relative z-10">
        
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-light text-[#1C1B29] tracking-tight"
          >
            What's closest to how today feels?
          </motion.h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mt-4 w-full">
          {MOODS.map((m, i) => {
            const isSelected = mood === m.id;
            return (
              <motion.button
                key={m.id}
                onClick={() => handleSelect(m.id)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, filter: "brightness(1.05)" }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-[140px] h-[160px] rounded-[32px] flex flex-col items-center justify-center gap-4 relative overflow-hidden backdrop-blur-2xl transition-all duration-1000
                  ${isSelected 
                    ? "bg-white/60 border border-white/80 shadow-[0_0_40px_rgba(255,255,255,0.9)]" 
                    : "bg-white/20 border border-white/30 hover:bg-white/40 shadow-lg"
                  }
                `}
              >
                {isSelected && <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full" />}
                
                {/* Mood Icon with soft background pulse if selected */}
                <div className="relative z-10">
                  <motion.div 
                    animate={isSelected ? { scale: [1, 1.2, 1], rotate: [-5, 5, 0] } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center rounded-full w-16 h-16"
                    style={{ 
                      backgroundColor: isSelected ? "transparent" : `${m.color}80`, // semi transparent bg
                      color: isSelected ? m.color : "#1C1B29",
                      boxShadow: isSelected ? `0 0 20px ${m.color}` : "none"
                    }}
                  >
                    {m.icon}
                  </motion.div>
                </div>

                <span className="font-medium text-lg text-[#1C1B29] relative z-10">{m.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </StepContainer>
  );
}
