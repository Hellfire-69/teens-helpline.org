import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateWithFailover } from "../../../../services/ai/manager";
import { AIProviderContext } from "../../../../services/ai/types";

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

describe("AI Provider Manager (Failover Logic)", () => {
  const dummyContext: AIProviderContext = {
    systemPrompt: "Test System Prompt",
    messages: [{ role: "user", content: "Hello" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns Gemini's reply when successful on the first try", async () => {
    mockGeminiGenerateReply.mockResolvedValueOnce("Gemini reply 1");
    
    const result = await generateWithFailover(dummyContext);
    
    expect(result.reply).toBe("Gemini reply 1");
    expect(result.providerUsed).toBe("gemini");
    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(1);
    expect(mockGroqGenerateReply).not.toHaveBeenCalled();
  });

  it("retries Gemini once if it fails the first time", async () => {
    mockGeminiGenerateReply
      .mockRejectedValueOnce(new Error("Gemini temporary error"))
      .mockResolvedValueOnce("Gemini reply on retry");
      
    const result = await generateWithFailover(dummyContext);
    
    expect(result.reply).toBe("Gemini reply on retry");
    expect(result.providerUsed).toBe("gemini");
    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(2);
    expect(mockGroqGenerateReply).not.toHaveBeenCalled();
  });

  it("fails over to GROQ if Gemini fails twice", async () => {
    mockGeminiGenerateReply
      .mockRejectedValueOnce(new Error("Gemini error 1"))
      .mockRejectedValueOnce(new Error("Gemini error 2"));
      
    mockGroqGenerateReply.mockResolvedValueOnce("Groq fallback reply");

    const result = await generateWithFailover(dummyContext);

    expect(result.reply).toBe("Groq fallback reply");
    expect(result.providerUsed).toBe("groq");
    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(2);
    expect(mockGroqGenerateReply).toHaveBeenCalledTimes(1);
  });

  it("throws an error if both providers fail entirely", async () => {
    mockGeminiGenerateReply
      .mockRejectedValueOnce(new Error("Gemini error 1"))
      .mockRejectedValueOnce(new Error("Gemini error 2"));
      
    mockGroqGenerateReply.mockRejectedValueOnce(new Error("Groq error"));

    await expect(generateWithFailover(dummyContext)).rejects.toThrow("All AI providers failed.");

    expect(mockGeminiGenerateReply).toHaveBeenCalledTimes(2);
    expect(mockGroqGenerateReply).toHaveBeenCalledTimes(1);
  });
});
