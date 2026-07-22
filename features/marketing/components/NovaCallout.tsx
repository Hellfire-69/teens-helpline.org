"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, ChatCircleText, Sparkle, User } from "@phosphor-icons/react"

export function NovaCallout() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Subtle parallax for chat bubbles
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-night-950 text-white z-0">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-aurora-sea/20 via-aurora-dusk/5 to-transparent rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        
        {/* Left: Interactive Chat Preview & Nova Avatar */}
        <div className="relative order-last lg:order-first flex flex-col justify-center mt-12 lg:mt-0 w-full gap-2 md:gap-4">
          
          {/* Floating Chat Bubble 1 (User) */}
          <motion.div 
            style={{ y: shouldReduceMotion ? 0 : y1 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
            className="self-start max-w-[260px] md:max-w-[320px] bg-white/10 dark:bg-night-900/60 backdrop-blur-2xl border border-white/20 p-4 md:p-5 rounded-[2rem] rounded-tl-sm shadow-2xl z-20 relative"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/10 p-1 rounded-full">
                <User className="w-3.5 h-3.5 text-white/80" weight="fill" />
              </div>
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider">You</span>
            </div>
            <p className="text-sm md:text-base text-white/90 font-medium">
              I'm just feeling so overwhelmed with everything today...
            </p>
          </motion.div>

          {/* Avatar Container with breathing animation */}
          <div className="flex justify-center items-center w-full relative z-10 py-2">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center pointer-events-none"
            >
              {/* Pulsing Aura */}
              <motion.div
                animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-aurora-sea/30 blur-3xl mix-blend-screen"
              />
              {/* The Image */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [-8, 8, -8] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full drop-shadow-[0_0_60px_rgba(45,212,191,0.5)]"
              >
                <Image 
                  src="/images/Nova.png" 
                  alt="Nova AI Avatar" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Chat Bubble 2 (Nova) */}
          <motion.div 
            style={{ y: shouldReduceMotion ? 0 : y2 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 20 }}
            className="self-end max-w-[280px] md:max-w-[360px] bg-aurora-sea/10 backdrop-blur-2xl border border-aurora-sea/30 p-5 md:p-6 rounded-[2rem] rounded-br-sm shadow-[0_20px_40px_rgba(45,212,191,0.2)] z-20 relative"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-aurora-sea/20 p-1 rounded-full">
                <Sparkle className="w-3.5 h-3.5 text-aurora-sea" weight="fill" />
              </div>
              <span className="text-xs font-bold text-aurora-sea uppercase tracking-wider">Nova</span>
            </div>
            <p className="text-sm md:text-base text-white font-medium leading-relaxed">
              I hear you. It's completely okay to feel that way. Let's take a deep breath together. What's weighing on you the most right now?
            </p>
          </motion.div>
        </div>

        {/* Right: Typography, CTAs, Trust Badges */}
        <motion.div 
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left z-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-aurora-sea text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
            <ChatCircleText weight="duotone" className="w-4 h-4" />
            AI Companion
          </div>
          
          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6 leading-[1.1]">
            Meet Nova. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-sea to-aurora-dusk">Your always-on support.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-ink-300 mb-10 max-w-lg leading-relaxed">
            School stress, relationship worries, or just a heavy day? Nova is here to listen, help you reflect, and figure out the next step—at your own pace, anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto gap-2 text-white bg-gradient-to-r from-aurora-sea to-aurora-dusk hover:from-aurora-sea/90 hover:to-aurora-dusk/90 shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:shadow-[0_0_50px_rgba(45,212,191,0.6)] transition-all duration-500 rounded-full h-14 px-8"
              asChild
            >
              <Link href="/onboarding">
                <span className="font-semibold text-lg">Talk to Nova</span>
                <ArrowRight className="w-5 h-5" weight="bold" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 md:gap-8 text-sm text-ink-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle weight="fill" className="w-5 h-5 text-aurora-sea/80" />
              <span>Available 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle weight="fill" className="w-5 h-5 text-aurora-sea/80" />
              <span>Anonymous by default</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle weight="fill" className="w-5 h-5 text-aurora-sea/80" />
              <span>Zero judgment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
