"use client"

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { AuthService } from "../service"
import type { AuthState, Profile, UserPreferences } from "../types"
import type { User } from "@supabase/supabase-js"

interface AuthContextValue extends AuthState {
  signIn: AuthService["signIn"]
  signUp: AuthService["signUp"]
  signOut: AuthService["signOut"]
  signInAnonymously: AuthService["signInAnonymously"]
  signInWithGoogle: AuthService["signInWithGoogle"]
  refreshProfile: (uid?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()
  const authService = useMemo(() => new AuthService(supabase), [supabase])

  const refreshProfile = useCallback(async (currentUserId?: string) => {
    const uid = currentUserId || user?.id
    if (!uid) return
    try {
      const data = await authService.loadProfile(uid)
      if (data) {
        setProfile(data.profile)
        setPreferences(data.preferences)
      } else {
        setProfile(null)
        setPreferences(null)
      }
    } catch (e) {
      console.error("Failed to load profile", e)
    }
  }, [user?.id, authService])

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        setUser(session.user)
        // If not anonymous, load profile
        if (!session.user.is_anonymous) {
          await refreshProfile(session.user.id)
        }
      }
      setLoading(false)
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          if (event === "SIGNED_IN") {
            if (!session.user.is_anonymous) {
              await refreshProfile(session.user.id)
            }
          }
        } else {
          setUser(null)
          setProfile(null)
          setPreferences(null)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, refreshProfile])

  const value: AuthContextValue = {
    user: user ? {
      id: user.id,
      is_anonymous: !!user.is_anonymous,
      email: user.email,
    } : null,
    profile,
    preferences,
    loading,
    signIn: authService.signIn.bind(authService),
    signUp: authService.signUp.bind(authService),
    signOut: authService.signOut.bind(authService),
    signInAnonymously: authService.signInAnonymously.bind(authService),
    signInWithGoogle: authService.signInWithGoogle.bind(authService),
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
