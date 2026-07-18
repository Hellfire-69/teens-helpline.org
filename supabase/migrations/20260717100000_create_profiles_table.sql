-- Migration: Create profiles table
-- Referencing: Database-Schema.md §3.2

-- Create a generic function to update 'updated_at' if it doesn't exist
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE "public"."profiles" (
    "id" uuid NOT NULL,
    "alias" text NOT NULL,
    "age_band" text NOT NULL,
    "role" text NOT NULL DEFAULT 'teen',
    "preferred_persona" text DEFAULT 'big_brother',
    "avatar_id" text,
    "school_verified" boolean DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE
);

-- Enable Row Level Security (zero policies by default)
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

-- Trigger to automatically update 'updated_at'
CREATE TRIGGER "trg_set_updated_at_profiles"
BEFORE UPDATE ON "public"."profiles"
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
