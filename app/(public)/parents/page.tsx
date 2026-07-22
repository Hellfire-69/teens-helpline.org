"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Parents as ParentsComponent } from "@/features/marketing/components/Parents"
import { Lock, ChatCircle, ShieldCheck } from "@phosphor-icons/react"

export default function ParentsPage() {
  return (
    <main className="w-full bg-paper-50 dark:bg-night-950 min-h-screen">
      
      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left Side: Sticky Visual & Context */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen p-8 lg:p-20 flex flex-col justify-center overflow-hidden bg-night-900 text-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-night-950/40 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/80 to-transparent z-20" />
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
              alt="Parent and teenager talking" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-30 max-w-md">
            <span className="inline-block px-4 py-1.5 rounded-full bg-aurora-sea/20 text-aurora-sea text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm border border-aurora-sea/20 backdrop-blur-md">
              For Parents & Guardians
            </span>
            <h1 className="font-fraunces text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
              Support them without breaking their trust.
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
              We know how hard it is to watch your teenager struggle. Here is how TeensHelpline balances absolute confidentiality with life-saving safety protocols.
            </p>
          </div>
        </div>

        {/* Right Side: Scrolling Glass Content */}
        <div className="p-8 lg:p-20 lg:pt-32 space-y-12 bg-paper-50 dark:bg-night-950">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white dark:bg-night-900 border border-ink-100 dark:border-white/10 rounded-[2rem] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:shadow-none"
          >
            <div className="w-14 h-14 rounded-2xl bg-aurora-blush/10 flex items-center justify-center mb-6">
              <ChatCircle className="w-7 h-7 text-aurora-blush" weight="duotone" />
            </div>
            <h2 className="font-fraunces text-3xl font-semibold text-ink-900 dark:text-white mb-4">
              How to Start the Conversation
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mb-6 leading-relaxed">
              Opening up to parents is incredibly hard for teenagers. They fear being judged or misunderstood. Try these communication tips:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-aurora-blush mt-2 shrink-0" />
                <p className="text-ink-700 dark:text-ink-300">Avoid interrogating questions. Ask open-ended questions like <em>"How have things been feeling lately?"</em></p>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-aurora-blush mt-2 shrink-0" />
                <p className="text-ink-700 dark:text-ink-300">Practice active listening without rushing to solve the problem immediately.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-aurora-blush mt-2 shrink-0" />
                <p className="text-ink-700 dark:text-ink-300">Acknowledge their stress rather than dismissing it as "just school stress."</p>
              </li>
            </ul>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white dark:bg-night-900 border border-ink-100 dark:border-white/10 rounded-[2rem] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:shadow-none"
          >
            <div className="w-14 h-14 rounded-2xl bg-aurora-sea/10 flex items-center justify-center mb-6">
              <Lock className="w-7 h-7 text-aurora-sea" weight="duotone" />
            </div>
            <h2 className="font-fraunces text-3xl font-semibold text-ink-900 dark:text-white mb-4">
              The Limits of Confidentiality
            </h2>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed">
              To build a trusting environment where teenagers actually open up, we keep conversation logs with peers and Nova strictly private. <strong>We do not provide parents with transcripts of their teen's chats.</strong> 
            </p>
            <p className="text-ink-600 dark:text-ink-300 leading-relaxed mt-4">
              However, anonymity is instantly suspended if there is an imminent threat to a teen's life or safety.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white dark:bg-night-900 border border-ink-100 dark:border-white/10 rounded-[2rem] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:shadow-none relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-signal-crisis/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-signal-crisis/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-signal-crisis" weight="duotone" />
              </div>
              <h2 className="font-fraunces text-3xl font-semibold text-ink-900 dark:text-white mb-4">
                Life-Saving Escalation
              </h2>
              <p className="text-ink-600 dark:text-ink-300 leading-relaxed">
                If a teenager indicates suicidal ideation or severe self-harm, our synchronous escalation layer immediately intercepts the conversation. We mandate routing to professional emergency services in India, and we will breach confidentiality to notify emergency contacts if necessary.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="w-full">
        <ParentsComponent />
      </div>

    </main>
  )
}
