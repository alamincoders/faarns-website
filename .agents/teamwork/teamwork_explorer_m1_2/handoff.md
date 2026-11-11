# Handoff Report: Tailwind CSS v4 Setup & `src/app/globals.css` Integration

- **Role**: Explorer 2 (Milestone 1)
- **State Folder**: `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2`
- **Working Directory**: `d:\Space\Faarns\next.js\faarns-web`
- **Date**: 2026-11-10

---

## 1. Observation

### 1.1 Existing CSS Architecture (`app/globals.css`)
- **Total lines**: 383 lines.
- **Design tokens** (`app/globals.css:2-12`):
  ```css
  :root{
    --ink:#000000; --surface:#0E0D13; --surface-2:#15131C; --line:rgba(255,255,255,.10); --line-2:rgba(255,255,255,.18);
    --paper:#F4F3EF; --text:#F4F3EF; --muted:#A6A3B0; --dim:#75727F;
    --violet:#A58BFF; --violet-deep:#2B2347; --on-violet:#0A0712;
    --display:var(--font-archivo), 'Helvetica Neue', Arial, sans-serif; --body:var(--font-geist-sans), system-ui, -apple-system, 'Segoe UI', sans-serif;
    --pad:clamp(20px,5vw,64px); --ease:cubic-bezier(.2,.7,.1,1);
    color-scheme: dark;
    box-sizing:border-box; padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px);
  }
  @media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){ --ink:#000000; --surface:#0E0D13; --text:#F4F3EF; --muted:#A6A3B0; color-scheme:dark } }
  :root[data-theme="dark"]{ --ink:#000000; --surface:#0E0D13; --text:#F4F3EF; --muted:#A6A3B0; color-scheme:dark }
  ```
- **Base reset & HTML/Body rules** (`app/globals.css:13-20, 383`):
  - `*,*::before,*::after{box-sizing:border-box}`
  - `html{scroll-padding-top:calc(env(safe-area-inset-top,0px) + 80px);-webkit-text-size-adjust:100%}`
  - `body{margin:0;background:var(--ink);color:var(--text);font-family:var(--body);font-size:17px;line-height:1.55;-webkit-font-smoothing:antialiased;overflow-x:hidden}`
  - `body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:60;background:rgba(0,0,0,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}`
  - `html,body{overflow-x:clip}` (line 383)
- **Key custom utility and component classes**:
  - Container / Screen reader: `.wrap`, `.sr`, `.count`
  - Typography: `.h1`, `.h2`, `.h3`, `.lede`, `.kicker`, `.muted`, `.grey`
  - Button clip-paths & styles:
    - `.btn-primary`: `clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%); background: var(--violet); color: var(--on-violet);` (hover `#B9A4FF`)
    - `.btn-ghost`: `background: transparent; border: 1px solid var(--line-2); border-radius: 3px;`
    - `.btn-dark`: `clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%); background: var(--ink); color: var(--paper);`
  - Navigation & Drawer: `.nav`, `.brand`, `.navlinks`, `.menu-btn`, `.drawer`, `.menu-open .menu-btn span`
  - Hero & Animations: `.sec`, `.hero`, `.glow`, `@keyframes drift`, `.mark-bg`, `.pill`, `@keyframes ping`
  - Automation Flow: `.flow`, `.flow-top`, `.steps`, `.step`, `.bar`, `@keyframes fill`, `@keyframes ping2`
  - Marquee: `.strip`, `.marquee`, `.track`, `.group`, `@keyframes mq`
  - Grid & Cards: `.cells`, `.cells.c2`, `.cells.c3`, `.cells.c4`, `.card`
  - Editorial Rows: `.rows`, `.row`, `a.row:hover::before` hover background fill
  - Band & Process: `.band`, `.proc`
  - Chips & Portfolio: `.chips`, `.chip`, `.chip.fill`, `.work`, `.case`, `.case .initial`
  - Pricing & Comparison: `.ladder`, `.rung`, `.rung.hl`, `.seg`, `.ptable`, `.prow`, `.promises`
  - FAQ: `.faq`, `.qa`, `.qa .pm`, `.qa .ans` (`grid-template-rows: 0fr -> 1fr`)
  - CTA Banner: `.closer`, `.closer .mk`
  - Replicated elements & Footer: `footer`, `.fgrid`, `.bigmark`, `.legal`
  - Dynamic Service SSG: `.svc-price`, `.statement`, `.result`, `.deliv`
  - Contact Form: `.form`, `.fields`, `.f`, `.opt`, `.msg`, `.callsteps`
  - Motion / GSAP selectors:
    - `.motion [data-split]{visibility:hidden}`
    - `.w`, `.w-i`, `.c-i`, `.c`
    - `html.lenis,html.lenis body{height:auto}`, `.lenis.lenis-smooth`, `.lenis.lenis-stopped`, `.is-loading body`
    - Preloader: `.pre`, `.pre-inner`, `.pre-mark`, `.pre-count`, `.pre-bar`, `.curtain`, `.pre-seen .pre`
    - Custom cursor: `.has-cursor`, `.has-cursor a`, `.has-cursor button`, `.cursor-ring`, `.cursor-dot`, `.cursor-hot`, `.cursor-label-on`, `.cursor-label`
    - Stacking cards: `.stack`, `.stack-card`
    - Horizontal scroller: `.hs`, `.hs-track`, `.hs-card`, `.hs-bar`
  - Accessibility: `@media (prefers-reduced-motion: reduce)`

