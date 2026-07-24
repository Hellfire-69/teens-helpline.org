"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getUserJournalEntries, removeJournalEntry } from "../service";
import { useJournalStore } from "../store";
import type { JournalEntry } from "../types";
import { useAuth } from "@/features/auth/components/auth-provider";
import { JournalEmptyState } from "./journal-empty-state";

interface JournalListProps {
  onWriteClick: () => void;
}

export function JournalList({ onWriteClick }: JournalListProps) {
  const [dbEntries, setDbEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Anonymous entries from Zustand
  const memoryEntries = useJournalStore((state) => state.entries);
  const removeMemoryEntry = useJournalStore((state) => state.removeEntry);

  useEffect(() => {
    async function loadEntries() {
      if (user && !user.is_anonymous) {
        try {
          const res = await getUserJournalEntries();
          setDbEntries(res.entries);
        } catch (error) {
          console.error("Failed to load journal entries", error);
        }
      }
      setIsLoading(false);
    }
    loadEntries();
  }, [user]);

  const handleDelete = async (id: string, isMemory: boolean) => {
    if (isMemory) {
      removeMemoryEntry(id);
    } else {
      try {
        await removeJournalEntry(id);
        setDbEntries((prev) => prev.filter((e) => e.id !== id));
      } catch (error) {
        console.error("Failed to delete entry", error);
      }
    }
  };

  const displayEntries = (user && !user.is_anonymous) ? dbEntries : memoryEntries;

  if (isLoading) {
    return <div className="text-center text-night-500 py-8">Loading...</div>;
  }

  if (displayEntries.length === 0) {
    return <JournalEmptyState onWriteClick={onWriteClick} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {displayEntries.map((entry) => (
        <Card key={entry.id} className="glass-subtle radius-md elevation-1 group">
          <CardContent className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="text-type-body-sm text-night-500">
                {new Date(entry.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-night-400 hover:text-signal-crisis hover:bg-signal-crisis/10 h-8 w-8 p-0"
                onClick={() => handleDelete(entry.id, !user || user.is_anonymous)}
                title="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-type-body-lg text-night-900 whitespace-pre-wrap">
              {entry.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
