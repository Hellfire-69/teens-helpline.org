import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { AuthService } from "@/features/auth/service";

export async function POST(_req: NextRequest) {
  try {
    const supabase = await createClient();
    const authService = new AuthService(supabase);
    const data = await authService.signInAnonymously();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: { code: "ANON_AUTH_FAILED", message } },
      { status: 400 }
    );
  }
}
