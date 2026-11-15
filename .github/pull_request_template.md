## Module
<!-- e.g. features/nova, features/mood-engine, features/auth, shared -->

## What and Why
<!-- 1-2 sentences summarizing the change and context -->

## Safety Checklist (Non-Negotiable)
- [ ] RLS reviewed (deny-by-default; no policies removed or loosened without approval)
- [ ] No PII or raw chat content written to logs, analytics, or `escalation_events`
- [ ] Escalation Layer untouched or verified against safety-critical test suite
- [ ] Anonymous users have no browser persistence (`localStorage`/`sessionStorage` disabled)
- [ ] Provider Abstraction preserved (no direct third-party AI SDK imports)

## How I Verified
- [ ] Lint & Typecheck (`npm run lint && npm run typecheck`)
- [ ] Tests (`npm run test` / `npm run test:e2e` if touching safety surfaces)
<!-- Note manual QA steps or test coverage details -->

## Screenshots / Recordings
<!-- If UI change, attach desktop & mobile screenshots/recordings; otherwise N/A -->
