-- Add email and onboarding_completed columns to profiles table
ALTER TABLE "public"."profiles"
ADD COLUMN "email" text,
ADD COLUMN "onboarding_completed" boolean NOT NULL DEFAULT false;
