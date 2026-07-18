-- Migration: Create Study Hub tables
-- Referencing: Database-Schema.md §3.9-3.11 and Stage 1b Implementation Plan

CREATE TABLE IF NOT EXISTS "public"."resource_categories" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "slug" text NOT NULL UNIQUE,
    "label" text NOT NULL,
    "audience" text NOT NULL DEFAULT 'teen',
    "created_at" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "resource_categories_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."resources" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "category_id" uuid NOT NULL,
    "title" text NOT NULL,
    "content" text NOT NULL,
    "content_warning_flag" boolean NOT NULL DEFAULT false,
    "content_warning_text" text,
    "published" boolean NOT NULL DEFAULT false,
    "slug" text NOT NULL UNIQUE,
    "content_type" text NOT NULL CHECK (content_type IN ('article', 'breathing-exercise', 'study-hub-tool', 'journal')),
    "content_tier" text NOT NULL CHECK (content_tier IN ('reviewed', 'seed_draft')),
    "summary" text NOT NULL,
    "seo_description" text,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "resources_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "resources_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."resource_categories"("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_resources_category_id" ON "public"."resources"("category_id");
CREATE INDEX "idx_resources_published" ON "public"."resources"("published") WHERE published = true;

CREATE TRIGGER "trg_set_updated_at_resources"
BEFORE UPDATE ON "public"."resources"
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TABLE "public"."resource_bookmarks" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "user_id" uuid NOT NULL,
    "resource_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "resource_bookmarks_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "resource_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE,
    CONSTRAINT "resource_bookmarks_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE CASCADE,
    CONSTRAINT "uq_resource_bookmarks_user_resource" UNIQUE ("user_id", "resource_id")
);

CREATE INDEX "idx_resource_bookmarks_user_id" ON "public"."resource_bookmarks"("user_id");

-- Enable RLS
ALTER TABLE "public"."resource_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."resources" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."resource_bookmarks" ENABLE ROW LEVEL SECURITY;

-- resource_categories Policies (Published-only public-read / Admin-CRUD / Moderator-Read)
DO $$ BEGIN
  CREATE POLICY "resource_categories_select" ON "public"."resource_categories" FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "resource_categories_admin_all" ON "public"."resource_categories" FOR ALL USING (
    (SELECT "role" FROM "public"."profiles" WHERE "id" = auth.uid()) = 'admin'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "resource_categories_moderator_select" ON "public"."resource_categories" FOR SELECT USING (
    (SELECT "role" FROM "public"."profiles" WHERE "id" = auth.uid()) = 'moderator'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- resources Policies
CREATE POLICY "resources_select_published" ON "public"."resources" FOR SELECT USING (published = true);
CREATE POLICY "resources_admin_all" ON "public"."resources" FOR ALL USING (
  (SELECT "role" FROM "public"."profiles" WHERE "id" = auth.uid()) = 'admin'
);
CREATE POLICY "resources_moderator_select" ON "public"."resources" FOR SELECT USING (
  (SELECT "role" FROM "public"."profiles" WHERE "id" = auth.uid()) = 'moderator'
);

-- resource_bookmarks Policies
CREATE POLICY "resource_bookmarks_select_own" ON "public"."resource_bookmarks" FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "resource_bookmarks_insert_own" ON "public"."resource_bookmarks" FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "resource_bookmarks_delete_own" ON "public"."resource_bookmarks" FOR DELETE USING (auth.uid() = user_id);
