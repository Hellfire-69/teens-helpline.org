import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('Anonymous entry to dashboard', async ({ page }) => {
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    await page.goto('/signin');
    
    // Click Anonymous Sign In
    await page.click('text="Continue Anonymously"');
    
    // Should be redirected to onboarding
    await expect(page).toHaveURL(/\/onboarding/);
    
    // Welcome Step
    await expect(page.locator('text="You found a safe place."')).toBeVisible();
    await page.click('text="Enter"');
    
    // Avatar Step
    await expect(page.locator('text="Choose a companion for the journey."')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")').first()).not.toBeVisible(); // Hidden until selected
    await page.locator('button:has-text("Lumina")').click({ force: true });
    await expect(page.locator('button:has-text("Continue")').first()).toBeVisible();
    await page.locator('button:has-text("Continue")').first().click();

    
    // Mood Step
    await expect(page.locator('text="What\'s closest to how today feels?"')).toBeVisible();
    await page.click('text="Happy"', { force: true });
    
    // Concern Step
    await expect(page.locator('text="What is on your mind?"')).toBeVisible();
    await page.click('text="School & Academics"', { force: true });
    
    // Nova Welcome Step
    await expect(page.locator('text="Thank you for sharing that."')).toBeVisible();
    await expect(page.locator('text="Who are we setting this space up for?"')).toBeVisible();
    await page.locator('button:has-text("I\'m a Teen")').click({ force: true });
    
    // Wait for animation
    await page.waitForTimeout(1000);
    
    // Select age band
    await page.locator('button:has-text("13 - 15")').click({ force: true });
    await page.waitForTimeout(500);

    await page.locator('button:has-text("Go to Dashboard")').click();
    
    // Anonymous user goes to dashboard
    await expect(page).toHaveURL(/\/dashboard\/teen/, { timeout: 10000 });
  });
});
