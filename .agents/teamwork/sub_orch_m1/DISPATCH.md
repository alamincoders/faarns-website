# DISPATCH: Milestone 1 Sub-Orchestrator

## Role
You are the **Sub-Orchestrator for Milestone 1: Architecture & Tooling Modernization**.

## Working Directory
`d:\Space\Faarns\next.js\faarns-web`

## State Folder
`d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1`

## Mandatory Reading
1. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md` (Read FIRST before starting work)
2. `d:\Space\Faarns\next.js\faarns-web\PROJECT.md`
3. Explorer survey reports:
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_survey_1\handoff.md`
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_survey_3\handoff.md`

## Milestone 1 Scope
Restructure the `faarns-web` codebase into a clean modular `src/` directory layout and configure latest tooling:
1. **Directory Migration**:
   - Move application code to `src/`: `src/app/`, `src/components/`, `src/lib/`, `src/content/`.
   - Update `tsconfig.json` paths mapping: `"@/*": ["./src/*"]`.
2. **Framework & Styling Modernization (Tailwind CSS v4 & PostCSS)**:
   - Install `tailwindcss@^4`, `@tailwindcss/postcss@^4`, `postcss.config.mjs`.
   - Configure `src/app/globals.css`:
     - `@import "tailwindcss";`
     - `@import "tw-animate-css";`
     - `@custom-variant dark (&:is(.dark *));`
     - `@theme inline { ... }`
     - `:root { ... }` with standard shadcn variables.
     - Crucial: Preserve all existing 383 lines of custom CSS tokens (`--ink`, `--surface`, `--violet`, etc.) and classes so that no existing styles break.
3. **shadcn/ui Setup**:
   - Create `components.json` configured for Tailwind CSS v4.
   - Create `src/lib/utils.ts` exporting `cn()` with `clsx` and `tailwind-merge`.
   - Install `clsx`, `tailwind-merge`, `class-variance-authority`, `tw-animate-css`, `lucide-react`.
4. **ESLint Modernization**:
   - Add `eslint.config.mjs` flat configuration with `eslint-config-next` so `npm run lint` passes non-interactively with zero errors.
5. **Build Verification**:
   - Ensure `npm run build` succeeds with exit code 0.
   - Ensure `npm run lint` succeeds with exit code 0.

## Iteration Loop Protocol
- You are a sub-orchestrator. Follow the Project Pattern iteration loop:
  1. Spawn 3 Explorers (`teamwork_explorer`) to analyze migration specifics and plan exact steps.
  2. Spawn a Worker (`teamwork_worker`) with the mandatory integrity warning to execute changes and run builds.
  3. Spawn 2 Reviewers (`teamwork_reviewer`) to independently verify correctness and zero regressions.
  4. Spawn 2 Challengers (`teamwork_challenger`) to stress-test imports, build, and linting.
  5. Spawn 1 Forensic Auditor (`teamwork_auditor`) to verify zero cheating / genuine implementation.
  6. Evaluate gate in `GATE_STATUS.md`. If all pass, mark milestone DONE and send completion report to parent.


## 2026-11-10T05:24:22Z
You are the Sub-Orchestrator for Milestone 1 (M1: Architecture & Tooling Modernization) of the faarns-web project.

Your working directory is: d:\Space\Faarns\next.js\faarns-web
Your state folder is: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1

MANDATORY FIRST STEPS:
1. Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md.
2. Read d:\Space\Faarns\next.js\faarns-web\PROJECT.md.
3. Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1\DISPATCH.md.
4. Read explorer reports:
   - d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_survey_1\handoff.md
   - d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_survey_3\handoff.md
5. Initialize BRIEFING.md, progress.md, and SCOPE.md in your state folder.

YOUR MISSION:
Execute Milestone 1:
- Reorganize directory structure into clean `src/` (`src/app`, `src/components`, `src/lib`, `src/content`).
- Update tsconfig.json path alias `@/*` -> `./src/*`.
- Install & configure Tailwind CSS v4 with `@tailwindcss/postcss` and `postcss.config.mjs`.
- Configure `src/app/globals.css` with `@import "tailwindcss";`, `@import "tw-animate-css";`, `@theme inline`, and preserve all existing 383 lines of custom CSS tokens & classes.
- Initialize shadcn/ui with `components.json` and create `src/lib/utils.ts` (`cn()`).
- Add flat `eslint.config.mjs` with `eslint-config-next` so `npm run lint` passes with 0 errors non-interactively.
- Follow the iteration loop: Explorers -> Worker -> Reviewers -> Challengers -> Auditor -> Gate check in GATE_STATUS.md.
- Ensure `npm run build` and `npm run lint` pass cleanly with exit code 0.
- When gate passes, mark milestone done and send completion report to parent orchestrator.
