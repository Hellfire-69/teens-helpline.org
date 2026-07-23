import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore, type AgeBand } from "@/stores/onboardingStore";
import { motion, AnimatePresence } from "framer-motion";
import { StepContainer } from "./StepContainer";
import { Button } from "@/components/ui/button";
import { completeOnboardingAction } from "@/features/auth/actions";
import { Loader2, User, Users } from "lucide-react";

export function NovaWelcomeStep() {
  const { role, setRole, age_band, setAgeBand } = useOnboardingStore();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    // If somehow role wasn't set, default to teen
    const finalRole = role || "teen";

    setLoading(true);
    setError(null);
    try {
      // Mark onboarding as complete
      const { avatar, role, age_band } = useOnboardingStore.getState();
      const res = await completeOnboardingAction({ 
        avatarId: avatar ?? undefined, 
        role: role ?? undefined,
        ageBand: age_band ?? undefined
      });

      if (!res.success) {
        throw new Error(res.error || "Failed to complete onboarding");
      }

      router.push(`/dashboard/${finalRole}`);
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <StepContainer className="items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center text-center gap-6 relative z-50">

        <motion.h2
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-light text-[#1C1B29] tracking-tight"
        >
          Thank you for sharing that.
        </motion.h2>

        {/* Nova Glow Form */}
        <div className="w-48 h-48 relative flex items-center justify-center my-2 z-40">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: loading ? 1.5 : 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#7BC9C8]/40 blur-3xl rounded-full"
          />
          <motion.div
            animate={{ scale: loading ? [1, 1.5, 1] : [1, 1.2, 1], opacity: loading ? 0.8 : [0.4, 0.7, 0.4] }}
            transition={{ duration: loading ? 1.5 : 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-8 bg-[#CFC8FF]/60 blur-2xl rounded-full"
          />
          {/* Particles Burst */}
          {!loading && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0],
                x: Math.cos(i * 45 * (Math.PI / 180)) * 80,
                y: Math.sin(i * 45 * (Math.PI / 180)) * 80,
              }}
              transition={{ duration: 3, ease: "easeOut", delay: 1 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="flex flex-col items-center gap-6 w-full max-w-md"
        >
          <p className="text-[#4A4863] text-xl leading-[1.55] mb-2">
            Who are we setting this space up for?
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={() => setRole("teen")}
              className={`flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-[24px] border transition-all duration-300 ${role === "teen"
                  ? "bg-white/60 border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                  : "bg-white/20 border-white/30 hover:bg-white/40"
                }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role === "teen" ? "bg-[#DCEFFF] text-[#7BC9C8]" : "bg-black/5 text-[#1C1B29]"}`}>
                <User className="w-6 h-6" />
              </div>
              <span className="font-medium text-[#1C1B29]">I'm a Teen</span>
            </button>

            <button
              onClick={() => setRole("parent")}
              className={`flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-[24px] border transition-all duration-300 ${role === "parent"
                  ? "bg-white/60 border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                  : "bg-white/20 border-white/30 hover:bg-white/40"
                }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role === "parent" ? "bg-[#F5D9C7] text-[#CFC8FF]" : "bg-black/5 text-[#1C1B29]"}`}>
                <Users className="w-6 h-6" />
              </div>
              <span className="font-medium text-[#1C1B29]">I'm a Parent</span>
            </button>
          </div>

          <AnimatePresence>
            {role === "teen" && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full mt-4 flex flex-col gap-4 overflow-hidden"
              >
                <p className="text-[#4A4863] text-lg">How old are you?</p>
                <div className="flex gap-4 w-full">
                  {['13-15', '16-19'].map((band) => {
                    const isSelected = age_band === band;
                    return (
                      <motion.button
                        key={band}
                        onClick={() => setAgeBand(band as AgeBand)}
                        animate={{ scale: isSelected ? 1.03 : 1 }}
                        whileHover={{ scale: 1.05, filter: "brightness(1.05)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-1 p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                          isSelected 
                            ? "bg-white/60 border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)] text-[#1C1B29] font-medium" 
                            : "bg-white/20 border-white/30 text-[#4A4863] hover:bg-white/40 shadow-sm"
                        }`}
                      >
                        {isSelected && <div className="absolute inset-0 bg-white/40 blur-2xl rounded-full" />}
                        <span className="relative z-10">{band === '13-15' ? '13 - 15' : '16 - 19'}</span>
                      </motion.button>
                    );
                  })}
                </div>
                <button
                    onClick={() => setAgeBand("Prefer not to say")}
                    className="text-sm text-[#4A4863] hover:text-[#1C1B29] underline mt-2"
                  >
                    Prefer not to say
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {((role === "teen" && age_band) || role === "parent") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full mt-6"
              >
                <Button
                  onClick={handleComplete}
                  disabled={loading}
                  className="w-full h-14 rounded-full bg-white hover:bg-white/90 text-[#1C1B29] font-medium shadow-md transition-all duration-300 text-lg flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Entering Dashboard...
                    </>
                  ) : (
                    "Go to Dashboard"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </motion.div>
      </div>
    </StepContainer>
  );
}
