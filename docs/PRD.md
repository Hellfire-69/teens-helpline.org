# Product Requirements Document — TeensHelpline.org

**Version:** 2.0
**Status:** Draft — pending team kickoff and requirement sign-off per TalentGro's mandatory sequence
**Build window:** 8 days | **Team:** 1 Dev Lead, 1–2 UI/UX Leads
**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Supabase, Vercel

---

## Executive Summary

TeensHelpline.org is a privacy-first emotional-support platform where Indian teenagers (13–19) can safely begin their journey toward feeling better — not simply a chatbot, but an interactive, game-onboarding-style experience that reduces anxiety *before* a teen even asks for help. Nova, an elder-sibling-toned AI companion, offers warm first-contact support for everyday stress; a mood-driven personalization engine routes teens toward the right next step — articles, breathing exercises, peer support, or real professional help. The platform never replaces human care: any sign of real risk immediately and unconditionally routes to a persistent bank of Indian crisis helplines. This is an 8-day internship build. Several workflows — professional counselling booking, organisational identity, credential verification — are intentionally simulated for the prototype, and are clearly marked as such throughout this document.

## Vision

A teenager who is struggling should be able to open TeensHelpline.org and feel, within seconds, that this is a safe, friendly, modern space — closer to a thoughtfully designed app onboarding than a government form or a clinical intake. The experience should feel calm, hopeful, and a little bit delightful, without ever trivializing what the teen is going through. Whether someone just wants to vent about a bad day or is in real danger, the platform's job is to meet them warmly and get them, quickly and without friction, to the right kind of help — never pretending to be a substitute for a real counsellor or a real emergency service.

## Product Goals

1. Make the first few seconds on the platform feel safe, warm, and non-clinical — an onboarding, not a form.
2. Give every teen, anonymous or logged in, immediate access to Nova, mood-based guidance, and self-help content.
3. Turn mood check-ins into a personalization engine that quietly guides teens to the right resource, not just a static questionnaire.
4. Guarantee that any sign of real risk — anywhere in the product — routes instantly to real human crisis support.
5. Offer parents and schools their own clear, respectful entry points without accessing teen data.
6. Be transparent, throughout the product and this document, about what is real versus simulated at prototype stage.
7. Ship a mobile-first, accessible, fast, and emotionally considered product within the 8-day window.

## Success Metrics (KPIs)

| Metric | Target |
|---|---|
| Average mobile page load time | < 3 seconds |
| Lighthouse score (performance, accessibility, best practices) | > 90 |
| Accessibility compliance | WCAG AA |
| Crisis banner visibility | 100% of pages, no exceptions |
| Onboarding completion rate | Tracked as a qualitative success signal, not gated (users can skip onboarding steps) |
| Sitemap completeness | All required pages present and linked from navigation |
| Responsiveness | Fully functional across common mobile/tablet/desktop breakpoints |

---

## Scope

### MVP (required for submission)

- **Continue Anonymously / Continue with Google / Continue with Email** — three entry paths, anonymous-first
- **Role Selection** — Teen and Parent roles (Teacher/Educator, Counsellor, Administrator marked Coming Soon)
- **Interactive Onboarding** — welcome, optional avatar, role selection, mood, "what brought you here," Nova welcome
- **Teen Dashboard** and **Parent Dashboard**
- **Nova AI Assistant** — single default persona, elder-sibling tone, broadened support scope (see Nova AI section)
- **Mood Intelligence** — single-session mood capture that drives personalized recommendations
- Rule-based crisis escalation — any high-risk signal surfaces the India crisis banner and a "talk to a real person" prompt
- Persistent crisis banner on every page (CHILDLINE, TeleMANAS, KIRAN, Vandrevala, iCALL)
- Dedicated, moderated peer-support route, separate from Nova
- **Study Hub** — study techniques, exam prep, focus, productivity, career exploration, time management content, working with Nova recommendations
- **Basic Consultation** flow (quick guidance, no guardian approval required)
- Quick-exit button on every page
- Supabase auth with anonymous sessions and persistent (Google/Email) accounts
- Core pages: Home, Get Help, Study Hub, Peer Support, Parents, Schools, About, Safety, FAQ, Contact, and required policy pages

### Phase 2 (stretch — only after MVP is solid and design-approved)

