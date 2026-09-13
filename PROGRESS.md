# Progress tracker (not a graded artifact — our own working checklist)

## Part 1: Automated suite (max 8 tests)
- [x] Test 1: page loads with suggested-topic pills visible
- [x] Test 2: clicking a suggested topic produces a response (+ Part 2 assertions)
- [x] Test 3: submitting free-text via ASK input produces a response
- [x] Test 4: Shift+Enter creates a new line instead of sending
- [x] Test 5: whitespace-only input does not send (negative test)
- [ ] Decide on remaining 0-3 discretionary tests (budget: up to 8 total)

## Part 2: Non-deterministic response validation
- [x] Deterministic assertions implemented in Test 2 (length bounds,
      keyword grounding, no error strings)
- [x] LLM-eval framework wired in and passing (switched from Promptfoo to
      DeepEval + Gemini after Promptfoo hit an unfixable native-module bug;
      test_what_is_permission_response_is_coherent PASSED, score 1.0)
- [ ] artifacts/assertions.md written (≤300 words)

## Part 3: UX review (desktop + mobile, pre-login + post-signup)
- [ ] Sign up for an account (any email)
- [ ] Explore post-signup product on desktop
- [x] Explored on a REAL mobile device (not just responsive mode) - pills
      correctly stack to one column; found: focus lost from ASK input after
      send; agent correctly refuses a prompt-injection attempt
- [ ] artifacts/ux-review.md written (≤400 words, 3-5 PRIORITIZED improvements)
- (running scratch notes so far live in notes/ux-observations.md)

## Part 4: Data-layer reasoning
- [ ] artifacts/data-checks.md written (≤300 words + SQL, no DB access)

## Part 5: Narrated demo
- [ ] Record 60-90 sec screen capture with voice (suite running + report + one Part 2 assertion explained)
- [ ] Save as artifacts/demo.mp4

## AI disclosure
- [ ] artifacts/ai-workflow.md written (≤300 words, all 4 required questions
      answered) - already have a strong real example ready: Gemini model
      name (gemini-2.5-flash) was deprecated/404'd, caught via live testing
      and fixed by searching current docs

## README.md
- [ ] Setup section (exact commands, verified from a clean clone)
- [ ] Test strategy TL;DR (max 10 lines)
- [ ] Key decisions (max 8 bullets, must cover locator/wait strategy) -
      already have a strong candidate: Promptfoo→DeepEval pivot after
      hitting an unfixable native-module bug
- [ ] AI disclosure one-liner pointing to ai-workflow.md
- [ ] Next steps
- [ ] Submission checklist (checkboxes)
- [ ] Total word count ≤500 (excluding commands/checkboxes)
- [ ] **Timebox check: verify a clean clone installs + runs in ~5 minutes** (review gate)

## artifacts/report/
- [ ] Generated HTML report committed (or hosted link + screenshot)

## Repo/submission mechanics
- [x] Repo named sqa-homework-shabbir-minhas, default branch main
- [x] Real commit history (not one giant commit) — ongoing
- [ ] Final review of commit history before submission
- [ ] Send NEW email (not reply) to sjacobson@permission.io, subject:
      "Senior Quality Assurance Engineer – Take-Home Submission"
