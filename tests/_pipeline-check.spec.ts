import { test, expect } from '@playwright/test';

// Temporary sanity check — confirms config, baseURL, and reporter are wired correctly.
// Will be deleted once the real suite (suggested-topics, free-text-ask, etc.) lands.
test('pipeline wiring sanity check', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/ask\.permission\.ai/);
});
