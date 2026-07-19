import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import type { RiskSignal } from "./escalation";

export async function logEscalationEvent(
  supabase: SupabaseClient, // Still passed but we'll use adminClient for this specific table
  userId: string | null,
  triggerSource: "nova" | "mood_entry" | "peer_chat" | "content_page",
  riskSignal: RiskSignal
) {
  const adminClient = createAdminClient();
  // We explicitly DO NOT log the raw message per TRD §15 and Schema §3.14
  const { error } = await adminClient
    .from("escalation_events")
    .insert({
      user_id: userId, // null if anonymous
      trigger_source: triggerSource,
      risk_signal: riskSignal
    });
    
  if (error) throw new Error("Failed to log escalation event: " + error.message);
}

export async function createConversation(supabase: SupabaseClient, userId: string, personaUsed: string) {
  const { data, error } = await supabase
    .from("nova_conversations")
    .insert({ user_id: userId, persona_used: personaUsed })
    .select("id")
    .single();
    
  if (error) throw new Error("Failed to create conversation: " + error.message);
  return data.id;
}

export async function appendConversationMessage(
  supabase: SupabaseClient, 
  conversationId: string, 
  sender: "user" | "nova", 
  content: string, 
  escalationTriggered: boolean = false
) {
  const { error } = await supabase
    .from("conversation_messages")
    .insert({
      conversation_id: conversationId,
      sender,
      content,
      escalation_triggered: escalationTriggered
    });
    
  if (error) throw new Error("Failed to append message: " + error.message);
}

export async function getRecentConversationHistory(supabase: SupabaseClient, conversationId: string, limit: number = 6) {
  // Fetch messages for context builder, bounded window
  const { data, error } = await supabase
    .from("conversation_messages")
    .select("sender, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error("Failed to fetch history: " + error.message);
  
  // Return in chronological order
  return data.reverse().map(msg => ({
    role: msg.sender === "nova" ? "assistant" : "user",
    content: msg.content
  }));
}

export async function getLatestConversationWithHistory(
  supabase: SupabaseClient, 
  userId: string, 
  limit: number = 20
) {
  // 1. Get the user's most recent conversation ID
  const { data: convData, error: convError } = await supabase
    .from("nova_conversations")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (convError) throw new Error("Failed to fetch latest conversation: " + convError.message);
  
  // If no previous conversation exists, return null values
  if (!convData) return { conversationId: null, messages: [] };

  const conversationId = convData.id;

  // 2. Fetch the bounded history for that conversation
  const { data: msgData, error: msgError } = await supabase
    .from("conversation_messages")
    .select("sender, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (msgError) throw new Error("Failed to fetch history: " + msgError.message);

  // Return in chronological order for the UI
  return {
    conversationId,
    messages: msgData.reverse().map(msg => ({
      role: msg.sender === "nova" ? "assistant" : "user",
      content: msg.content
    }))
  };
}
