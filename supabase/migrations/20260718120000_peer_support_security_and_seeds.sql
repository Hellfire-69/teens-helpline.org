-- 1. Drop user-facing INSERT policies on peer_messages to enforce server-side Escalation Layer routing
DROP POLICY IF EXISTS "Anonymous can insert peer messages" ON public.peer_messages;
DROP POLICY IF EXISTS "Teen can insert peer messages" ON public.peer_messages;

-- 2. Seed report_reasons table
INSERT INTO public.report_reasons (slug, label) VALUES
  ('inappropriate_content', 'Inappropriate Content'),
  ('harassment', 'Harassment or Bullying'),
  ('unsafe_advice', 'Unsafe Advice'),
  ('suicide_self_harm', 'Threatening Suicide or Self-Harm'),
  ('sharing_personal_info', 'Sharing Personal Information'),
  ('spam', 'Spam')
ON CONFLICT (slug) DO NOTHING;
