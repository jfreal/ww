---
title: Wake-Window Schedule Generator
sidebar_label: Schedule generator
id: A01-wake-window-schedule-generator
docKey: wake-window-schedule-generator
category: Scheduling & Prediction
priority: P0
status: Built
tags: [core, scheduling, wake-windows, no-account, mvp]
---

# Wake-Window Schedule Generator

**Competitor verdict:** Table-stakes — every serious scheduler predicts nap timing; our wedge is doing it free, in the browser, with no account and transparent, cited math.

## Problem / user need
A tired parent wants to know "when should the baby nap next?" without a subscription, a sign-up wall, or a black-box guess. They need a full day's plan in ten seconds from three inputs they already know: birthday, this morning's wake time, and the baby's age-typical window lengths.

## What users actually say
Reviews praise "accurate, self-learning nap prediction" and a "genuinely-free-with-no-tricks" experience (Nara is singled out for the latter). The loudest anxiety is the flip side: a "rigid schedule" or "countdown you can't meet" is stressful. So the plan must present as ranges, never a stopwatch, and never scold when the baby is off-book.

## Competitor comparison
Huckleberry (SweetSpot) and Napper both predict, but as app-only, account-gated, black-box outputs. None is a shareable web plan and none shows the arithmetic behind the prediction. That transparency plus the no-account web shape is the opening (research 00, "two structural openings").

## Our approach (spec)
Deterministic arithmetic, no model:
1. Compute age (adjusted if preterm — see A03).
2. Look up the age-band wake window range (Tier 2 table below).
3. Look up typical nap count for the band.
4. From wake time, lay out: window → nap → window → nap ... to bedtime.
5. Apply the convention **first window shortest, last window longest**, distributing the range across the day.
6. Each window **includes feeding time** — everything the baby is awake for counts, and the window does not reset after a feed.
Show every step: "Wake 7:00 + first window 2h → nap ~9:00." Attach a Tier 2 badge + citation to the window numbers and a Tier 1 badge to the 24h-total sanity check (AASM 2016 / NSF 2015).

### Where a window starts and ends
Shipped in the **"What counts as awake?"** panel (`WindowMechanics.vue`), under the nap schedule:
- **Starts** at the real wake-up — alert, eyes open for a while. A few minutes of dozy fussing with eyes mostly closed is still sleep, not the start of the day.
- **Ends** when the baby is laid down — one event, not "wind-down or laid down", so there is nothing to interpret. The 5–20 quiet minutes it then takes to fall asleep is rest time, not overtime charged to the window.
- Published sources genuinely disagree here (crib-out-to-crib-in vs eyes-open-to-eyes-shut) by 10–15 minutes. The panel says so, and names that disagreement as the reason every time in this app is a **range**: any reasonable definition lands inside it. These are practitioner conventions (Tier 3), not studied definitions.

### Named templates
"2-3-4" and friends are what parents actually search for, so the model ships them as one-tap starting points (`scheduleTemplates.ts`), rendered as a chip row under the wake-window inputs:

| Template | Windows (h) | Conventional age |
|---|---|---|
| 4-nap day | 1.5 / 1.75 / 1.75 / 1.75 / 2 | 3–6 mo |
| 2-3-4 | 2 / 3 / 4 | 6–14 mo |
| 3-3-4 | 3 / 3 / 4 | 9–15 mo |

Applying one replaces the wake-window array in place; every window stays editable afterwards, and the active template is detected by value (no extra stored state), so an edit silently un-highlights the chip. Nothing is offered under 3 months — newborn days resist templating and it would contradict the cues-first guidance (A04).

## Scope — MVP
- Three inputs (birthday, wake time, band-default windows) → full-day plan.
- Ranges shown (e.g. "9:00–9:30"), not single times.
- Editable window lengths with the default range visible.
- 24h-total check against AASM/NSF displayed as reassurance, not a grade.
- Age-gated named-template chips ("2-3-4") that fill the windows and stay editable.
- **"What counts as awake?"** — the window-boundary definitions, answered next to the schedule they apply to.
- **"Should I wake a sleeping baby?"** — nap caps, with the Tier 3 capping convention and the Tier 1 actigraphy evidence that softens it shown side by side rather than one camp's certainty.

## Scope — later
- Personalize windows from local logged history (A10).
- Nap-transition awareness (A06), atypical-day flag (A07), bedtime cap (A05).

## Edge cases & gotchas
- Under ~4 months / ~6 months: bias toward cues, not clock (see A04); label the schedule as loose.
- Very short or skipped naps shift the rest of the day — recompute from the actual crib-in time.
- Don't imply a missed window is a failure; out-of-range informs, never scolds.
- A template is a sketch, never a commitment: the chip copy says low-sleep-needs babies often need longer windows than any template promises, and 3-3-4 is offered precisely as the lower-sleep-needs variant of 2-3-4.
- Both definitional panels live inside the nap-schedule block, so a schedule that computes no naps at all hides them too.
- Nap caps stay a suggestion, not an alarm: no timer, no "wake the baby now" prompt. A baby sleeping through a needed feed is routed to the pediatrician, not to a schedule answer.

## Evidence & citations
- Wake-window numbers: **Tier 2** practice-based heuristic; sources disagree (Taking Cara Babies, Huckleberry, Cleveland Clinic). Label as guidance. The *boundary definitions* underneath them are a separate, weaker claim — **Tier 3** practitioner convention (`WindowMechanics.vue`).
- 24h totals: **Tier 1** — AASM 2016 (4–12 mo: 12–16h), NSF 2015 (0–3 mo: 14–17h).
- Conventions (first-shortest/last-longest, includes feeding, window boundaries): research 01 §2; the boundary disagreement between published sources is research 08 T2.
- Nap caps: **Tier 3** convention (`tcb-wake-sleeping`, `huckleberry-day-sleep`, `mayo-baby-naps`) shown against **Tier 1** actigraphy (`reynaud-2026-bmc`: in 2–5-year-olds an extra hour of napping cost ~14 min of night sleep, and nap *end time* mattered more than length — adjacent-age evidence, applied loosely under two).
- Named templates: **Tier 2** — `citations.json` files "specific sample nap schedules" under Tier 2, and `agePages.ts` calls 2-3-4 "a practice-based convention rather than a validated rule". Community shorthand (research 08 T9); no study tests "2-3-4", and the doc-facing claim is only that these are the shapes parents search for. The template chips in `ChildInputs.vue` carry no badge of their own — they fill the wake-window inputs, which are badged Tier 2. **`docs/research/01-wake-window-science.md` still disagrees**, calling a numbered wake-window system Tier 3: it predates `citations.json` and uses the older taxonomy (Tier 2 = "Moderate/observational", Tier 3 = "Consultant heuristic") rather than the shipped one (Tier 2 = "Practice-based heuristic", Tier 3 = "Practitioner convention"). The shipped tiers win here because they are what the badge renders; retiering the research file is a human pass across all of it, not a per-feature edit.

## Effort
Medium. Pure arithmetic + a citation/badge layer; no backend, no model.

## Risks / open questions
- Presenting heuristic numbers with authority they don't have — mitigated by the Tier 2 badge and honest "guidance, not a rule" copy.
- How prominently to nudge toward cues under 6 months without undercutting the tool's usefulness.

## Success metric
Time-to-first-plan under ~10 seconds; a plan generated without any account creation.

## Related features
A02 (visual day), A03 (corrected age), A04 (cues vs clock), A05 (bedtime cap), A06 (transitions), A07 (atypical day), A10 (personalization), B01 (tier badges), E01 (shareable URL).
