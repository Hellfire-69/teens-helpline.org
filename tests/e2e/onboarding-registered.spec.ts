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
    await expect(page.locator('text="Choose a companion for the journey."')).toBeVisible();
    await page.locator('button:has-text("Lumina")').click({ force: true });
    await page.locator('button:has-text("Continue")').first().click();

    // Mood Step
    await expect(page.locator('text="What\'s closest to how today feels?"')).toBeVisible();
    await page.click('text="Happy"', { force: true });

    // Concern Step
    await expect(page.locator('text="What is on your mind?"')).toBeVisible();
    await page.click('text="School & Academics"', { force: true });

    // Nova Welcome Step
    await expect(page.locator('text="Who are we setting this space up for?"')).toBeVisible();
    await page.locator('button:has-text("I\'m a Teen")').click({ force: true });
    
    // Wait for animation
    await page.waitForTimeout(1000);
    
    // Select age band
    await page.locator('button:has-text("13 - 15")').click({ force: true });
    
    // Wait for either dashboard redirect or age band step
    await page.waitForTimeout(1000);
    
    // Clicking "Go to Dashboard"
    await page.locator('button:has-text("Go to Dashboard")').click();

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
    await expect(page.locator('text="Choose a companion for the journey."')).toBeVisible();
    await page.locator('button:has-text("Lumina")').click({ force: true });
    await page.locator('button:has-text("Continue")').first().click();

    // Mood Step (if applicable for parent)
    await expect(page.locator('text="What\'s closest to how today feels?"')).toBeVisible().catch(() => {});
    await page.click('text="Happy"', { force: true }).catch(() => {});

    // Concern Step
    await expect(page.locator('text="What is on your mind?"')).toBeVisible().catch(() => {});
    await page.click('text="School & Academics"', { force: true }).catch(() => {});

    // Nova Welcome Step
    await expect(page.locator('text="Who are we setting this space up for?"')).toBeVisible();
    await page.locator('button:has-text("I\'m a Parent")').click({ force: true });
    
    // Wait for animation
    await page.waitForTimeout(1000);
    
    await page.locator('button:has-text("Go to Dashboard")').click();

    await expect(page).toHaveURL(/\/dashboard\/parent/, { timeout: 15000 });
  });
});
