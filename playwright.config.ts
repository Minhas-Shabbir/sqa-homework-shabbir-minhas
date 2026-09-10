import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // shared target site, avoid hammering the live agent concurrently
  retries: 1,           // one retry only — masking real flake would defeat the point of this suite
  timeout: 45_000,      // generous per-test ceiling; the agent streams, not instant
  expect: {
    timeout: 20_000,    // used by web-first assertions (e.g. toBeVisible, polling toPass)
  },
  reporter: [
    ['html', { outputFolder: 'artifacts/report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'https://ask.permission.ai',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
