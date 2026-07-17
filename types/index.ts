/**
 * Shared TypeScript types — base building blocks used across features.
 *
 * Feature-specific types live inside features/<name>/types.ts
 * This file holds only cross-cutting types referenced by lib/, services/, or
 * multiple features through their public interfaces.
 */

// ─── API Response Envelope — TRD §13 ────────────────────────────────────────
// Every API route handler must return one of these two shapes.

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── User Roles — Database-Schema.md §3.2 ────────────────────────────────────
// Mirrors the profiles.role enum-like column; kept here so route guards and
// Zustand stores can import it without depending on a feature module.

export type UserRole =
  | "teen"
  | "parent"
  | "counsellor"
  | "teacher_educator"
  | "moderator"
  | "admin";

// ─── Nova Personas — Persona.md §1 (forward reference) ───────────────────────
// The actual persona logic lives in features/nova/. This type alias is here so
// stores and shared utilities can reference it without importing nova internals.

export type NovaPersona = "big_brother" | "big_sister" | "mentor" | "friend";
