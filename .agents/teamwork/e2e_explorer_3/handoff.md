# E2E Test Exploration Report: Component Structure, Assets, Shared UI & Visual Contracts

**Explorer State Folder**: `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\e2e_explorer_3`  
**Date**: 2026-11-10  
**Target Repositories**: `d:\Space\Faarns\next.js\faarns-web` (Target) & `d:\Space\Faarns\next.js\faarns-2.0` (Reference)

---

## 1. Observation

### 1.1 Footer Replication Requirement (`PROJECT.md §R4` & `faarns-2.0`)
Direct source analysis of `d:\Space\Faarns\next.js\faarns-2.0\src\Components\Layout\Footer.jsx`, `MarketingLayout.jsx`, `PrimaryCtaButton.jsx`, and `src/Components/Icon/*`:

1. **Top CTA Marketing Banner (`MarketingLayout.jsx`)**:
   - **Background Image**: Inline CSS `style={{ backgroundImage: "url('/Light Rays Effect.png')" }}`.
   - **Default Variant (used on `/`, `/about`, `/careers`, `/contact`, `/pricing`, `/services`)**:
     - Heading: `<h2 className="text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] text-black/90 leading-[1.2] tracking-wider">Discover If We’re the Right Fit for Your Brand</h2>` (exact verbatim text).
     - Subheading: `<p className="pt-3 sm:pt-4 text-base sm:text-lg md:text-xl text-[#3A3347] font-normal leading-relaxed">A no-BS call to map out your path from website to revenue.</p>`.
     - Button: `<Link href="/contact" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-white font-medium text-sm sm:text-base rounded-[10px] bg-[#8C75F7] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] hover:bg-[#7B62F0] hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"><span>Let’s Get Started</span><GoArrowUpRight className="text-lg sm:text-xl" /></Link>`.
   - **Bahrain Variant (`variant="bahrain"` or `pathname === "/bahrain"`)**:
     - Heading: `<span className="text-black/75">Ready to grow your business</span><span className="text-black"> in Bahrain?</span>`.
     - Subheading: `From a stronger website to a sharper brand and a digital strategy built to perform, we're here to turn your next idea into measurable growth.`.
     - Primary Button: `<PrimaryCtaButton text="Start Your Project" href="/contact" textClassName="font-medium text-[16px] sm:text-[18px] leading-[160%]" />`.
     - Teardrop shape: `rounded-[4px_40px_40px_40px]`, background `#8C75F7`, shadow inset, with `GoArrowUpRight` icon.

2. **Main Footer Container (`Footer.jsx`)**:
   - **Background Image**: Inline CSS `style={{ backgroundImage: "url('/footerImage.png')" }}` on `<footer className="w-full bg-cover bg-bottom pt-16 sm:pt-20 lg:pt-24 relative overflow-hidden">`.
   - **Logo Box**:
     - `<Link href="/" className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 transition-transform duration-200 hover:scale-105" aria-label="FAARNS Homepage">`
     - `<img src="/logo-black.png" alt="FAARNS Logo" className="w-8 h-8 object-contain" />`
   - **Dynamic Geolocation Phone & Email**:
     - Calls `https://ipapi.co/json/` in `useEffect` and extracts `data.country_code`.
     - Email: `<a href="mailto:faarns@faisal.org" className="hover:text-[#8C75F7] transition-colors">faarns@faisal.org</a>`.
     - Canada (`country === 'CA'`): `<a href="tel:+16132277949" className="hover:text-[#8C75F7] transition-colors">+1 (613) 227-7949</a>`.
     - UK (`country === 'GB'`): `<a href="tel:+447365617024" className="hover:text-[#8C75F7] transition-colors">+44 7365 617024</a>`.
     - Fallback (default / error / other countries): `<a href="tel:+447365617024" className="hover:text-[#8C75F7] transition-colors">+44 7365 617024</a>`.

3. **3-Column Navigation Grid (`Footer.jsx:83-131`)**:
   - Column 1:
     - `<Link href="/#services">Services</Link>`
     - `<Link href="/blogs">Blog</Link>`
   - Column 2:
     - `<Link href="/hiring">Jobs</Link>`
     - `<Link href="/contact">Help center</Link>`
   - Column 3:
     - `<Link href="/#why-choose-us">About us</Link>`
     - `<Link href="/contact">Contact</Link>`

