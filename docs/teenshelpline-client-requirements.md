# TeensHelpline.org — Client Requirement Document (v2)
*Client brief following TalentGro Global's mandatory question bank and requirement analysis format. See "Prototype Assumptions" for everything simulated for the 8-day student build.*

**Version History**
- v1 — initial client brief (Nova concept, India crisis resources, requirement analysis table)
- v2 — incorporated architecture review (8.8/10): MVP/Phase 2 split, success metrics, data model, user flows, NFRs, stakeholders, out-of-scope, content workflow, prototype assumptions consolidated, signoff section

---

## 1. Stakeholders

| Role | Who | Interest |
|---|---|---|
| Client (simulated) | Claude, acting as client | Defines requirements, approves scope |
| Dev lead | User (this team member) | Owns Next.js/Supabase build, chatbot, DB |
| UI/UX lead | Teammate(s) | Owns design system, wireframes, visual polish |
| TL / reviewer | TBD after team meeting | Coordination, TalentGro liaison |
| Evaluator | TalentGro Global | Grades against blueprint + quality rules |
| End user (represented, not real) | Indian teen, 13–19 | Primary audience — never contacted directly; represented via personas/assumptions only |

## 2. Organizational Structure

- Positioned as an independent non-profit initiative. [Prototype — see Section 14]
- Mission: give Indian teenagers a safe, relatable, judgment-free first point of contact for emotional and behavioural struggles, always routing serious concerns to real humans.
- Age group: 13–19. Location: India-first.
- Free, non-clinical, referral-based — does not replace therapy or medical care.

## 3. Scope of Support

- Covers: academic stress, bullying, family/friendship conflict, behavioural struggles, relationship concerns, identity/confidence issues.
- Substance use and self-harm/suicidal ideation: acknowledged, **always escalated**, never handled by chatbot or peer support alone.
- Out of scope for the product: diagnosis, treatment plans, medical/psychiatric advice.

## 4. Out of Scope (This Build)

- Real clinical service delivery, real counsellor onboarding/verification, real parental-consent legal workflow.
- Payment/billing (service is free).
- Native mobile apps (web, mobile-responsive only).
- Multilingual beyond English + optional Hindi.
- Any AI handling of live crisis conversations (hard rule, not a scope-timing issue — this never becomes in-scope).

## 5. MVP vs. Phase 2

**MVP (required for submission)**
- Nova chatbot — one default persona, elder-sibling tone
- Mood/emotion check-in (single snapshot per session; no historical trend view)
- Rule-based escalation: any high-risk signal → India crisis banner + "talk to a real person" prompt
- Persistent crisis banner (all pages): CHILDLINE, TeleMANAS, KIRAN, Vandrevala, iCALL
- Dedicated, moderated peer-support route (separate from Nova)
- Game-style/choice-based navigation for self-help content discovery and onboarding
- Quick-exit button (all pages)
- Supabase auth (email confirm off, documented) + basic age gate
- Core pages per sitemap (Home, Get Help, Self-Help, Peer Support, Parents, Schools, About, Safety, FAQ, Contact, required policy pages)

**Phase 2 (post-submission / stretch, only if MVP is solid and time remains)**
- Multiple selectable Nova personas
- Mood **history**/trend view over time
- Advanced engagement layer (richer branching "choose your path" content, more visual polish)
- Hindi localization
- Analytics dashboard for content/engagement (privacy-respecting)
- Real deployment-grade auth (email confirmation on) once a real domain is in play

## 6. Success Metrics

- Page load: **< 3 seconds** on average mobile connection
- Lighthouse score: **> 90** (performance, accessibility, best practices)
- **Mobile-first**, fully responsive across common breakpoints
- **WCAG AA** accessibility compliance
- Crisis banner: **visible on every single page**, no exceptions
- All required pages from sitemap present and linked from navigation

## 7. Professional Support [Prototype]

- Represented in content as available via chat/video, with simulated operating hours.
- Confidentiality limits stated in plain teen-friendly language.
- Parent notification in high-risk situations reflected as policy text only, not a working notification system.

## 8. Peer Support — Dedicated Route

- Separate, clearly labeled section, distinct from Nova and professional support.
- Peer supporters (represented as trained teen volunteers): listening/experience-sharing only — no advice on self-harm, medication, or crisis situations, which hard-route to escalation.
- Conversations shown as moderated; reporting/escalation path visible on every peer screen.

## 9. Crisis Escalation — India-specific

| Service | Number | Notes |
|---|---|---|
| CHILDLINE (child/teen emergency) | **1098** | Free, 24×7 |
| TeleMANAS (Govt. tele-mental-health) | **14416** / 1-800-891-4416 | Multilingual, 24×7 |
| KIRAN (Govt. mental health helpline) | **1800-599-0019** | 24×7 |
| Vandrevala Foundation | **1860-266-2345** / 9999-666-555 | 24×7, chat/call |
| iCALL (youth-focused) | **9152987821** | Mon–Sat, professional counsellors |

- Persistent "I need help now" banner on every page.
- Nova recommends one of the above the moment risk signals appear; Nova never attempts to handle crisis content itself.

## 10. Parent & Guardian Consent [Prototype]

- Anonymous browsing and self-help: no consent/login required.
- Peer support and Nova chat: lightweight sign-up, no real parental consent flow at prototype stage (flagged as a production next-step, not simulated as complete).
- Professional booking (simulated): would require guardian consent in production.

## 11. User Privacy & Auth

