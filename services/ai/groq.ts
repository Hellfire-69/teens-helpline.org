import Groq from "groq-sdk";
import { serverEnv } from "@/lib/env";
import type { AIProvider, AIProviderContext } from "./types";
import { logger } from "@/lib/logger";

const groq = new Groq({ apiKey: serverEnv.GROQ_API_KEY });
// LLaMA3.1-8b is fast, standard conversational fallback.
const MODEL_NAME = "llama-3.1-8b-instant";

export class GroqProvider implements AIProvider {
  async generateReply(context: AIProviderContext): Promise<string> {
    logger.info("Generating reply with GROQ (fallback)...", { messagesCount: context.messages.length });

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: context.systemPrompt },
      ...context.messages,
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
