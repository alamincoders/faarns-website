# E2E Test Harness & Runner Architecture Investigation Report

## 1. Observation

### 1.1 Environment and Node Runtime
- **Operating System**: Windows (AMD64). PowerShell Profile execution triggers `PSSecurityException`:
  ```
  File C:\Users\HP\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1 cannot be loaded because running scripts is disabled on this system.
  ```
- **Node.js**: `v22.19.0` (confirmed via `node -v`).
- **Package Manager**:
  - `npm -v` fails under standard PowerShell due to execution policy blocking `npm.ps1`.
  - `npm.cmd -v` succeeds with code 0 and reports version `11.6.2`.
- **Global APIs in Node 22**: Built-in native `fetch`, `Headers`, `Request`, `Response`, `FormData`, `AbortController`, `crypto.randomUUID()`, `ReadableStream`. No third-party HTTP client libraries are needed.

### 1.2 Package and Module Configuration
- **`package.json`** (`d:\Space\Faarns\next.js\faarns-web\package.json`):
  - Does NOT declare `"type": "module"`. Therefore, `.js` files default to CommonJS. All ES module scripts must use the `.mjs` extension (e.g., `scripts/run-e2e.mjs`, `tests/**/*.mjs`).
  - Core dependencies: `next: 15.5.26`, `react: 19.1.10`, `react-dom: 19.1.10`, `geist: 1.8.1`, `gsap: 3.15.0`, `lenis: 1.3.27`.
  - Dev dependencies: `@types/node: 20.17.50`, `@types/react: 19.1.10`, `@types/react-dom: 19.1.6`, `esbuild: 0.25.10`, `typescript: 5.8.3`.
  - Existing scripts: `dev`, `build`, `start`, `lint`, `preview`.
- **`tsconfig.json`** (`d:\Space\Faarns\next.js\faarns-web\tsconfig.json`):
  - `"paths": { "@/*": ["./*"] }` (pending migration to `./src/*` in M1).
  - Target `ES2020`, module resolution `bundler`, strict mode enabled.
- **`next.config.mjs`** (`d:\Space\Faarns\next.js\faarns-web\next.config.mjs`):
  - `const nextConfig = { reactStrictMode: true }; export default nextConfig;`
  - Output is standard server mode (not `output: 'export'`), which generates static HTML files in `.next/server/app/` while also serving dynamic SSR and API routes.

### 1.3 Next.js Server Execution on Windows
- Next.js binary location: `require.resolve('next/dist/bin/next')` resolves to `D:\Space\Faarns\next.js\faarns-web\node_modules\next\dist\bin\next`.
- Spawning Next.js directly via `node.exe`:
  ```powershell
  node ./node_modules/next/dist/bin/next start -p 38472
  ```
  Result:
  ```
     ▲ Next.js 15.5.26
     - Local:        http://localhost:38472
     - Network:      http://192.168.10.169:38472

   ✓ Starting...
   ✓ Ready in 578ms
  ```
- Direct HTTP fetch to `http://localhost:38472/` returned `HTTP 200` with 73,499 bytes of HTML, matching the pre-rendered index.
- Windows Process Management:
  - `where.exe taskkill` confirmed `C:\Windows\System32\taskkill.exe` is available.
  - Calling `taskkill /pid <PID> /T /F` reliably terminates the Next.js process tree without leaving orphaned background processes holding open ports.

### 1.4 Route Inventory and Static Generation
Inspection of `.next/server/app` confirmed pre-rendered HTML for:
- Root routes: `index.html` (`/`), `about.html` (`/about`), `careers.html` (`/careers`), `contact.html` (`/contact`), `pricing.html` (`/pricing`), `services.html` (`/services`), `_not-found.html` (`/404`).
- All 9 dynamic service slugs (`.next/server/app/services/[slug]`):
  1. `ai-agents.html` (`/services/ai-agents`)
  2. `workflow-automation.html` (`/services/workflow-automation`)
  3. `ai-strategy.html` (`/services/ai-strategy`)
  4. `web-design.html` (`/services/web-design`)
  5. `ui-ux.html` (`/services/ui-ux`)
  6. `seo.html` (`/services/seo`)
  7. `aeo.html` (`/services/aeo`)
  8. `paid-ads.html` (`/services/paid-ads`)
  9. `brand.html` (`/services/brand`)