- Counsellor Dashboard, Teacher/Educator Dashboard, Admin Dashboard (Coming Soon roles activated)
- **Professional Counselling Booking** flow activated (guardian approval, real availability)
- Multiple selectable Nova personas
- Mood **history** / analytics / trend view over time
- Hindi localization
- Community features
- Advanced AI personalization
- Privacy-respecting analytics dashboard for content/engagement
- Deployment-grade auth (email confirmation re-enabled) once a real domain is in use

### Out of Scope (this build, not just deferred)

- Real clinical service delivery, real counsellor onboarding/verification, real guardian-approval legal workflow
- Payment or billing (service is free)
- Native mobile apps (responsive web only)
- Multilingual support beyond English + optional Hindi (Phase 2)
- **Any AI handling of live crisis conversations — this is a hard rule, not a scope-timing issue. It never becomes in-scope.**

---

## Product Philosophy

Every product decision follows these eight principles:

1. **Privacy First** — anonymous users should never feel forced to reveal their identity.
2. **Human Before AI** — Nova helps; Nova never replaces professional support.
3. **Safety Before Engagement** — entertainment and game-like navigation must never delay a path to crisis support.
4. **Anonymous by Default** — users receive meaningful help without registration.
5. **Personalized When Logged In** — creating an account unlocks personalization; it never restricts access to core help.
6. **Mobile First** — the entire experience is optimized for phones before desktop.
7. **Accessibility First** — WCAG AA compliance across the product.
8. **Trust Through Transparency** — the platform clearly explains what data is, and isn't, stored, and clearly marks what is simulated at this build stage.

---

## User Types & Roles

| Role | Description | Status | Access Model |
|---|---|---|---|
| **Guest** | Any visitor before choosing anonymous or logged-in entry. | MVP | No login |
| **Teen** | Primary user, age 13–19, anonymous or logged in. | MVP | Anonymous session or persistent account |
| **Parent** | Seeks guidance on supporting a struggling teen. | MVP | Persistent account (Google/Email) |
| **Counsellor** *(simulated)* | Represented as offering booked sessions. | Coming Soon | Not onboarded in this build |
| **Teacher / Educator** | School staff supporting student wellbeing through resources, early-warning guidance, and referral pathways — never through access to a specific student's private data. | Coming Soon | Persistent account (Google/Email), school-verified in production |
| **Moderator** | Reviews peer-support reports and content. | Coming Soon | Restricted internal access |
| **Administrator** | Oversees content, escalation logs, platform health. | Coming Soon | Restricted internal access |

**A note on roles vs. services:** throughout this document, **Call Center** refers to a *service the platform may provide* (human follow-up on escalation events) — it is not, and never was intended to be, a user role someone selects at onboarding. **Teacher/Educator**, **Counsellor**, and **Administrator** are the platform's actual product/professional/platform roles. This distinction is kept consistent everywhere a role is discussed in this document.

## Problem Statement

Indian teenagers facing academic pressure, bullying, family conflict, or more serious emotional and behavioural struggles often lack a safe, immediately accessible, non-judgmental first point of contact. Existing options are frequently clinical, intimidating, slow to access, or require disclosure to a parent or school before any support is available. The intake experience itself — forms, disclaimers, clinical language — often adds anxiety rather than reducing it. Meanwhile, truly urgent situations — self-harm, suicidal ideation, substance misuse — need to reach real human help fast, not get stuck in a chatbot loop or a lengthy sign-up flow.

## Value Proposition

TeensHelpline.org meets teens where they are — anonymous, mobile, unwilling to explain themselves to an adult yet — with an entry experience that feels like a warm app onboarding rather than an intake form. It gives them Nova for everyday stress, a mood-driven engine that quietly points them to the right next step, a safe peer channel, and, the moment real risk appears, an unmissable path to real Indian crisis services. It does this without ever pretending to be a substitute for professional or emergency care, and without requiring identity disclosure to access help.

---

## Authentication & Entry Experience

Authentication is not a technical gate — it is the first product decision a teen makes, and it should feel like one that respects them.

### Continue Anonymously (Primary CTA)

The platform's strongest privacy feature. Anonymous users get:
- No personal information collected
- No chat history saved
- No mood history saved
- No saved recommendations
- A session-only experience — everything resets when the session ends
- Full access to Nova, Self-Help/Study Hub content, Resources, and Mood Check
- No ability to permanently save anything

