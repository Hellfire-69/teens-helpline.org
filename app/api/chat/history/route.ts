import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { getLatestConversationWithHistory } from "@/features/nova/data";

export async function GET() {
  try {
    const { user, type } = await getCurrentUserWithRole();
    
    // If anonymous, guest, or unauthenticated, return an empty history.
    // Anonymous sessions do not persist chat history.
    if (!user || user.is_anonymous || type !== "authenticated") {
      return NextResponse.json({
        success: true,
        data: {
          conversationId: null,
          messages: []
        }
      });
    }

    const supabase = await createClient();
    const history = await getLatestConversationWithHistory(supabase, user.id, 20);
    
    // Also fetch the user's profile to get their preferred_persona
    const { data: profile } = await supabase
      .from("profiles")
      .select("preferred_persona")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      success: true,
      data: {
        ...history,
        preferredPersona: profile?.preferred_persona || null
      }
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch conversation history";
    return NextResponse.json(
      { success: false, error: { message, code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
