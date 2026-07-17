import { describe, it, expect, vi, beforeEach } from 'vitest';
import { continueAnonymously, signInWithEmail, getCurrentUserWithRole } from '@/features/auth/service';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn()
}));

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn()
}));

describe('Auth Service', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSupabase: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockAdminClient: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSupabase = {
      auth: {
        signInAnonymously: vi.fn(),
        signInWithOtp: vi.fn(),
        signInWithOAuth: vi.fn(),
        getSession: vi.fn(),
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    };

    mockAdminClient = {
      from: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createClient as any).mockResolvedValue(mockSupabase);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (createAdminClient as any).mockReturnValue(mockAdminClient);
  });

  it('continueAnonymously should create an anonymous session', async () => {
    mockSupabase.auth.signInAnonymously.mockResolvedValue({ data: { user: { id: 'anon-1' } }, error: null });
    
    const result = await continueAnonymously();
    
    expect(mockSupabase.auth.signInAnonymously).toHaveBeenCalled();
    expect(result.user?.id).toBe('anon-1');
  });

  it('signInWithEmail should use signInWithOtp for magic links', async () => {
    mockSupabase.auth.signInWithOtp.mockResolvedValue({ data: {}, error: null });
    
    await signInWithEmail('test@example.com', '/redirect');
    
    expect(mockSupabase.auth.signInWithOtp).toHaveBeenCalledWith({
      email: 'test@example.com',
      options: { emailRedirectTo: '/redirect' }
    });
  });

  it('getCurrentUserWithRole should return guest if no session', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    
    const result = await getCurrentUserWithRole();
    
    expect(result.type).toBe('guest');
    expect(result.user).toBeNull();
  });

  it('getCurrentUserWithRole should return anonymous if user is_anonymous', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: { user: { id: 'anon-1', is_anonymous: true } } },
      error: null
    });
    
    const result = await getCurrentUserWithRole();
    
    expect(result.type).toBe('anonymous');
    expect(result.user?.id).toBe('anon-1');
    expect(result.profile).toBeNull();
  });

  it('getCurrentUserWithRole should fetch profile for authenticated user', async () => {
    const mockUser = { id: 'user-1', is_anonymous: false };
    const mockProfile = { id: 'user-1', role: 'teen' };
    
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null
    });
    mockSupabase.single.mockResolvedValue({ data: mockProfile, error: null });
    
    const result = await getCurrentUserWithRole();
    
    expect(result.type).toBe('authenticated');
    expect(result.user?.id).toBe('user-1');
    expect(result.profile).toEqual(mockProfile);
  });

  it('getCurrentUserWithRole should auto-create profile if missing', async () => {
    const mockUser = { id: 'user-1', is_anonymous: false };
    
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null
    });
    // simulate no profile found
    mockSupabase.single.mockResolvedValue({ data: null, error: { code: 'PGRST116' } });
    
    // simulate create success
    const mockNewProfile = { id: 'user-1', role: 'teen', alias: 'TeenUser123', age_band: '13-15' };
    mockAdminClient.single.mockResolvedValue({ data: mockNewProfile, error: null });
    
    const result = await getCurrentUserWithRole();
    
    expect(mockAdminClient.from).toHaveBeenCalledWith('profiles');
    expect(mockAdminClient.insert).toHaveBeenCalled();
    expect(result.type).toBe('authenticated');
    expect(result.profile).toEqual(mockNewProfile);
  });
});
