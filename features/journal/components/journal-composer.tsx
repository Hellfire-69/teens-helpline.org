"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitJournalEntry } from "../service";
import { useJournalStore } from "../store";
import { useAuth } from "@/features/auth/components/auth-provider";

interface JournalComposerProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function JournalComposer({ onSuccess, onCancel }: JournalComposerProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const addEntry = useJournalStore((state) => state.addEntry);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // The server action handles both DB persistence (logged-in) 
      // and just returning the sanitized/checked entry (anonymous)
      const res = await submitJournalEntry(content);
      
      if (res.success) {
        // If not logged in, we must save to Zustand to show it in the UI this session
        if (!user || user.is_anonymous) {
          addEntry(res.entry.content || "", res.entry.mood_entry_id);
        }
        setContent("");
        onSuccess();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save journal entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-standard radius-lg elevation-2 border border-night-200">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[150px] resize-none glass-subtle text-type-body-lg"
              autoComplete="off"
            />
            {error && <p className="text-signal-crisis text-type-body-sm">{error}</p>}
            {!user || user.is_anonymous ? (
              <p className="text-type-body-sm text-night-500">
                You are writing anonymously. This entry will disappear when you leave or refresh the page.
              </p>
            ) : null}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !content.trim()}
              className="bg-aurora-sea hover:bg-aurora-sea/90 text-white rounded-xl shadow-glow-sea"
            >
              {isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