4. **Social Circle Buttons (`Footer.jsx:134-174`)**:
   - Each anchor has styling: `w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C75F7] shadow-[0px_3px_8px_rgba(140,117,247,0.22)] hover:scale-108 hover:shadow-[0px_5px_14px_rgba(140,117,247,0.35)] transition-all duration-200`.
   - Attributes: `target="_blank"`, `rel="noopener noreferrer"`.
   - Anchor 1: `href="https://www.linkedin.com/company/faarns"`, `aria-label="LinkedIn"`, renders `<LinkedInIcon className="w-4 h-4" />`.
   - Anchor 2: `href="https://x.com/Faarns"`, `aria-label="X (formerly Twitter)"`, renders `<XIcon className="w-4 h-4" />`.
   - Anchor 3: `href="https://www.facebook.com/share/1F4kfXq9zC/"`, `aria-label="Facebook"`, renders `<FacebookIcon className="w-4 h-4" />`.
   - Anchor 4: `href="https://www.instagram.com/faarns.ltd/"`, `aria-label="Instagram"`, renders `<InstagramIcon className="w-4 h-4" />`.
   - *TelegramIcon*: Present at `faarns-2.0/src/Components/Icon/TelegramIcon.jsx` and imported at `Footer.jsx:7`.

5. **Giant FAARNS Wordmark SVG Backdrop (`Footer.jsx:178-206`)**:
   - Parent: `<div className="w-full mt-12 sm:mt-16 select-none pointer-events-none">`.
   - SVG: `<svg width="1125" height="224" viewBox="0 0 1125 224" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">`.
   - Path fill uses `url(#paint0_linear_552_142)`.
   - Linear gradient with 3 stops:
     - `<stop stopColor="white" stopOpacity="0.9" />`
     - `<stop offset="0.6" stopColor="white" stopOpacity="0.4" />`
     - `<stop offset="1" stopColor="white" stopOpacity="0.05" />`

6. **Bottom Bar Legal & Copyright (`Footer.jsx:209-228`)**:
   - Copyright: `<p>@ 2025 FAARNS,all rights reserved</p>` (exact verbatim text).
   - Links:
     - `<Link href="/terms-of-services">Terms of services</Link>`
     - Separator: `<span className="text-[#000000]/40 px-1">|</span>`
     - `<Link href="/privacy-policy">Privacy policy</Link>`

7. **Static Asset Verification in `faarns-2.0/public/` vs `faarns-web/public/`**:
   - `footerImage.png`: 433,025 bytes in `faarns-2.0/public/` (missing in `faarns-web/public/` until M2).
   - `logo-black.png`: 3,892 bytes in `faarns-2.0/public/` (missing in `faarns-web/public/` until M2).
   - `Light Rays Effect.png`: 2,349,045 bytes in `faarns-2.0/public/` (missing in `faarns-web/public/` until M2).

---

### 1.2 Navigation Bar (`components/Nav.tsx`)
Direct source analysis of `d:\Space\Faarns\next.js\faarns-web\components\Nav.tsx` and `content/site.ts`:

1. **Brand Mark & Home Link**:
   - `<Link className="brand" href="/" aria-label="FAARNS home"><Mark /><b>FAARNS</b></Link>`.
   - Links directly to root `/`.

2. **Desktop Navigation Links (`siteConfig.nav`)**:
   - Defined items:
     - `{ label: "How we work", href: "/#how" }`
     - `{ label: "AI automation", href: "/services/ai-agents" }`
     - `{ label: "Services", href: "/services" }`
     - `{ label: "Work", href: "/#work" }`
     - `{ label: "Pricing", href: "/pricing" }`
     - `{ label: "About", href: "/about" }`
     - `{ label: "Contact", href: "/contact" }`
   - Active state computation:
     `const isActive = (href: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href);`
     `aria-current={isActive(n.href) ? "page" : undefined}`
   - Behavioral consequence:
     - On `/pricing`: "Pricing" link has `aria-current="page"`.
     - On `/about`: "About" link has `aria-current="page"`.
     - On `/contact`: "Contact" link has `aria-current="page"`.
     - On `/services`: "Services" link has `aria-current="page"`.
     - On `/services/ai-agents`: both "AI automation" (`href="/services/ai-agents"`) and "Services" (`href="/services"`) have `aria-current="page"` because `pathname.startsWith(href)` is true for both.
     - On `/` or hash links (`/#how`, `/#work`): `aria-current` is not set (`undefined`).

