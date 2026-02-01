import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object class providing common functionality for all page objects.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the base URL
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * Wait for the page to be fully loaded
   */
  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get a button by its text content
   */
  getButton(text: string): Locator {
    return this.page.locator(`button:has-text("${text}")`);
  }

  /**
   * Click a button and optionally wait for navigation
   */
  async clickButton(text: string) {
    await this.getButton(text).click();
  }

  /**
   * Check if text is visible on the page
   */
  async isTextVisible(text: string): Promise<boolean> {
    return this.page.locator(`text=${text}`).isVisible();
  }
}
