import { cn } from "@/lib/utils";
import type { Message } from "../hooks/use-peer-session";
import { ReportDialog } from "./report-dialog";

export function MessageBubble({
  message,
  sessionHook
}: {
  message: Message;
  sessionHook: any; // We'll pass the usePeerSession return type
}) {
  const isMine = message.sender_ref === "user" || message.sender_ref === "anonymous";

  return (
    <div className={cn("flex flex-col mb-4", isMine ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] shadow-sm relative group",
          isMine
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-aurora-blush/10 text-foreground border border-aurora-blush/20 rounded-bl-none"
        )}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>

        {/* Report button for peer messages (shown on hover) */}
        {!isMine && (
          <div className="absolute top-1/2 -translate-y-1/2 -right-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <ReportDialog messageId={message.id} reporterHook={sessionHook} />
          </div>
        )}
      </div>
      <span className="text-[11px] text-muted-foreground mt-1 px-1">
        {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}
