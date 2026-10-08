# Known Issues & Technical Debt

## Crisis Banner: Contrast Fix + Compact/Expand Redesign
**Location**: `components/shared/crisis-banner.tsx`

The global crisis banner currently fails WCAG AA color contrast ratios for normal and bold text. Because this is a safety-critical component that appears globally, fixing it requires deliberate design consideration and its own dedicated feature branch, separate from the Dashboard feature branch.

Additionally, this ticket scopes in a compact/expand redesign:
- **Default view**: Shows a single primary number (CHILDLINE 1098) as a real tappable `tel:1098` link.
- **Expand affordance**: A "See all crisis support options" link/button that either expands the banner or links to a new dedicated page listing all 5 helplines as real `tel:` links.

**Axe-core Scan Details**:
- **Impact**: serious
- **Foreground Color**: `#e8654f` (text-signal-crisis)
- **Background Color**: `#f8eaeb` (bg-signal-crisis/10)
- **Contrast Ratio**: 2.8:1
- **Expected Contrast Ratio**: 4.5:1
- **Affected Nodes**:
  - `<span>Need immediate help? You're not alone. Reach out 24/7.</span>`
  - `<span class="font-bold text-signal-crisis">1098</span>`
  - All other hotline phone number spans in the banner.

_Action Required: Re-evaluate the color tokens for `signal-crisis` to ensure accessibility compliance without losing the visual urgency of the banner._

## Missing MVP Tables: appointments, audit_logs, contact_messages
**Location**: \Database-Schema.md\ ง3.8, ง3.15, ง3.16

The tables \ppointments\, \udit_logs\, and \contact_messages\ are defined in the database schema documentation but have not been implemented in any SQL migration file. These are known gaps against the MVP scope and need to be built in a future sprint to fulfill the schema requirements.


## Deferred from structure refactor

### 1. Cross-Feature Internal Imports (AGENTS.md ยง7 Violations)
The following files import internals from other feature modules instead of their public entry points:
- features/profile/components/profile-form.tsx: imports Companion from @/features/onboarding/components/companions/Companions
- features/consultation/components/basic/basic-consultation-form.tsx: imports useNovaStore from @/features/nova/store
- features/dashboard/service.ts: imports getUserMoodHistory from @/features/mood-engine/service and getUserSessions from @/features/peer-support/service
- features/journal/components/journal-composer.tsx and journal-list.tsx: import useAuth from @/features/auth/components/auth-provider
- features/onboarding/components/steps/NovaWelcomeStep.tsx: imports completeOnboardingAction from @/features/auth/actions
- features/nova/components/persona-switcher.tsx: imports savePreferredPersonaAction from @/features/auth/actions
- features/settings/service.ts: imports getCurrentUserWithRole from @/features/auth/server and signOutAction from @/features/auth/actions
- features/profile/service.ts: imports getCurrentUserWithRole from @/features/auth/server and signOutAction from @/features/auth/actions

### 2. Direct process.env Access Bypassing lib/env.ts
Environment variables are accessed directly without centralized Zod schema validation:
- lib/supabase/middleware-client.ts (lines 10-11: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- lib/supabase/server.ts (lines 26-27: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- features/auth/actions.ts (line 44: NODE_ENV)
- scripts/verify-seed.ts (lines 6-7: SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL)
- scripts/seed-study-hub.ts (lines 8-9: SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL)
- scripts/test-latency.ts (line 21: mutates process.env.GEMINI_API_KEY)

### 3. Missing server-only Package Guard
No server-side database utilities, queries, or AI provider implementations import server-only to prevent accidental bundling into client components.

### 4. PascalCase Component Files vs. AGENTS.md ยง8 Naming Rule
AGENTS.md ยง8 mandates kebab-case for all files. 20 component files currently use PascalCase.tsx:
- features/marketing/components/: Hero.tsx, Navbar.tsx, Footer.tsx, FeaturesGrid.tsx, Flow.tsx, Trust.tsx, Testimonials.tsx, ConcernsGrid.tsx, FAQ.tsx, Parents.tsx, Schools.tsx, PeerSupportSection.tsx, NovaCallout.tsx
- features/onboarding/components/: Companions.tsx, OnboardingEnvironment.tsx, StepContainer.tsx, WelcomeStep.tsx, AvatarStep.tsx, MoodStep.tsx, ConcernStep.tsx, NovaWelcomeStep.tsx
(Decision pending: normalize to kebab-case in a dedicated commit or update AGENTS.md conventions for React components).

### 5. Apparent Orphan Feature Logic: features/admin/ and features/journal/service.ts
- features/admin/ (data.ts, schema.ts, service.ts, types.ts): No UI consumers; /api/admin/route.ts exists but uses direct Supabase client rather than the service layer.
- features/journal/service.ts: Exports createJournalEntry, fetchJournalEntries, and deleteJournalEntry, but /journal page and components do not reference this service directly.
(Verify and connect to existing routes before considering removal).

### 6. Deep Relative Imports in Feature Service
- features/nova/service.ts (lines 4, 16): Uses ../../services/ai/manager and ../../services/ai/types instead of @/services/ai/* path alias.

### 7. Inconsistent Schema Naming in Consultation
- features/consultation/schemas.ts uses plural naming, whereas all other modules follow schema.ts (singular: auth, mood-engine, journal, nova, admin, dashboard).

### 8. Deprecated Next.js Convention: middleware.ts
- Next.js 16 deprecates middleware.ts in favor of proxy.ts. Migration is deferred to avoid touching request routing.

### 9. Unused ESLint Directive Warning
- components/ui/scroll-expansion-hero.tsx (line 148): Unused eslint-disable directive for react-hooks/exhaustive-deps.
