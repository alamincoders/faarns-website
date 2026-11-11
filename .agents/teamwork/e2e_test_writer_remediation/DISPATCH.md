## 2026-11-10T06:19:37Z
You are the E2E Test Suite Remediation Author for Milestone M_E3 (Iteration 2) in faarns-web.
Working directory: d:\Space\Faarns\next.js\faarns-web
Your state folder: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_test_writer_remediation

MANDATORY FIRST STEP:
Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md
Also read:
d:\Space\Faarns\next.js\faarns-web\PROJECT.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_e2e\SCOPE.md
d:\Space\Faarns\next.js\faarns-web\TEST_INFRA.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_e2e\GATE_STATUS.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_reviewer_2\handoff.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_challenger_1\handoff.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_challenger_2\handoff.md

WRITE OWNERSHIP:
You own exclusively:
- `tests/tier1-functional/*.test.mjs`
- `tests/tier2-boundary/*.test.mjs`
- `tests/tier3-pairwise/*.test.mjs`
- `tests/tier4-journeys/*.test.mjs`
DO NOT modify `scripts/`, `tests/helpers/`, or any application source code in `src/` or `app/`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

REMEDIATION TASKS:
1. Fix Windows NTFS Clobbering Bug in `tests/tier2-boundary/not-found.test.mjs`:
   In `tests/tier2-boundary/not-found.test.mjs:48`, line 48 calls `http.get('/services/AI-AGENTS')`. On Windows NTFS, Next.js writes dynamic 404 cache files `AI-AGENTS.html` and `AI-AGENTS.meta`, which clobbers the pre-rendered `ai-agents.html` and `ai-agents.meta` on disk, breaking subsequent `/services/ai-agents` requests across Tiers 1, 3, and 4!
   Change line 48 to test non-existent casing using a non-colliding slug (e.g. `await http.get('/services/NONEXISTENT-CASING-SLUG')`) so that it tests casing / non-existent slug handling without clobbering any existing pre-rendered lowercase SSG slug file.

2. Expand Tier 1 Test Coverage to >=5 tests per feature for all 20 features in `SCOPE.md`:
   Reviewer 2 identified that Tier 1 only has 64 tests because routes were grouped into single tests, and Custom 404 and FAQ accordion had 0 tests in Tier 1.
   Expand `tests/tier1-functional/` so that each of the 20 features in `SCOPE.md` has >= 5 distinct, well-structured test cases, bringing the total Tier 1 test count to >= 100 tests:
   - Feature 1: Route `/` (Homepage) >= 5 tests (status, title, hero pill & h1 split, flow simulation 4 steps, tech stack marquee 10 tools, automate cards, work cases)
   - Feature 2: Route `/about` >= 5 tests (status, title, hero pill & h1, 4 belief cards, team statement, closer)
   - Feature 3: Route `/careers` >= 5 tests (status, title, hero pill & h1, 5 perk chips, closer CTA to contact)
   - Feature 4: Route `/pricing` >= 5 tests (status, title & meta, ladder 3 rungs, price table 13 rows, 4 promises, pricing FAQs)
   - Feature 5: Route `/services` >= 5 tests (status, title, hero pill & h1, AI automation group 3 services, Growth group 6 services)
   - Feature 6: Route `/services/[slug]` (All 9 dynamic slugs) (10 tests)
   - Feature 7: Route `/contact` >= 5 tests (status, title & meta, hero pill & h1, 3 call steps, form mount)
   - Feature 8: Contact Form Functionality >= 5 tests (name, email, site, needs pills, budget options, submit button)
   - Feature 9: API `/api/contact` >= 5 tests (POST minimal valid, full valid, json header, unconfigured 503, method not allowed 405)
   - Feature 10: Route `/not-found` (Custom 404) >= 5 tests in Tier 1 (`tests/tier1-functional/not-found-page.test.mjs`: 404 status, robots noindex, h1 "This page doesn’t exist.", lede copy, homepage CTA button)
   - Feature 11: Global Navigation Bar >= 5 tests (brand link to /, desktop links, mobile hamburger button, drawer container, active link aria-current)
   - Feature 12: Verbatim Footer Structure >= 5 tests (background image style, 3 navigation columns, copyright string, legal links, email link)
   - Feature 13: Footer Marketing CTA Banner >= 5 tests (light rays background, heading "Discover If We’re the Right Fit for Your Brand", subheading, CTA button "Let’s Get Started", link to /contact)
   - Feature 14: Dynamic Geolocation Phone Numbers >= 5 tests (default UK +44 7365 617024, tel link, layout placement, display format, mailto link)
   - Feature 15: Footer SVG Wordmark & Icons >= 5 tests (FAARNS wordmark SVG, 1125x224 viewBox, linear gradient stops, 4 social buttons, social targets and rel attributes)
   - Feature 16: Public Static Assets >= 5 tests (/footerImage.png, /logo-black.png, /Light Rays Effect.png, fonts, favicon)
   - Feature 17: Price Table Filtering >= 5 tests (initial "All" aria-pressed, 13 rows, tab buttons structure, pricing cards, add-on rows)
   - Feature 18: FAQ Accordion Component >= 5 tests in Tier 1 (`tests/tier1-functional/faq-accordion.test.mjs`: rendered faq container, item 0 open by default, aria-expanded attributes, question titles, answer disclosure)
   - Feature 19: Motion & Layout Attributes >= 5 tests (data-reveal, data-split, data-magnetic, data-flow-status, data-hscroll)
   - Feature 20: Typography & Asset Loading >= 5 tests (font classes on html, Geist sans, Archivo variable font link, meta viewport, theme color)

3. Clean `.next` and Rebuild:
   Delete `.next` to wipe out the clobbered `ai-agents.meta`, and run `npm.cmd run build` (or `node ./node_modules/next/dist/bin/next build`) to recreate a pristine production build.

4. Verify Deterministic Execution:
   Run `node scripts/run-e2e.mjs` multiple times consecutively (Run 1, Run 2). Verify:
   - Zero degraded failures on Run 2!
   - Tier 2 passes 100% (26/26).
   - Tier 3 passes 100% (20/20).
   - Tier 4 has only the 1 expected M2 social links failure (27/28).
   - Tier 1 has only the 9 expected M2 footer failures.


## 2026-11-10T06:36:09Z
**Context**: Milestone M_E3 Remediation Status Check
**Content**: Checking in on your status. Please report on your current progress, what command is currently running, and ETA for delivering your handoff report.
**Action**: Update progress.md and send a brief status reply.
