import { NextResponse } from "next/server";
import { getCurrentUserWithRole } from "@/features/auth/server";
import type { ApiResponse } from "@/types";

export async function GET() {
  try {
    const data = await getCurrentUserWithRole();
    return NextResponse.json({ success: true, data } satisfies ApiResponse<typeof data>);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: { code: "SESSION_ERROR", message } } satisfies ApiResponse<never>,
      { status: 500 }
    );
  }
}

