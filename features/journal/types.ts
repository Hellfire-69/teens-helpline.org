export type JournalEntry = {
  id: string;
  user_id: string;
  content: string;
  mood_entry_id?: string | null;
  risk_flagged: boolean;
  created_at: string;
  updated_at: string;
};
