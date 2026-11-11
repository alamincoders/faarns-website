# Handoff Report: E2E Page, Route, Slug & API Test Specifications

## 1. Observation

Direct inspection of `faarns-web` codebase, configuration, pre-rendered `.next/server/app/` artifacts, and content manifests revealed the following route, component, and API definitions:

### 1.1 Complete Route Inventory
From `content/site.ts` (lines 16-24, 111-462) and `app/` filesystem:
1. `/` (Homepage, `app/page.tsx`, pre-rendered static artifact `.next/server/app/index.html`)
2. `/about` (About page, `app/about/page.tsx`, `.next/server/app/about.html`)
3. `/careers` (Careers page, `app/careers/page.tsx`, `.next/server/app/careers.html`)
4. `/contact` (Contact page, `app/contact/page.tsx`, `.next/server/app/contact.html`)
5. `/pricing` (Pricing page, `app/pricing/page.tsx`, `.next/server/app/pricing.html`)
6. `/services` (Services directory, `app/services/page.tsx`, `.next/server/app/services.html`)
7. `/services/[slug]` (Dynamic service detail SSG, `app/services/[slug]/page.tsx`, `generateStaticParams()` lines 12-14) covering 9 exact slugs:
   - `/services/ai-agents`
   - `/services/workflow-automation`
   - `/services/ai-strategy`
   - `/services/web-design`
   - `/services/ui-ux`
   - `/services/seo`
   - `/services/aeo`
   - `/services/paid-ads`
   - `/services/brand`
8. `/_not-found` / Custom 404 (`app/not-found.tsx`, `.next/server/app/_not-found.html`)
9. `/api/contact` (Dynamic HTTP API route, `app/api/contact/route.ts`)

---

### 1.2 Global Layout & Shell Contracts (`app/layout.tsx`)
- **Metadata Base**: `process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"` (line 13).
- **Default Document Title**: `"FAARNS — AI automation and growth, under one roof"` (line 14).
- **Title Template**: `"%s — FAARNS"` (line 14).
- **Meta Description**: `"FAARNS builds AI agents and automations that answer leads, run operations and cut busywork, plus the website, search and ads that bring in more customers."` (line 15).
- **OpenGraph**: `type: "website"`, `siteName: "FAARNS"`, `title`, `description` (line 16).
- **Twitter Card**: `summary`, `twitter:title`, `twitter:description`.
- **Viewport**: `width=device-width, initial-scale=1, viewport-fit=cover`.
- **Theme Color**: `#000000`.
- **Pre-paint inline script**: Contains `sessionStorage.getItem('faarns-intro') === '1'` and `prefers-reduced-motion` detection (lines 23-24).
- **Font Classes**: Self-hosted `Archivo-Variable.woff2` (`--font-archivo`) and `GeistSans` (`--font-geist-sans`).

---

### 1.3 Route-by-Route Assertion Specifications

#### 1.3.1 Route: `/` (Home)
- **HTTP Status**: 200 OK
- **Content-Type**: `text/html; charset=utf-8`
- **Document Title**: `FAARNS — AI automation and growth, under one roof`
- **Key Meta Tags**:
  - `<meta name="description" content="FAARNS builds AI agents and automations that answer leads, run operations and cut busywork, plus the website, search and ads that bring in more customers."/>`
  - `<meta property="og:site_name" content="FAARNS"/>`
  - `<meta name="theme-color" content="#000000"/>`
