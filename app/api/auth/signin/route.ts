import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { signInWithEmail } from "@/features/auth/service";
import { emailLoginSchema } from "@/features/auth/schema";
import type { ApiResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = emailLoginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Invalid email" } } satisfies ApiResponse<never>,
        { status: 400 }
      );
    }

    const { email, redirectTo } = result.data;
    
    // Provide a sensible default fallback URL for the redirect
    const origin = req.nextUrl.origin;
    const redirectUrl = redirectTo || `${origin}/api/auth/callback`;

    const data = await signInWithEmail(email, redirectUrl);
    
    return NextResponse.json({ success: true, data } satisfies ApiResponse<typeof data>);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: { code: "SIGNIN_FAILED", message } } satisfies ApiResponse<never>,
      { status: 400 }
    );
  }
}
