import { test, expect } from '@playwright/test';
import { dismissCookieBanner, userBubbles } from './helpers';

test.describe('ASK input edge cases', () => {
  test('submitting a whitespace-only message does not send', async ({ page }) => {
    await page.goto('/');
    await dismissCookieBanner(page);

    const askInput = page.getByTestId('agent-chat-input');
    const countBefore = await userBubbles(page).count();

    await askInput.fill('   ');
    await askInput.press('Enter');

    await expect(page.getByText('Permission is typing...')).not.toBeVisible({ timeout: 3_000 });

    const countAfter = await userBubbles(page).count();
    expect(countAfter).toBe(countBefore);
  });
});
