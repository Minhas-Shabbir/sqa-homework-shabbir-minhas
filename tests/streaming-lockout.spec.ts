import { test, expect } from '@playwright/test';
import { dismissCookieBanner, waitForSuggestedTopics, waitForAgentResponse, userBubbles } from './helpers';

test.describe('Streaming lockout', () => {
  test('a second message cannot be sent while the agent is still responding', async ({ page }) => {
    await page.goto('/');
    await dismissCookieBanner(page);
    await waitForSuggestedTopics(page);

    const countBefore = await userBubbles(page).count();
    const chatInput = page.getByTestId('agent-chat-input');

    await page.getByRole('button', { name: 'What is Permission' }).click();

    await expect(chatInput).toHaveAttribute('placeholder', 'Agent is responding...', { timeout: 5_000 });

    await chatInput.click({ timeout: 2_000 }).catch(() => {});
    await chatInput.pressSequentially('Second message while busy', { timeout: 2_000 }).catch(() => {});
    await page.keyboard.press('Enter').catch(() => {});

    const countDuringStream = await userBubbles(page).count();
    expect(countDuringStream).toBe(countBefore + 1);

    await waitForAgentResponse(page);
    await expect(chatInput).toHaveAttribute('placeholder', 'ASK anything...');
    await expect(chatInput).toBeEnabled();
  });
});