3. **Mobile Hamburger Button & Drawer**:
   - Toggle button:
     `<button className="menu-btn" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(!open)}><span /></button>`
     - Closed: `aria-expanded="false"`, `aria-label="Open menu"`.
     - Open: `aria-expanded="true"`, `aria-label="Close menu"`.
   - Body class sync:
     `document.body.classList.toggle("menu-open", open)` — enables CSS to lock background scroll.
   - Drawer container:
     `<div className="drawer" id="drawer" aria-hidden={!open}>`
     - Closed: `aria-hidden="true"`.
     - Open: `aria-hidden="false"`.
   - Drawer links:
     `<Link className="big" href={n.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>`
     - Tabindex dynamically switches between 0 (accessible when drawer open) and -1 (unfocusable when drawer closed).
   - Auto-closing hooks:
     - Keyboard: `window.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); })`.
     - Navigation: `useEffect(() => { setOpen(false); }, [pathname]);` automatically closes drawer upon route transition.

4. **Header CTA Buttons**:
   - Desktop: `<BookButton className="nav-cta" arrow={false} />` renders `<Link className="btn btn-primary nav-cta" href="/contact" data-magnetic="">Book a 30-minute call</Link>`.
   - Drawer: `<BookButton label={settings.ctaLabel} magnetic={false} />` renders `<Link className="btn btn-primary" href="/contact">Book a 30-minute call<Arrow /></Link>`.

---

### 1.3 Shared Interactive Components

#### A. Pricing Table (`components/PriceTable.tsx`)
1. **Interactive Filter Tabs**:
   - Container: `<div className="seg" role="group" aria-label="Filter prices">`.
   - Three buttons:
     - `All`: `aria-pressed={f === "all"}`
     - `Projects`: `aria-pressed={f === "once"}`
     - `Monthly`: `aria-pressed={f === "mo"}`
2. **Pricing Rows**:
   - Rendered inside `<div className="ptable" data-reveal>`.
   - Total rows in `All` filter: **13 rows** (9 services from `services` + 4 add-ons from `pricing.addOns`).
   - Total rows in `Projects` filter: **8 rows** (`ai-agents` $3,000, `workflow-automation` $3,000, `ai-strategy` $750, `web-design` $2,500, `ui-ux` $3,000, `brand` $1,500, `Extra AI agent` $2,000, `Extra landing page` $400).
   - Total rows in `Monthly` filter: **5 rows** (`seo` $2,000/mo, `aeo` $2,000/mo, `paid-ads` $2,000/mo, `Agent monitoring and upkeep` $300/mo, `Site care plan` $150/mo).
3. **Row Elements**:
   - Name column `.s`: Contains `<Link href={`/services/${r.slug}`}>{r.name}</Link>`.
   - Price column `.p`: Contains `{!r.fixed && <small>from</small>}{r.amount}`.
   - Timeline `.t`: String representation (e.g., `Live in 2 to 4 weeks`, `Monthly`).
   - Note `.n`: Description text.

#### B. FAQ Accordion (`components/Faq.tsx`)
1. **Initial State**:
   - State `open = 0`. First item is expanded by default.
   - First item DOM: `<div className="qa open">`, `<button aria-expanded="true">`.
   - Subsequent items DOM: `<div className="qa">`, `<button aria-expanded="false">`.
2. **Toggle Behavior**:
   - `onClick={() => setOpen(open === i ? -1 : i)}`.
   - Clicking an open item toggles it closed (`setOpen(-1)` -> all items have `aria-expanded="false"`).
   - Clicking any closed item expands that item and collapses all other items (strict single-item expansion contract).

#### C. Contact Form (`components/ContactForm.tsx` & `/api/contact/route.ts`)
1. **Form Attributes**:
   - `<form className="form" onSubmit={submit} noValidate data-intro="">`.
2. **Need Pills / Chips**:
   - Multi-select pill buttons for `contact.needs`: `["AI automation", "Website", "Search", "Ads", "Brand", "Not sure yet"]`.
   - DOM: `<button type="button" aria-pressed={needs.includes(n)}>{n}</button>`.
   - Clicking toggles `aria-pressed="true" / "false"` and array inclusion. Multiple pills can be selected simultaneously.
3. **Budget Selector**:
   - `<select name="budget" defaultValue="">`
   - Default option: `<option value="">Choose a range</option>`.
   - 5 options: `["Audit ($750)", "$1,500 to $3,000", "$3,000 to $6,000", "$6,000+", "Monthly retainer (from $2,000/mo)"]`.
