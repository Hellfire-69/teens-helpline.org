# Antigravity Prompt — TeensHelpline.org Landing Page Redesign

## Context (paste this whole file as one prompt to Antigravity)

You are working in the TeensHelpline.org Next.js 16 (App Router) + TypeScript + Tailwind + Supabase codebase. Before writing any code, read `Design.md`, `PRD.md`, and `AGENTS.md` in the project root — this task is UI-only (no Nova, no escalation logic, no RLS), so it does not require staged sign-off per AGENTS.md, but it must still follow AGENTS.md's dependency rules (§7) and coding conventions (§8).

## Task

Rebuild the marketing landing page (`app/(public)/page.tsx` and its section components) from scratch. The previous version has a broken, cluttered hero section (competing CTAs, a floating "Enter Your Way" box overlapping content, an alert-style badge stealing visual priority) and does not follow the design system at all. Replace it entirely — do not patch it.

**Non-negotiable constraints:**
- Every visual token (color, spacing, radius, shadow, duration, easing) must come from Tailwind config extensions matching `Design.md` exactly — no hardcoded hex/px/ms values in component code.
- No placeholder links. Every nav item and CTA routes to a real page under `app/(public)/`, `app/(auth)/`, `app/onboarding/`, `app/study-hub/`, `app/peer-support/`, `app/parents/`, `app/schools/`, per the sitemap in the client requirements doc. If a target page doesn't exist yet, create a minimal real route for it (even a simple content stub) rather than a dead `href="#"` or `href="/coming-soon"` link — the only acceptable "Coming Soon" state is the one PRD explicitly defines for Counsellor/Teacher-Educator/Admin roles, and that must be an honest labeled state, not a broken link.
- No lorem ipsum, no "Lorem" copy, no generic stock phrasing — write real, on-brand copy consistent with `Design.md` §2 voice pillars (short sentences, contractions, second person, no jargon, no forced positivity).
- Crisis banner and quick-exit must be present per PRD/TRD — do not rebuild these two components; import the existing ones and place them per Design.md §26 (banner: fixed top-of-viewport mobile / sidebar header desktop; quick-exit: always in the same reach zone).

## 1. Navbar

- Floating glass tab bar (mobile) / floating glass sidebar or top bar (desktop), `glass.standard` tier, always visible, never auto-hides on scroll (Design.md §26).
- Left: wordmark/logo (text-based is fine, no fake logo asset).
- Center/right: real links — Get Help, Study Hub, Peer Support, For Parents, For Schools, About.
- Right-most, visually distinct: the crisis "I need help now" entry point, styled with `signal.crisis` per §5.1, always in the same position across breakpoints.
- Primary CTA button in nav: "Continue Anonymously" → routes to `app/onboarding/` (skip role pre-selection, or land on Role Selection step per PRD).
- Mobile: collapses to a glass tab bar with the crisis entry point and quick-exit always visible even when the rest of the nav is collapsed into a menu.

## 2. Hero Section (full rebuild)

