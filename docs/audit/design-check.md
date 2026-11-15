# Design System Check: Baseline Audit (Step 2)

**Date:** 2026-11-14  
**Project:** Teens Helpline (`teenshelpline-org`)  
**Target File:** `docs/audit/design-check.md`  
**Auditor:** Antigravity Engineering Agent  
**Branch:** `redesign-cleanup`  

---

## 1. Real Design Language of the Home Page

Inspection of `app/(public)/page.tsx` and its constituent components (`Hero.tsx`, `Trust.tsx`, `Flow.tsx`, `NovaCallout.tsx`, `FeaturesGrid.tsx`, `ConcernsGrid.tsx`, `Testimonials.tsx`, plus layout components `Navbar.tsx`, `Footer.tsx`, `aurora-mesh.tsx`):

### 1.1 Colors & Tokens
- **Palette in Practice:** The home page primarily utilizes custom Tailwind tokens: `aurora-sea` (`#5B9AA0`), `aurora-dusk` (`#6B5B95`), `aurora-dawn` (`#F2A65A`), `aurora-blush` (`#E8A0A0`), `ink-900` (`#1C1B29`), `ink-600` (`#4A4863`), `ink-400`/`ink-300`, `night-950` (`#0F0E17`), and `night-900` (`#17161F`).
- **Deviations & Raw Values:**
  - `Flow.tsx`: SVG connecting wave gradient hardcodes raw Tailwind hex stops (`#8b5cf6`, `#f97316`, `#0ea5e9`, `#ef4444`) rather than Aurora tokens.
  - Raw color `#ef4444` (pure alert red) is rendered on the public flow path.
  - `Testimonials.tsx`: Avatar for user "Rohan" uses `bg-signal-crisis/10 text-signal-crisis`.
  - `NovaCallout.tsx`: Uses raw teal shadow `drop-shadow-[0_0_60px_rgba(45,212,191,0.5)]` and `bg-aurora-sea/20`.
  - `Hero.tsx` / `scroll-expansion-hero.tsx`: Uses raw Tailwind classes `text-blue-200`, `bg-black/20`, and `bg-white/10`.

### 1.2 Fonts & Typography
- **Font Families:** Dual font system of `Inter` (sans) and `Fraunces` (serif).
- **Usage Frequency:** `Fraunces` is heavily used across almost every major section heading (`Trust.tsx` card titles, `Flow.tsx` section title, `FeaturesGrid.tsx` H2, `ConcernsGrid.tsx` title).
- **Scale:** Ranges from standard body copy up to `text-6xl md:text-8xl` (e.g. in hero and about headings), significantly larger than fluid `type.display` tokens (max 48px).

### 1.3 Spacing & Layout
- **Containers:** Max widths range between `max-w-content` (`1120px`), `max-w-5xl`, `max-w-6xl`, and `max-w-7xl`.
- **Rhythm:** Generous section padding (`py-24 md:py-32`, `py-16 md:py-24`).
- **Radius:** Heavy use of high border radii (`rounded-[2rem]`, `rounded-[2.5rem]`, `rounded-[3rem]`, `rounded-full`).

### 1.4 Section Patterns & Motion
- **Hero:** Employs an interactive scroll-expansion wrapper (`ScrollExpandMedia` from `framer-motion`) that captures mouse wheel / touch events to scale a centered media frame from small to full-viewport before revealing hero text and CTAs.
- **Trust:** Floating pill card with dual backdrop blur, duotone Phosphor icons, and subtle spring entry.
- **Flow:** Scroll-linked vertical DNA wave drawing an animated path through 4 steps using `useScroll` and `useSpring`.
- **Nova Callout:** Two-column split featuring floating parallax chat bubbles and an animated breathing avatar.
- **Features Grid:** Sticky card stack (`top: calc(12vh + idx*24px)`) where 6 full-size cards stack on scroll, each featuring pseudo-3D glass spheres with specular highlights and rotating orbital gem animations (`rotate: 360deg` over 30s).
- **Concerns Grid:** Scroll-pinned container (`h-[210vh]`) featuring a 6-card fan-out with rotation angles from -28° to +28°.
- **Testimonials:** Dual-row auto-scrolling marquee with teen slang chat bubbles.