4. **Client-Side Validation Errors**:
   - Empty name: `<p className="msg err" role="status" aria-live="polite">Add your name so we know who to reply to.</p>`.
   - Invalid email: `<p className="msg err" role="status" aria-live="polite">Add a work email like you@company.com.</p>`.
5. **Form Submission & API Contract**:
   - Submit button text changes to `"Sending…"` and is `disabled={true}` while awaiting response.
   - POST to `/api/contact` with `{ name, email, site, needs, budget, message }`.
   - Success state: Form resets, needs array clears, `<p className="msg ok" role="status" aria-live="polite">Got it. We’ll be in touch within one business day.</p>`.
   - Server error / missing RESEND keys (503): `<p className="msg err" role="status" aria-live="polite">Your message didn’t send. Try again, or use Book a 30-minute call.</p>`.

#### D. Motion Engine Data Attributes (`lib/motion.ts` & `components/MotionProvider.tsx`)
DOM attributes driving the GSAP + ScrollTrigger + Lenis motion system:
- `data-reveal`: Section/container fade and lift entrance.
- `data-reveal-item`: Staggered child reveals (e.g. cards in `.ladder`, `.rows`).
- `data-split="hero"` | `"scroll"`: Triggers text splitting into words (`.w > .w-i`) with rotation/stagger.
- `data-magnetic`: Attaches mouse pointer magnetic pull on desktop pointers (`BookButton`).
- `data-tilt`: 3D hover perspective tilt on cards (`Ladder` rungs).
- `data-hscroll`, `data-hscroll-track`, `data-hscroll-bar`: Desktop pinned horizontal scroller (`ProcessScroller`).
- `data-intro`: Initial page entrance animations (`ContactForm`, `PageHero` pills).
- `data-flow-status`, `data-flow-step`: Live simulation updates (`Flow.tsx`).
- `data-scrub`: Scroll-synchronized word opacity transition.
- `data-letters`: Character split animation.

---

## 2. Logic Chain

1. **Opaque-Box Testing Strategy**:
   - From *Observation 1.1–1.3*, the application UI is rich with interactive states that expose explicit, testable ARIA attributes (`aria-pressed`, `aria-expanded`, `aria-hidden`, `aria-current`), semantic HTML elements (`<button>`, `<nav>`, `<form>`, `<select>`), and custom data attributes (`data-reveal`, `data-split`, `data-magnetic`).
   - Therefore, opaque-box E2E tests can validate complete functionality purely through HTTP status checks, DOM queries, element interaction events, and attribute assertions without relying on fragile internal state reflection or pixel snapshots.

2. **Footer Replication Fidelity**:
   - From *Observation 1.1*, `PROJECT.md §R4` mandates verbatim replication of the `faarns-2.0` footer.
   - This requires asserting the presence of:
     - 3 public image assets (200 OK, non-empty image bytes).
     - Marketing CTA banner with verbatim heading, paragraph, and link to `/contact`.
     - Geolocation phone numbers (validating default UK `+44 7365 617024` and Canadian `+1 (613) 227-7949`).
     - 3-column navigation links with verbatim targets (`/#services`, `/blogs`, `/hiring`, `/contact`, `/#why-choose-us`).
     - 4 rendered social circle buttons (LinkedIn, X, Facebook, Instagram) with `target="_blank"`, `rel="noopener noreferrer"`.
     - SVG wordmark matching the 1125x224 path and linear gradient stops.
     - Copyright string `@ 2025 FAARNS,all rights reserved` and legal links (`/terms-of-services`, `/privacy-policy`).

3. **Navigation Integrity**:
   - From *Observation 1.2*, the navigation bar maintains synchronization between URL route changes, `aria-current="page"` updates, and mobile drawer state.
   - Tier 3 test suites must verify that interacting with the drawer (open, close, escape key, link click) correctly manipulates `document.body` classes and focus management.

4. **Interactive Component State Machine**:
   - From *Observation 1.3*, `PriceTable` acts as a deterministic 3-state filter (13 -> 8 -> 5 rows).
   - `Faq` enforces a strict single-item disclosure invariant.
   - `ContactForm` enforces dual validation guards (required name, regex email) and multi-pill toggle selection.
   - Cross-feature assertions must test interactions that cross multiple components in sequence.

