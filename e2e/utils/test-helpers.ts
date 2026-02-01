import { Page } from '@playwright/test';

/**
 * Wait for a 3D scene to load by checking for canvas presence
 */
export async function waitForSceneLoad(page: Page) {
  await page.waitForSelector('canvas', { timeout: 10_000 });
  // Give the scene a moment to render
  await page.waitForTimeout(500);
}

/**
 * Start a focus session from the welcome screen
 */
export async function startFocusSession(page: Page, duration: number = 25) {
  await page.goto('/');
  await page.click('button:has-text("Begin")');

  // Select duration
  await page.click(`button:has-text("${duration}")`);

  // Start the session
  await page.click('button:has-text("Start")');
}

/**
 * Get the current timer display value
 */
export async function getTimerValue(page: Page): Promise<string> {
  const timerElement = page.locator('[data-testid="timer-display"]');
  return timerElement.textContent() ?? '';
}

/**
 * Mock the timer to skip to completion
 * Uses Playwright's clock API for reliable timer testing
 */
export async function fastForwardTimer(page: Page, seconds: number) {
  await page.clock.fastForward(seconds * 1000);
}
