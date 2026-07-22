"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Schools as SchoolsComponent } from "@/features/marketing/components/Schools"
import { ChartLineUp, ShieldCheck, BookOpen } from "@phosphor-icons/react"

export default function SchoolsPage() {
  return (
    <main className="w-full bg-paper-50 dark:bg-night-950 min-h-screen pt-32 pb-20 px-4 md:px-8">
      
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-aurora-dusk/10 text-aurora-dusk text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm border border-aurora-dusk/20 backdrop-blur-md">
          For Educators & Institutions
        </span>
        <h1 className="font-fraunces text-5xl md:text-7xl font-semibold text-ink-900 dark:text-white mb-6 tracking-tight">
          Safe schools start with <br className="hidden md:block" /> emotional visibility.
        </h1>
        <p className="text-xl text-ink-600 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
          Explore classroom strategies, recognize warning signs in students, and leverage aggregate safeguarding protocols to build a supportive district culture.
        </p>
      </div>

      {/* Bento Box Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        
        {/* Large Feature Card (Spans 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 row-span-1 md:row-span-2 relative overflow-hidden bg-white dark:bg-night-900 rounded-[2.5rem] p-10 border border-ink-100 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-none group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-dusk/5 to-transparent pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-aurora-dusk/10 flex items-center justify-center mb-8">
                <ChartLineUp className="w-8 h-8 text-aurora-dusk" weight="duotone" />
              </div>
              <h2 className="font-fraunces text-4xl font-semibold text-ink-900 dark:text-white mb-4">
                Aggregate Analytics
              </h2>
              <p className="text-lg text-ink-600 dark:text-ink-300 leading-relaxed max-w-md">
                We maintain absolute student privacy. School boards and teachers receive only aggregate, anonymized statistics to understand emotional wellbeing trends across the district without compromising individual student trust.
              </p>
            </div>
          </div>
          
          {/* Decorative element for the large bento box */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-aurora-dusk/20 blur-[80px] rounded-full pointer-events-none" />
        </motion.div>

        {/* Small Square 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden bg-white dark:bg-night-900 rounded-[2.5rem] p-8 border border-ink-100 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-aurora-sea/10 to-transparent pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-aurora-sea/10 flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-aurora-sea" weight="duotone" />
          </div>
          <div>
            <h3 className="font-fraunces text-2xl font-semibold text-ink-900 dark:text-white mb-3">
              Classroom Strategies
            </h3>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
              Integrate trauma-informed teaching practices and establish 2-minute daily emotional check-in routines.
            </p>
          </div>
        </motion.div>

        {/* Small Square 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative overflow-hidden bg-white dark:bg-night-900 rounded-[2.5rem] p-8 border border-ink-100 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col justify-between"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-signal-crisis/10 to-transparent pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-signal-crisis/10 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-signal-crisis" weight="duotone" />
          </div>
          <div>
            <h3 className="font-fraunces text-2xl font-semibold text-ink-900 dark:text-white mb-3">
              Safeguarding
            </h3>
            <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
              Automated escalation protocols immediately involve emergency services if severe self-harm or life-threatening scenarios are detected.
            </p>
          </div>
        </motion.div>

        {/* Wide Bottom Card (Spans 3 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-3 relative overflow-hidden bg-night-950 rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-aurora-sea/20 via-night-950 to-aurora-blush/20 opacity-50" />
          <div className="relative z-10 max-w-xl">
            <h2 className="font-fraunces text-3xl font-semibold text-white mb-4">
              Bring TeensHelpline to your district
            </h2>
            <p className="text-ink-300 leading-relaxed">
              Equip your school counselors and administration with bulk access to our premium safeguarding analytics and professional development modules.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <button className="px-8 py-4 bg-white text-night-950 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
              Contact Partnerships
            </button>
          </div>
        </motion.div>

      </div>

      <div className="w-full mt-24">
        <SchoolsComponent />
      </div>

    </main>
  )
}
