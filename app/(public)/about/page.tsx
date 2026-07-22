"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Heart, EyeSlash, Shield } from "@phosphor-icons/react"
import { PeerSupportSection } from "@/features/marketing/components/PeerSupportSection"
import { FAQ } from "@/features/marketing/components/FAQ"

export default function AboutPage() {
  return (
    <main className="w-full bg-night-950 min-h-screen text-white pt-32 pb-20 px-4 md:px-8">
      
      {/* Aurora Ambient Lighting */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-aurora-dusk/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-aurora-sea/20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[12000ms]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center mb-24 mt-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-aurora-sea/20 text-aurora-sea text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm border border-aurora-sea/20 backdrop-blur-md"
        >
          Our Mission
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-fraunces text-6xl md:text-8xl font-semibold mb-8 tracking-tight drop-shadow-xl"
        >
          A safer internet <br className="hidden md:block" /> for every teen.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
        >
          TeensHelpline was built by young people, for young people, to provide anonymous, immediate emotional support without judgment.
        </motion.p>
      </div>

      {/* Bento Grid Pillars */}
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-dusk/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-aurora-dusk/20 border border-aurora-dusk/30 flex items-center justify-center mb-8">
            <Heart className="w-8 h-8 text-aurora-dusk" weight="duotone" />
          </div>
          <h2 className="font-fraunces text-3xl font-semibold mb-4">Warm Support</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            Empathy first. No sterile clinical language. We meet you exactly where you are, sounding like a peer who actually gets it.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-sea/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-aurora-sea/20 border border-aurora-sea/30 flex items-center justify-center mb-8">
            <EyeSlash className="w-8 h-8 text-aurora-sea" weight="duotone" />
          </div>
          <h2 className="font-fraunces text-3xl font-semibold mb-4">Anonymous First</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            Your identity stays yours. No tracking, no forced logins for crisis help. We don't need your name to help you.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-signal-crisis/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-signal-crisis/20 border border-signal-crisis/30 flex items-center justify-center mb-8">
            <Shield className="w-8 h-8 text-signal-crisis" weight="duotone" />
          </div>
          <h2 className="font-fraunces text-3xl font-semibold mb-4">Safety Net</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            Backed by professional safeguarding protocols. If things get dangerous, we securely escalate to emergency services.
          </p>
        </motion.div>
      </div>

      <div className="w-full relative z-10 max-w-6xl mx-auto rounded-[3rem] bg-paper-100 dark:bg-night-900 border border-ink-100 dark:border-white/10 overflow-hidden pt-10 mb-32">
        <PeerSupportSection />
      </div>

      <div className="w-full relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 mb-32">
        <h2 className="text-center font-fraunces text-4xl font-semibold mb-12 mt-8">Frequently Asked Questions</h2>
        <div className="bg-white dark:bg-night-900 rounded-3xl p-6">
          <FAQ />
        </div>
      </div>

    </main>
  )
}
