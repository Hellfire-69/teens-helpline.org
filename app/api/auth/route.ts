/**
 * Auth — session creation, role selection. Delegates to features/auth/service.ts.
 *
 * Scaffold stub — not yet implemented. Full implementation on the
 * corresponding feature branch per AGENTS.md §3 (plan → approval → implement).
 *
 * Every request must be Zod-validated before reaching service logic (TRD §11).
 * Response envelope must match TRD §13 format.
 */
import type { NextRequest } from "next/server";

export async function POST(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "NOT_IMPLEMENTED", message: "This endpoint is scaffolded but not yet implemented." } }, { status: 501 });
}

export async function GET(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "NOT_IMPLEMENTED", message: "This endpoint is scaffolded but not yet implemented." } }, { status: 501 });
}
