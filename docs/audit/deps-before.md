# Dependency & Client Bundle Analysis (Baseline — Before)

**Date:** 2026-11-14T15:38:00Z  
**Target Repository:** `D:\Project\TeensHelpline-Final-Project\teenshelpline-org`  
**Branch:** `chore/repo-hygiene` (baseline audit)  
**Methodology:** Comprehensive static AST/regex import search across all application directories (`app/`, `features/`, `components/`, `lib/`, `services/`, `stores/`, `types/`, `styles/`, `tests/`) excluding `node_modules/`, `.next/`, and `.agents/`. All numbers derived directly from codebase inspection tools.

---

## 1. Executive Summary

- **Total Runtime Dependencies:** 31
- **Active Dependencies in Code:** 24
- **Completely Unused Dependencies:** 7 (`three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `lottie-react`, `shadcn`, `react-dom`)
- **Duplicated Libraries:**
  - **Animation:** `framer-motion` (11 files) vs `motion` (40 files)
  - **Icons:** `lucide-react` (15 files) vs `@phosphor-icons/react` (52 files)
- **Dead Weight on Disk:** ~26.08 MB in `node_modules` from completely unimported packages (`three` ecosystem + `lottie-react`).

---

## 2. Complete Dependency Usage Matrix

Every dependency listed under `"dependencies"` in `package.json` was audited for actual import statements across the codebase.

| Dependency | Imports | Files | Status | Usage Scope / Sample Files |
|---|---|---|---|---|
| `next` | 103 | 79 | **Active** | Core framework (`next/link`, `next/navigation`, `next/image`, `next/server`) |
| `react` | 67 | 65 | **Active** | Core library (`useState`, `useEffect`, `useRef`, etc.) |
| `@phosphor-icons/react` | 52 | 52 | **Active** | Primary icon system throughout marketing, dashboard, Nova, study hub |
| `motion` | 41 | 40 | **Active** | Primary animation library (`motion/react`) |
| `lucide-react` | 15 | 15 | **Duplicate** | Secondary icon system in auth, journal, profile, dialog |
| `zod` | 13 | 13 | **Active** | Schema validation across auth, consultation, admin, profile |
| `framer-motion` | 11 | 11 | **Duplicate** | Legacy animation imports in onboarding steps, signin, signup |
| `@supabase/supabase-js` | 9 | 9 | **Active** | Database, Auth client & types |
| `zustand` | 7 | 7 | **Active** | In-memory state stores (Nova, Journal, Onboarding, Peer Support) |
| `react-textarea-autosize` | 4 | 4 | **Active** | Dynamic chat composer inputs & consultation forms |
| `@supabase/ssr` | 3 | 3 | **Active** | Server-side Supabase client & middleware cookies |
| `react-hook-form` | 3 | 3 | **Active** | Consultation booking forms |
| `@hookform/resolvers` | 3 | 3 | **Active** | Zod resolvers for React Hook Form |
| `@base-ui/react` | 2 | 2 | **Active** | Primitives for dialog (`components/ui/dialog.tsx`) and select |
| `class-variance-authority` | 2 | 2 | **Active** | UI component variant definitions (`button.tsx`, `card.tsx`) |
| `react-markdown` | 2 | 2 | **Active** | Markdown rendering in Nova messages and Study Hub articles |
| `sanitize-html` | 2 | 2 | **Active** | Sanitizing journal entries and peer chat text |
| `@google/generative-ai` | 1 | 1 | **Active** | Gemini AI SDK (`services/ai/gemini.ts`) |
| `groq-sdk` | 1 | 1 | **Active** | Groq AI SDK (`services/ai/groq.ts`) |
| `@radix-ui/react-slot` | 1 | 1 | **Active** | Button Slot primitive (`components/ui/button.tsx`) |
| `clsx` | 1 | 1 | **Active** | Class utility (`lib/utils.ts`) |
| `tailwind-merge` | 1 | 1 | **Active** | Tailwind class merge utility (`lib/utils.ts`) |
| `date-fns` | 1 | 1 | **Active** | Consultation appointment list date formatting |
| `tw-animate-css` | 1 | 1 | **Active** | CSS import in `styles/globals.css:1` |
| `@react-three/fiber` | **0** | **0** | **UNUSED** | Zero imports anywhere in repo |
| `@react-three/drei` | **0** | **0** | **UNUSED** | Zero imports anywhere in repo |
| `three` | **0** | **0** | **UNUSED** | Zero imports anywhere in repo |
| `@types/three` | **0** | **0** | **UNUSED** | Zero imports anywhere in repo |
| `lottie-react` | **0** | **0** | **UNUSED** | Zero imports anywhere in repo |
| `shadcn` | **0** | **0** | **UNUSED** | CLI utility inadvertently added to runtime `dependencies` |
| `react-dom` | **0** | **0** | **Framework** | Managed internally by Next.js 16 |

---

## 3. In-Depth Analysis of Critical Problem Areas

### 3.1 Three.js & Lottie Ecosystem: 100% Dead Weight

A major finding is that **Three.js** and **Lottie** packages are present in `package.json` and installed in `node_modules`, but **are never imported in any file in the application**.

- **Packages:**
  - `three` (^0.185.1)
  - `@react-three/fiber` (^9.6.1)
  - `@react-three/drei` (^10.7.7)
  - `@types/three` (^0.185.1)
  - `lottie-react` (^2.4.0)
- **Disk Size in `node_modules`:**
  - `three`: 22.10 MB (1,195 files)
  - `@react-three/fiber`: 2.08 MB (37 files)
  - `@react-three/drei`: 1.67 MB (483 files)
  - `lottie-react`: 0.23 MB (13 files)
  - **Total Disk Footprint:** **26.08 MB**
- **Client Bundle Cost:**
  - In a standard production build, `three` core alone adds ~160 KB – 600 KB (minified + gzipped) if bundled.
  - Because there are zero import statements (`import ... from 'three'`, `from '@react-three/...'`, or `from 'lottie-react'`), these packages currently do not enter the client webpack/turbopack graph, but they significantly bloat `node_modules`, install times, CI/CD pipeline cache, and container image sizes.

---

### 3.2 Dual Animation Libraries: `framer-motion` vs `motion`

The repository has two versions of the Framer Motion library installed simultaneously:
1. `motion` (`^11.18.2`) — The modern unified package from Motion (formerly Framer Motion v11+).
2. `framer-motion` (`^12.42.2`) — The legacy package name.

#### Codebase Import Split:
- **`motion` (`motion/react`):** Imported in **40 files** (41 occurrences).
  - Used in: `app/(main)/chat/page.tsx`, `app/(public)/about`, `app/(public)/contact`, `app/(public)/parents`, `app/(public)/schools`, `components/shared/aurora-mesh.tsx`, `components/shared/navigation.tsx`, `components/ui/button.tsx`, `components/ui/card.tsx`, `features/marketing/*`, `features/nova/*`, `features/mood-engine/*`, `features/peer-support/*`, `features/study-hub/*`.
- **`framer-motion`:** Imported in **11 files** (11 occurrences).
  - Used in:
    1. `app/(auth)/signin/page.tsx:7`
    2. `app/(auth)/signup/page.tsx:7`
    3. `components/ui/scroll-expansion-hero.tsx:10`
    4. `features/onboarding/components/steps/AvatarStep.tsx:2`
    5. `features/onboarding/components/steps/ConcernStep.tsx:2`
    6. `features/onboarding/components/steps/MoodStep.tsx:2`
    7. `features/onboarding/components/steps/NovaWelcomeStep.tsx:4`
    8. `features/onboarding/components/steps/StepContainer.tsx:1`
    9. `features/onboarding/components/steps/WelcomeStep.tsx:4`
    10. `features/onboarding/components/OnboardingEnvironment.tsx:4`
    11. `features/peer-support/components/chat-interface.tsx:11`

#### Impact:
- **Duplicate Bundle Overhead:** `framer-motion` (4.57 MB in `node_modules`) and `motion` (4.44 MB in `node_modules`) are both resolved in the dependency tree.
- When client components import `framer-motion` (e.g., auth pages, onboarding modal), Next.js cannot reuse the vendor chunks containing `motion/react`, forcing the browser to download two separate animation runtimes (~35–50 KB gzipped each).
- **Consolidation Path:** Migrate all 11 files from `from "framer-motion"` to `from "motion/react"` and remove `framer-motion` from `package.json`.

---

### 3.3 Dual Icon Libraries: `@phosphor-icons/react` vs `lucide-react`

The repository loads two different icon systems:
1. `@phosphor-icons/react` (`^2.1.10`) — Specified by `Design.md` as the primary design token icon system.
2. `lucide-react` (`^1.25.0`) — Secondary icon library.

#### Codebase Import Split:
- **`@phosphor-icons/react`:** Imported in **52 files** across the application.
  - Used throughout marketing, Nova, peer support, dashboards, study hub, consultation, navigation, and crisis safety bars.
- **`lucide-react`:** Imported in **15 files**:
  1. `app/(auth)/signin/page.tsx` (`ArrowRight`, `UserCircle`, `Loader2`)
  2. `app/(auth)/signup/page.tsx` (`Loader2`)
  3. `app/(main)/dashboard/parent/error.tsx` (`AlertTriangle`)
  4. `app/(main)/dashboard/parent/page.tsx` (`AlertCircle`)
  5. `app/(main)/dashboard/teen/error.tsx` (`AlertTriangle`)
  6. `app/(main)/dashboard/teen/page.tsx` (`AlertCircle`)
  7. `components/shared/crisis-banner.tsx` (`Phone`, `AlertTriangle`)
  8. `components/shared/quick-exit.tsx` (`LogOut`)
  9. `components/ui/dialog.tsx` (`XIcon`)
  10. `components/ui/select.tsx` (`ChevronDownIcon`, `CheckIcon`, `ChevronUpIcon`)
  11. `features/journal/components/journal-empty-state.tsx` (`PenLine`)
  12. `features/journal/components/journal-list.tsx` (`Trash2`)
  13. `features/onboarding/components/steps/NovaWelcomeStep.tsx` (`Loader2`, `User`, `Users`)
  14. `features/peer-support/components/report-dialog.tsx` (`Flag`, `Loader2`)
  15. `features/profile/components/profile-form.tsx` (`AlertCircle`, `CheckCircle`, `Mail`, `Calendar`, `Sparkles`, `User`)

#### Impact:
- **Disk & Network Weight:** `lucide-react` adds 29.42 MB (4,034 files) in `node_modules`, while `@phosphor-icons/react` adds 32.25 MB (9,089 files).
- **Design Inconsistency:** Lucide icons have different stroke widths, corner radii, and optical weights compared to Phosphor icons, violating `Design.md` §7 icon guidelines.
- **Consolidation Path:** Replace the 15 `lucide-react` imports with equivalent Phosphor icons (`CircleNotch` for `Loader2`, `WarningCircle` for `AlertTriangle`/`AlertCircle`, `X` for `XIcon`, `CaretDown`/`CaretUp` for chevrons) and remove `lucide-react`.

---

## 4. Prioritized Cleanup Recommendations (For Future Step)

> *Note: In accordance with baseline audit rules, no packages have been modified or removed during this step.*

| Priority | Target Package | Action | Justification |
|---|---|---|---|
| **P0** | `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` | Remove from `dependencies` | 0 imports; eliminates 25.85 MB from `node_modules` and prevents accidental client bundle leakage. |
| **P0** | `lottie-react` | Remove from `dependencies` | 0 imports; eliminates unused 228 KB package and Lottie runtime. |
| **P1** | `framer-motion` | Migrate 11 files to `motion/react`, then remove | Unifies animation engine on `motion` v11+; avoids dual runtime download. |
| **P1** | `lucide-react` | Migrate 15 files to `@phosphor-icons/react`, then remove | Enforces `Design.md` visual consistency and eliminates 29.4 MB second icon suite. |
| **P2** | `shadcn` | Move to `devDependencies` or remove | CLI tool incorrectly placed in production `dependencies`. |
