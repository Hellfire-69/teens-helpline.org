import { CrisisBanner } from "@/components/shared/crisis-banner"
import { QuickExit } from "@/components/shared/quick-exit"
import { AuroraMesh } from "@/components/shared/aurora-mesh"
import { Navbar } from "@/features/marketing/components/Navbar"
import { Footer } from "@/features/marketing/components/Footer"

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AuroraMesh />
      
      {/* Persistent Crisis Banner at the top of public viewport */}
      <CrisisBanner />
      <Navbar />
      
      {/* Content wrapper */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>

      <Footer />
      {/* Floating Quick Exit Button */}
      <QuickExit />
    </div>
  )
}
