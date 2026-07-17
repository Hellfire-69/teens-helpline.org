/**
 * Structured JSON logger — TRD §15 / AGENTS.md §8
 *
 * Used for all server-side logging. Produces structured JSON output, not
 * free-text strings, so logs are machine-parseable in Vercel and Supabase.
 *
 * Rules enforced here:
 * - debug is disabled in production builds (TRD §15)
 * - NEVER log raw chat content, mood notes, or crisis-triggering text —
 *   only category labels (TRD §15, AGENTS.md §5)
 * - Escalation events are logged distinctly via escalation_events table,
 *   not through this general logger (TRD §15)
 */

type LogLevel = "error" | "warn" | "info" | "debug";

type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
};

function log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  // debug is disabled in production — TRD §15
  if (level === "debug" && process.env["NODE_ENV"] === "production") {
    return;
  }

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(context !== undefined ? { context } : {}),
  };

  const output = JSON.stringify(entry);

  if (level === "error") {
    console.error(output);
  } else if (level === "warn") {
    console.warn(output);
  } else {
    console.log(output);
  }
}

export const logger = {
  error: (message: string, context?: Record<string, unknown>) =>
    log("error", message, context),
  warn: (message: string, context?: Record<string, unknown>) =>
    log("warn", message, context),
  info: (message: string, context?: Record<string, unknown>) =>
    log("info", message, context),
  debug: (message: string, context?: Record<string, unknown>) =>
    log("debug", message, context),
};
