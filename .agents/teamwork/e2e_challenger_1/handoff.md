# Milestone M_E3 Challenge Report: Empirical Stress-Test & Vulnerability Assessment

## 1. Observation

### 1.1 Empirical Discovery: Next.js SSG Disk Cache Poisoning on Windows
During isolated tier execution, a critical stateful bug was empirically uncovered in the interaction between the Next.js App Router dynamic SSG route handling and the test suite:

- **Target Route**: `src/app/services/[slug]/page.tsx`
- **Challenged Test**: `tests/tier2-boundary/not-found.test.mjs:48-56`
  ```javascript
  it('verifies service slug resolution and boundary handling for non-existent casing', async ({ http }) => {
    const res = await http.get('/services/AI-AGENTS');
    expect([200, 404]).toContain(res.status);
    const resInvalid = await http.get('/services/INVALID-UNKNOWN-SLUG');
    expect(resInvalid.status).toBe(404);
  }, { tier: 2 });
  ```

#### Observed Empirical Behavior
1. Following a clean build (`npm run build`), Next.js pre-renders `ai-agents` as static HTML and writes `.next/server/app/services/ai-agents.meta`:
   ```json
   {
     "headers": {
       "x-nextjs-stale-time": "300",
       "x-nextjs-prerender": "1",
       "x-next-cache-tags": "_N_T_/layout,_N_T_/services/layout,_N_T_/services/[slug]/layout,_N_T_/services/[slug]/page,_N_T_/services/ai-agents"
     }
   }
   ```
2. When `node scripts/run-e2e.mjs --tier=1` is run against a clean build, `GET /services/ai-agents` responds with HTTP `200 OK` and passes.
3. When `node scripts/run-e2e.mjs --tier=2` is executed, line 48 issues a request to `GET /services/AI-AGENTS`. Because `src/app/services/[slug]/page.tsx` does NOT export `export const dynamicParams = false;`, Next.js treats `AI-AGENTS` as an on-demand dynamic request.
4. Inside `ServicePage`, `services.find((x) => x.slug === 'AI-AGENTS')` returns `undefined`, triggering `notFound()`.
5. Next.js App Router caches the 404 response to disk by writing `.next/server/app/services/AI-AGENTS.html` and `.next/server/app/services/AI-AGENTS.meta`.
6. **On Windows NTFS (case-insensitive filesystem)**, creating `AI-AGENTS.meta` directly overwrites `ai-agents.meta` on disk with:
   ```json
   {"headers":{"x-nextjs-stale-time":"300","x-next-cache-tags":"_N_T_/layout,_N_T_/services/layout,_N_T_/services/[slug]/layout,_N_T_/services/[slug]/page,_N_T_/services/AI-AGENTS"},"status":404}
   ```
7. From that moment on, ANY subsequent request to `/services/ai-agents` is served as `404 Not Found` directly from the poisoned disk cache.
8. Verbatim execution failure on running `node scripts/run-e2e.mjs --filter="services"` immediately after Tier 2:
   ```
   Running Tests...
     ✗ [T1] Tier 1: Dynamic Service Pages (All 9 Slugs) > GET /services/ai-agents renders with price from $3,000 and 6 deliverables (23ms)
       Error: Expected 404 to be 200
     ✓ [T1] Tier 1: Dynamic Service Pages (All 9 Slugs) > GET /services/workflow-automation renders with price from $3,000 and automation deliverables (22ms)
     ...
   [1] Tier 1: Dynamic Service Pages (All 9 Slugs) > GET /services/ai-agents renders with price from $3,000 and 6 deliverables (Tier 1)
       Assertion Failed: Expected 404 to be 200
       Expected: 200
       Actual:   404
       at it.tier (file:///D:/Space/Faarns/next.js/faarns-web/tests/tier1-functional/services.test.mjs:23:24)
   ```
9. Cascading failures observed across other tiers:
   - **Tier 3** (`tests/tier3-pairwise/faq-accordion.test.mjs:69`):
     ```
     ✗ [T3] Tier 3: FAQ Accordion Disclosure Contracts > verifies dynamic service page renders service-specific FAQ questions (14ms)
       Error: Expected false to be true
     ```
     Fails because `http.get('/services/ai-agents')` receives the custom 404 DOM rather than the service FAQ component.
   - **Tier 4** (`tests/tier4-journeys/journey-enterprise-lead.test.mjs:48, 63`):
     ```
     ✗ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 4: Evaluates /services/ai-agents deliverables, timeline, and starting price (14ms)
       Error: Expected 404 to be 200
     ✗ [T4] Tier 4: Journey 1 — The AI Automation Seeker > Step 5: Follows CTA to /contact (9ms)
       Error: Expected null NOT to be null
     ```

