import { Locator, Page, expect } from "@playwright/test";

export class PlaywrightExp {
  async toBeVisible(element: Locator) {
    await expect(element).toBeVisible();
  }
  async toHaveText(element: Locator, value: string | string[]) {
    await expect(element).toHaveText(value);
  }
  async toHaveValue(element: Locator, value: string) {
    await expect(element).toHaveValue(value);
  }
  async toHaveTitle(page: Page, value: string) {
    await expect(page).toHaveTitle(value);
  }
}
