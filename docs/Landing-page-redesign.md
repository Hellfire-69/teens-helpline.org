Never stop after implementing the plan. After all changes are complete, perform three additional refinement passes: (1) UX audit, (2) Visual design audit, and (3) Code quality audit. In each pass, identify weaknesses, fix them automatically, then re-review. Stop only when no significant improvements remain.

Landing Page Polish Plan — feature/landing-page-redesign

Scope

Senior-level UX/UI refinement of the existing landing page. Transform it from generic to premium while preserving architecture, routing, and functionality. Not a rebuild — improve what exists.

Phase 1: Foundation Fixes (touch config + utils only, zero visual risk)

1A — Fix tailwind.config.ts

Add missing keyframes + animation block:

pulse-slow — 3s ease-in-out (used in Hero Nova orb, currently no-op)

pulse-subtle — 4s ease-in-out (used in QuickExit button, currently no-op)

shimmer — 2s linear translate-x (used in MeetNova, currently no-op)

Register tw-animate-css in plugins: \[require("tw-animate-css")\] (declared as dep, not wired)

Add @keyframes for drift (aurora mesh, fallback if JS fails)

Files: tailwind.config.ts

1B — Fix styles/globals.css

Add @layer utilities block with .glass-subtle, .glass-standard, .glass-prominent classes (currently referenced as bare strings on

and mobile nav → no styling)

Add gradient-text utility .text-gradient-aurora (reused in 6+ sections)

Add noise-texture utility .bg-noise (inline data-URI duplicated in Hero + FeaturesGrid)

Files: styles/globals.css

1C — Fix components/landing/utils.tsx

Add useReducedMotion check to AuroraMesh (currently missing — accessibility gap vs the shared version)

Extract SectionWrapper variant "mesh" — section with aurora blobs behind it (no content overlay per Design.md §8: mesh never behind >1 paragraph of body copy)

Add NoiseOverlay component (reusable noise texture, replaces duplicated inline SVGs)

Files: components/landing/utils.tsx

Phase 2: Navbar Redesign

2A — Rewrite Navigation.tsx

Target structure (user-confirmed):

ItemLinkNotes

Logo/Heart icon + "TeensHelpline" Fraunces text

About#aboutAnchor → Trust section (page stub coming later)

Resources / Study Hub/study-hubExisting route

Parents/parentsExisting stub

Schools/schoolsExisting stub

Safety#safetyAnchor → Trust section bottom (page stub coming later)

Sign In/signinFIX — currently points to broken /auth/login

Continue AnonymouslyonGetStartedPrimary CTA pill, aurora gradient

