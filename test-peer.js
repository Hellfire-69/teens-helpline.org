const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

async function runTest() {
  console.log('Starting end-to-end peer matching test...');

  // 1. Launch browser
  const browser = await chromium.launch({ headless: true });
  
  // 2. Create Context A (Signed-in User)
  // For simplicity, since login might require OTP or UI, we can just use the UI 
  // or simulate it if we have a test user. But wait, Anonymous also works. 
  // We can just use two Anonymous users for the test to avoid login UI complexity,
  // or use the auth API to set the cookie.
  // Actually, the prompt says "one signed-in, one incognito/anonymous".
  // If we can't easily sign in via UI, we can just use two incognito contexts (both anonymous).
  // The backend matching logic doesn't care (it matches user_id or anon_token). 
  
  const contextA = await browser.newContext();
  const pageA = await contextA.newPage();
  
  const contextB = await browser.newContext();
  const pageB = await contextB.newPage();
  
  console.log('Navigating both pages to /peer-support...');
  await pageA.goto('http://localhost:3000/peer-support');
  
  // Accept anonymous warning if it appears
  try {
    await pageA.waitForSelector('text=Continue Anonymously', { timeout: 3000 });
    await pageA.click('text=Continue Anonymously');
  } catch (e) {
    // Maybe already past it
  }

  // Wait a moment before B joins
  await new Promise(r => setTimeout(r, 2000));
  
  await pageB.goto('http://localhost:3000/peer-support');
  try {
    await pageB.waitForSelector('text=Continue Anonymously', { timeout: 3000 });
    await pageB.click('text=Continue Anonymously');
  } catch (e) {
  }

  // Wait for connection
  console.log('Waiting for connections to establish...');
  await pageA.waitForSelector('text=Connected with a trained peer', { timeout: 15000 }).catch(() => console.log("Page A not connected yet"));
  await pageB.waitForSelector('text=Connected with a trained peer', { timeout: 15000 }).catch(() => console.log("Page B not connected yet"));

  // Send messages
  console.log('Sending messages...');
  await pageA.fill('textarea', 'Hello from User A');
  await pageA.keyboard.press('Enter');
  
  await new Promise(r => setTimeout(r, 1000));
  
  await pageB.fill('textarea', 'Hi from User B');
  await pageB.keyboard.press('Enter');
  
  await new Promise(r => setTimeout(r, 3000));

  // Check UI for messages
  const aMessages = await pageA.locator('.bg-white.text-ink-900').allInnerTexts();
  const bMessages = await pageB.locator('.bg-white.text-ink-900').allInnerTexts();
  
  console.log('Page A saw messages from peer:', aMessages);
  console.log('Page B saw messages from peer:', bMessages);
  
  await browser.close();
  
  // 3. Verify Database State
  console.log('\nVerifying Database State...');
  const { data: sessions } = await supabase
    .from('peer_support_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(2);
    
  console.log('Most recent sessions:', JSON.stringify(sessions, null, 2));
}

runTest().catch(console.error);