- **Required HTML Elements & Content**:
  - Hero Pill: `.pill[data-intro]` containing `"AI automation + growth, under one roof"`.
  - Headline `h1[data-split="hero"]`: `"We automate the work. Then we grow the business."` (where `"Then we grow the business."` is wrapped in `<span class="grey">`).
  - Hero Lede paragraph: `.lede[data-intro]` containing `"FAARNS builds AI agents and automations that answer leads, run operations and cut busywork..."`.
  - Hero CTA Row: `<a class="btn btn-primary" href="/contact">Book a 30-minute call...</a>` and `<a class="btn btn-ghost" href="/#automate">See what we automate</a>`.
  - Proof Statement: `<p class="proof">` containing `"Trusted by 50+ startups and growing brands across the US, UK, Europe and Asia."` with `.count[data-count="50"]`.
  - Flow Simulation: `.flow[aria-label="Example: how an AI sales agent handles a new lead"]` with `data-flow-status` (`"New lead from your website form"`) and 4 `.step` items (`"New lead arrives"`, `"Agent replies in seconds"`, `"Lead scored, CRM updated"`, `"Call booked"`).
  - Stack Marquee: `.strip[aria-label="Tools we build on"]` with 10 tools: OpenAI, Anthropic, Google Gemini, n8n, Make, Zapier, HubSpot, WhatsApp, Next.js, Shopify.
  - Difference Section: Kicker `"Why FAARNS"`, `h2[data-scrub]` (`"Everyone builds websites. We build systems that work while you sleep."`).
  - Automate Section (`#automate`): Kicker `"What we automate"`, `h2` (`"AI for how your business sells, serves and runs."`), and 4 `.stack-card` elements for Sales, Support, Operations, and Marketing.
  - Growth Section: Kicker `"Then we grow it"`, `h2` (`"The website, search and ads that feed the machine."`), 4 rows linking to `/services/web-design`, `/services/seo`, `/services/paid-ads`, `/services/brand`.
  - Work Process Scroller (`#how`): 4 cards with numbers `01` to `04` (Assess, Build, Train, Grow & support).
  - Services Preview: Kicker `"Services"`, `h2` (`"Everything between the first click and the finished task."`), `<a class="btn btn-ghost" href="/services">Browse all services</a>`, 9 service `.chip` links.
  - Work Section (`#work`): Kicker `"Work"`, `h2` (`"What it looks like when it sticks."`), 3 case studies: Presio (SaaS), Dropout Skool (Education), Al Majlis Arabian (Hospitality).
  - Pricing Preview: Kicker `"Pricing"`, `h2` (`"Start small. Prove it. Then grow."`), `<a class="link" href="/pricing">See full pricing</a>`, 3-rung `Ladder`.
  - FAQ: Kicker `"FAQ"`, `h2` (`"Good questions. Straight answers."`), `.faq` accordion with 9 items.
  - Closer: `h2` (`"Ready to put AI to work in your business?"`), subhead (`"Thirty minutes. Your workflows, our honest take, and a clear first thing to automate."`), CTA buttons.

#### 1.3.2 Route: `/about`
- **HTTP Status**: 200 OK
- **Document Title**: `About — FAARNS`
- **Required HTML Elements & Content**:
  - `PageHero`: Pill `"About FAARNS"`, `h1` (`"We build the systems behind growing businesses."`), lede (`"FAARNS started with a simple idea: your website should be your best salesperson..."`).
  - Beliefs: Kicker `"What we believe"`, `h2` (`"Four rules we work by."`), `.cells.c4` containing 4 cards:
    1. `"Outcomes over output."` / `"We measure leads and revenue, not pages delivered."`
    2. `"Straight talk."` / `"If something won’t work, we’ll say so before you pay for it."`
    3. `"One team, end to end."` / `"AI automation, web and growth under one roof. No handoffs."`
    4. `"Built to hand over."` / `"You own everything, and your team can run it."`
  - Team: Kicker `"The team"`, `.statement[data-scrub]` (`"Spread across North America, Europe and Asia, so someone’s always awake for you."`).
  - Closer component.

#### 1.3.3 Route: `/careers`
- **HTTP Status**: 200 OK
- **Document Title**: `Careers — FAARNS`
- **Required HTML Elements & Content**:
  - `PageHero`: Pill `"Careers"`, `h1` (`"Do the best work of your career. From anywhere."`), lede (`"We’re a remote team that cares about craft, clear thinking and real results."`).
  - Perks: Kicker `"Why FAARNS"`, 5 `.chip` elements (`"Fully remote"`, `"Flexible hours"`, `"Global clients"`, `"Real ownership"`, `"Learning budget"`).
  - Open Roles Section: Conditioned on `careers.roles.length > 0`. Because `roles: []` in `site.ts`, "Open roles" heading and list MUST NOT be present in DOM.
  - Closer: Custom headline (`"Don’t see your role? Send us your work anyway."`), subhead (`"Tell us what you do best and show us something you’re proud of."`), CTA link (`"Send us your work"`, `href="/contact"`).