Removed: Home (redundant with logo), Get Help (merged into CTA), Peer Support (moved to content), FAQ (exists as section with anchor), About + Safety as standalone routes (don't exist yet — anchors until stubs are built).

Visual changes:

Glass-on-scroll effect (use glass-standard utility — now defined in Phase 1B)

Logo text uses font-fraunces (keep)

Desktop nav: minimal horizontal links, no icons in nav items (cleaner), 1px separator before CTAs

Mobile: full-width glass sheet, same structure, X close button

CTAs: "Sign In" as ghost button, "Continue Anonymously" as primary pill with ArrowRight

Remove the duplicate QuickExitButton from this file (it belongs in components/shared/quick-exit.tsx only — it's duplicated here)

Remove the inline custom Info SVG icon (unused after removing dead links, or replace with Phosphor Info)

Add id="about" attribute to Trust section, id="safety" to FAQ section for anchor targets

Files: components/landing/sections/Navigation.tsx

2B — Remove dead references from landing-page-client.tsx

Stop importing both Trust AND TrustSection (Phase 3 merges them)

Wire up new merged component name

Files: components/landing/landing-page-client.tsx

Phase 3: Section-by-Section Polish

3A — Hero (major redesign)

Current: Two-column with basic Nova orb + CTAs. Works but not premium.

Changes:

Increase min-h to full viewport (min-h-screen), more vertical breathing room

Make it center-aligned (not two-col) on mobile, two-col on desktop

Upgrade Nova orb: adopt the multi-layer approach from features/nova/components/nova-avatar.tsx (4 stacked layers: outer aura, shimmer drifter, glass core, inner pinpoint). Replace the current basic implementation. Use useReducedMotion.

Add subtle floating orbit particles (2-3 small circles, motion infinite, very subtle — Headspace-like, not Dribbble)

CTA row: "Continue Anonymously" as primary (larger, radius-md, aurora gradient, ArrowRight icon, whileHover scale 1.02, whileTap scale 0.97). Google + Email as smaller ghost/secondary buttons below or beside

Trust microcopy row stays but gets more spacing

Noise overlay: use new NoiseOverlay component

Aurora mesh: stays mood="neutral", use fixed variant from components/shared/aurora-mesh.tsx (reduced-motion-aware) instead of landing-local version

Scroll cue: keep, but make more subtle (opacity 0.3→0.5)

All motion respects useReducedMotion

Files: components/landing/sections/Hero.tsx

3B — Trust (merge Trust + TrustSection into one)

Current: Two redundant sections. Trust.tsx (4-up grid, concise) + TrustSection.tsx (4-up grid with expandable details, longer).

Merge strategy:

Keep TrustSection.tsx's richer content (4 pillars with detail lists + highlight badges)

Upgrade visual: SectionWrapper variant="mesh" (aurora behind it since section is visual, not text-heavy)

Cards: use Glass tier="subtle" over mesh, colored left-border accent per pillar (sea, dusk, dawn, crisis-tinted)

Replace the broken [CTA at bottom with an anchor link to #safety (or remove — the FAQ section below covers safety Q&A)](/safety)

[Add id="about" to this section for the navbar "About" anchor](/safety)

[Delete: components/landing/sections/Trust.tsx](/safety)

[Modify: components/landing/sections/TrustSection.tsx (rename to Trust.tsx or keep name)](/safety)

[Files: components/landing/sections/Trust.tsx (delete), TrustSection.tsx (modify)](/safety)

[3C — HowItWorks (visual upgrade, keep structure)](/safety)

[Improve the timeline connector: replace gradient line with a subtle animated dashed path](/safety)

[Step orbs: use Glass tier="subtle" with persona-colored borders](/safety)

[Better vertical rhythm on mobile (stacked, no zig-zag on <768)](/safety)

[Fix CTA link (currently /onboarding which is a stub — keep it, it's the entry flow)](/safety)

[Files: components/landing/sections/HowItWorks.tsx](/safety)

[3D — MeetNova (visual upgrade)](/safety)

[Extract Nova orb into shared component with Hero (both currently reimplement it independently — duplication)](/safety)

[Deduplicate: create components/landing/shared/nova-orb.tsx with the upgraded multi-layer orb](/safety)

[Expandable demo chat: keep the feature, tighten the chat bubble styling](/safety)

[Files: components/landing/sections/MeetNova.tsx, components/landing/shared/nova-orb.tsx (new)](/safety)

[3E — FeaturesGrid (fix links + visual rhythm)](/safety)

[Fix broken links: All 10 feature cards link to /features/{id} which doesn't exist. Remove href from cards — make them informational only, not clickable. Or point the top 3 to existing routes (/chat, /mood, /study-hub)](/safety)

[Fix "Hindi Support (Coming Soon)" card — already has the label, keep it](/safety)

[Visual: reduce bento layout density. Add more gap between cards. Use alternating card sizes more intentionally](/safety)

[Replace inline noise texture with NoiseOverlay](/safety)

[Files: components/landing/sections/FeaturesGrid.tsx](/safety)

[3F — PeerSupport (fix link + polish)](/safety)

["Try Peer Support" CTA points to /peer-support which works but swaps to sidebar chrome. Add a note or make it an onboarding entry instead. Or keep it — it works.](/safety)

[Visual: improve the "What supporters don't do" block — it's a dense gradient wall. Break it into individual badges/pills](/safety)

[Files: components/landing/sections/PeerSupport.tsx](/safety)

[3G — CommonConcerns (keep structure)](/safety)

[Currently works well — links to /study-hub/{slug} which exists](/safety)

[Polish: improve card hover states (elevation+1, translateY -2px per Design.md §24)](/safety)

[Reduce border visual weight](/safety)

[Files: components/landing/sections/CommonConcerns.tsx](/safety)

[3H — Testimonials (fix broken link + polish)](/safety)

[Remove "Share your experience" CTA → /contact (route doesn't exist). Replace with a gentle inline "Coming Soon" or remove the CTA entirely](/safety)

[Carousel: add swipe support for mobile (touch drag)](/safety)

[Improve carousel dot indicators (currently missing or basic)](/safety)

[Visual: testimonial cards could use Glass tier="subtle" for premium feel](/safety)

[Files: components/landing/sections/Testimonials.tsx](/safety)

[3I — FAQ (add anchor + polish)](/safety)

[Add id="safety" to section top for navbar "Safety" anchor](/safety)

[Fix "Contact Us" links → remove or replace with /onboarding (no /contact route)](/safety)

[Fix "Safety & Privacy" link → #about anchor (Trust section) since /safety doesn't exist](/safety)

[Visual: accordion styling upgrade — use design tokens more intentionally](/safety)

[Files: components/landing/sections/FAQ.tsx](/safety)

[3J — Parents + Schools (keep, polish)](/safety)

[Both point to existing stub routes — keep](/safety)

[Improve card layouts — less stacked-cards feel, more visual breathing](/safety)

[Parents: the "Confidentiality Made Clear" block is strong — keep, enhance with glass treatment](/safety)

[Schools: "Teacher Dashboard (Coming Soon)" badge — already labeled correctly, keep](/safety)

[Files: components/landing/sections/Parents.tsx, Schools.tsx](/safety)

[Phase 4: Visual Rhythm & Background](/safety)

[4A — Alternating section backgrounds](/safety)

[Current sections alternate default/alt but all feel flat. Improve:](/safety)

[Hero: full aurora mesh + noise (already done)](/safety)

[Trust: SectionWrapper variant="mesh" (aurora visible behind glass cards)](/safety)

[HowItWorks: variant="default" (clean)](/safety)

[MeetNova: variant="dark" (dark bg for Nova showcase)](/safety)

[Features: variant="mesh" (aurora behind bento cards)](/safety)

[PeerSupport: variant="default"](/safety)

[CommonConcerns: variant="alt"](/safety)

[Testimonials: variant="mesh"](/safety)

[FAQ: variant="default"](/safety)

[Parents: variant="dark"](/safety)

[Schools: variant="default"](/safety)

[This creates a rhythm: mesh → clean → dark → mesh → clean → alt → mesh → clean → dark → clean](/safety)

[4B — Section transitions](/safety)

[Between sections, add subtle gradient fade dividers (30px tall, from section A color to section B color) — prevents hard color cuts](/safety)

[Extract as SectionDivider component in utils](/safety)

[Files: components/landing/utils.tsx, update all sections](/safety)

[Phase 5: Typography & Button Polish](/safety)

[5A — Typography audit](/safety)

[All section headings: type-title-xl font-fraunces (already mostly correct)](/safety)

[Fraunces usage check: only Hero headline, Nova name, section headings — well under 10% ✓](/safety)

[Body text: type-body-lg for primary, type-body-md for secondary ✓](/safety)

[Line length: ensure max-w-3xl on paragraph containers (some sections may overflow)](/safety)

[Eyebrow badges: type-label with uppercase tracking-wide ✓](/safety)

[5B — Button micro-interactions](/safety)

[Primary CTAs: whileHover { scale: 1.02, y: -1 }, whileTap { scale: 0.97 }, spring stiffness: 420, damping: 32 per Design.md §24](/safety)

[Secondary: whileHover { scale: 1.01 }, whileTap { scale: 0.98 }](/safety)

[Focus: 3px aurora-sea ring, offset 2px — never suppressed](/safety)

[All already partially implemented — verify consistency across sections](/safety)

[Files: Hero.tsx, various section files](/safety)

[Phase 6: Accessibility & Responsiveness](/safety)

[6A — Accessibility](/safety)

[prefers-reduced-motion: add useReducedMotion hook usage to Hero, MeetNova, Nova orb, carousel, all scroll-reveal sections. Currently only the shared aurora-mesh respects it — landing sections don't.](/safety)

[prefers-reduced-transparency: Glass fallback to solid paper-100/night-900 (add to Glass component in utils.tsx — currently not implemented)](/safety)

[Color contrast: verify all ink-on-paper and paper-on-dark combos meet AA (the token system guarantees this, but verify glass-surface text)](/safety)

[Keyboard: all interactive elements have visible focus states (already good)](/safety)

[ARIA: FAQ uses native](/safety)

[— verify proper aria-expanded/aria-controls; carousel needs aria-roledescription="carousel" + aria-label

Semantic HTML: all sections use

with aria-labelledby pointing to their heading ✓

6B — Responsiveness

Audit at 320/375/768/1024/1280 breakpoints

Key concerns: Hero two-col collapses cleanly; nav hamburger at <768; FeaturesGrid bento stacks to single-col on mobile; Testimonials carousel touch on mobile

Fix the SectionWrapper which has max-w-content — it should NOT have max-width on the section itself, only on Container inside. Currently both have it (double-constraining).

Phase 7: Code Quality

7A — Deduplicate

Nova orb: extract to components/landing/shared/nova-orb.tsx (used by Hero + MeetNova)

Noise texture: extract to NoiseOverlay in utils.tsx (used by Hero + FeaturesGrid)

Trust: merge two files into one

7B — Clean up

Remove app/globals.css (dead file, not imported)

Remove app/page.module.css if it exists (unused CSS module)

Remove duplicate QuickExitButton from components/landing/sections/Navigation.tsx (should only exist in components/shared/quick-exit.tsx)

Fix components/ui/textarea.tsx default shadcn token names (optional, low priority — not landing-related)

Files Changed Summary

FileAction

tailwind.config.tsAdd keyframes, register tw-animate-css plugin

styles/globals.cssAdd glass utilities, gradient-text, noise utilities

components/landing/utils.tsxAdd useReducedMotion, NoiseOverlay, SectionWrapper mesh variant, reduced-transparency Glass fallback

components/landing/landing-page-client.tsxUpdate imports (merge Trust, add new sections)

components/landing/sections/Navigation.tsxFull rewrite: minimal nav, fix Sign In link, glass-on-scroll, remove QuickExit

components/landing/sections/Hero.tsxMajor visual upgrade: premium orb, more whitespace, better CTAs

components/landing/sections/Trust.tsxDelete

components/landing/sections/TrustSection.tsxVisual upgrade, add id="about", fix broken CTA

components/landing/sections/HowItWorks.tsxVisual polish

components/landing/sections/MeetNova.tsxUse shared nova-orb, polish chat demo

components/landing/sections/FeaturesGrid.tsxFix broken links, reduce density

components/landing/sections/PeerSupport.tsxPolish "don't do" block

components/landing/sections/CommonConcerns.tsxHover states, reduce borders

components/landing/sections/Testimonials.tsxRemove broken CTA, glass cards, mobile swipe

components/landing/sections/FAQ.tsxAdd id="safety", fix broken links

components/landing/sections/Parents.tsxVisual polish

components/landing/sections/Schools.tsxVisual polish

components/landing/sections/CrisisBanner.tsxNo changes — safety-critical, leave untouched

components/landing/sections/AnnouncementBar.tsxMinor polish only

components/landing/shared/nova-orb.tsxNew — extracted shared Nova orb component

app/globals.cssDelete (dead file)

Risks

Crisis banner: NOT touched. Zero changes. Safety-critical per AGENTS.md §5.

Shared components: NOT touched. components/shared/crisis-banner.tsx, quick-exit.tsx, navigation.tsx, aurora-mesh.tsx — all left alone.

Features/: NOT touched. No nova, mood, peer-support, study-hub, dashboard code changes.

Icon migration: Scoped to landing files only per user decision. lucide-react stays installed (used by shared/ features).

RLS/auth: NOT touched.

Testing Strategy

Manual QA: Visual review at all breakpoints after each phase

TypeScript: npx tsc --noEmit to verify no type errors

Lint: next lint to verify no new violations

Build: next build to verify SSR works

Playwright: NOT required for this change (no safety-critical paths touched)

Accessibility: Manual keyboard nav + contrast spot-check

Out of Scope (explicit)

Building /about, /safety, /contact, /faq route pages (deferred to follow-up)

Creating a footer (no footer exists currently — defer to follow-up)

Icon migration outside landing files

Dark mode overhaul (token system handles it; we verify, not redesign)

Adding new product features or sections

Touching any file in features/, services/, stores/, app/(main)/, app/(auth)/

## Phase 8 — Premium Design Refinement

The implementation above is **not** the finish line. Now perform a senior product design review — do not think like a developer, think like the lead designer shipping the public homepage.

### 8A — Emotional Hierarchy Audit

Review the page from top to bottom. Within the first 5 seconds a visitor should understand:

- This is a safe place.
- I can stay anonymous.
- I can get help immediately.
- I don't need to create an account.
- This feels trustworthy.

If any section weakens this message, redesign it.

### 8B — Storytelling Flow

The homepage must feel like one continuous journey:

Hero → Trust → Problems Teens Face → Meet Nova → How It Works → Features → Parents → Schools → FAQ → Footer

Every transition should naturally introduce the next section. No abrupt visual changes.

### 8C — Remove Visual Noise

Audit every page section. Remove:

- Unnecessary borders
- Unnecessary gradients
- Duplicate glass cards
- Decorative circles without purpose
- Excessive shadows
- Empty containers
- Large empty spaces

Every visual element must have a purpose.

### 8D — Visual Rhythm

Avoid a flat repeating pattern (card, card, card, card, card). Instead create rhythm using:

- Background changes
- Layout inversion
- Illustration placement
- Negative space
- Asymmetry
- Alternating alignment

The page should breathe.

---

## Phase 9 — Design System Compliance

Audit every component against `Design.md`. Verify:

- Spacing
- Radius
- Glass opacity
- Typography
- Icon sizing
- Colors
- Animation duration
- Blur values
- Button sizing
- Focus states

Do NOT leave any hardcoded visual values if a design token already exists. Replace magic numbers with shared tokens.

### 9A — Component Consistency

- Every card should belong to the same design language.
- Every button should share interaction timing.
- Every section heading should use the same hierarchy.
- Every icon should use the same visual weight.
- Every animation should use the same motion language.

### 9B — Typography Review

Audit:

- Line length
- Paragraph spacing
- Heading spacing
- Visual hierarchy
- Readability

Do not allow paragraphs wider than optimal reading width. Increase readability instead of increasing font size.

---

## Phase 10 — Illustrations & Visuals

Do **not** introduce stock photography. Instead generate premium visuals using:

- SVG
- CSS
- Motion
- Gradients
- Glass
- Mesh
- Noise
- Glow

Generate or improve:

- Hero aurora
- Nova orb
- Section dividers
- Abstract illustrations
- Decorative SVG elements
- Ambient glow
- Floating particles
- Gradient meshes

Replace weak decorative blobs with intentional illustrations. All visuals should share one artistic style.

### 10A — Background Polish

Review every section background. Avoid repeating identical gradients. Each section should have its own subtle identity while remaining cohesive.

---

## Phase 11 — Motion Design Pass

Review every animation. Animations should feel like Apple, Linear, or Headspace — nothing more.

Check:

- Scroll reveal
- Hover
- Focus
- Page load
- Button press
- Card hover
- Floating objects
- Orb animation
- Stagger timing
- Spring consistency
- Reduced motion

Animations should be almost invisible. If users notice the animation before the content, it is too much.

---

## Phase 12 — Performance Pass

Review every component:

- Reduce unnecessary JS.
- Prefer CSS whenever possible.
- Remove duplicate animations.
- Remove unnecessary client components.
- Lazy-load decorative visuals.
- Optimize SVG size.
- Avoid layout shift.
- Avoid hydration mismatches.

---

## Phase 13 — Mobile Experience

Audit manually at breakpoints: `320 · 360 · 375 · 390 · 414 · 768 · 1024 · 1280 · 1536`

Verify:

- No overflow
- Comfortable spacing
- Touch targets
- Navigation
- Hero layout
- CTA placement
- Text wrapping
- Image scaling

Nothing should feel desktop-first.

---

## Phase 14 — Accessibility

Verify:

- Keyboard navigation
- Screen readers
- ARIA
- Focus rings
- Reduced motion
- Reduced transparency
- Color contrast
- Semantic HTML

Every interactive element must be accessible.

---

## Phase 15 — Final Design Critique

When implementation is finished, stop coding. Review the website like a Staff Product Designer. Create a list of:

- UX problems
- Visual hierarchy problems
- Typography problems
- Spacing problems
- Animation problems
- Accessibility problems
- Performance problems
- Trust problems
- Brand consistency problems

Then automatically fix every issue. Repeat this review at least **three times**, each pass progressively more critical.

---

## Final Acceptance Criteria

The redesign is complete only if:

- [ ] Zero broken links
- [ ] Navbar reflects only implemented features
- [ ] No placeholder content
- [ ] No dead code
- [ ] No duplicated components
- [ ] No inconsistent spacing
- [ ] No inconsistent animations
- [ ] No inconsistent typography
- [ ] No visual clutter
- [ ] No random decorative elements
- [ ] Lighthouse target above 90
- [ ] Mobile-first experience verified
- [ ] `Design.md` fully respected
- [ ] Looks like a professionally funded startup, not an internship project

If any criterion is not met, continue refining until it is.