This path exists so that a teen in a vulnerable moment never has to weigh "do I need help?" against "do I have to give up my privacy to get it?" The two are never in conflict on this platform.

### Continue with Google / Continue with Email

Both create a persistent account. Logged-in users receive:
- Saved conversations with Nova
- Mood history over time
- Saved resources
- Personalized recommendations
- Access to future personalization features (Phase 2)

**Why the difference exists:** persistence is offered as a reward for choosing to stay, never as a requirement to participate. A teen who isn't ready to create an account loses no meaningful help — only the convenience of the platform remembering them next time.

---

## Role Selection

After anonymous entry or login, the user chooses their role before reaching any dashboard:

```
Welcome
   ↓
Choose your role
   🧑 Teen
   👨 Parent
   ──────────────
   🚧 Coming Soon
   🧑‍🏫 Teacher / Educator
   👩‍⚕️ Counsellor
   🛡 Administrator
```

Teen and Parent are the only roles available at MVP. The remaining roles sit visually below a clear "Coming Soon" divider — part of the visible future roadmap, not abandoned or hidden functionality. This keeps the product honest about its current scope while signalling where it's headed. Teacher/Educator is grouped with the other Coming Soon roles here because it is a distinct **product role** (see the dedicated Teacher / Educator Role section below) — it is not to be confused with Basic Consultation, which is a platform *service*, not a role a person selects at onboarding.

---

## Interactive Onboarding

Onboarding is a core product feature, not a setup step to get through. It should feel emotionally supportive, calm, and a little bit like a well-designed app's first-run experience — never like a clinical intake form.

**Example flow:**

```
Welcome
   ↓
Choose Avatar (optional)
   ↓
Choose Role
   ↓
How are you feeling today?
   Happy · Okay · Sad · Overwhelmed · Anxious
   ↓
What brought you here?
   Academic Stress · Family · Friends · Career · Identity · Bullying · Anxiety (Emotional Overwhelm) · Behavioural Concerns · Just Exploring
   ↓
Nova welcomes the user
```

The onboarding experience includes smooth page transitions, light motion and micro-interactions, card-based selection, friendly illustration, and a light sense of progression — engaging without ever trivializing what the teen may be going through. Every step is skippable; onboarding personalizes the experience, it never gates access to help.

---

## Dashboards

| Dashboard | Status | Purpose |
|---|---|---|
| **Teen Dashboard** | MVP | Home base after onboarding — quick access to Nova, mood check-in, Study Hub, peer support, and the crisis banner. Reflects saved history only if logged in. |
| **Parent Dashboard** | MVP | Guidance content for supporting a struggling teen; explains confidentiality limits and when a parent would be informed in a genuine safety situation. No access to a specific teen's private data. |
| **Counsellor Dashboard** | Coming Soon | Would surface booking requests and availability management for onboarded professionals. |
| **Teacher / Educator Dashboard** | Coming Soon | Purely informational and resource-focused — never exposes student data. |
| **Admin Dashboard** | Coming Soon | Would surface content management, reported peer-support conversations, and escalation audit logs. |

---

## Teacher / Educator Role

Schools are one of TeensHelpline.org's three primary target audiences (alongside teenagers and parents), so Teacher/Educator is treated as a first-class product role — not a service the platform operates, and not a rebrand of a call-center function. It exists to help school staff support student wellbeing at the classroom and institutional level, without ever touching an individual teen's private information.

**Purpose:**
- Support students within schools
- Help educators recognize emotional wellbeing concerns
- Access educational resources
- Refer students to appropriate support
- Understand safeguarding guidance

**A Teacher/Educator must never be able to:**
- Read private teen conversations
- Access mood history
- Access Nova chat
- View confidential information
- Track individual students

**Instead, a Teacher/Educator accesses:**
- Educational guidance
- Classroom wellbeing resources
- Early warning signs
- Crisis response guidance
- Referral pathways
- School safeguarding resources
- Parent communication resources

### Teacher / Educator Dashboard *(Coming Soon)*

Purpose: give schools a single informational home for supporting students, containing:
- Mental wellbeing resources
- Classroom strategies
- Safeguarding guidance
- Referral information
- Crisis response procedures
- Downloadable resources
- Professional development materials

