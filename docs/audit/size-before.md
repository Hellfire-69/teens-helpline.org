# Repository Code Size & Dependency Count (Baseline — Before)

**Date:** 2026-11-14T15:37:00Z  
**Target Repository:** `D:\Project\TeensHelpline-Final-Project\teenshelpline-org`  
**Branch:** `chore/repo-hygiene` (baseline audit)  

---

## 1. Executive Summary

| Metric | Count | Measurement Methodology / Tool |
|---|---|---|
| **Total Dependencies** | **53** | `package.json` (`dependencies` + `devDependencies`) |
| ↳ Runtime `dependencies` | 31 | `package.json` `dependencies` block |
| ↳ Build/Dev `devDependencies` | 22 | `package.json` `devDependencies` block |
| **Total Tracked Git Files** | **445** | `git ls-files \| Measure-Object` |
| **Tracked Non-Binary Files** | **434** | Filtering out `.png`, `.pdf`, `.docx`, `.ico` |
| **Application Source & Content** | **15,794 lines** | `app/`, `features/`, `components/`, `lib/`, `services/`, `stores/`, `hooks/`, `types/`, `styles/`, `supabase/`, `content/`, `scripts/` (237 files) |
| **Application TS/TSX Code** | **16,197 lines** | All `.ts` (5,041 lines) + `.tsx` (11,156 lines) files (218 files) |
| **Test Code** | **873 lines** | `tests/` directory (15 files) |
| **Documentation** | **3,678 lines** | `docs/` and root Markdown files (23 files) |
| **Root Configs & Build Infra** | **754 lines** | Next, Tailwind, PostCSS, ESLint, Vitest, Playwright, TS config (28 files) |
| **Root Lockfiles & Report Artifacts** | **18,737 lines** | `package-lock.json` (14,916), `lighthouse-report.html` (2,582), diffs (1,239) |
| **Agent Skills Stored In Repo** | **49,004 lines** | `.agents/` directory (134 files) |
| **Total Tracked Non-Binary Lines** | **89,765 lines** | Sum across all 434 non-binary tracked files |

---

## 2. Dependency Count Analysis (`package.json`)

**Methodology Command:**
```powershell
$pkg = Get-Content "package.json" | ConvertFrom-Json
$deps = ($pkg.dependencies.PSObject.Properties | Measure-Object).Count
$devDeps = ($pkg.devDependencies.PSObject.Properties | Measure-Object).Count
Write-Output "Dependencies: $deps, DevDependencies: $devDeps, Total: $($deps + $devDeps)"
```

### Runtime Dependencies (31 packages)
```json
{
  "@base-ui/react": "^1.6.0",
  "@google/generative-ai": "^0.24.1",
  "@hookform/resolvers": "^5.1.1",
  "@phosphor-icons/react": "^2.1.10",
  "@radix-ui/react-slot": "^1.3.0",
  "@react-three/drei": "^10.7.7",
  "@react-three/fiber": "^9.6.1",
  "@supabase/ssr": "^0.6.1",
  "@supabase/supabase-js": "^2.49.8",
  "@types/three": "^0.185.1",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^4.4.0",
  "framer-motion": "^12.42.2",
  "groq-sdk": "^1.3.0",
  "lottie-react": "^2.4.0",
  "lucide-react": "^1.25.0",
  "motion": "^11.18.2",
  "next": "16.2.10",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-hook-form": "^7.57.0",
  "react-markdown": "^10.1.0",
  "react-textarea-autosize": "^8.5.9",
  "sanitize-html": "^2.17.6",
  "shadcn": "^4.13.1",
  "tailwind-merge": "^3.6.0",
  "three": "^0.185.1",
  "tw-animate-css": "^1.4.0",
  "zod": "^3.25.67",
  "zustand": "^5.0.5"
}
```

### Development Dependencies (22 packages)
```json
{
  "@axe-core/playwright": "^4.12.1",
  "@playwright/test": "^1.52.0",
  "@types/jsdom": "^28.0.3",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@types/sanitize-html": "^2.16.1",
  "@vitejs/plugin-react": "^4.5.2",
  "@vitest/coverage-v8": "^3.2.4",
  "autoprefixer": "^10.4.21",
  "dotenv": "^17.4.2",
  "eslint": "^9",
  "eslint-config-next": "16.2.10",
  "eslint-plugin-react": "^7.37.5",
  "eslint-plugin-react-hooks": "^7.1.1",
  "jsdom": "^29.1.1",
  "postcss": "^8.5.6",
  "prettier": "^3.5.3",
  "tailwindcss": "^3.4.17",
  "typescript": "^5",
  "typescript-eslint": "^8.35.1",
  "vitest": "^3.2.4"
}
```

