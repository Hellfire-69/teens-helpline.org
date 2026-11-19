/**
 * Auth route group layout — Anonymous/Google/Email entry screens.
 *
 * Scaffold skeleton. Full layout (nav, glassmorphism shell, crisis banner)
 * implemented on the corresponding feature branch per approved wireframes.
 */
import { AuthProvider } from "@/features/auth/components/auth-provider";

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