#### 1.3.4 Route: `/contact`
- **HTTP Status**: 200 OK
- **Document Title**: `Contact — FAARNS`
- **Meta Description**: `"Book a 30-minute call or send a message. We reply within one business day."`
- **Required HTML Elements & Content**:
  - Hero: Pill `"Contact"`, `h1` (`"Let’s talk about what’s next."`), lede (`"Book a 30-minute call or send a message. We reply within one business day."`).
  - Call Steps: Kicker `"What happens on the call"`, `<ol class="callsteps">` with 3 items:
    1. `"You share your goals."`
    2. `"We give our honest take."`
    3. `"You leave with a clear next step, whether or not you work with us."`
  - Interactive Form `<form class="form" noValidate>`:
    - Input Name: `<input name="name" required autoComplete="name" />`
    - Input Email: `<input type="email" name="email" required autoComplete="email" />`
    - Input Website: `<input type="url" inputMode="url" placeholder="https://" name="site" />`
    - Needs Fieldset: `<fieldset>` with legend `"What do you need help with?"` and 6 toggle buttons: `"AI automation"`, `"Website"`, `"Search"`, `"Ads"`, `"Brand"`, `"Not sure yet"`. Default `aria-pressed="false"`.
    - Budget Select: `<select name="budget">` with default option `"Choose a range"` plus 5 budget tiers (`"Audit ($750)"`, `"$1,500 to $3,000"`, `"$3,000 to $6,000"`, `"$6,000+"`, `"Monthly retainer (from $2,000/mo)"`).
    - Textarea: `<textarea name="more"></textarea>`
    - Submit Button: `<button class="btn btn-primary" type="submit">Send message</button>`
    - Live Status Region: `<p class="msg " role="status" aria-live="polite"></p>`

#### 1.3.5 Route: `/pricing`
- **HTTP Status**: 200 OK
- **Document Title**: `Pricing — FAARNS`
- **Meta Description**: `"Clear starting prices. Fixed scopes. No surprise invoices."`
- **Required HTML Elements & Content**:
  - `PageHero`: Pill `"Pricing"`, `h1` (`"Start small. Prove it. Then grow."`), lede (`"Clear starting prices. Fixed scopes. No surprise invoices."`).
  - Ladder: Kicker `"The path most clients take"`, `h2` (`"Three steps, each one paying for the next."`), 3 rungs:
    1. Step 1: `"AI & Growth Audit"` — `"$750 fixed"`, 5 deliverables, CTA `"Start with an audit"`.
    2. Step 2: `"Automation Quick Win"` — `"from $3,000"`, 4 deliverables, CTA `"Automate my first workflow"`.
    3. Step 3: `"Growth Partner"` (highlighted `.rung.hl`) — `"from $2,000/mo"`, 4 deliverables, CTA `"See the Growth Partner plan"`.
  - Filterable Price Table (`#all-prices`):
    - Segmented Filter: `<div class="seg" role="group" aria-label="Filter prices">` with 3 filter buttons: `"All"` (`aria-pressed="true"` initially), `"Projects"`, `"Monthly"`.
    - Price Rows: 13 rows total: 9 services + 4 add-ons (`"Extra AI agent"`, `"Agent monitoring and upkeep"`, `"Extra landing page"`, `"Site care plan"`).
  - Promises: Kicker `"What you can count on"`, `h2` (`"No surprises, in writing."`), 4 cards: `"Audit fee credited"`, `"Tools billed at cost"`, `"Paid in stages"`, `"No lock-in"`.
  - FAQ: Kicker `"FAQ"`, 5 pricing FAQs.
  - Closer: headline `"Not sure which fits?"`, subhead `"Book a 30-minute call and we’ll tell you honestly."`.

#### 1.3.6 Route: `/services`
- **HTTP Status**: 200 OK
- **Document Title**: `Services — FAARNS`
- **Required HTML Elements & Content**:
  - `PageHero`: Pill `"Services"`, `h1` (`"Everything between the first click and the finished task."`).
  - Section `"AI automation"`: Kicker `"AI automation"`, 3 `.row` links:
    - `/services/ai-agents`: `"AI agents"`, `"from $3,000"`
    - `/services/workflow-automation`: `"Workflow automation"`, `"from $3,000"`
    - `/services/ai-strategy`: `"AI strategy & readiness"`, `"from $750"`
  - Section `"Growth"`: Kicker `"Growth"`, 6 `.row` links:
    - `/services/web-design`: `"Web design & development"`, `"from $2,500"`
    - `/services/ui-ux`: `"UI/UX design"`, `"from $3,000"`
    - `/services/seo`: `"SEO"`, `"from $2,000/mo"`
    - `/services/aeo`: `"AEO (AI search visibility)"`, `"from $2,000/mo"`
    - `/services/paid-ads`: `"Paid ads"`, `"from $2,000/mo"`
    - `/services/brand`: `"Brand identity"`, `"from $1,500"`
  - Standard Closer component.

