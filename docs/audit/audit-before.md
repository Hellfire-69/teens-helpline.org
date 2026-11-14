# Modern Web Guidance Audit (Baseline — Before)

**Date:** 2026-11-14T15:35:00Z  
**Target Repository:** `D:\Project\TeensHelpline-Final-Project\teenshelpline-org`  
**Branch:** `chore/repo-hygiene` (baseline audit)  
**Tool:** Modern Web Guidance Analyzer (`modern-web-guidance@1.0.0` via `npx modern-web-guidance legacy-scan`)  
**Scope:** Deterministic legacy-pattern static scan across 33 guides (35 active deterministic rules, representing ~20% of the Modern Web Guidance corpus). 13 documentation and test files were skipped per standard scan policy.

---

## Executive Summary

- **Total Modernization Opportunities Found:** 6
- **Guides Triggered:** 4
- **Active Rules Checked:** 35 deterministic rules across 33 guides
- **Status:** All 6 findings verified against their Keep/Drop criteria as genuine modernization opportunities.

| # | Guide ID | Severity | Findings Count | Primary Affected Areas |
|---|----------|----------|----------------|------------------------|
| 1 | `autofill-sign-in-form` | Medium | 1 | Sign-in password input (`app/(auth)/signin/page.tsx`) |
| 2 | `autofill-sign-up-form` | Medium | 2 | Registration password & confirm inputs (`app/(auth)/signup/page.tsx`) |
| 3 | `dark-mode` | Low | 1 | CSS module theme overrides (`app/page.module.css`) |
| 4 | `ime-safe-enter-submit` | High (UX/i18n) | 2 | Nova chat composer & Peer Support chat input |

---

## Detailed Findings

### 1. `autofill-sign-in-form` (1 finding)

- **Rule Summary:** Password inputs in sign-in or credential forms should specify `autocomplete="current-password"` to enable browser password managers to suggest and fill credentials accurately.
- **Affected Location:** `app/(auth)/signin/page.tsx:242`
- **Code Snippet:**
  ```tsx
  <input
    type="password"
    required
    placeholder="Password (min 6 chars)"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
    suppressHydrationWarning
  />
  ```
- **Verifier Rubric:**
  - *Keep when:* The password input is part of a user-facing authentication/sign-in form and lacks an `autocomplete` attribute.
  - *Drop when:* The input already provides `autocomplete="current-password"`, is disabled/readonly/hidden, or is a new-password form.
  - *Verdict:* **KEEP** — Valid sign-in credential input lacking autofill hints.
- **Guidance & Remediation:**
  - Add `autocomplete="current-password"` to the password input (`id="password"`, `name="password"`).
  - Also recommend adding `autocomplete="username"` and `type="email"` to the preceding email input at line 231 to form a complete autofill credential pair.

---

### 2. `autofill-sign-up-form` (2 findings)

- **Rule Summary:** Password inputs in sign-up and account registration forms should specify `autocomplete="new-password"` to prevent browsers and password managers from autofilling existing credentials and instead offer strong password generation.
- **Affected Locations:**
  1. `app/(auth)/signup/page.tsx:177`
  2. `app/(auth)/signup/page.tsx:187`
- **Code Snippets:**
  ```tsx
  // Line 177:
  <input
    type="password"
    required
    placeholder="Password (min 6 chars)"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
  />

  // Line 187:
  <input
    type="password"
    required
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full h-12 border border-ink-300/30 dark:border-white/10 rounded-xl px-4 bg-transparent text-ink-900 dark:text-white focus:border-aurora-sea focus:ring-1 focus:ring-aurora-sea outline-none transition-all placeholder:text-ink-400"
  />
  ```
- **Verifier Rubric:**
  - *Keep when:* Password input creates or confirms a new account password in a user registration form and lacks `autocomplete="new-password"`.
  - *Drop when:* Input already provides `autocomplete="new-password"` or belongs to a sign-in form.
  - *Verdict:* **KEEP** — Both fields are part of the teen registration flow and lack autofill/generator attributes.
- **Guidance & Remediation:**
  - Add `autocomplete="new-password"` to both inputs (`id="new-password"` and `id="confirm-password"`).
  - Add `autocomplete="username"` to the registration email input at line 169.

---

### 3. `dark-mode` (1 finding)

- **Rule Summary:** Stylesheets overriding theme colors inside `@media (prefers-color-scheme: dark)` without declaring `color-scheme` should declare `color-scheme: light dark` on `:root`/`html` or adopt `light-dark()` CSS color functions.
- **Affected Location:** `app/page.module.css:131`
- **Code Snippet:**
  ```css
  @media (prefers-color-scheme: dark) {
    .logo {
      filter: invert();
    }

    .page {
      --background: #000;
      --foreground: #000;

      --text-primary: #ededed;
      --text-secondary: #999;

      --button-primary-hover: #ccc;
      --button-secondary-hover: #1a1a1a;
      --button-secondary-border: #1a1a1a;
    }
  }
  ```
- **Verifier Rubric:**
  - *Keep when:* CSS rules duplicate theme properties inside `@media (prefers-color-scheme: dark)` without declaring `color-scheme: light dark` or using `light-dark()`.
  - *Drop when:* Stylesheet declares `color-scheme: light dark` on root/container or uses `light-dark()`.
  - *Verdict:* **KEEP** — `app/page.module.css` is an unmigrated boilerplate CSS module with hardcoded dark overrides.
- **Guidance & Remediation:**
  - Declare `color-scheme: light dark;` on `:root` or container.
  - Modernize CSS variables using modern CSS `light-dark(lightColor, darkColor)` or migrate this page to the unified Tailwind theme tokens defined in `Design.md`.

---

### 4. `ime-safe-enter-submit` (2 findings)

- **Rule Summary:** Keydown event listeners on inputs or textareas intercepting `Enter` (`event.key === "Enter"`) to trigger submission without checking `event.isComposing` or `event.keyCode === 229` prematurely submit mid-composition during Input Method Editor (IME) usage in CJK languages (Japanese, Chinese, Korean, etc.).
- **Affected Locations:**
  1. `features/nova/components/chat-composer.tsx:34`
  2. `features/peer-support/components/chat-input.tsx:41`
- **Code Snippets:**
  ```tsx
  // features/nova/components/chat-composer.tsx:33-38:
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // features/peer-support/components/chat-input.tsx:40-45:
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  ```
- **Verifier Rubric:**
  - *Keep when:* Keydown listeners on textarea or input intercept `Enter` to submit without checking `event.isComposing` or `event.keyCode === 229`.
  - *Drop when:* Keyup listeners, handlers checking `event.isComposing`, or modifier-gated combinations (e.g. `Ctrl+Enter`).
  - *Verdict:* **KEEP** — Critical usability defect for teens using multilingual or IME keyboards; pressing Enter to select a candidate word immediately sends the incomplete turn.
- **Guidance & Remediation:**
  - In React, check `e.nativeEvent.isComposing || e.keyCode === 229`:
    ```tsx
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        if (e.nativeEvent.isComposing || e.keyCode === 229) {
          return;
        }
        e.preventDefault();
        handleSubmit();
      }
    };
    ```

---

## Raw Scan Artifacts

```json
{
  "targetDir": "D:\\Project\\TeensHelpline-Final-Project\\teenshelpline-org",
  "totalFindings": 6,
  "activeRuleCount": 35,
  "activeGuideCount": 33,
  "skippedDocsAndTestsCount": 13,
  "breakdownByGuide": {
    "autofill-sign-in-form": 1,
    "autofill-sign-up-form": 2,
    "dark-mode": 1,
    "ime-safe-enter-submit": 2
  }
}
```
