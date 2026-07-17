import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { continueAnonymously } from "@/features/auth/service";
import type { ApiResponse } from "@/types";

export async function POST(_req: NextRequest) {
  try {
    const data = await continueAnonymously();
    return NextResponse.json({ success: true, data } satisfies ApiResponse<typeof data>);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: { code: "ANON_AUTH_FAILED", message } } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }
}

