# Architectural Survey & Handoff Report: `mm-enterprise` Reference Project

## 1. Observation

### 1.1 Project Structure & Root Configuration Files
Direct inspection of `d:\Space\Faarns\next.js\mm-enterprise` reveals the following root configuration and structure:
- **`package.json`**:
  - `name`: `"mm-enterprise"`, `version`: `"0.1.0"`, `private`: `true`
  - Scripts:
    ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "eslint"
    }
    ```
  - Core framework dependencies (`package.json:11-28`):
    ```json
    "dependencies": {
      "@base-ui/react": "^1.9.0",
      "@gsap/react": "^2.1.2",
      "class-variance-authority": "^0.7.1",
      "clsx": "^2.1.1",
      "cn": "^0.4.0",
      "gsap": "^3.15.0",
      "lucide-react": "^1.55.0",
      "motion": "^14.5.0",
      "next": "16.4.0",
      "react": "19.3.0",
      "react-dom": "19.3.0",
      "react-hook-form": "^7.90.0",
      "react-toastify": "^11.1.0",
      "shadcn": "^4.21.4",
      "tailwind-merge": "^3.7.0",
      "tw-animate-css": "^1.4.0"
    }
    ```
  - Core devDependencies (`package.json:29-39`):
    ```json
    "devDependencies": {
      "@tailwindcss/turbopack": "^4",
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      "babel-plugin-react-compiler": "1.0.0",
      "eslint": "^9",
      "eslint-config-next": "16.4.0",
      "tailwindcss": "^4",
      "typescript": "^5"
    }
    ```
  - Noticeable absence: No `tailwind.config.js`, `tailwind.config.ts`, `postcss.config.js`, or `postcss.config.mjs` at root.

### 1.2 Next.js Turbopack & Tailwind CSS v4 Configuration
- **`next.config.ts`** (`d:\Space\Faarns\next.js\mm-enterprise\next.config.ts:1-21`):
  ```ts
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
      agentFeedback: true,
    },
    cacheComponents: true,
    partialPrefetching: true,
    reactCompiler: true,
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };

  export default nextConfig;
  ```
- **Build verification**:
  Running `next build` with Turbopack compiles successfully:
  ```
  ▲ Next.js 16.4.0 (Turbopack)
  ✓ Running next.config.ts took 2.0s
  - Cache Components enabled
  - Partial Prefetching enabled
    Creating an optimized production build ...
  ✓ Compiled successfully in 27.0s
    Running TypeScript ...
    Finished TypeScript in 14.2s ...
  ✓ Generating static pages using 7 workers (9/9) in 1474ms
  ```
- Contrast with `faarns-2.0`:
  `faarns-2.0` uses `@tailwindcss/postcss` with `postcss.config.mjs`:
  ```js
  const config = {
    plugins: ["@tailwindcss/postcss"],
  };
  export default config;
  ```
  Both approaches operate on Tailwind CSS v4, but `mm-enterprise` demonstrates the pure Turbopack loader integration (`@tailwindcss/turbopack`).

### 1.3 Tailwind CSS v4 CSS Architecture
- **CSS Entrypoint**: `d:\Space\Faarns\next.js\mm-enterprise\src\styles\globals.css`
  - Imports:
    ```css
    @import "tailwindcss";
    @import "tw-animate-css";
    ```
  - Custom dark mode variant:
    ```css
    @custom-variant dark (&:is(.dark *));
    ```
  - Modern inline `@theme` block (`globals.css:6-66`):
    Defines custom font variables, brand colors, surfaces, borders, and radii directly in CSS without a JavaScript config file:
    ```css
    @theme inline {
      --font-sans: var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-inter: var(--font-inter), "Inter", sans-serif;
      --font-heading: var(--font-montserrat), "Montserrat", sans-serif;
      --font-montserrat: var(--font-montserrat), "Montserrat", sans-serif;
      --color-primary: #51ba2f;
      --color-background: #252424;
      --color-foreground: #fef4eb;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-full: 9999px;
    }
    ```
  - Standard shadcn/ui semantic variables in `:root` (`globals.css:68-89`):
    ```css
    :root {
      --background: #252424;
      --foreground: #fef4eb;
      --card: #232120;
      --card-foreground: #fef4eb;
      --popover: #232120;
      --popover-foreground: #fef4eb;
      --primary: #51ba2f;
      --primary-foreground: #0c0c0c;
      --secondary: #221e1e;
      --secondary-foreground: #fef4eb;
      --muted: #fef4eb08;
      --muted-foreground: #fef4ebe6;
      --accent: #fbb63f;
      --accent-foreground: #0c0c0c;
      --destructive: #ef4444;
      --destructive-foreground: #ffffff;
      --border: #fef4eb2b;
      --input: #fef4eb1a;
      --ring: #51ba2f;
      --radius: 12px;
    }
    ```
  - Base resets (`globals.css:91-118`):
    ```css
    @layer base {
      html {
        scroll-behavior: smooth;
      }
      * {
        border-color: var(--border);
        outline-color: var(--ring);
      }
      body {
        background-color: var(--background);
        color: var(--foreground);
        font-family: var(--font-sans);
        overflow-x: clip;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
      }
      button {
        cursor: pointer;
      }
    }
    ```

### 1.4 shadcn/ui Configuration & Implementation
- **`components.json`** (`d:\Space\Faarns\next.js\mm-enterprise\components.json:1-27`):
  ```json
  {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "base-vega",
    "rsc": true,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/styles/globals.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "iconLibrary": "lucide",
    "rtl": false,
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    },
    "menuColor": "default",
    "menuAccent": "subtle",
    "registries": {
      "@magicui": "https://magicui.design/r/{name}"
    }
  }
  ```
- **Utility Function** (`d:\Space\Faarns\next.js\mm-enterprise\src\lib\utils.ts:1-7`):
  ```ts
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```
- **Component Primitives**:
  Located in `src/components/ui/` (`button.tsx`, `capsule-button.tsx`, `dialog.tsx`, `HomepageMotion.tsx`, `Reveal.tsx`, `scroll-reveal.tsx`, `select.tsx`, `sheet.tsx`, `text-animate.tsx`).
  Uses `@base-ui/react` (Base UI primitives by MUI/React) integrated with `class-variance-authority` and `data-slot` selectors (e.g. `data-slot="button"`).

### 1.5 TypeScript Path Aliasing
- **`tsconfig.json`** (`d:\Space\Faarns\next.js\mm-enterprise\tsconfig.json:1-34`):
  ```json
  {
    "compilerOptions": {
      "target": "ES2017",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "react-jsx",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": [
      "next-env.d.ts",
      "**/*.ts",
      "**/*.tsx",
      ".next/types/**/*.ts",
      ".next/dev/types/**/*.ts",
      "**/*.mts"
    ],
    "exclude": ["node_modules"]
  }
  ```
  The `@/*` alias cleanly resolves all internal imports to `./src/*`.

### 1.6 Directory Architecture (`src/` Tree)
The directory layout in `mm-enterprise` is structured as:
```
mm-enterprise/
├── public/
│   ├── images/
│   └── logo/
├── src/
│   ├── app/
│   │   ├── about-us/page.tsx
│   │   ├── api/contact/route.ts
│   │   ├── contact/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── leadership/page.tsx
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/         # Shell components: Navbar, Footer, MobileNavSheet
│   │   ├── scenes/         # Page-specific composite scenes/sections
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── gallery/
│   │   │   ├── home/
│   │   │   └── leadership/
│   │   └── ui/             # shadcn atomic UI primitives (button, dialog, sheet, etc.)
│   ├── data/               # Static dataset files (site-config, business, dates, etc.)
│   ├── lib/                # Utility modules (utils.ts)
│   ├── styles/             # Stylesheets (globals.css, etc.)
│   └── types/              # TypeScript definitions (index.ts, about.ts, contact.ts)
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 2. Logic Chain

1. **Restructuring `faarns-web` to `src/` Layout**:
   - *Observation*: `faarns-web` currently locates `app/`, `components/`, `content/`, and `lib/` in the project root, with `paths: { "@/*": ["./*"] }` in `tsconfig.json`.
   - *Logic*: Adopting `mm-enterprise`'s layout requires creating `src/` and moving `app/`, `components/`, `content/`, and `lib/` (and optionally `styles/`) into `src/`.
   - *Logic*: Updating `tsconfig.json` to `"paths": { "@/*": ["./src/*"] }` cleanly preserves all existing `@/components/...` and `@/lib/...` import specifiers without requiring edits to every individual file.

2. **Tailwind CSS v4 Configuration Strategy**:
   - *Observation*: `mm-enterprise` uses Tailwind CSS v4 via `@import "tailwindcss";` in `src/styles/globals.css`, with `@theme inline` defining theme tokens and no `tailwind.config.js`.
   - *Observation*: `faarns-web/app/globals.css` currently contains 383 lines of custom CSS (`.h1`, `.btn`, `.btn-primary`, `.flow`, `.card`, `.ladder`, `.pre`, etc.) and CSS variables (`--ink`, `--surface`, `--violet`, etc.) essential for rendering `faarns-web` pages without regressions (R3).
   - *Logic*: In Tailwind CSS v4, we can import Tailwind at the top of the stylesheet (`@import "tailwindcss";` and `@import "tw-animate-css";`), configure `@theme inline` and `:root` shadcn variables, while preserving all existing `faarns-web` CSS custom properties and classes below it. This provides full access to Tailwind utility classes and shadcn styling while guaranteeing 100% visual fidelity of all existing custom elements.
   - *PostCSS vs Turbopack*: For compilation, `mm-enterprise` uses devDependency `@tailwindcss/turbopack` in `next.config.ts`, while `faarns-2.0` uses `@tailwindcss/postcss` with `postcss.config.mjs`. Using `@tailwindcss/postcss` in `postcss.config.mjs` (or `@tailwindcss/turbopack` when Turbopack is active) provides seamless compatibility across standard Next.js build pipelines and tools.

3. **shadcn/ui Integration Strategy**:
   - *Observation*: `mm-enterprise` defines `components.json` with `"style": "base-vega"`, `"tailwind.config": ""`, `"tailwind.css": "src/styles/globals.css"`, and aliases mapped to `@/components`, `@/lib/utils`, and `@/components/ui`.
   - *Observation*: `src/lib/utils.ts` implements the canonical `cn(...inputs)` combining `clsx` and `twMerge` from `tailwind-merge`.
   - *Logic*: Placing `components.json` and `src/lib/utils.ts` in `faarns-web` initializes shadcn/ui cleanly, satisfies Acceptance Criterion 3, and enables atomic UI components (`src/components/ui/`) without conflicting with existing non-shadcn components.

4. **Preserving Business Logic & Excluding Unrelated Code**:
   - *Observation*: `mm-enterprise` is an enterprise marketing website for wholesale imported dates in Bangladesh (Badamtuli, Dhaka).
   - *Logic*: Requirement R1 and Acceptance Criterion 4 explicitly require that unrelated code or logic from reference projects must NOT be copied. Therefore, all date-specific datasets (`src/data/dates.ts`, `src/data/business.ts`), dates hero/slider scenes (`src/components/scenes/*`), dates routes (`about-us`, `gallery`, `leadership`, `contact`), MM branding/logos, and custom scripts (`google-sheet.js`, `motion-*.cjs`) must remain excluded. Only the architecture, configuration templates, styling primitives, and shadcn setup should be adopted.

---

## 3. Caveats

1. **Base UI vs Radix UI in shadcn**:
   - `mm-enterprise` uses shadcn with `@base-ui/react` primitives (the `base-vega` style). While Base UI works well, standard shadcn components often default to Radix UI. If future shadcn CLI commands are used, either Base UI or Radix primitives can be installed depending on preference; the `cn` utility and Tailwind v4 CSS setup support both interchangeably.
2. **Preflight Reset Impact**:
   - Tailwind CSS v4 injects a base preflight reset. In `faarns-web`, custom button styling (`.btn`, `.btn-primary`) and links (`a`, `button`) must be verified to ensure Tailwind's preflight does not override custom clip-paths, borders, or cursor styles. Moving `faarns-web`'s base rules into `@layer base` or retaining them after `@import "tailwindcss";` safeguards against regression.
3. **Next.js Version Choice**:
   - `mm-enterprise` uses `next: 16.4.0` with `react: 19.3.0`. `faarns-web` is currently on `next: 15.5.26` with `react: 19.1.10`. Note that Next.js 16 can be adopted, or Next.js 15.5+ can be upgraded to the latest stable release while supporting Tailwind CSS v4 and React 19.

---

## 4. Conclusion & Concrete Recommendations

### What to Adopt from `mm-enterprise`:
1. **Directory Structure**:
   - Restructure `faarns-web` into `src/`:
     - `src/app/` (routes, root layout, metadata)
     - `src/components/` (subdivided into `ui/` for shadcn, `layout/` for Navbar/Footer, and sections)
     - `src/lib/` (e.g. `src/lib/utils.ts` for `cn`)
     - `src/styles/` (e.g. `src/styles/globals.css` or `src/app/globals.css`)
     - `src/content/` (faarns-web's content data)
2. **TypeScript Path Aliases (`tsconfig.json`)**:
   - Set `"paths": { "@/*": ["./src/*"] }` and `"moduleResolution": "bundler"`.
3. **shadcn/ui Configuration (`components.json`)**:
   - Adopt the `components.json` template configured for Tailwind v4:
     - `"config": ""`
     - `"css": "src/styles/globals.css"` (or `src/app/globals.css`)
     - `"aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" }`
4. **Tailwind CSS v4 CSS Architecture**:
   - In `globals.css`:
     - `@import "tailwindcss";`
     - `@import "tw-animate-css";`
     - `@custom-variant dark (&:is(.dark *));`
     - `@theme inline { ... }`
     - `:root { ... }` containing shadcn CSS variables
     - Followed by the complete set of existing `faarns-web` custom CSS classes to preserve all styling.
5. **Dependencies to Install in `faarns-web`**:
   - `tailwindcss@^4`, `@tailwindcss/postcss@^4` (or `@tailwindcss/turbopack@^4`)
   - `clsx@^2.1.1`, `tailwind-merge@^3.7.0`, `class-variance-authority@^0.7.1`
   - `tw-animate-css@^1.4.0`
   - `lucide-react@^1.55.0` (or `^0.559.0`)
   - `shadcn` CLI / dev tools

### What NOT to Copy from `mm-enterprise`:
- Domain-specific routes: `src/app/about-us`, `src/app/contact`, `src/app/gallery`, `src/app/leadership`, `src/app/api/contact`.
- Domain-specific components: `src/components/scenes/*` (dates slider, bringing quality section, favourite dates, date detail modal, etc.).
- Domain-specific data and types: `src/data/*` (dates data, business data, testimonials, site-config for MM Enterprise) and `src/types/*` (dates types).
- Brand assets: `public/images/`, `public/logo/`, and MM Enterprise favicon.
- Footer and Navbar: `mm-enterprise` footer is specific to MM Enterprise dates wholesale; `faarns-web` must use the footer copied verbatim from `faarns-2.0` as stipulated by Requirement R4.
- Automation scripts: `google-sheet.js`, `motion-edit.cjs`, `motion-polish.cjs`, `motion-slider-edit.cjs`.

---

## 5. Verification Method

To verify these findings and configurations independently:
1. **Inspect `mm-enterprise` configuration files**:
   - View `d:\Space\Faarns\next.js\mm-enterprise\package.json`
   - View `d:\Space\Faarns\next.js\mm-enterprise\components.json`
   - View `d:\Space\Faarns\next.js\mm-enterprise\next.config.ts`
   - View `d:\Space\Faarns\next.js\mm-enterprise\tsconfig.json`
   - View `d:\Space\Faarns\next.js\mm-enterprise\src\styles\globals.css`
2. **Execute build verification in `mm-enterprise`**:
   - Run `cmd.exe /c "cd /d d:\Space\Faarns\next.js\mm-enterprise && npm run build"`
   - Confirm Turbopack compilation succeeds (`✓ Compiled successfully`, `✓ Generating static pages`).
3. **Verify against `ORIGINAL_REQUEST.md` requirements**:
   - Validate that the proposed `src/` layout matches R1.
   - Validate that the Tailwind v4 and shadcn/ui configuration pattern matches R2.
   - Validate that domain-specific code exclusion honors Acceptance Criterion 4.
