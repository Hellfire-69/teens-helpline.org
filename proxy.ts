import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware-client'

export async function proxy(request: NextRequest) {
  // Update session and return the response
  // This ensures cookies are refreshed correctly and auth is validated
  return await updateSession(request)
}

// NOTE: Any new protected route added under app/(main) or requiring server-side
// Supabase session handling must be added explicitly to this matcher.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/chat/:path*',
    '/peer-support/:path*',
    '/mood/:path*',
    '/journal/:path*',
    '/consultation/:path*',
    '/study-hub/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/callback',
    '/api/:path*',
  ],
}
