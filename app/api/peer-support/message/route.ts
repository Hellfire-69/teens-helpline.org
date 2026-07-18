import type { NextRequest } from "next/server";
import { submitMessageSchema } from "@/features/peer-support/schema";
import { submitMessage } from "@/features/peer-support/service";
import { getCurrentUserWithRole } from "@/features/auth/service";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();

    // Validate input via Zod
    const parseResult = submitMessageSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Invalid request data", details: parseResult.error.flatten() },
        },
        { status: 400 }
      );
    }

    // Get current session context
    const authContext = await getCurrentUserWithRole();

    if (authContext.type === "guest" || !authContext.user) {
      return Response.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Must be logged in or anonymous to send a message." } },
        { status: 401 }
      );
    }

    const { sessionId, content } = parseResult.data;
    const userId = authContext.type === "authenticated" ? authContext.user.id : null;
    const senderRef = authContext.type === "authenticated" ? "user" : "anonymous";

    // Pass to service layer
    const responseData = await submitMessage(sessionId, content, senderRef, userId);

    // TRD §13 standard response envelope
    return Response.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("Peer Support Message API error:", message);
    return Response.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: message } },
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "METHOD_NOT_ALLOWED", message: "Use POST" } }, { status: 405 });
}
