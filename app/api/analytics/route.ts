/**
 * Aggregate stats — Phase 2, not built in MVP. Returns 501 Not Implemented.
 *
 * Scaffold stub — not yet implemented. Full implementation on the
 * corresponding feature branch per AGENTS.md §3 (plan → approval → implement).
 *
 * Every request must be Zod-validated before reaching service logic (TRD §11).
 * Response envelope must match TRD §13 format.
 */
import type { NextRequest } from "next/server";

export async function POST(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "NOT_IMPLEMENTED", message: "Analytics are a Phase 2 feature." } }, { status: 501 });
}

export async function GET(_req: NextRequest): Promise<Response> {
  return Response.json({ success: false, error: { code: "NOT_IMPLEMENTED", message: "Analytics are a Phase 2 feature." } }, { status: 501 });
}
