# Design.md — The TeensHelpline Design System

**Version:** 1.0
**Status:** Approved — single source of truth for design & engineering
**Owner:** Design Systems / Product Design
**Relationship to other docs:** This document defines the complete visual, motion, interaction, and component system. It does not restate business goals (`PRD.md`), technical architecture (`TRD.md`), Nova's conversational behavior (`Persona.md`), the client brief (`teenshelpline-client-requirements.md`), or the data model (`Database-Schema.md`) — those are referenced by name where a design decision depends on them, never duplicated. Per `AGENTS.md` §2's decision tree, any task touching visual design, layout, components, or tokens reads this file first.

> **A note on lineage.** This system studies the *reasoning* behind Apple's Human Interface Guidelines — restraint, clarity, deference, material honesty — the same way it studies Linear's speed, Arc's playfulness, Discord's belonging, Spotify's mood-shifting color, Nothing's honesty-through-transparency, Airbnb's warmth, and Notion's quiet confidence. None of those products are for a 15-year-old having the worst night of her month. This system exists because that gap needed its own answer, not a borrowed one. Nothing here is a reskin of any reference. Where a reference would suggest an approach that conflicts with teen emotional safety, the reference loses.

---

## 0. How to Use This Document

This is not a moodboard. Every token, timing curve, and interaction rule here is a decision that has already been made so nobody has to re-litigate it mid-sprint. If you are a designer, this is your constraint system. If you are an engineer, this is your spec. If something you want to build isn't here, that's a signal to open a design review, not to freelance a one-off.

---

## 1. Design Philosophy

**Core Idea: "The Quiet Room."**

Imagine a physically real room designed for someone to walk into on their worst day and feel, before anyone even speaks to them, that they are safe. Not loud. Not clinical. Not trying to entertain them. Just quiet, well-lit, comfortable, and clearly built by people who understood they'd be arriving in distress.

Every screen in this product is a version of that room. That reframes the usual product-design question ("how do we drive engagement?") into a different one: **"does this screen make someone feel more regulated, or less?"** If a pattern increases dwell time but increases anxiety, it is wrong for this product, full stop — no growth metric overrides it.

Four philosophical commitments, adapted from — not copied from — Apple's deference/clarity/depth triad:

1. **Deference over Decoration.** The interface steps back so the teen's own thoughts and choices stay the loudest thing on screen. Chrome, ornament, and branding recede; the next right action is always the most visually confident element.
2. **Clarity over Cleverness.** A confused teen at 1am should never have to decode an icon, a metaphor, or a novel interaction pattern. If a first-time user needs an onboarding tooltip to understand a control, the control is wrong, not the tooltip.
3. **Warmth over Neutrality.** Sterile is not the same as safe. Where Apple pursues a kind of cool precision, this system pursues *warm* precision — every neutral gray here has a whisper of warmth mixed in; there is no true institutional gray anywhere in the palette.
4. **Honesty over Polish.** Nothing performs certainty it doesn't have. Nova never pretends to be human. Simulated features (booking, credentials) are visibly, unapologetically marked as prototype-stage. Trust is a design material here, not a marketing outcome.

---

## 2. Brand Personality

If TeensHelpline were a person, they would be: the emotionally steady older sibling or cousin who is five-to-eight years older than you, works in something vaguely creative or technical, has clearly been through some things themselves, and never once makes you feel small for struggling. They text back fast. They don't lecture. They know exactly when to make a joke and exactly when to go quiet and just listen.

**Personality is / is not:**

| Is | Is Not |
|---|---|
| Warm | Saccharine |
| Calm | Flat / disengaged |
| Direct | Blunt or clinical |
| Playful in small doses | Gamified about pain |
| Competent, quietly | Corporate-polished |
| Hopeful | Falsely cheerful |
| Modern | Trend-chasing |
| Present | Performative |

**Voice pillars:** short sentences, contractions, second person, no jargon, no diagnostic language, no forced positivity ("everything happens for a reason" is banned copy, permanently).

---

## 3. Emotional Psychology

Design decisions here are grounded in four psychological principles specific to a distressed-user context, not generic UX heuristics:

**3.1 Cognitive Load Under Distress.** Working memory shrinks under acute stress. Every screen a teen might land on mid-crisis is capped at **one primary decision**. Secondary options are visually demoted, never removed — nothing is ever hidden from someone who needs it, but nothing competes with the one thing that matters most on that screen.

**3.2 Locus of Control.** Distress is often experienced as loss of control. The interface therefore never auto-advances, never forces a modal a user can't dismiss (except an active crisis banner, which is a deliberate, singular exception), and always shows an exit. Every flow is skippable. Every irreversible action requires an explicit, unambiguous confirmation — never a dark pattern, never a default toward retention.

**3.3 Predictability as Safety Signal.** Novelty is stressful under threat-response states. Motion, layout, and interaction patterns are therefore **highly consistent** across the product — a swipe means the same thing everywhere, a card behaves the same way everywhere. Delight is achieved through *quality of execution*, not *variety of pattern*.

**3.4 The Approach Gradient.** The distance (in taps, in cognitive effort, in emotional cost) between "I feel bad" and "I am talking to Nova or a real human" must be the shortest gradient in the entire product. Every other feature's friction budget is judged relative to this one, which gets none.

---

## 4. Visual Language

The visual language is best described as **"soft technical."** It borrows the confident geometric precision of Linear and Arc — real grids, real alignment, real typographic rhythm — and wraps it in the atmospheric warmth of a Spotify "Wrapped" moment or an Aurora sky: soft light sources, generous negative space, color that behaves like light rather than paint.

