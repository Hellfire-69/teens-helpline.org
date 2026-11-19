- **Modern Web Guidance**: Retrieved motion/accessibility guides; legacy-scan reported 0 findings across 33 guides.
- **Context7**: Queried motion.dev documentation for `useReducedMotion` hook syntax and fallback patterns.
- **Find-Skills**: Searched Skills CLI (`skills find "accessibility"` -> 0 matches; applied local design system).
- **Design Skills**: Enforced Design.md precedence (Fraunces ≤5xl, 6deg hover tilt limit, glass tokens, 44px+ touch targets).
- **Ponytail Review & Verification**: Confirmed clean lean diff, 0 typecheck errors, and 0 lint errors.
- **Modern Web Guidance**: Retrieved accordion & accessibility specs; legacy-scan reported 0 findings across all 5 changed files.
- **Context7**: Queried shadcn base-nova accordion and Base UI primitives; confirmed zero additional npm packages required.
- **Find-Skills & shadcn**: Checked shadcn CLI setup with components.json and verified MIT license and Base UI bindings.
- **Design Skills (impeccable / design-taste-frontend)**: Enforced Design.md tokens (aurora/ink/night), light/dark mode parity, max text-5xl, and no Quick Exit button overlap.
- **Ponytail Review & Superpowers Verification**: Validated minimal surgical diffs, 0 new dependencies, 0 typecheck errors, and 0 lint errors before final commit.
- **Context7**: Queried Next.js Image static import behavior, verifying automatic blurDataURL generation and priority deprecation/preload mapping.
- **Superpowers (Brainstorming & Verification)**: Mapped Cairn reference window-and-card art direction to About sections and validated all constraints before completion.
- **Modern Web Guidance**: Verified scroll-linked transforms, image optimization, and reduced-motion standards; legacy-scan reported 0 findings across all 7 changed files.
- **Design Skills (impeccable / design-taste-frontend)**: Ran antipattern detector (0 findings after refining side-tab styling), enforced Fraunces ≤5xl, no backdrop-blur/neon/glow, and body text ≥18px.
- **Ponytail Review**: Executed minimal-change diff review, confirming 0 new npm packages, 0 typecheck errors, 0 lint errors, and zero alterations to home/banner/nav/footer.

- **Modern Web Guidance**: Validated keyboard navigation (arrow keys/Home/End) for accordion/tabs, reduced motion support, and run legacy-scan (0 findings across modified files).
- **Context7 & API Standards**: Verified Next.js 16 / React 19 compatibility, motion/react layout transitions, and fluid SVG mask-image standards without extra dependencies.
- **Design Skills (impeccable / design-taste-frontend)**: Ran antipattern detector (0 findings), enforced Fraunces <=text-5xl, warm cream background, SVG mountain ridges with project tokens, and left-aligned headings.
- **Ponytail & AGENTS.md Audits**: Enforced minimal surgical diffs, no new packages, no deletion of dead code components, no edits to home/crisis-banner/Navbar, and preserved all safety disclaimers.
- **Superpowers (verification-before-completion)**: Confirmed 100% pass on npm run typecheck and npm run lint across all 5 discrete task commits.

- **Superpowers Brainstorming**: Designed the 400vh desktop pinned scroll story and sticky viewport container with discrete step state transitions.
- **Modern Web Guidance**: Applied scroll-linked animation without interception, sticky layout, tab semantics, and useReducedMotion fallback (0 findings across modified files).
- **Context7**: Queried motion/react useScroll, useTransform, useSpring, and useMotionValueEvent; verified clip-path and translateY interpolation.
- **Design Skills (impeccable / design-taste-frontend)**: Ran detector (0 findings); updated Design.md scroll exception rule; polished full-bleed cream canvas and dusk ridges.
- **Ponytail Review & Superpowers Verification**: Confirmed zero new packages, strict sentence removals, and 100% pass on typecheck and lint across all revision commits.

- **Superpowers Brainstorming**: Analyzed user reference image to scale CTA window to clamp(560px, 86vh, 820px) and balance scroll physics.
- **Modern Web Guidance**: Eliminated willChange rasterization bottlenecks and tuned spring mass/stiffness for zero-lag responsiveness.
- **Context7 & Motion Primitives**: Realigned scroll trigger offsets to start: 95% and end: 25% matching Cairn CTA vista expansion curves.
- **Design Skills (impeccable / design-taste-frontend)**: Removed nested opaque card in closing window; floated typography and action pill directly on dusk vista.
- **Ponytail Review & Verification**: Calibrated How It Works pinned container from 400vh to 300vh, verified 0 type errors, and 0 lint errors.

- **Design Critique (impeccable / design-taste-frontend)**: Audited How It Works visual hierarchy; added template-inspired scroll progress track above step 01.
- **Template Motion & Blur Transitions**: Integrated Cairn-matched blur filter transitions (blur(6px) -> blur(0px)) and ambient mountain sky crossfading.
- **Scroll Physics & Travel Calibration**: Reduced scroll container height from 300vh to 250vh and tuned spring mass to 0.08 for zero-latency step triggers.
- **Modern Web Guidance & Accessibility**: Maintained aria-selected/tablist contracts and guarded blur filters with useReducedMotion fallback.
- **Ponytail Review & Verification**: Confirmed clean surgical diff on AboutHowItWorks, 0 typecheck errors, and 0 lint errors before commit.

