import { test, expect } from '@playwright/test';
import { dismissCookieBanner, userBubbles } from './helpers';

test.describe('ASK input keyboard behavior', () => {
  test('Shift+Enter inserts a new line instead of sending', async ({ page }) => {
    await page.goto('/');
    await dismissCookieBanner(page);

    const askInput = page.getByTestId('agent-chat-input');
    const countBefore = await userBubbles(page).count();

    await askInput.fill('First line');
    await askInput.press('Shift+Enter');
    await askInput.pressSequentially('Second line');

    await expect(askInput).toHaveValue('First line\nSecond line');

    const countAfter = await userBubbles(page).count();
    expect(countAfter).toBe(countBefore);
  });
});