The dashboard is deliberately **informational and resource-focused, not administrative** — it never exposes student data, individual mood history, Nova conversations, or peer-support content, regardless of future permission expansion.

---

## Nova AI

Nova is an elder-sibling-toned companion, not a clinician. In the MVP, Nova supports:

- Academic stress and study planning
- Time management
- Career confusion
- Friend conflicts
- Family concerns
- Confidence and motivation
- Daily emotional support

**Nova must never:**
- Diagnose a condition
- Recommend or reference medication
- Present itself as a replacement for a therapist or counsellor
- Attempt to manage a crisis conversation

Whenever a serious risk signal is detected in conversation, Nova immediately and unconditionally routes the user to the crisis banner and a "talk to a real person" prompt — this is a hard rule with no exceptions, regardless of how the conversation started.

---

## Mood Intelligence

Mood is no longer a static questionnaire — it is the platform's personalization engine.

```
User selects mood
   ↓
Nova understands context (mood + "what brought you here" if available)
   ↓
Nova suggests:
   • Articles (Study Hub)
   • Study Hub tools
   • Breathing exercise
   • Journal
   • Peer support
   • Professional help
   ↓
If risk signal is high:
   → Immediate Human Escalation (crisis banner, no AI mediation)
```

At MVP, mood is captured once per session with no historical view. Mood **history** and trend analytics are Phase 2.

---

## Chat Memory & Data Retention

| State | Nova Conversation | Mood | Recommendations | Saved Resources |
|---|---|---|---|---|
| **Anonymous** | Session-only, no storage, no history | Session-only, no storage | Not saved | Not saved |
| **Logged In** | Conversation history retained | Mood history retained (Phase 2 for trend view) | Personalized recommendations retained | Saved for later access |

This design exists so that privacy is never a trade-off for help: an anonymous teen loses no functional support, only the convenience of the platform remembering them across sessions.

---

## Consultation Flow

Two distinct paths, clearly separated so a teen never has to commit more than they're ready for:

### Basic Consultation
Quick guidance, available without an account and without guardian approval. This is the natural extension of a Nova or mood-driven recommendation for a teen who wants a bit more than self-help content but isn't ready for formal booking.

**Basic Consultation is a platform service, not a user role.** No one "signs up" as a Basic Consultation provider the way a Teen or Parent selects a role at onboarding. If implemented in a future phase, consultations would be handled by trained professionals or counsellors — never by Teachers/Educators, whose role is deliberately scoped to informational and referral support, not direct consultation delivery.

### Professional Counselling Booking *(simulated)*
Requires:
- A persistent account
- Guardian approval
- A booking request
- Professional availability

**This entire booking workflow is simulated for the internship prototype** — there is no real onboarded counsellor, no real guardian-approval legal process, and no real scheduling backend behind it. It exists to demonstrate the intended production flow, not to deliver it.

---

## Study Hub

The Study Hub replaces a generic resource library with content that works hand-in-hand with Nova's recommendations. It includes:

- Study techniques and exam preparation
- Focus and productivity guidance
- Academic stress content
- Career exploration
- Emotional overwhelm and anxiety
- Family and friendship conflicts
- Bullying and behavioural concerns
- Confidence and identity
- Blogs and videos
- Helpful tools

Nova surfaces relevant Study Hub content directly based on a user's mood and stated concern, rather than requiring the user to browse for it manually.

---

## User Stories

### Teen
- As a Teen, I want to continue anonymously with no personal information required, so that I can get help without feeling exposed.
- As a Teen, I want a warm, game-like onboarding instead of a form, so that starting doesn't feel intimidating or clinical.
- As a Teen, I want a visible "I need help now" option on every page, so that I can reach real crisis support the moment I need it.
- As a Teen, I want to talk to Nova about everyday stress, school, or friendships, so that I feel heard before deciding what to do next.
- As a Teen, I want my mood check-in to actually shape what I see next, so that the platform feels responsive rather than generic.
- As a Teen, I want a quick-exit button always available, so that I can instantly leave the site if someone walks in on me.
- As a Teen, I want to explore Study Hub content that Nova points me toward, so that I don't have to search for what I need myself.
- As a Teen, I want to connect with a peer supporter anonymously, so that I can talk to someone closer to my age without judgment.
- As a Teen, I want to know exactly what stays private and what doesn't, so that I can trust the platform before I open up.
- As a Teen, I want to create an account only if I choose to, so that saving my history is a benefit, never a requirement.

