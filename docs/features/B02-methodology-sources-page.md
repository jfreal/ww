---
title: Methodology & Sources Page
sidebar_label: Methodology page
id: B02-methodology-sources-page
docKey: methodology-sources-page
category: Guidance & Credibility
priority: P1
status: Built
tags: [credibility, methodology, sources, transparency, wake-windows, differentiator]
---

# Methodology & Sources Page

**Competitor verdict:** Confirmed gap — a public, honest methodology page with ranges + citations is the market's single biggest missing credibility bar.

## Problem / user need
Parents comparing conflicting wake-window charts have no way to see what a given app's numbers are built on, or how confident to be. They deserve one page that lays out every range by age, its source, and the honest limits of the concept.

## What users actually say
Forum parents openly distrust unsourced predictions and swap screenshots of charts that disagree by 30+ minutes. Reviewers reward apps that feel transparent and honest; "genuinely free with no tricks" and "shows its work" earn loyalty.

## Competitor comparison
No major competitor publishes a per-age, per-source methodology page. Huckleberry names advisors at the brand level; Napper's experts are unnamed. This page directly out-transparents the leader.

## Our approach (spec)
A public (no-account) page with three parts:
1. **The honest framing, up top:** "Total 24-hour sleep durations are consensus science (Tier 1). The specific wake-window minute-charts are a practice-based heuristic (Tier 2) — sources disagree and there is no RCT. We use them as flexible starting ranges, labeled honestly." Include the Canapari quote.
2. **The tables:** 24h totals by age with Tier 1 sources (AASM 2016, NSF 2015); wake-window ranges by age with Tier 2 sources; nap-transition ages (Tier 3). Every row carries a Tier badge (B01) and a named, linked citation.
3. **Where the science is uncertain:** exact wake-window minutes, whether wake-window systems improve naps, "drowsy but awake," 12/18-month regressions, under-4-month needs.

## Scope — MVP
Static page: framing block, 24h-total table (Tier 1), wake-window table (Tier 2), nap-transition table (Tier 3), uncertainty section, full source list with working links. Linked from every citation card (B01).

Alongside it, **"Parents ask"** (`FaqPanel.vue` over `data/faq.ts`) is the question-shaped door into the same source library: one native `<details>` per question, a cited short answer inside, a tier badge on every answer, and an "In this app:" pointer to wherever the fuller treatment lives. State-free — no account, and nothing tracks which questions anyone opens. The source library itself is up to 82 entries as of 2026-08 (`meta.lastVerified`), each one still carrying org, venue, credentials, year, and a summary; industry-affiliated sources are labeled as such in the `org` field rather than quietly promoted.

## Scope — later
"Last researched" date + changelog; printable/shareable version; localized units; deep links from each in-app recommendation to its exact row.

## Edge cases & gotchas
- Keep tone reassuring, not academic-cold — tired parents, not reviewers.
- Don't let the "it's a heuristic" honesty read as "our app is unreliable"; frame as trustworthiness.
- Ranges only; never a single target minute.

## Evidence & citations
Every tier below is the one the source carries in `src/data/citations.json`. Tier 1: AASM 2016 (Paruthi, JCSM), NSF 2015 (Hirshkowitz, Sleep Health), AAP 2022 safe sleep, plus the cohort work — Mindell 2016 (PubMed 27252030) and Iglowstein 2003 (Pediatrics). Tier 2: the wake-window charts from Taking Cara Babies, Huckleberry and Cleveland Clinic, and the skeptic anchor Canapari (Yale) — "not taught, discussed, or researched" and numbers "do not seem to be based on any scientific evidence." Tier 3: the narrower practitioner answers — nap transitions, short naps, early waking.

## Effort
Low–medium. Mostly content + the shared citation data model from B01.

## Risks / open questions
Source-link rot; keeping numbers in sync with the schedule engine (A01); deciding how much nuance before it overwhelms.

## Success metric
Page visit rate from citation cards; time-on-page; inbound trust signals; use as a linkable asset ("their methodology is public").

## Related features
B01 (tier badges), A01/A04 (schedule & cues), G04 (no-AI stance), B06 (regressions).