---

## 3. Caveats

1. **IP Geolocation API Dependency (`https://ipapi.co/json/`)**:
   - In `Footer.jsx`, phone number rendering depends on an external third-party API (`ipapi.co`).
   - If the external API is unreachable or rate-limited during E2E runs, `Footer.jsx` defaults to `country = null` and renders the UK phone number (`+44 7365 617024`). E2E assertions must account for this default fallback, and test Canadian rendering via network interception/mocking if running inside a headless browser harness.
2. **Resend API Credentials in Test Environment**:
   - As observed in `app/api/contact/route.ts`, if `RESEND_API_KEY` is omitted, the API returns HTTP 503 (`not_configured`). The client form correctly handles this by displaying the user-friendly error message. E2E tests verifying client error presentation can safely trigger 503, while testing end-to-end `ok` states requires either dummy credentials or an endpoint mock.
3. **Telegram Icon Import vs Render**:
   - In `faarns-2.0/src/Components/Layout/Footer.jsx`, `TelegramIcon` is imported at line 7, but only LinkedIn, X, Facebook, and Instagram are rendered as social circle buttons. Both the presence of `TelegramIcon.jsx` as a component and the exact 4-anchor DOM contract must be recognized.
4. **Desktop vs Mobile Viewport Media Queries**:
   - The desktop process scroller (`[data-hscroll]`) and mobile hamburger drawer are conditioned on viewport width (1024px breakpoint). E2E runner tests must simulate both viewport dimensions to exercise both code paths.

---

## 4. Conclusion & Test Specification

### 4.1 Tier 3: Cross-Feature Interaction Test Suite
The following 10 combinatorial cross-feature test cases verify multiple components interacting together:

| Test ID | Cross-Feature Interaction | Starting State | User Action | Expected DOM / State Outcome |
|---|---|---|---|---|
| **T3-01** | Mobile Nav Drawer + Route Transition | Viewport 375px on `/` | 1. Click hamburger button (`aria-expanded="false"`)<br>2. Click "Pricing" drawer link | Drawer opens (`aria-expanded="true"`, `body.menu-open`), then closes upon navigation. URL becomes `/pricing`. Nav "Pricing" link has `aria-current="page"`. |
| **T3-02** | Mobile Nav Drawer + Escape Key Dismissal | Viewport 375px on `/services` | 1. Click hamburger button<br>2. Dispatch `keydown` with `key="Escape"` | Drawer closes (`aria-hidden="true"`, `menu-btn[aria-expanded="false"]`), and `body` class `menu-open` is removed immediately. |
| **T3-03** | PriceTable Filter + Dynamic Service Navigation | Viewport 1280px on `/pricing` | 1. Click "Monthly" tab button<br>2. Click service link "SEO" | Table rows filter from 13 down to exactly 5 rows. Clicking "SEO" navigates to `/services/seo`. `/services/seo` page loads with starting price `$2,000/mo`. |
| **T3-04** | PriceTable "Projects" Tab + Add-on Exclusion | On `/pricing` | 1. Click "Projects" tab button (`aria-pressed="true"`) | Exactly 8 rows are rendered. Monthly services ("SEO", "AEO", "Paid ads") and monthly add-ons ("Site care plan", "Agent upkeep") are hidden. |
| **T3-05** | FAQ Accordion Single-Expansion Invariant | On `/` (9 FAQ items) | 1. Verify item 0 open<br>2. Click item 1<br>3. Click item 2<br>4. Click item 2 again | 1. Item 0 is open, others closed.<br>2. Item 1 becomes open, Item 0 collapses.<br>3. Item 2 becomes open, Item 1 collapses.<br>4. Item 2 collapses (0 items open). Invariant: `qa.open` count <= 1 always. |
| **T3-06** | Contact Form Multi-Pill Selection + Validation Error State | On `/contact` | 1. Click pills "AI automation" and "Website"<br>2. Enter name "Morgan"<br>3. Enter invalid email "morgan@"<br>4. Click "Send message" | Form is not submitted. `<p className="msg err">Add a work email like you@company.com.</p>` appears. Both pills remain `aria-pressed="true"`. Name input preserves "Morgan". |
| **T3-07** | Contact Form Budget Dropdown + Empty Name Validation | On `/contact` | 1. Select budget "$3,000 to $6,000"<br>2. Leave name empty<br>3. Enter email "valid@company.com"<br>4. Click "Send message" | Form validation stops submit. `<p className="msg err">Add your name so we know who to reply to.</p>` displays. Budget select retains value "$3,000 to $6,000". |
| **T3-08** | Footer CTA Banner + Contact Form Landing | On `/about` | 1. Scroll to Footer CTA banner<br>2. Click "Let’s Get Started" button | Navigates to `/contact`. Page loads with `<form className="form">` and budget selector. Nav link "Contact" has `aria-current="page"`. |
| **T3-09** | Replicated Footer Phone Geolocation Default | Any page (SSR / initial load) | 1. Inspect footer contact info | Verifies phone link href is `tel:+447365617024` and text contains `+44 7365 617024` as deterministic fallback. |
| **T3-10** | Motion Data Attributes Contract Across All Routes | All 8 core pages & 9 service detail pages | 1. Inspect SSR HTML payload of each route | All pages contain `data-reveal`, `data-split`, and `data-magnetic` on their respective header, CTA, and card elements. |

