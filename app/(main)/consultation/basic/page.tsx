import { type Metadata } from "next";
import { BasicConsultationForm } from "@/features/consultation/components/basic/basic-consultation-form";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Quick Guidance | TeensHelpline",
  description: "Get quick guidance right now.",
};

export default function BasicConsultationPage() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-space-8 py-space-8">
      <Link href="/consultation" className="inline-flex items-center text-type-body-sm text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white mb-space-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Support Options
      </Link>
      <BasicConsultationForm />
    </div>
  );
}