#### 1.3.7 Dynamic Routes: All 9 Service Detail Slugs (`/services/[slug]`)
All 9 routes return HTTP 200 OK and share this common structure:
- Breadcrumb pill link `<a class="pill" href="/services"><i></i>{group} / {name}</a>`
- Hero `h1[data-split="hero"]`: `{headline}`
- Price card `.svc-price`: label `{price.label}`, amount `{!fixed && "from "}{price.amount}`, timeline `{price.timeline}`, note `{price.note}`.
- Deliverables section: Kicker `"What you get"`, `h2` (`"Everything included."`), `.cells.c3` grid with `{deliverables}`.
- Process scroller (`#how`): 4 steps.
- Results card: Kicker `"Results to expect"`, statement `{results}`.
- FAQ accordion: `{faq}` items.
- Closer component.

**Slug-Specific Matrix**:
| Slug | Title | Group | Price Amount | Price Label | Problem Section Present? |
|---|---|---|---|---|---|
| `ai-agents` | `AI agents — FAARNS` | AI automation | `from $3,000` | Starting price | Yes (`"The problem"`) |
| `workflow-automation` | `Workflow automation — FAARNS` | AI automation | `from $3,000` | Starting price | Yes (`"The problem"`) |
| `ai-strategy` | `AI strategy & readiness — FAARNS` | AI automation | `$750` | Fixed price | Yes (`"Honest line"`) |
| `web-design` | `Web design & development — FAARNS` | Growth | `from $2,500` | Starting price | Yes (`"The problem"`) |
| `ui-ux` | `UI/UX design — FAARNS` | Growth | `from $3,000` | Starting price | Yes (`"The problem"`) |
| `seo` | `SEO — FAARNS` | Growth | `from $2,000/mo` | Growth Partner | Yes (`"The problem"`) |
| `aeo` | `AEO (AI search visibility) — FAARNS` | Growth | `from $2,000/mo` | Growth Partner | Yes (`"The problem"`) |
| `paid-ads` | `Paid ads — FAARNS` | Growth | `from $2,000/mo` | Growth Partner | Yes (`"The problem"`) |
| `brand` | `Brand identity — FAARNS` | Growth | `from $1,500` | Starting price | **No** (`problem: null`) |

#### 1.3.8 Route: Non-Existent Routes / Custom 404 (`app/not-found.tsx`)
- **HTTP Status**: 404 Not Found (for unknown paths like `/nonexistent-route-404`, `/services/invalid-slug`)
- **Document Title**: `FAARNS — AI automation and growth, under one roof`
- **Robots Meta Tag**: `<meta name="robots" content="noindex" />`
- **Required HTML Elements & Content**:
  - `h1`: `"This page doesn’t exist."`
  - `.lede`: `"Head back to the homepage to find what you need."`
  - CTA Button: `<a class="btn btn-primary" href="/">Go to the homepage</a>`

---

### 1.4 API Route Specification: `/api/contact` (`app/api/contact/route.ts`)

#### 1.4.1 Method & Endpoint Contract
- **URL**: `/api/contact`
- **Allowed Method**: `POST`
- **Disallowed Methods**: `GET`, `PUT`, `DELETE`, `PATCH`, `OPTIONS` -> Return HTTP `405 Method Not Allowed`.