### Parent
- As a Parent, I want my own dashboard with guidance content, so that I know how to support my teen without invading their privacy.
- As a Parent, I want to understand confidentiality limits clearly, so that I know when I'd be informed in a genuine safety situation.

### Anonymous User
- As an Anonymous User, I want full access to Nova, mood check-in, and Study Hub, so that not creating an account never means getting less help.

### Peer Support Volunteer
- As a Peer Support Volunteer, I want clear boundaries on what I can and cannot say, so that I never find myself handling a crisis situation alone.

### Administrator *(Coming Soon)*
- As an Administrator, I want to see reported peer-support conversations and escalation logs, so that I can moderate and review safety incidents once this role is active.

---

## Functional Requirements (Supporting Modules)

*(Authentication, Onboarding, Nova, Mood Intelligence, Study Hub, Dashboards, and Consultation Flow are fully specified in their dedicated sections above. This section covers remaining supporting modules.)*

### Peer Support
- Separate, clearly labeled section distinct from Nova and professional support.
- Peer supporters restricted to listening/experience-sharing; no advice on self-harm, medication, or crisis topics — such topics hard-route to escalation.
- All conversations represented as moderated; report/escalate option visible on every peer screen.

### Crisis Escalation
- Persistent, always-visible "I need help now" banner listing CHILDLINE (1098), TeleMANAS (14416 / 1-800-891-4416), KIRAN (1800-599-0019), Vandrevala Foundation (1860-266-2345 / 9999-666-555), and iCALL (9152987821).
- Any risk signal from Nova, mood intelligence, peer chat, or content pages triggers the banner and prompt, logged as an escalation event.
- No AI-generated content is ever used to handle the escalation moment itself.

### Parents Section
- Public guidance content on supporting a struggling teen; folds into the Parent Dashboard experience.

### Schools Section
- Resource content for educators and school counsellors; no login required.

### Search
- Basic keyword search across Study Hub and resource content (MVP scope).

### Profile
- Minimal profile for logged-in users: display name/alias, avatar, role, saved preferences.

### Settings
- Account and session settings; data deletion request option for logged-in users.

### Content Management
- Internal workflow for reviewing and publishing Nova guidance content and Study Hub content (dev lead owns technical copy, UI/UX lead owns tone-of-voice content, both sign off on sensitive-topic pages).

### Reporting
- User-facing report flow for peer-support interactions or content concerns.

### Moderation
- Peer-support conversations represented as moderated; escalation path from moderation to crisis banner.

### Analytics
- Not in MVP. Phase 2: aggregate, privacy-respecting only — no individual chat content, no third-party trackers, no ad pixels.

---

## Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | < 3s average load on mobile connections |
| **Accessibility** | WCAG AA compliance; keyboard navigable; screen-reader-friendly crisis banner and onboarding |
| **Security** | Row-level security enforced on all data tables; no PII exposed client-side beyond alias/avatar |
| **Scalability** | Architecture should not block Phase 2 features (Coming Soon dashboards, personas, mood history, localization) |
| **Privacy** | No third-party trackers on sensitive pages; no chat content sold or shared |
| **Availability** | Vercel deployment; no formal SLA required at prototype stage |
| **Responsiveness** | Fully responsive across common breakpoints, mobile-first |
| **SEO** | Factual, informational targeting only (e.g. "teen emotional support India," "academic stress help for students") — no clickbait |

---

## Feature Prioritization (MoSCoW)

| Priority | Features |
|---|---|
| **Must Have** | Anonymous entry, Google/Email login, Role selection (Teen/Parent), Interactive onboarding, Teen Dashboard, Parent Dashboard, Nova AI (core support scope), Mood Intelligence (single-session), Crisis escalation banner (all pages), Quick-exit, Peer Support (moderated), Study Hub (core content), Basic Consultation |
| **Should Have** | Chat memory for logged-in users, Saved resources, Search across Study Hub, Profile and Settings, Content Management workflow, Reporting flow |
| **Could Have** | Professional Counselling Booking (simulated), Moderation dashboard views, Basic aggregate content stats |
| **Won't Have (this build)** | Counsellor/Teacher-Educator/Admin Dashboards (Coming Soon), Multiple Nova personas, Mood history/analytics, Hindi localization, Community features, Advanced AI personalization, Real guardian-approval legal workflow |

