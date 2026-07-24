import { NextResponse } from "next/server";
import { moodRequestSchema } from "@/features/mood-engine/schema";
import { processMoodEntry } from "@/features/mood-engine/service";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate incoming request against moodRequestSchema
    const parseResult = moodRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid mood entry request",
            details: parseResult.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const moodReq = parseResult.data;

    // 2. Call processMoodEntry from Stage 2
    const result = processMoodEntry(moodReq);

    // 3. Resolve the user via existing auth resolution
    const auth = await getCurrentUserWithRole();
    const userId = auth.user?.id || null;
    const isTeen = auth.type === "authenticated" && auth.profile?.role === "teen";

    // 4. Persistence to mood_entries for Logged-In Teens
    // We do this BEFORE short-circuiting so escalated moods are still tracked 
    // with risk_flagged: true for logged-in users, as intended by the schema.
    if (isTeen) {
      const supabase = await createClient();
      const { error: insertError } = await supabase.from("mood_entries").insert({
        user_id: userId,
        mood_value: moodReq.mood_value,
        note: moodReq.note || null,
        risk_flagged: result.escalation, 
      });

      if (insertError) {
        logger.error("Failed to persist mood_entries", { error: String(insertError) });
      }
    } else {
      // If anonymous or Guest: DO NOT insert into mood_entries at all
      // Skip persistence entirely, even for escalations.
    }

    // 5. Escalation Logging & Short-circuit
    if (result.escalation && result.escalationReason) {
      try {
        const adminClient = createAdminClient();
        const { error: escalationError } = await adminClient.from("escalation_events").insert({
          user_id: userId, // nullable for anon
          trigger_source: "mood_entry",
          risk_signal: result.escalationReason,
        });
        
        if (escalationError) {
          throw new Error(escalationError.message);
        }
      } catch (err) {
        // Logging failure must never block or corrupt the safety-critical reply
        logger.error("Failed to log escalation event to DB", { 
          error: String(err),
          context: "mood_engine_escalation",
        });
      }

      // Short-circuit: Return the crisis response
      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    // 6. Return the standard response envelope for normal entries
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error("Unhandled error in /api/mood", { error: String(error) });
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred processing the mood entry",
        },
      },
      { status: 500 }
    );
  }
}
