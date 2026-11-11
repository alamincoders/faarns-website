# Milestone M_E3 Challenge Report: Empirical Verification of Server Lifecycle, Concurrency, Windows Process Management, and M2 Failure Boundaries

## 1. Observation

### 1.1 Empirical Concurrency & Reusability Verification (`--url=http://127.0.0.1:<port>`)
1. **Command Executed**: Tested shared server connection with 3 parallel test runner processes targeting `--url=http://127.0.0.1:52345 --filter="smoke"`.
2. **Console Output**:
   ```
   === TEST 1: Spawn Dedicated Test Server ===
   [server] Spawning Next.js server on port 52345...
   [server] Next.js server ready at http://127.0.0.1:52345 (PID: 20892)
   Server started: http://127.0.0.1:52345 (PID: 20892)

   === TEST 2: Concurrent Test Runners against shared --url ===
   Runner 1: code 0, time 470ms, passed: true
   Runner 2: code 0, time 456ms, passed: true
   Runner 3: code 0, time 444ms, passed: true
   Parallel execution total wall time: 470ms

   === TEST 3: Server Reusability Invariant ===
   Is server still running after 3 runners finished? true (200)

   === TEST 4: Process Teardown & Zero Orphan Verification ===
   Is server PID 20892 alive after server.stop()? false
   ```
3. **Invalid URL Behavior**: Executing `node scripts/run-e2e.mjs --url=http://127.0.0.1:59999 --filter="smoke"` cleanly timed out after 5000ms with error:
   `Runner Execution Error: Error: Configured --url "http://127.0.0.1:59999" is not reachable: Timed out after 5000ms waiting for server at http://127.0.0.1:59999/` and exited with code 1.

---

### 1.2 Windows Process Management & Teardown Verification (`taskkill.exe /pid <pid> /T /F`)
1. **Direct Teardown Probe**:
   - Spawned Next.js server on port 63421 (PID 2676).
   - Verified port 63421 open (`true`), PID 2676 alive (`true`).
   - Invoked `server.stop()`, executing `killProcessTree(2676)` via `taskkill.exe /pid 2676 /T /F`.
   - Verified port 63421 open (`false`), PID 2676 alive (`false`).
   - Querying `tasklist /FI "PID eq 2676"` returned:
     `INFO: No tasks are running which match the specified criteria.`
2. **Process Tree Teardown**:
   - Process tree probe spawned Next.js on port 53421 (PID 16948).
   - Executed `taskkill /pid 16948 /T /F`:
     `SUCCESS: The process with PID 16948 (child process of PID 18384) has been terminated.`
   - Queried `Get-CimInstance Win32_Process | Where-Object { $_.ParentProcessId -eq 16948 }`: returned 0 lingering child processes.

---

### 1.3 Identification of Genuine M2 Failure Boundaries
Executing `node scripts/run-e2e.mjs` against a clean build produces 138 total tests: 128 passed, 10 failed in 1.44s.
All 10 failures were directly audited and confirmed to be genuine unmigrated features from Milestone M2 ("Verbatim Footer Replication (R4)"):
1. `tests/tier1-functional/footer.test.mjs:15`: `renders MarketingLayout CTA banner with verbatim heading and button` — Fails because `MarketingLayout` component is not yet integrated into `src/app/layout.tsx`.
2. `tests/tier1-functional/footer.test.mjs:40`: `renders brand logo box linking to homepage with /logo-black.png` — Fails because `/logo-black.png` is not mounted.
3. `tests/tier1-functional/footer.test.mjs:49`: `renders contact info with fallback phone (+44 7365 617024) and mailto link` — Fails because UK fallback phone is absent in legacy footer.
4. `tests/tier1-functional/footer.test.mjs:80`: `renders 4 social buttons with target="_blank" and rel="noopener noreferrer"` — Fails because social circle icon buttons are absent in legacy footer.
5. `tests/tier1-functional/footer.test.mjs:106`: `renders giant FAARNS SVG wordmark with 1125x224 viewBox` — Fails because giant FAARNS SVG mark is absent in legacy footer.
6. `tests/tier1-functional/footer.test.mjs:114`: `renders copyright string and legal links (terms-of-services, privacy-policy)` — Fails because verbatim copyright string `"@ 2025 FAARNS,all rights reserved"` is absent.
7. `tests/tier1-functional/static-assets.test.mjs:15`: `GET /footerImage.png responds with HTTP 200 and image/png Content-Type` — Returns 404 because file is not yet copied to `public/`.
8. `tests/tier1-functional/static-assets.test.mjs:22`: `GET /logo-black.png responds with HTTP 200 and image/png Content-Type` — Returns 404 because file is not yet copied to `public/`.
9. `tests/tier1-functional/static-assets.test.mjs:29`: `GET /Light Rays Effect.png responds with HTTP 200 and image/png Content-Type` — Returns 404 because file is not yet copied to `public/`.
10. `tests/tier4-journeys/journey-agency-researcher.test.mjs:48`: `Step 3: Verifies external social profile links in footer with security attributes` — Fails because footer social links with security rel attributes are absent.

