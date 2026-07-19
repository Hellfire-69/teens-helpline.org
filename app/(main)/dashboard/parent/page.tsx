import type { Metadata } from "next";
import { getCurrentUserWithRole } from "@/features/auth/service";
import { getParentDashboardData } from "@/features/dashboard/service";
import { ParentDashboard } from "@/features/dashboard/components/parent-dashboard";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Parent Guidance",
  description: "Resources and guidance for parents.",
};

export default async function ParentDashboardPage() {
  const auth = await getCurrentUserWithRole();

  if (auth.type === "guest" || !auth.user || !auth.profile) {
    redirect("/"); 
  }

  const role = auth.profile.role;

  if (role === "teen") {
    redirect("/dashboard/teen");
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

  const data = await getParentDashboardData();

  return <ParentDashboard data={data} />;
}
