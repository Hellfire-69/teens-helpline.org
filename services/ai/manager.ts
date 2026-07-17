import { AIProviderContext, ProviderResponse } from "./types";
import { GeminiProvider } from "./gemini";
import { GroqProvider } from "./groq";
import { logger } from "@/lib/logger";

const gemini = new GeminiProvider();
const groq = new GroqProvider();

/**
 * Wraps a promise with a strict timeout to ensure AI provider hangs (e.g. from 
 * internal 503 backoffs) don't block the failover pipeline.
 */
async function withTimeout<T>(promise: Promise<T>, ms: number = 8000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Provider timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

/**
 * Implements the Provider Abstraction & automatic failover described in TRD §17.
 * 
 * Pipeline:
 * 1. Try Gemini (Primary) with an 8-second timeout.
 * 2. If failed, retry Gemini once.
 * 3. If failed again, failover to GROQ (Secondary).
 * 4. If GROQ fails, throw an error so the caller can return the safe static fallback.
 */
export async function generateWithFailover(context: AIProviderContext): Promise<ProviderResponse> {
  // 1. Try Gemini primary
  try {
    const reply = await withTimeout(gemini.generateReply(context));
    return { reply, providerUsed: "gemini" };
  } catch (error) {
    logger.warn("Gemini generation failed, retrying once before failover", { error: String(error) });
    
    // Retry Gemini once per TRD §17
    try {
      const reply = await withTimeout(gemini.generateReply(context));
      return { reply, providerUsed: "gemini" };
    } catch (retryError) {
      logger.error("Gemini retry failed, failing over to GROQ", { error: String(retryError) });
    }
  }

  // 2. Try GROQ secondary/fallback
  try {
    const reply = await withTimeout(groq.generateReply(context));
    return { reply, providerUsed: "groq" };
  } catch (error) {
    logger.error("GROQ fallback also failed", { error: String(error) });
    // Both providers failed.
    throw new Error("All AI providers failed.");
  }
}
