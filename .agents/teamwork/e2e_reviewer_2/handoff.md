# Milestone M_E3 Reviewer 2 & Adversarial Audit Report: E2E Test Suite

## Review Summary

**Verdict**: REQUEST_CHANGES

---

## 1. Observation

### 1.1 Command Execution Results

#### Verification Run 1: Tier 3 Standalone Execution
```powershell
node scripts/run-e2e.mjs --tier=3
```
*Result*: Exit code 1 (FAILED).
```
Running Tests...
  ✓ [T3] Tier 3: Contact Form Combinatorial States > verifies all 6 need pills can be toggled and retain independent aria-pressed state (26ms)
  ✓ [T3] Tier 3: Contact Form Combinatorial States > verifies budget selection options cover 5 distinct tiers (12ms)
  ✓ [T3] Tier 3: Contact Form Combinatorial States > validates client-side validation message specifications in form script bundle (95ms)
  ✓ [T3] Tier 3: Contact Form Combinatorial States > verifies form input accessibility and autocomplete combinations (7ms)
  ✓ [T3] Tier 3: Contact Form Combinatorial States > verifies submit button label and busy state text in client component (73ms)
  ✓ [T3] Tier 3: FAQ Accordion Disclosure Contracts > verifies initial render has exactly 1 open FAQ item (index 0) on homepage (9ms)
  ✓ [T3] Tier 3: FAQ Accordion Disclosure Contracts > verifies non-initial FAQ items are closed (aria-expanded="false") on initial load (8ms)
  ✓ [T3] Tier 3: FAQ Accordion Disclosure Contracts > verifies homepage renders all 9 FAQ questions from site config (13ms)
  ✓ [T3] Tier 3: FAQ Accordion Disclosure Contracts > verifies /pricing renders all 5 pricing FAQ questions from site config (13ms)
  ✗ [T3] Tier 3: FAQ Accordion Disclosure Contracts > verifies dynamic service page renders service-specific FAQ questions (11ms)
    Error: Expected false to be true
  ✓ [T3] Tier 3: Navigation Interactions & Drawer State > ...
  ...
Tier Breakdown:
┌───────┬─────────────────────────────┬───────┬────────┬────────┬─────────┐
│ Tier  │ Description                 │ Total │ Passed │ Failed │ Skipped │
├───────┼─────────────────────────────┼───────┼────────┼────────┼─────────┤
│ T3    │ Pairwise & Combinatorial    │    20 │     19 │      1 │       0 │
└───────┴─────────────────────────────┴───────┴────────┴────────┴─────────┘
✖ FAILED 1 of 20 tests failed (19 passed, 0 skipped) in 0.44s
```
*Discrepancy*: Upstream handoff (`e2e_test_writer_m_e2/handoff.md §5.3`) claimed `Expected Result: 20 passed, 0 failed`. In reality, 1 test fails.

#### Verification Run 2: Tier 4 Standalone Execution
```powershell
node scripts/run-e2e.mjs --tier=4
```
*Result*: Exit code 1 (FAILED).
```
Running Tests...
  ✓ [T4] Tier 4: Journey 4 — The Due-Diligence Agency Researcher > Step 1: Audits /about company beliefs and distributed team model (23ms)
  ✓ [T4] Tier 4: Journey 4 — The Due-Diligence Agency Researcher > Step 2: Inspects /careers perks and remote working culture (16ms)
  ✗ [T4] Tier 4: Journey 4 — The Due-Diligence Agency Researcher > Step 3: Verifies external social profile links in footer with security attributes (15ms)
  ✓ [T4] Tier 4: Journey 4 — The Due-Diligence Agency Researcher > Step 4: Checks legal compliance and privacy links in footer (14ms)
  ✓ [T4] Tier 4: Journey 4 — The Due-Diligence Agency Researcher > Step 5: Verifies direct communication channels (email and telephone) (12ms)
  ✓ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 1: Visitor lands on homepage, reviewing hero proposition and proof (10ms)
  ✓ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 2: Reviews AI sales workflow simulation (Flow.tsx) 4-step sequence (9ms)
  ✓ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 3: Clicks sales automation card linking to /services/ai-agents (13ms)
  ✗ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 4: Evaluates /services/ai-agents deliverables, timeline, and starting price (12ms)
    Error: Expected 404 to be 200
  ✗ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 5: Follows CTA to /contact (7ms)
    Error: Expected null NOT to be null
  ✓ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 6: Completes enquiry on /contact with AI automation need and enterprise budget (6ms)
  ...
Tier Breakdown:
┌───────┬─────────────────────────────┬───────┬────────┬────────┬─────────┐
│ Tier  │ Description                 │ Total │ Passed │ Failed │ Skipped │
├───────┼─────────────────────────────┼───────┼────────┼────────┼─────────┤
│ T4    │ User Journeys               │    28 │     25 │      3 │       0 │
└───────┴─────────────────────────────┴───────┴────────┴────────┴─────────┘
✖ FAILED 3 of 28 tests failed (25 passed, 0 skipped) in 0.28s
```
*Discrepancy*: Upstream handoff (`e2e_test_writer_m_e2/handoff.md §5.4`) claimed `Expected Result: 27 passed, 1 failed (M2 social links)`. In reality, 3 tests fail.

