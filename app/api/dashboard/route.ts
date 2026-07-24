import { NextResponse } from "next/server";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { getTeenDashboardData, getParentDashboardData } from "@/features/dashboard/service";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const auth = await getCurrentUserWithRole();
    
    // 1. No session at all (true Guest)
    if (auth.type === "guest" || !auth.user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required" } },
        { status: 401 }
      );
    }
    
    // 2. Anonymous session (no profile) requesting dashboard
    // Returns the empty/default shape from getTeenDashboardData
    if (auth.type === "anonymous" || !auth.profile) {
      const data = await getTeenDashboardData();
      return NextResponse.json({ success: true, data });
    }
    
    const role = auth.profile.role;
    
    // 3. Teen role
    if (role === "teen") {
      const data = await getTeenDashboardData();
      return NextResponse.json({ success: true, data });
    }
    
    // 4. Parent role
    if (role === "parent") {
      const data = await getParentDashboardData();
      return NextResponse.json({ success: true, data });
    }
    
    // 5. Coming Soon roles
    if (["counsellor", "teacher_educator", "moderator", "admin"].includes(role)) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_YET_AVAILABLE", message: "This dashboard is not yet available." } },
        { status: 403 }
      );
    }
    
    // Fallback for unknown role
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Invalid role" } },
      { status: 403 }
    );
    
  } catch (error) {
    logger.error("Unhandled error in /api/dashboard", { error: String(error) });
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred loading dashboard data" },
      },
      { status: 500 }
    );
  }
}
