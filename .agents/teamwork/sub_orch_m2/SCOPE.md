# Scope: Milestone 2 - Verbatim Footer Replication (Requirement R4)

## Architecture
Replicate the complete Footer component hierarchy and visual assets from `d:\Space\Faarns\next.js\faarns-2.0` verbatim into `faarns-web`:
- Static assets copied to `public/`: `footerImage.png`, `logo-black.png`, `Light Rays Effect.png`.
- Icon components under `src/components/icons/`: `LinkedInIcon.tsx`, `XIcon.tsx`, `FacebookIcon.tsx`, `InstagramIcon.tsx`, `TelegramIcon.tsx`.
- Button component under `src/components/ui/`: `PrimaryCtaButton.tsx`.
- Layout components under `src/components/layout/`: `MarketingLayout.tsx`, `Footer.tsx`.
- Integration into `src/app/layout.tsx` mounting `<Footer />`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 7 | Footer Image Assets | Copy `footerImage.png`, `logo-black.png`, and `Light Rays Effect.png` from `faarns-2.0/public/` to `faarns-web/public/` | M2 | Survey (R4) |
| 8 | Footer SVG Icons | Replicate 5 social icons (`LinkedInIcon`, `XIcon`, `FacebookIcon`, `InstagramIcon`, `TelegramIcon`) from `faarns-2.0` in `src/components/icons/` | M2 | Survey (R4) |
| 9 | Primary CTA Button | Replicate `PrimaryCtaButton.tsx` with teardrop shape, `GoArrowUpRight` icon, and hover styling | M2 | Survey (R4) |
| 10 | Marketing CTA Banner | Replicate `MarketingLayout.tsx` with light rays background, heading, subheading, and CTA button | M2 | Survey (R4) |
| 11 | Main Footer Component | Replicate `Footer.tsx` with dynamic IP geolocation (UK/CA phone numbers), 3-column navigation, and FAARNS wordmark SVG | M2 | Survey (R4) |
| 12 | Layout Integration of Footer | Replace legacy footer in `src/app/layout.tsx` with replicated `faarns-2.0` footer | M2 | Survey (R4) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M2 | Verbatim Footer Replication (R4) | Complete 2B iteration cycle: 3 Explorers, 1 Worker, 2 Reviewers, 2 Challengers, 1 Auditor | M1 | IN_PROGRESS |

## Interface Contracts
### `src/components/layout/Footer.tsx` ↔ `src/app/layout.tsx`
- Component: `export default function Footer({ variant }: { variant?: string })`
- Imports:
  - `@/components/layout/MarketingLayout`
  - `@/components/icons/LinkedInIcon`, `@/components/icons/XIcon`, `@/components/icons/FacebookIcon`, `@/components/icons/InstagramIcon`, `@/components/icons/TelegramIcon`
  - Public assets: `/footerImage.png`, `/logo-black.png`
- Return: JSX section containing CTA banner, branding, navigation, social circle buttons, and FAARNS wordmark SVG.
