import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

interface JournalEmptyStateProps {
  onWriteClick: () => void;
}

export function JournalEmptyState({ onWriteClick }: JournalEmptyStateProps) {
  return (
    <Card className="glass-subtle elevation-1 border-none shadow-none text-center py-12 px-6">
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-night-100 flex items-center justify-center text-night-500 mb-2">
          <PenLine className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-type-title-lg text-night-900 font-semibold">
          Nothing here yet
        </h3>
        <p className="text-type-body-md text-night-600 max-w-sm mb-4">
          Get what's on your mind out on paper. Your journal is a private space just for you.
        </p>
        <Button onClick={onWriteClick} className="bg-aurora-sea hover:bg-aurora-sea/90 text-white rounded-xl shadow-glow-sea">
          Write Entry
        </Button>
      </CardContent>
    </Card>
  );
}
