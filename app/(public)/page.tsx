import { Hero } from "@/features/marketing/components/Hero"
import { Trust } from "@/features/marketing/components/Trust"
import { Flow } from "@/features/marketing/components/Flow"
import { NovaCallout } from "@/features/marketing/components/NovaCallout"
import { FeaturesGrid } from "@/features/marketing/components/FeaturesGrid"
import { ConcernsGrid } from "@/features/marketing/components/ConcernsGrid"
import { Testimonials } from "@/features/marketing/components/Testimonials"

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Built on Trust */}
        <Trust />

        {/* Flow Section */}
        <Flow />

        {/* Nova Callout */}
        <NovaCallout />

        {/* FeaturesGrid */}
        <FeaturesGrid />

        {/* Common Concerns */}
        <ConcernsGrid />

        {/* Testimonials */}
        <Testimonials />
      </main>
    </div>
  )
}
