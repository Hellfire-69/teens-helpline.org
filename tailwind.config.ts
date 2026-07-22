import type { Config } from "tailwindcss";

// Design tokens from Design.md §5 (color), §10 (type), §12 (spacing), §13 (radius), §15 (shadow)
// These are the canonical values — never hardcode hex/px/ms in component code.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./features/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ─── Colors — Design.md §5.1 Core Palette ────────────────────────────────
      colors: {
        aurora: {
          dusk: "#6B5B95", // Primary brand — twilight violet, calm authority
          dawn: "#F2A65A", // Warm accent — hope, encouragement, small wins
          sea: "#5B9AA0", // Secondary — trust, steadiness, Nova's core hue
          blush: "#E8A0A0", // Soft accent — peer support, warmth, human connection
        },
        ink: {
          "900": "#1C1B29", // Near-black text, warm-tinted, never pure black
          "600": "#4A4863", // Secondary text
          "300": "#8B89A3", // Tertiary text / placeholders
        },
        paper: {
          "50": "#FAF9FC", // Base light background, warm-white
          "100": "#F2F0F8", // Elevated surface light
        },
        night: {
          "950": "#0F0E17", // Base dark background
          "900": "#17161F", // Elevated surface dark
        },
        signal: {
          crisis: "#E8654F", // Crisis banner — warm coral-red, never pure alarm red
          safe: "#6FBF9E", // Confirmation, success, "you're okay" moments
          caution: "#F2C169", // Gentle caution, non-urgent notices
        },
      },

      // ─── Typography — Design.md §10.1 Type Scale ─────────────────────────────
      // Fluid sizes expressed as clamp() values; line-heights from the spec table.
      // Font families are wired to CSS vars set by next/font in app/layout.tsx.
      fontFamily: {
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        // [size, { lineHeight, fontWeight }] — matches Design.md §10.1 exactly
        "type-display": [
          "clamp(2rem, 5vw, 3rem)", // 32px → 48px
          { lineHeight: "1.1", fontWeight: "600" },
        ],
        "type-title-xl": [
          "clamp(1.625rem, 3vw, 2.125rem)", // 26px → 34px
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        "type-title-lg": [
          "clamp(1.3125rem, 2.5vw, 1.625rem)", // 21px → 26px
          { lineHeight: "1.25", fontWeight: "600" },
        ],
        "type-title-md": [
          "clamp(1.0625rem, 1.5vw, 1.1875rem)", // 17px → 19px
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        "type-body-lg": [
          "clamp(1rem, 1.2vw, 1.0625rem)", // 16px → 17px
          { lineHeight: "1.55", fontWeight: "400" },
        ],
        "type-body-md": [
          "clamp(0.875rem, 1vw, 0.9375rem)", // 14px → 15px
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "type-body-sm": [
          "clamp(0.75rem, 0.9vw, 0.8125rem)", // 12px → 13px
          { lineHeight: "1.45", fontWeight: "400" },
        ],
        "type-label": [
          "clamp(0.75rem, 0.9vw, 0.8125rem)", // 12px → 13px
          { lineHeight: "1.2", fontWeight: "600" },
        ],
      },

      // ─── Spacing — Design.md §12 (8px base unit scale) ───────────────────────
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-8": "32px",
        "space-10": "40px",
        "space-12": "48px",
        "space-16": "64px",
      },

      // ─── Border Radius — Design.md §13 ───────────────────────────────────────
      borderRadius: {
        "radius-sm": "8px", // Inputs, small buttons, tags
        "radius-md": "14px", // Standard cards
        "radius-lg": "20px", // Modals, prominent cards, the crisis banner
        "radius-xl": "28px", // Onboarding cards, Nova's chat bubble container
        "radius-full": "999px", // Pills, avatars, quick-exit button
      },

      // ─── Box Shadow — Design.md §15 ──────────────────────────────────────────
      // All shadows are warm-tinted (#1C1B29 = ink.900), never pure black.
      boxShadow: {
        sm: "0 1px 2px rgba(28,27,41,0.06), 0 1px 1px rgba(28,27,41,0.04)",
        md: "0 4px 12px rgba(28,27,41,0.08), 0 2px 4px rgba(28,27,41,0.04)",
        lg: "0 12px 32px rgba(28,27,41,0.12), 0 4px 8px rgba(28,27,41,0.06)",
        // Glow shadows — reserved exclusively for Nova (sea) and crisis banner
        "glow-sea": "0 0 24px rgba(91,154,160,0.35)",
        "glow-blush": "0 0 24px rgba(232,160,160,0.35)",
        "glow-dusk": "0 0 24px rgba(107,91,149,0.35)",
        "glow-dawn": "0 0 24px rgba(242,166,90,0.35)",
        "glow-crisis": "0 0 32px rgba(232,101,79,0.4)",
      },

      // ─── Animation Durations — Design.md §22 ─────────────────────────────────
      transitionDuration: {
        instant: "100ms",
        fast: "180ms",
        base: "280ms",
        slow: "400ms",
      },

      // ─── Keyframes — Landing Page Redesign Phase 1A ───────────────────────────
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(2%, -1%) rotate(0.5deg)" },
          "50%": { transform: "translate(-1%, 2%) rotate(-0.5deg)" },
          "75%": { transform: "translate(1%, 1%) rotate(0.3deg)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        drift: "drift 20s ease-in-out infinite",
      },

      // ─── Max Width — Nova chat canvas (Design.md §11, §29) ───────────────────
      maxWidth: {
        "chat-canvas": "720px",
        "content": "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