Nothing on the surface is sharp-edged, saturated to the point of alarm, or visually loud. Nothing underneath is sloppy — grids, spacing, and type are engineered with the rigor of a developer tool, because trust is communicated as much through precision as through softness.

**Never:** stock "mental health" imagery (rain on windows, silhouettes on hills, hands cupping light), primary-color clinical UI, skeuomorphic realism, aggressive drop shadows, comic-style illustration, anything that could read as a children's app.

---

## 5. Color Philosophy

Color in this system is not decorative — it's a **regulation tool**. Color temperature and saturation are dialed intentionally per context: calmer, cooler, lower-saturation in reflective/crisis-adjacent contexts; warmer and slightly more saturated in celebratory or encouraging contexts. Color never signals danger in a jarring, alarm-panel way — even the crisis banner uses a warm, urgent-but-steady red-coral rather than a pure alert red, because a teen in crisis should feel *held*, not *sirened at*.

### 5.1 Core Palette

| Token | Hex | Role |
|---|---|---|
| `color.aurora.dusk` | `#6B5B95` | Primary brand — twilight violet, calm authority |
| `color.aurora.dawn` | `#F2A65A` | Warm accent — hope, encouragement, small wins |
| `color.aurora.sea` | `#5B9AA0` | Secondary — trust, steadiness, Nova's core hue |
| `color.aurora.blush` | `#E8A0A0` | Soft accent — peer support, warmth, human connection |
| `color.ink.900` | `#1C1B29` | Near-black text, warm-tinted, never pure black |
| `color.ink.600` | `#4A4863` | Secondary text |
| `color.ink.300` | `#8B89A3` | Tertiary text / placeholders |
| `color.paper.50` | `#FAF9FC` | Base light background, warm-white |
| `color.paper.100` | `#F2F0F8` | Elevated surface light |
| `color.night.950` | `#0F0E17` | Base dark background |
| `color.night.900` | `#17161F` | Elevated surface dark |
| `color.signal.crisis` | `#E8654F` | Crisis banner — warm coral-red, never pure alarm red |
| `color.signal.safe` | `#6FBF9E` | Confirmation, success, "you're okay" moments |
| `color.signal.caution` | `#F2C169` | Gentle caution, non-urgent notices |

### 5.2 Contextual Color Rules

- **Crisis/escalation surfaces:** desaturate everything *except* the crisis signal itself. The banner should be the only saturated thing on screen when it's active.
- **Nova's chat surface:** dominated by `aurora.sea` and neutral paper/night tones — deliberately the calmest palette in the product.
- **Celebration/small-win moments** (completing a mood check-in, finishing a breathing exercise): permitted a brief, tasteful lift into `aurora.dawn` — the only place saturation is allowed to rise.
- **Never** use red/green as the sole differentiator for any state (colorblind-safety, §40); always pair with shape, icon, or text.

### 5.3 Dark Mode Is Not Inverted Light Mode

Dark mode is designed as its own emotional register — closer to "late at night, phone brightness turned down, talking quietly" — not a mechanical inversion. Aurora gradients shift toward deeper jewel tones; glass surfaces get more opaque (less see-through) to avoid the "muddy" look translucency gets on dark backgrounds.

---

## 6. Glassmorphism System

Glass is used to communicate **layering without weight** — a floating card should feel like it's gently resting above the content behind it, not like a pane of frosted plastic bolted on top. Glass is used sparingly: navigation, modals, the crisis banner's container, and Nova's chat input. It is never used for body text containers, where legibility must never be put at risk.

### 6.1 Glass Tiers

| Tier | Blur | Opacity (light) | Opacity (dark) | Use |
|---|---|---|---|---|
| `glass.subtle` | 12px | 72% | 65% | Cards resting on the base layer |
| `glass.standard` | 20px | 68% | 60% | Floating nav, sheet headers |
| `glass.prominent` | 32px | 82% | 78% | Modals, the crisis banner container |

### 6.2 Construction Rules

- Every glass surface gets a **1px inner border** at 12% white (light) / 8% white (dark) to simulate a physical edge catching light — never a hard CSS `border`, always an inset box-shadow to avoid pixel-snapping artifacts.
- Glass surfaces always sit on top of the Aurora/Mesh background layer (§8), never on top of flat color — glass with nothing interesting behind it just looks like gray fog.
- **Never stack more than two glass layers** in the same viewport region — nested glass-on-glass destroys legibility and reads as a bug, not a feature.
- Reduced-transparency OS setting (§40) replaces all glass tiers with solid `paper.100`/`night.900` — no blur fallback attempt, just a clean solid swap.

---

## 7. Color Glassmorphism

A refinement unique to this system: glass surfaces are lightly **tinted** with the dominant hue of the section they belong to, rather than staying neutral gray-glass. This is what separates this from a generic "frosted card" aesthetic.

- Nova's interface: glass tinted 4–6% `aurora.sea`.
- Peer support: glass tinted 4–6% `aurora.blush`.
- Crisis banner: glass tinted 8–10% `signal.crisis` — the one place tint intensity is doubled, because the banner must never be mistaken for a passive card.
- Parent/School sections: glass tinted 4–6% `aurora.dusk`.

Tint is applied as a color-mix overlay beneath the blur, not a filter on top of it, to avoid muddying the text sitting above the glass.

---

## 8. Aurora & Mesh Gradient System

The backdrop of the entire product is a slow-moving, low-contrast mesh gradient — evoking an aurora borealis at a distance, not up close. It is the emotional "weather" of the app: barely perceptible as motion, but felt as atmosphere.

### 8.1 Construction

