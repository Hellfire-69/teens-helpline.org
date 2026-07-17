/**
 * Zustand stores — TRD §20 / AGENTS.md §5
 *
 * Four small, single-purpose stores. No persistence middleware.
 * NEVER write to localStorage or sessionStorage — all anonymous state
 * dies with the tab (ADR-006). Logged-in persistence goes through Supabase
 * via the owning feature's service layer, not directly from a store.
 *
 * Stores export:
 *   useOnboardingStore — current step, avatar, role, mood, stated concern
 *   useMoodStore       — current session's mood entry
 *   useNovaStore       — transient Nova UI state (typing indicator, escalation flag)
 *   useUiStore         — quick-exit state, modal/dialog visibility
 *
 * All four stores are stubs — state shape and actions implemented on
 * the respective feature branches.
 */

export * from "./onboarding-store";
export * from "./mood-store";
export * from "./nova-store";
export * from "./ui-store";
