import { NextRequest } from "next/server";
import { chatRequestSchema } from "@/features/nova/schema";
import { handleChatTurn } from "@/features/nova/service";
import { getCurrentUserWithRole } from "@/features/auth/service";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    
    // Validate input via Zod
    const parseResult = chatRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json({ 
        success: false, 
        error: { code: "VALIDATION_ERROR", message: "Invalid request data", details: parseResult.error.flatten() } 
      }, { status: 400 });
    }

    // Get current session context
    const authContext = await getCurrentUserWithRole();

    // Pass to service layer
    const chatResponse = await handleChatTurn(parseResult.data, authContext);

    // TRD §13 standard response envelope
    return Response.json({
      success: true,
      data: chatResponse
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return Response.json({ 
      success: false, 
      error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred processing your message." } 
    }, { status: 500 });
  }
}

export async function GET(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "METHOD_NOT_ALLOWED", message: "Use POST" } }, { status: 405 });
}
