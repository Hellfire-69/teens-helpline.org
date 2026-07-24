import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
        // Layout will handle onboarding redirect if needed
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/`)
}
