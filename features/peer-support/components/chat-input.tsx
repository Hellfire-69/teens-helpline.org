"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatInput({
  onSendMessage,
  disabled
}: {
  onSendMessage: (msg: string) => Promise<void>;
  disabled?: boolean;
}) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || disabled || isSending) return;

    setIsSending(true);
    try {
      await onSendMessage(content);
      setContent("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center bg-background rounded-full border border-border shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-aurora-blush/50 transition-all">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled || isSending}
        className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-[15px] placeholder:text-muted-foreground"
      />
      <Button
        type="submit"
        size="sm"
        disabled={!content.trim() || disabled || isSending}
        className="rounded-full h-10 w-10 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm ml-2 p-0"
      >
        {isSending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4 ml-0.5" />
        )}
      </Button>
    </form>
  );
}
