## 2026-11-10T05:13:15Z

Migrate and reorganize `faarns-web` into a clean architecture with the latest Next.js, Tailwind CSS v4, and shadcn/ui, preserving all existing design and functionality while adopting architectural patterns from reference projects and copying the footer verbatim from `faarns-2.0`.

Working directory: d:\Space\Faarns\next.js\faarns-web
Integrity mode: development

## Requirements

### R1. Architectural Migration to `src/` Layout
Restructure the `faarns-web` codebase into a clean, modular `src/` directory layout (such as `src/app`, `src/components`, `src/lib`, etc.) informed by the structural architecture of `d:\Space\Faarns\next.js\faarns-2.0` and `d:\Space\Faarns\next.js\mm-enterprise`, without copying unrelated code or logic from those reference projects.

### R2. Framework and Styling Modernization
Upgrade or configure `faarns-web` with the latest Next.js, Tailwind CSS v4, and shadcn/ui (with `components.json`), ensuring all existing styling and dependencies integrate smoothly.

### R3. Visual and Functional Preservation
Retain all existing UI designs, layouts, responsiveness, assets, and page functionality from `faarns-web` so that all user-facing pages match their original look and behavior.

### R4. Footer Replication
Copy the footer component and all of its constituent elements, content, and links verbatim from `d:\Space\Faarns\next.js\faarns-2.0` into `faarns-web`.

## Acceptance Criteria

### Build and Compilation
- [ ] `npm run build` completes successfully with zero TypeScript and ESLint errors.
- [ ] Tailwind CSS v4 is configured and functioning correctly across all pages and components.
- [ ] shadcn/ui is initialized with `components.json` and compatible with the project setup.

### Architecture and File Structure
- [ ] Project source files are organized under `src/` (`src/app`, `src/components`, `src/lib`, etc.).
- [ ] Unrelated code or logic from `faarns-2.0` and `mm-enterprise` is not copied over.

### Component and Visual Fidelity
- [ ] The footer component in `faarns-web` exactly matches the structure, content, and styling of the footer in `faarns-2.0`.
- [ ] Existing pages and components retain their original visual appearance, layout, and interactive features without styling regressions.

---
Working directory: d:\Space\Faarns\next.js\faarns-web
State folder: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\orchestrator
Original request file: d:\Space\Faarns\next.js\faarns-web\.agents\teamwork\ORIGINAL_REQUEST.md
Identity: teamwork_orchestrator
