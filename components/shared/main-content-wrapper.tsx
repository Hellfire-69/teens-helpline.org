"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChat = pathname === "/chat" || pathname?.startsWith("/chat/");

  return (
    <main
      className={cn(
        "flex-1 flex flex-col pt-16 md:pt-0 w-full overflow-x-hidden",
        isChat ? "pb-0" : "pb-12 md:pb-8 w-full lg:max-w-[1120px] mx-auto px-4 md:px-8"
      )}
    >
      {children}
    </main>
  );
}
