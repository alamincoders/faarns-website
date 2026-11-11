# Scope: Milestone 1 - Architecture & Tooling Modernization

## Architecture
Restructure `faarns-web` codebase into a clean, modular `src/` directory layout (`src/app/`, `src/components/`, `src/lib/`, `src/content/`), update TypeScript path mapping `@/*` -> `./src/*`, configure Tailwind CSS v4 using `@tailwindcss/postcss` and `postcss.config.mjs`, initialize shadcn/ui with `components.json` and `src/lib/utils.ts` (`cn()`), set up flat `eslint.config.mjs` with `eslint-config-next`, and integrate `src/app/globals.css` with `@import "tailwindcss";`, `@import "tw-animate-css";`, `@theme inline`, `:root` shadcn variables, while preserving all existing 383 lines of custom CSS tokens and classes.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | `src/` Directory Layout | Restructure codebase into clean `src/` directory (`src/app`, `src/components`, `src/lib`, `src/content`) | M1 | Survey (R1) |
| 2 | TypeScript Path Mapping | Update `tsconfig.json` paths to map `@/*` -> `./src/*` | M1 | Survey (R1) |
| 3 | Tailwind CSS v4 Setup | Configure Tailwind CSS v4 with `@tailwindcss/postcss` and `postcss.config.mjs` | M1 | Survey (R2) |
| 4 | shadcn/ui Configuration | Initialize `components.json` and create `src/lib/utils.ts` with `cn()` helper | M1 | Survey (R2) |
| 5 | ESLint Configuration | Add flat `eslint.config.mjs` so `npm run lint` passes non-interactively with 0 errors | M1 | Survey (Acceptance) |
| 6 | Design Tokens & CSS Preservation | Preserve all 383 lines of custom CSS tokens (`--ink`, `--surface`, `--violet`, etc.) and classes in `src/app/globals.css` | M1 | Survey (R2, R3) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1.1 | Directory Migration | Move `app/`, `components/`, `content/`, `lib/` to `src/`; update `tsconfig.json` | none | DONE |
| M1.2 | Styling Modernization | Install Tailwind v4 & plugins, configure `postcss.config.mjs`, `globals.css` | M1.1 | DONE |
| M1.3 | shadcn/ui & ESLint Setup | Create `components.json`, `src/lib/utils.ts`, `eslint.config.mjs` | M1.1, M1.2 | DONE |
| M1.4 | Build & Lint Validation | Ensure `npm run build` and `npm run lint` pass cleanly with exit code 0 | M1.3 | DONE |

## Interface Contracts
### `src/lib/utils.ts` ↔ All Components
- Function: `cn(...inputs: ClassValue[]): string`
- Purpose: Merges Tailwind CSS utility classes cleanly using `clsx` and `twMerge`.
- Error handling: Handles undefined, null, boolean, and array inputs without throwing.

## Code Layout & Write Ownership
- **Milestone 1 Worker**: Owns root configs (`package.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`), `src/lib/utils.ts`, `src/app/globals.css`, directory migration into `src/`.
