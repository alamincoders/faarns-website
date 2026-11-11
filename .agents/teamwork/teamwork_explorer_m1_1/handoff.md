# Handoff Report: Directory Migration to `src/` & TypeScript Path Alias Configuration

- **Milestone**: Milestone 1 (M1: Architecture & Tooling Modernization)
- **Author**: Explorer 1 (`teamwork_explorer_m1_1`)
- **Recipient**: Milestone 1 Orchestrator & Worker
- **Date**: 2026-11-10T05:33:30Z

---

## 1. Observation

### 1.1 Source File Inventory
Direct filesystem traversal of `app/`, `components/`, `content/`, and `lib/` identified exactly 24 files:

| Source Directory | File Relative Path | Size (Bytes) | Target Path under `src/` |
|---|---|---|---|
| `app/` | `app/globals.css` | 28,718 | `src/app/globals.css` |
| `app/` | `app/layout.tsx` | 2,079 | `src/app/layout.tsx` |
| `app/` | `app/not-found.tsx` | 468 | `src/app/not-found.tsx` |
| `app/` | `app/page.tsx` | 7,286 | `src/app/page.tsx` |
| `app/` | `app/about/page.tsx` | 1,167 | `src/app/about/page.tsx` |
| `app/` | `app/api/contact/route.ts` | 1,549 | `src/app/api/contact/route.ts` |
| `app/` | `app/careers/page.tsx` | 1,466 | `src/app/careers/page.tsx` |
| `app/` | `app/contact/page.tsx` | 1,255 | `src/app/contact/page.tsx` |
| `app/` | `app/fonts/Archivo-Variable.woff2` | 90,104 | `src/app/fonts/Archivo-Variable.woff2` |
| `app/` | `app/pricing/page.tsx` | 1,718 | `src/app/pricing/page.tsx` |
| `app/` | `app/services/page.tsx` | 823 | `src/app/services/page.tsx` |
| `app/` | `app/services/[slug]/page.tsx` | 3,855 | `src/app/services/[slug]/page.tsx` |
| `components/` | `components/Blocks.tsx` | 4,735 | `src/components/Blocks.tsx` |
| `components/` | `components/BookButton.tsx` | 841 | `src/components/BookButton.tsx` |
| `components/` | `components/ContactForm.tsx` | 2,934 | `src/components/ContactForm.tsx` |
| `components/` | `components/Faq.tsx` | 613 | `src/components/Faq.tsx` |
| `components/` | `components/Flow.tsx` | 1,047 | `src/components/Flow.tsx` |
| `components/` | `components/Footer.tsx` | 1,169 | `src/components/Footer.tsx` |
| `components/` | `components/Icons.tsx` | 1,426 | `src/components/Icons.tsx` |
| `components/` | `components/MotionProvider.tsx` | 3,319 | `src/components/MotionProvider.tsx` |
| `components/` | `components/Nav.tsx` | 1,974 | `src/components/Nav.tsx` |
| `components/` | `components/PriceTable.tsx` | 1,643 | `src/components/PriceTable.tsx` |
| `content/` | `content/site.ts` | 27,821 | `src/content/site.ts` |
| `lib/` | `lib/motion.ts` | 16,742 | `src/lib/motion.ts` |