---

### 4.2 Tier 4: Real-World User Journeys

#### Journey 1: "The AI Automation Seeker" (End-to-End Sales Lead Conversion)
- **Persona**: Operations VP seeking automated customer support and lead response.
- **Steps**:
  1. **Entry**: Visits homepage `/`. Verifies hero headline (`data-split="hero"`), checks the AI sales workflow simulation (`Flow.tsx`) showing 4 steps ("New lead arrives" -> "Call booked").
  2. **Feature Discovery**: Scrolls past "Why FAARNS", reaches "What we automate", clicks card link "More on sales automation" -> navigates to `/services/ai-agents`.
  3. **Evaluation**: On `/services/ai-agents`, reads problem statement, reviews 6 deliverables, verifies starting price `$3,000` with timeline `First agent live in 2 to 4 weeks`.
  4. **FAQ Review**: Expands service FAQ question ("Will it make things up?"), verifies answer disclosure.
  5. **CTA Trigger**: Clicks "Book a 30-minute call" CTA button.
  6. **Form Completion**: Lands on `/contact`. Selects pill "AI automation", selects budget "$3,000 to $6,000", fills name "Sarah Connor", email "sarah@skynet-ops.com", company website "https://skynet-ops.com", message "Need 24/7 lead routing". Submits form.
  7. **Outcome**: Form handles submission feedback appropriately without UI disruption.

#### Journey 2: "The Price-Conscious Brand Founder" (Budget & Scope Audit)
- **Persona**: Startup founder evaluating costs before committing.
- **Steps**:
  1. **Entry via Nav**: Visits `/`, clicks Nav link "Pricing" -> lands on `/pricing`.
  2. **Ladder Review**: Examines 3-step ladder ("Step 1: AI & Growth Audit" at $750, "Step 2: Automation Quick Win" from $3,000, "Step 3: Growth Partner" from $2,000/mo).
  3. **Interactive Filter Exploration**:
     - Clicks "Monthly" tab in PriceTable: confirms only 5 retainer services display.
     - Clicks "Projects" tab: confirms 8 fixed-scope project rows display.
     - Clicks "All" tab: confirms all 13 rows display.
  4. **Deep Dive**: Clicks "Web design & development" from the table -> lands on `/services/web-design` (price: $2,500).
  5. **Footer CTA Conversion**: Scrolls to replicated Footer Marketing Layout ("Discover If We’re the Right Fit for Your Brand"), clicks "Let’s Get Started" -> lands on `/contact`.
  6. **Pill & Budget Match**: Selects "Website" and "Brand" pills, chooses "Audit ($750)" budget option.

#### Journey 3: "The Mobile First Visitor" (Small Screen Navigation & Footer Check)
- **Persona**: Prospective client browsing on a mobile device (375x667).
- **Steps**:
  1. **Mobile Header**: On `/`, verifies desktop nav links are hidden and mobile hamburger button is visible with `aria-expanded="false"`.
  2. **Drawer Interaction**: Taps hamburger button. Verifies `aria-expanded="true"`, `document.body` has class `menu-open`, and drawer slides in with `aria-hidden="false"`.
  3. **Drawer Navigation**: Taps "About" link inside the drawer.
  4. **Page Transition**: Route changes to `/about`. Drawer closes automatically, `body` class `menu-open` is cleared.
  5. **Footer Inspection on Mobile**:
     - Scrolls to footer. Verifies responsive stacking (logo box, contact info, 3 navigation columns, social icons).
     - Verifies FAARNS giant wordmark SVG scales cleanly to mobile width (`w-full h-auto`).
     - Verifies legal links and copyright statement are visible.

