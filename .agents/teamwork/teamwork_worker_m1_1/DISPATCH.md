# Dispatch: Worker 1 (Milestone 1 - Architecture & Tooling Modernization)

## 2026-11-10T05:36:41Z
You are Worker 1 for Milestone 1 (M1: Architecture & Tooling Modernization) of the faarns-web project.

Your working directory is: d:\Space\Faarns\next.js\faarns-web
Your state folder is: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_worker_m1_1

MANDATORY FIRST STEP:
Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md before starting work.
Also read:
- d:\Space\Faarns\next.js\faarns-web\PROJECT.md
- d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1\SCOPE.md
- d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_worker_m1_1\DISPATCH.md
- Explorer handoff reports:
  - d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_1\handoff.md
  - d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\handoff.md
  - d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

YOUR WRITE OWNERSHIP:
You exclusively own:
- package.json, tsconfig.json, postcss.config.mjs, eslint.config.mjs, components.json
- Directory migration into src/ (src/app/, src/components/, src/lib/, src/content/)
- src/app/globals.css
- src/lib/utils.ts
- preview/build.mjs and preview/runtime.ts (path adjustments)

YOUR MISSION:
Execute Milestone 1 completely according to the step-by-step plan in DISPATCH.md:
1. Reorganize directory structure into src/ (`src/app`, `src/components`, `src/lib`, `src/content`). Update tsconfig.json `@/*` -> `./src/*`. Adjust preview tooling paths.
2. Install dependencies (clsx, tailwind-merge@^3.7.0, class-variance-authority, tw-animate-css, lucide-react, tailwindcss@^4.1.11, @tailwindcss/postcss@^4.1.11, postcss, eslint@^9, eslint-config-next@15.5.26, @eslint/eslintrc@^3). (Note: on Windows use cmd /c or npm.cmd due to PowerShell execution policy).
3. Create postcss.config.mjs with @tailwindcss/postcss.
4. Set up src/app/globals.css with Tailwind v4, tw-animate-css, @theme inline, shadcn variables, and preserve all 383 lines of custom CSS tokens & classes (see proposed_globals.css from explorer 2).
5. Set up components.json and src/lib/utils.ts (`cn()`).
6. Set up eslint.config.mjs with FlatCompat and global ignores.
7. Run build and lint verification:
   - `cmd /c "npx tsc --noEmit"`
   - `cmd /c "npm run lint"`
   - `cmd /c "npm run build"`
   - `cmd /c "node preview/build.mjs"`
8. Document all verification commands and outputs in `handoff.md` in your state folder.
9. Notify orchestrator via send_message when complete.

## Mandatory Reading (Read FIRST before starting work)
1. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md`
2. `d:\Space\Faarns\next.js\faarns-web\PROJECT.md`
3. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m1\SCOPE.md`
4. Explorer Handoff Reports:
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_1\handoff.md`
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\handoff.md`
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_3\handoff.md`
   - Proposed files authored by Explorer 2:
     - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\proposed_globals.css`
     - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\proposed_postcss.config.mjs`
     - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\proposed_components.json`
     - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\proposed_utils.ts`

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Write Ownership
You exclusively own:
- `package.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`
- Directory migration into `src/` (`src/app/`, `src/components/`, `src/lib/`, `src/content/`)
- `src/app/globals.css`
- `src/lib/utils.ts`
- `preview/build.mjs` and `preview/runtime.ts` (path adjustments)

## Step-by-Step Execution Plan

### Step 1: Directory Restructuring
1. Move `app`, `components`, `content`, `lib` to `src/app`, `src/components`, `src/content`, `src/lib`.
2. Ensure root `app`, `components`, `content`, `lib` are deleted from the root so Next.js uses `src/app`.
3. Update `tsconfig.json` to map `"@/*": ["./src/*"]`.
4. Update `preview/runtime.ts` line 3: import from `"../src/lib/motion"`.
5. Update `preview/build.mjs`: use `fileURLToPath(import.meta.url)` to fix Windows path resolution, and point `site.ts` path to `"src/content/site.ts"`.

### Step 2: Install Required Dependencies
Use `cmd /c` or `npm.cmd` due to Windows PowerShell script execution policy:
```cmd
cmd /c "npm install clsx tailwind-merge@^3.7.0 class-variance-authority@^0.7.1 tw-animate-css@^1.4.0 lucide-react"
cmd /c "npm install -D tailwindcss@^4.1.11 @tailwindcss/postcss@^4.1.11 postcss@^8.4.49 eslint@^9 eslint-config-next@15.5.26 @eslint/eslintrc@^3"
```

### Step 3: Configure Tailwind CSS v4 & PostCSS
1. Create `postcss.config.mjs`:
```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};
export default config;
```
2. Integrate `src/app/globals.css`:
Copy `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\proposed_globals.css` into `src/app/globals.css`.
Verify that `@import "tailwindcss";`, `@import "tw-animate-css";`, `@custom-variant dark`, `@theme inline`, `:root` shadcn variables, and ALL 383 lines of custom CSS tokens & classes are intact.

### Step 4: Configure shadcn/ui & Utility Helper
1. Create `components.json` with `"config": ""`, `"css": "src/app/globals.css"`, `"style": "base-nova"`, `"tsx": true`, and `@/*` aliases.
2. Create `src/lib/utils.ts` exporting `cn(...inputs: ClassValue[]): string` with `clsx` and `twMerge`.

### Step 5: Configure ESLint Flat Configuration
Create `eslint.config.mjs` with `FlatCompat` extending `next/core-web-vitals` and `next/typescript`, and global ignores for `.next/**`, `.agents/**`, `preview/**`, `out/**`, `build/**`, `dist/**`, `node_modules/**`, `*.cjs`.

### Step 6: Verification & Validation
Execute verification commands:
```cmd
cmd /c "npx tsc --noEmit"
cmd /c "npm run lint"
cmd /c "npm run build"
cmd /c "node preview/build.mjs"
```
Ensure all commands exit with code 0 and report 0 errors.

Write a complete handoff report to `handoff.md` in your state folder (`.agents/teamwork/teamwork_worker_m1_1/handoff.md`).
Notify orchestrator via `send_message` with your results.