### 1.2 Host Environment & Tooling Execution
- On Windows PowerShell, running `npm` directly invokes `C:\Program Files\nodejs\npm.ps1`, which generates:
  ```
  npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
  + CategoryInfo: SecurityError: (:) [], PSSecurityException
  ```
- Running `npm.cmd` and `npx.cmd` executes cleanly with code 0. Node version is `v22.19.0`, npm is `11.6.2`.
- Baseline check: `npm.cmd run build` currently compiles and passes with exit code 0 (`Compiled successfully in 2.9s`, 19 static pages generated).
- `package.json` currently has Next.js `15.5.26`, React `19.1.10`, GSAP `3.15.0`, Lenis `1.3.27`. It has NO tailwind, postcss, or utility merge packages installed.

### 1.3 Reference Projects Architecture
- `faarns-2.0`:
  - `package.json`: `"tw-animate-css": "^1.4.0"`, `"tailwind-merge": "^3.6.0"`, `"clsx": "^2.1.1"`, `"class-variance-authority": "^0.7.1"`, devDependencies: `"@tailwindcss/postcss": "^4.1.11"`, `"tailwindcss": "^4.1.11"`.
  - `postcss.config.mjs`:
    ```javascript
    const config = {
      plugins: ["@tailwindcss/postcss"],
    };
    export default config;
    ```
  - `components.json`:
    - `"style": "base-nova"`
    - `"tailwind": { "config": "", "css": "src/app/globals.css", "baseColor": "neutral", "cssVariables": true, "prefix": "" }`
    - `"aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" }`
  - `src/lib/utils.js`: `return twMerge(clsx(inputs));`
  - Replicated footer (`src/Components/Layout/Footer.jsx`): heavily uses Tailwind CSS utility classes (e.g., `w-full bg-cover bg-bottom pt-16 sm:pt-20 lg:pt-24`, `max-w-11/12 xl:max-w-6xl mx-auto px-4 sm:px-6`, `flex flex-col lg:flex-row`).
- `mm-enterprise`:
  - `src/styles/globals.css`:
    - `@import "tailwindcss";`
    - `@import "tw-animate-css";`
    - `@custom-variant dark (&:is(.dark *));`
    - `@theme inline { ... }` mapping fonts and color tokens
    - `:root` and `@layer base` defining design variables

---

## 2. Logic Chain

1. **Dependency Requirements**:
   - Because Tailwind CSS v4 replaces the legacy `tailwind.config.js` model with CSS-first configuration via `@import "tailwindcss";`, `@tailwindcss/postcss` is the required PostCSS plugin for Next.js.
   - PostCSS plugin execution in Next.js requires:
     - `tailwindcss@^4`
     - `@tailwindcss/postcss@^4`
     - `postcss@^8`
   - In Tailwind v4, animation utilities previously supplied by `tailwindcss-animate` are provided via `tw-animate-css@^1.4.0` with `@import "tw-animate-css";`.
   - shadcn/ui and `src/lib/utils.ts` require `clsx@^2.1.1`, `tailwind-merge@^3.0.0`, and `class-variance-authority@^0.7.1`.

2. **PostCSS Configuration**:
   - Creating `postcss.config.mjs` with `plugins: ["@tailwindcss/postcss"]` matches the reference implementation in `faarns-2.0` and standard Next.js 15 Tailwind v4 integration.

3. **`components.json` Configuration**:
   - For Tailwind v4, `"config": ""` is strictly required because there is no `tailwind.config.ts`.
   - Path aliases must point to `@/components`, `@/lib/utils`, `@/components/ui`, and `"css": "src/app/globals.css"`.

4. **Integration of `src/app/globals.css`**:
   - Placing `@import "tailwindcss";` and `@import "tw-animate-css";` at the top imports Tailwind v4 preflight, utilities, and animations.
   - Defining `@custom-variant dark (&:is(.dark *));` enables class-based dark mode (`dark:...` variants).
   - The `@theme inline { ... }` block exposes all brand variables (`--color-ink`, `--color-surface`, `--color-violet`, `--font-display`, `--font-body`, etc.) and shadcn tokens as native Tailwind utility classes (e.g., `bg-ink`, `text-violet`, `font-display`).
   - Merging shadcn tokens into `:root` and adding `.dark` preserves all existing brand tokens (`--ink`, `--surface`, `--text`, `--muted: #A6A3B0;`, etc.) without collision.
   - Placing all 383 lines of custom CSS classes verbatim below the Tailwind imports guarantees that custom class selectors `(0, 1, 0)` evaluate after Tailwind preflight `(0, 0, 1)` and maintain exact specificity and cascading priority.
   - All animations, keyframes, GSAP helper selectors (`.motion [data-split]`, `.w`, `.w-i`, `.c`, etc.), cursor styles, and clip-path polygon button styles remain 100% operational.

