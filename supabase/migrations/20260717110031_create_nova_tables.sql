-- Create nova_conversations table
CREATE TABLE IF NOT EXISTS public.nova_conversations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL, -- nullable, anonymous
    persona_used text NOT NULL,
    started_at timestamptz NOT NULL DEFAULT now(),
    ended_at timestamptz
);

-- Enable RLS for nova_conversations
ALTER TABLE public.nova_conversations ENABLE ROW LEVEL SECURITY;

-- Add policies for nova_conversations per Schema 6.3
CREATE POLICY "Teen: select own nova_conversations"
    ON public.nova_conversations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Teen: insert own nova_conversations"
    ON public.nova_conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create conversation_messages table
CREATE TABLE IF NOT EXISTS public.conversation_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id uuid NOT NULL REFERENCES public.nova_conversations(id) ON DELETE CASCADE,
    sender text NOT NULL CHECK (sender IN ('user', 'nova')),
    content text NOT NULL,
    escalation_triggered boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS for conversation_messages
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

-- Add policies for conversation_messages per Schema 6.3
CREATE POLICY "Teen: select own conversation_messages"
    ON public.conversation_messages FOR SELECT
    USING (
        conversation_id IN (
            SELECT id FROM public.nova_conversations
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Teen: insert own conversation_messages"
    ON public.conversation_messages FOR INSERT
    WITH CHECK (
        conversation_id IN (
            SELECT id FROM public.nova_conversations
            WHERE user_id = auth.uid()
        )
    );
