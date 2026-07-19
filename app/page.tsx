/**
 * Home page — public landing page skeleton.
 *
 * Design.md §27: Hero with Fraunces display headline, "Continue Anonymously"
 * as the primary CTA, crisis banner visible before any login state.
 *
 * Full landing page UI is implemented on feature/public-pages once Design.md
 * wireframes for the hero are approved per AGENTS.md §1 workflow.
 */
import { continueAnonymously } from "@/features/auth/service";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  async function signIn() {
    "use server";
    await continueAnonymously();
    redirect("/dashboard/teen");
  }

  return (
    <main className="p-8 flex flex-col items-center gap-space-4">
      <h1 className="text-type-title-xl font-fraunces font-semibold text-ink-900">TeensHelpline — You&apos;re Not Alone</h1>
      <p className="text-type-body-md text-ink-600">This scaffold is ready. Feature development begins on feature branches off develop.</p>
      
      {/* TEMPORARY MINIMAL ANONYMOUS ENTRY STUB */}
      {/* To be replaced by real onboarding UI later */}
      <form action={signIn} className="mt-space-8">
        <Button type="submit" size="lg">Continue Anonymously</Button>
      </form>
    </main>
  );
}