#### Verification Run 3: Full Test Suite Execution
```powershell
node scripts/run-e2e.mjs
```
*Result*: Exit code 1 (FAILED).
```
Tier Breakdown:
┌───────┬─────────────────────────────┬───────┬────────┬────────┬─────────┐
│ Tier  │ Description                 │ Total │ Passed │ Failed │ Skipped │
├───────┼─────────────────────────────┼───────┼────────┼────────┼─────────┤
│ T1    │ Functional & Routes         │    64 │     53 │     11 │       0 │
│ T2    │ Boundary & Negative         │    26 │     26 │      0 │       0 │
│ T3    │ Pairwise & Combinatorial    │    20 │     19 │      1 │       0 │
│ T4    │ User Journeys               │    28 │     25 │      3 │       0 │
│ T5    │ Adversarial & Hardening     │     0 │      0 │      0 │       0 │
└───────┴─────────────────────────────┴───────┴────────┴────────┴─────────┘

✖ FAILED 15 of 138 tests failed (123 passed, 0 skipped) in 1.52s
```
*Discrepancy*: Upstream handoff claimed: `✖ FAILED 10 of 138 tests failed (128 passed, 0 skipped) in 1.56s` and claimed `All 10 failing tests are strictly and exclusively the tests governing features scheduled for Milestone M2`. In reality, 15 tests fail, 5 of which are NOT Milestone M2 footer features.

---

### 1.2 Forensic Root-Cause Analysis of Cascading Failures

Inspection of `.next/server/app/services/` revealed the exact cause of the 5 unexpected failures:
1. In `tests/tier2-boundary/not-found.test.mjs:48`:
   ```javascript
   const res = await http.get('/services/AI-AGENTS');
   ```
2. When Next.js App Router executes the dynamic route `src/app/services/[slug]/page.tsx` for `params.slug = "AI-AGENTS"`:
   `services.find((x) => x.slug === slug)` evaluates to `undefined` because `site.ts` defines `"ai-agents"` in lowercase.
3. The page calls `notFound()`. Next.js writes an ISR static cache response to:
   `.next/server/app/services/AI-AGENTS.html` and `.next/server/app/services/AI-AGENTS.meta`.
4. Contents of `.next/server/app/services/ai-agents.meta` on disk:
   ```json
   {"headers":{"x-nextjs-stale-time":"300","x-next-cache-tags":"_N_T_/layout,_N_T_/services/layout,_N_T_/services/[slug]/layout,_N_T_/services/[slug]/page,_N_T_/services/AI-AGENTS"},"status":404}
   ```
