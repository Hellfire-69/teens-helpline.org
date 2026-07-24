"use client";

"use client";

import React, { useState } from "react";
import { JournalList } from "@/features/journal/components/journal-list";
import { JournalComposer } from "@/features/journal/components/journal-composer";
import { useAuth } from "@/features/auth/components/auth-provider";

export default function JournalPage() {
  const [isComposing, setIsComposing] = useState(false);
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col max-w-2xl mx-auto py-8 px-4 sm:px-6 w-full gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-type-title-xl text-night-950 font-bold tracking-tight">Journal</h1>
        <p className="text-type-body-lg text-night-600">
          A private space for your thoughts. 
          {(!user || user.is_anonymous) && " (Anonymous entries are not saved and will disappear when you leave.)"}
        </p>
      </div>

      {!isComposing ? (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-type-title-lg text-night-900 font-semibold">Your Entries</h2>
            <button
              onClick={() => setIsComposing(true)}
              className="text-type-label text-aurora-sea hover:text-aurora-sea/80 font-bold transition-colors"
            >
              + NEW ENTRY
            </button>
          </div>
          <JournalList onWriteClick={() => setIsComposing(true)} />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
           <h2 className="text-type-title-lg text-night-900 font-semibold">New Entry</h2>
           <JournalComposer 
             onSuccess={() => setIsComposing(false)} 
             onCancel={() => setIsComposing(false)} 
           />
        </div>
      )}
    </div>
  );
}
