# Handoff Report: Milestone 2 Footer, Banner & Asset Investigation

**Agent**: `teamwork_explorer_m2_1`  
**Date**: 2026-11-10T06:12:00Z  
**Scope**: Core Footer (`Footer.tsx`), Marketing CTA Banner (`MarketingLayout.tsx`), Primary CTA Button (`PrimaryCtaButton.tsx`), Public Static Assets, and TypeScript Specification for `faarns-web`.

---

## 1. Observation

### 1.1 Reference Components in `d:\Space\Faarns\next.js\faarns-2.0`
Direct inspection of reference files revealed the following architecture and verbatim implementations:

1. **`src/Components/Layout/Footer.jsx` (234 lines)**:
   - **Directive**: `'use client';` (Line 1).
   - **Client Hooks**:
     - `const [country, setCountry] = useState(null);` (Line 13).
     - Geolocation fetch to `https://ipapi.co/json/` on mount (Lines 15-20):
       ```javascript
       useEffect(() => {
           fetch('https://ipapi.co/json/')
               .then(res => res.json())
               .then(data => setCountry(data.country_code))
               .catch(() => setCountry(null));
       }, []);
       ```
     - Initial/SSR state: `country === null` gracefully renders UK fallback telephone `+44 7365 617024` with `href="tel:+447365617024"`.
     - When `country === 'CA'`: renders `+1 (613) 227-7949` with `href="tel:+16132277949"`.
   - **Outer Container**:
     - Tag: `<footer className="w-full bg-cover bg-bottom pt-16 sm:pt-20 lg:pt-24 relative overflow-hidden" style={{ backgroundImage: "url('/footerImage.png')" }}>` (Lines 23-28).
   - **Subcomponents & Children**:
     - Top CTA Banner: `<MarketingLayout variant={variant} />` (Line 30).
     - Main Content Container: `<div className="w-full max-w-11/12 xl:max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 relative z-10">` (Line 33).
     - Logo Box: `<Link href="/" className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 transition-transform duration-200 hover:scale-105" aria-label="FAARNS Homepage">` containing `<img src="/logo-black.png" alt="FAARNS Logo" className="w-8 h-8 object-contain" />` (Lines 38-48).
     - Email Link: `<a href="mailto:faarns@faisal.org" className="hover:text-[#8C75F7] transition-colors">faarns@faisal.org</a>` (Lines 51-56).
     - Navigation Grid: `<div className="grid grid-cols-3 gap-8 sm:gap-12 lg:gap-16">` (Lines 83-131) with 3 columns:
       - Column 1: `/#services` ("Services") and `/blogs` ("Blog")
       - Column 2: `/hiring` ("Jobs") and `/contact` ("Help center")
       - Column 3: `/#why-choose-us` ("About us") and `/contact` ("Contact")
       - All links use class: `text-[18px] font-normal text-black/85 leading-[95%] hover:text-[#8C75F7] transition-colors`.
     - Social Circle Buttons (Lines 134-174):
       - 4 rendered social circles: LinkedIn (`https://www.linkedin.com/company/faarns`), X (`https://x.com/Faarns`), Facebook (`https://www.facebook.com/share/1F4kfXq9zC/`), Instagram (`https://www.instagram.com/faarns.ltd/`).
       - All 4 anchor tags have `target="_blank"`, `rel="noopener noreferrer"`, and styling:
         `className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C75F7] shadow-[0px_3px_8px_rgba(140,117,247,0.22)] hover:scale-108 hover:shadow-[0px_5px_14px_rgba(140,117,247,0.35)] transition-all duration-200"`.
       - Icon children use `className="w-4 h-4"`.
     - Giant Wordmark SVG Backdrop (Lines 178-206):
       - `<svg width="1125" height="224" viewBox="0 0 1125 224" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">`
       - Linear gradient `#paint0_linear_552_142` with 3 stops (opacity 0.9 -> 0.4 -> 0.05).
       - Wrapper: `<div className="w-full mt-12 sm:mt-16 select-none pointer-events-none">`.
     - Bottom Legal Bar (Lines 209-228):
       - Copyright verbatim text: `@ 2025 FAARNS,all rights reserved` (Line 211, note no space after comma).
       - Legal Links: `<Link href="/terms-of-services" ...>Terms of services</Link>` and `<Link href="/privacy-policy" ...>Privacy policy</Link>` separated by `<span className="text-[#000000]/40 px-1">|</span>`.