All 10 failures represent authentic, non-facade requirement tests.

---

### 1.4 CRITICAL FINDING: NTFS Disk Cache Clobbering in `tests/tier2-boundary/not-found.test.mjs`
1. **Repeated Run Discrepancy**:
   - Run 1 (fresh build): 128 passed, 10 failed.
   - Run 2 (consecutive run without rebuild): **123 passed, 15 failed** (5 additional failures).
   - Run 3: **123 passed, 15 failed**.
2. **Additional Failures in Run 2**:
   - `tests/tier1-functional/services.test.mjs`: `GET /services/ai-agents renders with price from $3,000 and 6 deliverables` — Expected 404 to be 200.
   - `tests/tier1-functional/services.test.mjs`: `verifies consistent structural elements (breadcrumbs, process scroller, closer) across all 9 slugs` — Expected 404 to be 200.
   - `tests/tier3-pairwise/faq-accordion.test.mjs`: `verifies dynamic service page renders service-specific FAQ questions` — Expected false to be true.
   - `tests/tier4-journeys/journey-enterprise-lead.test.mjs`: `Step 4: Evaluates /services/ai-agents deliverables, timeline, and starting price` — Expected 404 to be 200.
   - `tests/tier4-journeys/journey-enterprise-lead.test.mjs`: `Step 5: Follows CTA to /contact` — Expected null NOT to be null.
3. **Exact Root Cause Observed on Disk**:
   - `tests/tier2-boundary/not-found.test.mjs` line 48 executes:
     `const res = await http.get('/services/AI-AGENTS');`
   - In Next.js App Router dynamic route handler (`src/app/services/[slug]/page.tsx:25`), `services.find(x => x.slug === "AI-AGENTS")` is undefined, calling `notFound()`.
   - Next.js renders a 404 response and saves the SSR cache file to `.next/server/app/services/AI-AGENTS.html` and `.next/server/app/services/AI-AGENTS.meta`.
   - Inspection of `.next/server/app/services/ai-agents.meta` revealed:
     ```json
     {"headers":{"x-nextjs-stale-time":"300","x-next-cache-tags":"_N_T_/layout,_N_T_/services/layout,_N_T_/services/[slug]/layout,_N_T_/services/[slug]/page,_N_T_/services/AI-AGENTS"},"status":404}
     ```
   - Because Windows NTFS filesystem is case-insensitive, writing `AI-AGENTS.html` and `AI-AGENTS.meta` directly overwrites and destroys the pre-rendered `ai-agents.html` and `ai-agents.meta` files.
   - Consequently, all subsequent requests to `/services/ai-agents` serve the clobbered 404 response on disk until Next.js is completely recompiled.

---

### 1.5 Execution Speed & Memory Footprint Benchmark
- **Full Test Suite Duration**: 1.44s test execution; 2.91s total process duration (including server boot and dynamic ESM imports).
- **Average Test Duration**: ~10.4ms per test.
- **Peak Test Runner RSS**: 30.86 MB.
- **Server RSS (Next.js)**: ~95-115 MB.
- **Resource Footprint**: Minimal; zero memory leaks or runaway CPU consumption observed.

---

## 2. Logic Chain

1. **Observation 1.1**: Spawning 3 concurrent test runner instances against `--url=http://127.0.0.1:52345` completed in 470ms with all 3 returning exit code 0, and the shared server remained responding at `200 OK` after completion.
   - **Inference**: Concurrency and server reusability via `--url` is fully operational and adheres to contracts.
2. **Observation 1.2**: Windows process management uses `taskkill.exe /pid <pid> /T /F`. Probes confirmed that both the server process and all descendant child processes are terminated, and ephemeral ports are released.
   - **Inference**: Windows process management cleanly eliminates orphaned processes.
