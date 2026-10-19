---
title: Static Content Pages (SEO topic cluster)
sidebar_label: Static content pages
id: H01-static-content-pages
docKey: static-content-pages
category: Reach & Discovery
priority: P1
status: Built
tags: [seo, content, discovery, no-js, static]
---

# Static Content Pages (SEO topic cluster)

**Verdict:** confirmed gap in *our* funnel, not in the market. Every competitor ranks for `{age} sleep schedule`; we had one indexable URL.

## Problem / user need
A parent looking for help does not search for a planner. They search for their baby's age: `4 month old sleep schedule`, `6 month old sleep schedule`, `wake windows by age`. The app answers those questions better than the articles that rank for them — and was invisible to all of them, because the whole site was a single client-rendered route with a one-entry sitemap.

## Evidence
OpenSEO / DataForSEO pull, US + English, 2026-08-21 (full working: `../research/seo-topic-clusters.md`):

| Query | Volume/mo | KD |
|---|---|---|
| 4 month old sleep schedule | 12,100 | 7 |
| 6 month old sleep schedule | 12,100 | 0 |
| 3 month old sleep schedule | 9,900 | 5 |
| 5 month old sleep schedule | 9,900 | 0 |
| 7 month old sleep schedule | 8,100 | 0 |

Live SERP checks for `wake windows by age` and `6 month old sleep schedule` return article pages (Cleveland Clinic, Huckleberry, Taking Cara Babies) and Reddit threads. **No calculator ranks on page one.** That decided the page type: an article that shows the finished day, with the planner as the call to action rather than as the page.

## Our approach (spec)
- Two clusters. `/sleep-schedule/` — one hub, one spoke per age. `/wake-windows/` — one hub, a chart page, and a spoke per age for the keywords research tagged **transactional** (those pages lead with the range and the planner; the prose sits underneath).
- Pages are **generated from the app's own models**, not hand-written: the sample day is walked through `ScheduleSetting`, and every published range comes from the Tier-1 bracket in `SleepRecommendations`. `agePages.test.ts` asserts each sample day sits inside its own age bracket, so a page cannot claim something the app would flag as out of range.
- Emitted as static HTML at build time by the `wake-windows-content-pages` plugin in `vite.config.ts`. No router, no SSG framework, nothing added to the client bundle — the app stays a single-route SPA.
- `sitemap.xml` is generated from the emitted routes (it used to be a hand-maintained file listing `/`).
- The CTA deep-links into the planner with the day pre-loaded (`/?s=7-1.5/1.75/1.75/2/2-7.5`), parsed by the existing `applyPlanParams`.
- `src/sw.ts` denylists `/sleep-schedule/*` and `/wake-windows/*` from the SPA navigation fallback, so an installed PWA gets the article and not the app shell. The pages are still precached, so they work offline. **Any new cluster must be added to that denylist.**
- The clusters cross-link: each age page points at the wake-window page for its age and vice versa, and a test asserts the two never publish different windows for the same age.

## Brand filter
- **Show your work.** Every page carries the Tier-1 sources and states plainly that "wake window" is a Tier-2 practice-based heuristic, not a term from the sleep-medicine literature.
- **Ranges, not a stopwatch.** Nap times print as windows rounded to 5-minute marks; the copy says anywhere inside the window counts.
- **No account, no AI, no ad trackers.** The pages are plain HTML with no third-party fonts. The one script they load is `/gtag-init.js`, which loads Google Analytics for page-view counts, and only on the production host (`wakewindows.guru`): page and referrer go out as path only, and Google signals and ad-personalization signals are off. The disclosure lives with the privacy promise in [G01](G01-no-account-privacy-first.md).

## Scope — shipped
- **Cluster 1** — hub + 14 age spokes: newborn, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 and 18 months.
- **Cluster 2** — hub, chart page, and 5 wake-window spokes: newborn, 4, 6, 9 and 12 months.
- Article, FAQPage, and BreadcrumbList structured data per page; canonical, OG, and Twitter meta.
- Dev-server middleware so the pages render under `npm run dev`, not only after a build.

## Why the ages were split into two tranches
Fourteen pages generated from one template, with only the numbers swapped, is what Google's scaled-content-abuse policy is aimed at. The generator supplies the numbers; the intro, the "what changes next" paragraph, and all three FAQs are written per age. That is the line between a useful set of pages and a doorway set, and it is the reason adding an age is a writing job, not a config change.

## Not in scope yet
The remaining clusters in `../research/seo-topic-clusters.md`: nap transitions, sleep regressions, nap troubleshooting, the total-sleep-needs cluster, and the calculator page. The regressions cluster is the highest-volume one left (`4 month sleep regression`, 22,200/mo) and the furthest from anything the app computes — it is YMYL content that needs sources gathered before it is written, not another renderer.

## Measurement
Search Console is **not connected** to the OpenSEO project, so there is currently no first-party way to see whether any of this lands. Connecting it is the prerequisite for judging what to build next — and for telling an indexed page from a written one.

## Where it lives
- `src/content/agePages.ts` — cluster-1 definitions and the model-derived schedule
- `src/content/wakeWindowPages.ts` — cluster-2 definitions, borrowing each age's windows from cluster 1
- `src/content/renderContentPage.ts` — HTML, structured data, sitemap
- `vite.config.ts` — `wakeWindowsContentPages()` (build emit + dev middleware, plus `homepageLinkLists`, which fills the homepage's static link lists in `index.html` from the same page data)
- `e2e/static-content-pages.spec.ts` — no-JS render, canonical, CTA round-trip, SW fallback
