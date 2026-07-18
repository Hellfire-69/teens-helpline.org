import { createAdminClient } from "@/lib/supabase/admin";
import { checkRiskSignal, logEscalationEvent } from "@/features/nova";
import sanitizeHtml from "sanitize-html";
import { logger } from "@/lib/logger";

const MODERATION_REGEX = /(fuck|shit|bitch|asshole|cunt|slut|whore|fag|nigger|kill|die)/i;

/**
 * Creates a new peer support session in the 'active' state (MVP: "waiting for peer").
 */
export async function createOrJoinSession(userId: string | null, anonToken: string | null) {
  const adminClient = createAdminClient();

  const payload: any = { status: "active" };
  if (userId) {
    payload.user_id = userId;
  } else if (anonToken) {
    payload.anon_token = anonToken;
  } else {
    throw new Error("Must provide either userId or anonToken");
  }

  const { data, error } = await adminClient
    .from("peer_support_sessions")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return data;
}

/**
 * Submits a message to the peer session, routing through the Escalation and Moderation layers.
 */
export async function submitMessage(
  sessionId: string,
  content: string,
  senderRef: string,
  userId: string | null
) {
  const adminClient = createAdminClient();

  // 1. Sanitization
  const cleanContent = sanitizeHtml(content, {
    allowedTags: [], // Strip all HTML
    allowedAttributes: {},
  });

  if (!cleanContent.trim()) {
    throw new Error("Message content cannot be empty after sanitization");
  }

  // 2. Escalation Pre-check
  const riskCheck = checkRiskSignal(cleanContent);
  if (riskCheck.escalate && riskCheck.signal) {
    // Escalate immediately
    try {
      await logEscalationEvent(adminClient as any, userId, "peer_chat", riskCheck.signal);
    } catch (err) {
      logger.error("Failed to log escalation event to DB", { error: String(err) });
    }

    // Mark session as flagged
    try {
      await adminClient
        .from("peer_support_sessions")
        .update({ status: "flagged" })
        .eq("id", sessionId);
    } catch (err) {
      logger.error("Failed to update session status to flagged", { error: String(err) });
    }

    return {
      escalated: true,
      reason: riskCheck.signal,
      message: "I'm hearing that you're going through something really difficult. I want you to know you're not alone, but I'm an AI and not equipped to help with this. Please reach out to a trusted adult or one of the crisis helplines on your screen right now.",
    };
  }

  // 3. Moderation Check
  const flagged = MODERATION_REGEX.test(cleanContent);

  // 4. Database Persistence (via service-role to bypass RLS constraints)
  const { data, error } = await adminClient
    .from("peer_messages")
    .insert({
      session_id: sessionId,
      sender_ref: senderRef,
      content: cleanContent,
      flagged: flagged,
    })
    .select("id, created_at, content, flagged, sender_ref")
    .single();

  if (error) {
    throw new Error(`Failed to persist message: ${error.message}`);
  }

  return {
    escalated: false,
    messageData: data,
  };
}
