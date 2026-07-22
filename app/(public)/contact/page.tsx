"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { Envelope, Chats, MapPin, PaperPlaneRight } from "@phosphor-icons/react"

export default function ContactPage() {
  // 3D Tilt Hook
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <main className="w-full bg-night-950 text-white min-h-screen relative overflow-hidden flex flex-col justify-center items-center pt-32 pb-24 px-4 md:px-8">
      
      {/* Animated Colormorphic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-aurora-dusk/30 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-aurora-sea/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left: Contact Info */}
        <div className="max-w-md">
          <span className="inline-block px-4 py-1.5 rounded-full bg-aurora-sea/20 text-aurora-sea text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm border border-aurora-sea/20 backdrop-blur-md">
            Reach Out
          </span>
          <h1 className="font-fraunces text-5xl md:text-7xl font-semibold mb-6 tracking-tight drop-shadow-lg">
            Let's build <br/> something safer.
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-medium mb-12 leading-relaxed">
            Have questions about our volunteer programs, partnerships, or want to share feedback about the platform? Reach out to our team directly.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Envelope className="w-6 h-6 text-aurora-dusk" weight="duotone" />
              </div>
              <div>
                <h3 className="font-fraunces text-xl font-semibold text-white mb-1">Email Us</h3>
                <p className="text-white/60">hello@teenshelpline.org</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Chats className="w-6 h-6 text-aurora-sea" weight="duotone" />
              </div>
              <div>
                <h3 className="font-fraunces text-xl font-semibold text-white mb-1">Volunteer Inquiries</h3>
                <p className="text-white/60">join@teenshelpline.org</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-aurora-blush" weight="duotone" />
              </div>
              <div>
                <h3 className="font-fraunces text-xl font-semibold text-white mb-1">Headquarters</h3>
                <p className="text-white/60">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3D Tilting Contact Form */}
        <div className="relative w-full max-w-lg mx-auto perspective-1000">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full bg-night-900/60 backdrop-blur-3xl border border-white/20 p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
          >
            {/* Glossy Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-[3rem] pointer-events-none" style={{ transform: "translateZ(1px)" }} />
            
            <div style={{ transform: "translateZ(40px)" }} className="relative">
              <h2 className="font-fraunces text-3xl font-semibold text-white mb-2">
                Send a Message
              </h2>
              <p className="text-white/60 text-sm mb-8">
                Note: do not use this contact form to request crisis support as replies may take up to 48 hours.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">
                    Email Address
                  </label>
                  <input 
                    disabled 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full h-14 px-6 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-aurora-sea transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-white/70 mb-2">
                    Message
                  </label>
                  <textarea 
                    disabled 
                    rows={4} 
                    placeholder="How can we assist you?" 
                    className="w-full p-6 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-aurora-sea transition-colors resize-none disabled:opacity-50"
                  />
                </div>
                
                <button disabled className="w-full h-14 rounded-full bg-gradient-to-r from-aurora-dusk to-aurora-sea text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                  <span>Send Message</span>
                  <PaperPlaneRight className="w-5 h-5" weight="fill" />
                </button>
              </div>

              <p className="text-[10px] text-white/40 mt-6 text-center italic font-mono">
                -- PROTOTYPE: simulated build --
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  )
}
