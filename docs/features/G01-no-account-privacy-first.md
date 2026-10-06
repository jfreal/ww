---
title: No-Account, Privacy-First Architecture
sidebar_label: No account / privacy
id: G01-no-account-privacy-first
docKey: no-account-privacy-first
category: Brand & Product
priority: P0
status: Built
tags: [privacy, no-account, local-first, url-state, trust]
---

# No-Account, Privacy-First

**Competitor verdict:** Partial gap — no-account exists in one *logger* (Nighp), but every wake-window *scheduler* requires an account. "No account, and it actually schedules" is unoccupied.

## Problem / user need
Baby data is intimate — sleep, feeding, health, a child's name and birthday. Parents are increasingly wary of handing it over. Yet every major scheduler gates a plan behind a mandatory sign-up, then monetizes or shares the data. A tired parent in a dark nursery should not have to create an account, verify an email, and accept a data policy just to find out when the next nap is.

## What users actually say
"Mandatory accounts + no offline mode" is a documented landmine (hospitals, basements, dead zones). Parents explicitly wish for "privacy-first with no account." The founder's own driver: he is "sure his kids' data is in a database somewhere" and never consented to that in any meaningful way.

## Competitor comparison
- **Glow** is the cautionary tale: a $250K California AG settlement, a ~25M-user data exposure, and a Mozilla *Privacy Not Included* flag for contradicting its own no-sharing claim.
- **Napper** sends limited user data to OpenAI/Anthropic to power its AI.
- **Nighp's** logger is local-first and "collects no data" — but it doesn't schedule.

## Our approach (spec)
- **No sign-up to get a full plan.** State lives in the URL; the plan *is* the link. There is no server-side profile.
- **Local-first:** compute and store on-device / in-URL. No server-side PII by default. No ad SDKs, no data brokers, no selling.
- A plain-English **"What we don't collect"** page (a deliberate contrast to Glow's fine print): no name required, no account, no location, no ad trackers. The one third party is Google Analytics for page-view counts, sent as path only (no query string, so no plan or birthday) — see `public/gtag-init.js`.
- If cross-device sync ever ships, it is **opt-in** and clearly separated from core use.

## Scope — MVP
No-account plan flow (birthday + wake time → full plan, no login) + a short, plain-language privacy page stating: no accounts, no data sold, local-first, no AI training (see G04).

## Scope — later
Optional opt-in sync for cross-device history; a signed "we can't see your data" architecture note for the methodology page.

## Edge cases & gotchas
- URL state can leak a child's name/birthday if a link is shared publicly — warn on share, keep identifying fields optional.
- No account means no server-side history; frame as a deliberate trade, offer opt-in sync later.
- Long URLs need compression/short-link handling without introducing a tracking server.

## Evidence & citations
Glow — [California AG settlement](https://oag.ca.gov/news/press-releases/attorney-general-becerra-announces-landmark-settlement-against-glow-inc-%E2%80%93) · [Mozilla Privacy Not Included](https://www.mozillafoundation.org/en/privacynotincluded/glow-nurture-glow-baby/) · [Napper Privacy Policy](https://napper.app/privacy/) · [Nighp — no-account, collects no data](https://apps.apple.com/us/app/baby-tracker-newborn-log/id779656557)

## Effort
Low — aligns with existing URL-state architecture.

## Risks / open questions
Narrow the marketing claim: "the scheduler that needs no account and no data," not "the first private baby app." No-account limits some personalization features.

## Success metric
Landing → plan conversion without account; privacy-page engagement; trust mentions in reviews.

## Related features
E01 (shareable plan URL), G04 (no-AI), G05 (ephemerality), F07 (offline mode).