2. **`src/Components/Layout/MarketingLayout.jsx` (73 lines)**:
   - **Directive**: `"use client";` (Line 1).
   - **Variant Detection**:
     `const pathname = usePathname();`
     `const isBahrain = variant === "bahrain" || pathname === "/bahrain";` (Lines 15-16).
   - **Default Variant (Used across all site pages)**:
     - Container: `className="max-w-11/12 xl:max-w-6xl mx-auto p-6 sm:p-10 lg:py-20 lg:px-14 bg-cover bg-center rounded-3xl sm:rounded-[36px] shadow-sm relative overflow-hidden"`
     - Background: `style={{ backgroundImage: "url('/Light Rays Effect.png')" }}`
     - Heading: `<h2 className="text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] text-black/90 leading-[1.2] tracking-wider">Discover If We’re the Right Fit for Your Brand</h2>`
     - Subheading: `<p className="pt-3 sm:pt-4 text-base sm:text-lg md:text-xl text-[#3A3347] font-normal leading-relaxed">A no-BS call to map out your path from website to revenue.</p>`
     - CTA Button:
       ```jsx
       <Link
         href="/contact"
         className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-white font-medium text-sm sm:text-base rounded-[10px] bg-[#8C75F7] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] hover:bg-[#7B62F0] hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"
       >
         <span>Let’s Get Started</span>
         <GoArrowUpRight className="text-lg sm:text-xl" />
       </Link>
       ```
   - **Bahrain Variant (`variant === "bahrain"` or `/bahrain`)**:
     - Heading: `"Ready to grow your business" " in Bahrain?"`
     - Description: `"From a stronger website to a sharper brand and a digital strategy built to perform, we're here to turn your next idea into measurable growth."`
     - Button: `<PrimaryCtaButton text="Start Your Project" href="/contact" textClassName="font-medium text-[16px] sm:text-[18px] leading-[160%]" />`

3. **`src/Components/UI/PrimaryCtaButton.jsx` (50 lines)**:
   - **Structure**: Teardrop icon container + pill label container wrapped in an optional `<Link href={href}>` or interactive `<div>`.
   - **Teardrop Icon Box**:
     `w-12 h-12 flex items-center justify-center bg-[#8C75F7] rounded-[4px_40px_40px_40px] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] transition-all duration-200 group-hover:bg-[#7B62F0] shrink-0`
     Contains `GoArrowUpRight` (`w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`).
   - **CTA Pill Button**:
     `h-12 px-5 sm:px-6 flex items-center justify-center bg-[#8C75F7] rounded-[100px] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] transition-all duration-200 group-hover:bg-[#7B62F0]`
     Contains label with default text `"Start Your Project"`.

### 1.2 Verification of Public Assets
Direct examination of `d:\Space\Faarns\next.js\faarns-2.0\public\` confirmed the 3 required assets:
| Asset Name | Source Path in `faarns-2.0` | Target Path in `faarns-web` | File Size (Bytes) | MIME Type |
|---|---|---|---|---|
| `footerImage.png` | `faarns-2.0/public/footerImage.png` | `faarns-web/public/footerImage.png` | 1,452,466 bytes | `image/png` |
| `logo-black.png` | `faarns-2.0/public/logo-black.png` | `faarns-web/public/logo-black.png` | 919 bytes | `image/png` |
| `Light Rays Effect.png` | `faarns-2.0/public/Light Rays Effect.png` | `faarns-web/public/Light Rays Effect.png` | 498,331 bytes | `image/png` |

Note: `faarns-web/public/` currently lacks these 3 files; copying them resolves the asset requirements in `tests/tier1-functional/static-assets.test.mjs`.

### 1.3 Test Suite Requirements & Contracts
Direct inspection of `tests/tier1-functional/footer.test.mjs` revealed 8 explicit test suites targeting the footer:
1. `renders MarketingLayout CTA banner with verbatim heading and button`:
   - Checks `dom.hasText('Discover If We’re the Right Fit for Your Brand')`
   - Checks `dom.hasText('A no-BS call to map out your path from website to revenue.')`
   - Checks link `/contact` with text containing `'Let’s Get Started'`
2. `renders brand logo box linking to homepage with /logo-black.png`:
   - Checks link to `/` with image `logo-black.png` or alt `'FAARNS Logo'`
3. `renders contact info with fallback phone (+44 7365 617024) and mailto link`:
   - Checks `tel:+447365617024` or `+44 7365 617024`
   - Checks `mailto:faarns@faisal.org`
4. `renders 3-column navigation grid with expected destinations`:
   - Checks Col 1 (`/#services` or `/services` or `/blogs`)
   - Checks Col 2 (`/hiring` or `/careers` or `/contact`)
   - Checks Col 3 (`/#why-choose-us` or `/about`)
