# Code Remediation To-Do: Design System Mismatches

**Audit Date:** 2026-11-14  
**Project:** Teens Helpline (`teenshelpline-org`)  
**Context:** Step 3 Baseline Audit & Design.md Alignment  
**Reference Document:** `docs/Design.md`, `docs/audit/design-check.md`  

> [!NOTE]  
> The items documented below represent **code issues**, not documentation issues. Per the Step 3 instructions, no application source files have been modified. These items are cataloged here with their exact files and line numbers for subsequent code remediation steps.

---

## 1. Crisis Color Hue Misuse (`signal.crisis` / Alert Red in Non-Crisis UI)

Per `Design.md` §5.1 and §50, the crisis red hue (`signal-crisis`) is reserved exclusively for live crisis intervention and safety banners (`CrisisBanner`). It must never appear on general marketing, testimonial, or flow surfaces so that the hue's urgency remains singular, trustworthy, and non-diluted.

| File | Line(s) | Current Implementation | Issue Description | Recommended Fix |
|---|---|---|---|---|
| `features/marketing/components/Flow.tsx` | 32–33 | `color: "text-signal-crisis bg-signal-crisis/10 border-signal-crisis/20"`, `glow: "bg-signal-crisis/20"` | "Crisis Help Always Visible" step uses crisis token in marketing flow card | Swap to standard calm alert/safety token or neutral aurora token (e.g. `aurora-dusk` or subtle ink) |
| `features/marketing/components/Flow.tsx` | 76 | `<stop offset="100%" stopColor="#ef4444" />` | SVG linear gradient (`flow-grad`) terminates at raw alert red (`#ef4444`) | Replace terminal gradient stop with an aurora palette color (e.g. `aurora-blush` `#E8A0A0` or `aurora-dusk` `#6B5B95`) |
| `features/marketing/components/Testimonials.tsx` | 55 | `avatarColor: "bg-signal-crisis/10 text-signal-crisis"` | Testimonial card avatar for "Rohan" uses crisis red tokens | Change avatar styling to an aurora token (e.g. `bg-aurora-blush/20 text-aurora-blush` or `bg-aurora-dusk/20 text-aurora-dusk`) |
| *(Related)* `features/marketing/components/ConcernsGrid.tsx` | 67 | `colorClass: "bg-signal-crisis/10 border-signal-crisis/20 shadow-signal-crisis/5"` | "Anxiety & Overwhelm" card styled with crisis red tokens | Reassign to `aurora-blush` or `aurora-dawn` to avoid false crisis signaling |

---

## 2. Hardcoded Hex Values & Non-Token Color Classes

Per `Design.md` §49, all colors, spacing, and styling must strictly consume defined Tailwind design tokens with zero arbitrary hex/raw palette values.

| File | Line(s) | Current Implementation | Issue Description | Recommended Fix |
|---|---|---|---|---|
| `features/marketing/components/Flow.tsx` | 73 | `<stop offset="0%" stopColor="#8b5cf6" />` | Hardcoded raw Tailwind purple hex in SVG gradient | Replace with `var(--color-aurora-dusk)` or theme token `#6B5B95` |
| `features/marketing/components/Flow.tsx` | 74 | `<stop offset="33%" stopColor="#f97316" />` | Hardcoded raw Tailwind orange hex in SVG gradient | Replace with `var(--color-aurora-dawn)` or theme token `#F2A65A` |
| `features/marketing/components/Flow.tsx` | 75 | `<stop offset="66%" stopColor="#0ea5e9" />` | Hardcoded raw Tailwind sky hex in SVG gradient | Replace with `var(--color-aurora-sea)` or theme token `#5B9AA0` |
| `features/marketing/components/Flow.tsx` | 76 | `<stop offset="100%" stopColor="#ef4444" />` | Hardcoded raw Tailwind red hex in SVG gradient | Replace with `var(--color-aurora-blush)` or theme token `#E8A0A0` |
| `components/ui/scroll-expansion-hero.tsx` | 302, 310, 324, 330 | `text-blue-200` | Arbitrary Tailwind blue utility class | Replace with brand token `text-aurora-sea/90` or `text-white/90` |

---

## 3. Animation Library Duplication (`framer-motion` vs `motion`)

Per `Design.md` §47 and `TRD.md` §2, `motion` (`motion/react`) is the approved animation package. Importing directly from legacy `framer-motion` causes bundle bloat, duplicate runtime instances, and hook collisions.

The following **11 files** import directly from `framer-motion` and must be migrated to `motion/react` (or `motion`):

1. **`app/(auth)/signin/page.tsx`**  
   - Line 7: `import { motion } from "framer-motion"`
2. **`app/(auth)/signup/page.tsx`**  
   - Line 7: `import { motion } from "framer-motion"`
3. **`components/ui/scroll-expansion-hero.tsx`**  
   - Line 10: `import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';`
4. **`features/onboarding/components/OnboardingEnvironment.tsx`**  
   - Line 4: `import { motion, AnimatePresence } from "framer-motion";`
5. **`features/onboarding/components/steps/AvatarStep.tsx`**  
   - Line 2: `import { motion, AnimatePresence } from "framer-motion";`
6. **`features/onboarding/components/steps/ConcernStep.tsx`**  
   - Line 2: `import { motion } from "framer-motion";`
7. **`features/onboarding/components/steps/MoodStep.tsx`**  
   - Line 2: `import { motion } from "framer-motion";`
8. **`features/onboarding/components/steps/NovaWelcomeStep.tsx`**  
   - Line 4: `import { motion, AnimatePresence } from "framer-motion";`
9. **`features/onboarding/components/steps/StepContainer.tsx`**  
   - Line 1: `import { motion } from "framer-motion";`
10. **`features/onboarding/components/steps/WelcomeStep.tsx`**  
    - Line 4: `import { motion } from "framer-motion";`
11. **`features/peer-support/components/chat-interface.tsx`**  
    - Line 11: `import { motion, AnimatePresence } from "framer-motion";`

---

## 4. Copy Tone & Product Positioning Divergence

Per `Design.md` §1–2 and `PRD.md` §1, Teens Helpline is "The Quiet Room," speaking in the steady, non-judgmental voice of a supportive older sibling. Technical jargon, AI agent deployment tropes, and engineering shorthand contradict this tone.

| File | Line(s) | Current Copy | Tone Issue | Recommended Copy |
|---|---|---|---|---|
| `features/marketing/components/FeaturesGrid.tsx` | 104 | `"Plug-and-play agents ready to deploy."` | Developer/enterprise SaaS jargon; dehumanizes a teen mental health interface | Replace with teen-centered copy, e.g. `"Support that meets you where you are."` or `"Tools designed to help you breathe and regroup."` |
| `features/marketing/components/FeaturesGrid.tsx` | 107 | `"No cluttered stubs. We build what is genuinely helpful to get you to your next right step. Every feature is tested, secure, and ready."` | References developer concepts ("stubs", "tested", "deploy") | Replace with empathetic, benefit-driven copy, e.g. `"Private, gentle, and always at your own pace. Everything here is built to guide you to your next right step safely."` |
