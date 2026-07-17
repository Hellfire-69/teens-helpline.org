/**
 * Admin reporting/escalation views. Coming Soon — role-gated, returns 403 until feature/admin is built.
 *
 * Scaffold stub — not yet implemented. Full implementation on the
 * corresponding feature branch per AGENTS.md §3 (plan → approval → implement).
 *
 * Every request must be Zod-validated before reaching service logic (TRD §11).
 * Response envelope must match TRD §13 format.
 */
import type { NextRequest } from "next/server";

export async function POST(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "COMING_SOON", message: "This endpoint is not yet available." } }, { status: 403 });
}

export async function GET(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "COMING_SOON", message: "This endpoint is not yet available." } }, { status: 403 });
}
