import { Navigation } from "@/components/shared/navigation";
import { SafetyBar } from "@/components/shared/safety-bar";
import { QuickExit } from "@/components/shared/quick-exit";
import { getCurrentUserWithRole } from "@/features/auth/service";
import { PageTransition } from "@/components/shared/page-transition";
import { AuroraMesh } from "@/components/shared/aurora-mesh";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const { profile, type } = await getCurrentUserWithRole();
  const role = profile?.role || (type === "anonymous" ? "anonymous" : "guest");

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      <AuroraMesh />
      
      {/* Sidebar Navigation */}
      <Navigation role={role} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 w-full">
        {/* Top Safety & Utility Bar */}
        <SafetyBar />
        
        {/* Page Content */}
        <main className="flex-1 flex flex-col pb-24 md:pb-8 w-full max-w-[1440px] mx-auto overflow-x-hidden">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>

      <QuickExit />
    </div>
  );
}
