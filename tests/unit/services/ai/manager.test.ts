import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateWithFailover, FALLBACK_REPLY } from "../../../../services/ai/manager";
import type { AIProviderContext } from "../../../../services/ai/types";

const { mockGeminiGenerateReply, mockGroqGenerateReply } = vi.hoisted(() => {
  return {
    mockGeminiGenerateReply: vi.fn(),
    mockGroqGenerateReply: vi.fn(),
  };
});

vi.mock("../../../../services/ai/gemini", () => {
  return {
    GeminiProvider: vi.fn().mockImplementation(() => {
      return { generateReply: mockGeminiGenerateReply };
    }),
  };
});

vi.mock("../../../../services/ai/groq", () => {
  return {
    GroqProvider: vi.fn().mockImplementation(() => {
      return { generateReply: mockGroqGenerateReply };
    }),
  };
});

describe("AI Provider Manager (Failover & Fallback Logic)", () => {
  const dummyContext: AIProviderContext = {
    systemPrompt: "Test System Prompt",
    messages: [{ role: "user", content: "Hello" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("primary ok then secondary never called", async () => {
    mockGeminiGenerateReply.mockResolvedValueOnce("Gemini successful reply");

    const result = await generateWithFailover(dummyContext);

    expect(result.reply).toBe("Gemini successful reply");
    expect(result.providerUsed).toBe("gemini");
    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(1);
    expect(mockGroqGenerateReply).not.toHaveBeenCalled();
  });

  it("fails over to secondary immediately if primary fails with an error (no retry)", async () => {
    mockGeminiGenerateReply.mockRejectedValueOnce(new Error("Gemini immediate error"));
    mockGroqGenerateReply.mockResolvedValueOnce("Groq fallback reply");

    const result = await generateWithFailover(dummyContext);

    expect(result.reply).toBe("Groq fallback reply");
    expect(result.providerUsed).toBe("groq");
    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(1);
    expect(mockGroqGenerateReply).toHaveBeenCalledTimes(1);
  });

  it("primary times out then secondary answers", async () => {
    vi.useFakeTimers();

    // Primary hangs longer than primary timeout (4s)
    mockGeminiGenerateReply.mockImplementation(
      (_ctx, signal?: AbortSignal) =>
        new Promise((resolve, reject) => {
          const timer = setTimeout(() => resolve("Late Gemini"), 10000);
          signal?.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(new Error("Operation aborted"));
          });
        })
    );

    mockGroqGenerateReply.mockResolvedValueOnce("Groq answered after Gemini timeout");

    const promise = generateWithFailover(dummyContext);
    await vi.advanceTimersByTimeAsync(4001);
    const result = await promise;

    expect(result.reply).toBe("Groq answered after Gemini timeout");
    expect(result.providerUsed).toBe("groq");
    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(1);
    expect(mockGroqGenerateReply).toHaveBeenCalledTimes(1);
  });

  it("both fail then fallback returned, nothing thrown", async () => {
    mockGeminiGenerateReply.mockRejectedValueOnce(new Error("Gemini down"));
    mockGroqGenerateReply.mockRejectedValueOnce(new Error("Groq down"));

    let threwError = false;
    let result;
    try {
      result = await generateWithFailover(dummyContext);
    } catch {
      threwError = true;
    }

    expect(threwError).toBe(false);
    expect(result).toBeDefined();
    expect(result?.reply).toBe(FALLBACK_REPLY);
    expect(result?.providerUsed).toBe("fallback");
    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(1);
    expect(mockGroqGenerateReply).toHaveBeenCalledTimes(1);
  });

  it("both time out then fallback returned, nothing thrown", async () => {
    vi.useFakeTimers();

    mockGeminiGenerateReply.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve("Late Gemini"), 10000))
    );
    mockGroqGenerateReply.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve("Late Groq"), 10000))
    );

    const promise = generateWithFailover(dummyContext);
    await vi.advanceTimersByTimeAsync(9100);
    const result = await promise;

    expect(result.reply).toBe(FALLBACK_REPLY);
    expect(result.providerUsed).toBe("fallback");
  });
});
