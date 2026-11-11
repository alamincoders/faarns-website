# Dispatch: Challenger 2 (Milestone 1 - CSS & Tooling Stress Testing)

## Mandatory Reading
1. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md` (Read FIRST before starting work)
2. `d:\Space\Faarns\next.js\faarns-web\PROJECT.md`
3. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1\SCOPE.md`
4. Worker 1 Handoff: `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_worker_m1_1\handoff.md`

## Mission & Scope
Adversarially stress-test Milestone 1 styling and tooling:
1. **CSS Integrity & Specificity Stress Test**:
   Verify that custom tokens (`--ink`, `--surface`, `--violet`, etc.) and classes (`.btn-primary`, `.flow`, `.ladder`, `.hs`, `.closer`) in `src/app/globals.css` are not overridden by Tailwind CSS preflight or `@theme inline`. Check that all 383 original CSS lines remain intact.
2. **ESLint Stress Test**:
   Run `cmd /c "npm run lint"` and `cmd /c "npx eslint src/"` to verify that linting runs strictly non-interactively with 0 errors or warnings.
3. **Preview Tooling Stress Test**:
   Run `cmd /c "node preview/build.mjs"` and verify `dist/faarns-preview.html` builds without errors, verifying that `src/content/site.ts` and `src/lib/motion.ts` are correctly read.
4. **Smoke / E2E Suite Run**:
   Run `cmd /c "node scripts/run-e2e.mjs"` (or smoke tests) and confirm tests pass.
5. **Verdict**: Must explicitly provide a verdict of `APPROVE` or `REQUEST_CHANGES` in `handoff.md` in your state folder (`.agents/teamwork/teamwork_challenger_m1_2/handoff.md`).
Notify orchestrator via `send_message`.


## 2026-11-10T05:47:38Z
You are Challenger 2 for Milestone 1 (M1: Architecture & Tooling Modernization) of the faarns-web project.

Your working directory is: d:\Space\Faarns\next.js\faarns-web
Your state folder is: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_challenger_m1_2

MANDATORY FIRST STEP:
Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md before starting work.
Also read:
- d:\Space\Faarns\next.js\faarns-web\PROJECT.md
- d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1\SCOPE.md
- d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_worker_m1_1\handoff.md
- d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_challenger_m1_2\DISPATCH.md

YOUR MISSION:
Adversarially stress-test Milestone 1 styling and tooling:
1. CSS Integrity & Specificity Stress Test: Verify that custom tokens (`--ink`, `--surface`, `--violet`, etc.) and classes (`.btn-primary`, `.flow`, `.ladder`, `.hs`, `.closer`) in `src/app/globals.css` are not overridden by Tailwind CSS preflight or `@theme inline`. Check that all 383 original CSS lines remain intact.
2. ESLint Stress Test: Run `cmd /c "npm run lint"` and `cmd /c "npx eslint src/"` to verify that linting runs strictly non-interactively with 0 errors or warnings.
3. Preview Tooling Stress Test: Run `cmd /c "node preview/build.mjs"` and verify `dist/faarns-preview.html` builds without errors, verifying that `src/content/site.ts` and `src/lib/motion.ts` are correctly read.
4. Smoke / E2E Suite Run: Run `cmd /c "node scripts/run-e2e.mjs"` (or smoke tests) and confirm tests pass.
5. Record your empirical test results and state your verdict (APPROVE or REQUEST_CHANGES) in `handoff.md` in your state folder.
6. Notify orchestrator via send_message with your verdict.