- 3–4 soft radial color blobs (`aurora.dusk`, `aurora.sea`, `aurora.dawn` at low opacity, 8–14%) positioned off-canvas at the corners, rendered via CSS `background` with heavy blur, or an SVG mesh for richer stops where CSS gradients bottleneck.
- Blobs drift on a **90–180 second** loop, `ease-in-out`, never repeating an identical path (offset randomized per session, deterministic per render to avoid layout thrash).
- Mesh **never** appears behind body copy longer than a paragraph, behind form inputs, or behind the crisis banner's text — only behind hero sections, onboarding backdrops, and Nova's chat canvas.

### 8.2 Contextual Mood Shift

Mesh gradient hue-weighting subtly follows the user's stated mood from onboarding/mood-check (a callback to Spotify's context-driven color, reinvented): a teen who logged "overwhelmed" sees a slightly cooler, calmer mesh; a teen who logged "okay" sees a marginally warmer one. The shift is a **10% hue-weight nudge at most** — perceptible as "this feels right" rather than consciously noticeable. This must never be so pronounced that a "sad" mood produces a visually depressing UI; the floor of warmth/brightness never drops below the standard baseline.

### 8.3 Performance Guardrail

Mesh gradients are pre-rendered to a static image on low-power-mode/reduced-motion contexts and on any device failing a lightweight FPS probe on first paint — see §43.

---

## 9. 3D Gradient Guidelines

"3D-like" surface treatment (per TRD ADR-008: CSS-only, no WebGL) is reserved for a small, deliberate set of moments — onboarding cards, Nova's avatar container, and milestone/celebration cards.

- Achieved via `perspective` + `transform-style: preserve-3d` with a Motion-driven `whileHover`/`whileTap` tilt, max rotation **6deg** on any axis — anything more reads as gimmicky, not premium.
- Light source is fixed top-left across the entire product (consistent with the fixed aurora light metaphor) — gradient highlight and shadow angle on 3D elements must always agree with this, never flipped per-component.
- Depth is reinforced with a soft radial highlight (12–18% white overlay) at the simulated light-facing edge, not a literal gloss/reflection — avoids a "plastic toy" look.

---

## 10. Typography

**Typeface: Inter** for UI text (variable font, self-hosted via `next/font`), **Fraunces** (variable, optical-size-aware) for a small set of emotionally-weighted moments — the onboarding welcome headline, Nova's name treatment, milestone celebration text. This pairing — a precise grotesque for function, a warm serif for feeling — is the typographic equivalent of the whole system's "soft technical" idea. Fraunces is used at low frequency by design; if more than roughly 10% of a screen's text is Fraunces, it's being overused.

### 10.1 Type Scale (fluid, `clamp()`-based)

| Token | Size (mobile → desktop) | Weight | Line height | Use |
|---|---|---|---|---|
| `type.display` | 32px → 48px | 600 (Fraunces) | 1.1 | Onboarding welcome, hero moments |
| `type.title.xl` | 26px → 34px | 600 (Inter) | 1.2 | Page/section titles |
| `type.title.lg` | 21px → 26px | 600 | 1.25 | Card/module titles |
| `type.title.md` | 17px → 19px | 600 | 1.3 | Sub-section headers |
| `type.body.lg` | 16px → 17px | 400 | 1.55 | Primary reading text, Nova's replies |
| `type.body.md` | 14px → 15px | 400 | 1.5 | Standard UI text |
| `type.body.sm` | 12px → 13px | 400 | 1.45 | Captions, timestamps, helper text |
| `type.label` | 12px → 13px | 600, uppercase, 0.04em tracking | 1.2 | Eyebrows, badges, form labels |

**Rules:** body copy line length capped at 68 characters; no text below 12px anywhere in the product; Nova's replies always render at `body.lg`, never smaller, regardless of viewport — this is a deliberate legibility floor for a safety-critical reading context.

---

## 11. Grid System

- **Mobile (< 600px):** 4-column grid, 16px gutters, 20px outer margin.
- **Tablet (600–1024px):** 8-column grid, 20px gutters, 32px outer margin.
- **Desktop (> 1024px):** 12-column grid, 24px gutters, content max-width **1120px**, centered — the product never stretches edge-to-edge on large screens; wide open layouts feel institutional, not intimate.
- Nova's chat canvas is the one exception: max-width **720px**, always centered, regardless of viewport — chat should feel like a conversation, not a dashboard.

---

## 12. Spacing

8px base unit, expressed as a token scale — no ad hoc pixel values in component code.

