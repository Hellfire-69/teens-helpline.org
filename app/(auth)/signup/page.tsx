"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/components/auth-provider"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"teen" | "parent">("teen")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, displayName, role)
      // Routing is handled by layout, but we can navigate to dashboard (layout will catch incomplete onboarding)
      router.push("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex w-full bg-paper-50 dark:bg-night-950">
      
      {/* Left Panel: Visual/Atmosphere */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-paper-50 to-paper-100 dark:from-[#1C1B29] dark:to-[#0F0E17] flex-col justify-between p-16">
        
        {/* Animated Aurora Mesh Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              x: ["0%", "10%", "-5%", "0%"], 
              y: ["0%", "-10%", "5%", "0%"],
              scale: [1, 1.1, 0.9, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#5B9AA0] rounded-full blur-[120px] opacity-20"
          />
          <motion.div 
            animate={{ 
              x: ["0%", "-10%", "10%", "0%"], 
              y: ["0%", "10%", "-5%", "0%"],
              scale: [1, 1.2, 0.8, 1] 
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[30%] -right-[20%] w-[80%] h-[80%] bg-[#6B5B95] rounded-full blur-[140px] opacity-25"
          />
          <motion.div 
            animate={{ 
              x: ["0%", "5%", "-10%", "0%"], 
              y: ["0%", "-15%", "10%", "0%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-[#F2A65A] rounded-full blur-[100px] opacity-15"
          />
        </div>

        <div className="relative z-10">
          <h2 className="text-ink-900 dark:text-white text-xl font-medium tracking-wide">
            TeensHelpline<span className="text-[#5B9AA0]">.org</span>
          </h2>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-ink-900 dark:text-white font-fraunces text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6"
          >
            Start your journey with us today.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-ink-600 dark:text-white/60 text-lg leading-relaxed max-w-md"
          >
            Create your safe space to explore your feelings, find support, and connect with someone who understands.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-ink-500 dark:text-white/40 text-sm">
          <span>Confidential</span>
          <span className="w-1 h-1 rounded-full bg-ink-300 dark:bg-white/20" />
          <span>Anonymous</span>
          <span className="w-1 h-1 rounded-full bg-ink-300 dark:bg-white/20" />
          <span>24/7 Available</span>
        </div>
      </div>

      {/* Right Panel: Action Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-24 relative overflow-hidden">
        
        {/* Subtle mesh for mobile view only */}
        <div className="absolute inset-0 z-0 lg:hidden pointer-events-none">
           <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[80%] bg-[#5B9AA0] rounded-full blur-[100px] opacity-[0.08] dark:opacity-[0.15]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10 space-y-10"
        >
          <div className="lg:hidden mb-12">
            <h2 className="text-ink-900 dark:text-white text-xl font-medium tracking-wide">
              TeensHelpline<span className="text-aurora-sea">.org</span>
            </h2>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-ink-900 dark:text-white tracking-tight">Create Account</h2>
            <p className="text-ink-600 dark:text-ink-300 text-base">Fill out the details below to set up your space.</p>
          </div>
          
          <div className="space-y-6">
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              
              <div className="flex gap-4 mb-2">
                <label className="flex-1 cursor-pointer flex items-center gap-2 text-sm text-ink-900 dark:text-white bg-white/50 dark:bg-night-900/50 p-3 rounded-xl border border-ink-300/30 dark:border-white/10 hover:bg-white dark:hover:bg-night-800 transition-colors">
                  <input type="radio" name="role" value="teen" checked={role === "teen"} onChange={() => setRole("teen")} className="accent-aurora-sea" />
                  I'm a Teen
                </label>
                <label className="flex-1 cursor-pointer flex items-center gap-2 text-sm text-ink-900 dark:text-white bg-white/50 dark:bg-night-900/50 p-3 rounded-xl border border-ink-300/30 dark:border-white/10 hover:bg-white dark:hover:bg-night-800 transition-colors">
                  <input type="radio" name="role" value="parent" checked={role === "parent"} onChange={() => setRole("parent")} className="accent-aurora-sea" />
                  I'm a Parent
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="What should we call you? (Display Name)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Password (min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
                />
              </div>

              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="w-full h-12 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </div>

          <div className="text-center text-sm text-ink-600 dark:text-ink-400">
            Already have an account? <Link href="/signin" className="text-aurora-sea hover:underline">Sign In</Link>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-signal-crisis/10 border border-signal-crisis/20 text-signal-crisis text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

        </motion.div>
      </div>
    </main>
  )
}
