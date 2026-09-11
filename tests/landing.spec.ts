import { test, expect } from "@playwright/test";
import { dismissCookieBanner, waitForSuggestedTopics } from "./helpers";

test.describe("Landing page", () => {
  test("loads with the suggested-topic pills visible", async ({ page }) => {
    await page.goto("/");
    await dismissCookieBanner(page);

    await waitForSuggestedTopics(page);
    await expect(page.getByText("Suggested topics:")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "What is Permission" }),
    ).toBeVisible();
  });
});
