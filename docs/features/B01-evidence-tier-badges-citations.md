---
title: Evidence Tier Badges & Inline Citations
sidebar_label: Tier badges & citations
id: B01-evidence-tier-badges-citations
docKey: evidence-tier-badges-citations
category: Guidance & Credibility
priority: P0
status: Built
tags: [credibility, citations, evidence-tiers, transparency, accessibility, differentiator]
---

# Evidence Tier Badges & Inline Citations

**Competitor verdict:** Confirmed gap — no competitor attaches a transparent evidence tier and named citation to each on-screen recommendation.

## Problem / user need
Parents are handed black-box predictions ("nap now") with no way to judge how solid the advice is. The two loudest competitor complaints are opaque predictions and advice that feels made-up. Meanwhile the honest reality is that total-sleep numbers are strong science while wake-window minute-charts are a heuristic that even proponents call "one piece of the puzzle" — and no competitor discloses that difference.

## What users actually say
Reviews praise apps that feel accurate but distrust "magic" predictions they can't verify; forum parents ask "where does this number even come from?" and swap conflicting wake-window charts. The methodology page is the market's single biggest credibility gap.

## Competitor comparison
Huckleberry cites named advisors and a Harvard pilot at the brand level but does not tier or cite individual in-app recommendations. Napper uses unnamed experts. Trackers (Baby Tracker, Glow, Nara) offer no sourcing. Nobody shows a per-recommendation badge + citation.

## Our approach (spec)
Every sleep recommendation renders a small **Tier badge** plus a one-tap citation. The three tiers, their labels, and what each covers are defined once in `src/data/citations.json` (`tiers`) and read through `getTier()` in `src/models/Citations.ts`, so a badge on screen and this list cannot disagree:
- **Tier 1 — Evidence-based** (expert consensus statements, peer-reviewed normative data): total sleep per 24h, broad nap-count trajectories, sleep-consolidation and circadian-development timelines, safe-sleep practices.
- **Tier 2 — Practice-based heuristic** (consultant and parenting frameworks, validated by no trial, cohort study, or systematic review): specific wake-window durations by age, and specific sample nap schedules.
- **Tier 3 — Practitioner convention**: daylight-saving and time-zone shift plans, and troubleshooter answers — likely causes and range-based fixes for early rising, short naps, and night wakings.

**`appliesTo` is the copy shown to readers, not the enforced scope.** Each bullet above quotes that tier's `appliesTo` string, which `SourcesEvidence.vue` renders verbatim under "Applies to:". Nothing checks a badge against it, and Tier 3's string is currently narrower than what the app actually badges Tier 3: window-boundary definitions (`WindowMechanics.vue`) and the nap-transition prompt (`NapTransition.vue`) both render `tier="3"` without appearing in it. **That is a gap in `citations.json`, not in these specs** — widening the string is a change to reader-facing product copy and belongs to a human, not to a docs sweep.

Wake-window *lengths* are Tier 2, not Tier 3. `HowCalculated.vue` says so on screen — "the only judgment call — a practice-based heuristic (Tier 2)" — as does the "Longest awake stretch" sheet in `NormalRanges.vue`. The weaker Tier 3 claim underneath it is where a window *starts and ends* (`WindowMechanics.vue`), which published sources genuinely define differently.

Badges are **color-blind-safe**: distinct shape + text label, never color alone — `TierBadge.vue` pairs a glyph (filled `●` = Tier 1, half `◐` = Tier 2, hollow `○` = Tier 3) with the tier's written short label and name, and mixes the pill background *from* the tier colour so ink and tint can never fall out of step. Tapping a badge opens a citation card: plain-language claim, tier meaning, named source, and link to B02. Wake-window numbers always show the Tier 2 badge and a "guidance, not a medical rule" line.

## Scope — MVP
Tier badge + citation card on: 24h total check, wake-window ranges, safe-sleep panel. Static tier/source mapping. Accessible (shape+text, screen-reader labels).

### "Parents ask" — the cited FAQ catalog
The badge system's widest surface is the FAQ (`data/faq.ts`, rendered by `FaqPanel.vue`): the questions parents actually ask, each with a short honest answer, a tier badge, and named sources. Curated from research 07 (60+ questions from expert sites and search patterns) and 08 (22 recurring community themes). Content is data, not markup, so `faq.test.ts` can enforce the invariants the panel depends on: unique ids, every question really a question, answers substantive, every tier a known tier, **every source id resolving to a real entry in `citations.json`** (so the panel can never render an empty citation row), no scolding language, and coverage of the highest-frequency themes that previously had none.

The honest-tiering pattern shows best in the two schedule-adjacent panels: **"Should I wake a sleeping baby?"** puts the Tier 3 capping convention and the Tier 1 actigraphy evidence that softens it side by side, both cited, so the parent can hold the tension instead of inheriting one camp's certainty. That is the badge system doing the job it exists for.

## Scope — later
Badges on troubleshooter answers (B05), regression explainer (B06), sleep-training overview (B07); user setting to show/hide inline badges.

## Edge cases & gotchas
- Don't badge-spam; one badge per recommendation block.
- Dark-room / one-hand UX: badges must be legible dimmed and tappable one-handed.
- T3 must never visually outrank T1 — keep hierarchy clear.

## Evidence & citations
Tier framework and numbers from research 00/01; every tier below is the one the source carries in `src/data/citations.json`. Tier 1: AASM 2016 (`paruthi-2016`), NSF 2015 (`hirshkowitz-2015`), AAP 2022 safe sleep, and the cohort work — Mindell 2016 (`mindell-2016-app`) and Iglowstein 2003 (`iglowstein-2003`). Tier 2: the wake-window charts — Taking Cara Babies (`tcb-wake-windows`), Huckleberry (`huckleberry-expectations`), Cleveland Clinic (`cleveland-wake-windows`) — which disagree with each other, itself proof they are heuristics; and Canapari (`canapari-critique`), who says wake windows are "not taught, discussed, or researched in pediatric sleep medicine." Tier 3 holds the narrower practitioner answers: nap transitions (`huckleberry-nap-transitions`), short naps and early waking (`tcb-short-naps`, `tcb-early-waking`, `huckleberry-early-risers`).

## Effort
Medium. Design system for badges + citation card; a maintained claim→tier→source table. No backend.

## Risks / open questions
Keeping the source table current; avoiding visual clutter; ensuring the "heuristic" label reassures rather than undermines confidence in the tool.

## Success metric
Share of recommendations carrying a badge (target 100%); citation-card open rate; qualitative trust signal in reviews ("finally an app that shows its sources").

## Related features
B02 (methodology page), B03 (safe sleep), A01/A04 (schedule & cues), G03/G04 (anti-anxiety, no-AI stance).