---

## Feature Dependency Matrix

| Feature | Depends On |
|---|---|
| Role Selection | Authentication (anonymous or logged-in entry) |
| Interactive Onboarding | Role Selection |
| Teen / Parent Dashboard | Interactive Onboarding, Authentication |
| Nova AI | Onboarding context (mood, concern), Crisis Escalation rules |
| Mood Intelligence | Nova AI (for context understanding), Study Hub (for recommendations), Crisis Escalation (for high-risk routing) |
| Study Hub | Mood Intelligence (recommendation surfacing) |
| Peer Support | Authentication (lightweight sign-up), Moderation, Reporting |
| Consultation Booking | Authentication (persistent account), Guardian approval (simulated) |
| Reporting | Peer Support, Content Management |
| Teacher / Educator Dashboard *(Coming Soon)* | Resource Library, Content Management, Authentication, School Resource Module — **not** dependent on Consultation Booking or any teen-facing conversation system |
| Admin Dashboard *(Coming Soon)* | Reporting, Moderation, Crisis Escalation logs |

---

## User Permissions (RBAC)

| Permission | Guest | Teen | Parent | Counsellor (Coming Soon) | Teacher / Educator (Coming Soon) | Moderator (Coming Soon) | Admin (Coming Soon) |
|---|---|---|---|---|---|---|---|
| Browse Study Hub / Resources | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Use Nova (session-only) | ✅ | ✅ | — | — | ❌ | — | — |
| Use Nova (with saved history) | — | ✅ (logged in) | — | — | ❌ | — | — |
| Mood Check-in | ✅ | ✅ | — | — | ❌ | — | — |
| Peer Support access | — | ✅ | — | — | ❌ | — | — |
| Basic Consultation | — | ✅ | — | — | — | — | — |
| Professional Booking request | — | ✅ (logged in) | Approve | Manage availability | — | — | — |
| View Parent Dashboard | — | — | ✅ | — | — | — | — |
| Manage bookings | — | — | — | ✅ | — | — | — |
| Access educator resources | — | — | — | — | ✅ | — | — |
| View safeguarding guidance | — | — | — | — | ✅ | — | ✅ |
| Access referral documentation | — | — | — | — | ✅ | — | — |
| View escalation events | — | — | — | — | ❌ | ✅ | ✅ |
| Moderate peer-support reports | — | — | — | — | ❌ | ✅ | ✅ |
| Manage users | — | — | — | — | ❌ | — | ✅ |
| Content Management access | — | — | — | — | — | — | ✅ |
| Full platform administration | — | — | — | — | — | — | ✅ |

---

## Product Constraints

- 8-day build window with a 3-person team (1 dev, 1–2 UI/UX).
- No real backend integration to actual helplines — numbers are displayed, not dialed programmatically.
- Requirement sign-off must precede any wireframe or design work, per TalentGro's mandatory sequence.
- Design and content must never gamify or trivialize serious emotional distress, including in the onboarding flow.
- Coming Soon roles and dashboards must be visibly and honestly labeled — never presented as functional.

## Assumptions

- The team's kickoff meeting had not yet occurred at the time this document was drafted; treat this PRD as a working draft into that meeting rather than final.
- Organisation identity, legal entity, advisory board, partner NGOs, and named professional credentials are placeholders, not fabricated as real.
- The guardian-approval workflow, professional booking/availability, and Coming Soon roles are simulated or named as placeholders only.

## Risks

| Risk | Mitigation |
|---|---|
| Onboarding feels gamified in a way that trivializes distress | Motion/micro-interactions confined to navigation and delight, never to mood scoring or "progress" through distress |
| Over-reliance on Nova as an emotional substitute | Hard escalation rules; Nova never handles crisis conversations regardless of topic breadth |
| Anonymous-first design creates ambiguity around data expectations | Chat Memory section and in-product messaging clearly state what is/isn't saved at every entry point |
| 8-day timeline pressure with an expanded feature set (onboarding, dashboards, mood intelligence, Study Hub) | Strict MoSCoW prioritization; Coming Soon roles/dashboards explicitly out of MVP build effort |
| Simulated booking flow mistaken for real | Explicit "simulated" labeling in-product and in this document wherever the flow appears |

