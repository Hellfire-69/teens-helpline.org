import { GoogleGenerativeAI } from "@google/generative-ai";
import { serverEnv } from "@/lib/env";
import type { AIProvider, AIProviderContext } from "./types";
import { logger } from "@/lib/logger";

const genAI = new GoogleGenerativeAI(serverEnv.GEMINI_API_KEY);

export class GeminiProvider implements AIProvider {
  async generateReply(context: AIProviderContext): Promise<string> {
    logger.info("Generating reply with Gemini...", { messagesCount: context.messages.length });
    
    // We use gemini-flash-lite-latest as the standard conversational model for speed and efficiency.
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: context.systemPrompt,
    });

    const chatSession = model.startChat({
      history: context.messages.slice(0, -1).map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = context.messages[context.messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user") {
      throw new Error("Last message must be from user");
    }

    const result = await chatSession.sendMessage([{ text: lastMessage.content }]);
    return result.response.text();
  }
}
