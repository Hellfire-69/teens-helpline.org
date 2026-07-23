import type { Metadata } from "next";
import { getCurrentUserWithRole } from "@/features/auth/server";
import { SettingsPageClient } from "@/features/settings/components/settings-page";

export const metadata: Metadata = {
  title: "Settings | TeensHelpline",
  description: "Manage your account and data settings.",
};

export default async function SettingsPage() {
  const auth = await getCurrentUserWithRole();

  return (
    <main className="flex-1 flex flex-col p-4 md:p-8">
      <SettingsPageClient auth={auth} />
    </main>
  );
}
