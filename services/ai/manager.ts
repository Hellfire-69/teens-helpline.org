import { AIProviderContext, ProviderResponse } from "./types";
import { GeminiProvider } from "./gemini";
import { GroqProvider } from "./groq";
import { logger } from "@/lib/logger";

const gemini = new GeminiProvider();
const groq = new GroqProvider();

/**
 * Implements the Provider Abstraction & automatic failover described in TRD §17.
 * 
 * Pipeline:
 * 1. Try Gemini (Primary)
 * 2. If failed, retry Gemini once.
 * 3. If failed again, failover to GROQ (Secondary).
 * 4. If GROQ fails, throw an error so the caller can return the safe static fallback.
 */
export async function generateWithFailover(context: AIProviderContext): Promise<ProviderResponse> {
  // 1. Try Gemini primary
  try {
    const reply = await gemini.generateReply(context);
    return { reply, providerUsed: "gemini" };
  } catch (error) {
    logger.warn("Gemini generation failed, retrying once before failover", { error: String(error) });
    
    // Retry Gemini once per TRD §17
    try {
      const reply = await gemini.generateReply(context);
      return { reply, providerUsed: "gemini" };
    } catch (retryError) {
      logger.error("Gemini retry failed, failing over to GROQ", { error: String(retryError) });
    }
  }

  // 2. Try GROQ secondary/fallback
  try {
    const reply = await groq.generateReply(context);
    return { reply, providerUsed: "groq" };
  } catch (error) {
    logger.error("GROQ fallback also failed", { error: String(error) });
    // Both providers failed.
    throw new Error("All AI providers failed.");
  }
}
