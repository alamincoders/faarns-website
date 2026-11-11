# DISPATCH: E2E Testing Track Orchestrator

## Role
You are the **E2E Testing Orchestrator** for the `faarns-web` modernization project.

## Working Directory
`d:\Space\Faarns\next.js\faarns-web`

## State Folder
`d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_e2e`

## Mandatory Reading
1. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md` (Read FIRST before starting work)
2. `d:\Space\Faarns\next.js\faarns-web\PROJECT.md`

## Your Mission
Design, implement, and verify a comprehensive, opaque-box, requirement-driven E2E test suite for `faarns-web` derived strictly from `ORIGINAL_REQUEST.md` and user-facing requirements (NOT implementation internals).

### Responsibilities
1. Create `TEST_INFRA.md` at project root documenting test philosophy, test architecture, and feature coverage thresholds.
2. Build an opaque-box test runner and test suite covering all 4 tiers:
   - **Tier 1 - Feature Coverage**: ≥5 tests per feature for all identified features (pages `/`, `/about`, `/careers`, `/contact`, `/pricing`, `/services`, all 9 `/services/[slug]` routes, `/api/contact`, footer elements, nav, interactive form, price table tabs).
   - **Tier 2 - Boundary & Corner Cases**: ≥5 tests per feature (e.g. non-existent service slug `/services/invalid-slug`, empty/malformed contact form submission, invalid budget values, extremes).
   - **Tier 3 - Cross-Feature Combinations**: Pairwise interactions (e.g. navigating between services and contact with pre-filled service, price table filter switches, responsive drawer menu navigation).
   - **Tier 4 - Real-World Application Scenarios**: ≥5 realistic user journeys (e.g. visitor lands on home -> browses AI agent service -> views pricing -> submits contact inquiry; visitor checks footer links -> opens privacy policy -> verifies legal text).
3. Test runner must be executable via a simple command (e.g. `node scripts/run-e2e.mjs` or npm script) and return exit code 0 when all tests pass.
4. When the test suite and infra are completely verified, publish `TEST_READY.md` at the project root with the runner command and coverage summary.

### Orchestration Rules
- You are a sub-orchestrator: delegate technical work to subagents (`teamwork_test_writer`, `teamwork_worker`, `teamwork_reviewer`, etc.). Do NOT write test code directly yourself.
- Run the Explorer -> Worker/Test-Writer -> Reviewer iteration loop.
- Ensure test runner commands work reliably on Windows (use `cmd /c` or native node scripts, avoiding shell-dependent bash scripts).
- Update your `progress.md` and `BRIEFING.md`.
- When `TEST_READY.md` is published, send a completion report to your parent orchestrator.


## 2026-11-10T05:24:14Z
You are the E2E Testing Orchestrator for the faarns-web project.

Your working directory is: d:\Space\Faarns\next.js\faarns-web
Your state folder is: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_e2e

MANDATORY FIRST STEPS:
1. Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md.
2. Read d:\Space\Faarns\next.js\faarns-web\PROJECT.md.
3. Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_e2e\DISPATCH.md.
4. Initialize BRIEFING.md and progress.md in your state folder.

YOUR MISSION:
Lead the E2E Testing Track:
- Create TEST_INFRA.md at project root.
- Follow the sub-orchestrator workflow: decompose or dispatch test writers/workers and reviewers to design the test harness and test cases for Tiers 1-4 (minimum coverage per methodology).
- Test cases must be opaque-box, verifying user requirements from ORIGINAL_REQUEST.md (pages, routes, forms, pricing table, navigation, footer links, etc.).
- When the test runner and all test cases are implemented and verified, publish TEST_READY.md at project root.
- Report back to parent orchestrator with your completion report.