#### 1.4.2 Request Schema
- **Content-Type**: `application/json`
- **Payload Fields**:
  - `name` (required, string): non-empty string.
  - `email` (required, string): non-empty string matching `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - `site` (optional, string): website URL.
  - `needs` (optional, array of strings): selected services.
  - `budget` (optional, string): budget tier.
  - `message` (optional, string): additional context.

#### 1.4.3 Response Formats & HTTP Status Codes
| Condition | HTTP Status | Response JSON | Notes |
|---|---|---|---|
| Malformed JSON body | `400 Bad Request` | `{"error": "invalid"}` | `req.json().catch(() => null)` returns null |
| Missing `name` field | `400 Bad Request` | `{"error": "invalid"}` | Empty string, null, or omitted |
| Missing `email` field | `400 Bad Request` | `{"error": "invalid"}` | Empty string, null, or omitted |
| Malformed email format | `400 Bad Request` | `{"error": "invalid"}` | Fails regex test |
| Missing `RESEND_API_KEY` or `CONTACT_TO_EMAIL` | `503 Service Unavailable` | `{"error": "not_configured"}` | Valid payload, but mailer not configured |
| Resend API returns error | `502 Bad Gateway` | `{"error": "send_failed"}` | Downstream mailer failure |
| Resend API succeeds | `200 OK` | `{"ok": true}` | Email dispatched successfully |

---

## 2. Logic Chain

1. **Premise**: E2E testing must validate opaque-box requirement adherence without accessing internal server state.
   - Observation: Next.js App Router renders standard HTML documents on GET requests and JSON responses on route handlers.
   - Deduction: Every user-facing route can be validated using HTTP GET status codes (200 / 404), header content-type checks, HTML parsing (regex/cheerio-like selectors), title tag inspection, and semantic content assertions.

2. **Premise**: Tier 1 tests represent primary, happy-path requirements with at least 5 distinct test cases per feature.
   - Observation: There are 10 core features defined in the E2E Scope (`/`, `/about`, `/careers`, `/pricing`, `/services`, `/services/[slug]`, `/contact`, Contact Form, `/api/contact`, `/not-found`).
   - Deduction: Defining >=5 distinct test cases per feature produces a baseline of >=50 Tier 1 tests covering core functionality, layout fidelity, and semantic structure.

3. **Premise**: Tier 2 tests represent boundary conditions, negative flows, malformed payloads, and edge cases.
   - Observation:
     - The contact API handles malformed JSON, missing fields, invalid emails, and unconfigured environment variables.
     - Slugs have varying structures (e.g. `brand` omits the problem section; `ai-strategy` has fixed price without "from").
     - Dynamic 404 handling triggers for invalid slugs (`/services/unknown`) and non-existent paths.
     - Non-POST HTTP methods to `/api/contact` trigger 405.
     - Very long strings (4000+ characters) in contact forms must be truncated or safely processed without 500 crashes.
   - Deduction: Tier 2 test cases must test each of these specific edge and negative conditions systematically.

---

## 3. Caveats

1. **Resend Live Dispatch**: In development/testing environments without a paid Resend API key, valid `/api/contact` submissions will return HTTP `503 Service Unavailable` with `{"error": "not_configured"}`. This is expected behavior and constitutes a valid pass condition for the unconfigured state. If simulated mock testing of 200 OK is desired, `RESEND_API_KEY` and `CONTACT_TO_EMAIL` can be set with a test double or mock server.
2. **Client-Side Hydration vs Static HTML**: Several interactive features (price table filter tabs, FAQ accordion open/close state, mobile nav drawer) hydrate on the client. In a Node.js HTTP/DOM test runner, tests on static HTML assert initial SSR state (e.g., `aria-pressed="true"` on "All", `aria-expanded="true"` on first FAQ, `aria-hidden="true"` on drawer). Interactive state changes are tested via DOM simulation or headless browser if available.
3. **No Caveats on Route Availability**: All 17 user-facing HTML routes and 1 API route have been verified to compile and render cleanly.

---

## 4. Conclusion & Test Case Inventory

### 4.1 Tier 1: Functional & Contract Happy-Path Tests (>=5 per feature)

#### Feature 1: Route `/` (Homepage)
1. `T1_HOME_01_STATUS_200`: `GET /` returns status 200 with `Content-Type: text/html`.
2. `T1_HOME_02_TITLE_META`: Verify document `<title>` is `"FAARNS — AI automation and growth, under one roof"` and meta description matches.
3. `T1_HOME_03_HERO_SPLIT_H1`: Verify Hero contains `h1[data-split="hero"]` with text `"We automate the work. Then we grow the business."`.
4. `T1_HOME_04_FLOW_SIMULATION`: Verify Flow component is rendered with 4 steps and initial status `"New lead from your website form"`.
5. `T1_HOME_05_STACK_MARQUEE`: Verify tech stack marquee contains OpenAI, Anthropic, Google Gemini, n8n, Make, Zapier, HubSpot, WhatsApp, Next.js, and Shopify.
6. `T1_HOME_06_AUTOMATE_CARDS`: Verify 4 cards (Sales, Support, Operations, Marketing) link to `/services/ai-agents` and `/services/workflow-automation`.
7. `T1_HOME_07_WORK_CASES`: Verify case studies Presio, Dropout Skool, and Al Majlis Arabian are present with sectors and result taglines.

#### Feature 2: Route `/about` (About Page)
1. `T1_ABOUT_01_STATUS_200`: `GET /about` returns status 200.
2. `T1_ABOUT_02_TITLE`: Verify document title is `"About — FAARNS"`.
3. `T1_ABOUT_03_HERO`: Verify Hero pill `"About FAARNS"` and `h1` `"We build the systems behind growing businesses."`.
4. `T1_ABOUT_04_BELIEFS`: Verify 4 belief cards (`"Outcomes over output."`, `"Straight talk."`, `"One team, end to end."`, `"Built to hand over."`).
5. `T1_ABOUT_05_TEAM_STATEMENT`: Verify team statement `"Spread across North America, Europe and Asia, so someone’s always awake for you."`.

#### Feature 3: Route `/careers` (Careers Page)
1. `T1_CAREERS_01_STATUS_200`: `GET /careers` returns status 200.
2. `T1_CAREERS_02_TITLE`: Verify document title is `"Careers — FAARNS"`.
3. `T1_CAREERS_03_HERO`: Verify Hero pill `"Careers"` and `h1` `"Do the best work of your career. From anywhere."`.
4. `T1_CAREERS_04_PERKS`: Verify 5 perk chips (`"Fully remote"`, `"Flexible hours"`, `"Global clients"`, `"Real ownership"`, `"Learning budget"`).
5. `T1_CAREERS_05_CLOSER_CTA`: Verify closer contains `"Don’t see your role? Send us your work anyway."` and link `"Send us your work"` pointing to `/contact`.

#### Feature 4: Route `/pricing` (Pricing Page)
1. `T1_PRICING_01_STATUS_200`: `GET /pricing` returns status 200.
2. `T1_PRICING_02_TITLE_META`: Verify title `"Pricing — FAARNS"` and meta description `"Clear starting prices. Fixed scopes. No surprise invoices."`.
3. `T1_PRICING_03_LADDER_RUNGS`: Verify 3 pricing rungs: Step 1 ($750 fixed), Step 2 (from $3,000), Step 3 (from $2,000/mo highlighted).
4. `T1_PRICING_04_PRICE_TABLE_ROWS`: Verify `#all-prices` table renders 13 rows total.
5. `T1_PRICING_05_PROMISES`: Verify 4 promise cards: `"Audit fee credited"`, `"Tools billed at cost"`, `"Paid in stages"`, `"No lock-in"`.
6. `T1_PRICING_06_FAQS`: Verify 5 pricing FAQs are rendered in `.faq` accordion.

