# Scope: E2E Testing Track

## Architecture
Opaque-box, requirement-driven E2E test suite for `faarns-web` built using a standalone Node.js test runner and test harness (`scripts/run-e2e.mjs` or `tests/`).
The test suite validates the system externally via HTTP/HTML/DOM and endpoint contracts without importing internal application modules.
It executes seamlessly on Windows (`node scripts/run-e2e.mjs` or `npm run test:e2e`).

### Verification Vectors
1. **HTTP Server / Route Verification**: Live or pre-rendered route responses, status codes, headers, and content types across all routes (`/`, `/about`, `/careers`, `/contact`, `/pricing`, `/services`, all 9 `/services/[slug]`, custom 404).
2. **DOM & Component Structure Verification**: HTML structure checks for navigation bar, mobile menu, FAQ accordion, process scroller, pricing table tabs, contact form inputs, and verbatim footer structure (CTA banner, social icons, phone numbers, FAARNS SVG wordmark).
3. **API Contracts**: `/api/contact` endpoint behavior (valid POST, invalid POST, content-type checks, rate-limit / payload validation).
4. **Static Assets & Public Files**: Availability and integrity of static images (`/footerImage.png`, `/logo-black.png`, `/Light Rays Effect.png`), typography/font files, and favicon.
5. **Interactive & Combinatorial State**: Pricing filter transitions, contact form validation states, service navigation links.
6. **Real-World User Journeys**: End-to-end multi-step flows simulating real prospective clients and visitors.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Route `/` (Homepage) | Hero, ServiceRows, Flow simulation, ProcessScroller, Ladder, Closer, Meta | M_E2 | ORIGINAL_REQUEST §R3 |
| 2 | Route `/about` (About Page) | About page copy, layout, and structural elements | M_E2 | ORIGINAL_REQUEST §R3 |
| 3 | Route `/careers` (Careers Page) | Careers page copy, job listings/structure, culture info | M_E2 | ORIGINAL_REQUEST §R3 |
| 4 | Route `/pricing` (Pricing Page) | Pricing hero, tiers, pricing table structure | M_E2 | ORIGINAL_REQUEST §R3 |
| 5 | Route `/services` (Services Directory) | Services index listing 9 core services | M_E2 | ORIGINAL_REQUEST §R3 |
| 6 | Dynamic Route `/services/[slug]` (9 Services) | 9 individual service pages with deliverables, pricing, and content | M_E2 | ORIGINAL_REQUEST §R3 |
| 7 | Route `/contact` (Contact Page) | Contact page layout, address/contact details, form mount | M_E2 | ORIGINAL_REQUEST §R3 |
| 8 | Contact Form Functionality | Pill selectors, budget dropdown/select, form field validation | M_E2 | ORIGINAL_REQUEST §R3 |
| 9 | API Endpoint `/api/contact` | POST endpoint handling contact submissions | M_E2 | ORIGINAL_REQUEST §R3 |
| 10 | Route `/not-found` (Custom 404) | Custom 404 layout and return-home action | M_E2 | ORIGINAL_REQUEST §R3 |
| 11 | Global Navigation Bar | Desktop links, brand mark, mobile hamburger drawer, contact CTA | M_E2 | ORIGINAL_REQUEST §R3 |
| 12 | Verbatim Footer Structure | Exact structure copied from faarns-2.0, 3-column nav, social circle buttons | M_E2 | ORIGINAL_REQUEST §R4 |
| 13 | Footer Marketing CTA Banner | Light rays background, primary CTA button, heading & subheading | M_E2 | ORIGINAL_REQUEST §R4 |
| 14 | Dynamic Geolocation Phone Numbers | UK (+44) and North America / default phone number display | M_E2 | ORIGINAL_REQUEST §R4 |
| 15 | Footer SVG Wordmark & Icons | FAARNS giant wordmark SVG, 5 social icons (LinkedIn, X, Facebook, Instagram, Telegram) | M_E2 | ORIGINAL_REQUEST §R4 |
| 16 | Public Static Assets | `/footerImage.png`, `/logo-black.png`, `/Light Rays Effect.png` accessibility & 200 OK | M_E2 | ORIGINAL_REQUEST §R4 |
| 17 | Price Table Filtering | Tab filtering between All, Projects, and Monthly subscriptions | M_E2 | ORIGINAL_REQUEST §R3 |
| 18 | FAQ Accordion Component | Accordion items, question headers, answer disclosure | M_E2 | ORIGINAL_REQUEST §R3 |
| 19 | Motion & Layout Attributes | `data-reveal`, `data-split`, `data-scroll`, `data-magnetic` DOM hooks | M_E2 | ORIGINAL_REQUEST §R3 |
| 20 | Typography & Asset Loading | Font links / @font-face references, Geist / Archivo font loads | M_E2 | ORIGINAL_REQUEST §R3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M_E1 | Test Infra & Harness Architecture | Design and build `scripts/run-e2e.mjs` test runner, HTTP/DOM test assertions, report formatter, and create `TEST_INFRA.md` | none | DONE |
| M_E2 | Test Case Suite Implementation (Tiers 1-4) | Implement test cases covering Tier 1 (>=5 per feature), Tier 2 (boundary & negative), Tier 3 (cross-feature pairwise), Tier 4 (real-world scenarios) | M_E1 | DONE |
| M_E3 | Verification, Audit & TEST_READY Signal | Execute full test runner, verify all tests pass, pass Reviewer + Challenger + Forensic Auditor gates, publish `TEST_READY.md` | M_E2 | IN_PROGRESS |

## Interface Contracts
### Test Runner Invocation ↔ System
- Command: `node scripts/run-e2e.mjs` (or `npm run test:e2e`)
- Output: Structured console report with total tests, passed, failed, duration, tier breakdown.
- Exit code: 0 if all tests pass; non-zero if any test fails.
- Environment compatibility: Windows native PowerShell / CMD without bash dependencies.

### Test Infra Specification (`TEST_INFRA.md`) ↔ Implementation Track
- Documents test execution commands, tier breakdown, test case inventory, and assertions.
- Enables Implementation Track Milestone M4 to run and debug against the suite.
