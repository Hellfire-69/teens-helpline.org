-- Migration: Add SELECT policy for profiles
-- Policy: Teen: own row only
CREATE POLICY "Teen: own row only" ON "public"."profiles"
FOR SELECT
USING (auth.uid() = id);