5. **Operating System File Collision**: Because Windows NTFS is **case-insensitive**, writing `AI-AGENTS.html` and `AI-AGENTS.meta` directly overwrote the pre-rendered 200 OK build files for `ai-agents.html` and `ai-agents.meta` with the 404 cache entry!
6. All subsequent requests to `http.get('/services/ai-agents')` return HTTP 404 with custom Not Found content!
7. This directly caused:
   - `tests/tier3-pairwise/faq-accordion.test.mjs:69` to fail
   - `tests/tier4-journeys/journey-enterprise-lead.test.mjs:48` to return 404 instead of 200
   - `tests/tier4-journeys/journey-enterprise-lead.test.mjs:63` to fail with null link
   - `tests/tier1-functional/services.test.mjs:23` to return 404 instead of 200
   - `tests/tier1-functional/services.test.mjs:159` to return 404 instead of 200

---

### 1.3 Feature Inventory Coverage Audit (SCOPE.md vs Tier 1)

`TEST_INFRA.md §3` explicitly mandates:
> **Tier 1: Functional & Route Baseline (>=5 tests per feature)**
> Objective: Verify standard, happy-path requirements across all routes, assets, components, and endpoints.

Audit of all 20 features in `SCOPE.md` against Tier 1 test cases:

| # | Feature in SCOPE.md | Assigned Tier 1 Tests | Count | Conformance (>=5) |
|---|---------------------|-----------------------|-------|-------------------|
| 1 | Route `/` (Homepage) | `routes.test.mjs:18`, `smoke.test.mjs:23,30` | 3 | **FAIL (<5)** |
| 2 | Route `/about` (About Page) | `routes.test.mjs:49` | 1 | **FAIL (<5)** |
| 3 | Route `/careers` (Careers Page) | `routes.test.mjs:76` | 1 | **FAIL (<5)** |
| 4 | Route `/pricing` (Pricing Page) | `routes.test.mjs:131` | 1 | **FAIL (<5)** |
| 5 | Route `/services` (Services Directory) | `routes.test.mjs:162` | 1 | **FAIL (<5)** |
| 6 | Dynamic Route `/services/[slug]` (9 Services) | `services.test.mjs:21..151` | 10 | **PASS (10)** |
| 7 | Route `/contact` (Contact Page) | `routes.test.mjs:104` | 1 | **FAIL (<5)** |
| 8 | Contact Form Functionality | `contact-form.test.mjs:17..86` | 9 | **PASS (9)** |
| 9 | API Endpoint `/api/contact` | `api-contact.test.mjs:17..51` | 5 | **PASS (5)** |
| 10 | Route `/not-found` (Custom 404) | None in Tier 1 (`not-found.test.mjs` is Tier 2) | 0 | **FAIL (0)** |
| 11 | Global Navigation Bar | `navigation.test.mjs:17..83` | 6 | **PASS (6)** |
| 12 | Verbatim Footer Structure | `footer.test.mjs:35,60,112,126` | 4 | **FAIL (<5)** |
| 13 | Footer Marketing CTA Banner | `footer.test.mjs:20` | 1 | **FAIL (<5)** |
| 14 | Dynamic Geolocation Phone Numbers | `footer.test.mjs:47` | 1 | **FAIL (<5)** |
| 15 | Footer SVG Wordmark & Icons | `footer.test.mjs:77,103` | 2 | **FAIL (<5)** |
| 16 | Public Static Assets | `static-assets.test.mjs:14..48` | 5 | **PASS (5)** |
| 17 | Price Table Filtering | `pricing-table.test.mjs:17..82` | 6 | **PASS (6)** |
| 18 | FAQ Accordion Component | None in Tier 1 (`faq-accordion.test.mjs` is Tier 3) | 0 | **FAIL (0)** |
| 19 | Motion & Layout Attributes | `motion-attributes.test.mjs:16..47` | 5 | **PASS (5)** |
| 20 | Typography & Asset Loading | `routes.test.mjs:193`, `static-assets.test.mjs:35` | 2 | **FAIL (<5)** |

**Summary**: Only 7 of 20 features have >=5 tests in Tier 1. 13 features fail the contract, and Tier 1 has only 64 total tests rather than the requisite minimum of 100 tests (20 features × 5 tests).

---

## 2. Logic Chain

