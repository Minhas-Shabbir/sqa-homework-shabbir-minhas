import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers';

test.describe('ASK input keyboard behavior', () => {
  test('Shift+Enter inserts a new line instead of sending', async ({ page }) => {
    await page.goto('/');
    await dismissCookieBanner(page);

    const askInput = page.getByPlaceholder('ASK anything...');
    const userBubblesBefore = await page.locator('div.flex.justify-end').count();

    await askInput.fill('First line');
    await askInput.press('Shift+Enter');
    await askInput.pressSequentially('Second line');

    await expect(askInput).toHaveValue('First line\nSecond line');

    const userBubblesAfter = await page.locator('div.flex.justify-end').count();
    expect(userBubblesAfter).toBe(userBubblesBefore);
  });
});
