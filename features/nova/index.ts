// Export public interfaces for the Nova feature (Escalation Layer, etc.)
export { checkRiskSignal } from "./escalation";
export type { RiskSignal } from "./escalation";
export { logEscalationEvent } from "./data";
