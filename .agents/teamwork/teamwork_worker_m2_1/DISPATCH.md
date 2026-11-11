# DISPATCH: teamwork_worker_m2_1

## Task
Implement Milestone 2: Verbatim Footer Replication (Requirement R4) for `faarns-web`.

## Mandatory Reading
1. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md` (Read FIRST before starting work)
2. `d:\Space\Faarns\next.js\faarns-web\PROJECT.md`
3. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m2\SCOPE.md`
4. Explorer Reports:
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m2_1\handoff.md` (Core components, props, types, and assets)
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m2_2\handoff.md` (SVG icons & GoArrowUpRight specifications)
   - `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m2_3\handoff.md` (Layout integration & Tailwind v4 compatibility)

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Write Ownership
You exclusively own and may modify:
1. `public/footerImage.png` (copy from `faarns-2.0/public/footerImage.png`)
2. `public/logo-black.png` (copy from `faarns-2.0/public/logo-black.png`)
3. `public/Light Rays Effect.png` (copy from `faarns-2.0/public/Light Rays Effect.png`)
4. `src/components/icons/LinkedInIcon.tsx`
5. `src/components/icons/XIcon.tsx`
6. `src/components/icons/FacebookIcon.tsx`
7. `src/components/icons/InstagramIcon.tsx`
8. `src/components/icons/TelegramIcon.tsx`
9. `src/components/icons/GoArrowUpRight.tsx`
10. `src/components/icons/index.ts`
11. `src/components/ui/PrimaryCtaButton.tsx`
12. `src/components/layout/MarketingLayout.tsx`
13. `src/components/layout/Footer.tsx` (add `border-t-0 mt-0` defensively to override legacy CSS selector `footer`)
14. `src/components/Footer.tsx` (maintain re-export shim: `export { default, default as Footer } from "./layout/Footer";`)
15. `src/app/layout.tsx` (update import to `import Footer from "@/components/layout/Footer";` and mount `<Footer />`)

DO NOT modify files outside your ownership.

## Implementation Steps
1. Copy the 3 public assets from `d:\Space\Faarns\next.js\faarns-2.0\public\` into `d:\Space\Faarns\next.js\faarns-web\public\`.
2. Create the 6 icon components and `index.ts` under `src/components/icons/` using the exact SVG paths from `faarns-2.0` (as specified in Explorer 2's handoff).
3. Create `src/components/ui/PrimaryCtaButton.tsx` with teardrop shape, pill button, and `GoArrowUpRight` icon.
4. Create `src/components/layout/MarketingLayout.tsx` with background image `/Light Rays Effect.png`, heading, subheading, and CTA button. Use `we&apos;re` or `we’re` to avoid ESLint unescaped entities warning.
5. Create `src/components/layout/Footer.tsx` with background image `/footerImage.png`, `border-t-0 mt-0`, dynamic `ipapi.co` geolocation fetch for CA (`+1 (613) 227-7949`) vs UK/fallback (`+44 7365 617024`), logo box with `/logo-black.png`, 3-column navigation grid, 4 social buttons with `target="_blank"` and `rel="noopener noreferrer"`, giant FAARNS SVG wordmark (viewBox `0 0 1125 224`), copyright `@ 2025 FAARNS,all rights reserved`, and legal links (`/terms-of-services`, `/privacy-policy`).
6. Update `src/components/Footer.tsx` to re-export from `./layout/Footer`.
7. Update `src/app/layout.tsx` to import `Footer` from `@/components/layout/Footer`.
8. Run build and lint verification:
   - `npm run lint` (must pass with 0 errors)
   - `npx tsc --noEmit` (must pass with 0 errors)
   - `npm run build` (must pass with exit code 0)
   - Run tests: `node tests/tier1-functional/footer.test.mjs` and `node tests/tier1-functional/static-assets.test.mjs` (must pass with 0 failures)

## Output
Write your completion report to:
`d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_worker_m2_1\handoff.md`
Include build outputs, lint outputs, and test execution results.


## 2026-11-10T06:16:45Z
Execute the implementation of Milestone 2 (copy 3 assets, implement icons, PrimaryCtaButton, MarketingLayout, Footer, re-export shim, and layout.tsx update).
Run lint, tsc, build, and tests, verifying clean exit code 0.
Write your completion report with evidence to:
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_worker_m2_1\handoff.md
When complete, send a message back with your handoff path.
