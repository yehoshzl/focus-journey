import { test, expect } from '@playwright/test';

test.describe('Focus Journey Smoke Tests', () => {
  test('app loads welcome screen', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Focus Journey')).toBeVisible();
  });

  test('can navigate to session setup', async ({ page }) => {
    await page.goto('/');

    // Click the Begin button
    await page.click('button:has-text("Begin")');

    // Verify we're on the session setup screen by checking for duration button
    await expect(page.getByRole('button', { name: '25m' })).toBeVisible();
  });

  test('welcome screen has start button', async ({ page }) => {
    await page.goto('/');

    const beginButton = page.locator('button:has-text("Begin")');
    await expect(beginButton).toBeVisible();
    await expect(beginButton).toBeEnabled();
  });
});
