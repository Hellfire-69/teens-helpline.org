import { ChatInterface } from "@/features/peer-support/components/chat-interface";
import type { Metadata } from "next";
import { getCurrentUserWithRole } from "@/features/auth/service";
import { UsersThree, WarningCircle } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Peer Support | TeensHelpline",
  description: "Connect anonymously with a trained peer supporter who understands.",
};

export default async function PeerSupportPage() {
  const auth = await getCurrentUserWithRole();

  // Role Boundary: Coming Soon roles (AGENTS.md §5)
  if (auth.type === "authenticated" && auth.profile) {
    const comingSoonRoles = ["moderator", "admin", "counsellor", "teacher_educator"];
    if (comingSoonRoles.includes(auth.profile.role)) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
          <div className="bg-white/60 dark:bg-night-950/60 border border-white/20 dark:border-white/10 p-space-8 rounded-radius-xl max-w-md shadow-sm">
            <div className="w-14 h-14 rounded-radius-full bg-aurora-dusk/10 flex items-center justify-center mx-auto mb-space-6">
              <WarningCircle weight="duotone" className="w-7 h-7 text-aurora-dusk" aria-hidden="true" />
            </div>
            <h2 className="text-type-title-lg font-fraunces font-semibold text-ink-900 dark:text-white mb-space-3">
              Not Yet Available
            </h2>
            <p className="text-type-body-md text-ink-600 dark:text-ink-300 leading-relaxed">
              The <span className="font-semibold capitalize">{auth.profile.role}</span> dashboard and peer support routing are currently under development. Check back soon.
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <main className="flex flex-col py-space-6 px-4 md:px-space-8 w-full min-h-screen">
      {/* Page header */}
      <div className="max-w-4xl mx-auto w-full mb-space-6">
        <div className="flex items-center gap-3 mb-space-2">
          <div className="w-9 h-9 rounded-radius-full bg-aurora-blush/15 flex items-center justify-center shrink-0">
            <UsersThree weight="fill" className="w-5 h-5 text-aurora-blush" aria-hidden="true" />
          </div>
          <h1 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white">
            Peer Support
          </h1>
        </div>
        <p className="text-type-body-md text-ink-600 dark:text-ink-300 max-w-xl pl-12">
          Talk to someone who gets it — trained peers who listen without judgment.
        </p>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 w-full max-w-4xl mx-auto">
        <ChatInterface />
      </div>
    </main>
  );
}