| Token | Value |
|---|---|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.5` | 20px |
| `space.6` | 24px |
| `space.8` | 32px |
| `space.10` | 40px |
| `space.12` | 48px |
| `space.16` | 64px |

Generous whitespace is a deliberate anti-anxiety tool: default vertical rhythm between content blocks is `space.8`, not `space.4` — noticeably roomier than typical SaaS density.

---

## 13. Border Radius

Rounded, never sharp, never pill-everything (pill overuse reads as juvenile). A tiered system communicates hierarchy through curvature.

| Token | Value | Use |
|---|---|---|
| `radius.sm` | 8px | Inputs, small buttons, tags |
| `radius.md` | 14px | Standard cards |
| `radius.lg` | 20px | Modals, prominent cards, the crisis banner |
| `radius.xl` | 28px | Onboarding cards, Nova's chat bubble container |
| `radius.full` | 999px | Pills, avatars, the quick-exit button (deliberately maximal — it should feel like the fastest, softest possible target) |

---

## 14. Elevation

A five-level elevation system standing in for Apple's material depth concept, reinterpreted for a glass-and-light world rather than a stacked-material one.

| Level | Metaphor | Shadow | Use |
|---|---|---|---|
| `elevation.0` | Resting on the surface | none | Base page content |
| `elevation.1` | Lightly lifted | soft, 2px blur-8 | Standard cards |
| `elevation.2` | Floating | soft, 4px blur-16 | Nav, sticky headers |
| `elevation.3` | Hovering | soft, 8px blur-24 | Dropdowns, popovers |
| `elevation.4` | Foreground | soft, 16px blur-40 | Modals, the crisis banner |

Elevation changes are always animated (§21), never instant snaps — an element becoming "more important" should feel like it's rising, not teleporting.

---

## 15. Shadow System

Shadows are warm-tinted (never pure black) and diffuse — closer to how light falls in a softly lit room than a harsh studio shadow.

```
shadow.sm:  0 1px 2px rgba(28,27,41,0.06), 0 1px 1px rgba(28,27,41,0.04)
shadow.md:  0 4px 12px rgba(28,27,41,0.08), 0 2px 4px rgba(28,27,41,0.04)
shadow.lg:  0 12px 32px rgba(28,27,41,0.12), 0 4px 8px rgba(28,27,41,0.06)
shadow.glow.sea:   0 0 24px rgba(91,154,160,0.35)   — Nova active-state glow
shadow.glow.crisis: 0 0 32px rgba(232,101,79,0.4)   — crisis banner emphasis
```

Glow shadows (colored, no offset) are reserved for two things only: Nova's active/typing state and the crisis banner — glow always means "something here needs your attention or is alive," never decoration.

---

## 16. Iconography

Icon set: **Phosphor Icons** (duotone weight as default, regular weight for dense UI) — chosen over more clinical/geometric sets (Feather, Material Symbols) for its slightly warmer, more rounded terminals, and over more playful/rounded sets (Iconoir at its friendliest) for retaining enough precision to feel trustworthy.

- Default stroke width 1.5px at 24px canvas; scale proportionally, never below 16px.
- Icons never appear alone as the sole label for a *destructive or safety-critical* action (crisis exit, delete, block/report) — always paired with a text label.
- Custom icons (Nova's icon, the quick-exit icon) are drawn to match Phosphor's duotone geometry exactly, so nothing looks bolted-on from a different family.

---

## 17. Illustration System

Illustration style: **soft-geometric, low-detail, gender/ethnicity-ambiguous-by-default figures** built from simple rounded shapes — closer to Notion's illustration language than to a detailed editorial style, but warmer in palette (Aurora tones, not Notion's flatter primaries).

- **Never** depict a figure in visible distress (crying, curled up, head-in-hands) — this is a hard rule; imagery should hold hope, not reenact pain.
- **Never** depict a specific act of self-harm, substance use, or crisis in any illustrated form, even abstractly — content-warning topics get abstract/atmospheric illustration (a single candle, a doorway with light, an open hand) rather than literal scene depiction.
- Figures are used to depict *companionship and small moments* (two figures sitting together, a figure mid-stride toward a light), never as decorative filler.

---

## 18. Photography Rules

Photography is used sparingly — this product leans illustrated and atmospheric, not photo-heavy, per §17's reasoning. Where photography does appear (About page, professional/counsellor representations, School section):

- Real, warm, natural light only — no stock-photo "diverse group laughing at salad" energy, no clinical white-coat imagery.
- Sourced only from Unsplash, Pexels, or Pixabay per the intern program's licensing rule; every image credited in project documentation.
- Never a posed "sad teenager" stock photo anywhere in the product — this is the single most-violated rule in mental-health-adjacent design and is explicitly banned here.

---

## 19. Avatar System

Teen avatars are a small, curated, illustrated set (per TRD ADR-009 — no custom uploads in MVP) in the §17 illustration style: abstract, characterful "companion" shapes rather than literal human faces — think small creature/blob characters with personality conveyed through color and simple expression, not identity conveyed through realistic human features. This sidesteps representation pitfalls of a small fixed human-avatar set while staying warm and personal.

- 8–10 launch avatars, each paired with one of the Aurora palette hues as its "signature color," which lightly tints that user's accent moments throughout the product.
- Avatar selection is optional and skippable — a default neutral "spark" mark is used if skipped, never a blank/broken state.

---

## 20. Nova Character Design

Nova is **not** a humanoid character and is never rendered as one — this avoids both the uncanny-valley risk and the risk of a teen anthropomorphizing Nova into something more relationship-like than an AI companion should be.

- Nova is represented as a **soft glowing form** — an abstracted, animated aurora-light shape (a gently pulsing radial gradient blob, built from the §8 mesh system, wrapped in `aurora.sea` and `aurora.dusk`) rather than a face, mascot, or avatar.
- Nova has three visual states, each with a distinct but subtle animation: **resting** (slow 4s breathing pulse, opacity 85–100%), **listening** (gentle inward contraction while the user types), **responding** (soft outward bloom synced to text streaming in).
- Nova's glow **never** turns red, orange, or any alert-adjacent hue — even during an escalation hand-off, Nova's own visual stays in its calm palette; the crisis banner (a separate, clearly distinct UI element) carries the urgency instead. This is a deliberate signal: Nova itself is never the source of alarm.
- No mouth, no eyes, no literal face — the form communicates presence and attentiveness through motion and light alone.

---

## 21. Motion System

Motion in this product exists to do one of four jobs (per project brief): **reduce anxiety, guide attention, provide feedback, or build trust.** Anything that fails all four tests is cut in design review, no exceptions — including anything that's merely "delightful."

**21.1 Motion Character.** All motion uses spring physics (Motion's spring config), never linear or robotic easing — springs feel alive and organic in a way that reassures rather than mechanizes the experience. Overshoot is kept minimal (`bounce: 0.15–0.2` max) — a confident, settled motion, not a bouncy, toy-like one.

**21.2 Motion Hierarchy.** The more emotionally significant the moment, the slower and more deliberate the motion (crisis banner appearance: measured, unhurried, 400ms — arriving like a calm hand on a shoulder, not a jump-scare alert); the more routine the interaction, the snappier (button press: 100ms) — motion speed itself communicates emotional weight.

---

## 22. Animation Tokens

```
duration.instant:  100ms   — micro-feedback (button press)
duration.fast:     180ms   — hover states, small transitions
duration.base:     280ms   — standard component transitions
duration.slow:     400ms   — page-level transitions, banner appearance
duration.ambient:  90000–180000ms — mesh gradient drift (§8)

