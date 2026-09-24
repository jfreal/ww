# 10 — Sleep Regressions: Claim-by-Claim Sourcing (Cluster 4)

**Scope:** the five planned `/sleep-regressions` pages: the hub, 4-month, 8-month, 12-month and 18-month.
**Purpose:** step 1 of [#32](https://github.com/jfreal/ww/issues/32). It lists every claim those pages would make and attaches sources and a tier to each one. It also labels whether each claim is evidence or convention. No page may be written until its claims appear here.
**Status:** sourcing only. The page build waits on the indexing check in #27. #27 is blocked on connecting Search Console (#26).
**Last researched:** 2026-09-24. Every source marked ✔ was opened on PubMed, the DOI page or the publisher page on that date. Sources marked ✘ were not opened and must not be cited until someone checks them.

---

## Tiers and labels used here

**Tiers** follow the app's scheme in `src/data/citations.json` and `public/llms.txt`:

| Tier | Meaning |
|---|---|
| **T1** | Evidence-based: consensus guideline, or peer-reviewed normative or primary data. |
| **T2** | Practice-based heuristic: a consultant or parenting framework, or a commercial blog. |
| **T3** | Practitioner convention: a plausible mechanism with no direct study. |

The older research docs (`00`, `01`) use a different split (T2 = cohort studies, T3 = heuristics). This doc does not use that split. A cohort study here is T1.

**Claim labels.** A tier describes a *source*. A label describes a *claim*, meaning whether the sources actually back the sentence the page would print.

| Label | Meaning | What the page may do |
|---|---|---|
| **EVIDENCE** | A T1 source directly supports the claim as worded. | State it and cite it. |
| **PARTIAL** | T1 supports a narrower version, such as a smaller group, a different age or a correlation only. | Use the narrowed wording given in the table, not the popular version. |
| **CONVENTION** | Widely repeated and plausible, but no study found. | Say "commonly described" and label it as convention. Never put it under a T1 badge. |
| **NO SOURCE** | Searched and found nothing. | Say plainly that no study shows this, or drop the claim. |
| **CONTRADICTED** | T1 evidence points the other way. | Do not say it. If readers are likely to believe it, say what the evidence shows instead. |

---

## Headline findings

1. **"Sleep regression" is not a clinical term, and no study has tested it.** PubMed returns zero title or abstract hits for the phrase. The AASM insomnia classification (ICSD-3-TR) never uses it. The only peer-reviewed mention found (Lenehan 2023) reports it as a label that parents and "some experts" use, and backs it with a Sleep Foundation web page.
2. **The 4-month brain change is real. A 4-month *rise in waking* is not documented.** The EEG and circadian maturation at 2–6 months is solid T1. However, no cohort shows night waking going *up* across babies at 3–5 months. Scher 1991 found regular waking *fell* from 3 to 6 months, then rose at 9 months; it measured every 3 months, so a brief rise in between cannot be ruled out. Gilchrist 2025 found no sustained rise at 3–5 months. The 4-month page must separate what the brain does from what the sleep diary shows.
3. **The best-supported "regression" is the motor one, not the calendar one.** Crawling, pulling to stand and walking each line up with a short stretch of worse sleep in small actigraphy studies. The link is to the *milestone*, whenever it happens, not to an age.
4. **No study shows that separation anxiety causes night waking.** Separation distress does peak around 9–13 months (Kearsley 1975). No study found here tested whether the baby's separation distress causes waking. The nearby findings are narrower: the baby's *attachment classification* did not predict night waking (Scher 2001, Weinraub 2012), and better object permanence went with *fewer* sleep problems (Scher 2000). The only positive links involve the *mother's* separation anxiety.
5. **No study supports a 12-month or an 18-month regression.** Large cohorts show waking declining overall: Weinraub 2012 (n≈1,200, measured at 6, 15, 24 and 36 months) and Hysing 2014 (n=55,831, 6 to 18 months). Their measurements are months apart, so they cannot rule out a brief rise near either age. They do show that no such rise is visible at the ages measured.
6. **"Lasts 2–6 weeks" has no source at any age.** It appears only in commercial blogs. The motor studies show timing that differs from baby to baby.
7. **The site's angle, "is this a regression, or is the wake window wrong?", is only partly supported.** One study of 1.5-year-olds (Nakagawa 2016) links longer and later naps to shorter, later night sleep. Nothing under 12 months links nap timing to night *waking*, and wake windows themselves are T2 in the app. The pages can use the planner as a thing to check, never as a diagnosis.

### Corrections to content that is already shipped

These affect shipped content, not the new pages. They are recorded here so the new pages do not copy them.

| Where | Current claim | What the sourcing found |
|---|---|---|
| `RegressionExplainer.vue` (4-month card, T1 badge); `02` §6; B06 spec | Cycles are "~45–60 min" | Measured: about 62 min at 3 months (95% CI 56–67), lengthening about 10 min by 12 months (Hammad 2026). "About an hour" or "about 50–60 min" is defensible. The "45" figure has no source. |
| Same card; `02` §6–7; B06 spec | Change "smooths out over about 2–6 weeks" | NO SOURCE. It is shown under a T1 badge today. |
| `RegressionExplainer.vue` (8–10 month card, T1 badge) | Separation anxiety, from object permanence, drives the night wakings | Onset age: supported. Causal link to waking: no study found (see E4 in the 8-month table). The crawling part of the card is fine. |
| `02` §7 | "Only the 4-month change has a clear, universal biological driver" | The EEG driver is universal. A behavioural regression at 4 months is not documented at population level (Scher 1991, Gilchrist 2025). |
| `02` §6 (unsourced in text) | K-complexes as part of the 4-month change | AASM: K-complexes first appear about 5 months post-term and are usually present by 6 months (Grigg-Damberger 2007), not "4–6 months". |

---

## Hub — `/sleep-regressions`

| # | Claim the page would make | Label | Sources (tier) | Wording constraint |
|---|---|---|---|---|
| H1 | "Sleep regression" is a popular label, not a medical diagnosis. | EVIDENCE | `aasm-icsd3tr-2022` (T1), `lenehan-2023` (T1), PubMed search 2026-09-24 | Safe to say directly. |
| H2 | Night waking is normal and common through year one and into year two. | EVIDENCE | `weinraub-2012`, `pennestri-2018`, `hysing-2014`, `galland-2012`, `goodlin-jones-2001` (all T1) | Give ranges. For example, 28–57% of 6- and 12-month-olds do not sleep 6–8 h straight (Pennestri 2018). |
| H3 | Not sleeping through the night is not linked to worse development or maternal mood. | EVIDENCE | `pennestri-2018` (T1) | One cohort (n=388); cite it as that. |
| H4 | Across babies, waking falls with age, but not smoothly for everyone. | EVIDENCE | `weinraub-2012`, `hysing-2014`, `henderson-2010` (T1) | In Weinraub, 34% were "transitional sleepers" who woke nightly at 6 months and improved by 15–24 months. |
| H5 | The brain's sleep system matures in one direction over the first two years. | EVIDENCE | `grigg-damberger-2007`, `louis-1997`, `lenehan-2023` (T1) | "Brain maturation only moves forward." Do not extend this to behaviour, which can go back and forth. |
| H6 | New motor skills often come with a short stretch of worse sleep. | PARTIAL | `scher-cohen-2005`, `scher-2015`, `atun-einy-2016`, `demasi-2023` (T1) | Small samples (n=20–107). Tie it to the skill, not an age. |
| H7 | Illness disrupts sleep. | PARTIAL | `weinraub-2012` (T1), `laine-2010` (T1) | Illness predicted waking in Weinraub. Restless sleep is common in sick toddlers, but it cannot tell an ear infection from a cold (Laine). No study compares a sick week with the same child's normal weeks. |
| H8 | Teething disrupts sleep. | PARTIAL | `macknin-2000` (T1), `massignan-2016` (T1, ✘ for the sleep figure) | Macknin: "wakefulness" rose slightly in an 8-day window around eruption, but "sleep disturbance" did not. No symptom affected more than 35% of teething babies. Keep it small and brief. |
| H9 | Too much or badly timed day sleep can look like a regression. | PARTIAL | `nakagawa-2016` (T1), `nakagawa-2021` (T1), `lassonde-2016` (T1) | Toddler data only (1.5 y; Lassonde 2.5–3 y). Longer and later naps go with shorter and later night sleep. No study links nap timing to night *waking*, or covers under-12-month-olds. |
| H10 | Wake windows are a practitioner heuristic. | EVIDENCE (that it is a heuristic) | `canapari-critique` (T2), `gilchrist-2025-frontiers` (T1), app tier scheme | Keep the app's T2 badge on any wake-window number. |
| H11 | "Regressions" last 2–6 weeks. | NO SOURCE | Commercial blogs only | Do not state a duration. |
| H12 | Every baby has regressions at set ages. | CONTRADICTED | `weinraub-2012`, `hysing-2014`, `scher-1991` | In Weinraub, 66% of babies woke about one night a week at every age measured. Say that many babies show no setback at the ages studied. |

---

## `/sleep-regressions/4-month` (22,200/mo, the largest query in the set)

| # | Claim | Label | Sources (tier) | Wording constraint |
|---|---|---|---|---|
| F1 | Sleep spindles appear in the first 2–3 months. | EVIDENCE | `grigg-damberger-2007`, `grigg-damberger-2016` (T1) | Spindles appear about 4–8 weeks post-term and are usually present by 2–3 months. |
| F2 | By about 4–4.5 months, NREM sleep can be scored as adult-style stages (N1/N2/N3). | EVIDENCE | `grigg-damberger-2007` (T1) | Use "adult-style stages", not "adult sleep". |
| F3 | K-complexes (another adult sleep-EEG marker) appear about 5–6 months. | EVIDENCE | `grigg-damberger-2007` (T1) | Not "4 months". |
| F4 | Slow-wave (deep) sleep appears from about 5 months (week 21). | EVIDENCE | `ficca-2000` (T1) | Abstract-level check only. |
| F5 | The body-clock hormone melatonin starts a day–night rhythm at about 9–12 weeks. | EVIDENCE | `kennaway-1992`, `kennaway-1996`, `joseph-2015`, `mcgraw-1999`, `rivkees-2007` (T1) | Preterm babies run about 9 weeks later; use adjusted age. |
| F6 | Infant sleep cycles are about an hour long, shorter than an adult's. | EVIDENCE | `hammad-2026` (T1) | About 62 min at 3 months, lengthening by about 10 min by 12 months (actigraphy, n=152). Not "45 min". |
| F7 | Babies wake briefly between cycles at every age; settling back alone is the skill that develops. | EVIDENCE | `goodlin-jones-2001`, `burnham-2002`, `henderson-2020` (T1) | Half of 12-month-olds still needed a parent to resettle (Goodlin-Jones). Keep the reassurance. |
| F8 | These brain changes only go one way; they do not reverse. | EVIDENCE | `grigg-damberger-2007`, `louis-1997`, `lenehan-2023` (T1) | The *brain* part only. This is the honest core of the "progression, not regression" framing. |
| F9 | Across babies, night waking rises around 4 months. | NO SOURCE | `scher-1991`, `gilchrist-2025-frontiers`, `henderson-2020`, `mindell-2016-app` (T1) | Scher: regular waking was 46% at 3 months and 39% at 6 months (measured 3 months apart). Gilchrist: actigraphy waking peaked about 12 weeks, then fell. The page must say population studies have not shown the rise. It must not say they ruled it out. |
| F10 | Some individual babies' sleep changes noticeably around 3–5 months. | CONVENTION | Newcastle NHS trust page (T3), `sleepfoundation-4mo-regression` (T2) | Frame it as "many parents notice", not as a measured event. Pair it with F9. |
| F11 | Before 6 months, waking patterns vary widely from baby to baby. | EVIDENCE | `bruni-2014`, `galland-2012` (T1) | Bruni: variable before 6 months, stable from 6 to 12 months. |
| F12 | The change lasts 2–6 weeks. | NO SOURCE | Commercial blogs only | Do not state a duration. |
| F13 | The AAP says regular sleep cycles arrive around 4 months. | EVIDENCE | `aap-getting-baby-to-sleep` (T1) | The AAP page does not use the word "regression". Worth saying. |

**Page shape this supports:** "Your baby's brain did change around now. That part is real and permanent. Whether *sleep* got worse varies by baby, and studies of many babies do not show a 4-month dip." This is more honest than what ranks today, and it is fully sourced.

---

## `/sleep-regressions/8-month` (8,100/mo)

| # | Claim | Label | Sources (tier) | Wording constraint |
|---|---|---|---|---|
| E1 | Starting to crawl is linked to more night waking for a while. | EVIDENCE | `scher-cohen-2005` (n=107, cross-sectional), `scher-2015` (n=28, longitudinal), `berger-moore-2021`, `waugh-berger-2026` (T1) | Small samples. Say "linked to", not "causes". Waugh & Berger: the senior author advises Nanit; disclose if cited. |
| E2 | Pulling to stand is linked to disrupted sleep. | PARTIAL | `atun-einy-2016` (T1, n=20) | Only in babies who pulled to stand early (by 8 months). |
| E3 | Crying at separation rises around 9–13 months. | EVIDENCE | `kearsley-1975` (T1), `aap-separation-anxiety-ease` (T1 guidance) | Peaks at 9½ and 13½ months (Kearsley, n=52). AAP: usually about 9 months, sometimes 4–5. Say "around", not a fixed age. |
| E4 | Separation anxiety causes the night waking. | NO SOURCE | No study found that tests the baby's separation distress against night waking. The AAP sleep page asserts the link with no data (`aap-separation-anxiety-sleep`). Narrower findings only: attachment *classification* did not predict waking (`scher-2001`, `weinraub-2012`), and better object permanence went with fewer sleep problems (`scher-2000-object`) (T1). | Do not state the link as fact. At most: "often blamed, but not tested; studies found the baby's attachment type did not predict waking". |
| E5 | A parent's own separation anxiety is linked to more infant waking. | PARTIAL | `scher-blumberg-1999`, `scher-2008` (T1) | Correlational. Handle with care; never imply the parent caused it. Probably leave it off the page. |
| E6 | Waking at 6–12 months is common. | EVIDENCE | `pennestri-2018`, `weinraub-2012`, `scher-1991`, `chandyo-2024` (T1) | Scher 1991: regular waking was 58% at 9 months. This is the one age where a rise *is* documented. |
| E7 | Breastfeeding, a more difficult temperament and maternal depression predict ongoing waking at this age. | EVIDENCE | `weinraub-2012` (T1) | Correlates, not causes. Breastfeeding must not read as a problem to fix. Leave it off unless handled with care. |
| E8 | The 3→2 nap transition (about 7–9 months) disrupts sleep. | NO SOURCE | PubMed: 0 hits. `weissbluth-1995` covers timing only. | The transition's *timing* is T1-adjacent. Its effect on night sleep is convention. |
| E9 | The "8–10 month regression" is a studied event. | NO SOURCE | Europe PMC full text: 0 hits for "8-month sleep regression" | Present it as a popular label. |
| E10 | It lasts 2–6 weeks. | NO SOURCE | Blogs only | Do not state a duration. |

**Page shape this supports:** "8 months is when the motor evidence is strongest. If your baby just started crawling or pulling up, a rough patch is common and usually tied to the skill. The separation-anxiety story is popular but has not been tested."

---

## `/sleep-regressions/12-month` (4,400/mo)

| # | Claim | Label | Sources (tier) | Wording constraint |
|---|---|---|---|---|
| T1 | Learning to walk is linked to a stretch of worse sleep. | EVIDENCE (small) | `demasi-2023` (T1, n=78), `waugh-berger-2026` (T1) | Tie it to walking onset, whenever it happens (often 9–15 months), not to the birthday. |
| T2 | The 2→1 nap transition often starts around 12–18 months. | PARTIAL | `weissbluth-1995`, `staton-2020` (T1) | Weissbluth: consolidation to one nap happens by 15–24 months. Say "12–18 months, often later". "Starts at 12 months" is too early as a rule. |
| T3 | There is a population-level sleep setback at about 12 months. | NO SOURCE | `weinraub-2012` (T1, measured at 6 and 15 months), `hysing-2014` (T1, 6 to 18 months) | Waking declines overall between the ages measured. Those ages are months apart, so a brief rise near 12 months is not ruled out. Say "studies of many babies have not found one", not "there isn't one". |
| T4 | Many 12-month-olds still wake at night, and that is normal. | EVIDENCE | `pennestri-2018`, `lenehan-2023`, `scher-2001`, `goodlin-jones-2001` (T1) | Lenehan: 72% slept 6 h or more straight at 12 months, and 57% slept 8 h or more. |
| T5 | Teething at this age causes sleep problems. | PARTIAL | `macknin-2000` (T1) | Covers 4–12 months. The effect is small and brief. |
| T6 | It lasts 2–6 weeks. | NO SOURCE | Blogs only | Do not state a duration. |

**Page shape this supports:** a short, honest page. "There is no 12-month regression in the research. If sleep changed, look at walking, the nap schedule, illness or teething." It routes to the planner and the transition detector. The page may be thin, and that is acceptable (see Open questions).

---

## `/sleep-regressions/18-month` (8,100/mo)

| # | Claim | Label | Sources (tier) | Wording constraint |
|---|---|---|---|---|
| X1 | There is a population-level sleep setback at about 18 months. | NO SOURCE | `hysing-2014` (T1, 6→18 months), `weinraub-2012` (T1, measured at 15 and 24 months) | Waking declines overall across this age. The measurements are months apart, so a brief rise is not ruled out. Same wording rule as T3. |
| X2 | Most children are on one nap by about 15–24 months, and the switch can unsettle sleep. | PARTIAL | `weissbluth-1995`, `staton-2020` (T1) | The *timing* is EVIDENCE. The idea that the switch unsettles sleep is CONVENTION. |
| X3 | First molars come in around 13–19 months. | EVIDENCE | `ada-tooth-chart` (T1) | Upper 13–19 months, lower 14–18 months; canines 16–23 months. |
| X4 | Molars cause bad sleep. | NO SOURCE | `macknin-2000` covers under-12-month-olds only | Say teething effects are small and brief in the one prospective study, which did not cover molars. |
| X5 | Separation anxiety usually fades by about age 2. | EVIDENCE (guidance) | `aap-separation-anxiety-sleep` (T1 guidance) | AAP guidance without data. Pair it with E4's caveat. |
| X6 | A language burst at about 18 months disrupts sleep. | PARTIAL | `waugh-berger-2026` (T1, single study, disruption around new-word milestones) | Do not say "the language explosion causes the regression". One new study links new words with disrupted sleep. `dionne-2011` does not bear on this: it tested whether earlier sleep predicts later language, not whether learning words disrupts sleep. |
| X7 | Walking mastery is linked to sleep changes. | PARTIAL | `demasi-2023`, `waugh-berger-2026` (T1) | Most children walk well before 18 months, so this is weak for this age. |
| X8 | Night waking is still common at 18 months. | EVIDENCE | `jenkins-1984`, `hysing-2014`, `sadeh-2009` (T1) | Jenkins: about half of night-wakers persist from 12 to 18 months and from 18 to 24 months. The data is old; pair it with Hysing. |
| X9 | Bedtime resistance rises at 18–24 months. | NO SOURCE (age-specific) | No normative prevalence found for 18–24 months | AAP "Toddler bedtime trouble" guidance may be cited as advice, not as a rate. |
| X10 | It lasts 2–6 weeks. | NO SOURCE | Blogs only | Do not state a duration. |

**Page shape this supports:** the same honest frame as the 12-month page, plus molars, the 2→1 nap transition and separation anxiety as things that are *actually happening* around this age. Each carries its own label.

---

## Source register

**✔** = opened on 2026-09-24. **JSON** = added to `src/data/citations.json` in this change. **held** = already in `citations.json`. **doc** = recorded here only (see "Why not all in JSON" below).

### Peer-reviewed and clinical (T1)

| ID | Citation | Design | Where | Check |
|---|---|---|---|---|
| `grigg-damberger-2007` | Grigg-Damberger M, et al. The visual scoring of sleep and arousal in infants and children. *J Clin Sleep Med* 2007;3(2):201–40. [PMID 17557427](https://pubmed.ncbi.nlm.nih.gov/17557427/) | AASM scoring task-force review | JSON | ✔ abstract |
| `grigg-damberger-2016` | Grigg-Damberger MM. The visual scoring of sleep in infants 0 to 2 months of age. *J Clin Sleep Med* 2016;12(3):429–45. [doi:10.5664/jcsm.5600](https://doi.org/10.5664/jcsm.5600) | Review for AASM rules | doc | ✔ abstract |
| `louis-1997` | Louis J, Cannard C, Bastuji H, Challamel MJ. Sleep ontogenesis revisited… *Sleep* 1997;20(5):323–33. [doi:10.1093/sleep/20.5.323](https://doi.org/10.1093/sleep/20.5.323) | Home PSG, n=15, 3–24 months | doc | ✔ abstract |
| `ficca-2000` | Ficca G, Fagioli I, Salzarulo P. Sleep organization in the first year of life… *J Sleep Res* 2000;9(1):1–4. [doi:10.1046/j.1365-2869.2000.00172.x](https://doi.org/10.1046/j.1365-2869.2000.00172.x) | PSG, n=48, 1–54 weeks | doc | ✔ abstract |
| `hammad-2026` | Hammad G, Schoch SF, Engelmann M, Spock Z, Kurth S, Winnebeck EC. Charting infant sleep cycle development using actigraphy… *Sleep* 2026 (advance), zsag161. [doi:10.1093/sleep/zsag161](https://doi.org/10.1093/sleep/zsag161) | Actigraphy, n=152, at 3, 6 and 12 months | JSON | ✔ |
| `kennaway-1992` | Kennaway DJ, Stamp GE, Goble FC. Development of melatonin production in infants and the impact of prematurity. *J Clin Endocrinol Metab* 1992;75(2):367–9. [doi:10.1210/jcem.75.2.1639937](https://doi.org/10.1210/jcem.75.2.1639937) | Urinary melatonin metabolite, term and preterm | JSON | ✔ abstract |
| `kennaway-1996` | Kennaway DJ, Goble FC, Stamp GE. Factors influencing the development of melatonin rhythmicity in humans. *J Clin Endocrinol Metab* 1996;81(4):1525–32. [doi:10.1210/jcem.81.4.8636362](https://doi.org/10.1210/jcem.81.4.8636362) | n=163 | doc | ✔ abstract |
| `joseph-2015` | Joseph D, et al. Getting rhythm: how do babies do it? *Arch Dis Child Fetal Neonatal Ed* 2015;100(1):F50–4. [doi:10.1136/archdischild-2014-306104](https://doi.org/10.1136/archdischild-2014-306104) | n=35, 6–18 weeks | doc | ✔ abstract |
| `scher-1991` | Scher A. A longitudinal study of night waking in the first year. *Child Care Health Dev* 1991;17(5):295–302. [doi:10.1111/j.1365-2214.1991.tb00699.x](https://doi.org/10.1111/j.1365-2214.1991.tb00699.x) | Longitudinal, n=118, 3–12 months | JSON | ✔ abstract |
| `goodlin-jones-2001` | Goodlin-Jones BL, Burnham MM, Gaylor EE, Anders TF. Night waking, sleep-wake organization, and self-soothing in the first year of life. *J Dev Behav Pediatr* 2001;22(4):226–33. [doi:10.1097/00004703-200108000-00003](https://doi.org/10.1097/00004703-200108000-00003) | Videosomnography, n=80, 3–12 months | JSON | ✔ abstract |
| `burnham-2002` | Burnham MM, Goodlin-Jones BL, Gaylor EE, Anders TF. *J Child Psychol Psychiatry* 2002;43(6):713–25. [doi:10.1111/1469-7610.00076](https://doi.org/10.1111/1469-7610.00076) | Longitudinal videosomnography, n=80 | doc (same study as `02` §5, PMC1201414) | ✔ abstract |
| `henderson-2020` | Henderson JMT, Blampied NM, France KG. Longitudinal study of infant sleep development… *Nat Sci Sleep* 2020;12:949–57. [doi:10.2147/NSS.S240075](https://doi.org/10.2147/NSS.S240075) | Diaries, n=52, 1–12 months | doc | ✔ |
| `bruni-2014` | Bruni O, et al. Longitudinal study of sleep behavior in normal infants during the first year of life. *J Clin Sleep Med* 2014;10(10):1119–27. [PMID 25317093](https://pubmed.ncbi.nlm.nih.gov/25317093/) | Interviews, n=704 | doc | ✔ abstract |
| `scher-cohen-2005` | Scher A, Cohen D. Locomotion and nightwaking. *Child Care Health Dev* 2005;31(6):685–91. [doi:10.1111/j.1365-2214.2005.00557.x](https://doi.org/10.1111/j.1365-2214.2005.00557.x) | Cross-sectional, n=107, 5–8 months | JSON | ✔ abstract |
| `atun-einy-2016` | Atun-Einy O, Scher A. Sleep disruption and motor development: Does pulling-to-stand impacts sleep–wake regulation? *Infant Behav Dev* 2016;42:36–44. [doi:10.1016/j.infbeh.2015.11.003](https://doi.org/10.1016/j.infbeh.2015.11.003) | Actigraphy, n=20, 7–12 months | JSON | ✔ abstract |
| `berger-moore-2021` | Berger SE, Moore CT. A time series analysis of the relation between motor skill acquisition and sleep in infancy. *Infant Behav Dev* 2021;65:101654. [doi:10.1016/j.infbeh.2021.101654](https://doi.org/10.1016/j.infbeh.2021.101654) | Daily diaries, 3 families | doc | ✔ abstract |
| `demasi-2023` | DeMasi A, Horger MN, Scher A, Berger SE. Infant motor development predicts the dynamics of movement during sleep. *Infancy* 2023;28(2):367–87. [doi:10.1111/infa.12519](https://doi.org/10.1111/infa.12519) | Actigraphy, n=78, around walking onset | JSON | ✔ abstract |
| `waugh-berger-2026` | Waugh M, Berger SE. Infants' sleep supports the emergence and mastery of locomotor and linguistic skills. *Dev Psychobiol* 2026;68(5):e70187. [doi:10.1002/dev.70187](https://doi.org/10.1002/dev.70187) | Changepoint analysis, app and monitor data | doc (n not confirmed; senior author advises Nanit) | ✔ abstract |
| `scher-2001` | Scher A. Attachment and sleep: a study of night waking in 12-month-old infants. *Dev Psychobiol* 2001;38(4):274–85. [doi:10.1002/dev.1020](https://doi.org/10.1002/dev.1020) | n=94; actigraphy in 37 | JSON | ✔ abstract |
| `scher-2000-object` | Scher A, Amir T, Tirosh E. Object concept and sleep regulation. *Percept Mot Skills* 2000;91(2):402–4. [doi:10.2466/pms.2000.91.2.402](https://doi.org/10.2466/pms.2000.91.2.402) | Brief report, n=83, 9 months | doc | ✔ abstract |
| `scher-blumberg-1999` | Scher A, Blumberg O. Night waking among 1-year olds: a study of maternal separation anxiety. *Child Care Health Dev* 1999;25(5):323–34. [doi:10.1046/j.1365-2214.1999.00099.x](https://doi.org/10.1046/j.1365-2214.1999.00099.x) | n=81, 6 and 12 months | doc | ✔ abstract |
| `scher-2008` | Scher A. Maternal separation anxiety as a regulator of infants' sleep. *J Child Psychol Psychiatry* 2008;49(6):618–25. [doi:10.1111/j.1469-7610.2007.01872.x](https://doi.org/10.1111/j.1469-7610.2007.01872.x) | n=52, 10 months | doc | ✔ abstract |
| `kearsley-1975` | Kearsley RB, Zelazo PR, Kagan J, Hartmann R. Separation protest in day-care and home-reared infants. *Pediatrics* 1975;55(2):171–5. [PMID 1118207](https://pubmed.ncbi.nlm.nih.gov/1118207/) | n=52, 3½–20 months | doc | ✔ abstract |
| `brooker-2013` | Brooker RJ, et al. The development of stranger fear in infancy and toddlerhood… *Dev Sci* 2013;16(6):864–78. [doi:10.1111/desc.12058](https://doi.org/10.1111/desc.12058) | Twin cohort, N=1,285, 6–36 months | doc (measures stranger fear, not separation distress, so it is not used for E3) | ✔ abstract |
| `weinraub-2012` | Weinraub M, et al. Patterns of developmental change in infants' nighttime sleep awakenings from 6 through 36 months of age. *Dev Psychol* 2012;48(6):1511–28. [doi:10.1037/a0027680](https://doi.org/10.1037/a0027680) | NICHD SECCYD, n≈1,200 | JSON | ✔ abstract |
| `pennestri-2018` | Pennestri MH, et al. Uninterrupted infant sleep, development, and maternal mood. *Pediatrics* 2018;142(6):e20174330. [doi:10.1542/peds.2017-4330](https://doi.org/10.1542/peds.2017-4330) | Cohort, n=388 | JSON | ✔ abstract |
| `hysing-2014` | Hysing M, et al. Trajectories and predictors of nocturnal awakenings and sleep duration in infants. *J Dev Behav Pediatr* 2014;35(5):309–16. [doi:10.1097/DBP.0000000000000064](https://doi.org/10.1097/DBP.0000000000000064) | MoBa cohort, n=55,831, 6–18 months | JSON | ✔ abstract |
| `chandyo-2024` | Chandyo RK, et al. Sleep characteristics and changes in sleep patterns among infants in Bhaktapur, Nepal. *Sleep Health* 2024;10(3):279–85. [PMID 38519363](https://pubmed.ncbi.nlm.nih.gov/38519363/) | Cohort, n=735 | doc | ✔ abstract |
| `jenkins-1984` | Jenkins S, et al. Continuities of common behaviour problems in preschool children. *J Child Psychol Psychiatry* 1984;25(1):75–89. [doi:10.1111/j.1469-7610.1984.tb01720.x](https://doi.org/10.1111/j.1469-7610.1984.tb01720.x) | Longitudinal, 1–3 years | doc | ✔ abstract |
| `sadeh-2009` | Sadeh A, Mindell JA, Luedtke K, Wiegand B. Sleep and sleep ecology in the first 3 years: a web-based study. *J Sleep Res* 2009;18(1):60–73. [doi:10.1111/j.1365-2869.2008.00699.x](https://doi.org/10.1111/j.1365-2869.2008.00699.x) | Cross-sectional, n=5,006 | doc | ✔ abstract |
| `laine-2010` | Laine MK, et al. Symptoms or symptom-based scores cannot predict acute otitis media at otitis-prone age. *Pediatrics* 2010;125(5):e1154–61. [doi:10.1542/peds.2009-2689](https://doi.org/10.1542/peds.2009-2689) | n=469 sick children, 6–35 months | doc | ✔ abstract |
| `macknin-2000` | Macknin ML, Piedmonte M, Jacobs J, Skibinski C. Symptoms associated with infant teething: a prospective study. *Pediatrics* 2000;105(4 Pt 1):747–52. [doi:10.1542/peds.105.4.747](https://doi.org/10.1542/peds.105.4.747) | Prospective, n=125, 475 eruptions | JSON | ✔ abstract |
| `massignan-2016` | Massignan C, et al. Signs and symptoms of primary tooth eruption: a meta-analysis. *Pediatrics* 2016;137(3):e20153501. [doi:10.1542/peds.2015-3501](https://doi.org/10.1542/peds.2015-3501) | Meta-analysis, 16 studies | doc | ✔ abstract; ✘ the 34.5% restless-sleep figure |
| `nakagawa-2016` | Nakagawa M, et al. Daytime nap controls toddlers' nighttime sleep. *Sci Rep* 2016;6:27246. [doi:10.1038/srep27246](https://doi.org/10.1038/srep27246) | Actigraphy, n=50, about 1.5 years | JSON | ✔ |
| `nakagawa-2021` | Nakagawa M, et al. Daytime nap and nighttime breastfeeding are associated with toddlers' nighttime sleep. *Sci Rep* 2021;11:3028. [doi:10.1038/s41598-021-81970-6](https://doi.org/10.1038/s41598-021-81970-6) | Actigraphy, n=106, 1.5 years | doc | ✔ |
| `lassonde-2016` | Lassonde JM, et al. Sleep physiology in toddlers: effects of missing a nap on subsequent night sleep. *Neurobiol Sleep Circadian Rhythms* 2016;1(1):19–26. [doi:10.1016/j.nbscr.2016.08.001](https://doi.org/10.1016/j.nbscr.2016.08.001) | PSG, n=25, 30–36 months | doc | ✔ abstract |
| `dionne-2011` | Dionne G, et al. Associations between sleep-wake consolidation and language development in early childhood: a longitudinal twin study. *Sleep* 2011;34(8):987–95. [doi:10.5665/SLEEP.1148](https://doi.org/10.5665/SLEEP.1148) | Twin cohort, n=1,029 | JSON (sleep → later language only; not evidence about milestone-linked sleep changes) | ✔ abstract |

Already held in `citations.json` and reused above: `henderson-2010`, `galland-2012` (✘ for 3–5-month figures; only the extreme age bands were confirmed), `paavonen-2020`, `mindell-2016-app` (commercially sponsored app), `gilchrist-2025-frontiers` (three of four authors work for Happiest Baby Inc.), `lenehan-2023`, `mcgraw-1999`, `rivkees-2007`, `scher-2015`, `weissbluth-1995`, `staton-2020`, `canapari-critique`.

### Guidelines and professional bodies

| ID | Source | Tier | Note | Check |
|---|---|---|---|---|
| `aasm-icsd3tr-2022` | AASM, ICSD-3-TR Insomnia chapter, public draft. [PDF](https://aasm.org/wp-content/uploads/2022/05/ICSD-3-TR-Insomnia-Draft.pdf) | T1 | "Regress" appears 0 times. Names milestones, separation anxiety and fears as shaping childhood insomnia. It is a draft; cite the final ICSD-3-TR if it can be obtained. | ✔ |
| `aap-getting-baby-to-sleep` | HealthyChildren.org (AAP), Getting your baby to sleep, updated 2024-06-04. [link](https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/getting-your-baby-to-sleep.aspx) | T1 | Regular sleep cycles about 4 months; no "regression". | ✔ |
| `aap-separation-anxiety-sleep` | HealthyChildren.org (AAP), Separation anxiety & sleeping trouble, updated 2022-08-25. [link](https://www.healthychildren.org/English/healthy-living/sleep/Pages/separation-anxiety-and-sleeping.aspx) | T1 guidance | Asserts the sleep link with no data (see E4). | ✔ |
| `aap-separation-anxiety-ease` | HealthyChildren.org (AAP), How to ease your child's separation anxiety, updated 2026-05-11. [link](https://www.healthychildren.org/English/ages-stages/toddler/Pages/Soothing-Your-Childs-Separation-Anxiety.aspx) | T1 guidance | Onset about 9 months, sometimes 4–5. | ✔ |
| `ada-tooth-chart` | American Dental Association, Primary tooth development chart, 2012. [PDF](https://www.adafoundation.org/-/media/project/ada-organization/ada/ada-org/files/resources/public-programs/give-kids-a-smile/ada_primary_permanent_toothdev_eng.pdf) | T1 | Eruption ages. | ✔ |
| — | NHS, Sleep and young children (reviewed 2023-03-31; review overdue) | T1 | Night waking common; no "regression". | ✔ |
| — | Newcastle Hospitals NHS FT, Sleep (infants 0–12 months) | T3 | Describes waking returning at 4–5 and 8–9 months, cites nothing, and avoids "regression". | ✔ |
| — | Raising Children Network (AU), baby sleep 2–12 months | T1 if confirmed | Reportedly calls "regression" a term "some people use". | ✘ (403) |
| — | Kaditis A, Gozal D. *Children* 2022;9(4):523 | T1 if confirmed | Would support 50–60 min cycles. | ✘ (403) |

Existing commercial sources (`sleepfoundation-4mo-regression` T2, `tcb-separation-anxiety` T2, `huckleberry-regression-myth` T3) stay usable as *how the idea is usually described*. They must not carry any claim that has a T1 row above.

### Why not all in JSON

`citations.json` entries need a lead author, credentials and an org. Fifteen sources were added where PubMed gave a verified affiliation *and* the page tables above need them. The rest stay here as doc-only IDs. The page build (step 2) should add any it actually cites, using the same PubMed check.

---

## Cross-links (for step 2)

| Regression page | Age page (exists) | Wake-window page (exists) | Transition page (#31, not built yet) |
|---|---|---|---|
| 4-month | `/sleep-schedule/4-month-old/` | `/wake-windows/4-month-old/` | 4→3 section on `/nap-transitions` |
| 8-month | `/sleep-schedule/8-month-old/` | `/wake-windows/9-month-old/` (nearest) | `/nap-transitions/3-to-2` |
| 12-month | `/sleep-schedule/12-month-old/` | `/wake-windows/12-month-old/` | `/nap-transitions/2-to-1` (note: often later than 12 months) |
| 18-month | `/sleep-schedule/18-month-old/` | — | `/nap-transitions/2-to-1`, `/nap-transitions/one-nap` |

## Open questions for step 2

1. **Thin pages.** The 12- and 18-month pages have little evidence to offer beyond "no study shows this". Decide whether they stand alone or fold into the hub as sections. The keyword volume (4,400 and 8,100) argues for standalone pages. The YMYL guard argues against padding them.
2. **Shipped copy.** The corrections table above applies to `RegressionExplainer.vue` and the B06 spec. Fix them before the new pages go live, so the app and the pages do not disagree.
3. **Unchecked items.** Confirm Massignan's sleep figure, Raising Children Network and Kaditis 2022 before citing any of them.