Non-migrated root directories and files:
- `public/`: Contains empty subdirectory `public/work/`. (Stays in project root per Next.js conventions).
- `preview/`: Contains `build.mjs` (3,350 bytes) and `runtime.ts` (5,202 bytes). (Stays in project root).
- Root configs: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`, `.gitignore`, `.env.example`, `PROJECT.md`, `README.md`.

### 1.2 Import Scan Results
Across 27 scanned files, 84 import statements were detected:
- 38 imports use the `@/*` alias:
  - 14 imports from `@/content/site` (in `app/about/page.tsx:2`, `app/careers/page.tsx:3`, `app/contact/page.tsx:2`, `app/page.tsx:2`, `app/pricing/page.tsx:2`, `app/services/page.tsx:3`, `app/services/[slug]/page.tsx:4`, `components/Blocks.tsx:2`, `components/BookButton.tsx:2`, `components/ContactForm.tsx:3`, `components/Flow.tsx:3`, `components/Footer.tsx:2`, `components/MotionProvider.tsx:6`, `components/Nav.tsx:5`, `components/PriceTable.tsx:4`).
  - 5 imports from `@/components/Blocks` (in `app/about/page.tsx:3`, `app/careers/page.tsx:4`, `app/page.tsx:4`, `app/pricing/page.tsx:3`, `app/services/page.tsx:2`, `app/services/[slug]/page.tsx:6`).
  - 3 imports from `@/components/BookButton` (in `app/contact/page.tsx:3`, `app/page.tsx:3`, `app/services/[slug]/page.tsx:5`).
  - 1 import from `@/components/ContactForm` (in `app/contact/page.tsx:4`).
  - 3 imports from `@/components/Faq` (in `app/page.tsx:5`, `app/pricing/page.tsx:4`, `app/services/[slug]/page.tsx:7`).
  - 1 import from `@/components/Flow` (in `app/page.tsx:6`).
  - 1 import from `@/components/Footer` (in `app/layout.tsx:6`).
  - 3 imports from `@/components/Icons` (in `app/careers/page.tsx:5`, `app/page.tsx:7`, `app/services/[slug]/page.tsx:8`).
  - 1 import from `@/components/MotionProvider` (in `app/layout.tsx:7`).
  - 1 import from `@/components/Nav` (in `app/layout.tsx:5`).
  - 2 imports from `@/components/PriceTable` (in `app/pricing/page.tsx:5`).
  - 2 imports from `@/lib/motion` (in `components/Flow.tsx:4`, `components/MotionProvider.tsx:5`).
- 9 internal relative imports:
  - `app/layout.tsx:4`: `import "./globals.css";`
  - `app/layout.tsx:10`: `localFont({ src: "./fonts/Archivo-Variable.woff2", ... })`
  - `components/Blocks.tsx:3`: `import { BookButton } from "./BookButton";`
  - `components/Blocks.tsx:4`: `import { ArrowNE, Check, Mark } from "./Icons";`
  - `components/BookButton.tsx:3`: `import { Arrow } from "./Icons";`
  - `components/Flow.tsx:5`: `import { Check } from "./Icons";`
  - `components/Footer.tsx:3`: `import { Mark } from "./Icons";`
  - `components/MotionProvider.tsx:7`: `import { Mark } from "./Icons";`
  - `components/Nav.tsx:6`: `import { BookButton } from "./BookButton";`
  - `components/Nav.tsx:7`: `import { Mark } from "./Icons";`
- 1 cross-boundary relative import:
  - `preview/runtime.ts:3`: `import { initCursor, initFlow, initMotion, initSmoothScroll, runCurtain, runPreloader, ScrollTrigger } from "../lib/motion";`

### 1.3 `tsconfig.json` Configuration
Direct reading of `tsconfig.json` (lines 17-21):
```json
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
```

### 1.4 `preview/` Script References & Windows Execution
1. `preview/build.mjs`:
   - Line 7: `const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");`
     On Windows, `new URL(import.meta.url).pathname` outputs `/D:/Space/...`, causing `path.resolve` to return `D:\D:\Space\Faarns\next.js\faarns-web`.
     Running `npm.cmd run preview` failed with:
     ```
     Error: ENOENT: no such file or directory, scandir 'D:\D:\Space\Faarns\next.js\faarns-web\.next\server\app\services'
     ```
   - Line 8: `const app = path.join(root, ".next/server/app");` (Server build directory remains `.next/server/app`).
   - Line 45: `const content = read(path.join(root, "content/site.ts"));` (Hardcoded path to `content/site.ts`).
2. `preview/runtime.ts`:
   - Line 3: `import { ... } from "../lib/motion";` (Directly references `lib/` which moves to `src/lib/`).

### 1.5 Environment and Platform Findings
1. Git is not initialized: `git status` outputs `fatal: not a git repository (or any of the parent directories): .git`.
2. Windows PowerShell script execution policy blocks `.ps1` files: `npx tsc` outputs `npx : File C:\Program Files\nodejs\npx.ps1 cannot be loaded because running scripts is disabled on this system.`
   Running with `npx.cmd` and `npm.cmd` succeeds cleanly (`npx.cmd tsc --noEmit` exited with code 0).

---

## 2. Logic Chain

1. **All Source Moves are Clean Directories**:
   - Observations 1.1 show that all source code lives inside 4 directories: `app/`, `components/`, `content/`, and `lib/`.
   - Moving these entire directories into `src/` (`src/app/`, `src/components/`, `src/content/`, `src/lib/`) places all 24 source files under `src/` as required by Requirement R1.
   - Next.js 15 App Router natively detects `src/app/` if the root `app/` directory is absent.

2. **Zero In-Source `@/*` Import Breakages**:
   - Observation 1.2 cataloged all 38 `@/*` imports.
   - Every single one starts with `@/content/`, `@/components/`, or `@/lib/`.
   - Currently, `tsconfig.json` has `"paths": { "@/*": ["./*"] }`.
   - By updating `tsconfig.json` to `"paths": { "@/*": ["./src/*"] }`, `@/content/site` resolves to `./src/content/site`, `@/components/*` resolves to `./src/components/*`, and `@/lib/*` resolves to `./src/lib/*`.
   - Therefore, zero lines of source code in `src/` need their `@/*` import statements rewritten.

3. **Zero Sibling Relative Import Breakages**:
   - Observation 1.2 identified 9 relative imports in `app/` and `components/`.
   - All relative imports in `app/` (`./globals.css`, `./fonts/Archivo-Variable.woff2`) are relative to `app/layout.tsx`. Because `layout.tsx`, `globals.css`, and `fonts/` all move together into `src/app/`, their relative relationship is identical.
   - All relative imports in `components/` (`./BookButton`, `./Icons`) are relative to other files within `components/`. Because all component files move together into `src/components/`, their relative relationship is identical.
   - Therefore, zero relative imports inside `src/` break.

4. **External Tooling (`preview/`) Breakages & Resolution**:
   - Observation 1.4 identified two failure points in `preview/`:
     a. `preview/runtime.ts` line 3 imports `../lib/motion`. From `<root>/preview/`, `../lib/motion` looked at `<root>/lib/motion`. When moved to `src/lib/`, this must be updated to `../src/lib/motion`.
     b. `preview/build.mjs` line 45 reads `path.join(root, "content/site.ts")`. When moved to `src/content/`, this must be updated to `path.join(root, "src/content/site.ts")`.
     c. `preview/build.mjs` line 7 uses `new URL(...).pathname` which creates double-drive `D:\D:\...` on Windows. Using standard `fileURLToPath(import.meta.url)` from `node:url` resolves this cross-platform.
   - With these fixes, the `preview` build target functions seamlessly after migration.

5. **Tooling Command Execution on Windows**:
   - Observation 1.5 proved PowerShell blocks `.ps1` execution, while `.cmd` works.
   - Therefore, the Worker must execute `npx.cmd` and `npm.cmd` rather than `npx` or `npm`.
   - Because `.git` is absent, file movement must use Node.js `fs.renameSync` or PowerShell `Move-Item`.

---

## 3. Caveats

1. **Root `app/` must be completely removed**: Next.js will throw an error or behave unpredictably if both `app/` and `src/app/` exist simultaneously. Moving must be an atomic move or `app/` must be verified deleted at the root.
2. **Build Cache Cleanup**: Existing `.next/` build artifacts should be cleaned (`Remove-Item -Recurse -Force .next`) prior to rebuilding to ensure Next.js does not retain cached module paths pointing to root `app/`.
3. **Subsequent Milestones Component Restructuring**: Milestone 2 and Milestone 3 will introduce subfolders in `src/components/` (`layout/`, `icons/`, `ui/`). In Milestone 1, `src/components/` should remain flat (as it currently is) so existing component imports remain intact until M2/M3 refactor them.

---

## 4. Conclusion

The directory migration to `src/` can be executed safely with zero regressions:
1. Move `app/`, `components/`, `content/`, and `lib/` directly into `src/`.
2. Update `tsconfig.json` path mapping from `"@/*": ["./*"]` to `"@/*": ["./src/*"]`.
3. Update `preview/runtime.ts` import path for `motion` (`../src/lib/motion`).
4. Update `preview/build.mjs` for Windows path resolution (`fileURLToPath`) and `src/content/site.ts`.
5. Run clean build and typecheck with `npx.cmd tsc --noEmit` and `npm.cmd run build`.

### Actionable Implementation Plan for Worker (M1.1)

#### Step 1: Pre-Move TypeScript Sanity Check
Confirm baseline TypeScript health:
```powershell
npx.cmd tsc --noEmit
```
(Expected output: 0 errors, exit code 0).

#### Step 2: Perform Directory Relocation
Execute via Node.js script (fail-safe and cross-platform):
```javascript
import fs from "node:fs";

if (!fs.existsSync("src")) {
  fs.mkdirSync("src", { recursive: true });
}

const dirsToMove = ["app", "components", "content", "lib"];
for (const dir of dirsToMove) {
  if (fs.existsSync(dir)) {
    fs.renameSync(dir, `src/${dir}`);
    console.log(`Moved ${dir} -> src/${dir}`);
  }
}
```

Verify that root `app`, `components`, `content`, `lib` no longer exist at project root.

#### Step 3: Update `tsconfig.json`
Update `tsconfig.json` paths mapping:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

#### Step 4: Update `preview/` References
1. In `preview/runtime.ts` line 3:
   ```typescript
   // Before:
   import { initCursor, initFlow, initMotion, initSmoothScroll, runCurtain, runPreloader, ScrollTrigger } from "../lib/motion";
   // After:
   import { initCursor, initFlow, initMotion, initSmoothScroll, runCurtain, runPreloader, ScrollTrigger } from "../src/lib/motion";
   ```

2. In `preview/build.mjs`:
   Replace line 7:
   ```javascript
   // Before:
   import fs from "node:fs";
   import path from "node:path";
   import { build } from "esbuild";

   const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
   ```
   With:
   ```javascript
   import fs from "node:fs";
   import path from "node:path";
   import { fileURLToPath } from "node:url";
   import { build } from "esbuild";

   const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
   ```

   And update line 45:
   ```javascript
   // Before:
   const content = read(path.join(root, "content/site.ts"));
   // After:
   const content = read(path.join(root, "src/content/site.ts"));
   ```

#### Step 5: Clean Cache and Validate
```powershell
if (Test-Path .next) { Remove-Item -Recurse -Force .next }
npx.cmd tsc --noEmit
npm.cmd run build
```

---

## 5. Verification Method

To independently verify the M1.1 migration:

1. **Verify Directory Structure**:
   ```powershell
   Get-ChildItem -Path src -Directory | Select-Object Name
   ```
   Must list: `app`, `components`, `content`, `lib`.
   Verify project root does NOT contain top-level `app`, `components`, `content`, or `lib`:
   ```powershell
   Get-ChildItem -Path app, components, content, lib -ErrorAction SilentlyContinue
   ```
   Must return null/empty.

2. **TypeScript Compilation**:
   ```powershell
   npx.cmd tsc --noEmit
   ```
   Must exit with code 0 and output 0 errors.

3. **Production Next.js Build**:
   ```powershell
   npm.cmd run build
   ```
   Must compile cleanly and generate all 19 static pages (`/`, `/_not-found`, `/about`, `/careers`, `/contact`, `/pricing`, `/services`, and 9 `/services/[slug]` detail pages) with exit code 0.

4. **Preview Build**:
   ```powershell
   node preview/build.mjs
   ```
   Must generate `dist/faarns-preview.html` with exit code 0.

5. **Invalidation Conditions**:
   - Any TypeScript compiler error referencing missing module `@/...`.
   - Next.js build error stating conflicting root `app` and `src/app`.
   - `preview/build.mjs` failing with `ENOENT` on `services` or `site.ts`.
