# Baseline Audit: Mobile Lighthouse & Core Web Vitals (Before)

**Date:** 2026-11-14  
**Project:** Teens Helpline (`teenshelpline-org`)  
**Auditor:** Explorer 2 (Teamwork Baseline Audit Subagent)  
**Environment:** Next.js 16.2.10 (Turbopack / Webpack), Node.js, Windows 11 (AppContainer Sandbox)

---

## 1. Route Discovery & Page Mapping

Route discovery inspected `app/(public)` and related route groups in `D:\Project\TeensHelpline-Final-Project\teenshelpline-org\app`.  
Cross-referenced against navigation mappings in `features/marketing/components/Navbar.tsx`:

| Target Page | Discovered App Router Route | Local URL | Navigation Label / Location |
|---|---|---|---|
| **Home** | `app/(public)/page.tsx` | `http://localhost:3000/` | `Home` (Navbar root) |
| **About** | `app/(public)/about/page.tsx` | `http://localhost:3000/about` | `About` (Navbar link) |
| **Help** | `app/(public)/get-help/page.tsx` | `http://localhost:3000/get-help` | `Help` (Navbar link) & "I Need Help Now" (Crisis CTA) |
| **For Parents** | `app/(public)/parents/page.tsx` | `http://localhost:3000/parents` | `For Parents` (Navbar dropdown link) |
| **For Schools** | `app/(public)/schools/page.tsx` | `http://localhost:3000/schools` | `For Schools` (Navbar dropdown link) |

*Note: No `/help` directory exists in `app/(public)`; the designated Help route is `/get-help`.*

---

## 2. Server & Environment Baseline Findings

1. **Port Connectivity Check:**
   - Command: `Test-NetConnection -ComputerName localhost -Port 3000`
   - Output: `TcpTestSucceeded: False` (No active server on port 3000 at start).

2. **Server Execution & Mandatory Integrity Control (MIC) Boundary:**
   - Attempted start: `npm run dev` (`next dev --turbopack`) on `D:\Project\TeensHelpline-Final-Project\teenshelpline-org`.
   - Result: Next.js reached readiness (`Ready in 14.5s`) but terminated immediately on lockfile acquisition:
     ```
     Error: An IO error occurred while attempting to create and acquire the lockfile
     [cause]: Error: Access is denied. (os error 5)
     ```
   - Technical Root Cause: The agent CLI process executes with Windows `Mandatory Label\Low Mandatory Level` (`S-1-16-4096`). Filesystem volumes on Drive `D:` do not possess a Low Mandatory Level SACL ace, rendering write operations (specifically Next.js 16's default `experimental.lockDistDir` acquiring `.next/dev/lock`) blocked by Windows MIC (`os error 5`).

3. **Chrome DevTools MCP Permission Boundary:**
   - Page listing tool `chrome-devtools-mcp/list_pages` successfully connected to active browser (Target ID 2: `about:blank`).
   - Execution of browser navigation (`chrome-devtools-mcp/navigate_page` to `http://localhost:3000`) and un-sandboxed process elevation (`BypassSandbox: true`) triggered interactive user permission prompts that timed out waiting for unattended user input after 60s:
     ```
     Permission check failed for mcp "chrome-devtools-mcp/navigate_page":
     Permission prompt for action 'mcp' on target 'chrome-devtools-mcp/navigate_page' timed out waiting for user response after 60s; the user did not respond, which is not an explicit denial. Do not attempt to circumvent this by rephrasing the command, using alternative tools/scripts, or accessing the same target resource.
     ```
   - In accordance with the project's Mandatory Integrity Warning and system prompt guidelines, no synthetic or fabricated scores were generated.

---

## 3. Lighthouse Score Summary Table

| Page | Route | Performance | Accessibility | Best Practices | SEO | LCP | INP | CLS | Audit Status |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **Home** | `/` | — | — | — | — | — | — | — | Blocked by MCP permission timeout |
| **About** | `/about` | — | — | — | — | — | — | — | Blocked by MCP permission timeout |
| **Help** | `/get-help` | — | — | — | — | — | — | — | Blocked by MCP permission timeout |
| **For Parents** | `/parents` | — | — | — | — | — | — | — | Blocked by MCP permission timeout |
| **For Schools** | `/schools` | — | — | — | — | — | — | — | Blocked by MCP permission timeout |

---

## 4. Screenshot Audit Status

Target directory: `docs/audit/screenshots/before/`
- `home-desktop.png` (1440px) / `home-mobile.png` (390px): Blocked by `navigate_page` permission prompt timeout.
- `about-desktop.png` (1440px) / `about-mobile.png` (390px): Blocked by `navigate_page` permission prompt timeout.
- `help-desktop.png` (1440px) / `help-mobile.png` (390px): Blocked by `navigate_page` permission prompt timeout.
- `parents-desktop.png` (1440px) / `parents-mobile.png` (390px): Blocked by `navigate_page` permission prompt timeout.
- `schools-desktop.png` (1440px) / `schools-mobile.png` (390px): Blocked by `navigate_page` permission prompt timeout.

---

## 5. Remediation & Unblocking Plan for Step 2 Verification

To execute live Lighthouse audits and automated screenshots in Step 2:
1. **Interactive MCP Approval:** Grant approval on the CLI prompt for `chrome-devtools-mcp` tools (`navigate_page`, `resize_page`, `take_screenshot`, `lighthouse_audit`).
2. **Drive D: MIC ACL:** Run `icacls "D:\Project\TeensHelpline-Final-Project\teenshelpline-org\.next" /setintegritylevel (OI)(CI)L` in an elevated terminal to permit Next.js lockfile creation under the sandboxed Low Mandatory Level environment.
