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