- API Route: `api/contact/route.js` handling `POST /api/contact`.

### 1.5 Contract & Verbatim Requirements from Reference Projects
- **Footer Verbatim Requirements** (from `d:\Space\Faarns\next.js\faarns-2.0\src\Components\Layout\Footer.jsx` and `MarketingLayout.jsx`):
  1. Background cover: `url('/footerImage.png')`.
  2. Top CTA Banner (`MarketingLayout.jsx`): Background `url('/Light Rays Effect.png')`, heading `"Discover If We’re the Right Fit for Your Brand"`, button `"Let’s Get Started"` linking to `/contact` with `GoArrowUpRight` icon. (Or Bahrain variant when applicable).
  3. Brand Logo Box: `<a>` linking to `/` containing `<img src="/logo-black.png" alt="FAARNS Logo">`.
  4. Contact Info: `mailto:faarns@faisal.org`, dynamic country telephone: `+1 (613) 227-7949` for CA, `+44 7365 617024` for GB / default.
  5. Navigation Columns (3 cols):
     - Col 1: Services (`/#services` or `/services`), Blog (`/blogs`)
     - Col 2: Jobs (`/hiring` or `/careers`), Help center (`/contact`)
     - Col 3: About us (`/#why-choose-us` or `/about`), Contact (`/contact`)
  6. Social Circle Buttons: 5 circular SVG icons linking to:
     - LinkedIn (`https://www.linkedin.com/company/faarns`)
     - X / Twitter (`https://x.com/Faarns`)
     - Facebook (`https://www.facebook.com/share/1F4kfXq9zC/`)
     - Instagram (`https://www.instagram.com/faarns.ltd/`)
     - Telegram (icon component present)
  7. Giant FAARNS Wordmark: `<svg viewBox="0 0 1125 224">` containing paths with linear gradient `paint0_linear_552_142`.
  8. Copyright Bar: `@ 2025 FAARNS,all rights reserved`, terms link `/terms-of-services`, privacy link `/privacy-policy`.
- **API Contract `/api/contact`** (`app/api/contact/route.ts`):
  - Request format: JSON `{ name, email, site?, needs?, budget?, message? }`.
  - Validation:
    - Missing body or missing `name` or missing/invalid `email` -> HTTP `400` with `{ error: "invalid" }`.
    - If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` not set -> HTTP `503` with `{ error: "not_configured" }`.
    - Valid submission when configured -> calls Resend API, returns `200` with `{ ok: true }` or `502` if send fails.
- **Motion Engine Hooks** (`MotionProvider.tsx`):
  - HTML tags declare: `data-reveal`, `data-split`, `data-scroll`, `data-magnetic`, `data-stack`, `data-hscroll`.

---

## 2. Logic Chain

1. **Why zero-dependency Node.js test runner**:
   - `faarns-web` has minimal dev dependencies (no Vitest, Jest, Playwright, or Cypress installed).
   - Adding heavy browser automation frameworks (e.g. Playwright / Chromium) on Windows requires large binaries (100MB+), complex PowerShell script permissions, and slow initialization.
   - All 28 features in `PROJECT.md` and `SCOPE.md` are server-rendered Next.js routes, static assets, DOM markup contracts, and JSON API endpoints.
   - Node v22.19.0 includes high-performance native `fetch`, `AbortController`, and modern ES modules.
   - Therefore, a custom, standalone Node.js test runner (`scripts/run-e2e.mjs`) provides sub-second execution, zero external installation hurdles, and 100% Windows compatibility.

2. **Why ephemeral port allocation and direct binary execution**:
   - Spawning Next.js on hardcoded port 3000 will fail if port 3000 is occupied by a running dev server.
   - By creating a temporary `net.createServer().listen(0)` and reading `.address().port`, the test harness acquires an available ephemeral port deterministically.
   - Spawning `process.execPath` with `require.resolve('next/dist/bin/next')` bypasses `npm.ps1` PowerShell execution policy restrictions and avoids shell escaping bugs.
   - Polling `http://127.0.0.1:<port>/` until HTTP 200 ensures tests never start prematurely.
   - In a `finally` block or process signal handler, invoking `taskkill.exe /pid <child.pid> /T /F` guarantees all child worker processes are killed on Windows.