#### Journey 4: "The Due-Diligence Agency Researcher" (Brand Trust & Credibility Check)
- **Persona**: Enterprise buyer verifying company registration, social channels, and legal standing.
- **Steps**:
  1. **About Page Audit**: Navigates to `/about`. Verifies company intro, beliefs ("Outcomes over output", "Straight talk"), and team distribution statement.
  2. **Careers Check**: Navigates to `/careers`. Verifies remote culture perks ("Fully remote", "Flexible hours", "Global clients").
  3. **Social Verification**: In replicated footer, inspects all 4 social circle icons:
     - LinkedIn: confirms `href="https://www.linkedin.com/company/faarns"`, `target="_blank"`, `rel="noopener noreferrer"`.
     - X: confirms `href="https://x.com/Faarns"`, `target="_blank"`, `rel="noopener noreferrer"`.
     - Facebook: confirms `href="https://www.facebook.com/share/1F4kfXq9zC/"`, `target="_blank"`, `rel="noopener noreferrer"`.
     - Instagram: confirms `href="https://www.instagram.com/faarns.ltd/"`, `target="_blank"`, `rel="noopener noreferrer"`.
  4. **Legal Pages**: Checks footer links to `/terms-of-services` and `/privacy-policy`.
  5. **Direct Contact**: Verifies email `mailto:faarns@faisal.org` and phone `tel:+447365617024`.

#### Journey 5: "The Service Catalog Explorer" (Broad Multi-Service Survey)
- **Persona**: Client needing a bundled agency engagement across AI and Growth.
- **Steps**:
  1. **Services Index**: Visits `/services`. Verifies all 9 services are listed under their respective groups ("AI automation" and "Growth").
  2. **Service Detail Inspection**: Navigates to `/services/workflow-automation`. Checks deliverables (n8n, Make, Zapier automations).
  3. **Breadcrumb / Nav Return**: Uses Nav "Services" link to return to `/services`, then visits `/services/seo`.
  4. **Consistency Assertion**: Checks that pricing and deliverables match `content/site.ts` specifications on every page.
  5. **Closer CTA**: Clicks closer CTA button "Book a 30-minute call" -> converts to `/contact`.

---

## 5. Verification Method

To independently verify these contracts and assertions:

1. **Verify Static Asset File Presence & Content-Type**:
   ```powershell
   # Confirm assets exist in faarns-2.0 and verify size
   Get-Item "d:\Space\Faarns\next.js\faarns-2.0\public\footerImage.png"
   Get-Item "d:\Space\Faarns\next.js\faarns-2.0\public\logo-black.png"
   Get-Item "d:\Space\Faarns\next.js\faarns-2.0\public\Light Rays Effect.png"
   ```

2. **Verify Navigation & Active State via Static Analysis or HTTP DOM**:
   - Check `Nav.tsx:19`: active class uses `pathname.startsWith(href)`.
   - Run `node scripts/run-e2e.mjs` (or test runner) asserting `<Link aria-current="page">` across `/pricing`, `/about`, `/contact`, `/services`.

3. **Verify PriceTable Row Filtering Invariants**:
   - Query `.ptable .prow` count:
     - `All`: exactly 13 rows.
     - `Projects`: exactly 8 rows.
     - `Monthly`: exactly 5 rows.

4. **Verify FAQ Expansion Invariant**:
   - Query `.faq .qa.open` count:
     - Initial load: exactly 1 (`qa.open` on index 0).
     - After clicking index 0: exactly 0.
     - After clicking index 1: exactly 1 (`qa.open` on index 1).

5. **Verify Contact Form Validation Errors**:
   - Query `.msg.err` text after submitting empty form: `Add your name so we know who to reply to.`.
   - Query `.msg.err` text after submitting name with invalid email: `Add a work email like you@company.com.`.

6. **Invalidation Conditions**:
   - Any modification to `content/site.ts` service list or pricing structure invalidates exact row counts (13 / 8 / 5).
   - Any modification to `MarketingLayout` text ("Discover If We’re the Right Fit for Your Brand") breaks verbatim R4 footer replication.
   - Any omission of `target="_blank"` or `rel="noopener noreferrer"` on footer social anchors breaks security contracts.
