# Dispatch: Explorer 3 (Milestone 1 - shadcn/ui & ESLint Flat Config)

## Working Directory
`d:\Space\Faarns\next.js\faarns-web`

## State Folder
`d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_3`

## Mandatory Reading
1. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md` (Read FIRST)
2. `d:\Space\Faarns\next.js\faarns-web\PROJECT.md`
3. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1\SCOPE.md`

## Mission & Scope
Investigate the shadcn/ui setup (`components.json`), `src/lib/utils.ts`, and ESLint flat configuration:
1. Examine `components.json` requirements for Tailwind CSS v4 in Next.js 15:
   - Reference `d:\Space\Faarns\next.js\mm-enterprise\components.json` and `faarns-2.0`.
   - Path aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`.
   - CSS entrypoint: `"src/app/globals.css"`.
2. Determine dependencies needed: `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`.
3. Design `src/lib/utils.ts` exporting `cn(...inputs: ClassValue[])`.
4. Investigate ESLint configuration:
   - Current status: `next lint` prompts interactively because no eslint config exists.
   - Design modern flat `eslint.config.mjs` using `eslint-config-next` and `eslint` so that `npm run lint` completes non-interactively with 0 errors.
   - Check if devDependencies need `eslint`, `eslint-config-next`, etc., or if any script adjustments in `package.json` are needed.
5. Provide a step-by-step verified action plan for the Worker.

Write your final analysis and recommendations to `handoff.md` in your state folder.


## 2026-11-10T05:26:45Z
You are Explorer 3 for Milestone 1 (M1: Architecture & Tooling Modernization) of the faarns-web project.

Your working directory is: d:\Space\Faarns\next.js\faarns-web
Your state folder is: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_3

MANDATORY FIRST STEP:
Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md before starting work.
Also read:
- d:\Space\Faarns\next.js\faarns-web\PROJECT.md
- d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1\SCOPE.md
- d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_3\DISPATCH.md

YOUR MISSION:
Investigate the shadcn/ui setup (`components.json`), `src/lib/utils.ts`, and ESLint flat configuration:
1. Examine `components.json` requirements for Tailwind CSS v4 in Next.js 15:
   - Reference `d:\Space\Faarns\next.js\mm-enterprise\components.json` and `faarns-2.0`.
   - Path aliases: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`.
   - CSS entrypoint: `"src/app/globals.css"`.
2. Determine dependencies needed: `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`.
3. Design `src/lib/utils.ts` exporting `cn(...inputs: ClassValue[])`.
4. Investigate ESLint configuration:
   - Current status: `next lint` prompts interactively because no eslint config exists.
   - Design modern flat `eslint.config.mjs` using `eslint-config-next` and `eslint` so that `npm run lint` completes non-interactively with 0 errors.
   - Check if devDependencies need `eslint`, `eslint-config-next`, etc., or if any script adjustments in `package.json` are needed.
5. Provide a step-by-step verified action plan for the Worker.

Write your final analysis and recommendations to `handoff.md` in your state folder.
When complete, notify the orchestrator via send_message with a brief summary and your handoff path.