easing.standard:   spring(stiffness: 300, damping: 30)
easing.gentle:     spring(stiffness: 200, damping: 26, bounce: 0.1)
easing.settle:     spring(stiffness: 260, damping: 34, bounce: 0)   — crisis banner, no overshoot ever
easing.snappy:     spring(stiffness: 420, damping: 32)              — button press feedback
```

The crisis banner **always** uses `easing.settle` — zero bounce, zero overshoot — this is non-negotiable; an urgent safety element must never look "bouncy" or playful on entry.

---

## 23. Interaction Principles

1. **Every interactive element has four visible states** at minimum: default, hover (pointer devices), pressed, focus-visible — see §33–36 for per-component detail.
2. **Touch targets are never smaller than 44×44px**, matching platform accessibility conventions, even on dense desktop layouts.
3. **Nothing important is gesture-only.** Swipe-to-dismiss, long-press, etc. always have a visible tap-based equivalent — a stressed user under cognitive load shouldn't need to discover a hidden gesture to reach help.
4. **Undo over confirm, where safe.** For low-risk actions (dismissing a suggestion, closing a card), prefer an "undo" toast over a blocking confirmation dialog — confirmation dialogs are reserved for genuinely irreversible or safety-relevant actions.

---

## 24. Micro-interactions

- **Button press:** scale to 0.97, `duration.instant`, `easing.snappy` — immediate tactile feedback.
- **Card hover (desktop only):** lift via elevation token +1, translateY(-2px), `duration.fast`.
- **Toggle/switch:** thumb travels with `easing.standard`; track color cross-fades simultaneously, never sequentially.
- **Mood selection (onboarding/mood-check):** selected mood card gets a soft radial glow bloom in that mood's assigned hue (never literally "sad = gray/blue," see §5.2's mood-mesh nuance) plus a gentle 1.03 scale — a small, warm acknowledgment that the choice registered.
- **Nova message arrival:** text streams in at a natural reading pace (not instant paste, not a slow typewriter gimmick) — approximates a person typing without literally simulating typos or "..." indicators for longer than 1.5s.
- **Successful save/submit:** a single soft checkmark bloom, `signal.safe` hue, 600ms total, never a full-screen confetti moment — celebration here stays understated, per §3.

---

## 25. Page Transition Rules

- Standard route transitions: outgoing content fades + translates up 8px while incoming content fades + translates up from 8px below, staggered by 60ms, total `duration.base` — a gentle "next thing settling into place" feel, never a slide/wipe/zoom.
- Onboarding step transitions: horizontal fade-slide (24px), reinforcing forward progress, always paired with the step's progress indicator updating in sync.
- **The crisis banner and quick-exit are never subject to page-transition delay** — they render/persist instantly and outside the normal transition choreography, full stop.
- `prefers-reduced-motion`: all translate/scale components of every transition above are stripped to a plain opacity cross-fade at `duration.fast`; ambient mesh drift (§8) is frozen to a static frame.

---

## 26. Navigation Behavior

- **Primary navigation** is a floating glass tab bar (mobile) / floating glass sidebar (desktop) — `glass.standard` tier, always visible, never auto-hiding on scroll (auto-hide nav creates exactly the kind of unpredictability §3.3 warns against).
- The crisis "I need help now" entry point lives **outside** the standard nav rhythm — visually distinct, fixed position, same location on every single screen (top-of-viewport on mobile, always-visible in the sidebar header on desktop) so it never has to be relearned or searched for.
- Back navigation is always explicit (visible back control), never reliant on OS gesture alone, and never destructive (returning never discards unsaved input without a gentle confirmation).

---

## 27. Landing Page Guidelines

- Hero: Fraunces `type.display` headline, single clear value statement, immediate visibility of "Continue Anonymously" as the visually primary CTA (Google/Email secondary, per PRD's anonymous-first product philosophy) — the landing page's entire job is to get someone into safety fast, not to sell features.
- The crisis banner **appears on the landing page too**, before any login state exists — safety access is never gated behind entry-method choice.
- No auto-playing video, no animated hero illustration competing with the CTA, no scroll-jacking.

---

## 28. Dashboard Guidelines

- Card-based, single-column-priority layout on mobile (one primary action visible without scrolling: Nova, mood check, or crisis banner depending on context) expanding to a light bento-style multi-card grid on desktop — never a dense admin-tool grid.
- Personalized content (mood-driven recommendation, saved resources) is visually distinguished from evergreen content (Study Hub links) via a subtle "for you" glass-tinted card treatment, so a teen always understands *why* something is being shown to them.
- Parent Dashboard uses a visibly calmer, slightly more neutral palette weighting (less `aurora.dawn`, more `aurora.dusk`/paper neutrals) — a small, deliberate tonal shift that communicates "this is a guidance space, not a peer space" without needing a label to say so.

---

## 29. Chat Interface

- Nova's chat canvas: centered, `max-width: 720px` (§11), generous `space.6` vertical rhythm between message groups — never a dense messaging-app feel.
- User messages: right-aligned, `glass.subtle` bubble, `radius.xl`. Nova's messages: left-aligned, no bubble container at all — Nova's text sits directly on the mesh backdrop with its glow-form avatar beside it, reinforcing that Nova is atmosphere, not a boxed-in chat participant.
- Composer (input) bar: floating `glass.standard` pill, fixed to viewport bottom, persistent quick-exit icon docked immediately beside it — help and exit are always in the same reach zone.
- Typing/thinking state: Nova's glow-form shifts to "listening" or "responding" motion (§20) — no generic three-dot typing indicator; Nova's own presence *is* the indicator.
- On escalation trigger mid-chat: the crisis banner animates in above the composer using `easing.settle`, chat input is not disabled (a user should never feel cut off), but the banner's visual weight (elevation.4, glow.crisis) makes it unmistakably the priority.

---

## 30. Mood Check Experience

- A horizontal row of 5 mood cards (per PRD: Happy, Okay, Sad, Overwhelmed, Anxious), each a `radius.lg` card with a simple abstract glow-dot in a mood-appropriate hue (not garish emoji, not a literal face) — consistent with the "never a sad-face icon" instinct throughout this system.
- Selecting a mood triggers the micro-interaction in §24, then a brief (under 2s) transition directly into Nova's contextual response or a recommendation card — mood-check must never dead-end on a "thanks, submitted!" screen with no next step.
- Optional free-text note field is present but visually secondary and clearly marked optional — never required to proceed.

---

## 31. Onboarding Experience

- Follows the PRD's flow (Welcome → Avatar → Role → Mood → "what brought you here" → Nova welcome), each step a full-bleed `radius.xl` card over the Aurora mesh backdrop, Fraunces used only on the Welcome step's headline.
- Progress is shown as a soft, thin dot-row (not a percentage bar) — précised enough to orient the user, understated enough not to feel like a form.
- Every screen has a visible, always-enabled "Skip" — skipping never produces a degraded or broken subsequent state; downstream screens handle missing onboarding data gracefully (§ PRD Edge Cases).
- 3D-tilt micro-interaction (§9) is applied to the avatar/mood/concern selection cards on hover/press only — the one place in onboarding where the "3D-like" depth treatment is used, kept exclusive to avoid overuse.

---

## 32. Component Library

Built on **shadcn/ui primitives** (per TRD §"Component & Design System Architecture") themed entirely through this system's tokens, layered with 21st.dev animated blocks for onboarding/card compositions. No component in `components/ui/` carries feature logic (TRD dependency rule) — it carries only visual and interaction behavior defined here.

---

## 33. Buttons

**Variants:** `primary` (solid `aurora.dusk`→`aurora.sea` gradient fill, white text), `secondary` (glass, tinted per §7), `ghost` (text-only, underline on hover), `destructive` (solid `signal.crisis`, reserved for genuinely destructive/safety actions like "end session" — never used for routine negative actions like "cancel," which stays `ghost`).

| State | Behavior |
|---|---|
| Default | `elevation.1`, `radius.md` |
| Hover | `elevation.2`, +4% lightness on fill, `duration.fast` |
| Pressed | scale 0.97, `elevation.0`, `duration.instant` |
| Focus | 3px `aurora.sea` focus ring, offset 2px — always visible on keyboard focus, never suppressed |
| Loading | label replaced by a 3-dot pulse in the button's foreground color, button width does not reflow, `duration.base` fade between states |
| Error | button briefly shakes (±4px, 200ms, 2 cycles) and border flashes `signal.crisis` for 400ms, then returns to default — never a hard color-permanent error state on the button itself; the error message carries the information |
| Disabled | 40% opacity, no elevation, `cursor: not-allowed`, never fully invisible |

Dev note: button height is fixed per size token (`sm: 36px`, `md: 44px`, `lg: 52px`) regardless of content, to guarantee the §23 44px touch-target minimum at `md` and above.

---

## 34. Inputs

- Text fields: `glass.subtle` fill, `radius.sm`, 1.5px border in `ink.300` at rest, transitioning to 2px `aurora.sea` border + soft `shadow.glow.sea` (at 15% intensity) on focus — `duration.fast`.
- Labels sit above the field (never placeholder-as-label — a stressed user shouldn't lose their place if they forget what a field was for once they start typing).
- Error state: border shifts to `signal.crisis`, helper text below field changes to the error message in `signal.crisis`, field gently shakes once (§33's shake spec) — errors are always explained in plain language, never just "invalid input."
- Sensitive fields (any free-text field where a teen might disclose something significant, e.g., mood note, Nova chat input) never show a native browser autofill/autocomplete affordance, and never persist a draft to browser storage (TRD §20).

---

## 35. Cards

- Base: `elevation.1`, `radius.md`/`lg` depending on context (§13), `glass.subtle` or flat `paper.100` depending on whether it sits over the mesh backdrop or a solid page section.
- Interactive cards (tappable resource cards, mood cards) get the full hover/press/focus treatment from §23–24; purely informational cards (a static content block) get no hover treatment at all — motion always signals "this does something," never applied indiscriminately.
- Content-warning cards (sensitive Study Hub topics) render with a distinct **soft blur-veil** over the card's illustration/preview until tapped/expanded, with a small "may be sensitive — tap to view" label — protects against ambush exposure to a heavy topic while browsing.

---

## 36. Modals

- `glass.prominent`, `elevation.4`, `radius.lg`, entrance via scale-from-0.96 + fade, `easing.gentle`, `duration.base`; backdrop is a `night.950` scrim at 40% opacity with matching blur.
- Always dismissible via a visible close control **and** the Escape key **and** backdrop click — except a genuine, rare safety-critical confirmation (e.g., "are you sure you want to end this crisis chat"), which requires an explicit in-modal choice and disables backdrop-dismiss only in that specific case.
- Focus is trapped within the modal and returns to the triggering element on close (§40).

---

## 37. Empty States

Every empty state (no Study Hub search results, no saved resources yet, no peer messages yet) uses the §17 illustration style at small scale, a warm one-line acknowledgment, and — critically — **always offers a next action** (a search suggestion, a link to Nova, a prompt to explore a category) rather than a dead end. An empty state is never allowed to feel like failure; it's reframed as "nothing here yet, here's somewhere to go."

---

## 38. Loading States

- Skeleton loaders (not spinners) for content-shaped loads — matching the final layout's card/text shapes at `paper.100`/`night.900` with a slow shimmer sweep, `duration.ambient`-adjacent pacing (2.4s loop) so it reads as calm, not frantic.
- Nova's own "thinking" state uses its glow-form animation (§20), never a generic spinner — consistency of character over generic UI chrome.
- Any load expected to exceed ~4 seconds gets a short reassuring microcopy line beneath the loader ("still here, one moment") rather than silence — silence during a wait reads as abandonment in a support context.

---

## 39. Error States

- Non-critical errors (search failed, a resource failed to load): inline, calm, actionable — icon + one-line explanation + retry action, `signal.caution` accent, never `signal.crisis` (that hue is reserved exclusively for the actual crisis-escalation system, so it never loses meaning through overuse).
- System-level failures (Nova unavailable, Supabase degraded per TRD Edge Cases): full-width banner, calm tone, always paired with an alternate path (Study Hub link, crisis banner remains visible) — an error state must never leave a user with literally nothing to do.
- The crisis banner itself is explicitly exempt from ever displaying as an "error" — per TRD, it's a static component with no data dependency, so it cannot fail in a way the design system needs to account for.

---

## 40. Accessibility

Non-negotiable, build-blocking (per TRD §26), not a post-launch pass:

- **WCAG AA minimum** across all text/background pairings; the palette in §5 was chosen and contrast-checked specifically to hold AA at every documented pairing.
- **Color is never the sole signal** for state, mood, or urgency — always paired with icon, shape, motion, or text.
- **Focus-visible states are never suppressed** anywhere in the codebase (no blanket `outline: none`).
- **Crisis banner is `aria-live="assertive"`**, screen-reader announced immediately on trigger, per TRD §26.
- **Full keyboard operability**: every flow (onboarding, mood check, Nova chat, crisis exit) completable without a pointer device.
- **`prefers-reduced-motion`** strips all non-essential animation to opacity-only cross-fades (§25); **`prefers-reduced-transparency`** removes all glass blur in favor of solid fills (§6.2).
- **Minimum touch target 44×44px** (§23), **minimum text size 12px, no minimum-size exceptions** (§10).
- Nova's responses and all critical copy are written at a plain-language reading level (target: age 13 comprehension) regardless of the user's actual age, per the platform's broad teen age range.

---

## 41. Mobile-First Rules

- Every component is designed at 375px width first; desktop is an *expansion* of the mobile layout, never a separate design.
- Bottom-reachable zone (thumb-friendly, per platform ergonomics) hosts the primary action on any given mobile screen — Nova's composer, the crisis "help now" access, and primary CTAs never sit in the unreachable top third alone.
- No hover-dependent functionality — anything conveyed via hover on desktop has an explicit tap/visible equivalent on mobile (§23).

---

## 42. Responsive Rules

- Breakpoints: `mobile < 600px`, `tablet 600–1024px`, `desktop > 1024px`, mapped directly to the §11 grid tiers.
- Nova's chat and onboarding stay single-column and centered at all breakpoints (§11, §29) — these flows never "use" extra desktop width for additional columns, preserving the intimate, conversational framing regardless of screen size.
- Dashboards and Study Hub expand from single-column (mobile) to a light 2–3 column bento grid (desktop) — the only surfaces in the product that meaningfully restructure across breakpoints.

---

## 43. Performance Budget

Directly inherits and enforces the PRD/TRD targets — this is a design constraint, not just an engineering one:

- Lighthouse performance, accessibility, best-practices: **> 90** (build-blocking, TRD §19).
- Mobile load: **< 3s** average (PRD Success Metrics).
- Aurora mesh (§8) and any Lottie/Motion-heavy sequence must degrade gracefully: a lightweight FPS probe on first paint falls back to a static pre-rendered mesh frame if the device can't sustain smooth animation — a design that only looks good on a flagship phone is a design that has failed a meaningful share of this product's actual users.
- Motion/Lottie bundles code-split to only the routes that need them (TRD §19) — the crisis banner and its render path carry **zero** dependency on these bundles, so it can never be delayed by animation payload weight.

---

## 44. Asset Strategy

- Illustration and avatar assets: SVG wherever possible (scalable, tiny payload, themeable via CSS custom properties for light/dark and mood-tint variants) — raster only for photography (§18).
- Lottie JSON files reserved for onboarding's welcome sequence and Nova's optional richer "bloom" moment on first meeting — kept few in number and small in complexity given the performance budget (§43).
- All static assets served from Supabase Storage via CDN per TRD §28, `next/image` for any raster asset with explicit width/height to prevent layout shift.

---

## 45. Image Generation Guidelines

Where AI-assisted image generation is used for illustration exploration (never for final photography of real people):

- Prompts must explicitly encode this system's illustration rules (§17): soft-geometric, low-detail, no visible distress, no literal crisis depiction, Aurora palette only.
- Generated assets are a starting point for a designer to clean up into the actual SVG illustration set, never shipped as raw AI output — consistency across the illustration set requires manual unification of line weight, palette, and proportion that generation alone won't guarantee.
- Never generate a "sad teenager" or any image implying a specific real minor — abstraction (§17) sidesteps this risk entirely by design.

---

## 46. Illustration Guidelines

(Extending §17 with production detail.)

- Canvas convention: all illustrations built on a consistent internal grid (8px base, matching §12) so they compose predictably into cards of varying size without awkward cropping.
- Line weight: consistent 2px stroke where strokes are used at all; most forms are solid-fill shapes rather than outlined, for a softer, more atmospheric result consistent with the mesh/glow visual language.
- Every illustration is delivered in a light-mode and dark-mode variant (palette-swapped, not just inverted) to match §5.3's dark-mode philosophy.

---

## 47. Approved Libraries

| Purpose | Library |
|---|---|
| Animation (sequencing, gestures, spring physics) | **Motion** (`motion` package) |
| Illustrated/pre-authored animation | **Lottie** (`lottie-react`) |
| Character/interactive animation (Nova exploration, Phase 2 candidate) | **Rive** — evaluate post-MVP; not required for MVP's CSS/Motion-based Nova glow-form |
| UI primitives | **shadcn/ui** |
| Animated blocks | **21st.dev** component blocks |
| Icons | **Phosphor Icons** |
| Fonts | **Inter**, **Fraunces** via `next/font` (self-hosted) |
| Forms | React Hook Form + Zod (shared client/server schemas, per TRD) |

---

## 48. Dependency Guidelines

- No new visual/animation dependency is added without checking it against the performance budget (§43) first — Context7 MCP is consulted for current, accurate docs before adoption (TRD "AI-Assisted Development Standards").
- Anything that would pull in a WebGL/3D engine (Three.js, React Three Fiber) is strictly confined exclusively to `features/onboarding/`, dynamically imported, code-split from the global bundle, with a graceful-degradation guardrail. This scoped exception was explicitly signed off and is now the only allowed usage of Three.js.
- No component library is used wholesale as a visual system (i.e., never "just use shadcn's default theme") — every primitive is retokenized through this document before shipping.

---

## 49. Developer Implementation Rules

- All color, spacing, radius, shadow, duration, and easing values are consumed as **design tokens** (Tailwind config extensions per TRD "Component & Design System Architecture") — no hardcoded hex/px/ms values in component code; this is a code-review blocker, same weight as the TRD's dependency-direction rules.
- Glass/blur effects use a shared `Glass` primitive component (tier prop per §6.1) rather than ad hoc `backdrop-filter` calls scattered through feature code.
- The crisis banner component is the one UI element in the entire system permitted to bypass normal render/animation sequencing (§25, §29) — it is built and tested (TRD §29 Playwright suite) as a standalone, dependency-free component that renders correctly even under simulated total backend outage.
- Reduced-motion and reduced-transparency handling (§40) is implemented once, centrally, via a shared hook/provider — never re-implemented per component.
- Every new component's four interaction states (§23) and applicable behaviors from §"For every major component" are documented in that component's Storybook/preview entry before merge.

---

## 50. Design Do's and Don'ts

**Do**
- Default to the calmest plausible version of any screen.
- Make the next right action visually unambiguous.
- Let Nova's presence carry warmth through motion and light, never through a face.
- Keep the crisis path the shortest, least-decorated path in the product.
- Mark every simulated/prototype feature honestly, in-product, every time it appears.

**Don't**
- Don't use gamification mechanics (streaks, points, leaderboards) anywhere near mood, distress, or crisis-adjacent content.
- Don't use stock "sad teen" imagery, rain-on-glass metaphors, or silhouette-on-a-hill illustration.
- Don't let a delightful animation add even 100ms of friction to reaching help.
- Don't introduce a new interaction pattern for a single feature when an existing pattern already does the job.
- Don't let the crisis banner's red ever appear anywhere else in the product — that hue's meaning must stay singular and trustworthy.

---

## Appendix: Reference Study Notes (For Internal Use Only)

*Not part of the shipped system — a record of what was studied and consciously not carried forward, so future contributors understand the reasoning rather than re-discovering it.*

- **Apple HIG:** taken — deference, clarity, restraint, systemized tokens. Left behind — its cool, low-emotion neutrality; its assumption of a calm, unstressed user.
- **Arc Browser:** taken — playful confidence in a technical product, light/color as personality. Left behind — its density and power-user complexity.
- **Linear:** taken — grid precision, motion restraint, dark-mode-first rigor. Left behind — its purely functional, low-warmth palette.
- **Discord:** taken — belonging, informal warmth, community framing for peer support. Left behind — its saturated, high-energy palette and gamer-culture visual dialect.
- **Spotify:** taken — mood-responsive color as a concept. Left behind — its bold, high-saturation maximalism.
- **Nothing:** taken — honesty-through-transparency as a literal design metaphor (glassmorphism here is Nothing's transparent-hardware idea, translated to UI). Left behind — its stark, monochrome, tech-forward coldness.
- **Airbnb:** taken — human warmth, illustration-forward storytelling. Left behind — its marketplace/commerce-driven interaction patterns.
- **Notion:** taken — quiet confidence, restrained illustration style, calm neutrality as a baseline. Left behind — its productivity-tool density and utilitarian typography.

*End of document.*
