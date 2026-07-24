import Groq from "groq-sdk";
import { serverEnv } from "@/lib/env";
import type { AIProvider, AIProviderContext } from "./types";
import { logger } from "@/lib/logger";
import { ANTI_INJECTION_GUARD } from "@/features/nova/prompt";

const groq = new Groq({ apiKey: serverEnv.GROQ_API_KEY });
// LLaMA3.1-8b is fast, standard conversational fallback.
const MODEL_NAME = "llama-3.1-8b-instant";

export class GroqProvider implements AIProvider {
  async generateReply(context: AIProviderContext): Promise<string> {
    logger.info("Generating reply with GROQ (fallback)...", { messagesCount: context.messages.length });

    if (context.messages.length === 0) {
      throw new Error("No messages provided to GROQ");
    }

    const lastMessage = context.messages[context.messages.length - 1];
    
    // For smaller models (8B), the system prompt at the beginning is often "forgotten" 
    // We enforce compliance by repeating the core directive immediately before the user's message.
    const securedLastMessage = {
      role: "user" as const,
      content: `System Instructions for Assistant:\n${ANTI_INJECTION_GUARD}\n\nUser Message:\n${lastMessage!.content}`
    };

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: context.systemPrompt },
      ...context.messages.slice(0, -1),
      securedLastMessage
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: MODEL_NAME,
      temperature: 0.7,
    });

    const reply = chatCompletion.choices[0]?.message?.content;
    if (!reply) {
      throw new Error("GROQ returned an empty response.");
    }

    return reply;
  }
}