---

## 3. Caveats

1. **PowerShell Script Execution**:
   - The Windows host has `.ps1` execution disabled by policy. All npm commands must be run as `npm.cmd` or `npx.cmd` to avoid `UnauthorizedAccess` errors.
2. **`footer` Tag Selector Interaction**:
   - `app/globals.css:250` defines `footer { border-top: 1px solid var(--line); padding-top: 64px; margin-top: clamp(...) }`.
   - In Milestone 2, the replicated footer from `faarns-2.0` uses `<footer className="w-full bg-cover ... pt-16 sm:pt-20 ...">`.
   - Because `pt-16` is a class selector `(0, 1, 0)`, it overrides `padding-top: 64px` `(0, 0, 1)`. If the top border `1px solid var(--line)` interferes visually with `footerImage.png`, Milestone 2 worker should ensure `border-t-0` or equivalent utility is present.
3. **`--muted` Semantic Value**:
   - In `faarns-web`, `--muted: #A6A3B0;` is a text color token, NOT a background color token. Do not override `--muted` with a dark background color in `:root`, as doing so would break 20+ text styles across existing pages. For shadcn background styling, use `--secondary` (`#15131C`) or `--surface-2`.
4. **Tailwind v4 No Config File**:
   - Under Tailwind v4, DO NOT create `tailwind.config.js` or `tailwind.config.ts`. All customizations are handled in `globals.css` via `@theme inline`.

---

## 4. Conclusion & Action Plan for the Worker

All 4 deliverables have been designed and validated. Pre-created proposed files have been saved in the state folder for direct worker reference:
- `proposed_globals.css` (487 lines)
- `proposed_postcss.config.mjs`
- `proposed_components.json`
- `proposed_utils.ts`

### Worker Step-by-Step Execution Plan:

1. **Step 1: Install Dependencies**
   Run the following command using `npm.cmd`:
   ```cmd
   npm.cmd install clsx@^2.1.1 tailwind-merge@^3.0.0 class-variance-authority@^0.7.1 tw-animate-css@^1.4.0
   npm.cmd install -D tailwindcss@^4.1.11 @tailwindcss/postcss@^4.1.11 postcss@^8.4.49
   ```

2. **Step 2: Create `postcss.config.mjs`**
   Create `d:\Space\Faarns\next.js\faarns-web\postcss.config.mjs`:
   ```javascript
   const config = {
     plugins: ["@tailwindcss/postcss"],
   };

   export default config;
   ```

3. **Step 3: Create `components.json`**
   Create `d:\Space\Faarns\next.js\faarns-web\components.json`:
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "base-nova",
     "rsc": true,
     "tsx": true,
     "tailwind": {
       "config": "",
       "css": "src/app/globals.css",
       "baseColor": "neutral",
       "cssVariables": true,
       "prefix": ""
     },
     "iconLibrary": "lucide",
     "rtl": false,
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils",
       "ui": "@/components/ui",
       "lib": "@/lib",
       "hooks": "@/hooks"
     },
     "menuColor": "default",
     "menuAccent": "subtle",
     "registries": {}
   }
   ```

4. **Step 4: Create `src/lib/utils.ts`**
   Create `d:\Space\Faarns\next.js\faarns-web\src\lib\utils.ts`:
   ```typescript
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";

   export function cn(...inputs: ClassValue[]): string {
     return twMerge(clsx(inputs));
   }
   ```

5. **Step 5: Write `src/app/globals.css`**
   Copy the content from `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m1_2\proposed_globals.css` directly to `src/app/globals.css`.

6. **Step 6: Build Verification**
   Run:
   ```cmd
   npm.cmd run build
   ```
   Ensure build exits with code 0 and all 19 static/SSG pages generate without CSS or PostCSS compilation errors.

---

## 5. Verification Method

1. **Package Verification**:
   Inspect `package.json` to verify dependencies:
   ```powershell
   Get-Content package.json | Select-String "tailwindcss", "@tailwindcss/postcss", "tw-animate-css", "clsx", "tailwind-merge"
   ```
2. **File Existence & Integrity**:
   Verify the presence of:
   - `postcss.config.mjs`
   - `components.json`
   - `src/lib/utils.ts`
   - `src/app/globals.css`
3. **Build Execution**:
   Run:
   ```cmd
   npm.cmd run build
   ```
   - Success condition: Exit code 0, 0 TypeScript errors, successful PostCSS compilation.
   - Invalidation conditions: Any `@tailwindcss/postcss` loader failure, unrecognized CSS directive error, or build compilation crash.
