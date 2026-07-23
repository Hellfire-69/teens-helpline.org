import { test, expect } from '@playwright/test';

test.describe('Registered Onboarding Flow', () => {
  test('Teen account registration and onboarding', async ({ page }) => {
    // Generate a random email
    const email = `teen_test_${Date.now()}@example.com`;
    const password = 'TestPassword123!';

    await page.goto('/signup');
    await page.fill('input[type="email"]', email);
    await page.fill('input[placeholder*="Password (min 6 chars)"]', password);
    await page.fill('input[placeholder="Confirm Password"]', password);
    // Display name field
    await page.fill('input[placeholder*="What should we call you"]', 'Teen Test User');
    await page.click('button:has-text("Create Account")');

    // Should redirect to onboarding
    await expect(page).toHaveURL(/\/onboarding/);

    // Welcome Step
    await page.click('text="Enter"');

    // Avatar Step
    await page.locator('button:has-text("Lumina")').click({ force: true });
    await page.locator('button:has-text("Continue")').first().click();

    // Mood Step
    await page.click('text="Happy"');

    // Concern Step
    await page.click('text="School & Academics"');

    // Nova Welcome Step
    await page.locator('button:has-text("I\'m a Teen")').click({ force: true });
    
    // Wait for animation
    await page.waitForTimeout(1000);
    
    // Select age band
    await page.locator('button:has-text("13 - 15")').click({ force: true });
    
    // Wait for either dashboard redirect or age band step
    await page.waitForTimeout(1000);
    
    // Clicking "Go to Dashboard"
    await page.locator('button:has-text("Go to Dashboard")').click({ force: true });

    await expect(page).toHaveURL(/\/dashboard\/teen/, { timeout: 15000 });
  });

  test('Parent account registration and onboarding', async ({ page }) => {
    // Generate a random email
    const email = `parent_test_${Date.now()}@example.com`;
    const password = 'TestPassword123!';

    await page.goto('/signup');
    await page.fill('input[type="email"]', email);
    await page.fill('input[placeholder*="Password (min 6 chars)"]', password);
    await page.fill('input[placeholder="Confirm Password"]', password);
    // Display name field
    await page.fill('input[placeholder*="What should we call you"]', 'Parent Test User');
    await page.click('button:has-text("Create Account")');

    // Should redirect to onboarding
    await expect(page).toHaveURL(/\/onboarding/);

    // Welcome Step
    await page.click('text="Enter"');

    // Avatar Step
    await page.locator('button:has-text("Lumina")').click({ force: true });
    await page.locator('button:has-text("Continue")').first().click();

    // Mood Step (if applicable for parent)
    await page.click('text="Happy"').catch(() => {});

    // Concern Step
    await page.click('text="School & Academics"').catch(() => {});

    // Nova Welcome Step
    await page.locator('button:has-text("I\'m a Parent")').click({ force: true });
    await page.locator('button:has-text("Go to Dashboard")').click({ force: true });

    await expect(page).toHaveURL(/\/dashboard\/parent/, { timeout: 15000 });
  });
});
