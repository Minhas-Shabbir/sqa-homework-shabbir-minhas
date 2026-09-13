import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers';

test.describe('ASK input edge cases', () => {
  test('submitting a whitespace-only message does not send', async ({ page }) => {
    await page.goto('/');
    await dismissCookieBanner(page);

    const askInput = page.getByPlaceholder('ASK anything...');
    const userBubblesBefore = await page.locator('div.flex.justify-end').count();

    await askInput.fill('   ');
    await askInput.press('Enter');

    await expect(page.getByText('Permission is typing...')).not.toBeVisible({ timeout: 3_000 });

    const userBubblesAfter = await page.locator('div.flex.justify-end').count();
    expect(userBubblesAfter).toBe(userBubblesBefore);
  });
});