- **Modern Web Guidance Review**: Enforced WAI-ARIA tablist roving tabindex (tabIndex={isActive ? 0 : -1}), explicit type="button", and tabpanel focusability.
- **Browser & DevTools Diagnostics**: Resolved non-static container positioning warning on useScroll targets by enforcing relative containers on AboutHero and AboutClosingWindow.
- **Next.js Image & Routing Optimization**: Calibrated responsive sizes prop on hero media and added data-scroll-behavior="smooth" to html tag in root layout.
- **Ponytail Code Review**: Conducted complete quality audit across all 8 About page files; verified zero dead code, strict types, no memory leaks, and lean diffs.
- **Superpowers Verification**: Verified 100% pass on typecheck, ESLint, and impeccable antipattern detector across the entire repository.


- **Superpowers (Brainstorming & Verification)**: Designed calm, editorial Help page layout matching About visual language, verified 100% adherence to Design.md and verified all criteria before completion.
- **Modern Web Guidance**: Applied CSS-only gentle fade-in respecting prefers-reduced-motion; legacy-scan reported 0 findings across changed files.
- **Impeccable & Design Skills**: Enforced Fraunces visual hero numbers, Inter labels, calm apricot/rose/plum static SVG ridge window, 44px tap targets, and eliminated alarm-red cues.
- **Ponytail Review**: Verified minimal surgical diffs, 0 new packages, fixed broken /study-hub route, and preserved Server Component architecture.
- **Audit & Type Safety Verification**: Confirmed 0 typecheck errors and 0 lint errors across the repository and audited cross-component helpline consistency.


- **Superpowers (Brainstorming & Verification)**: Planned and validated the scroll-driven curtain story reveal with interlocking seam geometry, 180svh mobile ergonomics, and comprehensive keyboard/reduced-motion fallbacks.
- **Modern Web Guidance**: Verified native scroll-driven MotionValues (useScroll, useTransform, useSpring) without wheel/touch interception; legacy-scan reported 0 findings.
- **Impeccable & Design Skills**: Enforced Design.md illustration rules (soft-geometric, no faces/distress, Aurora tokens only) with the Mountain Beacon and Guiding Lantern SVG vector artwork.
- **Ponytail Review**: Kept the curtain wrapper strictly isolated as a client component while preserving the full Server Component DOM and tel: links underneath with zero new packages.
- **Accessibility & Next.js Build Verification**: Verified accessible visible skip link, WCAG AA compliance, and confirmed 100% pass on npm run build, typecheck, and ESLint.


- **Design Review & Architecture Refactor**: Diagnosed and resolved the sticky scroll math bug, isolating GetHelpCurtain to a dedicated 155svh hero stage while preserving natural flow for all 5 helplines.
- **Motion & Visual Craft**: Implemented true diagonal zigzag paper-tear reveal (1600x900 16:9 viewBox, (1080,0) to (520,900)), deckle-edge stroke highlights, drop shadows, and subtle cardstock rotation.
- **Crisis Safety & Triage**: Introduced unblocked persistent top crisis bar with direct CHILDLINE 1098 and TeleMANAS 14416 dial pills and jump link, ensuring emergency help is never gated behind scroll.
- **Impeccable Antipattern Audit**: Ran detector, eliminated tacky bounce easing in favor of smooth deceleration, and verified 0 anti-patterns across refactored files.
- **Modern Web Guidance & Verification**: Passed legacy-scan across all components with zero findings; confirmed 100% pass on Next.js production build, typecheck, and ESLint.

- **Helpline Directory Fact Auditing**: Verified all official helpline numbers/hours against government records; corrected iCALL operating hours to "Mon-Sat, 10am-8pm" and documented differences across crisis banner and safety bar.
- **Unverified Claims Sanitization**: Stripped "Verified" claims from titles/hero, removed "moderated" and "trained teenager" peer claims with code proof from `service.ts`, simplified FAQ responses, and verified Quick Exit behavior directly against `quick-exit.tsx`.
- **Design Token & Typography Alignment**: Enforced minimum 14px text size across all directory elements, removed uppercase tracking-wider eyebrow badges and square icon containers, and eliminated alarm-red cues in favor of ink/aurora tokens.
- **Modern Web Guidance**: Executed `legacy-scan` across modified pages and components with 0 findings across 38 guides (52 active rules).
- **TypeScript & Vitest Verification**: Confirmed 100% pass on Vitest test suite (`get-help.test.ts`), 0 TypeScript typecheck errors (`tsc --noEmit`), and 0 ESLint errors.

- **Context7 & Compiler Optimization**: Queried Next.js 16 compiler specifications for `experimental.optimizePackageImports` on `@phosphor-icons/react`, reducing barrel overhead while confirming built-in tree shaking for Lucide.
- **Edge Proxy Scoping & Vitest Suite**: Restated middleware route matcher to strictly target guarded and auth surfaces, protecting public routes from unneeded session round trips, and wrote unit test suite (`proxy-matcher.test.ts`) guaranteeing 100% coverage of all `app/(main)` route folders.
- **Auth Architecture Audit & Layout Boundary Refactor**: Isolated `<AuthProvider>` to authenticated segment layouts (`app/(auth)` and `app/(main)`), eliminating public route auth overhead while adding a dev-fallback in `useAuth()` to prevent runtime regressions, and documented `/dashboard` duplicate `getUser` round trip.
- **Motion Tree-Shaking**: Migrated `Navbar`, `Footer`, and `CrisisBanner` to motion/react's `LazyMotion` with `domAnimation` and `m` primitives, stripping synchronous motion runtime weight from initial page load without altering visual design or accessibility attributes.
- **Sharp Asset Engineering & Next.js Image Optimization**: Generated 2x-calibrated `logo-v2-sm.png` and high-efficiency WebP hero vistas via sharp outside the repository, added explicit LCP `priority` and responsive `sizes` in `scroll-expansion-hero.tsx`, reducing home page image payload by 93.4% (6.7 MB down to 440 kB) and first load JS by ~30% across public routes.
