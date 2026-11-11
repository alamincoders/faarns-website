# Handoff Report: faarns-web Codebase Survey

## 1. Observation

### 1.1 Project Structure & File Layout
Direct inspection of `d:\Space\Faarns\next.js\faarns-web` confirms the current file layout does **not** use a `src/` directory. All application source code is located at the project root:
- Root config files: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`, `.env.example`, `.gitignore`, `README.md`
- Application code:
  - `app/` (Next.js 15 App Router: `layout.tsx`, `page.tsx`, `not-found.tsx`, `globals.css`, subroutes)
  - `app/fonts/Archivo-Variable.woff2` (self-hosted variable font binary)
  - `components/` (10 React components: `Blocks.tsx`, `BookButton.tsx`, `ContactForm.tsx`, `Faq.tsx`, `Flow.tsx`, `Footer.tsx`, `Icons.tsx`, `MotionProvider.tsx`, `Nav.tsx`, `PriceTable.tsx`)
  - `content/site.ts` (567 lines; single source of truth for site copy, services, pricing, navigation, footer)
  - `lib/motion.ts` (344 lines; GSAP + ScrollTrigger + Lenis motion system)
  - `preview/` (`build.mjs`, `runtime.ts`; standalone single-file preview generator)
  - `public/work/` (empty directory)

### 1.2 Dependencies & Tooling (`package.json`)
Exact dependencies from `package.json` (lines 1-27):
```json
{
  "name": "faarns-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "preview": "next build && node preview/build.mjs"
  },
  "dependencies": {
    "geist": "1.8.1",
    "gsap": "3.15.0",
    "lenis": "1.3.27",
    "next": "15.5.26",
    "react": "19.1.10",
    "react-dom": "19.1.10"
  },
  "devDependencies": {
    "@types/node": "20.17.50",
    "@types/react": "19.1.10",
    "@types/react-dom": "19.1.6",
    "esbuild": "0.25.10",
    "typescript": "5.8.3"
  }
}
```
Direct observations:
- Next.js version: `15.5.26` (Next.js 15 App Router).
- React version: `19.1.10` / React DOM `19.1.10`.
- Motion libraries: GSAP `3.15.0`, Lenis `1.3.27`.
- Font library: `geist` `1.8.1`.
- **Tailwind CSS is NOT installed**: No `tailwindcss`, `@tailwindcss/postcss`, `postcss`, or `autoprefixer` dependencies.
- **shadcn/ui is NOT installed**: No `components.json` or radix-ui primitives exist.
- **No test framework**: No Jest or Vitest dependencies or scripts.

### 1.3 TypeScript & Next.js Configurations
- `tsconfig.json` (lines 17-18):
  `"baseUrl": "."`
  `"paths": { "@/*": ["./*"] }`
- `next.config.mjs` (lines 1-3):
  `/** @type {import('next').NextConfig} */`
  `const nextConfig = { reactStrictMode: true };`
  `export default nextConfig;`
- No `tailwind.config.*` or `postcss.config.*` exists in the repository.

### 1.4 Route Inventory & Build Status
Command executed: `cmd /c "npm run build"`
Result: Build succeeded with exit code 0.
Routes generated:
- `○ /` (Static, 756 B, First Load JS 166 kB) — Home page
- `○ /_not-found` (Static, 127 B, First Load JS 103 kB) — 404 page
- `○ /about` (Static, 168 B, First Load JS 106 kB) — About page
- `ƒ /api/contact` (Dynamic, 127 B, First Load JS 103 kB) — Contact form submission API endpoint
- `○ /careers` (Static, 168 B, First Load JS 106 kB) — Careers page
- `○ /contact` (Static, 1.35 kB, First Load JS 113 kB) — Contact page with interactive form
- `○ /pricing` (Static, 907 B, First Load JS 113 kB) — Pricing page with interactive filter table
- `○ /services` (Static, 168 B, First Load JS 106 kB) — Services directory
- `● /services/[slug]` (SSG via `generateStaticParams()`, 444 B, First Load JS 106 kB) — 9 pre-rendered static pages:
  1. `/services/ai-agents`
  2. `/services/workflow-automation`
  3. `/services/ai-strategy`
  4. `/services/web-design`
  5. `/services/ui-ux`
  6. `/services/seo`
  7. `/services/aeo`
  8. `/services/paid-ads`
  9. `/services/brand`

### 1.5 Component Inventory & Usage
1. `RootLayout` (`app/layout.tsx`): Wraps app in `<html>` with inline pre-paint script (checks `sessionStorage` for `'faarns-intro'` and `prefers-reduced-motion`), self-hosted `Archivo-Variable.woff2` and `GeistSans`, `MotionProvider`, `Nav`, `Footer`.
2. `MotionProvider` (`components/MotionProvider.tsx`): Client component managing smooth scroll (Lenis), custom cursor, page preloader, page transition curtain, and GSAP `ScrollTrigger` lifecycle.
3. `Nav` (`components/Nav.tsx`): Client component providing sticky navigation bar with blur, desktop links, `BookButton` CTA, and mobile hamburger drawer menu with keyboard navigation.
4. `Footer` (`components/Footer.tsx`): Global footer displaying tagline, 3 link columns (AI automation, Growth, Company), large SVG mark + animated letters `FAARNS`, legal text, and social links.
5. `Blocks.tsx` (`components/Blocks.tsx`):
   - `PageHero`: Standard header banner for inner pages.
   - `Kicker`: Styled eyebrow label with violet accent line.
   - `Closer`: Primary conversion banner with background glow and CTA buttons.
   - `ProcessScroller`: Pinned desktop horizontal scroll (mobile stacked) detailing the 4-step work process.
   - `Ladder`: 3-stage pricing cards with checkmark lists and CTA buttons.
   - `ServiceRows`: Full-width interactive service rows with prices and directional arrows.
6. `BookButton` (`components/BookButton.tsx`): Central CTA button component; links to external `NEXT_PUBLIC_BOOKING_URL` if set, otherwise `/contact`. Supports primary or dark styling and magnetic pointer tracking.
7. `ContactForm` (`components/ContactForm.tsx`): Client form with interactive multi-select pills for project needs, select dropdown for budget, validation, and POST submission to `/api/contact`.
8. `Faq` (`components/Faq.tsx`): Interactive accordion with CSS grid height animation and expanding plus/minus indicator.
9. `Flow` (`components/Flow.tsx`): Interactive AI sales agent workflow simulation with animated progress bars, live status text, and looping transitions.
10. `Icons.tsx` (`components/Icons.tsx`): SVG components (`Mark`, `Arrow`, `ArrowNE`, `Check`).
11. `PriceTable` (`components/PriceTable.tsx`): Filterable interactive pricing table with tabs: "All", "Projects", "Monthly".

### 1.6 Styling Architecture (`app/globals.css`)
- Pure custom CSS (383 lines) with CSS custom properties:
  - Palette: `--ink: #000000`, `--surface: #0E0D13`, `--surface-2: #15131C`, `--line: rgba(255,255,255,.10)`, `--line-2: rgba(255,255,255,.18)`, `--paper: #F4F3EF`, `--text: #F4F3EF`, `--muted: #A6A3B0`, `--dim: #75727F`, `--violet: #A58BFF`, `--violet-deep: #2B2347`, `--on-violet: #0A0712`.
  - Typography: `--display` (Archivo Variable + fallbacks), `--body` (Geist Sans + system-ui).
  - Metrics: `--pad: clamp(20px,5vw,64px)`, `--ease: cubic-bezier(.2,.7,.1,1)`.
