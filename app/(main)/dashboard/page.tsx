import { redirect } from "next/navigation";
import { getCurrentUserWithRole } from "@/features/auth/service";

export default async function DashboardIndexPage() {
  const { profile, type } = await getCurrentUserWithRole();

  if (type === "anonymous") {
    redirect("/chat"); // Anonymous users go to chat
  }

  if (!profile) {
    redirect("/signin");
  }

  if (profile.role !== "teen") {
    redirect("/dashboard/parent");
  }

  redirect("/dashboard/teen");
}
