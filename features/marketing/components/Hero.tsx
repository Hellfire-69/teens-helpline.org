"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Envelope } from "@phosphor-icons/react"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"

interface HeroProps {
  onContinueAnonymously?: () => void
}

export function Hero({ onContinueAnonymously }: HeroProps) {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/images/hero-foreground.png"
      bgImageSrc="/images/hero-background.png"
      title="A safe place to pause, talk, | and find your next step"
      scrollToExpand="Scroll to explore"
      textBlend={false}
    >
      <div className="flex flex-col items-center justify-center h-full text-white text-center space-y-8 max-w-3xl mx-auto px-6 pt-12 md:pt-20">
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
          You don't have to carry it all alone.
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium drop-shadow max-w-2xl">
          Nova is here to listen without judgment, or you can connect with trained peers who truly understand what you're going through.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-8">
          <Button
            size="lg"
            onClick={onContinueAnonymously}
            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-xl transition-all duration-300 rounded-full px-8 py-6"
            asChild
          >
            <Link href="/onboarding" className="flex items-center gap-3">
              <span className="font-semibold text-lg">Continue Anonymously</span>
              <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button
            size="lg"
            className="group relative overflow-hidden bg-black/20 hover:bg-black/30 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all duration-300 rounded-full px-8 py-6"
            asChild
          >
            <Link href="/signin" className="flex items-center gap-3">
              <Envelope className="w-5 h-5 opacity-80" />
              <span className="font-semibold text-lg">Sign in with Email</span>
            </Link>
          </Button>
        </div>
      </div>
    </ScrollExpandMedia>
  )
}
