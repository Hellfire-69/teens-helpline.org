"use client";

import { useState } from "react";
import { Flag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePeerSession } from "../hooks/use-peer-session";

const REPORT_REASONS = [
  { slug: "inappropriate_content", label: "Inappropriate Content" },
  { slug: "harassment", label: "Harassment or Bullying" },
  { slug: "unsafe_advice", label: "Unsafe Advice" },
  { slug: "suicide_self_harm", label: "Threatening Suicide or Self-Harm" },
  { slug: "sharing_personal_info", label: "Sharing Personal Information" },
  { slug: "spam", label: "Spam" }
];

export function ReportDialog({ messageId, reporterHook }: { messageId: string, reporterHook: ReturnType<typeof usePeerSession> }) {
  const [open, setOpen] = useState(false);
  const [reasonSlug, setReasonSlug] = useState<string>("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reasonSlug) return;
    setIsSubmitting(true);
    try {
      await reporterHook.report(messageId, reasonSlug, details);
      setOpen(false);
      setReasonSlug("");
      setDetails("");
    } catch (err) {
      console.error("Report failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)} className="h-8 text-muted-foreground hover:text-destructive flex items-center gap-1.5 px-2">
        <Flag className="h-3.5 w-3.5" />
        <span className="text-xs">Report</span>
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Message</DialogTitle>
          <DialogDescription>
            Help keep TeensHelpline safe. If you believe this message violates our community guidelines, please report it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Reason for reporting</label>
            <Select value={reasonSlug} onValueChange={(val) => setReasonSlug(val || "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((r) => (
                  <SelectItem key={r.slug} value={r.slug}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Additional Details (Optional)</label>
            <Textarea
              placeholder="Tell us a bit more about what's wrong..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!reasonSlug || isSubmitting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
