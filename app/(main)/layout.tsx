import { Navigation, SidebarProvider, SidebarInset } from "@/components/shared/navigation";
import { SafetyBar } from "@/components/shared/safety-bar";
import { QuickExit } from "@/components/shared/quick-exit";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { PageTransition } from "@/components/shared/page-transition";
import { AuroraMesh } from "@/components/shared/aurora-mesh";
import { GlobalCrisisBanner } from "@/components/shared/global-crisis-banner";
import { MainContentWrapper } from "@/components/shared/main-content-wrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, type } = await getCurrentUserWithRole();
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
    <SidebarProvider>
      <div className="relative min-h-screen flex flex-col md:flex-row w-full flex-1">
        <AuroraMesh />
        
        {/* Navigation — desktop: collapsible icon sidebar; mobile: slide-out drawer */}
        <Navigation role={role} profile={profile} type={type} email={user?.email} />

        {/* Main Content Area */}
        <SidebarInset>
          {/* Top Safety & Utility Bar (Desktop) */}
          <SafetyBar />
          
          {/* Page Content — pt-16 clears fixed mobile header; pb-12 for mobile safe area */}
          <MainContentWrapper>
            <PageTransition>
              {children}
            </PageTransition>
          </MainContentWrapper>
        </SidebarInset>

        <QuickExit />
        <GlobalCrisisBanner />
      </div>
    </SidebarProvider>
  );
}