3. **Observation 1.3**: The 10 failing tests correspond 1:1 with features defined in `PROJECT.md` under Milestone M2.
   - **Inference**: The 10 failing tests are genuine failure boundary acceptance gates, not harness flaws.
4. **Observation 1.4**: In `tests/tier2-boundary/not-found.test.mjs:48`, the test writer sent `http.get('/services/AI-AGENTS')`. On Windows NTFS, writing `AI-AGENTS.meta` clobbers `ai-agents.meta` with `{"status": 404}`.
   - **Inference**: The test suite is self-polluting across repeated runs. Run 1 has 10 failures, but Run 2 and Run 3 have 15 failures due to state pollution on the filesystem.
   - **Inference**: This directly violates Mission Requirement 3 ("Verify that the 10 failing tests for M2 footer replication are genuine and that all 128 other tests pass consistently across repeated runs").
5. **Deduction**: Milestone M_E3 cannot be approved until `tests/tier2-boundary/not-found.test.mjs` is updated to test non-existent slug casing without clobbering pre-rendered SSG files.

---

## 3. Caveats

- **Scope of Review**: In accordance with the Challenger role constraints ("Review-only — do NOT modify implementation code"), no changes were made to `tests/` or application code. The temporary diagnostic probe files (`tests/probe_*.mjs`) created during investigation were completely removed.
- **Target OS**: The disk cache clobbering bug specifically manifests on case-insensitive filesystems (Windows NTFS and macOS APFS default), but would not reproduce on Linux ext4 (case-sensitive). Because the required target environment is Windows (`node scripts/run-e2e.mjs` on Windows), this is an active defect in the Windows test suite.

---

## 4. Conclusion

The test infrastructure created in Milestone M_E1 and M_E2 demonstrates superior performance (1.44s execution, 30MB RAM) and robust Windows process tree teardown via `taskkill.exe`. The 10 failing tests for M2 footer replication are genuine and accurate.

However, **the test suite fails the repeatability requirement across consecutive runs** due to NTFS file clobbering in `tests/tier2-boundary/not-found.test.mjs`:
- Requesting `/services/AI-AGENTS` overwrites `.next/server/app/services/ai-agents.html` with a 404 page.
- Subsequent runs fail 15 tests instead of 10.

### Required Action:
In `tests/tier2-boundary/not-found.test.mjs:48-56`:
Replace:
```javascript
  it('verifies service slug resolution and boundary handling for non-existent casing', async ({ http }) => {
    const res = await http.get('/services/AI-AGENTS');
    // On Windows NTFS, the static file server may resolve the case-insensitively pre-rendered
    // ai-agents.html (status 200), whereas on case-sensitive OSs (Linux) it triggers 404.
    expect([200, 404]).toContain(res.status);

    // Completely invalid slug casing always triggers 404
    const resInvalid = await http.get('/services/INVALID-UNKNOWN-SLUG');
    expect(resInvalid.status).toBe(404);
  }, { tier: 2 });
```
With a test that checks non-existent slug casing that does NOT collide with an existing SSG pre-rendered file:
```javascript
  it('verifies service slug resolution and boundary handling for non-existent casing', async ({ http }) => {
    // Non-existent slug casing returns 404 without clobbering valid SSG routes on case-insensitive filesystems
    const resInvalid = await http.get('/services/NON-EXISTENT-SERVICE');
    expect(resInvalid.status).toBe(404);

    const resUpper = await http.get('/services/INVALID-UNKNOWN-SLUG');
    expect(resUpper.status).toBe(404);
  }, { tier: 2 });
```

---

## 5. Verification Method

To independently reproduce and verify this finding:

1. **Rebuild Next.js to start in a clean state**:
   ```powershell
   node ./node_modules/next/dist/bin/next build
   ```
2. **Execute Run 1**:
   ```powershell
   node scripts/run-e2e.mjs
   ```
   *Observed*: 10 failed, 128 passed.
3. **Inspect the generated cache file on Windows**:
   ```powershell
   node -e "const fs = require('fs'); console.log(fs.readFileSync('.next/server/app/services/ai-agents.meta', 'utf8'));"
   ```
   *Observed*: Contains `{"headers":{...},"status":404}` and cache tag `_N_T_/services/AI-AGENTS`.
4. **Execute Run 2 immediately without rebuilding**:
   ```powershell
   node scripts/run-e2e.mjs
   ```
   *Observed*: **15 failed, 123 passed** (5 extra failures due to poisoned `ai-agents.html`).

---

Verdict: REQUEST_CHANGES
