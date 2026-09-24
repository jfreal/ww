# SEO Topic Clusters — wakewindows.guru

Source: OpenSEO MCP (DataForSEO), US / English, pulled 2026-08-21.
Method: 5 seed keyword-research calls (481 unique keywords) + a 65-keyword metrics
hydration + 3 live SERP checks. Search Console is **not connected** to the project,
so nothing here is first-party data — all volumes are third-party estimates.

Site today: one URL (`https://wakewindows.guru/`, SPA, single sitemap entry). Every
page below is new. KD = keyword difficulty 0-100.

## Headline finding

The money is in **age-indexed schedule pages**, not in generic "baby sleep" content.
Dozens of `{age} sleep schedule` and `{age} wake windows` queries have 1k–12k monthly
searches at **KD 0–7** — unusually soft. The app already computes exactly what those
searchers want (a clock-time nap plan), so each page can carry a pre-filled planner.

SERP evidence: `wake windows by age` and `6 month old sleep schedule` are won by
article pages (Cleveland Clinic, Huckleberry, Taking Cara Babies) and Reddit threads.
No calculator/tool ranks. So spokes must be **content pages with the tool embedded**,
not bare tool pages.

---

## Cluster 1 — Sleep schedule by age (highest volume, lowest difficulty)

Hub: `/sleep-schedule` — "Baby sleep schedules by age". The hub's table covers
every bracket to 24 months; spokes exist only for the ages listed below, and the
hub says so rather than implying a page per month.

| Spoke page | Keyword | Vol | KD |
|---|---|---|---|
| `/sleep-schedule/4-month-old` | 4 month old sleep schedule | 12,100 | 7 |
| `/sleep-schedule/6-month-old` | 6 month old sleep schedule | 12,100 | 0 |
| `/sleep-schedule/3-month-old` | 3 month old sleep schedule | 9,900 | 5 |
| `/sleep-schedule/5-month-old` | 5 month old sleep schedule | 9,900 | 0 |
| `/sleep-schedule/7-month-old` | 7 month old sleep schedule | 8,100 | 0 |
| `/sleep-schedule/newborn` | newborn sleep schedule | 8,100 | 40 |
| `/sleep-schedule/2-month-old` | 2 month old sleep schedule | 6,600 | 17 |
| `/sleep-schedule/8-month-old` | 8 month old sleep schedule | 6,600 | 0 |
| `/sleep-schedule/10-month-old` | 10 month old sleep schedule | 6,600 | 0 |
| `/sleep-schedule/11-month-old` | 11 month old sleep schedule | 5,400 | 4 |
| `/sleep-schedule/9-month-old` | 9 month old sleep schedule | 5,400 | 0 |
| `/sleep-schedule/12-month-old` | 12 month old sleep schedule | 3,600 | 0 |
| `/sleep-schedule/1-month-old` | 1 month old sleep schedule | 2,400 | 19 |
| `/sleep-schedule/18-month-old` | 18 month old sleep schedule | 2,400 | 0 |

Week-level long tail for the newborn spoke (own H2s or child pages):
6-week 1,300 (KD 2) · 8-week 880 (KD 19) · 7-week 880 (KD 7) · 10-week 720 (KD 0) ·
5-week 590 (KD 9) · 3-week 590 (KD 13) · 12-week 480 (KD 11) · 4-week 480 (KD 23) ·
9-week 390 (KD 7) · 11-week 390 (KD 9).

Page recipe: sample clock schedule table → wake windows for that age → total sleep
needs (cited) → the planner pre-filled to that age → "what changes next month" link
to the next spoke and to the relevant nap-transition page.

## Cluster 2 — Wake windows by age (brand-defining term)

Hub: `/wake-windows` — "Wake windows by age: chart + calculator"

| Spoke | Keyword | Vol | KD |
|---|---|---|---|
| hub | wake windows by age | 8,100 | 6 |
| hub | wake windows | 3,600 | 11 |
| `/wake-windows/4-month-old` | 4 month old wake windows | 6,600 | 0 |
| `/wake-windows/6-month-old` | 6 month old wake windows | 4,400 | 2 |
| `/wake-windows/9-month-old` | 9 month old wake windows | 2,900 | 0 |
| `/wake-windows/12-month-old` | 12 month old wake windows | 1,000 | 0 |
| `/wake-windows/newborn` | wake windows newborn | 720 | 1 |
| `/wake-windows/newborn` | newborn wake windows by week | 590 | 13 |
| `/wake-windows/chart` | wake window chart | 260 | 21 |
| FAQ block on hub | do wake windows include feeding time | 110 | 0 |

Note `4/6/9/12 month old wake windows` are tagged **transactional** intent — those
searchers want a tool, so keep the article format the SERPs reward and put the
planner above the prose rather than replacing it.

## Cluster 3 — Nap transitions (4→3→2→1)

Hub: `/nap-transitions` — matches the shipped A06 nap-transition detector.

| Spoke | Keyword | Vol | KD |
|---|---|---|---|
| `/nap-transitions/2-to-1` | 2 to 1 nap transition | 590 | 0 |
| `/nap-transitions/3-to-2` | 3 to 2 nap transition | 320 | 0 |
| `/nap-transitions/one-nap` | one nap schedule | 1,600 | 0 |
| `/nap-transitions/two-naps` | 2 nap schedule | 880 | 3 |
| `/nap-transitions/three-naps` | 3 nap schedule | 390 | 0 |
| section on hub | dropping from 2 naps to 1 | 320 | 0 |
| section on hub | 4 to 3 nap transition | 140 | 0 |

