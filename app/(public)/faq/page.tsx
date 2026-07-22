import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"
import { FAQ } from "@/features/marketing/components/FAQ"

export const metadata = {
  title: "Frequently Asked Questions | TeensHelpline",
  description: "Browse detailed questions and answers about privacy, peer support, and Nova."
}

export default function FAQPage() {
  return (
    <main className="flex-1 flex flex-col py-space-12 px-4 md:px-space-8 w-full max-w-content mx-auto pt-28">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <FAQ />
    </main>
  )
}
