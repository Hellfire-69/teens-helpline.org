import { createClient } from "@/lib/supabase/server";
import { checkRiskSignal } from "./escalation";
import { buildSystemPrompt } from "./prompt";
import { generateWithFailover } from "../../services/ai/manager";
import { validateResponse } from "./validator";
import { logger } from "@/lib/logger";
import {
  logEscalationEvent,
  createConversation,
  appendConversationMessage,
  getRecentConversationHistory,
} from "./data";
import type { ChatRequest } from "./schema";
import type { AuthUserContext } from "../auth/types";
import type { AIProviderContext } from "../../services/ai/types";

export type ChatResponse = {
  reply: string;
  escalation: boolean;
  escalationReason?: string | null;
  conversationId?: string; // For logged in users
  providerUsed?: string;
};

export async function handleChatTurn(req: ChatRequest, auth: AuthUserContext): Promise<ChatResponse> {
  const supabase = await createClient();
  const userId = auth.type === "authenticated" && auth.user && !auth.user.is_anonymous ? auth.user.id : null;
  const isAnonymous = !userId;

  // 1. Stage 1: Pre-check via Escalation Layer
  let textToCheck = req.message;
  if (req.moodContext?.note) {
    textToCheck += ` ${req.moodContext.note}`;
  }
  const riskCheck = checkRiskSignal(textToCheck);
  
  if (riskCheck.escalate && riskCheck.signal) {
    // Escalate immediately without calling AI
    try {
      await logEscalationEvent(supabase, userId, "nova", riskCheck.signal);
    } catch (err) {
      logger.error("Failed to log escalation event to DB", { error: String(err) });
    }
    
    // TRD §17 Sequence Diagram: Return Crisis banner + "talk to a real person"
    return {
      reply: "I'm hearing that you're going through something really difficult. I want you to know you're not alone, but I'm an AI and not equipped to help with this. Please reach out to a trusted adult or one of the crisis helplines on your screen right now.",
      escalation: true,
      escalationReason: riskCheck.signal
    };
  }

  // 2. Stage 4: Context Builder
  let history: { role: string; content: string }[] = [];
  let conversationId = req.conversationId;

  if (isAnonymous) {
    history = (req.recentHistory || []).slice(-6); // Server-side cap for anonymous
  } else {
    // Persistent user
    if (!conversationId) {
      // Create new conversation, defaulting to big_brother for MVP
      conversationId = await createConversation(supabase, userId!, "big_brother");
    } else {
      history = await getRecentConversationHistory(supabase, conversationId, 6);
    }
  }

  // 3. Stage 2: Prompt Builder
  // We use Big Brother as the MVP default persona
  let systemPrompt = buildSystemPrompt();

  if (req.moodContext) {
    const moodStr = req.moodContext.note 
      ? `Current mood: ${req.moodContext.moodValue}. Note: ${req.moodContext.note}`
      : `Current mood: ${req.moodContext.moodValue}`;
    systemPrompt += `\n\nUSER CONTEXT:\n${moodStr}`;
  }

  // Assemble context for provider
  const aiContext: AIProviderContext = {
    systemPrompt,
    messages: [
      ...history.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      { role: "user" as const, content: `--- BEGIN USER CONTENT ---\n${req.message}\n--- END USER CONTENT ---` }
    ]
  };

  // 4. Stage 2: Provider Abstraction
  const providerResponse = await generateWithFailover(aiContext);
  const aiReply = providerResponse.reply;

  // 5. Stage 3: Response Validator
  const validatorResult = validateResponse(aiReply);

  if (!validatorResult.isValid && validatorResult.blockedSignal) {
    // Validator flagged output as unsafe
    try {
      await logEscalationEvent(supabase, userId, "nova", validatorResult.blockedSignal);
    } catch (err) {
      logger.error("Failed to log validator escalation event to DB", { error: String(err) });
    }
    
    return {
      reply: validatorResult.safeReply,
      escalation: true,
      escalationReason: validatorResult.blockedSignal,
      conversationId
    };
  }

  // 6. DB Persistence for Logged In users
  if (!isAnonymous && conversationId) {
    // Append both messages to the conversation
    // Awaiting in parallel
    await Promise.all([
      appendConversationMessage(supabase, conversationId, "user", req.message, false),
      appendConversationMessage(supabase, conversationId, "nova", aiReply, false)
    ]);
  }

  // 7. Success
  return {
    reply: aiReply,
    escalation: false,
    conversationId,
    providerUsed: providerResponse.providerUsed
  };
}
