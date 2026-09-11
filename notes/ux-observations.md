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
