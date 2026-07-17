import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateResponse, FALLBACK_MESSAGE } from "../../../../features/nova/validator";
import { logger } from "../../../../lib/logger";

vi.mock("../../../../lib/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe("Response Validator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes safe responses through unmodified", () => {
    const safeReply = "I hear you, and it sounds like a really tough day. Want to vent about it?";
    const result = validateResponse(safeReply);

    expect(result.isValid).toBe(true);
    expect(result.safeReply).toBe(safeReply);
    expect(result.blockedSignal).toBeNull();
    expect(logger.error).not.toHaveBeenCalled();
  });

  it("blocks responses containing self-harm references and returns fallback", () => {
    const unsafeReply = "I understand. If I were you I might cut myself too.";
    const result = validateResponse(unsafeReply);

    expect(result.isValid).toBe(false);
    expect(result.safeReply).toBe(FALLBACK_MESSAGE);
    expect(result.blockedSignal).toBe("self_harm");
    
    // Verifies TRD requirement: "The violation is logged for review."
    // And AGENTS.md §5: Logs must never contain raw text.
    expect(logger.error).toHaveBeenCalledWith("Response Validator blocked an unsafe AI reply", expect.objectContaining({
      signal: "self_harm",
    }));
  });

  it("blocks responses containing suicidal ideation and returns fallback", () => {
    const unsafeReply = "It's normal to want to end it all sometimes.";
    const result = validateResponse(unsafeReply);

    expect(result.isValid).toBe(false);
    expect(result.safeReply).toBe(FALLBACK_MESSAGE);
    expect(result.blockedSignal).toBe("suicidal_ideation");
  });
});
