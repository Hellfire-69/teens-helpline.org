/**
 * study-hub feature — types
 */

export type ContentType = "article" | "breathing-exercise" | "study-hub-tool" | "journal";
export type ContentTier = "reviewed" | "seed_draft";

export interface ResourceCategory {
  id: string;
  slug: string;
  label: string;
  audience: string;
  created_at: string;
}

export interface Resource {
  id: string;
  category_id: string;
  title: string;
  content: string;
  content_warning_flag: boolean;
  content_warning_text?: string | null;
  published: boolean;
  slug: string;
  content_type: ContentType;
  content_tier: ContentTier;
  summary: string;
  seo_description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResourceBookmark {
  id: string;
  userId: string;
  resourceId: string;
  createdAt: string;
}
