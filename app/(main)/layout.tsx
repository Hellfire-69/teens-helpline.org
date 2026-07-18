import { CrisisBanner } from "@/components/shared/crisis-banner";
import { QuickExit } from "@/components/shared/quick-exit";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background/50">
      <CrisisBanner />
      
      {/* Navigation will go here in a future stage */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 h-14 flex items-center px-6">
        <h1 className="font-fraunces text-xl font-medium tracking-tight">TeensHelpline</h1>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <QuickExit />
    </div>
  );
}
