import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
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

    const lower = responseText.toLowerCase();

    expect(responseText.length).toBeGreaterThan(20);
    expect(responseText.length).toBeLessThan(2000);
    expect(lower).toMatch(/permission|data/);
    expect(lower).not.toMatch(/error|undefined|nan|something went wrong/);

    fs.writeFileSync(
      path.join(__dirname, '..', 'evals', 'last-response.json'),
      JSON.stringify({ question: 'What is Permission', responseText }, null, 2)
    );
  });
});