3. **Why pure JS DOM & HTML assertion helpers**:
   - Next.js emits static HTML strings.
   - A dedicated helper module (`tests/helpers/dom.mjs`) can parse HTML tags, attributes, links, images, inputs, and SVG paths using reliable regex patterns and structural analyzers.
   - This provides expressive assertions (e.g. `expect(dom.findLink('/contact')).toBeTruthy()`, `expect(dom.extractImages()).toContainEqual({ src: '/logo-black.png', alt: 'FAARNS Logo' })`) without needing `jsdom` or browser emulators.

4. **Why 5-tier test architecture**:
   - **Tier 1 (Functional & Routes)**: Verifies every single route, status code, page structure, verbatim footer element, and API response under baseline conditions (at least 5 tests per feature).
   - **Tier 2 (Boundary & Negative)**: Verifies error handling, non-existent slugs (404), custom 404 page content, malformed API requests, missing fields, invalid email syntax, and HTTP method restrictions (405).
   - **Tier 3 (Pairwise & Combinatorial)**: Tests combinations of pricing tabs and services, contact form pill selections, budget tiers, and cross-route link matrices.
   - **Tier 4 (End-to-End User Journeys)**: Simulates sequential multi-step client workflows (discovery -> service inspection -> pricing evaluation -> contact submission).
   - **Tier 5 (Adversarial & Hardening)**: Validates concurrent request bursts (50-100 parallel fetches), payload limits (10MB body), header fuzzing, and XSS/injection protection in HTML.

---

## 3. Caveats

1. **Pre-build Requirement**:
   - `next start` requires `.next` to be compiled (`npm.cmd run build` or `next build`). If `.next` is missing, the test runner must detect this and either run a build automatically or inform the user.
2. **Client-Side Hydration Interactions**:
   - Pure HTTP/HTML opaque-box testing validates the full server-rendered DOM and pre-rendered client components, but does not run a full Chromium V8 engine to execute in-browser JavaScript event listeners (e.g., clicking a button without navigation).
   - Dynamic client state transitions (like tab switching in `PriceTable.tsx` or accordion toggling in `Faq.tsx`) are verified by validating pre-rendered DOM hooks, tab datasets, and interactive attributes, or testing dynamic API state.
3. **External Email Dispatch in `/api/contact`**:
   - Without live `RESEND_API_KEY` and `CONTACT_TO_EMAIL`, `/api/contact` returns `503 not_configured`. The test suite accounts for this by verifying `503` on valid submissions when unconfigured, while still testing `400` validation failures for invalid payloads.

---

## 4. Conclusion & Recommended Architecture

The E2E Test Harness & Runner must be organized as follows:

### 4.1 File Layout
```
scripts/
└── run-e2e.mjs                        # Main CLI entry point
tests/
├── helpers/
│   ├── runner.mjs                     # Test registry, describe/it/expect, timeout, tier categorizer
│   ├── server.mjs                     # Server launcher, ephemeral port picker, Windows taskkill teardown
│   ├── http.mjs                       # Native fetch HTTP client wrapper with duration tracking
│   ├── dom.mjs                        # HTML parser, tag/attribute extractors, regex DOM assertions
│   └── reporter.mjs                   # ANSI colored terminal reporter with summary table & tier breakdown
├── tier1-functional/
│   ├── routes.test.mjs                # All 8 static routes + meta
│   ├── services.test.mjs              # 9 dynamic service slug routes + deliverables + pricing + FAQs
│   ├── footer.test.mjs                # Verbatim faarns-2.0 footer elements, icons, phone numbers, SVG
│   ├── navigation.test.mjs            # Sticky nav, brand logo, mobile hamburger drawer
│   ├── contact-form.test.mjs          # Contact page inputs, pills, budget options
│   ├── pricing-table.test.mjs         # Pricing tiers, ladder steps, filter tabs
│   ├── static-assets.test.mjs         # Image assets, fonts, favicon
│   ├── api-contact.test.mjs           # /api/contact endpoint behaviors
│   └── motion-attributes.test.mjs     # Data attributes (data-reveal, data-split, etc.)
├── tier2-boundary/
│   ├── not-found.test.mjs             # Nonexistent routes, invalid slugs, custom 404 page checks
│   ├── api-validation.test.mjs        # Missing fields, bad emails, empty bodies, non-JSON types, GET/PUT
│   └── extreme-inputs.test.mjs        # Unicode strings, oversized query parameters, script tag escaping
├── tier3-pairwise/
│   ├── pricing-filters.test.mjs       # Pricing tab & service combinations
│   ├── contact-combinations.test.mjs  # Combinatorial test of pills, budget tiers, and website URLs
│   ├── route-link-matrix.test.mjs     # Crawler verifying all internal links return HTTP 200
│   └── geolocation-headers.test.mjs   # Geolocation header simulation (CA, GB, default)
├── tier4-journeys/
│   ├── journey-enterprise-lead.test.mjs   # Multi-step discovery, service inspection, contact inquiry
│   ├── journey-service-audit.test.mjs     # AI audit discovery, deliverable review, booking navigation
│   └── journey-career-seeker.test.mjs     # Applicant reviewing culture, positions, footer links
└── tier5-adversarial/
    ├── concurrency-stress.test.mjs    # 50-100 parallel requests without 5xx errors
    ├── oversized-payload.test.mjs     # 10MB payload rejection / memory safety
    └── security-headers.test.mjs      # Header injection and sensitive file path traversal
```

### 4.2 Helper API Specifications

#### `tests/helpers/runner.mjs`
```javascript
// Provides describe, it/test, beforeAll, afterAll, beforeEach, afterEach, expect
export function describe(name, fn)
export function it(name, fn, options = { tier: 1, timeout: 10000 })
export const test = it;
export function beforeAll(fn)
export function afterAll(fn)
export function expect(actual) // .toBe, .toEqual, .toContain, .toMatch, .toBeDefined, .toThrow, .not.*
```

#### `tests/helpers/server.mjs`
```javascript
// Ephemeral port selection, server spawn, health polling, Windows taskkill teardown
export async function startTestServer(options = {}) {
  // 1. If options.url or env.BASE_URL is set, ping and reuse existing server
  // 2. Otherwise, getFreePort() via net.createServer()
  // 3. Verify .next/BUILD_ID exists; run `node ./node_modules/next/dist/bin/next build` if missing
  // 4. Spawn `node ./node_modules/next/dist/bin/next start . -p <port> -H 127.0.0.1`
  // 5. Poll http://127.0.0.1:<port>/ until 200 OK (max 15s)
  // 6. Return { baseUrl, port, pid, stop() }
  // 7. stop() calls taskkill /pid <pid> /T /F on win32
}
```

#### `tests/helpers/http.mjs`
```javascript
// Native fetch client with timing, header injection, and cookie support
export function createHttpClient(baseUrl) {
  return {
    async get(path, opts = {}),
    async post(path, body, opts = {}),
    async head(path, opts = {}),
    async request(method, path, opts = {})
    // Returns { status, ok, headers, text(), json(), durationMs, url }
  };
}
```