#### Feature 5: Route `/services` (Services Directory)
1. `T1_SERVICES_01_STATUS_200`: `GET /services` returns status 200.
2. `T1_SERVICES_02_TITLE`: Verify document title is `"Services — FAARNS"`.
3. `T1_SERVICES_03_HERO`: Verify Hero pill `"Services"` and `h1` `"Everything between the first click and the finished task."`.
4. `T1_SERVICES_04_AI_AUTOMATION_GROUP`: Verify 3 services in AI automation group (`ai-agents`, `workflow-automation`, `ai-strategy`).
5. `T1_SERVICES_05_GROWTH_GROUP`: Verify 6 services in Growth group (`web-design`, `ui-ux`, `seo`, `aeo`, `paid-ads`, `brand`).

#### Feature 6: Dynamic Route `/services/[slug]` (All 9 Services)
1. `T1_SLUG_01_AI_AGENTS`: `GET /services/ai-agents` returns 200, title `"AI agents — FAARNS"`, price `"from $3,000"`, 6 deliverables.
2. `T1_SLUG_02_WORKFLOW`: `GET /services/workflow-automation` returns 200, title `"Workflow automation — FAARNS"`, price `"from $3,000"`, 6 deliverables.
3. `T1_SLUG_03_STRATEGY`: `GET /services/ai-strategy` returns 200, title `"AI strategy & readiness — FAARNS"`, price `"$750"`, label `"Fixed price"`, 5 deliverables.
4. `T1_SLUG_04_WEB_DESIGN`: `GET /services/web-design` returns 200, title `"Web design & development — FAARNS"`, price `"from $2,500"`, 6 deliverables.
5. `T1_SLUG_05_UI_UX`: `GET /services/ui-ux` returns 200, title `"UI/UX design — FAARNS"`, price `"from $3,000"`, 5 deliverables.
6. `T1_SLUG_06_SEO`: `GET /services/seo` returns 200, title `"SEO — FAARNS"`, price `"from $2,000/mo"`, 7 deliverables.
7. `T1_SLUG_07_AEO`: `GET /services/aeo` returns 200, title `"AEO (AI search visibility) — FAARNS"`, price `"from $2,000/mo"`, 6 deliverables.
8. `T1_SLUG_08_PAID_ADS`: `GET /services/paid-ads` returns 200, title `"Paid ads — FAARNS"`, price `"from $2,000/mo"`, 6 deliverables.
9. `T1_SLUG_09_BRAND`: `GET /services/brand` returns 200, title `"Brand identity — FAARNS"`, price `"from $1,500"`, 6 deliverables.

