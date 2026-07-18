import { ChatInterface } from "@/features/peer-support/components/chat-interface";
import type { Metadata } from "next";
import { getCurrentUserWithRole } from "@/features/auth/service";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Peer Support",
  description: "Connect anonymously with a trained peer supporter.",
};

export default async function PeerSupportPage() {
  const auth = await getCurrentUserWithRole();

  // Role Boundary: Coming Soon roles (AGENTS.md §5)
  if (auth.type === "authenticated" && auth.profile) {
    const comingSoonRoles = ["moderator", "admin", "counsellor", "teacher_educator"];
    if (comingSoonRoles.includes(auth.profile.role)) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-muted/50 p-6 rounded-2xl max-w-md border border-border">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-fraunces font-semibold mb-2">Not Yet Available</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The {auth.profile.role} dashboard and associated peer support routing are currently under development and will be available in a future update.
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full mb-6">
        <h1 className="text-3xl font-fraunces font-semibold text-foreground mb-2">
          Peer Support
        </h1>
        <p className="text-muted-foreground">
          Talk to someone who gets it. Our peer supporters are trained to listen and share their experiences without judgment.
        </p>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 w-full">
        <ChatInterface />
      </div>
    </div>
  );
}
