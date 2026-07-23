import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitMessage, createOrJoinSession } from "@/features/peer-support/service";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRiskSignal, logEscalationEvent } from "@/features/nova";

// Mock dependencies
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(),
}));

vi.mock("@/features/nova", () => ({
  checkRiskSignal: vi.fn(),
  logEscalationEvent: vi.fn(),
}));

describe("Peer Support Service", () => {
  const mockAdminClient = {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn(),
    rpc: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createAdminClient).mockReturnValue(mockAdminClient as unknown as ReturnType<typeof createAdminClient>);
  });

  describe("createOrJoinSession", () => {
    it("should create a session with userId", async () => {
      mockAdminClient.single.mockResolvedValue({ data: { id: "session-123" }, error: null });

      const result = await createOrJoinSession("user-1", null);

      expect(mockAdminClient.from).toHaveBeenCalledWith("peer_support_sessions");
      expect(mockAdminClient.insert).toHaveBeenCalledWith({ status: "active", user_id: "user-1" });
      expect(result).toEqual({ id: "session-123" });
    });

    it("should create a session with anonToken", async () => {
      mockAdminClient.single.mockResolvedValue({ data: { id: "session-456" }, error: null });

      const result = await createOrJoinSession(null, "anon-123");

      expect(mockAdminClient.insert).toHaveBeenCalledWith({ status: "active", anon_token: "anon-123" });
      expect(result).toEqual({ id: "session-456" });
    });
  });

  describe("submitMessage", () => {
    it("should process a safe message correctly", async () => {
      vi.mocked(checkRiskSignal).mockReturnValue({ escalate: false, signal: null });
      mockAdminClient.single.mockResolvedValue({
        data: { id: "msg-1", content: "hello", flagged: false, sender_ref: "user" },
        error: null,
      });

      const result = await submitMessage("sess-1", "hello", "user", "user-1");

      expect(checkRiskSignal).toHaveBeenCalledWith("hello");
      expect(logEscalationEvent).not.toHaveBeenCalled();
      expect(mockAdminClient.insert).toHaveBeenCalledWith({
        session_id: "sess-1",
        sender_ref: "user",
        content: "hello",
        flagged: false, // Moderation check passes
      });
      expect(result.escalated).toBe(false);
    });

    it("should sanitize HTML", async () => {
      vi.mocked(checkRiskSignal).mockReturnValue({ escalate: false, signal: null });
      mockAdminClient.single.mockResolvedValue({ data: {}, error: null });

      await submitMessage("sess-1", "<script>alert(1)</script>hello", "user", "user-1");

      // sanitize-html strips <script> entirely
      expect(checkRiskSignal).toHaveBeenCalledWith("hello");
      expect(mockAdminClient.insert).toHaveBeenCalledWith(
        expect.objectContaining({ content: "hello" })
      );
    });

    it("should flag messages with profanity", async () => {
      vi.mocked(checkRiskSignal).mockReturnValue({ escalate: false, signal: null });
      mockAdminClient.single.mockResolvedValue({ data: {}, error: null });

      await submitMessage("sess-1", "this is dumb shit", "user", "user-1");

      expect(mockAdminClient.insert).toHaveBeenCalledWith(
        expect.objectContaining({ flagged: true })
      );
    });

    it("should escalate immediately if risk signal is detected", async () => {
      vi.mocked(checkRiskSignal).mockReturnValue({ escalate: true, signal: "suicidal_ideation" });

      const result = await submitMessage("sess-1", "I want to die", "user", "user-1");

      expect(logEscalationEvent).toHaveBeenCalledWith(mockAdminClient, "user-1", "peer_chat", "suicidal_ideation");
      expect(mockAdminClient.update).toHaveBeenCalledWith({ status: "flagged" });
      expect(mockAdminClient.eq).toHaveBeenCalledWith("id", "sess-1");
      expect(mockAdminClient.insert).not.toHaveBeenCalled(); // Message is NOT persisted to peer_messages
      expect(result.escalated).toBe(true);
      expect(result.reason).toBe("suicidal_ideation");
    });
  });
});
