# Handoff Report: Footer SVG Icons & GoArrowUpRight Specification

## 1. Observation

### 1.1 Reference Social Icons in `faarns-2.0`
Inspection of `d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\` identified 14 icon files, with 5 social icons specifically relevant to Footer replication:

1. **`LinkedInIcon.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\LinkedInIcon.jsx:1-23`):
   - Element: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>`
   - Path: `<path d="M2.4902 4.48528C3.59505 4.48528 4.47894 3.58759 4.47894 2.49655C4.47894 1.40551 3.58124 0.507812 2.4902 0.507812C1.39916 0.507812 0.501465 1.40551 0.501465 2.49655C0.501465 3.58759 1.39916 4.48528 2.4902 4.48528ZM6.371 5.99065V17.0668H9.79604V11.5978C9.79604 10.1477 10.0723 8.75278 11.8538 8.75278C13.6354 8.75278 13.6354 10.4101 13.6354 11.6806V17.0668H17.0743V10.9901C17.0743 8.007 16.439 5.71443 12.9587 5.71443C11.2876 5.71443 10.1689 6.62594 9.71318 7.49601H9.67175V5.97684H6.38481L6.371 5.99065ZM0.777678 5.99065H4.21653V17.0668H0.777678V5.99065Z" fill="currentColor" />`
   - Default export: `export default LinkedInIcon;`

2. **`XIcon.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\XIcon.jsx:1-33`):
   - Element: `<svg viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg" className={className}>`
   - Mask: `<mask id="mask0_561_57" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20"><path d="M0.744141 0.120117H20.0791V19.455H0.744141V0.120117Z" fill="white" /></mask>`
   - Path (inside `<g mask="url(#mask0_561_57)">`): `<path d="M15.9704 1.02637H18.9355L12.4583 8.44822L20.0791 18.5493H14.1129L9.43657 12.4243L4.09185 18.5493H1.12393L8.05136 10.6082L0.744141 1.02775H6.86226L11.0828 6.62521L15.9704 1.02637ZM14.9277 16.7705H16.5712L5.96457 2.71265H4.20233L14.9277 16.7705Z" fill="currentColor" />`
   - Default export: `export default XIcon;`

3. **`FacebookIcon.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\FacebookIcon.jsx:1-20`):
   - Element: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="none" className={className}>`
   - Path: `<path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" fill="currentColor" />`
   - Default export: `export default FacebookIcon;`

4. **`InstagramIcon.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\InstagramIcon.jsx:1-20`):
   - Element: `<svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>`
   - Props: `{ size = 36, className }`
   - Path: `<path d="M19.426 0.5C21.3946 0.50525 ... 26.8158 6.62485Z" fill="currentColor" />`
   - Default export: `export default function InstagramIcon({ size = 36, className })`

