import { test, expect } from '@playwright/test';

test.describe('Peer Support Safety Pipeline API E2E', () => {
  // We use the API context to directly hit the endpoints since the UI isn't built yet
  
  test.beforeEach(async ({ request }) => {
    // Inject a mock authenticated session context to fix the 401 error
    const authRes = await request.post('/api/auth/anonymous');
    expect(authRes.ok()).toBeTruthy();
  });

  test('Risk signals in peer message trigger immediate escalation response and do not persist', async ({ request }) => {
    // 1. Create a session
    const sessionRes = await request.post('/api/peer-support/session');
    expect(sessionRes.ok()).toBeTruthy();
    const sessionData = await sessionRes.json();
    const sessionId = sessionData.data.id;

    // 2. Submit a risk message
    const msgRes = await request.post('/api/peer-support/message', {
      data: {
        sessionId,
        content: 'I want to kill myself today'
      }
    });
    
    expect(msgRes.ok()).toBeTruthy();
    const msgData = await msgRes.json();

    // 3. Verify the API returned the escalation payload
    expect(msgData.data.escalated).toBe(true);
    expect(msgData.data.reason).toBeDefined();
    expect(msgData.data.message).toContain('reach out to a trusted adult');

    // 4. Verify message was NOT saved (it was intercepted by the hook)
    expect(msgData.data.messageData).toBeUndefined();
  });

  test('Normal peer messages pass through without escalation', async ({ request }) => {
    // 1. Create a session
    const sessionRes = await request.post('/api/peer-support/session');
    expect(sessionRes.ok()).toBeTruthy();
    const sessionData = await sessionRes.json();
    const sessionId = sessionData.data.id;

    // 2. Submit a normal message
    const msgRes = await request.post('/api/peer-support/message', {
      data: {
        sessionId,
        content: 'Hello, is anyone there to talk?'
      }
    });
    
    expect(msgRes.ok()).toBeTruthy();
    const msgData = await msgRes.json();

    // 3. Verify normal response
    expect(msgData.data.escalated).toBe(false);
    expect(msgData.data.messageData).toBeDefined();
    expect(msgData.data.messageData.content).toBe('Hello, is anyone there to talk?');
    expect(msgData.data.messageData.flagged).toBe(false);
  });

  test('Profanity in peer message flags the message but persists it', async ({ request }) => {
    // 1. Create a session
    const sessionRes = await request.post('/api/peer-support/session');
    expect(sessionRes.ok()).toBeTruthy();
    const sessionData = await sessionRes.json();
    const sessionId = sessionData.data.id;

    // 2. Submit a message with profanity (moderation check)
    const msgRes = await request.post('/api/peer-support/message', {
      data: {
        sessionId,
        content: 'This situation is shit'
      }
    });
    
    expect(msgRes.ok()).toBeTruthy();
    const msgData = await msgRes.json();

    // 3. Verify flagged response
    expect(msgData.data.escalated).toBe(false);
    expect(msgData.data.messageData).toBeDefined();
    expect(msgData.data.messageData.content).toBe('This situation is shit');
    expect(msgData.data.messageData.flagged).toBe(true);
  });
});
