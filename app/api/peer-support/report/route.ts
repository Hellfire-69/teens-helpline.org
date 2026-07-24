import type { NextRequest } from "next/server";
import { reportMessageSchema } from "@/features/peer-support/schema";
import { reportMessage } from "@/features/peer-support/service";
import { getCurrentUserWithRole } from "@/features/auth/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();

    // Validate input via Zod
    const parseResult = reportMessageSchema.safeParse(body);
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

    // Guests can't report, but anonymous or registered users can.
    if (authContext.type === "guest" || !authContext.user) {
      return Response.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Must be logged in or anonymous to submit a report." } },
        { status: 401 }
      );
    }

    const { messageId, reasonSlug, details } = parseResult.data;
    const reporterId = authContext.type === "authenticated" ? authContext.user.id : null;

    // Pass to service layer
    const responseData = await reportMessage(messageId, reasonSlug, details, reporterId);

    return Response.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("Peer Support Report API error:", message);
    return Response.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: message } },
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "METHOD_NOT_ALLOWED", message: "Use POST" } }, { status: 405 });
}