- Aliases allowed — no real names required.
- Supabase auth, email confirmation intentionally off for prototype (single toggle to re-enable at real-domain stage — documented decision, not an oversight).
- No chat content sold or shared with third parties.
- Clear data policy: what's stored, retention, deletion requests.

## 12. Website Experience — Nova & Engagement

**Nova** — elder-sibling-tone mascot. MVP ships one default persona; **persona switching is Phase 2** (kept in the vision, scoped for time).

- Nova's job: listen, reflect feelings, do a single-session mood check-in, guide to the right resource. Nova does **not** manage crisis conversations — any risk signal surfaces the India helpline block and a "talk to a real person" prompt, warmly.
- **Game-style visual navigation**: choice/route-based exploration for engagement and content discovery (self-help topics, grounding techniques, meeting Nova) — never for scoring or "beating" a low mood.
- Design: warm, illustrated, teen-relatable — not clinical, not childish, not gamified in a way that trivializes real distress.

## 13. Content Governance [Prototype]

- All copy reviewed for tone/safety before publishing (represented as "reviewed by our advisory panel").
- Content warnings on sensitive topic pages.
- No public user comments; no real teen stories published — fictional/composite examples only.
- **Content ownership**: dev lead owns technical copy (error states, system messages); UI/UX lead owns tone/tone-of-voice content; both sign off before any sensitive-topic page ships.

## 14. Prototype Assumptions

Everything below is simulated for the 8-day student build and would require real institutional work before any public launch:
- Organization identity, legal entity, advisory board, partner NGOs, named professionals/credentials — all placeholders, not fabricated as real.
- Parental consent workflow — policy text only, not a functioning legal flow.
- Professional booking/availability — simulated, not connected to real counsellors.
- Safeguarding/grievance officer roles — named placeholders in content.

## 15. Data Model (high-level)

- **Users** — id, alias, age-band, persona/preferences, created_at
- **Mood Entries** — id, user_id, mood_value, note (optional), created_at
- **Peer Sessions** — id, user_id (or anon token), status, moderator_flag, created_at
- **Counsellor Bookings** [Prototype] — id, user_id, simulated slot, status
- **Reports** — id, reporter_id, target_type, reason, status, created_at
- **Resources** — id, category, title, content, content_warning_flag

## 16. User Flows (to be wireframed)

1. **Distressed teen** — lands on Home → sees crisis banner → chooses Get Help → Nova or direct crisis line
2. **Anonymous visitor** — browses self-help content with zero sign-up, quick-exit available throughout
3. **Parent** — lands on For Parents → guidance content → no login required
4. **School/educator** — lands on For Schools → resource pages, no login required
5. **Crisis escalation** — any entry point (Nova, peer chat, self-help page) → risk signal detected → immediate crisis banner + helpline prompt, logged as an escalation event

## 17. Non-Functional Requirements

- **Performance** — see Success Metrics (load time, Lighthouse)
- **Security** — Supabase RLS policies on all tables; no PII exposed client-side beyond alias
- **Availability** — Vercel deployment, no formal SLA at prototype stage
- **Accessibility** — WCAG AA, keyboard navigable, screen-reader-friendly crisis banner
- **Privacy** — no third-party trackers on sensitive pages; if analytics are added, privacy-friendly/aggregate only (no session replay, no ad pixels)

## 18. Analytics & Privacy Statement

If usage analytics are added (Phase 2), they will be aggregate and privacy-respecting only — no individual chat content, no ad-tracking pixels, no third-party data sale. Purpose limited to understanding which self-help content is used, to improve the product.

## 19. Assumptions & Constraints

- 8-day build window, 3-person team (1 dev, 1–2 UI/UX).
- No real backend integrations to actual helplines (numbers are displayed, not dialed programmatically).
- Requirement approval (this document) must be signed off before wireframes/design begin, per TalentGro's mandatory sequence.
- Team hasn't yet held its kickoff meeting at time of this draft — treat as a working draft into that meeting, not final.

## 20. Legal Requirements

Privacy policy, consent policy, safeguarding policy, community guidelines, complaints/grievance policy, terms of use, service disclaimer — all present even at prototype stage, clearly marked where simulated.

## 21. Technology

Next.js (latest, TypeScript) + Vercel deployment + Supabase (DB + Auth, email confirm deferred, RLS enforced). MCPs: Supabase MCP (core), GitHub MCP (team collaboration), Context7 (docs accuracy); Playwright MCP optional once pages exist.

## 22. SEO

Teen emotional support India, teen bullying support India, academic stress help for students, youth peer support programme — factual, informational terms only, no clickbait.

## 23. Risks

- Design failure repeat (last attempt scored 1/5) — mitigated by dedicated UI/UX owner and MVP/Phase 2 split preventing scope creep.
- Over-reliance on Nova as emotional substitute — mitigated by hard escalation rules (Section 12).
- Gamification of sensitive content — mitigated by confining game mechanics to engagement/discovery only.
- 8-day timeline — mitigated by MVP/Phase 2 split and requirement-then-design-then-dev gating.

## 24. Recommendation

Proceed to competitor analysis, personas, and wireframes with the MVP scope above. Treat Phase 2 items as stretch goals only once MVP is functional and design-approved. Keep the India crisis-resource block persistent and prominent throughout.

---

## Approval / Signoff

| Role | Name | Approved (Y/N) | Date |
|---|---|---|---|
| Dev Lead | | | |
| UI/UX Lead | | | |
| Team Lead / Reviewer | | | |

*Design and development work begins only after this document is signed off, per TalentGro's mandatory sequence.*
