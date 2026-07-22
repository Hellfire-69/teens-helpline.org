import Link from "next/link"
import { ArrowLeft, Phone, Warning, Chats, BookOpen } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Get Help Now | TeensHelpline",
  description: "Access immediate crisis resources, peer chat support, or self-help materials."
}

const HELPLINES = [
  { name: "CHILDLINE (Youth Emergency)", number: "1098", availability: "24/7, Free", desc: "Government emergency response service for children and teenagers." },
  { name: "TeleMANAS", number: "14416", availability: "24/7, Free", desc: "Government tele-mental health helpline available in multiple languages." },
  { name: "KIRAN Helpline", number: "1800-599-0019", availability: "24/7, Free", desc: "National mental health rehabilitation helpline under Ministry of Social Justice." },
  { name: "Vandrevala Foundation", number: "1860-266-2345", availability: "24/7, Free", desc: "Non-profit crisis intervention counselling via call or online chat." },
  { name: "iCALL (TISS Initiative)", number: "9152987821", availability: "Mon-Sat, 10am-8pm", desc: "Professional psychosocial counselling service run by trained counselors." }
]

export default function GetHelpPage() {
  return (
    <main className="flex-1 flex flex-col py-space-16 px-4 md:px-space-8 w-full max-w-content mx-auto pt-28">
      <div className="mb-space-6">
        <Link href="/" className="inline-flex items-center text-aurora-sea font-semibold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea rounded-radius-sm">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <h1 className="font-fraunces text-type-display font-semibold text-ink-900 dark:text-white mb-space-2 flex items-center gap-space-3">
          <Warning className="text-signal-crisis w-10 h-10" weight="fill" />
          <span>I Need Help Now</span>
        </h1>
        <p className="text-type-body-lg text-ink-600 dark:text-ink-300 leading-relaxed mb-space-8">
          If you are in immediate danger, feeling overwhelmed, or need to talk to a professional right now, please reach out to one of the free, confidential Indian helplines below.
        </p>

        {/* Directory Card List */}
        <div className="flex flex-col gap-space-4 mb-space-10">
          {HELPLINES.map((line) => (
            <div key={line.name} className="glass-subtle border-2 border-signal-crisis/20 rounded-radius-md p-space-5 flex flex-col sm:flex-row justify-between sm:items-center gap-space-4 shadow-sm">
              <div>
                <div className="flex items-center gap-space-2 mb-1">
                  <span className="font-inter font-bold text-type-body-md text-ink-900 dark:text-white">{line.name}</span>
                  <span className="text-[10px] bg-signal-crisis/10 text-signal-crisis px-2 py-0.5 rounded-radius-sm font-semibold uppercase">{line.availability}</span>
                </div>
                <p className="text-type-body-sm text-ink-600 dark:text-ink-300 max-w-[50ch]">{line.desc}</p>
              </div>
              <Button variant="destructive" size="md" asChild className="shrink-0">
                <a href={`tel:${line.number.replace(/[^0-9]/g, "")}`} className="flex items-center gap-space-2 font-semibold">
                  <Phone className="w-4 h-4" />
                  <span>Call {line.number}</span>
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Alternate stubs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-6 pt-space-6 border-t border-ink-300/10 dark:border-white/5">
          <div className="p-space-5 glass-subtle border border-white/10 dark:border-white/5 rounded-radius-md flex flex-col justify-between gap-space-3">
            <div>
              <h3 className="font-inter font-semibold text-type-body-md text-ink-900 dark:text-white flex items-center gap-space-2">
                <Chats className="text-aurora-blush" weight="duotone" />
                <span>Talk with a Peer</span>
              </h3>
              <p className="text-type-body-sm text-ink-600 dark:text-ink-300 mt-1">If you aren&apos;t in a crisis but want to talk anonymously with another teenager who gets it.</p>
            </div>
            <Button variant="primary" size="sm" asChild className="w-fit">
              <Link href="/peer-support">Start Peer Chat</Link>
            </Button>
          </div>

          <div className="p-space-5 glass-subtle border border-white/10 dark:border-white/5 rounded-radius-md flex flex-col justify-between gap-space-3">
            <div>
              <h3 className="font-inter font-semibold text-type-body-md text-ink-900 dark:text-white flex items-center gap-space-2">
                <BookOpen className="text-aurora-sea" weight="duotone" />
                <span>Explore Study Hub</span>
              </h3>
              <p className="text-type-body-sm text-ink-600 dark:text-ink-300 mt-1">Find articles on stress management, bullying guidance, and focus tools.</p>
            </div>
            <Button variant="secondary" size="sm" asChild className="w-fit">
              <Link href="/study-hub text-ink-900 dark:text-white">Open Study Hub</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