---

## 3. Code Size Breakdown by Directory

**Methodology Command:**
```powershell
git ls-files | ForEach-Object {
    $file = $_
    $topDir = if ($file -match "^([^/]+)/") { $matches[1] } else { "(root)" }
    $ext = [System.IO.Path]::GetExtension($file)
    $lines = if ($ext -in @('.png','.jpg','.jpeg','.gif','.ico','.pdf','.docx')) { 0 } else {
        (Get-Content -LiteralPath $file -ErrorAction SilentlyContinue | Measure-Object -Line).Lines
    }
    [PSCustomObject]@{ TopDir = $topDir; Lines = $lines }
} | Group-Object TopDir | ForEach-Object {
    [PSCustomObject]@{ Directory = $_.Name; Files = $_.Count; Lines = ($_.Group | Measure-Object -Property Lines -Sum).Sum }
} | Sort-Object Lines -Descending
```

| Directory | Files | Total Non-Binary Lines | Description |
|---|---|---|---|
| `.agents/` | 134 | 49,004 | AI agent skill sets checked into repository |
| `(root)` | 23 | 19,701 | `package-lock.json` (14,916), HTML reports, configs, diffs |
| `features/` | 98 | 8,011 | Feature slices: Nova, Auth, Consultation, Mood, etc. |
| `app/` | 80 | 4,086 | App router page layouts, server actions, client pages |
| `docs/` | 11 | 3,015 | Architecture specs, Design.md, TRD, PRD, Schemas |
| `components/` | 16 | 1,774 | Shared navigation, crisis banners, UI primitives |
| `tests/` | 15 | 873 | Unit/integration (Vitest) & E2E (Playwright) suites |
| `scratch/` | 3 | 848 | Temporary scratchpad artifacts |
| `types/` | 2 | 608 | Shared TypeScript type definitions |
| `supabase/` | 16 | 508 | Migrations, seed scripts, schema definitions |
| `content/` | 8 | 289 | Study hub educational markdown content |
| `lib/` | 7 | 281 | Cross-cutting Supabase clients, utils, error helpers |
| `.github/` | 2 | 159 | Workflows & PR templates |
| `services/` | 5 | 135 | AI abstraction layer (Gemini, Groq, Provider) |
| `styles/` | 2 | 133 | `globals.css` and style tokens |
| `scripts/` | 2 | 122 | Database seeds and test latency utilities |
| `stores/` | 7 | 120 | Zustand memory stores |
| `hooks/` | 2 | 16 | Shared React hooks |
| `public/` | 11 | 5 | Favicon, SVG vectors, static manifests |
| `utils/` | 1 | 0 | Empty utility placeholder |
| **Total** | **445** | **89,765** | **All tracked files (excluding binaries)** |

---

## 4. Code Size Breakdown by File Type

| Extension | File Count | Lines of Code | Primary Role |
|---|---|---|---|
| `.mjs` | 63 | 24,692 | Agent skill scripts & ESLint configs |
| `.json` | 9 | 16,064 | `package-lock.json` (14,916), `package.json`, `components.json` |
| `.js` | 5 | 15,292 | Agent skill helpers and scripts |
| `.md` | 77 | 12,457 | Design documentation, specifications, agent guides |
| `.tsx` | 109 | 11,156 | React UI components, pages, forms |
| `.ts` | 109 | 5,041 | TypeScript logic, stores, services, schemas, tests |
| `.html` | 1 | 2,582 | Stored Lighthouse report artifact |
| `.txt` / `.diff` | 3 | 1,239 | Git diff snapshots in root |
| `.sql` | 13 | 507 | Supabase SQL migration files |
| `.css` | 3 | 296 | Global styles and CSS modules |
| Others (`.yml`, `.toml`, etc.) | 32 | 439 | Configs, gitattributes, gitignore |
