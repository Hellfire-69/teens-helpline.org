import { Navigation } from "@/components/shared/navigation";
import { SafetyBar } from "@/components/shared/safety-bar";
import { QuickExit } from "@/components/shared/quick-exit";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { PageTransition } from "@/components/shared/page-transition";
import { AuroraMesh } from "@/components/shared/aurora-mesh";
import { GlobalCrisisBanner } from "@/components/shared/global-crisis-banner";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const { profile, type } = await getCurrentUserWithRole();
  const cookieStore = await cookies();
  const anonOnboardingCompleted = cookieStore.has('anon_onboarding_completed');  
  if (type === "authenticated" && profile && !profile.onboarding_completed) {
    redirect("/onboarding");
  }

  if (type === "anonymous" && !anonOnboardingCompleted) {
    redirect("/onboarding");
  }

  const role = profile?.role || (type === "anonymous" ? "anonymous" : "guest");

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      <AuroraMesh />
      
      {/* Sidebar Navigation — desktop: fixed; mobile: fixed bottom tab bar (see navigation.tsx) */}
      <Navigation role={role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 w-full min-h-screen">
        {/* Top Safety & Utility Bar */}
        <SafetyBar />
        
        {/* Page Content — pb-24 clears the fixed mobile tab bar (≈60px) + safe area */}
        <main className="flex-1 flex flex-col pb-24 md:pb-8 w-full max-w-[1440px] mx-auto overflow-x-hidden">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>

      <QuickExit />
      <GlobalCrisisBanner />
    </div>
  );
}
