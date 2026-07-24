import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRiskSignal, logEscalationEvent } from "@/features/nova";
import sanitizeHtml from "sanitize-html";
import { logger } from "@/lib/logger";
import { getUserSessions as fetchUserSessions } from "./data";

export async function getUserSessions(userId: string) {
  return fetchUserSessions(userId);
}

const MODERATION_REGEX = /(fuck|shit|bitch|asshole|cunt|slut|whore|fag|nigger)/i;

/**
 * Creates a new peer support session in the 'active' state (MVP: "waiting for peer").
 */
export async function createOrJoinSession(userId: string | null, anonToken: string | null) {
  const adminClient = createAdminClient();

  if (!userId && !anonToken) {
    throw new Error("Must provide either userId or anonToken");
  }

  const { data, error } = await adminClient.rpc("match_or_create_peer_session", {
    p_user_id: userId,
    p_anon_token: anonToken
  });

  if (error) {
    throw new Error(`Failed to create or join session: ${error.message}`);
  }

  // Fetch the current status to know if we matched or created
  const { data: sessionData } = await adminClient
    .from("peer_support_sessions")
    .select("status")
    .eq("id", data)
    .single();

  return { id: data, status: sessionData?.status || "waiting" };
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
      await logEscalationEvent(adminClient as SupabaseClient, userId, "peer_chat", riskCheck.signal);
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

/**
 * Reports a peer support message.
 */
export async function reportMessage(
  messageId: string,
  reasonSlug: string,
  details: string | undefined,
  reporterId: string | null
) {
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from("reports")
    .insert({
      reporter_id: reporterId, // Null if anonymous, as designed in Stage 2
      reported_entity: "peer_message",
      entity_id: messageId,
      reason_slug: reasonSlug,
      details: details,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to submit report: ${error.message}`);
  }

  return data;
}

/**
 * Leaves or closes a peer support session.
 */
export async function leaveSession(sessionId: string) {
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("peer_support_sessions")
    .update({ status: "closed" })
    .eq("id", sessionId);

  if (error) {
    throw new Error(`Failed to leave session: ${error.message}`);
  }
}