- Key visual styling elements:
  - Polygon clip-path buttons (`.btn-primary`, `.btn-dark`).
  - Row hover slide-in violet background fill (`a.row::before`).
  - Sticky stacking cards with top offsets and GSAP scale-down on scroll (`.stack-card`).
  - Desktop horizontal pinned scroller (`.hs-track`).
  - Custom cursor ring (`.cursor-ring`) and dot (`.cursor-dot`) with label display.
  - Interactive automation flow step bars (`.flow`, `.step`, `.bar`).

### 1.7 Motion Engine (`lib/motion.ts`)
- Declarative data-attribute driven animations:
  - `data-split="hero" | "scroll"`: word-by-word reveal.
  - `data-scrub`: word opacity scroll-scrubbing.
  - `data-reveal` / `data-reveal-item`: staggered scroll entrance.
  - `data-parallax`: vertical drift on scroll.
  - `data-marquee`: endless velocity-responsive text ticker.
  - `data-stack` / `data-stack-card`: sticky card scale-back.
  - `data-hscroll` / `data-hscroll-track` / `data-hscroll-bar`: pinned horizontal scroll.
  - `data-magnetic`: pointer attraction on hover (desktop).
  - `data-tilt`: 3D card tilt on hover (desktop).
  - `data-count`: counter animation upon viewport entry.
  - `data-letters`: char-by-char letter reveal.
  - `data-cursor`: dynamic cursor label.
  - Preloader & curtain transition animations.

### 1.8 Observed Issues & Caveats in Existing Code
1. **ESLint Not Configured**: Running `cmd /c "npm run lint"` prompts interactively:
   `next lint is deprecated and will be removed in Next.js 16... ? How would you like to configure ESLint?`
   There is no `.eslintrc.json` or `eslint.config.mjs` in the project.
2. **Windows Path Bug in `preview/build.mjs`**: Running `cmd /c "npm run preview"` fails with:
   `Error: ENOENT: no such file or directory, scandir 'D:\D:\Space\Faarns\next.js\faarns-web\.next\server\app\services'`
   Caused by line 7: `path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")` which prepends a slash to the drive letter on Windows.
3. **PowerShell Execution Policy**: The Windows environment blocks execution of `.ps1` scripts (`npm.ps1`), so npm commands must be invoked via `cmd /c` or `.cmd`.
4. **No Tailwind or shadcn/ui**: The existing project is entirely CSS-based with custom classes. Migration to Tailwind v4 and shadcn/ui requires integrating Tailwind alongside or replacing the custom CSS rules without breaking existing selectors.

