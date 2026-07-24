-- PROTOTYPE: simulated, not connected to a real backend

CREATE TABLE public.appointments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    simulated_slot text NOT NULL,
    status text NOT NULL DEFAULT 'requested',
    guardian_approved boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Trigger to automatically update 'updated_at'
CREATE TRIGGER trg_set_updated_at_appointments
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Teen: INSERT on own rows
CREATE POLICY "Teen can insert own appointments" 
ON public.appointments 
FOR INSERT 
TO authenticated 
WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'teen'
    )
);

-- Teen: SELECT on own rows
CREATE POLICY "Teen can view own appointments" 
ON public.appointments 
FOR SELECT 
TO authenticated 
USING (
    auth.uid() = user_id 
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'teen'
    )
);

-- Teen: UPDATE on own rows (required for cancelSimulatedBookingAction)
CREATE POLICY "Teen can update own appointments" 
ON public.appointments 
FOR UPDATE 
TO authenticated 
USING (
    auth.uid() = user_id 
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'teen'
    )
)
WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'teen'
    )
);

-- Admin: read-only
CREATE POLICY "Admin can view all appointments" 
ON public.appointments 
FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);