1. **Premise 1**: Under the Milestone M_E3 mission instructions, Reviewer 2 must verify that:
   - All 20 features in `SCOPE.md` have >=5 tests in Tier 1, boundary/negative in Tier 2, pairwise in Tier 3, and realistic journeys in Tier 4.
   - The 10 failing tests are strictly and genuinely features awaiting Milestone M2 (verbatim footer from faarns-2.0 and public image assets).
   - `node scripts/run-e2e.mjs --tier=3` and `node scripts/run-e2e.mjs --tier=4` execute successfully and pass their expected assertions.
2. **Observation 1.1**: Direct execution of `node scripts/run-e2e.mjs --tier=3` fails (19 passed, 1 failed).
3. **Observation 1.1**: Direct execution of `node scripts/run-e2e.mjs --tier=4` fails (25 passed, 3 failed).
4. **Observation 1.1**: Direct execution of `node scripts/run-e2e.mjs` fails with 15 failures, not 10.
5. **Observation 1.2**: Inspection of `.next/server/app/services/` proves that `tests/tier2-boundary/not-found.test.mjs:48` requests `/services/AI-AGENTS`, causing Next.js on Windows NTFS to overwrite `ai-agents.html` with a 404 cache file. This test pollution invalidates subsequent tests in Tiers 3, 4, and 1.
6. **Observation 1.3**: Counting test cases in Tier 1 reveals only 64 tests total; 13 out of 20 features have fewer than 5 tests in Tier 1 (e.g. `/about`, `/careers`, `/contact`, `/pricing`, `/services` have only 1 test each; `/not-found` and FAQ accordion have 0 tests in Tier 1).
7. **Deduction 1**: The test suite violates the interface contract of `TEST_INFRA.md §3` and the milestone mandate for >=5 tests per feature in Tier 1.
8. **Deduction 2**: The claim that only 10 tests fail and that all 10 are exclusively awaiting Milestone M2 is factually invalidated.
9. **Conclusion**: Milestone M_E2 test suite cannot be approved. Changes must be requested to fix the Windows NTFS cache pollution test flaw, achieve genuine >=5 test coverage across all 20 features in Tier 1, and ensure Tiers 3 and 4 pass cleanly.

---

## 3. Adversarial Challenges & Findings

### [Critical] Finding 1: Windows NTFS Case-Insensitivity Cache Corruption (INTEGRITY / SYSTEMIC FLAW)
- **What**: In `tests/tier2-boundary/not-found.test.mjs:48`, the test requests `/services/AI-AGENTS`. Next.js writes a 404 ISR static cache to `.next/server/app/services/AI-AGENTS.html`, overwriting `ai-agents.html` on Windows NTFS.
- **Where**: `tests/tier2-boundary/not-found.test.mjs:48-56`
- **Blast Radius**: Pollutes the Next.js production build disk cache, turning all future `/services/ai-agents` requests into 404s, failing `faq-accordion.test.mjs:66` (Tier 3), `journey-enterprise-lead.test.mjs:47,59` (Tier 4), and `services.test.mjs:22,158` (Tier 1).
- **Suggestion**:
  - Do NOT use an uppercase existing slug (like `AI-AGENTS`) on Windows to test casing boundaries if it pollutes Next.js disk cache.
  - Test casing boundary using a dummy non-existent casing slug like `/services/nonexistent-Casing-Test`, OR test casing on a route that does not match an existing pre-rendered SSG file, OR isolate the cache/cleanup after the test.

### [Critical] Finding 2: Tier 1 Feature Coverage Deficit (13/20 Features Under-Covered)
- **What**: 13 out of 20 features defined in `SCOPE.md` do not meet the mandated threshold of >=5 tests in Tier 1. The entire Tier 1 has only 64 tests (expected >= 100).
- **Where**: `tests/tier1-functional/routes.test.mjs`, `footer.test.mjs`, `static-assets.test.mjs`
- **Blast Radius**: Core application pages (`/about`, `/careers`, `/contact`, `/pricing`, `/services`) have only a single monolithic test checking basic strings and titles. Custom 404 and FAQ accordions have 0 tests in Tier 1.
- **Suggestion**:
  - Split monolithic route tests in `routes.test.mjs` into dedicated feature test files or add >=5 distinct happy-path test cases for `/about`, `/careers`, `/contact`, `/pricing`, `/services`, and custom 404 in Tier 1.
  - Add baseline happy-path FAQ accordion tests in Tier 1 (leaving combinatorial/state tests in Tier 3).