#### Feature 7: Route `/contact` (Contact Page)
1. `T1_CONTACT_01_STATUS_200`: `GET /contact` returns status 200.
2. `T1_CONTACT_02_TITLE_META`: Verify title `"Contact — FAARNS"` and meta description matches.
3. `T1_CONTACT_03_HERO`: Verify Hero pill `"Contact"`, `h1` `"Let’s talk about what’s next."`, and lede.
4. `T1_CONTACT_04_CALL_STEPS`: Verify 3 call steps in `<ol class="callsteps">`.
5. `T1_CONTACT_05_FORM_MOUNT`: Verify `<form class="form">` is present with all required fields.

#### Feature 8: Contact Form Elements & Inputs
1. `T1_FORM_01_NAME_INPUT`: Form contains `<input name="name" required autoComplete="name" />`.
2. `T1_FORM_02_EMAIL_INPUT`: Form contains `<input type="email" name="email" required autoComplete="email" />`.
3. `T1_FORM_03_WEBSITE_INPUT`: Form contains `<input type="url" name="site" placeholder="https://" />`.
4. `T1_FORM_04_NEEDS_PILLS`: Form contains 6 pill buttons with `aria-pressed="false"`.
5. `T1_FORM_05_BUDGET_SELECT`: Form contains `<select name="budget">` with 5 budget range options.
6. `T1_FORM_06_SUBMIT_BUTTON`: Form contains `<button type="submit">Send message</button>`.

#### Feature 9: API Endpoint `/api/contact` (Happy Path & Unconfigured Handling)
1. `T1_API_01_POST_UNCONFIGURED`: `POST /api/contact` with valid payload returns HTTP `503` with `{"error": "not_configured"}` when keys are absent.
2. `T1_API_02_RESPONSE_JSON`: Verify API response content-type is `application/json`.
3. `T1_API_03_MINIMAL_VALID_PAYLOAD`: Payload with only valid `name` and `email` is accepted without 400.
4. `T1_API_04_FULL_VALID_PAYLOAD`: Payload with `name`, `email`, `site`, `needs` (array), `budget`, and `message` passes validation.
5. `T1_API_05_METHOD_NOT_ALLOWED`: `GET /api/contact` returns HTTP `405 Method Not Allowed`.

#### Feature 10: Route `/not-found` (Custom 404)
1. `T1_404_01_STATUS_CODE`: Request to unknown URL `/nonexistent-test-page-xyz` returns HTTP status `404`.
2. `T1_404_02_ROBOTS_NOINDEX`: Response HTML contains `<meta name="robots" content="noindex" />`.
3. `T1_404_03_H1_TEXT`: Page contains `h1` with `"This page doesn’t exist."`.
4. `T1_404_04_LEDE_TEXT`: Page contains lede `"Head back to the homepage to find what you need."`.
5. `T1_404_05_HOME_LINK`: Page contains CTA `<a class="btn btn-primary" href="/">Go to the homepage</a>`.

---

### 4.2 Tier 2: Boundary, Negative & Corner Case Tests

