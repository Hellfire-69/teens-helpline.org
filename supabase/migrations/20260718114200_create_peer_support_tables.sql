-- Migration: Create peer support tables
-- Referencing: Database-Schema.md §3.6, §3.7, §3.12, §3.13, §8



-- 1. Create report_reasons table
CREATE TABLE public.report_reasons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL
);
ALTER TABLE public.report_reasons ENABLE ROW LEVEL SECURITY;

-- 2. Create reports table
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    target_type TEXT NOT NULL, -- 'peer_message', 'peer_session', 'resource'
    target_id UUID NOT NULL,
    reason_id UUID NOT NULL REFERENCES public.report_reasons(id) ON DELETE RESTRICT,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 3. Create peer_support_sessions table
CREATE TABLE public.peer_support_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    anon_token TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    moderator_flag BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT peer_support_sessions_user_or_token CHECK (
        (user_id IS NOT NULL AND anon_token IS NULL) OR 
        (user_id IS NULL AND anon_token IS NOT NULL)
    )
);
ALTER TABLE public.peer_support_sessions ENABLE ROW LEVEL SECURITY;

-- 4. Create peer_messages table
CREATE TABLE public.peer_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.peer_support_sessions(id) ON DELETE CASCADE,
    sender_ref TEXT NOT NULL,
    content TEXT NOT NULL,
    flagged BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.peer_messages ENABLE ROW LEVEL SECURITY;

-- 5. Indexes
CREATE INDEX idx_peer_support_sessions_user_id ON public.peer_support_sessions(user_id);
CREATE INDEX idx_peer_messages_session_created ON public.peer_messages(session_id, created_at DESC);
CREATE INDEX idx_reports_status ON public.reports(status);

-- 6. Triggers for updated_at
CREATE TRIGGER trg_set_updated_at_peer_support_sessions
    BEFORE UPDATE ON public.peer_support_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- 7. RLS Policies

-- peer_support_sessions
-- Anonymous: SELECT and INSERT where anon_token = auth.uid()
CREATE POLICY "Anonymous can insert own anon peer session"
    ON public.peer_support_sessions FOR INSERT
    WITH CHECK (anon_token = auth.uid()::text);

CREATE POLICY "Anonymous can read own anon peer session"
    ON public.peer_support_sessions FOR SELECT
    USING (anon_token = auth.uid()::text);

-- Teen: SELECT and INSERT where user_id = auth.uid()
CREATE POLICY "Teen can insert own peer session"
    ON public.peer_support_sessions FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Teen can read own peer session"
    ON public.peer_support_sessions FOR SELECT
    USING (user_id = auth.uid());

-- Moderator/Admin: SELECT all rows
CREATE POLICY "Moderator and Admin can view all peer sessions"
    ON public.peer_support_sessions FOR SELECT
    USING (public.check_user_role('moderator') OR public.check_user_role('admin'));

-- peer_messages
-- Anonymous: SELECT and INSERT where session's anon_token = auth.uid()
CREATE POLICY "Anonymous can insert peer messages"
    ON public.peer_messages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.peer_support_sessions
            WHERE id = session_id AND anon_token = auth.uid()::text
        )
    );

CREATE POLICY "Anonymous can read own peer messages"
    ON public.peer_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.peer_support_sessions
            WHERE id = session_id AND anon_token = auth.uid()::text
        )
    );

-- Teen: SELECT and INSERT where session's user_id = auth.uid()
CREATE POLICY "Teen can insert peer messages"
    ON public.peer_messages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.peer_support_sessions
            WHERE id = session_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Teen can read own peer messages"
    ON public.peer_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.peer_support_sessions
            WHERE id = session_id AND user_id = auth.uid()
        )
    );

-- Moderator/Admin: SELECT all rows
CREATE POLICY "Moderator and Admin can view all peer messages"
    ON public.peer_messages FOR SELECT
    USING (public.check_user_role('moderator') OR public.check_user_role('admin'));

-- reports
-- Anonymous/Teen can INSERT
CREATE POLICY "Anyone can file a report"
    ON public.reports FOR INSERT
    WITH CHECK (
        -- If reporter_id is provided, it must match auth.uid(), or they can leave it null (anon)
        reporter_id = auth.uid() OR reporter_id IS NULL
    );

-- Teen can read their own
CREATE POLICY "Users can view their own reports"
    ON public.reports FOR SELECT
    USING (reporter_id = auth.uid());

-- Moderator/Admin can SELECT and UPDATE status
CREATE POLICY "Moderator and Admin can view all reports"
    ON public.reports FOR SELECT
    USING (public.check_user_role('moderator') OR public.check_user_role('admin'));

CREATE POLICY "Moderator and Admin can update reports"
    ON public.reports FOR UPDATE
    USING (public.check_user_role('moderator') OR public.check_user_role('admin'))
    WITH CHECK (public.check_user_role('moderator') OR public.check_user_role('admin'));

-- report_reasons
-- Public can view
CREATE POLICY "Public can view report reasons"
    ON public.report_reasons FOR SELECT
    USING (true);

-- 8. Enable Realtime
-- The publication 'supabase_realtime' usually exists in a default Supabase project,
-- but we only add the tables to it.
ALTER PUBLICATION supabase_realtime ADD TABLE public.peer_support_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.peer_messages;