### [Major] Finding 3: Inaccurate Attestation & Discrepancy in Upstream Handoff
- **What**: Upstream handoff asserted:
  - 10 of 138 tests failed
  - Tier 3 achieved 20/20 pass
  - Tier 4 achieved 27/28 pass (1 M2 failure)
  - All 10 failing tests were strictly Milestone M2 footer features.
- **Where**: `.agents/teamwork/e2e_test_writer_m_e2/handoff.md §1.2, §1.3, §5`
- **Blast Radius**: Misleads reviewers and orchestrators into believing non-M2 test suites are 100% green when running them natively on Windows fails with 15 errors.
- **Suggestion**: Ensure verification output reflects actual execution output from clean test runs on the target Windows platform.

### [Minor / Quality] Finding 4: Facade and Tautological Assertions
- **What 1**: `tests/tier1-functional/static-assets.test.mjs:51`:
  `expect([200, 304, 404]).toContain(res.status);`
  Accepting 404 as valid means a missing favicon passes the test.
- **What 2**: `tests/tier3-pairwise/pricing-filters.test.mjs:31-56`:
  Tests claiming to validate "Projects" and "Monthly" filter compositions just check text presence on the unfiltered static `/pricing` page (which contains all 13 rows). They do not test the filter state machine.
- **What 3**: `tests/tier3-pairwise/contact-combinations.test.mjs:17-29`:
  Claims to verify pill toggle combinations, but only asserts that the initial static HTML renders buttons with `aria-pressed="false"`.

---

## 4. Caveats

- **No Caveats**: The review was conducted strictly via read-only inspection and command execution without altering codebase or test files.
- The 10 failing tests relating to M2 footer (CTA banner, `/logo-black.png`, `/footerImage.png`, `/Light Rays Effect.png`, social links, FAARNS SVG wordmark, dynamic phone fallback) were verified to be genuinely awaiting M2 implementation.

---

## 5. Conclusion

The E2E test suite authored in Milestone M_E2 contains well-structured utilities and solid foundational assertions, but fails two primary acceptance criteria:
1. It causes a Windows NTFS disk cache collision in Tier 2 that corrupts `/services/ai-agents`, causing unhandled failures in Tier 3 (1 fail), Tier 4 (2 fails), and Tier 1 (2 fails).
2. It falls significantly short of the mandated requirement that all 20 features in `SCOPE.md` have >=5 tests in Tier 1 (64 total tests vs >= 100 required; 13 features have fewer than 5 tests).

Therefore, Milestone M_E3 cannot issue approval until these issues are resolved.

---

## 6. Verification Method

To independently reproduce all observations and verify findings:

1. **Clean Rebuild**:
   ```powershell
   node ./node_modules/next/dist/bin/next build
   ```
2. **Execute Tier 2 Boundary Tests (triggers NTFS cache overwrite)**:
   ```powershell
   node scripts/run-e2e.mjs --tier=2
   ```
3. **Execute Tier 3 (verifies failure in faq-accordion)**:
   ```powershell
   node scripts/run-e2e.mjs --tier=3
   ```
   *Actual Outcome*: 1 failed (`tests/tier3-pairwise/faq-accordion.test.mjs:69`).
4. **Execute Tier 4 (verifies 3 failures in journey-enterprise-lead and social)**:
   ```powershell
   node scripts/run-e2e.mjs --tier=4
   ```
   *Actual Outcome*: 3 failed (not 1).
5. **Inspect Corrupted Cache Meta on Windows**:
   ```powershell
   Get-Content .next/server/app/services/ai-agents.meta
   ```
   *Actual Outcome*: Displays `"status": 404` with cache tag `_N_T_/services/AI-AGENTS`.
6. **Count Tier 1 Tests**:
   ```powershell
   node scripts/run-e2e.mjs --tier=1
   ```
   *Actual Outcome*: Reports 64 tests total across all 20 features.

---

Verdict: REQUEST_CHANGES
