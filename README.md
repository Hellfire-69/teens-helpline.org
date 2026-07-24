# TeensHelpline.org

A safety-critical support platform for teens (13–19) built as an 8-day internship prototype. Next.js 16 · TypeScript strict · Supabase · Vercel.

> **This is a prototype handling mood data, chat content, and crisis signals from minors. Move fast on UI/content; move deliberately on anything touching crisis escalation, Nova's safety layer, or RLS.**

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, RSC-by-default) |
| Language | TypeScript (`strict: true`, `noUncheckedIndexedAccess: true`) |
| Styling | Tailwind CSS v3 (design tokens from Design.md §5/10/12/13) |
| UI Components | shadcn/ui + 21st.dev blocks |
| Animation | Motion (`motion` package) |
| Illustrated Animation | Lottie (`lottie-react`) |
| State | Zustand (in-memory only — no localStorage for teen data) |
| Forms + Validation | React Hook Form + Zod |
| Database + Auth | Supabase (Postgres + Auth + Storage, RLS-first) |
| AI (Primary) | Google Gemini API (behind Provider Abstraction) |
| AI (Fallback) | GROQ API (behind Provider Abstraction) |
| Hosting | Vercel |
| Testing | Vitest (unit/integration), Playwright (E2E safety-critical) |

---

## Running Locally

```bash
# 1. Clone and install
git clone https://github.com/Hellfire-69/teens-helpline.org.git
cd teens-helpline.org
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY, GROQ_API_KEY

# 3. Run dev server
npm run dev

# 4. Open http://localhost:3000
```

### Available scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build |
| `npm run lint` | ESLint (strict) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest unit + integration |
| `npm run test:e2e` | Playwright E2E (safety-critical suite) |

---

## Folder Structure

```
/
├── app/                        # Next.js App Router — routing + composition only, stays thin
│   ├── (public)/               # Home, About, Safety, FAQ, Contact, policies
│   ├── (auth)/                 # Auth entry screens
│   ├── onboarding/             # Interactive onboarding flow
│   ├── dashboard/
│   │   ├── teen/
│   │   └── parent/
│   ├── study-hub/
│   ├── peer-support/
│   ├── parents/
│   ├── schools/
│   └── api/                    # Route Handlers (thin — delegate to services/)
│       ├── auth/
│       ├── chat/               # Nova
│       ├── mood/
│       ├── resources/
│       ├── peer-support/
│       ├── dashboard/
│       ├── admin/
│       └── analytics/
│
├── features/                   # Feature-first modules — all real logic lives here
│   ├── auth/                   # service.ts, data.ts, schema.ts, types.ts
│   ├── nova/                   # Conversation, Safety Layer, Provider Abstraction
│   ├── mood-engine/
│   ├── study-hub/
│   ├── peer-support/
│   ├── dashboard/
│   └── admin/
│
├── components/ui/              # shadcn/ui primitives — zero feature knowledge
├── hooks/                      # Shared React hooks
├── lib/                        # Cross-cutting utils (supabase client, env, logger)
├── services/                   # Cross-feature abstractions (AI provider, rate limiter)
├── stores/                     # Zustand stores (in-memory only, no browser storage)
├── types/                      # Shared TypeScript types
├── utils/                      # Pure helper functions
├── styles/                     # globals.css + Tailwind config
├── tests/
│   ├── unit/                   # Vitest
│   ├── integration/            # Vitest + Supabase test project
│   └── e2e/                    # Playwright — safety-critical flows (non-negotiable)
├── supabase/                   # Migrations + RLS (managed via Supabase MCP)
└── docs/                       # Project documentation
```

### Import direction (code-review blocker, not style note)

- `app/` may import from everything below it. **Nothing imports from `app/`.**
- `features/<A>/` never imports `features/<B>/` internals — only exported public interfaces.
- `components/ui/` never imports from `features/`.
- `stores/` never calls Supabase directly.
- `lib/` depends on nothing above it.

---

## Documentation Map

Which `.md` file governs which kind of change — per AGENTS.md §2:

| Task touches... | Read first |
|---|---|
| Architecture, folder structure, stack, pipelines | `docs/TRD.md` |
| Business logic, scope, user flows, MVP/Phase 2 | `docs/PRD.md` |
| Tables, RLS, migrations, data retention | `docs/Database-Schema.md` |
| Nova's tone, prompts, persona switching | `docs/Persona.md` |
| Visual design, layout, components, design tokens | `docs/Design.md` |
| Client-facing expectations, original brief | `docs/teenshelpline-client-requirements.md` |
| Agent conduct, workflow, tooling rules | `AGENTS.md` |

**Never implement a feature ahead of an approved requirement or approved wireframe** — per AGENTS.md §1's mandatory sequence.

---

## Branch Workflow

```
main          ← production releases only (via release branch)
  └── develop ← integration branch; all feature PRs merge here
        └── feature/<module>  ← one branch per module/task
```

### Starter feature branches

| Branch | Module | Key files |
|---|---|---|
| `feature/auth-scaffold` | Auth (anonymous + Google/Email sign-in) | (Merged) |
| `feature/nova-conversation` | Nova AI chat + Safety/Escalation Layer | (Merged) |
| `feature/mood-engine` | Mood check-in + recommendations | (Merged) |
| `feature/study-hub` | Resource content + search | (Merged) |
| `feature/peer-support` | Peer sessions + moderation | (Merged) |
| `feature/dashboard` | Teen + Parent dashboards | **Next/Final** (Blocked on UI teammate) |
| `feature/public-pages` | Landing page, About, Safety, FAQ, Contact | **Next** (Unconfirmed UI/UX start) |
| `feature/onboarding` | Onboarding flow (avatar, role, mood) | **Next** (Unconfirmed UI/UX start) |
| `feature/admin` | Admin reports/escalation views (Coming Soon) | `features/admin/`, `app/api/admin/` |

> **Start with `feature/auth-scaffold` and `feature/nova-conversation`** — auth is a prerequisite for everything, and Nova's safety layer is the highest-priority code path in the system.

---

## Safety-Critical Rules (Non-Negotiable)

1. **The Escalation Layer runs before any AI call.** A message that triggers a risk signal never reaches Gemini or GROQ.
2. **The Response Validator re-checks every Nova reply** after generation — independent of the system prompt.
3. **No localStorage/sessionStorage for teen or conversation data** — anonymous state is in-memory only (Zustand), logged-in state is Supabase RLS-protected.
4. **Every new table has RLS enabled from creation** with zero policies, then policies added deliberately.
5. **The crisis banner has no data dependency** — it must render correctly even when Supabase and all AI providers are down.

Full rules: `AGENTS.md §5`.

---

## CI

GitHub Actions runs on every PR to `main` or `develop`:

1. Install → Lint → Typecheck → Unit/Integration tests → Build check

All jobs must pass for merge. The Playwright E2E job is fully enabled and gates all PRs touching safety-critical paths (Nova, Peer Support, Mood Engine), verifying the safety suite and Crisis Banner functionality.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values. See `TRD.md §21` for the full variable reference.

| Variable | Scope |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — never in client bundle |
| `GEMINI_API_KEY` | **Server only** |
| `GROQ_API_KEY` | **Server only** |
| `NODE_ENV` | Both |
