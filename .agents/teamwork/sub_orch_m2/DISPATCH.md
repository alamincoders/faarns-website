# DISPATCH: Milestone 2 Sub-Orchestrator

## Role
You are the **Sub-Orchestrator for Milestone 2: Verbatim Footer Replication (Requirement R4)**.

## Working Directory
`d:\Space\Faarns\next.js\faarns-web`

## State Folder
`d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m2`

## Mandatory Reading
1. `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md` (Read FIRST before starting work)
2. `d:\Space\Faarns\next.js\faarns-web\PROJECT.md`
3. Explorer survey report on `faarns-2.0` and Footer:
   `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_survey_2\handoff.md`
4. Reference project footer source at `d:\Space\Faarns\next.js\faarns-2.0`:
   - `d:\Space\Faarns\next.js\faarns-2.0\src\Components\Layout\Footer.jsx`
   - `d:\Space\Faarns\next.js\faarns-2.0\src\Components\Layout\MarketingLayout.jsx`
   - `d:\Space\Faarns\next.js\faarns-2.0\src\Components\UI\PrimaryCtaButton.jsx`
   - `d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\` (LinkedIn, X, Facebook, Instagram, Telegram)
   - `d:\Space\Faarns\next.js\faarns-2.0\public\` (`footerImage.png`, `logo-black.png`, `Light Rays Effect.png`)

## Milestone 2 Scope
Execute verbatim replication of the Footer from `faarns-2.0` into `faarns-web`:
1. **Public Image Assets**:
   - Copy `footerImage.png`, `logo-black.png`, and `Light Rays Effect.png` from `d:\Space\Faarns\next.js\faarns-2.0\public\` into `d:\Space\Faarns\next.js\faarns-web\public\`.
2. **Constituent Components**:
   - `src/components/icons/` (`LinkedInIcon.tsx`, `XIcon.tsx`, `FacebookIcon.tsx`, `InstagramIcon.tsx`, `TelegramIcon.tsx`).
   - `src/components/ui/PrimaryCtaButton.tsx` (two-part button with teardrop icon container, pill text container, `GoArrowUpRight` icon or equivalent SVG).
   - `src/components/layout/MarketingLayout.tsx` (top marketing CTA banner with light rays effect, heading, subheading, and CTA button).
   - `src/components/layout/Footer.tsx` (main footer container with dynamic client geolocation fetch to `https://ipapi.co/json/` for CA vs UK phone numbers, 3-column navigation grid, 4 social circular buttons, giant FAARNS SVG wordmark backdrop, copyright string `@ 2025 FAARNS,all rights reserved`, terms of services & privacy policy links).
3. **Integration**:
   - Mount `<Footer />` in `src/app/layout.tsx` replacing the legacy footer.
4. **Boundary Rule**:
   - Do NOT copy unrelated code from `faarns-2.0` (no Supabase, Tiptap, Admin CMS, Bahrain datasets, or DaisyUI).

## Iteration Loop Protocol
- You are a sub-orchestrator. Follow the Project Pattern iteration loop:
  1. Spawn 3 Explorers (`teamwork_explorer`) to analyze the exact footer files and plan implementation details.
  2. Spawn a Worker (`teamwork_worker`) with the mandatory integrity warning to copy assets, implement components, integrate into layout, and run builds.
  3. Spawn 2 Reviewers (`teamwork_reviewer`) to independently verify verbatim fidelity and zero regressions.
  4. Spawn 2 Challengers (`teamwork_challenger`) to stress-test footer rendering, responsiveness, links, and geolocation fallback.
  5. Spawn 1 Forensic Auditor (`teamwork_auditor`) to verify zero cheating and authentic verbatim implementation.
  6. Evaluate gate in `GATE_STATUS.md`. If all pass, mark milestone DONE and send completion report to parent.


## 2026-11-10T06:01:59Z
You are the Sub-Orchestrator for Milestone 2 (M2: Verbatim Footer Replication - Requirement R4) of the faarns-web project.

Your working directory is: d:\Space\Faarns\next.js\faarns-web
Your state folder is: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m2

MANDATORY FIRST STEPS:
1. Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md.
2. Read d:\Space\Faarns\next.js\faarns-web\PROJECT.md.
3. Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_m2\DISPATCH.md.
4. Read explorer survey report on the Footer:
   d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_survey_2\handoff.md.
5. Initialize BRIEFING.md, progress.md, and SCOPE.md in your state folder.

YOUR MISSION:
Execute Milestone 2:
- Copy the 3 public image assets from d:\Space\Faarns\next.js\faarns-2.0\public\ (footerImage.png, logo-black.png, Light Rays Effect.png) to d:\Space\Faarns\next.js\faarns-web\public\.
- Port the 5 social SVG icons into src/components/icons/.
- Port PrimaryCtaButton.tsx into src/components/ui/ (with GoArrowUpRight icon / SVG).
- Port MarketingLayout.tsx into src/components/layout/.
- Port Footer.tsx into src/components/layout/ (with dynamic geolocation UK/CA phone numbers, 3-column navigation, social circle buttons, giant FAARNS SVG wordmark, copyright notice, legal links).
- Mount <Footer /> in src/app/layout.tsx.
- Follow the iteration loop: Explorers -> Worker -> Reviewers -> Challengers -> Auditor -> Gate check in GATE_STATUS.md.
- Ensure npm run build and npm run lint pass cleanly with exit code 0.
- When gate passes, mark milestone done and send completion report to parent orchestrator.
