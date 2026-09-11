import { Page } from "@playwright/test";

export async function dismissCookieBanner(page: Page) {
  const acceptButton = page.getByRole("button", { name: "Accept All" });
  try {
    await acceptButton.waitFor({ state: "visible", timeout: 5_000 });
    await acceptButton.click();
  } catch {
    // Banner didn't appear in time — proceed; nothing to dismiss.
  }
}

export async function waitForSuggestedTopics(page: Page) {
  const heading = page.getByText("Suggested topics:");
  try {
    await heading.waitFor({ state: "visible", timeout: 8_000 });
  } catch {
    await page.reload();
    await dismissCookieBanner(page);
    await heading.waitFor({ state: "visible", timeout: 8_000 });
  }
}

/**
 * The agent response streams in with no fixed timing and no fixed text.
 * Rather than guessing a sleep duration or matching exact wording, we wait
 * on the app's OWN "still working" signal: a "Permission is typing..."
 * bubble that the product shows to real users while streaming, and removes
 * once the final response has replaced it. This is the same mechanism the
 * app already uses to tell a human the answer isn't ready yet, so it's a
 * meaningful, application-level completion signal rather than an
 * implementation detail we're reverse-engineering.
 */
export async function waitForAgentResponse(page: Page) {
  const typingIndicator = page.getByText("Permission is typing...");
  await typingIndicator
    .waitFor({ state: "visible", timeout: 5_000 })
    .catch(() => {});
  await typingIndicator.waitFor({ state: "hidden", timeout: 30_000 });
}
export function lastAgentMessage(page: Page) {
  return page.locator("div.flex.justify-start").last();
}
