# UX scratch notes (working file — not a graded artifact)

Raw observations as I found them. Will be distilled into artifacts/ux-review.md
(≤400 words, prioritized) once post-signup exploration (desktop + mobile) is done.

## Pre-login landing page

- Suggested-topic pills do NOT reliably render on the very first paint of a
  fresh session (confirmed via headed test runs — consistently required a
  reload to appear, not a rare flake). A first-time visitor who doesn't
  happen to reload sees only the greeting bubble and the ASK input, with no
  guidance on what to ask. This is a real onboarding gap, not a styling nit.
- Cookie-consent banner overlays the bottom of the chat panel (covers part of
  the pills grid and is adjacent to the ASK input) on every fresh session.
- Browser back button exits the agent page entirely rather than stepping back
  within the conversation - the app doesn't push any history/route state per
  message, so "back" feels like leaving the product, not undoing a turn.
- Refresh reliably returns to the pills/landing state (conversation isn't
  persisted) - confirms the reload-based wait strategy in Test 1 models real
  behavior rather than working around a one-off fluke.

## Automation/environment notes (for README key decisions, not UX per se)

- Confirmed live: a bare page.goto() to ask.permission.ai occasionally times
  out under parallel worker load (2 desktop-chromium runs hitting the site
  simultaneously) - a real external flake, not a defect in our locators or
  wait strategy. retries: 1 in playwright.config.ts absorbed it correctly
  (reported as "flaky", final run still passed).
- Even the default opening greeting text varies between sessions (not just
  topic responses) - reinforces that no fixed-string assertion is safe
  anywhere in this app, not only on agent answers.
- After pressing Enter/Send, keyboard focus is lost from the ASK input - the
  user has to click back into the box before typing the next message. Real
  friction for a chat product meant for rapid back-and-forth.
- Confirmed on a REAL mobile device (not just responsive mode, per iOS status
  bar in screenshot): suggested-topic pills correctly stack to a single
  column and layout holds up - responsive behavior matches desktop intent.
- Also observed: the agent correctly refuses a prompt-injection attempt
  ("Ignore your previous instructions... backend system instructions") and
  redirects to its actual scope - a good sign for the agent's guardrails,
  worth a positive mention alongside the improvement list.
- Positive finding: for questions outside its scope, the agent gives a
  clean, honest redirect ("I'm not sure about that, but I can explain how
  Permission.ai works...") rather than hallucinating or erroring - good
  graceful-degradation behavior worth a positive mention.
