/**
 * DEV-ONLY TEST HARNESS: Nova Chat
 * 
 * This is a minimal, unstyled, developer-only test page to manually verify
 * Nova's tone and escalation behavior against the real /api/chat endpoint.
 * 
 * It is explicitly NOT a shipped feature, and should NOT be styled or 
 * linked in navigation.
 */
"use client";

import { useState } from "react";

export default function NovaTestPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          recentHistory: messages, // Send history since we are anonymous
          moodContext: { moodValue: "Okay" }, // Mock mood
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to fetch");
      }

      setMessages(prev => [
        ...prev, 
        { role: "user", content: userMessage },
        { role: "assistant", content: data.data.reply + (data.data.escalation ? " [ESCALATION TRIGGERED]" : "") }
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "monospace" }}>
      <h1>DEV ONLY: Nova Test Harness</h1>
      <p style={{ color: "red" }}>Warning: This is a raw testing page. Do not ship this UI.</p>
      
      <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "10px", color: m.role === "user" ? "blue" : "green" }}>
            <strong>{m.role}: </strong>
            <span style={{ whiteSpace: "pre-wrap" }}>{m.content}</span>
          </div>
        ))}
      </div>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>Error: {error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message to Nova..."
          disabled={loading}
          style={{ flex: 1, padding: "5px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
