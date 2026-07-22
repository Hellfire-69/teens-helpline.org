import Link from "next/link"
import { ArrowLeft, Phone, ShieldWarning } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Crisis Support Directory | TeensHelpline",
  description: "Contact information for free, 24/7 crisis support and emergency helplines in India."
}

const CRISIS_HELPLINES = [
  { name: "CHILDLINE", number: "1098", type: "Child & Teen Emergency", hours: "24/7", language: "English, Hindi, Regional" },
  { name: "TeleMANAS", number: "14416", type: "Mental Health Counselling", hours: "24/7", language: "Multilingual" },
  { name: "KIRAN Helpline", number: "1800-599-0019", type: "Rehabilitation & Mental Health", hours: "24/7", language: "English, Hindi, regional" },
  { name: "Vandrevala Foundation", number: "1860-266-2345", type: "Crisis Counselling & Chat", hours: "24/7", language: "English, Hindi, regional" },
  { name: "iCALL", number: "9152987821", type: "Psychosocial Support", hours: "Mon-Sat, 10am-8pm", language: "English, Hindi, regional" }
]

export default function CrisisSupportInfoPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-content mx-auto pt-28">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-space-3 mb-space-4 text-signal-crisis">
          <ShieldWarning className="w-9 h-9" weight="fill" />
          <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white">
            Crisis Support Directory
          </h1>
        </div>
        <p className="text-type-body-lg text-ink-600 dark:text-ink-300 leading-relaxed mb-space-8">
          If you or someone you know is going through a tough time or needs immediate safety assistance, please reach out to these free, confidential helplines in India.
        </p>

        <div className="flex flex-col gap-space-4 mb-space-6">
          {CRISIS_HELPLINES.map((line) => (
            <div key={line.name} className="glass-subtle border border-ink-300/10 dark:border-white/5 rounded-radius-md p-space-5 flex flex-col sm:flex-row justify-between sm:items-center gap-space-4">
              <div>
                <h3 className="font-inter font-semibold text-type-title-md text-ink-900 dark:text-white">
                  {line.name}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1 mb-2">
                  <span className="text-[10px] bg-aurora-dusk/15 text-aurora-dusk dark:text-white px-2 py-0.5 rounded-radius-sm font-semibold">{line.type}</span>
                  <span className="text-[10px] bg-aurora-sea/15 text-aurora-sea dark:text-white px-2 py-0.5 rounded-radius-sm font-semibold">{line.hours}</span>
                  <span className="text-[10px] bg-aurora-blush/15 text-aurora-blush dark:text-white px-2 py-0.5 rounded-radius-sm font-semibold">{line.language}</span>
                </div>
              </div>
              <Button variant="destructive" size="md" asChild className="shrink-0">
                <a href={`tel:${line.number}`} className="flex items-center gap-space-2 font-semibold">
                  <Phone className="w-4 h-4" />
                  <span>Call {line.number}</span>
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
