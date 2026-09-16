---
title: Insights Report Card (Transparent, No AI)
sidebar_label: Report Card
id: D03-insights-report-card
docKey: insights-report-card
category: Analytics & Insights
priority: P2
status: Proposed
tags: [analytics, insights, report-card, no-ai, transparent, local-only]
---

# Insights Report Card

**Competitor verdict:** Confirmed gap — users want the data *interpreted* into plain-language observations, not just more charts; no competitor does this with transparent, non-AI, non-judgmental rules.

## Problem / user need
Charts show *what* happened but not *what it means*. A tired parent doesn't want to eyeball a graph and infer a trend — they want a sentence: "bedtime has drifted about 40 minutes later this week." The interpretation is the value, and today they have to do it themselves.

## What users actually say
Among the most-wished-for items: "a 'report card' that *interprets* the data." Verdict in the index: users want interpretation, not just charts — a confirmed gap.

## Competitor comparison
Competitors either stop at charts or reach for **black-box AI** (Berry AI, Ask Robin) that costs an account/subscription and never cites its reasoning. Our wedge is the opposite: observations produced by **transparent arithmetic and stated rules**, shown with the numbers behind them. This is a brand-defining "no black-box AI" feature — no LLM, no model trained on the user.

## Our approach (spec)
- A periodic **Report Card**: a short list of plain-language observations computed by deterministic rules over on-device logs, e.g.:
  - "Average bedtime this week: 8:12pm — about 40 min later than last week."
  - "Naps averaged 2 today; your baby's age range typically sees 2–3."
- Each observation **shows its work**: the numbers, the window compared, and a Tier badge/citation where a science claim is involved.
- **Gentle, optional suggestions** phrased as reassurance, never scolding: "If mornings feel rushed, you could nudge bedtime ~15 min earlier over a few days." Out-of-range = inform, never grade.
- Fully rule-based and on-device; the logic is inspectable, not a hidden model.

## Scope — MVP
3–5 core rules: bedtime drift, average wake time, nap-count vs. age band, total-sleep vs. AASM/NSF band, longest night stretch. Plain-language output with the math shown.

## Scope — later
Nap-transition heads-up (ties to A06), feed-pattern notes, "atypical day" awareness (A07), user-tunable thresholds, print into D02.

## Edge cases & gotchas
- **Never scold, never imply "behind/broken"** — copy rules are as important as the math (regressions/night wakings are normal).
- **Small samples:** suppress observations below a minimum data threshold; say "not enough logged yet."
- **Midnight/DST** shifts must not manufacture false "drift" (reconcile with F-series DST tool).
- Every suggestion is optional and captioned as guidance (Tier 3).

## Evidence & citations
Total-sleep and safety anchors: AASM 2016 / NSF 2015 / AAP 2022 (Tier 1). Nap counts: Tier 1. Wake windows: Tier 2. Drift-correction technique: Tier 3. All labeled. Normal-variation framing: Iglowstein 2003 (`iglowstein-2003`, Tier 1).

## Effort
Medium. A small rules engine + carefully written copy; no ML. Reuses D01 aggregations.

## Risks / open questions
Rule tuning to avoid noisy or alarming statements; keeping tone reassuring. Must stay clearly non-diagnostic with a "see your pediatrician for persistent concerns" off-ramp.

## Success metric
Report-card views; "was this helpful?" yes-rate; review sentiment that it "explained things without stressing me out."

## Related features
D01 (data source), D02 (printable), A06/A07 (transitions & atypical-day), B01 (Tier badges), G03 (anti-anxiety mechanics), G04 (no-AI stance).