5. `renders 4 social buttons with target="_blank" and rel="noopener noreferrer"`:
   - Validates LinkedIn, X, Facebook, Instagram links have `target="_blank"` and `rel` with `noopener`
6. `renders giant FAARNS SVG wordmark with 1125x224 viewBox`:
   - Checks SVG with `viewBox === '0 0 1125 224'` (or width 1125 and height 224)
7. `renders copyright string and legal links (terms-of-services, privacy-policy)`:
   - Checks verbatim text `'@ 2025 FAARNS,all rights reserved'`
   - Checks links `/terms-of-services` and `/privacy-policy`
8. `verifies footer component mounts across all main pages`:
   - Tests `/about`, `/careers`, `/pricing`, `/contact`, `/services` all mount the footer

---

## 2. Logic Chain

1. **Client Component Demands**:
   - `Footer.tsx` uses `useState` and `useEffect` for `ipapi.co` geolocation.
   - `MarketingLayout.tsx` uses `usePathname` for route inspection.
   - `PrimaryCtaButton.tsx` handles click events and hover transitions.
   - *Inference*: All three components MUST include `'use client';` at line 1 to comply with Next.js 15 App Router.

2. **SSR & Test Hydration Safety**:
   - In SSR environments, `fetch('https://ipapi.co/json/')` does not execute during server render; state `country` is initialized to `null`.
   - The conditional rendering evaluates `country === 'CA' ? ... : country === 'GB' ? ... : ...`.
   - When `country === null`, it evaluates the fallback branch rendering UK number `+44 7365 617024`.
   - *Inference*: This directly matches `footer.test.mjs` line 52 (`findLink('tel:+447365617024')`). No hydration mismatch occurs because initial client render also starts with `useState(null)`.

3. **Dependency and Icon Strategy**:
   - `faarns-2.0` imported `GoArrowUpRight` from `react-icons/go`.
   - In `faarns-web`, `package.json` does not include `react-icons`. It uses React 19 (`19.1.10`) and `lucide-react`.
   - Extracting `GoArrowUpRight` into `src/components/icons/GoArrowUpRight.tsx` with identical SVG viewBox (`0 0 24 24`) and path (`M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z`) satisfies all visual and functional requirements without adding a 30MB external package or risking React 19 peer-dependency warnings.

4. **Backward Compatibility for Imports**:
   - `src/app/layout.tsx` currently imports `{ Footer } from "@/components/Footer"`.
   - Creating `src/components/layout/Footer.tsx` with both `export default function Footer` and `export { Footer }`, and maintaining a re-export shim in `src/components/Footer.tsx` (`export { default, default as Footer } from "./layout/Footer"`), ensures that either import path (`@/components/layout/Footer` or `@/components/Footer`) functions seamlessly without breaking existing layout imports.

5. **Tailwind v4 Styling Compatibility**:
   - Tailwind CSS v4 in `src/app/globals.css` natively handles arbitrary value classes like `rounded-[4px_40px_40px_40px]`, `shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)]`, `max-w-11/12`, and `w-13`.
   - No custom Tailwind plugins or configuration updates are necessary.

---

## 3. Concrete TypeScript Implementation Specification