#### Tier 2 API Cases (`/api/contact`):
1. `T2_API_01_EMPTY_BODY`: `POST /api/contact` with `{}` -> `400 Bad Request`, body `{"error": "invalid"}`.
2. `T2_API_02_EMPTY_STRING_BODY`: `POST /api/contact` with body `""` -> `400 Bad Request`.
3. `T2_API_03_MALFORMED_JSON`: `POST /api/contact` with `"{name: invalid_json"` -> `400 Bad Request`.
4. `T2_API_04_MISSING_EMAIL`: `POST /api/contact` with `{"name": "Alice"}` -> `400 Bad Request`.
5. `T2_API_05_MISSING_NAME`: `POST /api/contact` with `{"email": "alice@example.com"}` -> `400 Bad Request`.
6. `T2_API_06_WHITESPACE_NAME`: `POST /api/contact` with `{"name": "   ", "email": "alice@example.com"}` -> Client trim fails, API fails validation if falsy.
7. `T2_API_07_INVALID_EMAIL_NO_AT`: `POST /api/contact` with `{"name": "Alice", "email": "plainaddress"}` -> `400 Bad Request`.
8. `T2_API_08_INVALID_EMAIL_NO_DOMAIN`: `POST /api/contact` with `{"name": "Alice", "email": "alice@"}` -> `400 Bad Request`.
9. `T2_API_09_INVALID_EMAIL_SPACES`: `POST /api/contact` with `{"name": "Alice", "email": "alice @domain.com"}` -> `400 Bad Request`.
10. `T2_API_10_LARGE_PAYLOAD`: `POST /api/contact` with a 10,000-character `message` -> Truncated cleanly to 4,000 characters without 500 server crash.
11. `T2_API_11_NON_ARRAY_NEEDS`: `POST /api/contact` with `{"name": "Alice", "email": "alice@example.com", "needs": "not-an-array"}` -> Processed safely via `Array.isArray()`, returns 503/200 without TypeError.
12. `T2_API_12_UNSUPPORTED_METHODS`: `PUT /api/contact`, `DELETE /api/contact`, `PATCH /api/contact` all return `405 Method Not Allowed`.

#### Tier 2 Route & Slug Cases:
13. `T2_ROUTE_01_INVALID_SERVICE_SLUG`: `GET /services/quantum-computing-ai` triggers `notFound()` and returns HTTP `404`.
14. `T2_ROUTE_02_CASE_SENSITIVE_SLUG`: `GET /services/AI-AGENTS` returns `404` (slugs are strictly lowercase).
15. `T2_ROUTE_03_TRAILING_SLASH_CONSISTENCY`: `GET /about/` redirects to `/about` or returns 200 without loop.
16. `T2_ROUTE_04_SPECIAL_CHARS_URL`: `GET /%00` or `GET /about?param=<script>` returns safe HTML without script reflection.
17. `T2_ROUTE_05_BRAND_SLUG_PROBLEM_OMISSION`: `GET /services/brand` does NOT render the `"The problem"` kicker or section because `problem: null`.
18. `T2_ROUTE_06_AI_STRATEGY_FIXED_PRICE`: `GET /services/ai-strategy` displays `"$750"` without `"from "` prefix because label is `"Fixed price"`.
19. `T2_ROUTE_07_CAREERS_EMPTY_ROLES`: `GET /careers` does NOT render `"Open roles"` section when `roles: []`.
20. `T2_ROUTE_08_BOOK_BUTTON_FALLBACK`: When `NEXT_PUBLIC_BOOKING_URL` is unset, `BookButton` href is strictly `/contact`.

---

## 5. Verification Method

To independently verify the page routes and API assertions:

1. **Verify Static Page Generation & Status Codes**:
   Run the Next.js production build:
   ```powershell
   cmd /c "npm run build"
   ```
   *Expected Result*: Exit code 0. Confirm all 17 HTML files exist in `.next/server/app/`:
   `index.html`, `about.html`, `careers.html`, `contact.html`, `pricing.html`, `services.html`, `_not-found.html`, and all 9 `.next/server/app/services/*.html`.

2. **Verify API Route Handler Status Codes**:
   Start a local server (`npm run start` on test port, e.g. 3000) and execute curl / fetch:
   ```powershell
   # Valid payload -> expect 503 (or 200 if configured)
   Invoke-RestMethod -Uri "http://localhost:3000/api/contact" -Method POST -ContentType "application/json" -Body '{"name":"Tester","email":"test@example.com"}'
   
   # Invalid payload -> expect 400 Bad Request
   try {
     Invoke-RestMethod -Uri "http://localhost:3000/api/contact" -Method POST -ContentType "application/json" -Body '{"name":"Tester","email":"bad-email"}'
   } catch {
     $_.Exception.Response.StatusCode # Must equal 400
   }
   ```

3. **Verify 404 Response**:
   ```powershell
   try {
     Invoke-WebRequest -Uri "http://localhost:3000/services/unknown-slug"
   } catch {
     $_.Exception.Response.StatusCode # Must equal 404
   }
   ```
