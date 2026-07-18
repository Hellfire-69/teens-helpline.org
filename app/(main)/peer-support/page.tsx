import { ChatInterface } from "@/features/peer-support/components/chat-interface";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peer Support",
  description: "Connect anonymously with a trained peer supporter.",
};

export default function PeerSupportPage() {
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