### 1.5 Nova & The Orb Usage
- **Nova Representation:** In `NovaCallout.tsx`, Nova is depicted using a static raster image asset (`/images/Nova.png`) wrapped in breathing CSS scale animations and radial glow blurs (`bg-aurora-sea/30 blur-3xl`).
- **The "Orb" Representation:** In `FeaturesGrid.tsx`, pseudo-3D glowing orbs are used as decorative visual containers for category Phosphor icons (surrounded by glass rings, specular highlights, and orbiting sparkle gems), rather than representing Nova herself.

---

## 2. Comparison with docs/Design.md: Conflicts & Outdated Specs

Below is the exhaustive list of discrepancies where `docs/Design.md` conflicts with or is outdated relative to the home page implementation. (Conflicts are recorded as requested, without resolving them):

1. **Hero Scroll-Jacking vs. Anti-Friction Guarantee:**
   - *Design.md §27:* Explicitly mandates: *"No auto-playing video, no animated hero illustration competing with the CTA, no scroll-jacking"* and *"immediate visibility of 'Continue Anonymously' as the visually primary CTA."*
   - *Home Page (`Hero.tsx` & `scroll-expansion-hero.tsx`):* Intercepts native scroll with `e.preventDefault()`, forcing the user to scroll through an expansion animation before the headline and CTAs become visible.

2. **Nova Visual Form (Raster Image vs. Abstract Glow Blob):**
   - *Design.md §20:* Mandates that Nova is *"not a humanoid character... represented as a soft glowing form — an abstracted, animated aurora-light shape (a gently pulsing radial gradient blob... wrapped in aurora.sea and aurora.dusk) rather than a face, mascot, or avatar. No mouth, no eyes, no literal face."*
   - *Home Page (`NovaCallout.tsx`):* Loads a literal pre-rendered raster image `<Image src="/images/Nova.png" alt="Nova AI Avatar" ... />`.

3. **Restraint on 3D Motion and Rotation Limits:**
   - *Design.md §9:* Specifies: *"max rotation 6deg on any axis — anything more reads as gimmicky, not premium."*
   - *Home Page (`ConcernsGrid.tsx`):* Card fan-out applies rotations of `[-28, -16, -4, 4, 16, 28]` degrees, exceeding the spec by over 4.5×.

4. **Crisis Color Isolation (`signal.crisis`):**
   - *Design.md §5.1, §50:* Mandates: *"Don't let the crisis banner's red ever appear anywhere else in the product — that hue's meaning must stay singular and trustworthy."*
   - *Home Page:*
     - `Flow.tsx` line 76: SVG linear gradient terminates in `#ef4444` (raw alert red).
     - `Testimonials.tsx` line 55: Avatar color token for "Rohan" uses `bg-signal-crisis/10 text-signal-crisis`.

5. **Token Compliance vs. Hardcoded Hex & Palette Inconsistencies:**
   - *Design.md §49:* Mandates all colors, spacing, and easing must be consumed as design tokens with zero hardcoded hex/px/ms values.
   - *Home Page:* `Flow.tsx` hardcodes raw standard Tailwind colors (`#8b5cf6`, `#f97316`, `#0ea5e9`, `#ef4444`). `scroll-expansion-hero.tsx` uses hardcoded classes like `text-blue-200`.

6. **Fraunces Typography Frequency & Scale:**
   - *Design.md §10:* States Fraunces is reserved for a small set of emotionally-weighted moments: *"if more than roughly 10% of a screen's text is Fraunces, it's being overused"* and caps `type.display` at 48px.
   - *Home Page:* Fraunces is used for headings across nearly every section (`Trust.tsx`, `Flow.tsx`, `FeaturesGrid.tsx`, `ConcernsGrid.tsx`), with font sizes scaling to `text-6xl` (60px) and higher.

7. **Copy Tone & Product Positioning:**
   - *Design.md §1, §2:* Defines the platform as "The Quiet Room" with the voice of an emotionally steady older sibling, devoid of jargon or corporate SaaS posturing.
   - *Home Page (`FeaturesGrid.tsx`):* Headline reads `"Plug-and-play agents ready to deploy."` and subhead states `"No cluttered stubs. We build what is genuinely helpful to get you to your next right step. Every feature is tested, secure, and ready."` — which reflects AI engineering / developer jargon rather than teen-directed mental wellness support.

