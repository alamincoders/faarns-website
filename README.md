# FAARNS website (Next.js)

AI automation and growth, under one roof. Next.js 15 (App Router) + TypeScript, GSAP + ScrollTrigger, Lenis smooth scroll.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Deploy: push to GitHub and import the repo on Vercel (zero config). Add the env vars from `.env.example` in Vercel → Settings → Environment Variables.

## Where to change things

| You want to change… | Edit |
| --- | --- |
| Any copy, prices, services, FAQs, nav, footer links | `content/site.ts` (single source of truth) |
| Booking link for every “Book a 30-minute call” button | `NEXT_PUBLIC_BOOKING_URL` env var |
| Where contact-form messages go | `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (and optional `CONTACT_FROM_EMAIL`) env vars; logic in `app/api/contact/route.ts` |
| Colors, type scale, spacing | CSS variables at the top of `app/globals.css` (`--violet`, `--ink`, `--paper`…) |
| Fonts | `app/layout.tsx` (Archivo variable is self-hosted in `app/fonts`, Geist via the `geist` package) |
| Animations | `lib/motion.ts` |
| Case-study images | Put files in `public/work/` and add `image` / `href` to `home.work.cases` in `content/site.ts` |
| Social links | `footer.social` in `content/site.ts` |
| Job openings | `careers.roles` in `content/site.ts` (the list hides itself when empty) |
| Turn off the first-visit loader | `settings.preloader = false` |

Adding a service: add an object to `services` in `content/site.ts`. Its page at `/services/<slug>`, its row on `/services`, its chip on the homepage and its line in the pricing table appear automatically.

## Animations (data attributes)

All motion is driven by attributes, so you can add or remove it in JSX without touching the engine:

| Attribute | Effect |
| --- | --- |
| `data-split="hero"` / `"scroll"` | Words rise in (hero runs after the loader) |
| `data-scrub` | Words light up as you scroll past |
| `data-reveal` (+ `data-reveal-item` children) | Fade and lift in, staggered |
| `data-parallax="0.2"` | Vertical drift at that speed |
| `data-marquee="34"` + `data-marquee-track` | Endless strip that speeds up and reverses with scroll velocity |
| `data-stack` + `data-stack-card` | Sticky cards that scale back as the next arrives |
| `data-hscroll` + `data-hscroll-track` (+ `data-hscroll-bar`) | Pinned horizontal scroll on desktop, stacked on mobile |
| `data-magnetic` | Button follows the pointer (desktop) |
| `data-tilt` | 3D tilt on hover (desktop) |
| `data-count="50"` | Counts up on enter |
| `data-letters` | Letters rise one by one |
| `data-cursor="View"` | Custom cursor shows a label |

Global: Lenis smooth scroll, custom cursor (fine pointers only), first-visit preloader, violet curtain between pages. Everything respects `prefers-reduced-motion` and the heavy desktop effects switch off on touch devices.

## Shareable single-file preview

`npm run preview` builds `dist/faarns-preview.html`, one self-contained file of the whole site (hash routes, same animations). Useful for sharing a link before deploying. It can't send the contact form; the real site does.
