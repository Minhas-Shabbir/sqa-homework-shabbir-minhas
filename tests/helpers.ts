import { Page } from '@playwright/test';

export async function dismissCookieBanner(page: Page) {
  const acceptButton = page.getByRole('button', { name: 'Accept All' });
  try {
    await acceptButton.waitFor({ state: 'visible', timeout: 5_000 });
    await acceptButton.click();
  } catch {
    // Banner didn't appear in time — proceed; nothing to dismiss.
  }
}

export async function waitForSuggestedTopics(page: Page) {
  const heading = page.getByText('Suggested topics:');
  try {
    await heading.waitFor({ state: 'visible', timeout: 8_000 });
  } catch {
    await page.reload();
    await dismissCookieBanner(page);
    await heading.waitFor({ state: 'visible', timeout: 8_000 });
  }
}

export async function waitForAgentResponse(page: Page) {
  const typingIndicator = page.getByText('Permission is typing...');
  await typingIndicator.waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {});
  await typingIndicator.waitFor({ state: 'hidden', timeout: 30_000 });
}

export function userBubbles(page: Page) {
  return page.locator('div.space-y-4 > div.flex.justify-end');
}

export function agentBubbles(page: Page) {
  return page.locator('div.space-y-4 > div.flex.justify-start');
}

export function lastAgentMessage(page: Page) {
  return agentBubbles(page).last();
}
