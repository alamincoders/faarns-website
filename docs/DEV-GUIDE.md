# FAARNS website — developer guide (step by step)

Read this once, then use the "I want to…" recipes. Every file also has `DEV NOTE` comments where changes usually happen.

## 0. Setup (once)

1. `npm install`
2. `cp .env.example .env.local` and fill in:
   - `NEXT_PUBLIC_BOOKING_URL` → Calendly / Cal.com link (every "Book a 30-minute call" button)
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL` → contact form delivery (https://resend.com)
   - `NEXT_PUBLIC_SITE_URL` → production URL
3. `npm run dev` → http://localhost:3000

## 1. Map of the project

| Path | What it is |
| --- | --- |
| `content/site.ts` | **All copy, prices, services, FAQs, work cases, nav, footer.** Start here for 90% of changes. |
| `app/` | Pages (App Router). `page.tsx` = homepage, `services/[slug]` = every service page. |
| `app/globals.css` | Design tokens (colors, type, spacing) + layout styles. |
| `app/visuals.css` | Illustrations, hover previews, work previews, photo bands. |
| `components/Visuals.tsx` | Code-drawn illustrations (website, search, ads, brand, chat, CRM, AI vision…) and the violet light lines. |
| `components/` | Nav, footer, buttons, FAQ, pricing table, hero demo, contact form. |
| `lib/motion.ts` | All animation (GSAP + ScrollTrigger + Lenis), driven by `data-*` attributes. |
| `public/images/` | Photos (team, AI vision). `public/work/` for client screenshots. |
| `preview/` | Builds the single-file shareable preview (`npm run preview`). |

## 2. I want to…

**Change any text or price**
1. Open `content/site.ts`.
2. Find the section (they are named like the page: `home`, `pricing`, `about`…).
3. Edit the string. Save. Done — every page that uses it updates.

**Change prices**
1. Ladder (Audit / Quick Win / Growth Partner): `pricing.ladder`.
2. Per-service price + timeline: `services[n].price`.
3. Add-ons: `pricing.addOns`.
4. Also check the text mentions: search the file for `$` (FAQ answers, `pricing.promises`, `contact.budgets`).

**Add a service**
1. Copy one object in `services` in `content/site.ts`.
2. Give it a new `slug`, `group` ("AI automation" or "Growth") and a `visual` (see list below).
3. Its page (`/services/<slug>`), the services list, the homepage chip and the pricing row appear automatically.

**Change a hero-demo tab (Sales & CRM, Meta ads, SEO & AEO, AI vision, Support)**
1. Edit `home.flow.scenarios` in `content/site.ts`. Each scenario = `tab` + exactly 4 `steps`.
2. Order of the array = order of the tabs.

**Change or add an illustration**
1. Available names: `website`, `search`, `ads`, `brand`, `ui`, `chat`, `crm`, `audit`, `answer`, `vision`.
2. Set `visual: "<name>"` on a card (`home.automate.cards`), a row (`home.growth.rows`) or a service.
3. New illustration: add a `case` in `components/Visuals.tsx`, style it under `.vis-<name>` in `app/visuals.css`.

**Use a real photo or stock image**
1. Put the file in `public/images/` (dark or moody photos look best; keep under ~300 KB).
2. Use `<Visual name="photo" photo="/images/your-file.jpg" />` to get the dark violet treatment, or a plain `<img>`.
3. Only use images you have the rights to (your own, Unsplash/Pexels free licence). Don't use Unsplash+ previews: they're paid and watermarked.

**Add a real screenshot to a work case**
1. Save a 1600×1000 screenshot to `public/work/presio.jpg` (for example).
2. In `home.work.cases`, add `image: "/work/presio.jpg"` to that case. The mock is replaced by the screenshot; hover still scrolls it.

**Add a client to Work**
1. Add an object to `home.work.cases` with `client`, `sector`, `result`, `url`, `domain`, `accent` (brand color) and `preview` (copy from their hero).

**Change colors or fonts**
1. Colors: CSS variables at the top of `app/globals.css` (`--violet` is the brand accent; everything follows it).
2. Fonts: `app/layout.tsx`.

**Tune or add an animation**
1. Read the header of `lib/motion.ts`: each effect is a `data-*` attribute you add in JSX.
2. To change speed/feel, edit the matching block (each has a comment).
3. Everything respects reduced-motion; keep new effects inside the `if (!motion) return;` guard.

**Turn off the loading screen**
1. `settings.preloader = false` in `content/site.ts`.

**Hook the contact form to your CRM instead of email**
1. Edit `app/api/contact/route.ts`: replace the Resend `fetch` with your CRM's API call (HubSpot, etc.). Keep the validation.

## 3. Ship it

1. `npm run build` must pass.
2. Push to GitHub → import on Vercel → add the env vars → deploy.
3. Optional: `npm run preview` → `dist/faarns-preview.html` (one shareable file).

## 4. Checklist before launch

- [ ] Booking link and contact email env vars set
- [ ] Prices confirmed (Audit $299, Quick Win from $1,799, Growth Partner from $1,399/mo; others in `content/site.ts`)
- [ ] Real screenshots for work cases (optional, mocks work without them)
- [ ] Social links in `footer.social`
- [ ] Open roles in `careers.roles` (list hides when empty)