SERP for `2 to 1 nap transition` is Reddit + sleep consultants giving step plans
("push nap 15-30 min every few days"). Ship a day-by-day ramp the app can generate.

## Cluster 4 — Sleep regressions (biggest single query in the space)

Hub: `/sleep-regressions`

| Spoke | Keyword | Vol | KD |
|---|---|---|---|
| `/sleep-regressions/4-month` | 4 month sleep regression | 22,200 | 10 |
| hub | sleep regression | 18,100 | 17 |
| `/sleep-regressions/18-month` | 18 month sleep regression | 8,100 | 0 |
| `/sleep-regressions/8-month` | 8 month sleep regression | 8,100 | 0 |
| `/sleep-regressions/12-month` | 12 month sleep regression | 4,400 | 5 |
| also | 4 month old sleep regression | 1,900 | 1 |

The largest single query in the set (cluster 1 is bigger in total), and the one
furthest from what the app does today. Angle that keeps it honest: "is this a regression or just the wrong wake
window?" — send readers into the planner and the transition detector.

**Sourcing:** [`10-sleep-regressions-sourcing.md`](10-sleep-regressions-sourcing.md) lists every
claim each page would make, with sources, tiers and an evidence/convention label. Read it
before writing any page. In short: the 4-month brain change is solid, but no study shows a
4-month rise in waking. The motor-milestone link is real but small. The 12- and 18-month
"regressions" have no population evidence, and no study supports "2–6 weeks".

## Cluster 5 — Nap troubleshooting

Hub: `/nap-help` (feeds the existing sleep troubleshooter)

Members: contact naps (3,600 / KD 0), 4 month old nap length (170 / KD 0),
nap length by age (170 / KD 24), how many naps by age (50 / KD 16), plus five
that returned no volume estimate at all — short naps, catnapping, overtired
signs, early morning wakings, split nights. Real but small; treat as long tail.

## Cluster 6 — How much sleep does a baby need

Hub: `/sleep-needs` — total sleep per 24h by age, straight off the cited data the
app already ships (AASM / NSF / WHO / AAP).

Members: how much sleep for 3 month old (390 / KD 22), how much sleep for 6 month
old (390 / KD 22), how much sleep does a 6 month old need (1,000 / KD 28),
infant sleep times (480 / KD 44), how many hours of sleep 3 month old (210 / KD 28),
how long should a newborn be awake (720 / KD 14).
Higher KD than the schedule cluster — these are held by Cleveland Clinic, Sleep
Foundation, BabyCenter. Build it for citation/E-E-A-T, not for quick wins.

## Cluster 7 — Calculators (small volume, high commercial value)

`nap calculator` — 590 vol, KD 3, **CPC $1.42** (10-25x every other keyword here).
Also `wake window calculator` and `baby sleep calculator` (near-zero measured volume).
One `/calculator` page, **self-canonical and indexable** — canonicalising it to `/`
would hand its ranking to the app root and waste the page. It embeds the planner
and is linked from every spoke.

## Cluster 8 — Edge cases the app already handles

Thin on volume, strong on differentiation and internal linking:
preemie sleep schedule (50 / KD 0, matches the corrected-age feature),
daycare nap schedule (20 / KD 0), white noise for baby sleep (matches F05),
daylight saving time baby sleep, travel nap schedule.

---

## Internal linking rule

1. Every spoke links up to its hub and down to the planner.
2. Age spokes link to age±1 (a 4-month page should catch the 5-month searcher next month).
3. Age spokes link sideways to the transition and regression page for that age —
   4-month schedule ↔ 4-month regression ↔ 4-to-3 transition (the drop that is
   actually due around then; 3-to-2 belongs on the 6-8 month pages).
4. Hubs link to each other; the wake-windows hub is the site's semantic center.

## Build order

1. **Shipped** — Cluster 1 in full: the hub plus 14 age spokes (newborn, 1-12 and
   18 months, ~100k combined volume, most of it at KD 0-7).
2. **Shipped** — Cluster 2: the `/wake-windows/` hub, a chart page, and the four
   transactional age spokes plus newborn.

   Both are generated from the app's models by `src/content/` and emitted at build
   time. See `../features/H01-static-content-pages.md`.
3. Cluster 3 — nap transitions (content already exists in the A06 feature).
4. Cluster 4 — sleep regressions: biggest volume, hardest editorially, needs real
   sourcing before a word of it is written.
5. Clusters 5-8 as fill.

## Prerequisites

- ~~The site is a single-route SPA.~~ Solved without a router: the content pages
  are emitted as static HTML by a Vite plugin (`wakeWindowsContentPages` in
  `vite.config.ts`), so the app stays a single-route SPA and the pages render
  with no JavaScript at all.
- ~~`public/sitemap.xml` has one URL~~ — now generated from the emitted routes.
- **Still open:** connect Search Console to the OpenSEO project. Without it there
  is no *first-party query data* — no impressions, positions, or indexed-page
  count. Netlify analytics, server logs, and third-party rank tracking can still
  show traffic and rankings, but not what a page is being shown for.
