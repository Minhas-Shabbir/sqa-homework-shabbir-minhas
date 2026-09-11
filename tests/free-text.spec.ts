import { test, expect } from '@playwright/test';
import { dismissCookieBanner, waitForAgentResponse, lastAgentMessage } from './helpers';

test.describe('Free-text ASK input', () => {
  test('submitting a free-text question produces an agent response', async ({ page }) => {
    await page.goto('/');
    await dismissCookieBanner(page);

    const askInput = page.getByPlaceholder('ASK anything...');
    await askInput.fill('How can I start earning with Permission?');
    await askInput.press('Enter');

    await waitForAgentResponse(page);

    const responseText = (await lastAgentMessage(page).innerText()).trim();
    expect(responseText.length).toBeGreaterThan(0);
    expect(responseText).not.toContain('Permission is typing');
  });
});
