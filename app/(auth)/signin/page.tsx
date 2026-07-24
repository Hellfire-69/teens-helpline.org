"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/components/auth-provider"
import { motion } from "framer-motion"
import { ArrowRight, UserCircle, Loader2 } from "lucide-react"
import Link from "next/link"

// Google G Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
)

export default function SignInPage() {
  const router = useRouter()
  const { signIn, signInAnonymously, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<"email" | "google" | "anon" | false>(false)

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading("email")

    try {
      await signIn(email, password)
      router.refresh()
      router.push("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError(null)
    setLoading("google")

    try {
      await signInWithGoogle(`${window.location.origin}/auth/callback`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.")
      setLoading(false)
    }
  }

  async function handleAnonymousSignIn() {
    setError(null)
    setLoading("anon")

    try {
      await signInAnonymously()
      router.refresh()
      router.push("/onboarding")
    } catch {
      setError("Network error. Please try again.")
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
            You're exactly where you need to be today.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-ink-600 dark:text-white/60 text-lg leading-relaxed max-w-md"
          >
            A safe space to explore your feelings, find support, and connect with someone who understands.
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
            <h2 className="text-3xl font-semibold text-ink-900 dark:text-white tracking-tight">Sign In</h2>
            <p className="text-ink-600 dark:text-ink-300 text-base">Select how you'd like to access your space today.</p>
          </div>
          
          {/* Section A: Anonymous Entry (Primary) */}
          <div className="space-y-4">
            <div className="p-1 rounded-2xl bg-gradient-to-b from-aurora-sea/20 to-transparent shadow-sm">
              <Button 
                variant="primary"
                onClick={handleAnonymousSignIn} 
                disabled={loading !== false}
                className="w-full h-16 rounded-xl text-lg font-medium shadow-none bg-white/80 dark:bg-night-900/80 backdrop-blur-xl border border-ink-300/10 text-ink-900 dark:text-white hover:bg-white dark:hover:bg-night-800 transition-all duration-300 group flex justify-between items-center px-6 hover:shadow-lg hover:shadow-aurora-sea/20 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-aurora-sea/10 flex items-center justify-center text-aurora-sea group-hover:scale-110 transition-transform">
                    <UserCircle className="w-5 h-5" />
                  </div>
                  <span>Continue Anonymously</span>
                </div>
                {loading === "anon" ? (
                  <Loader2 className="w-5 h-5 animate-spin text-ink-400" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-ink-400 group-hover:text-aurora-sea group-hover:translate-x-1 transition-all" />
                )}
              </Button>
            </div>
            <p className="text-xs text-center text-ink-500 dark:text-ink-400">
              Off the record. No email or password required.
            </p>
          </div>

          {/* Section B: Divider */}
          <div className="relative flex items-center py-4">
            <span className="w-full border-t border-ink-300/20 dark:border-white/10" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-paper-50 dark:bg-night-950 px-4 text-xs font-medium uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Save your progress
            </span>
          </div>

          {/* Section C: Saved Account Entry */}
          <div className="space-y-6">
            <Button 
              variant="secondary"
              onClick={handleGoogleSignIn} 
              disabled={loading !== false}
              className="w-full h-12 bg-white/80 dark:bg-night-900/80 backdrop-blur-xl border-ink-300/20 text-ink-900 dark:text-white hover:bg-white dark:hover:bg-night-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <GoogleIcon />
              )}
              {loading === "google" ? "Redirecting..." : "Log in with Google"}
            </Button>

            <form onSubmit={handleEmailSignIn} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
                  suppressHydrationWarning
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
                  suppressHydrationWarning
                />
              </div>
              <Button 
                variant="secondary" 
                type="submit" 
                disabled={loading !== false}
                className="w-full h-12 bg-white/80 dark:bg-night-900/80 backdrop-blur-xl border-ink-300/20 text-ink-900 dark:text-white hover:bg-white dark:hover:bg-night-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {loading === "email" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  "Log in with Email"
                )}
              </Button>
            </form>
          </div>

          <div className="text-center text-sm text-ink-600 dark:text-ink-400">
            Don't have an account? <Link href="/signup" className="text-aurora-sea hover:underline">Sign Up</Link>
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
