import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { signInWithGoogle } from "@/features/auth/service";
import type { ApiResponse } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const redirectToParam = req.nextUrl.searchParams.get("redirectTo");
    const origin = req.nextUrl.origin;
    const redirectUrl = redirectToParam || `${origin}/api/auth/callback`;

    const data = await signInWithGoogle(redirectUrl);
    
    if (data?.url) {
      return NextResponse.redirect(data.url);
    }

    return NextResponse.json({ success: true, data } satisfies ApiResponse<typeof data>);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: { code: "OAUTH_FAILED", message } } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }
}
