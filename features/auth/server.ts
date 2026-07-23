import { createClient as createServerClient } from "@/lib/supabase/server";
import { AuthService } from "./service";

export async function getCurrentUserWithRole() {
  const supabase = await createServerClient();
  const authService = new AuthService(supabase);
  const user = await authService.getCurrentUser();

  if (!user) {
    return { user: null, profile: null, preferences: null, type: "guest" as const };
  }

  const safeUser = {
    id: user.id,
    is_anonymous: !!user.is_anonymous,
    email: user.email,
  };

  if (safeUser.is_anonymous) {
    return { user: safeUser, profile: null, preferences: null, type: "anonymous" as const };
  }

  const data = await authService.loadProfile(user.id);
  return { 
    user: safeUser, 
    profile: data?.profile ?? null, 
    preferences: data?.preferences ?? null,
    type: "authenticated" as const 
  };
}