5. **`TelegramIcon.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\TelegramIcon.jsx:1-27`):
   - Element: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>`
   - Path 1: `<path fillRule="evenodd" clipRule="evenodd" d="M12.9392 22.3951L12.9265 22.3974L12.8446 22.4378...L12.4201 22.267Z" />`
   - Path 2: `<path fillRule="evenodd" clipRule="evenodd" d="M21.2269 0.673598C21.5119 0.553609...L21.2269 0.673598Z" />`
   - Default export: `export default TelegramIcon;`

### 1.2 Footer, MarketingLayout, and CTA Button Usages in `faarns-2.0`
1. **`Footer.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\Layout\Footer.jsx:5-9, 134-174`):
   - Imports:
     ```javascript
     import LinkedInIcon from '../Icon/LinkedInIcon';
     import XIcon from '../Icon/XIcon';
     import TelegramIcon from '../Icon/TelegramIcon';
     import FacebookIcon from '../Icon/FacebookIcon';
     import InstagramIcon from '../Icon/InstagramIcon';
     ```
   - Rendered Social Icons in `<div className="flex items-center gap-3">`:
     - `<LinkedInIcon className="w-4 h-4" />`
     - `<XIcon className="w-4 h-4" />`
     - `<FacebookIcon className="w-4 h-4" />`
     - `<InstagramIcon className="w-4 h-4" />`
   - Note: `TelegramIcon` is imported on line 7 but not rendered in this div.
2. **`PrimaryCtaButton.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\UI\PrimaryCtaButton.jsx:5, 23`):
   - Import: `import { GoArrowUpRight } from "react-icons/go";`
   - Usage: `<GoArrowUpRight className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />`
3. **`MarketingLayout.jsx`** (`d:\Space\Faarns\next.js\faarns-2.0\src\Components\Layout\MarketingLayout.jsx:6, 66`):
   - Import: `import { GoArrowUpRight } from "react-icons/go";`
   - Usage: `<GoArrowUpRight className="text-lg sm:text-xl" />`

### 1.3 `GoArrowUpRight` in `react-icons/go`
Inspecting `d:\Space\Faarns\next.js\faarns-2.0\node_modules\react-icons\go\index.js:39-41`:
```javascript
module.exports.GoArrowUpRight = function GoArrowUpRight (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"d":"M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"},"child":[]}]})(props);
};
```
Inspecting `iconBase.js:42-53` in `react-icons`:
- SVG base defaults: `stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={computedSize || "1em"} width={computedSize || "1em"}`.

### 1.4 Existing Icons in `faarns-web`
- File: `d:\Space\Faarns\next.js\faarns-web\src\components\Icons.tsx`
- Exports: `MARK_PATHS`, `Mark`, `Arrow`, `ArrowNE`, `Check`.
- Dependencies in `package.json`: `lucide-react: "^1.70.0"`. `react-icons` is NOT installed.
- Usages of `Icons.tsx`: 9 existing files import `Mark`, `Arrow`, `ArrowNE`, or `Check` from `@/components/Icons`.
- Directory `src/components/icons/` does not yet exist.

---

## 2. Logic Chain

1. **Social Icons Structure & Sizing**:
   - In `Footer.jsx`, social icons are styled with `className="w-4 h-4"` and colored with `text-[#8C75F7]`.
   - All 5 icons rely on `fill="currentColor"`. Therefore, inheriting `currentColor` on paths ensures dynamic hover and text color utilities work seamlessly.
   - For sizing: Providing `size?: number | string` alongside standard `React.SVGProps<SVGSVGElement>` ensures callers can pass either numeric sizes (`size={18}`) or CSS utility classes (`className="w-4 h-4"`). Defaulting `width` and `height` to `size` (or the native viewBox dimension) allows Tailwind CSS rules to override SVG attributes cleanly.

2. **Standalone `GoArrowUpRight.tsx` vs `react-icons` Package**:
   - `react-icons` is a heavy package (>30 MB on disk) with over 30 icon sets. `faarns-web` only references one single icon (`GoArrowUpRight`) from `react-icons`.
   - In `MarketingLayout.jsx`, `<GoArrowUpRight className="text-lg sm:text-xl" />` relies on the icon scaling with font size. Setting `width = size || "1em"` and `height = size || "1em"` replicates the exact `react-icons` `IconBase` behavior where typography classes (`text-lg`, `text-xl`) dynamically size the icon.
   - In `PrimaryCtaButton.jsx`, `<GoArrowUpRight className="w-5 h-5 ...">` uses explicit Tailwind width/height utility classes, which override the `1em` presentation attributes.
   - By creating a standalone `src/components/icons/GoArrowUpRight.tsx` with the exact Octicons path (`M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z`), we achieve 100% visual fidelity, eliminate the need to add `react-icons` to `dependencies`, and avoid Next.js bundling/tree-shaking overhead.
   - For callers wishing to use either named or default imports, exporting both `export default GoArrowUpRight` and `export { GoArrowUpRight }` ensures compatibility.

3. **Collision Analysis with `src/components/Icons.tsx`**:
   - Existing icons in `src/components/Icons.tsx` are `Mark`, `Arrow`, `ArrowNE`, and `Check`.
   - The new icons are `LinkedInIcon`, `XIcon`, `FacebookIcon`, `InstagramIcon`, `TelegramIcon`, and `GoArrowUpRight`.
   - None of the names or visual shapes collide.
   - On Windows NTFS filesystems, `src/components/Icons.tsx` (file) and `src/components/icons/` (directory) coexist without naming collision because `.tsx` is part of the filename.
   - Keeping `src/components/Icons.tsx` intact guarantees zero regression for the 9 files imported by M1/M3 (`@/components/Icons`).
   - Placing new footer icons inside `src/components/icons/` fulfills `PROJECT.md` and `SCOPE.md` requirements.

4. **Self-Contained Interface Design**:
   - Each icon component defines `export interface IconProps extends React.SVGProps<SVGSVGElement> { size?: number | string; }`.
   - This makes every icon file 100% self-contained and relocatable with zero inter-file compilation dependencies.
   - A unified barrel file `src/components/icons/index.ts` re-exports all icons and types for streamlined bulk imports (`import { LinkedInIcon, XIcon, ... } from "@/components/icons"`).

---

## 3. Caveats

1. **`TelegramIcon` Presence in Footer**:
   - In `faarns-2.0`, `TelegramIcon` is imported in `Footer.jsx:7` but omitted from the rendered JSX social row (`Footer.jsx:134-174`). We have fully specified and implemented `TelegramIcon.tsx` so it is ready whenever needed.
2. **`XIcon` Mask Attribute**:
   - In `faarns-2.0`, `XIcon` contains a `<mask id="mask0_561_57">` from Figma export. The mask ID is static. If multiple `XIcon` instances are rendered on one DOM page, SVG mask IDs can technically share the same ID without visual glitch (since both masks are identical luminance masks). To preserve 100% verbatim fidelity, the exact mask structure from `faarns-2.0` is maintained.
3. **`react-icons` Alternative**:
   - If the team or reviewer strictly requires `import { GoArrowUpRight } from "react-icons/go"` verbatim instead of `@/components/icons/GoArrowUpRight`, `react-icons` can be installed via `npm i react-icons`. However, the standalone component is strongly recommended for bundle efficiency and clean architecture.

---

## 4. Conclusion

All 5 social icons and `GoArrowUpRight` are fully analyzed, mapped, and typed. Six TypeScript icon components and one barrel export file are specified under `src/components/icons/`:

### 4.1 Target File Mapping
| Source in `faarns-2.0` | Target in `faarns-web` | ViewBox | Key SVG Properties |
|---|---|---|---|
| `src/Components/Icon/LinkedInIcon.jsx` | `src/components/icons/LinkedInIcon.tsx` | `0 0 18 18` | `fill="currentColor"`, default width/height 18 |
| `src/Components/Icon/XIcon.jsx` | `src/components/icons/XIcon.tsx` | `0 0 21 20` | `fill="currentColor"`, luminance mask `mask0_561_57` |
| `src/Components/Icon/FacebookIcon.jsx` | `src/components/icons/FacebookIcon.tsx` | `0 0 320 512` | `fill="currentColor"`, `fill="none"` root |
| `src/Components/Icon/InstagramIcon.jsx` | `src/components/icons/InstagramIcon.tsx` | `0 0 36 36` | `fill="currentColor"`, default size 36 |
| `src/Components/Icon/TelegramIcon.jsx` | `src/components/icons/TelegramIcon.tsx` | `0 0 24 24` | `fill="currentColor"`, 2 evenodd paths |
| `node_modules/react-icons/go` (`GoArrowUpRight`) | `src/components/icons/GoArrowUpRight.tsx` | `0 0 24 24` | `fill="currentColor"`, font-relative `1em` sizing |
| N/A | `src/components/icons/index.ts` | N/A | Barrel exports for all 6 icons + `IconProps` |

### 4.2 Exact TypeScript Implementations

Ready-to-copy proposed files have been created and verified in:
`d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m2_2\`:
- `proposed_LinkedInIcon.tsx`
- `proposed_XIcon.tsx`
- `proposed_FacebookIcon.tsx`
- `proposed_InstagramIcon.tsx`
- `proposed_TelegramIcon.tsx`
- `proposed_GoArrowUpRight.tsx`
- `proposed_index.ts`
- `proposed_types.ts`

#### `src/components/icons/LinkedInIcon.tsx`
```tsx
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function LinkedInIcon({
  size,
  width = size || 18,
  height = size || 18,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.4902 4.48528C3.59505 4.48528 4.47894 3.58759 4.47894 2.49655C4.47894 1.40551 3.58124 0.507812 2.4902 0.507812C1.39916 0.507812 0.501465 1.40551 0.501465 2.49655C0.501465 3.58759 1.39916 4.48528 2.4902 4.48528ZM6.371 5.99065V17.0668H9.79604V11.5978C9.79604 10.1477 10.0723 8.75278 11.8538 8.75278C13.6354 8.75278 13.6354 10.4101 13.6354 11.6806V17.0668H17.0743V10.9901C17.0743 8.007 16.439 5.71443 12.9587 5.71443C11.2876 5.71443 10.1689 6.62594 9.71318 7.49601H9.67175V5.97684H6.38481L6.371 5.99065ZM0.777678 5.99065H4.21653V17.0668H0.777678V5.99065Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { LinkedInIcon };
```

#### `src/components/icons/XIcon.tsx`
```tsx
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function XIcon({
  size,
  width = size,
  height = size,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 21 20"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <mask
        id="mask0_561_57"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <path d="M0.744141 0.120117H20.0791V19.455H0.744141V0.120117Z" fill="white" />
      </mask>
      <g mask="url(#mask0_561_57)">
        <path
          d="M15.9704 1.02637H18.9355L12.4583 8.44822L20.0791 18.5493H14.1129L9.43657 12.4243L4.09185 18.5493H1.12393L8.05136 10.6082L0.744141 1.02775H6.86226L11.0828 6.62521L15.9704 1.02637ZM14.9277 16.7705H16.5712L5.96457 2.71265H4.20233L14.9277 16.7705Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export { XIcon };
```

#### `src/components/icons/FacebookIcon.tsx`
```tsx
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function FacebookIcon({
  size,
  width = size,
  height = size,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      fill="none"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
        fill="currentColor"
      />
    </svg>
  );
}

export { FacebookIcon };
```

#### `src/components/icons/InstagramIcon.tsx`
```tsx
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function InstagramIcon({
  size = 36,
  width = size,
  height = size,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M19.426 0.5C21.3946 0.50525 22.3938 0.51575 23.2565 0.540249L23.596 0.552499C23.988 0.566498 24.3747 0.583998 24.8419 0.604997C26.7039 0.692495 27.9743 0.986488 29.089 1.41873C30.2439 1.86322 31.2169 2.4652 32.1898 3.43643C33.08 4.31094 33.7686 5.36921 34.2075 6.53735C34.6397 7.65208 34.9337 8.92255 35.0212 10.7863C35.0422 11.2517 35.0597 11.6385 35.0737 12.0322L35.0842 12.3717C35.1104 13.2327 35.1209 14.2319 35.1244 16.2006L35.1262 17.5061V19.7985C35.1304 21.075 35.117 22.3514 35.0859 23.6274L35.0754 23.9669C35.0614 24.3607 35.0439 24.7474 35.0229 25.2129C34.9354 27.0766 34.638 28.3453 34.2075 29.4618C33.7686 30.6299 33.08 31.6882 32.1898 32.5627C31.3153 33.4529 30.2571 34.1415 29.089 34.5804C27.9743 35.0127 26.7039 35.3067 24.8419 35.3942L23.596 35.4467L23.2565 35.4572C22.3938 35.4817 21.3946 35.4939 19.426 35.4974L18.1205 35.4992H15.8299C14.5529 35.5037 13.276 35.4902 11.9993 35.4589L11.6599 35.4484C11.2445 35.4327 10.8291 35.4146 10.4139 35.3942C8.55202 35.3067 7.28159 35.0127 6.16514 34.5804C4.99766 34.1413 3.94003 33.4527 3.06605 32.5627C2.17525 31.6884 1.48607 30.6301 1.04665 29.4618C0.614424 28.3471 0.320439 27.0766 0.232943 25.2129L0.180446 23.9669L0.171696 23.6274C0.139439 22.3514 0.124854 21.075 0.127948 19.7985V16.2006C0.123105 14.9242 0.135939 13.6478 0.166447 12.3717L0.178696 12.0322C0.192695 11.6385 0.210194 11.2517 0.231193 10.7863C0.318689 8.92255 0.612674 7.65383 1.0449 6.53735C1.48535 5.36873 2.17574 4.31042 3.0678 3.43643C3.94127 2.54666 4.99828 1.8581 6.16514 1.41873C7.28159 0.986488 8.55027 0.692495 10.4139 0.604997C10.8794 0.583998 11.2679 0.566498 11.6599 0.552499L11.9993 0.541999C13.2754 0.510907 14.5518 0.497489 15.8282 0.50175L19.426 0.5ZM17.6271 9.24979C15.3065 9.24979 13.0811 10.1716 11.4402 11.8125C9.79933 13.4534 8.87751 15.679 8.87751 17.9996C8.87751 20.3202 9.79933 22.5457 11.4402 24.1866C13.0811 25.8275 15.3065 26.7494 17.6271 26.7494C19.9476 26.7494 22.1731 25.8275 23.8139 24.1866C25.4548 22.5457 26.3766 20.3202 26.3766 17.9996C26.3766 15.679 25.4548 13.4534 23.8139 11.8125C22.1731 10.1716 19.9476 9.24979 17.6271 9.24979ZM17.6271 12.7497C18.3165 12.7496 18.9991 12.8853 19.6361 13.149C20.2731 13.4127 20.8519 13.7993 21.3394 14.2867C21.827 14.7742 22.2138 15.3528 22.4777 15.9897C22.7417 16.6266 22.8776 17.3093 22.8777 17.9987C22.8778 18.6881 22.7421 19.3708 22.4784 20.0078C22.2147 20.6448 21.8281 21.2236 21.3407 21.7112C20.8533 22.1988 20.2746 22.5856 19.6377 22.8495C19.0009 23.1134 18.3182 23.2493 17.6288 23.2494C16.2365 23.2494 14.9012 22.6963 13.9167 21.7118C12.9322 20.7273 12.3791 19.3919 12.3791 17.9996C12.3791 16.6072 12.9322 15.2719 13.9167 14.2874C14.9012 13.3028 16.2365 12.7497 17.6288 12.7497M26.8158 6.62485C26.2357 6.62485 25.6793 6.85531 25.2691 7.26554C24.8589 7.67577 24.6285 8.23215 24.6285 8.8123C24.6285 9.39245 24.8589 9.94883 25.2691 10.3591C25.6793 10.7693 26.2357 10.9997 26.8158 10.9997C27.396 10.9997 27.9524 10.7693 28.3626 10.3591C28.7728 9.94883 29.0032 9.39245 29.0032 8.8123C29.0032 8.23215 28.7728 7.67577 28.3626 7.26554C27.9524 6.85531 27.396 6.62485 26.8158 6.62485Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { InstagramIcon };
```

#### `src/components/icons/TelegramIcon.tsx`
```tsx
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function TelegramIcon({
  size,
  width = size,
  height = size,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9392 22.3951L12.9265 22.3974L12.8446 22.4378L12.8215 22.4424L12.8054 22.4378L12.7235 22.3974C12.7112 22.3935 12.7019 22.3955 12.6958 22.4031L12.6912 22.4147L12.6716 22.9084L12.6773 22.9315L12.6889 22.9465L12.8088 23.0319L12.8261 23.0365L12.84 23.0319L12.96 22.9465L12.9738 22.928L12.9784 22.9084L12.9588 22.4158C12.9557 22.4035 12.9492 22.3966 12.9392 22.3951ZM13.2449 22.2647L13.2299 22.267L13.0165 22.3743L13.005 22.3858L13.0015 22.3985L13.0223 22.8946L13.028 22.9084L13.0373 22.9165L13.2691 23.0238C13.2838 23.0276 13.2949 23.0246 13.3026 23.0146L13.3072 22.9984L13.268 22.2901C13.2641 22.2762 13.2565 22.2678 13.2449 22.2647ZM12.4201 22.267C12.415 22.2639 12.4089 22.2629 12.4031 22.2642C12.3973 22.2655 12.3922 22.269 12.3889 22.2739L12.382 22.2901L12.3428 22.9984C12.3435 23.0123 12.3501 23.0215 12.3624 23.0261L12.3797 23.0238L12.6116 22.9165L12.6231 22.9073L12.6277 22.8946L12.6473 22.3985L12.6439 22.3847L12.6323 22.3731L12.4201 22.267Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.2269 0.673598C21.5119 0.553609 21.824 0.512226 22.1305 0.553755C22.437 0.595284 22.7268 0.718207 22.9696 0.909731C23.2125 1.10125 23.3996 1.35438 23.5115 1.64275C23.6233 1.93112 23.6559 2.24421 23.6057 2.54941L20.9892 18.42C20.7354 19.9509 19.0557 20.8288 17.6517 20.0662C16.4773 19.4283 14.733 18.4454 13.1641 17.4198C12.3796 16.9064 9.97658 15.2625 10.2719 14.0927C10.5257 13.0925 14.5634 9.33396 16.8707 7.09936C17.7763 6.22144 17.3633 5.715 16.2939 6.52254C13.6382 8.52756 9.37438 11.5766 7.96464 12.4349C6.72102 13.1917 6.07267 13.3209 5.29743 13.1917C3.88307 12.9564 2.57138 12.5918 1.5008 12.1477C0.054143 11.5478 0.124515 9.55892 1.49965 8.97979L21.2269 0.673598Z"
      />
    </svg>
  );
}

export { TelegramIcon };
```

#### `src/components/icons/GoArrowUpRight.tsx`
```tsx
import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function GoArrowUpRight({
  size,
  width = size || "1em",
  height = size || "1em",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" />
    </svg>
  );
}

export { GoArrowUpRight };
```

#### `src/components/icons/index.ts`
```tsx
export { default as LinkedInIcon, LinkedInIcon as LinkedIn } from "./LinkedInIcon";
export { default as XIcon, XIcon as X } from "./XIcon";
export { default as FacebookIcon, FacebookIcon as Facebook } from "./FacebookIcon";
export { default as InstagramIcon, InstagramIcon as Instagram } from "./InstagramIcon";
export { default as TelegramIcon, TelegramIcon as Telegram } from "./TelegramIcon";
export { default as GoArrowUpRight, GoArrowUpRight as ArrowUpRight } from "./GoArrowUpRight";
export type { IconProps } from "./LinkedInIcon";
```

---

## 5. Verification Method

### 5.1 Verification Commands
To independently verify type compliance and linting:
1. **TypeScript Type Checking**:
   ```cmd
   cmd /c npx tsc --noEmit
   ```
   *Expected result*: Exit code 0, 0 type errors. (Tested and verified with proposed files).
2. **ESLint Static Code Analysis**:
   ```cmd
   cmd /c npm run lint
   ```
   *Expected result*: Exit code 0, 0 ESLint errors. (Tested and verified).

### 5.2 Files to Inspect
- Proposed files in:
  `d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\teamwork_explorer_m2_2\proposed_*`
- Reference files in:
  `d:\Space\Faarns\next.js\faarns-2.0\src\Components\Icon\`
  `d:\Space\Faarns\next.js\faarns-2.0\node_modules\react-icons\go\index.js`
- Target location upon M2 worker execution:
  `d:\Space\Faarns\next.js\faarns-web\src\components\icons\`

### 5.3 Invalidation Conditions
- Any TypeScript compilation failure or missing type exports.
- Any discrepancy between the SVG path string in `GoArrowUpRight.tsx` and the Octicons path in `react-icons/go`.
- Any naming collision or broken imports with existing `@/components/Icons`.
