import type { Metadata } from "next";
import { getCurrentUserWithRole } from "@/features/auth/service";
import { getTeenDashboardData } from "@/features/dashboard/service";
import { TeenDashboard } from "@/features/dashboard/components/teen-dashboard";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personalized dashboard.",
};

export default async function TeenDashboardPage() {
  const auth = await getCurrentUserWithRole();

  if (auth.type === "guest" || !auth.user) {
    redirect("/"); // or to login
  }

  if (auth.profile) {
    const role = auth.profile.role;

    if (role === "parent") {
      redirect("/dashboard/parent");
    }

    const comingSoonRoles = ["moderator", "admin", "counsellor", "teacher_educator"];
    if (comingSoonRoles.includes(role)) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-paper-100 dark:bg-night-900 p-6 rounded-radius-xl max-w-md border border-ink-300/20">
            <AlertCircle className="w-10 h-10 text-ink-600 dark:text-ink-300 mx-auto mb-4" />
            <h2 className="text-type-title-xl font-fraunces font-semibold text-ink-900 dark:text-white mb-2">Not Yet Available</h2>
            <p className="text-type-body-md text-ink-600 dark:text-ink-300 leading-relaxed">
              The {role} dashboard and associated routing are currently under development and will be available in a future update.
            </p>
          </div>
        </div>
      );
    }
  }

  const data = await getTeenDashboardData();

  return <TeenDashboard data={data} />;
}
