/**
 * peer-support feature — TypeScript types stub
 *
 * Feature-specific types. Cross-cutting types (UserRole, ApiResponse) live in
 * /types/index.ts and are imported from there — never duplicated here.
 * Implemented on the corresponding feature branch.
 */

export type PeerSession = {
  id: string;
  user_id: string | null;
  anon_token: string | null;
  status: string;
  moderator_flag: boolean;
  created_at: string;
  updated_at: string;
};
