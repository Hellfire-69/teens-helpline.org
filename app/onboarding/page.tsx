"use client"

import dynamic from "next/dynamic"

// Dynamically import the CSS environment to prevent SSR hydration issues if we use window/scroll logic
const OnboardingEnvironment = dynamic(
  () => import("@/features/onboarding/components/OnboardingEnvironment").then(mod => mod.OnboardingEnvironment),
  { ssr: false, loading: () => <div className="h-screen w-full flex items-center justify-center bg-night-950 text-ink-300">Loading Environment...</div> }
)

export default function OnboardingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-night-950">
      <OnboardingEnvironment />
    </main>
  )
}
