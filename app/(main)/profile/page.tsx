import type { Metadata } from "next";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { ProfileForm } from "@/features/profile/components/profile-form";

export const metadata: Metadata = {
  title: "Profile | TeensHelpline",
  description: "Manage your profile.",
};

export default async function ProfilePage() {
  const auth = await getCurrentUserWithRole();

  // Optionally require login, but the PRD says anonymous users see an empty state.
  // We'll let the component handle the anonymous empty state.

  return (
    <main className="flex-1 flex flex-col p-4 md:p-8">
      <ProfileForm auth={auth} />
    </main>
  );
}
