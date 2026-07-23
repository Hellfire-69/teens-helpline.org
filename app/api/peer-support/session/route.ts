import type { NextRequest } from "next/server";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { createOrJoinSession } from "@/features/peer-support/service";

export async function POST(_req: NextRequest): Promise<Response> {
  try {
    const authContext = await getCurrentUserWithRole();

    if (authContext.type === "guest" || !authContext.user) {
      return Response.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Must be logged in or anonymous to join a session." } },
        { status: 401 }
      );
    }

    const userId = authContext.type === "authenticated" ? authContext.user.id : null;
    const anonToken = authContext.type === "anonymous" ? authContext.user.id : null;

    const sessionData = await createOrJoinSession(userId, anonToken);

    return Response.json({
      success: true,
      data: sessionData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("Peer Support Session API error:", message);
    return Response.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred." } },
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "METHOD_NOT_ALLOWED", message: "Use POST" } }, { status: 405 });
}
