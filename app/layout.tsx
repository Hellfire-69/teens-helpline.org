/**
 * Root layout — wires next/font, globals.css, and the base shell.
 *
 * Fonts: Inter (UI) + Fraunces (emotional moments) both self-hosted via
 * next/font per TRD §19 — no render-blocking third-party font requests.
 * Design.md §10: Fraunces is used at low frequency by design (onboarding
 * headline, Nova name, milestone text). Inter is the workhorse.
 */
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  // Optical sizing variant — Design.md §10 notes Fraunces is optical-size-aware
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "TeensHelpline — You're Not Alone",
    template: "%s | TeensHelpline",
  },
  description:
    "A safe space for teens to talk, reflect, and find support. Chat with Nova, explore resources, or connect with peers — anonymously or with an account.",
  keywords: ["teen mental health", "youth support", "anonymous chat", "peer support"],
  robots: {
    index: false, // Do not index the prototype — production decision revisited at launch
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
