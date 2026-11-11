## 2026-11-10T05:34:32Z
You are a Worker for Milestone M_E1 (Test Infra & Harness Architecture) in the faarns-web E2E Testing Track.
Working directory: d:\Space\Faarns\next.js\faarns-web
Your state folder: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_worker_m_e1

MANDATORY FIRST STEP:
Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md
Also read:
d:\Space\Faarns\next.js\faarns-web\PROJECT.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_e2e\SCOPE.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_explorer_1\handoff.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_explorer_2\handoff.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_explorer_3\handoff.md

WRITE OWNERSHIP:
You own exclusively:
- `scripts/run-e2e.mjs`
- `tests/helpers/runner.mjs`
- `tests/helpers/server.mjs`
- `tests/helpers/http.mjs`
- `tests/helpers/dom.mjs`
- `tests/helpers/reporter.mjs`
- `tests/smoke.test.mjs`
- `TEST_INFRA.md` (at project root)
DO NOT modify any other files (do not touch app/ or components/).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

YOUR OBJECTIVE:
Implement the zero-dependency Node.js E2E test harness and runner according to the specifications in `e2e_explorer_1/handoff.md`:
1. `tests/helpers/runner.mjs`: Test registry, `describe`, `it`/`test`, `beforeAll`, `afterAll`, `beforeEach`, `afterEach`, `expect` assertion matchers (`toBe`, `toEqual`, `toContain`, `toMatch`, `toBeDefined`, `toBeNull`, `toBeGreaterThan`, `toBeTruthy`, `toBeFalsy`, `toThrow`), tier tagging, test isolation.
2. `tests/helpers/server.mjs`: Dynamic ephemeral port selection via `net.createServer().listen(0)`, auto-build detection (`.next/BUILD_ID`), spawning `node ./node_modules/next/dist/bin/next start . -p <port> -H 127.0.0.1`, HTTP health check polling with exponential backoff until 200 OK, process tree teardown on Windows using `taskkill /pid <pid> /T /F`. Support reusing existing server if `--url` is passed.
3. `tests/helpers/http.mjs`: High-performance HTTP client using Node 22 native `fetch`, with `get`, `post`, `head`, request timing (`durationMs`), header injection, JSON parsing, and response status helper methods.
4. `tests/helpers/dom.mjs`: Pure JS DOM & HTML analysis helpers (`parseHtml(html)`): extract title, meta tags, links (`findLink`, `links`), images, form inputs, SVGs, `dataAttributes`, `hasText`, and selector regex matching.
5. `tests/helpers/reporter.mjs`: ANSI colored terminal reporter displaying test outcomes, execution time, tier-by-tier breakdown table, failed test stack traces, and exit code management (0 on pass, 1 on fail).
6. `scripts/run-e2e.mjs`: Main CLI runner that parses args (`--tier`, `--filter`, `--url`, `--bail`, `--help`), discovers test files in `tests/`, starts the server via `server.mjs`, runs tests sequentially/isolated, formats output via `reporter.mjs`, and cleans up all processes.
7. `tests/smoke.test.mjs`: A basic smoke test suite verifying server connectivity, root `/` 200 OK, and custom 404 handling.
8. `TEST_INFRA.md` at project root: Comprehensive documentation of test philosophy, commands, 5-tier architecture, helper APIs, and Windows execution instructions.

VERIFICATION:
Execute `node scripts/run-e2e.mjs --filter="smoke"` to verify the test harness starts up, executes the smoke test, reports results, and tears down cleanly.
Document verification commands and terminal output in your handoff report.

Produce your handoff report at:
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_worker_m_e1\handoff.md
Send a message when your work is complete.
