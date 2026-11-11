## 2026-11-10T05:44:31Z
You are the E2E Test Suite Author for Milestone M_E2 in the faarns-web E2E Testing Track.
Working directory: d:\Space\Faarns\next.js\faarns-web
Your state folder: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_test_writer_m_e2

MANDATORY FIRST STEP:
Read d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md
Also read:
d:\Space\Faarns\next.js\faarns-web\PROJECT.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\sub_orch_e2e\SCOPE.md
d:\Space\Faarns\next.js\faarns-web\TEST_INFRA.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_explorer_1\handoff.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_explorer_2\handoff.md
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_explorer_3\handoff.md

WRITE OWNERSHIP:
You own exclusively:
- `tests/tier1-functional/*.test.mjs`
- `tests/tier2-boundary/*.test.mjs`
- `tests/tier3-pairwise/*.test.mjs`
- `tests/tier4-journeys/*.test.mjs`
DO NOT modify `scripts/`, `tests/helpers/`, or any application source files in `src/` or `app/`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

YOUR OBJECTIVE:
Implement the complete, opaque-box, requirement-driven E2E test suite across Tiers 1 through 4 using the helper modules (`tests/helpers/runner.mjs`, `http.mjs`, `dom.mjs`):

1. **Tier 1 — Functional & Route Baseline (`tests/tier1-functional/`)**:
   Implement >=5 tests per feature covering:
   - `routes.test.mjs`: All 6 static pages (`/`, `/about`, `/careers`, `/contact`, `/pricing`, `/services`) status 200, document titles, OpenGraph tags, theme color, core headings, and key lede copy.
   - `services.test.mjs`: All 9 dynamic SSG service slugs (`/services/ai-agents`, `workflow-automation`, `ai-strategy`, `web-design`, `ui-ux`, `seo`, `aeo`, `paid-ads`, `brand`) checking HTTP 200, breadcrumb pills, specific price format, deliverable grids, process scrollers, and FAQ components.
   - `footer.test.mjs`: Verbatim footer replication from faarns-2.0 (MarketingLayout CTA banner with heading "Discover If We’re the Right Fit for Your Brand" and button "Let’s Get Started", default telephone +44 7365 617024, 3 navigation columns, 4 social buttons with target="_blank" and rel="noopener noreferrer", giant 1125x224 FAARNS SVG wordmark, copyright "@ 2025 FAARNS,all rights reserved", and legal links).
   - `navigation.test.mjs`: Nav brand link to `/`, active link `aria-current="page"`, desktop nav links, mobile hamburger button and drawer structure.
   - `contact-form.test.mjs`: Contact page form inputs (name, email, site), 6 needs toggle buttons with aria-pressed, budget dropdown select with 5 options, submit button.
   - `pricing-table.test.mjs`: Pricing table `#all-prices` rendering 13 rows total, 3 ladder steps ($750 fixed, from $3000, from $2000/mo), 4 promise cards.
   - `static-assets.test.mjs`: Public image assets (`/footerImage.png`, `/logo-black.png`, `/Light Rays Effect.png`), typography font files, and favicon.
   - `api-contact.test.mjs`: `POST /api/contact` handling valid minimal and full payloads, checking JSON response and 503 unconfigured handling.
   - `motion-attributes.test.mjs`: DOM hooks for GSAP/Lenis (`data-reveal`, `data-split`, `data-magnetic`, `data-flow-status`, etc.).

2. **Tier 2 — Boundary, Negative & Corner Cases (`tests/tier2-boundary/`)**:
   - `not-found.test.mjs`: Non-existent route `/nonexistent-test-404` returns HTTP 404, robots noindex, and custom 404 DOM; non-existent service slug `/services/invalid-ai-slug` returns 404; slug case sensitivity (`/services/AI-AGENTS` returns 404).
   - `api-validation.test.mjs`: `POST /api/contact` with empty body (400), malformed JSON (400), missing name (400), missing email (400), invalid email formats (no @, no domain, spaces -> 400), unsupported HTTP methods (GET, PUT, DELETE, PATCH -> 405).
   - `extreme-inputs.test.mjs`: Empty roles on `/careers` (no "Open roles" heading rendered when roles: []), `problem: null` omission on `/services/brand` (no "The problem" kicker), fixed price format on `/services/ai-strategy` (displays "$750" without "from " prefix), oversized message payload handling (10,000 chars processed safely).

3. **Tier 3 — Combinatorial & Cross-Feature State (`tests/tier3-pairwise/`)**:
   - `pricing-filters.test.mjs`: PriceTable filtering logic (All -> 13 rows, Projects -> 8 rows, Monthly -> 5 rows) and dynamic service link navigation.
   - `contact-combinations.test.mjs`: Multi-pill toggle combinations, budget tier selection, and client-side error message states (`Add your name...`, `Add a work email...`) preserving entered values.
   - `navigation-interactions.test.mjs`: Mobile drawer toggle states (`aria-expanded`, `aria-hidden`, body class `menu-open`), Escape key dismissal, and route transition active link updates.
   - `faq-accordion.test.mjs`: Single-expansion disclosure invariant (`qa.open` count <= 1 always, clicking open item collapses it).

4. **Tier 4 — Real-World Application Scenarios (`tests/tier4-journeys/`)**:
   Implement the 5 user journeys specified in `e2e_explorer_3/handoff.md`:
   - `journey-enterprise-lead.test.mjs`: Journey 1 (Home -> AI sales simulation -> What we automate -> /services/ai-agents -> deliverables & price -> contact CTA -> /contact form fill).
   - `journey-price-conscious-founder.test.mjs`: Journey 2 (Home -> /pricing -> ladder comparison -> PriceTable filter tabs -> service deep dive -> footer CTA -> /contact with budget).
   - `journey-mobile-visitor.test.mjs`: Journey 3 (Mobile 375px viewport -> hamburger open -> drawer links -> /about navigation -> drawer auto-close -> responsive footer inspection).
   - `journey-agency-researcher.test.mjs`: Journey 4 (Due-diligence check: /about beliefs -> /careers culture -> footer social links validation -> legal terms & privacy links -> contact info).
   - `journey-service-catalog.test.mjs`: Journey 5 (Broad survey: /services index -> browse AI automation & Growth sections -> check 9 service links -> verify deliverable consistency -> book call CTA).

VERIFICATION:
Run `node scripts/run-e2e.mjs` and individual tier commands (`node scripts/run-e2e.mjs --tier=1`, `--tier=2`, `--tier=3`, `--tier=4`).
Verify that all test files execute properly, are well-structured, have zero syntax errors, and produce a detailed test execution summary.
Note which tests pass on the current build and any tests pending implementation milestone completion (e.g. footer assets in M2).

Produce your handoff report at:
d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_test_writer_m_e2\handoff.md
Send a message when your work is complete with a summary of the implemented test cases and counts.