---

### 1.2 CLI Flags Stress Testing Output
All required CLI options and combinations were empirically executed against the test runner:

1. **`--tier=1`**:
   - Total tests: 64.
   - Passed: 55. Failed: 9 (with clean cache).
   - All 9 failures are exclusively the pending Milestone M2 features (verbatim footer `MarketingLayout`, social icons, wordmark SVG, copyright, and static image assets `/footerImage.png`, `/logo-black.png`, `/Light Rays Effect.png`).
   - Runner exit code: `1`.

2. **`--tier=2`**:
   - Total tests: 26.
   - Passed: 26. Failed: 0.
   - Verified HTTP 404 boundaries, robots noindex, input guards, and `/api/contact` method/payload validations.
   - Runner exit code: `0`.

3. **`--tier=3`**:
   - Total tests: 20.
   - Passed: 19 (20 on clean cache; 1 failed under poisoned cache as noted in §1.1).
   - Filter state machines, pill selectors, and drawer synchronization verified.

4. **`--tier=4`**:
   - Total tests: 28.
   - Passed: 25 (27 on clean cache; 2 failed under poisoned cache + 1 pending M2 social links test).

5. **`--tier=2,3`**:
   - Total tests: 46 (26 T2 + 20 T3).
   - Correctly composed and executed both tiers.

6. **`--filter="pricing"`**:
   - Discovered 2 matching test files (`tests/tier1-functional/pricing-table.test.mjs` and `tests/tier3-pairwise/pricing-filters.test.mjs`).
   - Total tests executed: 7.
   - Passed: 7. Failed: 0. Duration: 0.13s. Exit code: `0`.

7. **`--filter="contact"`**:
   - Discovered 3 matching test files (`tests/tier1-functional/api-contact.test.mjs`, `tests/tier1-functional/contact-form.test.mjs`, `tests/tier3-pairwise/contact-combinations.test.mjs`).
   - Total tests executed: 19.
   - Passed: 19. Failed: 0. Duration: 0.55s. Exit code: `0`.

8. **`--bail`**:
   - Invocation: `node scripts/run-e2e.mjs --tier=1 --bail`
   - Verified that after executing 17 passing tests, the runner encountered the first failing test (`renders MarketingLayout CTA banner with verbatim heading and button`), aborted execution immediately, presented failure diagnostics, and cleanly exited with code 1 without running remaining tests.

---

### 1.3 Test Timeout & Process Teardown Verification
1. **Per-Test Timeout Engine (`runWithTimeout` in `tests/helpers/runner.mjs`)**:
   - Tested empirically via a custom test harness:
     ```javascript
     it('slow test', async () => new Promise(r => setTimeout(r, 500)), { timeout: 100 });
     ```
   - Verbatim result: Test aborted and failed with `Error: Test timed out after 100ms`. Timer cleared cleanly in `finally` block.
2. **Process Teardown & Ephemeral Port Lifecycle (`tests/helpers/server.mjs`)**:
   - Stress-tested rapid consecutive server start and stop cycles across ephemeral ports (`63334`, `63339`).
   - Verified that `killProcessTree` using `taskkill.exe /pid <PID> /T /F` on Windows cleanly terminates the Next.js process tree.
   - Process table inspection via `Get-CimInstance Win32_Process` confirmed 0 orphaned server processes after test completion.

---