## Dependencies

- Signed-off client requirement document (prerequisite for any design/dev work).
- Supabase project (auth, DB, RLS) provisioned, supporting both anonymous sessions and persistent accounts.
- Vercel deployment pipeline.
- Design system / wireframes approved before development begins, including onboarding motion and micro-interaction specs.

---

## Edge Cases

| Scenario | Expected Behaviour |
|---|---|
| Internet lost mid-session | Graceful offline state; anonymous session data is not recoverable and the user is informed of this before it's lost where possible |
| Nova (AI service) unavailable | Fallback message directing to Study Hub and crisis banner; never a silent failure |
| Supabase unavailable | Read-only/degraded mode for public content (Study Hub, Resources); crisis banner remains visible and functional (static content, no backend dependency) |
| User refreshes page mid-onboarding | Anonymous: onboarding restarts or resumes within session state; Logged-in: resumes from last completed step |
| Anonymous session ends | All session data (chat, mood, recommendations) is discarded; user is not warned mid-session but entry messaging sets this expectation upfront |
| Booking unavailable *(simulated)* | Clear "currently unavailable" state; never a dead click |
| Repeated crisis keywords in a single session | Crisis banner and escalation prompt are not suppressed after first trigger — every risk signal re-surfaces the escalation path |
| Database timeout | User-facing error state with retry option; no silent data loss for logged-in users |
| API rate limit hit | Nova responds with a graceful "please try again shortly" state, never a raw error |
| Duplicate submissions (e.g. mood check-in, report) | De-duplicated server-side; user sees a single confirmed state |
| Invalid age entered at onboarding | Gentle re-prompt; does not block access to Study Hub or crisis banner |
| Empty mood submission | Nova prompts gently rather than blocking progression |
| No search results in Study Hub | Friendly empty state with a suggestion to try Nova or browse categories instead |

---

## Error Handling

