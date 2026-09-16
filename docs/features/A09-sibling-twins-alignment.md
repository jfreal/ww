---
title: Sibling / Twins Schedule Alignment
sidebar_label: Sibling/twins alignment
id: A09-sibling-twins-alignment
docKey: sibling-twins-alignment
category: Scheduling & Prediction
priority: P1
status: Built
tags: [twins, siblings, multiples, overlap, scheduling, confirmed-gap]
---

# Sibling / Twins Schedule Alignment

**Competitor verdict:** Confirmed gap — many apps track multiple children; none align two schedules to engineer a shared quiet block.

## Problem / user need
A parent of twins or two close-in-age children does painful mental math every day to find a window where both are asleep at once — often the only break they get. No app helps. This one is **personally motivated: the builder is a twin parent,** and twin parents today fall back to spreadsheets to hand-calculate overlaps.

## What users actually say
The wishlist explicitly asks for "native twins support with which-baby/which-side." The briefs rank this the #2 differentiator: "clean white space; no one *aligns* two schedules."

## Competitor comparison
Smart Sleep Coach is the tell — up to 4 profiles with "individual schedules" and "parallel timers," i.e., tracked side-by-side, not coordinated. TwinTracker, Baby Daybook, and Nara all track each baby *separately*. Nobody computes or optimizes the overlap.

## Our approach (built)
- A second child is **opt-in** ("+ Add sibling / twin"): the plan holds two full schedules (Baby A / Baby B), each with its own birthday, gestational age, wake windows, and bedtime. The new sibling is seeded from Baby A, so twins start identical; single-child remains the default UX.
- Each child's schedule generates independently; the **overlapping nap window(s)** — the shared "quiet block" — come from interval intersection (`napOverlap.ts`), which handles asymmetric schedules (different nap counts and lengths) with no special cases.
- A **stacked dual-track 24h view** (`SiblingAlignment.vue`) draws both children's day arcs on one clock-positioned timeline (awake / nap / night per child, with age labels) and highlights each quiet block as a band across both tracks, listing its time range and length below.
- Overlap is framed as a **best-effort observation, never a target**. No overlap gets honest, guilt-free copy: "different rhythms — expected, not something to fix."
- Both schedules ride the URL: the second child adds `bd2`/`s2` beside the existing `bd`/`s` params (`planUrl.ts`), so old single-child links keep working unchanged.
- The **"optimize for overlap"** toggle (nudging naps only within each child's labeled Tier-3 range, never outside it) is not built yet — see Scope, below.
- **The two twin practice rules** (research 07 §13), shown under the timeline only when the two children are within 2 months of each other — plausible twins or near-twins on one schedule, so real siblings years apart don't get twin advice: sync to the first twin awake and wake the other within ~15–30 minutes, giving the sleepier twin the slack (a longer nap or earlier bedtime) rather than a separate day; and the AAP safe-sleep rule that room-sharing is fine but each baby needs their own sleep surface — no crib-sharing, naps or nights. Cited (`huckleberry-twins`, `aap-safesleep-2022`), and explicit that one twin's timing always being a little "off" the shared plan is normal, not a problem to solve.

## Scope — MVP
Two children, stacked 24h view with the overlap band highlighted. **Shipped.**

## Scope — later
"Optimize for overlap" as a fast-follow; 3+ children; per-child feeding/which-side tracking.

## Edge cases & gotchas
- Never sacrifice a child's appropriate schedule to force overlap — nudges stay inside labeled ranges.
- Different ages mean different nap counts; the overlap may be short or occasional — present honestly, no guilt if it's small.
- Local-only/no-account: two schedules still live in the URL/on-device.

## Evidence & citations
Tier 2 wake-window ranges per child (research files 00/02); the alignment approach and range guardrail are from file 05 Brief 2. Sources: Smart Sleep Coach (parallel timers), TwinTracker.

## Effort
Medium — the generator already exists; this is a second instance + an overlap calc + a stacked view.

## Risks / open questions
Niche demand (twins + close siblings). It's a loyalty/word-of-mouth hook, not a mass-acquisition driver — low downside since it reuses the core engine.

## Success metric
% of multi-child plans created; qualitative "this is the only app that does this" feedback.

## Related features
A01 (generator), A02 (24h visual), A08 (DST for both), E01 (shareable URL), C02 (which-side feeding).