Follow Design.md §27 exactly:
- Aurora mesh gradient backdrop (§8): 3–4 soft radial blobs in `aurora.dusk`, `aurora.sea`, `aurora.dawn` at 8–14% opacity, slow 90–180s drift loop, `prefers-reduced-motion` freezes to static frame.
- Headline in `type.display` (Fraunces, 600 weight, clamp 32px→48px): one clear value statement. Example direction (rewrite in your own voice, don't ship this verbatim): "A quiet place for your thoughts, your feelings, your pace." — keep it this short, no sub-clauses stacked on top of it.
- One-line supporting copy in `type.body.lg`, `ink.600`.
- **One visually primary CTA only**: "Continue Anonymously" (per PRD's anonymous-first philosophy — this must be the visually loudest element on the screen). Google/Email sign-in appears as a secondary `ghost`/`secondary` button below or beside it, never competing in visual weight.
- No competing floating cards, no secondary explainer box overlapping the hero text. If you want a supporting visual, use Nova's glow-form (§20: soft pulsing radial gradient blob in `aurora.sea`/`aurora.dusk`, resting-state animation, no face, no mascot) positioned to one side on desktop, beneath the CTA on mobile — nothing else.
- No auto-playing video, no scroll-jacking (§27).
- Remove any alert/banner-styled element above the headline — the crisis banner already lives in its own persistent slot (§26); don't duplicate it as hero decoration.

## 3. "Built on Trust" Section

Two-column (desktop) / stacked (mobile) card pair: "Privacy First" and "Moderated Community" — `elevation.1`, `radius.md`, `glass.subtle`. Real bullet copy pulled from PRD's privacy/moderation commitments (anonymous = no data stored, moderated peer support, etc.), not placeholder bullets.

## 4. "From 'I feel bad' to 'a next step'" Flow Section

Rebuild as a clean vertical/horizontal step sequence (not overlapping floating boxes): Enter Your Way → Quick Mood Check → Get Personalized Help → Crisis Help Always Visible. Each step: icon (Phosphor, duotone), short headline (`type.title.md`), one line of body copy. Steps connected by a simple line/connector, `easing.standard` fade-in on scroll, staggered ~60ms per Design.md §25 page-transition rhythm — not a bouncy entrance.

## 5. Nova Companion Callout (dark section)

Dark `night.950` background section introducing Nova. Nova rendered as glow-form (§20), never a mascot/face. Headline in Fraunces. Two CTAs: "Meet Nova" (primary, → `/onboarding` or a Nova preview route) and a secondary link (→ `/about` or `/safety` explaining how Nova works). No placeholder buttons — both must route somewhere real.

## 6. Features Grid ("Everything you need, nothing you don't")

Card grid: Chat with Nova, Mood Check-Ins, Study Hub, Peer Support, Breathing Exercises, Private Journal, Sleep Support, Crisis Help Always Visible, Quick Exit Button, Hindi Support (Coming Soon — label honestly per AGENTS.md §5, don't present as functional). Each card: icon, title, one-line description, and — where the feature has a real page — a working "Learn more" link (e.g., Study Hub card → `/study-hub`, Peer Support card → `/peer-support`). Cards with no dedicated page just don't get a link, they don't get a fake one.

## 7. Peer Support Section

"Talk to someone who gets it" — two-column: "Why peer support works" (bullet list) and "How it works" (numbered steps: Enter Your Way, Get Matched, Moderated for Safety, Stay in Sync). Include the "What peer supporters don't do" callout card, styled with `signal.caution` accent (not `signal.crisis` — reserve that hue exclusively for the actual crisis banner per §39). CTA → `/peer-support`.

## 8. "Common things teens talk to us about" Grid

6 category cards (Academic Stress, Bullying, Family Concerns, Friendships & Relationships, Identity & Confidence, Anxiety & Overwhelm, Study & Focus, Behavioural Concerns — trim to fit an even grid) each linking to a real Study Hub category route (`/study-hub/[category]`) — build these as real filtered/static routes, not dead links.

## 9. Testimonials

Composite/fictional quotes only, clearly presented as illustrative (per CRD §14 — no real teen stories published). Simple card carousel or static 3-up grid, `glass.subtle`, no stock headshot photos — use avatar-style illustrated icons instead (per §17/§18, never a stock "diverse teens" photo).

## 10. FAQ

Real accordion component (shadcn `Accordion`), grouped by the categories shown in the current design (Getting Started, Privacy & Safety, About Nova & Features, Peer Support, Technical), each with real answers pulled from PRD/CRD content — no "Question 1 / Answer goes here" placeholders.

## 11. For Parents / For Schools Sections

Keep these largely as scoped in the current build but restyle to Design.md tokens: calmer, more neutral palette weighting (less `aurora.dawn`, more `aurora.dusk`/paper neutrals) per §28. All CTAs route to `/parents` and `/schools` respectively — real pages, not anchors.

## 12. Footer

Full policy link set, all real routes: Privacy Policy, Consent Policy, Safeguarding Policy, Community Guidelines, Complaints/Grievance Policy, Terms of Use, Service Disclaimer, Crisis Support Information, Contact. If any policy page doesn't exist yet, create a minimal real MDX/static page for it — do not link to `#`.

## Animation Requirements (Motion package, per TRD/Design.md)

- All motion uses spring physics (`easing.standard`/`easing.gentle`/`easing.snappy` tokens from Design.md §22) — never linear/CSS `ease` easing.
- Scroll-triggered section entrances: fade + translateY(8px), staggered ~60ms, `duration.base` (280ms) — Design.md §25.
- Card hover (desktop only): elevation +1, translateY(-2px), `duration.fast`.
- Button press: scale 0.97, `duration.instant`, `easing.snappy`.
- Aurora mesh drift: 90–180s loop, `ease-in-out`, frozen to static frame under `prefers-reduced-motion` and on low-power/low-FPS devices (§8.3/§43 performance guardrail — implement the lightweight FPS probe fallback).
- Nova's glow-form: resting-state 4s breathing pulse only on the landing page (no listening/responding states needed here, those are chat-only).
- The crisis banner and quick-exit button are exempt from all page-transition choreography — they render instantly, no stagger, no delay (§25, §49).

## Deliverables

- All section components under `features/marketing/components/` (not `components/ui/` — these carry page-specific composition, not primitives, per TRD's Component & Design System Architecture).
- `app/(public)/page.tsx` stays thin, composes the section components only.
- Any new static routes created for previously-missing nav targets (policy pages, study-hub category pages) with real, non-placeholder content.
- Confirm Lighthouse accessibility/performance are not regressed by new animation work (code-split Motion/Lottie usage to routes that need it, per TRD §19 — the landing page already needs it, but keep bundle lean).
- Self-review against `AGENTS.md` §17 checklist before reporting back, including: no stray TODO/placeholder/mock left in code, WCAG AA spot-checked, responsive across breakpoints, no hardcoded design values outside tokens.

## Report back with

1. List of files created/changed.
2. List of every nav/CTA link and its destination route (to verify none are placeholders).
3. Any policy/category page you had to stub out with real minimal content, and what's still a known content gap.
4. Confirmation Lighthouse was spot-checked (or state clearly if not, and why).
