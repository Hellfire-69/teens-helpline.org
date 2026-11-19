export interface AIProviderContext {
  systemPrompt: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface ProviderResponse {
  reply: string;
  error?: string;
  providerUsed: "gemini" | "groq" | "fallback";
}

export interface AIProvider {
  /**
   * Generates a reply from the AI provider.
   * Should throw an error if the generation fails (so failover can catch it).
   */
  generateReply(context: AIProviderContext, signal?: AbortSignal): Promise<string>;
}
