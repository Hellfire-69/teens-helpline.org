import type { AIProviderContext, ProviderResponse } from "./types";
import { GeminiProvider } from "./gemini";
import { GroqProvider } from "./groq";
import { logger } from "@/lib/logger";

const gemini = new GeminiProvider();
const groq = new GroqProvider();

const PRIMARY_TIMEOUT_MS = 4000;
const SECONDARY_TIMEOUT_MS = 5000;

/**
 * Wraps provider call with AbortController to ensure timed-out requests
 * are cancelled on the wire and don't block the failover pipeline.
 */
async function executeWithTimeout<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  ms: number,
  providerName: string
): Promise<T> {
  const controller = new AbortController();
  let timer: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error(`${providerName} timed out after ${ms}ms`));
    }, ms);
  });

  try {
    return await Promise.race([fn(controller.signal), timeoutPromise]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Implements the Provider Abstraction & automatic failover:
 * 1. Try Gemini (Primary) with a 4-second timeout using AbortController.
 * 2. If failed, fail over to GROQ immediately (no same-provider retry).
 * 3. Try GROQ (Secondary) with a 5-second timeout using AbortController.
 * 4. Log provider used, latency, and failovers (without message text).
 */
export async function generateWithFailover(context: AIProviderContext): Promise<ProviderResponse> {
  const startTime = Date.now();

  // 1. Try Gemini primary
  try {
    const geminiStart = Date.now();
    const reply = await executeWithTimeout(
      (signal) => gemini.generateReply(context, signal),
      PRIMARY_TIMEOUT_MS,
      "Gemini"
    );
    const latencyMs = Date.now() - geminiStart;
    logger.info("AI generation succeeded with primary provider", {
      provider: "gemini",
      latencyMs,
      messagesCount: context.messages.length,
    });
    return { reply, providerUsed: "gemini" };
  } catch (error) {
    const geminiLatencyMs = Date.now() - startTime;
    logger.warn("Primary provider failed, failing over to secondary", {
      primaryProvider: "gemini",
      secondaryProvider: "groq",
      latencyMs: geminiLatencyMs,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // 2. Try GROQ secondary/fallback
  try {
    const groqStart = Date.now();
    const reply = await executeWithTimeout(
      (signal) => groq.generateReply(context, signal),
      SECONDARY_TIMEOUT_MS,
      "Groq"
    );
    const latencyMs = Date.now() - groqStart;
    logger.info("AI generation succeeded with secondary provider", {
      provider: "groq",
      latencyMs,
      totalLatencyMs: Date.now() - startTime,
      messagesCount: context.messages.length,
    });
    return { reply, providerUsed: "groq" };
  } catch (error) {
    const totalLatencyMs = Date.now() - startTime;
    logger.error("All AI providers failed", {
      totalLatencyMs,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error("All AI providers failed.");
  }
}
