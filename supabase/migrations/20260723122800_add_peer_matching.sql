-- Migration: Add Peer Matching mechanism

-- 1. Add peer columns
ALTER TABLE public.peer_support_sessions
  ADD COLUMN peer_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN peer_anon_token TEXT;

-- 2. Add constraint for peer columns
ALTER TABLE public.peer_support_sessions
  ADD CONSTRAINT peer_support_sessions_peer_user_or_token CHECK (
    (peer_user_id IS NULL AND peer_anon_token IS NULL) OR 
    (peer_user_id IS NOT NULL AND peer_anon_token IS NULL) OR 
    (peer_user_id IS NULL AND peer_anon_token IS NOT NULL)
  );

-- 3. Replace RLS Policies to allow the peer to read their sessions and messages
-- Drop old SELECT policies on peer_support_sessions
DROP POLICY "Anonymous can read own anon peer session" ON public.peer_support_sessions;
DROP POLICY "Teen can read own peer session" ON public.peer_support_sessions;

CREATE POLICY "Anonymous can read own anon peer session"
    ON public.peer_support_sessions FOR SELECT
    USING (anon_token = auth.uid()::text OR peer_anon_token = auth.uid()::text);

CREATE POLICY "Teen can read own peer session"
    ON public.peer_support_sessions FOR SELECT
    USING (user_id = auth.uid() OR peer_user_id = auth.uid());

-- Drop old SELECT policies on peer_messages
DROP POLICY "Anonymous can read own peer messages" ON public.peer_messages;
DROP POLICY "Teen can read own peer messages" ON public.peer_messages;

CREATE POLICY "Anonymous can read own peer messages"
    ON public.peer_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.peer_support_sessions
            WHERE id = session_id AND (anon_token = auth.uid()::text OR peer_anon_token = auth.uid()::text)
        )
    );

CREATE POLICY "Teen can read own peer messages"
    ON public.peer_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.peer_support_sessions
            WHERE id = session_id AND (user_id = auth.uid() OR peer_user_id = auth.uid())
        )
    );

-- 4. Create Postgres Function for Atomic Matching
CREATE OR REPLACE FUNCTION public.match_or_create_peer_session(
    p_user_id UUID DEFAULT NULL,
    p_anon_token TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    matched_id UUID;
    v_new_id UUID;
BEGIN
    IF p_user_id IS NULL AND p_anon_token IS NULL THEN
        RAISE EXCEPTION 'Must provide either p_user_id or p_anon_token';
    END IF;

    -- Try to find a waiting session (that belongs to someone else)
    SELECT id INTO matched_id
    FROM public.peer_support_sessions
    WHERE status = 'waiting'
      AND (user_id IS DISTINCT FROM p_user_id OR p_user_id IS NULL)
      AND (anon_token IS DISTINCT FROM p_anon_token OR p_anon_token IS NULL)
    FOR UPDATE SKIP LOCKED
    LIMIT 1;

    IF matched_id IS NOT NULL THEN
        -- Match found, claim it
        UPDATE public.peer_support_sessions
        SET peer_user_id = p_user_id,
            peer_anon_token = p_anon_token,
            status = 'active',
            updated_at = NOW()
        WHERE id = matched_id;

        RETURN matched_id;
    ELSE
        -- No match, create a new waiting session
        INSERT INTO public.peer_support_sessions (user_id, anon_token, status)
        VALUES (p_user_id, p_anon_token, 'waiting')
        RETURNING id INTO v_new_id;

        RETURN v_new_id;
    END IF;
END;
$$;
