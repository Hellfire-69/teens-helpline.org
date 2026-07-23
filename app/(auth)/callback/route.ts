import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { AuthService } from '@/features/auth/service'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data: exchangeData, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const session = exchangeData?.session
      const isPersistentUser = session && session.user && (!session.user.is_anonymous || session.user.email)

      if (isPersistentUser) {
        const authService = new AuthService(supabase)
        let profileData = await authService.loadProfile(session.user.id)

        if (!profileData) {
          const alias = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || `User${Math.floor(Math.random() * 1000)}`;
          await authService.createProfile(session.user.id, alias, session.user.email || null, 'teen')
        }

        // Layout will handle onboarding redirect if needed
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/`)
}
