import { test, expect } from '@playwright/test';
import {
  dismissCookieBanner,
  waitForSuggestedTopics,
  waitForAgentResponse,
  lastAgentMessage,
} from './helpers';

test.describe('Suggested topics', () => {
  test('clicking a suggested topic produces an agent response', async ({ page }) => {
    await page.goto('/');
    await dismissCookieBanner(page);
    await waitForSuggestedTopics(page);

    await page.getByRole('button', { name: 'What is Permission' }).click();
    await waitForAgentResponse(page);

    const responseText = (await lastAgentMessage(page).innerText()).trim();
    expect(responseText.length).toBeGreaterThan(0);
    expect(responseText).not.toContain('Permission is typing');
  });
});