---

## 2. Logic Chain

1. **Premise**: Requirement R1 mandates restructuring `faarns-web` into a clean modular `src/` directory layout (`src/app`, `src/components`, `src/lib`, `src/content`, etc.).
   - Observation: Currently, all application directories (`app`, `components`, `content`, `lib`) reside directly at the project root.
   - Deduction: All source directories must be moved into `src/`, and `tsconfig.json` path mappings must be updated from `"@/*": ["./*"]` to `"@/*": ["./src/*"]`.

2. **Premise**: Requirement R2 mandates configuring Tailwind CSS v4 and shadcn/ui (`components.json`) while ensuring zero TypeScript and build errors.
   - Observation: The existing project currently contains zero Tailwind dependencies, no PostCSS config, and relies on 383 lines of custom CSS in `app/globals.css`.
   - Deduction: When Tailwind v4 is added, `app/globals.css` (or `src/app/globals.css`) must import Tailwind v4 (`@import "tailwindcss";`) while preserving custom CSS variables (`--ink`, `--surface`, `--violet`, etc.), utility classes, and GSAP animation targets.

3. **Premise**: Requirement R3 mandates complete visual and functional preservation of all existing pages, layouts, responsive behavior, assets, and animations.
   - Observation: All animations in `lib/motion.ts` depend on specific DOM selectors (`[data-split]`, `[data-reveal]`, `[data-stack]`, `.cursor-ring`, `.flow`, `.step`, etc.) and CSS classes in `app/globals.css`.
   - Deduction: During migration, no DOM data attributes or CSS class names can be removed or altered without breaking GSAP animation triggers and responsive desktop/mobile switches.

4. **Premise**: Requirement R4 mandates copying the footer component and all constituent elements verbatim from `d:\Space\Faarns\next.js\faarns-2.0`.
   - Observation: The current footer in `components/Footer.tsx` uses `content/site.ts` (`footer.groups`, `footer.social`, `footer.legal`) and `components/Icons.tsx` (`Mark`).
   - Deduction: The explorer survey has cataloged the current footer so the upcoming migration can inspect `faarns-2.0`, replicate its footer verbatim, and verify no visual regressions occur.

---

## 3. Caveats

1. **Public Assets Directory**: `public/work` is currently empty. Any prospective case study images (e.g. `presio.jpg`) are currently unpopulated in the workspace.
2. **Environment Variables**: Running the contact form API route (`/api/contact`) requires `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Without them, the endpoint returns HTTP 503 `{"error": "not_configured"}` by design.
3. **Reference Projects Not Surveyed Here**: In accordance with the dispatch assignment, this survey focused exclusively on `faarns-web`. Parallel surveys/explorations of `faarns-2.0` and `mm-enterprise` will supply the architectural reference patterns and footer code.

---

## 4. Conclusion

The current `faarns-web` codebase is a functional Next.js 15.5.26 application using React 19, GSAP 3.15, and Lenis 1.3.27, compiling cleanly with static generation across 17 user-facing paths and 1 dynamic API route.

However, it currently has:
1. A root-level directory structure rather than `src/`.
2. No Tailwind CSS or shadcn/ui setup.
3. No configured ESLint file (causing `next lint` to prompt interactively).
4. A Windows pathname bug in the standalone `preview/build.mjs` script.

The codebase inventory is completely cataloged:
- 10 components in `components/`
- 8 user-facing pages + 9 SSG service slugs
- 1 API route in `app/api/contact/route.ts`
- 1 centralized content module in `content/site.ts`
- 1 animation engine in `lib/motion.ts`
- 1 custom CSS stylesheet with design tokens in `app/globals.css`
- 1 self-hosted font binary in `app/fonts/Archivo-Variable.woff2`

---

## 5. Verification Method

To independently verify the survey findings:

1. **Verify Root Directory Layout**:
   ```powershell
   Get-ChildItem -Directory
   ```
   *Expected*: Shows root directories `app`, `components`, `content`, `lib`, `preview`, `public`. `src` is absent.

2. **Verify Dependencies & Configs**:
   ```powershell
   Get-Content package.json
   Get-Content tsconfig.json
   ```
   *Expected*: Next.js `15.5.26`, React `19.1.10`, path mapping `"@/*": ["./*"]`. Tailwind CSS is absent.

3. **Verify Build & Route Prerendering**:
   ```powershell
   cmd /c "npm run build"
   ```
   *Expected*: Exit code 0. Generates 19 static/dynamic route artifacts including `/`, `/about`, `/careers`, `/contact`, `/pricing`, `/services`, and 9 `/services/[slug]` paths.

4. **Verify ESLint Status**:
   ```powershell
   cmd /c "npm run lint"
   ```
   *Expected*: Shows `next lint is deprecated` and prompts for configuration due to missing ESLint config.
