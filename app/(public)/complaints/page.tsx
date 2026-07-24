import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export const metadata = {
  title: "Complaints & Grievance Policy | TeensHelpline",
  description: "Read our complaints and grievance redressal guidelines."
}

export default function ComplaintsPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-3xl mx-auto pt-28 leading-relaxed text-ink-600 dark:text-ink-300">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white mb-space-4">
        Complaints & Grievance Policy
      </h1>
      <span className="text-type-body-sm text-ink-300 mb-space-6 block">Last updated: July 2026</span>

      <div className="space-y-space-6">
        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">1. Redressal Framework</h2>
          <p>
            If you believe your safety has been compromised or a peer support volunteer has violated our code of conduct, you can submit a grievance report to our safety officers.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">2. Reporting Contact</h2>
          <p>
            Grievance reports can be sent directly to <strong>grievance@teenshelpline.org</strong>. All complaints are investigated by our advisory panel within 7 working days.
          </p>
        </section>

        <section>
          <h2 className="font-fraunces text-type-title-lg font-semibold text-ink-900 dark:text-white mb-space-2">3. Prototype Safeguards</h2>
          <p>
            For the student internship build, all grievance officer roles are simulated. In a production launch, a qualified professional counselor would occupy this role.
          </p>
        </section>
      </div>
    </main>
  )
}
