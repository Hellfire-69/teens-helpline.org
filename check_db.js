const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

async function check() {
  const { data: usersData, error: err1 } = await supabase.auth.admin.listUsers();
  if (err1) { console.error('Users error:', err1); return; }
  
  const { data: profiles, error: err2 } = await supabase.from('profiles').select('id');
  if (err2) { console.error('Profiles error:', err2); return; }

  const profileIds = new Set(profiles.map(p => p.id));
  const missing = usersData.users.filter(u => !u.is_anonymous && !profileIds.has(u.id));
  
  console.log('Total auth.users:', usersData.users.length);
  console.log('Total profiles:', profiles.length);
  console.log('Signed-in users missing a profile:', missing.length);
  if (missing.length > 0) {
    console.log('Sample missing user id:', missing[0].id);
    console.log('Sample missing user email:', missing[0].email);
  }
}

check();