8. **Animation Library Dependency (`framer-motion` vs `motion`):**
   - *Design.md §47:* Approves `motion` (`motion` package) as the official animation library.
   - *Home Page:* `scroll-expansion-hero.tsx` imports from `framer-motion` directly, causing library duplication with `motion/react` used elsewhere.

---

## 3. Root Lighthouse Report (`lighthouse-report.html`) Inspection

Direct inspection of `window.__LIGHTHOUSE_JSON__` embedded in `lighthouse-report.html` at the repository root reveals:

- **Audit Timestamp (`fetchTime`):** `2026-07-22T09:11:57.401Z` (July 22, 2026)
- **Audited URL (`requestedUrl`):** `http://localhost:3000/onboarding`
- **Lighthouse Version:** 13.4.1
- **Emulated Device:** Mobile (`Android 11; moto g power (2022)`)
- **Category Scores:**
  - **Performance:** **43** / 100
  - **Accessibility:** **100** / 100
  - **Best Practices:** **100** / 100
  - **SEO:** **60** / 100
- **Notable Core Web Vitals Recorded in Audit:**
  - First Contentful Paint (FCP): 0.9 s
  - Largest Contentful Paint (LCP): **11.9 s** (Score: 0)
  - Speed Index: 4.5 s

---

## 4. Analysis of Public Pages (About, Help, For Parents, For Schools)

### 4.1 About (`app/(public)/about/page.tsx`)
- **Differences from Home:** Permanently forces dark theme (`bg-night-950 text-white`) across the entire page, completely ignoring light-mode preferences; introduces duplicate animated background blur spheres (`animate-pulse duration-[10000ms]`) on top of the root `AuroraMesh`; inflates Fraunces headings up to `text-8xl`.
- **Generic / Off-Tone Elements:** Follows an investor-facing B2B pitch deck structure ("Our Mission", Bento 3-pillar features with "Safety Net", FAQ accordions). Pillar 3 applies `signal-crisis` styling to a standard informational card. Lacks the intimate, grounding warmth of a teen sanctuary.

### 4.2 Help / Get Help (`app/(public)/get-help/page.tsx`)
- **Differences from Home:** Strips all animated motion, scroll interactions, and 3D visual treatments in favor of a static server-rendered vertical card list using design tokens (`py-space-16`, `text-type-display`, `rounded-radius-md`).
- **Generic / Off-Tone Elements:** Employs stark alarm-panel styling with repeated red `Button variant="destructive"` ("Call 1098", "Call 14416", etc.), warning icons, and `border-signal-crisis/20` borders, directly violating the guideline that crisis support should feel held rather than sirened at. Contains a broken link with leaked CSS class names (`href="/study-hub text-ink-900 dark:text-white"`). Reads like an emergency directory rather than an integrated support ecosystem.

### 4.3 For Parents (`app/(public)/parents/page.tsx`)
- **Differences from Home:** Replaces centered single-column storytelling with an asymmetric 50/50 split-screen layout featuring a sticky left pane with an external stock photo (`Unsplash photo-1573164713988-8665fc963095`), then appends a duplicate standalone marketing section (`<ParentsComponent />`) at the bottom.
- **Generic / Off-Tone Elements:** Leans into stock photography of a parent and teenager looking solemn and clinical. The copy is legalistic and defensive ("anonymity is instantly suspended", "we will breach confidentiality to notify emergency contacts if necessary", "synchronous escalation layer"), sounding like institutional risk management rather than empathetic family guidance.

### 4.4 For Schools (`app/(public)/schools/page.tsx`)
- **Differences from Home:** Adopts an asymmetric SaaS enterprise bento grid (`grid-cols-1 md:grid-cols-3 auto-rows-[300px]`) with mixed card backgrounds (`bg-white dark:bg-night-900` cards juxtaposed against a hardcoded `bg-night-950` bottom card), appending an extra marketing component (`<SchoolsComponent />`) below.
- **Generic / Off-Tone Elements:** Focuses heavily on institutional surveillance and administration ("Aggregate Analytics", "anonymized statistics across the district", "Classroom Strategies"), treating students as data telemetry for school boards. Misuses `signal-crisis` color tokens on routine administrative cards ("Safeguarding").
