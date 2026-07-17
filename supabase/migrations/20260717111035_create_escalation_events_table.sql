-- Create escalation_events table
CREATE TABLE IF NOT EXISTS public.escalation_events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL, -- nullable, anonymous
    trigger_source text NOT NULL,
    risk_signal text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS for escalation_events
ALTER TABLE public.escalation_events ENABLE ROW LEVEL SECURITY;

-- No RLS policies are created for standard users (teen/parent)
-- Inserts must occur via the service-role client (bypassing RLS)
-- This enforces the "no user policy" design per Schema 6.3
