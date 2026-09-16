---
title: Reminders & Pre-Nap Nudges
sidebar_label: Reminders & nudges
id: F01-reminders-nudges
docKey: reminders-nudges
category: Utility & Integrations
priority: P1
status: Built
tags: [notifications, reminders, nudges, pwa, web-push]
---

# Reminders & Pre-Nap Nudges

**Competitor verdict:** Table-stakes — the ~30-min pre-nap heads-up is loved, but everyone else either paywalls it or over-sends it.

## Problem / user need
Parents live around wake windows but can't watch a clock while holding a baby. The single most-praised reminder in reviews is a gentle *pre-nap* heads-up (~30 min before the window closes) so they can start winding down. The failure mode is the opposite: Glow's "notification spam" is one of its most-hated traits. The job is a quiet, well-timed nudge — not a stream of alerts.

## What users actually say
- "Most-loved: proactive *pre-nap* nudge (~30 min heads-up)." (FEATURE-INDEX, most-loved)
- Most-hated includes "notification spam (Glow)" and "ad/upsell spam even to paid users."
- Rigid-schedule anxiety: "a countdown you can't meet is stressful." Nudges must reassure, not scold.

## Competitor comparison
Huckleberry and Napper both send window reminders; reminders are listed as table-stakes in the master research. Glow is the cautionary tale for volume and upsell noise. No competitor combines a calm, opt-in nudge with a no-account, range-based framing.

## Our approach (spec)
One nudge type, off by default, opt-in per session: a "wind-down soon" heads-up a configurable lead time (default 30 min) before the *end* of the current wake-window range. Copy uses the range ("next nap window: 9:40–10:10"), never a single deadline, and never "you missed it." Delivered via the Web Notifications API + a service worker (PWA). No email, no SMS, no marketing — ever. A hard daily cap and quiet-hours respect prevent spam by construction.

## Scope — MVP
- Single "pre-nap wind-down" nudge, lead time 15/30/45 min.
- Web Push via service worker; graceful fallback to an in-page countdown when permission is denied or unsupported (iOS Safari requires the site be installed to Home Screen for push).
- Range-based, non-scolding copy; one accent, no red.

## Scope — later
- Optional bedtime and "last nap should start by" nudges.
- Per-caregiver device opt-in (ties to E04).
- "Snooze / not today" to suppress without disabling.

## Edge cases & gotchas
- iOS web push only works for Home-Screen-installed PWAs (iOS 16.4+); state this honestly and offer the in-page fallback.
- Backgrounded tabs may throttle timers — schedule via the service worker, not `setTimeout`.
- Time-zone / DST changes must recompute against the plan, not a fixed timestamp.
- No account means schedules are per-device; a nudge fires only where opted in.

## Evidence & citations
FEATURE-INDEX most-loved and most-hated lists; master research names reminders as table-stakes and Glow's notification spam as a landmine. Wake-window ranges are Tier 2 practice-based heuristic guidance (master research), so copy must frame windows as ranges.

## Effort
Medium. Service-worker push plumbing + permission UX is the bulk; scheduling logic reuses the existing plan.

## Risks / open questions
- iOS PWA push friction may frustrate users expecting native reliability.
- Should nudges persist across page close without an install? (Requires PWA install.)

## Success metric
Opt-in rate among users who view a plan, and low disable-after-first-nudge rate (proxy for "not spammy").

## Related features
F02 (widgets/Live Activities), F03 (Watch), F07 (offline mode), A05 (bedtime cap), G03 (anti-anxiety mechanics).