### 1.4 Assertion Library & AST Scan
1. **Assertion Matcher Stress Testing**:
   - Executed an adversarial validation harness challenging all 14 assertion matchers in `tests/helpers/runner.mjs`:
     - `toBe`, `toEqual`, `toContain`, `toMatch`, `toBeDefined`, `toBeUndefined`, `toBeNull`, `toBeTruthy`, `toBeFalsy`, `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `toBeLessThan`, `toBeLessThanOrEqual`, `toHaveLength`, `toHaveProperty`, `toThrow`, and all corresponding `.not.*` matchers.
   - Result: 0 unexpected failures; matchers correctly distinguish strict equality, deep structural equality, RegExp patterns, error throwing, and inverse assertions.
2. **Vacuous Assertion AST Audit**:
   - Scanned all 25 test files in `tests/` (145 test blocks, 518 `expect()` assertions).
   - Result: **0 vacuous assertions** (`expect(true).toBe(true)` or tautological constants).
   - Result: **0 unawaited promises** across HTTP requests and DOM parsing.

---

## 2. Logic Chain

1. **Premise 1**: Test suites must be deterministic, idempotent, and side-effect-free across consecutive runs and across different tier execution orders.
2. **Observation 1.1**: On Windows NTFS, file paths are case-insensitive.
3. **Observation 1.1**: `src/app/services/[slug]/page.tsx` pre-renders static slugs (`generateStaticParams`) but does not specify `export const dynamicParams = false;`.
4. **Observation 1.1**: `tests/tier2-boundary/not-found.test.mjs:48` issues a request to `GET /services/AI-AGENTS`.
5. **Deduction 1**: Because `dynamicParams` defaults to `true`, Next.js invokes `ServicePage({ params: { slug: 'AI-AGENTS' } })` dynamically. Because `'AI-AGENTS'` does not match the lowercase slug `'ai-agents'`, it triggers `notFound()`, which Next.js caches to disk at `.next/server/app/services/AI-AGENTS.meta`.
6. **Deduction 2**: On Windows NTFS, writing `AI-AGENTS.meta` directly overwrites the pre-rendered `ai-agents.meta` with `status: 404`.
7. **Deduction 3**: Subsequent runs of any test hitting `/services/ai-agents` fail with HTTP 404 until `.next` is manually wiped and rebuilt. This causes order-dependent test failures and flakiness across Tiers 1, 3, and 4.
8. **Conclusion 1**: This vulnerability must be remediated before the test suite can be certified as reliable.

---

## 3. Caveats

- **Scope Boundary**: In strict adherence to the role constraint ("Review-only — do NOT modify implementation code"), no changes were made to `src/app/services/[slug]/page.tsx` or `tests/tier2-boundary/not-found.test.mjs`.
- **Milestone M2 Failures**: The 9 failing tests under Tier 1 and 1 failing test under Tier 4 are confirmed to be genuine requirement checks for Milestone M2 (verbatim footer and static image assets).

---

## 4. Conclusion & Required Changes

The test harness architecture, CLI options, ANSI reporting, assertion matchers, process teardown, and timeout mechanics are well-engineered, robust, and performant.

However, an empirical vulnerability was discovered that causes disk cache poisoning and flaky cascading failures on Windows.

### Required Changes:
1. **Fix Dynamic SSG Parameter Boundary in `src/app/services/[slug]/page.tsx`**:
   Add `export const dynamicParams = false;` to `src/app/services/[slug]/page.tsx`.
   - *Rationale*: Enforces that only params defined in `generateStaticParams()` are valid. Any other param (including uppercase casing) is rejected by Next.js without invoking dynamic rendering or writing a dynamic 404 cache entry to disk.
2. **Harden Case Sensitivity Test in `tests/tier2-boundary/not-found.test.mjs`**:
   Update line 48 to avoid colliding with an existing pre-rendered lowercase slug on case-insensitive filesystems (e.g. test `/services/NON-EXISTENT-SERVICE` or perform the casing test against a dedicated non-colliding route).

---

Verdict: REQUEST_CHANGES

---

## 5. Verification Method

To independently reproduce the cache poisoning vulnerability and verify the fix:

1. **Clean and Build**:
   ```powershell
   Remove-Item -Recurse -Force .next
   npm.cmd run build
   ```
2. **Verify Tier 1 Baseline (ai-agents passes)**:
   ```powershell
   node scripts/run-e2e.mjs --filter="services"
   ```
   *Result*: 8 passed, 0 dynamic service failures.
3. **Execute Tier 2 (triggers cache poisoning on Windows)**:
   ```powershell
   node scripts/run-e2e.mjs --tier=2
   ```
4. **Inspect the Poisoned Metadata File**:
   ```powershell
   Get-Content .next\server\app\services\ai-agents.meta
   ```
   *Result*: Displays `"status": 404` and tag `_N_T_/services/AI-AGENTS`.
5. **Re-run Services Test (reproduces bug)**:
   ```powershell
   node scripts/run-e2e.mjs --filter="services"
   ```
   *Result*: `GET /services/ai-agents` fails with `Expected 404 to be 200`.
