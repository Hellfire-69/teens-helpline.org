import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getResources } from "@/features/study-hub/service";
import { getResourcesQuerySchema } from "@/features/study-hub/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validation
    const parsedQuery = getResourcesQuerySchema.safeParse(queryParams);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsedQuery.error.format() },
        { status: 400 }
      );
    }

    const resources = await getResources(parsedQuery.data);

    // Compute next cursor for pagination
    let nextCursor = null;
    if (resources && resources.length === parsedQuery.data.limit) {
      const lastResource = resources[resources.length - 1];
      if (lastResource) {
        nextCursor = `${lastResource.created_at},${lastResource.id}`;
      }
    }

    return NextResponse.json({
      data: resources,
      nextCursor,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[GET /api/resources] Error:", message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
