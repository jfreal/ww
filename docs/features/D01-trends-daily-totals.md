---
title: Trends & Daily Totals at a Glance
sidebar_label: Daily Totals
id: D01-trends-daily-totals
docKey: trends-daily-totals
category: Analytics & Insights
priority: P1
status: Built
tags: [analytics, trends, daily-totals, home-screen, charts, local-only]
---

# Trends & Daily Totals

**Competitor verdict:** Table-stakes — everyone charts trends, but parents beg for the day's totals surfaced *on the home screen* instead of buried two taps deep in a graphs tab.

## Problem / user need
An exhausted parent's most common question is simple: "How much has the baby slept and eaten today?" Most apps make you leave the logging screen, open an analytics tab, and read a chart to answer it. The number people actually want — total sleep hours, feed count/oz today — is treated as a report, not a glanceable fact.

## What users actually say
"Daily totals at a glance" is listed among the most-loved things done well and among the most-wished-for ("daily totals on the home screen"). The recurring gripe is that totals are "buried in graphs elsewhere."

## Competitor comparison
Trend charts are table-stakes; the leaders (Huckleberry, Napper) and trackers (Baby Tracker, Glow Baby, Nara) all chart history. The differentiator is placement and honesty, not the existence of charts. No competitor is called out for putting the running daily totals front-and-center on the primary screen.

## Our approach (spec)
- A persistent **Today** summary block on the home screen: total sleep (h:m), nap count, feed count, and total oz/mL — updating live from on-device logs.
- Numbers shown as **ranges/context vs. the age-appropriate AASM/NSF total-sleep band** (Tier 1), so the total is informative, never a grade.
- Below it, **simple 7/14-day trend sparklines** (sleep total, feeds) — transparent, plotted from the parent's own local data, no model.
- Everything computed on-device; no account, no server call.

## Scope — MVP
Today totals block (sleep h:m, nap count) + a 7-day sleep-total sparkline. Tap-through to a fuller per-day breakdown.

**As built:** `TrendsToday.vue` reads the same on-device sleep log (`ww.sleepLog.v1`) as C01 and reuses `dailyTotals`/`startOfLocalDay`; the aggregation (nap count, in-progress "so far" flag, 7-day series, age-band lookup) lives in `src/models/trends.ts` with unit tests. The total is shown as context against the age-appropriate Tier 1 total-sleep band (AASM/NSF, from `citations.json`), never a grade — no color-coding, no red. The **feed count / oz tiles are wired behind a guard** and stay hidden until the feeding log (C02) exists to supply data — no fabricated numbers. Block stays to four numbers max.

**The observed average.** Beside the published band sits the baby's own number: the mean of the days in the last week that actually have logged sleep, today's partial day excluded so an in-progress morning can't drag it down, and null until at least three such days exist. It is deliberately **not** called a 7-day average, and the copy names its sample ("Across the 3 days you logged this week…") and says it counts only sleep entered here. The reason is the failure mode: a parent who logs naps but not nights would otherwise be shown a number several hours short of the real day and told to schedule by it. So the line says what it is made of — if the log is complete, the baby's own total is the better anchor when it disagrees with the published band; if some sleep goes untracked, it reads low by whatever is missing. Same honesty rule A10 follows when its sample is thin.

## Scope — later
14/30-day windows, feed volume trend, weekday vs. weekend view, per-caregiver contribution breakdown, export hook into D02.

## Edge cases & gotchas
- **Midnight boundary:** define "today" clearly and let sleep spanning midnight split correctly (avoid the Napper "midnight bug").
- **Sparse data:** show honest partial totals; never blank-shame an empty day (empty-tracker guilt).
- **In-progress nap/feed:** count elapsed time toward the running total, labeled "so far."
- **Partial logging is invisible to the math.** A day where only two naps got entered counts as a whole day, and a day with nothing logged is skipped entirely rather than averaged in as zero. Neither can be detected from the log, so the observed-average line discloses its sample instead of pretending to a complete record.

## Evidence & citations
Total-sleep context bands: AASM 2016 (12–16 h at 4–12 mo) and NSF 2015 (14–17 h at 0–3 mo) — Tier 1. Wake-window context is Tier 2 and nap-count context is Tier 1 (`citations.json` files broad nap-count trajectories under Tier 1, and the "Nap count" sheet in `NormalRanges.vue` is `tier: 1`); both stay labeled as guidance.

## Effort
Low–Medium. Aggregation over local logs plus a lightweight sparkline; reuses the 24h-visual data layer.

## Risks / open questions
Requires C-series logging to exist to be useful. Risk of clutter — keep the block to four numbers max.

## Success metric
% of sessions where the Today block is viewed; reduced taps to reach totals; positive review mentions of "totals right there."

## Related features
D02 (report export), D03 (insights report card), C01/C02 (logging), A02 (24h visual).
