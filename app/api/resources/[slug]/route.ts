import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getResource } from "@/features/study-hub/service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const resource = await getResource(slug);

    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    return NextResponse.json({ data: resource });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[GET /api/resources/[slug]] Error:`, message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
