-- Migration: Seed Resource Categories
-- Referencing: Stage 1b Implementation Plan

INSERT INTO "public"."resource_categories" (slug, label, audience) VALUES
('academic-stress', 'Academic Pressure', 'teen'),
('bullying', 'Bullying', 'teen'),
('family-concerns', 'Family Concerns', 'teen'),
('friendships-relationships', 'Friendships and Relationships', 'teen'),
('emotional-overwhelm', 'Emotional Overwhelm', 'teen'),
('behavioural-concerns', 'Behavioural Concerns', 'teen'),
('confidence-identity', 'Confidence and Identity', 'teen'),
('career-exploration', 'Career Exploration', 'teen')
ON CONFLICT (slug) DO NOTHING;