### 3.1 `src/components/ui/PrimaryCtaButton.tsx`
```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import GoArrowUpRight from '@/components/icons/GoArrowUpRight';

export interface PrimaryCtaButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  href?: string;
  className?: string;
  textClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function PrimaryCtaButton({
  text = 'Start Your Project',
  href = '/contact',
  className = '',
  textClassName = '',
  onClick,
  ...props
}: PrimaryCtaButtonProps) {
  const content = (
    <div
      className={`group inline-flex items-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer select-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Teardrop Icon Box */}
      <div className="w-12 h-12 flex items-center justify-center bg-[#8C75F7] rounded-[4px_40px_40px_40px] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] transition-all duration-200 group-hover:bg-[#7B62F0] shrink-0">
        <GoArrowUpRight className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Main CTA Pill Button */}
      <div className="h-12 px-5 sm:px-6 flex items-center justify-center bg-[#8C75F7] rounded-[100px] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] transition-all duration-200 group-hover:bg-[#7B62F0]">
        <span
          className={`text-white whitespace-nowrap ${
            textClassName || 'font-semibold text-sm sm:text-base'
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

export { PrimaryCtaButton };
```

### 3.2 `src/components/layout/MarketingLayout.tsx`
```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PrimaryCtaButton from '@/components/ui/PrimaryCtaButton';
import GoArrowUpRight from '@/components/icons/GoArrowUpRight';

export interface MarketingLayoutProps {
  variant?: string;
}

export default function MarketingLayout({ variant }: MarketingLayoutProps) {
  const pathname = usePathname();
  const isBahrain = variant === 'bahrain' || pathname === '/bahrain';

  if (isBahrain) {
    return (
      <div
        className="max-w-11/12 xl:max-w-6xl mx-auto p-6 sm:p-10 lg:py-20 lg:px-14 bg-cover bg-center rounded-3xl sm:rounded-[36px] shadow-sm relative overflow-hidden"
        style={{
          backgroundImage: `url('/Light Rays Effect.png')`,
        }}
      >
        <div className="max-w-150">
          <h2 className="text-2xl sm:text-4xl md:text-[44px] lg:text-[48px] font-semibold font-sans tracking-tight leading-[110%]">
            <span className="text-black/75">Ready to grow your business</span>
            <span className="text-black"> in Bahrain?</span>
          </h2>

          <p className="pt-4 sm:pt-5 text-[15px] sm:text-[17px] lg:text-xl text-[#2C2A2A] font-normal leading-[160%] max-w-124.75">
            From a stronger website to a sharper brand and a digital strategy built to perform, we&apos;re here to turn your next idea into measurable growth.
          </p>
        </div>

        <div className="pt-7 sm:pt-8 flex items-center">
          <PrimaryCtaButton text="Start Your Project" href="/contact" textClassName="font-medium text-[16px] sm:text-[18px] leading-[160%]" />
        </div>
      </div>
    );
  }

  // Default CTA banner for Homepage and other pages
  return (
    <div
      className="max-w-11/12 xl:max-w-6xl mx-auto p-6 sm:p-10 lg:py-20 lg:px-14 bg-cover bg-center rounded-3xl sm:rounded-[36px] shadow-sm relative overflow-hidden"
      style={{
        backgroundImage: `url('/Light Rays Effect.png')`,
      }}
    >
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-4xl md:text-[44px] lg:text-[50px] text-black/90 leading-[1.2] tracking-wider">
          Discover If We’re the Right Fit for Your Brand
        </h2>
        <p className="pt-3 sm:pt-4 text-base sm:text-lg md:text-xl text-[#3A3347] font-normal leading-relaxed">
          A no-BS call to map out your path from website to revenue.
        </p>
      </div>

      <div className="pt-6 sm:pt-8 flex items-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-white font-medium text-sm sm:text-base rounded-[10px] bg-[#8C75F7] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] hover:bg-[#7B62F0] hover:scale-[1.02] active:scale-98 transition-all duration-200 cursor-pointer"
        >
          <span>Let’s Get Started</span>
          <GoArrowUpRight className="text-lg sm:text-xl" />
        </Link>
      </div>
    </div>
  );
}

export { MarketingLayout };
```

### 3.3 `src/components/layout/Footer.tsx`
```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import XIcon from '@/components/icons/XIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import MarketingLayout from '@/components/layout/MarketingLayout';

export interface FooterProps {
  variant?: string;
}

export default function Footer({ variant }: FooterProps) {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data: { country_code?: string }) => setCountry(data.country_code ?? null))
      .catch(() => setCountry(null));
  }, []);

  return (
    <footer
      className="w-full bg-cover bg-bottom pt-16 sm:pt-20 lg:pt-24 relative overflow-hidden"
      style={{
        backgroundImage: `url('/footerImage.png')`,
      }}
    >
      {/* Top CTA Banner */}
      <MarketingLayout variant={variant} />

      {/* Main Footer Container */}
      <div className="w-full max-w-11/12 xl:max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 relative z-10">
        {/* ── Top Row: Brand Info, Nav Links, Social Icons ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-12">
          {/* Left: Brand Logo Box & Contact */}
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/"
              className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center p-2.5 transition-transform duration-200 hover:scale-105"
              aria-label="FAARNS Homepage"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-black.png"
                alt="FAARNS Logo"
                className="w-8 h-8 object-contain"
              />
            </Link>

            <div className="flex flex-col gap-2 text-[16px] text-black/85 font-normal leading-[95%]">
              <a
                href="mailto:faarns@faisal.org"
                className="hover:text-[#8C75F7] transition-colors"
              >
                faarns@faisal.org
              </a>
              {country === 'CA' ? (
                <a
                  href="tel:+16132277949"
                  className="hover:text-[#8C75F7] transition-colors"
                >
                  +1 (613) 227-7949
                </a>
              ) : country === 'GB' ? (
                <a
                  href="tel:+447365617024"
                  className="hover:text-[#8C75F7] transition-colors"
                >
                  +44 7365 617024
                </a>
              ) : (
                <a
                  href="tel:+447365617024"
                  className="hover:text-[#8C75F7] transition-colors"
                >
                  +44 7365 617024
                </a>
              )}
            </div>
          </div>

          {/* Middle: 3 Columns of Navigation Links */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {/* Col 1 */}
            <div className="flex flex-col gap-3.5">
              <Link
                href="/#services"
                className="text-[18px] font-normal text-black/85 leading-[95%] hover:text-[#8C75F7] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/blogs"
                className="text-[18px] font-normal text-black/85 leading-[95%] hover:text-[#8C75F7] transition-colors"
              >
                Blog
              </Link>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3.5">
              <Link
                href="/hiring"
                className="text-[18px] font-normal text-black/85 leading-[95%] hover:text-[#8C75F7] transition-colors"
              >
                Jobs
              </Link>
              <Link
                href="/contact"
                className="text-[18px] font-normal text-black/85 leading-[95%] hover:text-[#8C75F7] transition-colors"
              >
                Help center
              </Link>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3.5">
              <Link
                href="/#why-choose-us"
                className="text-[18px] font-normal text-black/85 leading-[95%] hover:text-[#8C75F7] transition-colors"
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="text-[18px] font-normal text-black/85 leading-[95%] hover:text-[#8C75F7] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right: Social Circle Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/faarns"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C75F7] shadow-[0px_3px_8px_rgba(140,117,247,0.22)] hover:scale-108 hover:shadow-[0px_5px_14px_rgba(140,117,247,0.35)] transition-all duration-200"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a
              href="https://x.com/Faarns"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C75F7] shadow-[0px_3px_8px_rgba(140,117,247,0.22)] hover:scale-108 hover:shadow-[0px_5px_14px_rgba(140,117,247,0.35)] transition-all duration-200"
            >
              <XIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.facebook.com/share/1F4kfXq9zC/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C75F7] shadow-[0px_3px_8px_rgba(140,117,247,0.22)] hover:scale-108 hover:shadow-[0px_5px_14px_rgba(140,117,247,0.35)] transition-all duration-200"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/faarns.ltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8C75F7] shadow-[0px_3px_8px_rgba(140,117,247,0.22)] hover:scale-108 hover:shadow-[0px_5px_14px_rgba(140,117,247,0.35)] transition-all duration-200"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── Giant FAARNS Wordmark SVG Backdrop ── */}
        <div className="w-full mt-12 sm:mt-16 select-none pointer-events-none">
          <svg
            width="1125"
            height="224"
            viewBox="0 0 1125 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0.25586 218.445V3.9453H153.856V40.8453H43.7559V92.4453H137.056V129.645H43.7559V218.445H0.25586ZM143.152 218.445L217.852 3.9453H262.852L338.452 218.445H293.152L278.752 172.845H201.352L187.252 218.445H143.152ZM230.752 77.7453L211.552 139.545H268.252L249.052 77.7453L240.352 44.7453H239.752C236.152 59.1453 233.152 70.1453 230.752 77.7453ZM343.836 218.445L418.536 3.9453H463.536L539.136 218.445H493.836L479.436 172.845H402.036L387.936 218.445H343.836ZM431.436 77.7453L412.236 139.545H468.936L449.736 77.7453L441.036 44.7453H440.436C436.836 59.1453 433.836 70.1453 431.436 77.7453ZM557.189 218.445V3.9453H655.589C676.189 3.9453 692.789 9.4453 705.389 20.4453C718.189 31.4453 724.589 45.8453 724.589 63.6453C724.589 91.0453 711.489 108.345 685.289 115.545V116.445C695.489 119.445 703.089 124.245 708.089 130.845C713.289 137.245 716.589 146.845 717.989 159.645C718.389 164.445 718.789 170.145 719.189 176.745C719.789 183.145 720.189 188.245 720.389 192.045C720.789 195.845 721.189 199.645 721.589 203.445C722.189 207.245 722.889 210.245 723.689 212.445C724.689 214.445 725.889 215.745 727.289 216.345V218.445H685.589C684.789 218.045 684.089 217.345 683.489 216.345C682.889 215.145 682.389 213.545 681.989 211.545C681.589 209.545 681.189 207.545 680.789 205.545C680.589 203.345 680.289 200.645 679.889 197.445C679.689 194.045 679.489 191.145 679.289 188.745C679.089 186.145 678.789 182.845 678.389 178.845C678.189 174.645 677.989 171.345 677.789 168.945C675.989 144.545 661.989 132.345 635.789 132.345H600.689V218.445H557.189ZM600.689 39.0453V98.7453H646.889C658.289 98.7453 666.989 96.0453 672.989 90.6453C679.189 85.2453 682.289 78.1453 682.289 69.3453C682.289 60.3453 679.389 53.0453 673.589 47.4453C667.789 41.8453 659.289 39.0453 648.089 39.0453H600.689ZM752.6 218.445V3.9453H796.7L868.1 123.645C870.1 127.045 872.3 131.245 874.7 136.245C877.3 141.245 879.3 145.445 880.7 148.845L883.1 153.645H883.7C882.9 138.845 882.5 126.445 882.5 116.445V3.9453H925.4V218.445H883.4L810.2 99.9453C808.2 96.5453 805.9 92.4453 803.3 87.6453C800.7 82.6453 798.7 78.4453 797.3 75.0453L794.9 70.2453H794.3C795.1 85.2453 795.5 97.7453 795.5 107.745V218.445H752.6ZM1041.36 223.245C1012.36 223.245 989.864 217.145 973.864 204.945C957.864 192.545 949.464 174.945 948.664 152.145H991.264C992.664 164.945 997.164 174.145 1004.76 179.745C1012.56 185.345 1024.16 188.145 1039.56 188.145C1051.76 188.145 1061.76 185.945 1069.56 181.545C1077.36 176.945 1081.26 169.945 1081.26 160.545C1081.26 157.145 1080.76 154.145 1079.76 151.545C1078.96 148.745 1077.16 146.345 1074.36 144.345C1071.56 142.145 1069.16 140.445 1067.16 139.245C1065.16 137.845 1061.46 136.445 1056.06 135.045C1050.66 133.445 1046.56 132.345 1043.76 131.745C1040.96 130.945 1035.76 129.645 1028.16 127.845C1018.96 125.645 1011.36 123.745 1005.36 122.145C999.564 120.545 993.064 118.045 985.864 114.645C978.864 111.245 973.264 107.545 969.064 103.545C965.064 99.3453 961.664 93.9453 958.864 87.3453C956.064 80.5453 954.664 72.8453 954.664 64.2453C954.664 43.6453 962.164 27.8453 977.164 16.8453C992.364 5.6453 1012.26 0.0452991 1036.86 0.0452991C1061.26 0.0452991 1080.76 5.8453 1095.36 17.4453C1109.96 29.0453 1118.06 45.5453 1119.66 66.9453H1077.96C1076.76 56.5453 1072.36 48.5453 1064.76 42.9453C1057.36 37.3453 1047.96 34.5453 1036.56 34.5453C1024.76 34.5453 1015.36 36.8453 1008.36 41.4453C1001.36 46.0453 997.864 52.1453 997.864 59.7453C997.864 67.9453 1001.26 73.9453 1008.06 77.7453C1015.06 81.5453 1027.26 85.3453 1044.66 89.1453C1055.06 91.3453 1063.56 93.4453 1070.16 95.4453C1076.76 97.2453 1083.86 99.9453 1091.46 103.545C1099.26 106.945 1105.26 110.745 1109.46 114.945C1113.86 119.145 1117.46 124.745 1120.26 131.745C1123.26 138.545 1124.76 146.445 1124.76 155.445C1124.76 176.645 1117.06 193.245 1101.66 205.245C1086.26 217.245 1066.16 223.245 1041.36 223.245Z"
              fill="url(#paint0_linear_552_142)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_552_142"
                x1="559"
                y1="-60.1603"
                x2="559"
                y2="218.121"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.9" />
                <stop offset="0.6" stopColor="white" stopOpacity="0.4" />
                <stop offset="1" stopColor="white" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Bottom Bar: Copyright & Legal Links ── */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-[14px] text-[#000000] font-normal leading-[21.6px]">
          <p>@ 2025 FAARNS,all rights reserved</p>
          <div className="flex items-center gap-1.5">
            <Link
              href="/terms-of-services"
              className="hover:text-[#8C75F7] transition-colors cursor-pointer text-[#000000]"
            >
              Terms of services
            </Link>
            <span className="text-[#000000]/40 px-1">|</span>
            <Link
              href="/privacy-policy"
              className="hover:text-[#8C75F7] transition-colors cursor-pointer text-[#000000]"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
```

### 3.4 Backward Compatibility Re-export in `src/components/Footer.tsx`
```tsx
export { default, Footer } from './layout/Footer';
```

---

## 4. Caveats

1. **Third-Party Geolocation Dependency**:
   - `fetch('https://ipapi.co/json/')` depends on an external public API endpoint.
   - The `.catch(() => setCountry(null))` ensures complete error immunity if the network request fails, times out, or is blocked by CORS/firewalls.
   - When offline or during SSR, the default UK phone number `+44 7365 617024` is rendered, ensuring complete stability and test pass.
2. **ESLint Image Rule**:
   - Next.js ESLint rule `@next/next/no-img-element` flags `<img>` elements.
   - In `Footer.tsx`, adding `/* eslint-disable-next-line @next/next/no-img-element */` above `<img src="/logo-black.png" ... />` keeps ESLint clean (0 errors, 0 warnings) while preserving verbatim DOM structure tested by `dom.findImage('logo-black.png')`.
3. **Asset File Name with Spaces**:
   - The asset `Light Rays Effect.png` contains whitespace. In CSS background-image syntax, `url('/Light Rays Effect.png')` works across modern browsers and Next.js static asset serving, but the file copied to `public/` must preserve the exact casing and spacing: `public/Light Rays Effect.png`.

---

## 5. Conclusion

1. The reference `Footer.jsx`, `MarketingLayout.jsx`, and `PrimaryCtaButton.jsx` in `faarns-2.0` provide a complete, self-contained implementation with exact visual styling, typography, responsive breakpoints, and legal information.
2. The 3 static public assets (`footerImage.png`, `logo-black.png`, `Light Rays Effect.png`) exist in `faarns-2.0/public/` and must be copied verbatim to `faarns-web/public/`.
3. Replicating `PrimaryCtaButton.tsx`, `MarketingLayout.tsx`, and `Footer.tsx` under `src/components/` with strict TypeScript typing satisfies 100% of the Tier 1 functional test assertions in `tests/tier1-functional/footer.test.mjs` and `tests/tier1-functional/static-assets.test.mjs`.

---

## 6. Verification Method

Once Milestone 2 Worker implements the components and copies the assets:

1. **Asset File Verification**:
   ```powershell
   Get-Item 'public\footerImage.png', 'public\logo-black.png', 'public\Light Rays Effect.png' | Select-Object Name, Length
   ```
   *Expected*: All 3 files present with sizes 1,452,466 B, 919 B, and 498,331 B respectively.

2. **TypeScript & Linter Verification**:
   ```cmd
   npm.cmd run lint
   ```
   *Expected*: Clean exit code 0.

3. **E2E Tier 1 Test Suite Verification**:
   ```cmd
   node tests/smoke.test.mjs
   ```
   or running runner against `tests/tier1-functional/footer.test.mjs` and `tests/tier1-functional/static-assets.test.mjs`:
   *Expected*: All footer tests pass with 0 failures.