| Area | Behaviour |
|---|---|
| Authentication failures (Google/Email) | Clear, non-technical error message; anonymous entry offered as an immediate fallback |
| Nova unavailable | Friendly fallback message; user is directed to Study Hub content and the crisis banner remains visible |
| Mood service unavailable | Mood check-in gracefully disabled with a message; core Nova and Study Hub access unaffected |
| Booking errors *(simulated)* | Clear "unavailable" state framed honestly given the simulated nature of the flow |
| Dashboard errors | Partial-load fallback (show what's available); never a blank/broken screen |
| Network issues | Persistent, cached-where-possible access to the crisis banner regardless of other failures |
| Search failures | Friendly error state with a manual browse option as fallback |

Across all error states, the crisis escalation banner is treated as the one component that must never fail silently or be affected by unrelated service outages.

---

## User Flow Summary

1. **Distressed teen** — Guest → Continue Anonymously → onboarding → Teen Dashboard → sees crisis banner throughout → Nova or direct crisis line.
2. **Returning teen** — Continue with Google/Email → Teen Dashboard with saved history → mood check-in → personalized recommendation.
3. **Anonymous visitor** — browses Study Hub with zero sign-up; quick-exit available throughout.
4. **Parent** — Continue with Google/Email → Role Selection (Parent) → Parent Dashboard → guidance content.
5. **School/educator** — Schools section → resource pages → no login required.
6. **Crisis escalation** — any entry point (Nova, mood intelligence, peer chat, Study Hub) → risk signal detected → immediate crisis banner + helpline prompt, logged as an escalation event.

---

## Acceptance Criteria

**Authentication & Entry**
- Anonymous entry requires zero personal information and grants full access to Nova, Study Hub, Resources, and Mood Check-in.
- Google/Email login creates a persistent account with saved conversations, mood history, and saved resources.
- No feature required for safety (crisis banner, Nova, quick-exit) is ever gated behind login.

**Role Selection & Onboarding**
- Teen and Parent are selectable and fully functional; Teacher/Educator, Counsellor, and Administrator are visibly labeled Coming Soon.
- Every onboarding step is skippable without blocking access to core help.

**Teacher / Educator Dashboard** *(Coming Soon — criteria defined now for future build)*
- Teachers only access educator-specific content — never a teen's private conversations, mood history, or peer-support activity.
- No student personal data is visible anywhere in the dashboard.
- Resources (classroom strategies, safeguarding guidance, professional development materials) are downloadable.
- Referral guidance and crisis response procedures are clearly accessible.
- The dashboard remains strictly informational — no administrative or moderation controls are present.

**Crisis Escalation Banner**
- Visible and functional on 100% of pages without exception, including during service degradation elsewhere.
- Displays all five helplines with correct numbers and availability notes.
- Triggers automatically on any detected risk signal from Nova, Mood Intelligence, peer chat, or content pages.

**Nova AI**
- Responds in a consistent elder-sibling tone across all supported topics.
- Never produces diagnosis, treatment advice, or crisis-management content.
- On risk-signal detection, immediately surfaces the crisis banner and "talk to a real person" prompt, verified via test scenarios covering self-harm, suicidal ideation, and substance-use language.

**Mood Intelligence**
- Captures one mood entry per session and produces a corresponding recommendation (article, Study Hub tool, breathing exercise, journal, peer support, or professional help).
- High-risk signals from mood context trigger immediate human escalation, bypassing all other recommendation paths.

**Peer Support**
- Clearly labeled as separate from Nova and professional support.
- Report/escalate option present on every peer-support screen.
- Any crisis-adjacent topic in peer chat routes to escalation, not peer advice.

**Consultation Flow**
- Basic Consultation is accessible without guardian approval.
- Professional Counselling Booking is clearly labeled as simulated throughout the UI.

**Quick-Exit**
- Present and functional on every page; single action exits to a neutral destination.

**Accessibility & Performance**
- WCAG AA verified via automated and manual testing.
- Lighthouse accessibility and performance scores > 90.
- Average mobile load time < 3 seconds across core pages.

---

## Definition of Done

Every feature must satisfy all of the following before being considered complete:

- UI complete and matches approved design
- Fully responsive across mobile, tablet, and desktop breakpoints
- Accessible (WCAG AA verified)
- Backend connected (or clearly documented as simulated, where applicable)
- Loading states implemented
- Empty states implemented
- Error states implemented
- Security reviewed (RLS policies, no unintended PII exposure)
- Tested (manual or automated, as appropriate for the 8-day window)
- Documented (behaviour and known limitations noted for the team)

---

## Project Milestones

| Milestone | Expected Deliverables |
|---|---|
| **Requirements** | Signed-off client requirement document, this PRD, open questions resolved with the team |
| **Wireframes** | Onboarding flow, Teen Dashboard, Parent Dashboard, Nova conversation UI, Mood Intelligence flow, Study Hub, Peer Support, Crisis banner across all page states |
| **Design System** | Component library, avatar/illustration set, motion/micro-interaction guidelines, accessibility tokens (contrast, focus states) |
| **Development** | Authentication (anonymous + Google/Email), Role Selection, Onboarding, Dashboards, Nova, Mood Intelligence, Study Hub, Peer Support, Crisis Escalation, Basic Consultation |
| **Testing** | Accessibility audit (WCAG AA), performance audit (Lighthouse), crisis-escalation scenario testing, edge case verification |
| **Deployment** | Vercel production deployment, environment variables documented, final walkthrough against Definition of Done |

---

## Future Roadmap

Clearly separated from MVP scope, to be pursued only after MVP is stable and design-approved:

- Counsellor Dashboard, Teacher/Educator Dashboard, Admin Dashboard (Coming Soon roles activated)
- Professional Counselling Booking activated with real guardian-approval workflow
- Multiple Nova personas
- Mood analytics / historical trend view
- Hindi localization
- Community features
- Advanced AI personalization
- Privacy-respecting analytics dashboard

## Open Questions

- Who will serve as Team Lead / TalentGro liaison? (Currently unassigned pending team kickoff.)
- What specific age-verification mechanism (if any beyond self-declaration) is expected at onboarding?
- Should avatar selection at onboarding offer custom uploads, or a fixed illustrated set only, given the 8-day timeline?
- Should Basic Consultation have any rate-limiting or cooldown to prevent it substituting for genuine crisis escalation?
- What level of detail is expected for Coming Soon role previews — a simple label, or a short in-product preview screen?