#### `tests/helpers/dom.mjs`
```javascript
// Pure JS HTML parser and DOM assertion helpers
export function parseHtml(html) {
  return {
    title(),                           // extracts <title>
    meta(nameOrProp),                  // extracts <meta name="..." content="...">
    links(),                           // extracts [{ href, text, target, rel, classes }]
    images(),                          // extracts [{ src, alt, classes }]
    inputs(),                          // extracts [{ name, type, id, required, placeholder }]
    forms(),                           // extracts [{ action, method, inputs }]
    svgs(),                            // extracts [{ viewBox, paths }]
    dataAttributes(attrName),          // extracts values for data-* attributes
    hasText(strOrRegex),               // boolean presence
    find(selectorRegex)                // raw regex matching
  };
}
```

#### `tests/helpers/reporter.mjs`
```javascript
// ANSI color formatter, tier-based summary table, test timing, failure details
export function formatReport(results)
export function printSummary(results) // Exits process with 0 if all pass, 1 if any fail
```

### 4.3 Proposed Specification for `TEST_INFRA.md`
`TEST_INFRA.md` must be created in the project root with the following sections:
1. **Runner Invocations**:
   - `node scripts/run-e2e.mjs` (All tiers)
   - `node scripts/run-e2e.mjs --tier=1,2,3,4` (Required for M4 acceptance)
   - `node scripts/run-e2e.mjs --tier=1` (Specific tier)
   - `node scripts/run-e2e.mjs --url=http://localhost:3000` (Running server)
   - `node scripts/run-e2e.mjs --filter="footer"` (Filter by name)
2. **Tier Architecture and Standards**: Clear definition of Tiers 1 through 5.
3. **Feature Test Matrix**: Tabular mapping of each of the 28 features to test files and assertions.
4. **Helper Utility Reference**: Documentation for `runner.mjs`, `server.mjs`, `http.mjs`, `dom.mjs`, and `reporter.mjs`.
5. **Windows Execution Details**: Guidance on Node v22, ephemeral port assignment, process tree teardown, and npm execution policy circumvention.

---

## 5. Verification Method

### 5.1 Independent Verification Commands
1. **Verify Node.js Version and Native Fetch**:
   ```powershell
   node -e "console.log(process.version, typeof fetch)"
   # Expected output: v22.19.0 function
   ```
2. **Verify Ephemeral Next.js Server Start & Teardown**:
   ```powershell
   node -e "
   const { spawn, execSync } = require('child_process');
   const nextBin = require.resolve('next/dist/bin/next');
   const p = spawn(process.execPath, [nextBin, 'start', '.', '-p', '39123', '-H', '127.0.0.1'], { stdio: 'ignore' });
   setTimeout(async () => {
     try {
       const res = await fetch('http://127.0.0.1:39123/');
       console.log('Status:', res.status);
     } finally {
       execSync('taskkill /pid ' + p.pid + ' /T /F');
       console.log('Server stopped.');
     }
   }, 2000);
   "
   # Expected output:
   # Status: 200
   # Server stopped.
   ```
3. **Verify Windows Process Tree Teardown**:
   ```powershell
   Get-Process -Name "node" -ErrorAction SilentlyContinue
   # Confirm no rogue node instances remain after taskkill
   ```
4. **Verify Dynamic Import Path Compatibility on Windows**:
   ```powershell
   node -e "const { pathToFileURL } = require('url'); console.log(pathToFileURL(process.cwd()).href);"
   # Expected output: file:///D:/Space/Faarns/next.js/faarns-web
   ```

### 5.2 Invalidation Conditions
- If Next.js is configured in `output: 'export'` mode (which would disable API routes like `/api/contact`).
- If Windows PowerShell execution policy blocks `node.exe` directly (already verified: `node.exe` is completely unblocked; only `.ps1` scripts are restricted).
- If server startup times on slower CI machines exceed 15 seconds (mitigated by configurable startup timeout in `startTestServer`).
