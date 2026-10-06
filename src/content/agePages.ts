// @doc:static-content-pages @doc:wake-window-schedule-generator
//
// Cluster 1 of docs/research/seo-topic-clusters.md: one indexable page per age
// for `{age} old sleep schedule`. Those queries carry 8k-12k searches a month at
// KD 0-7, and the SERPs for them are won by article pages, not by calculators —
// so each page is real HTML with a sample day already computed, and the planner
// is the call to action rather than the whole page.
//
// The numbers are NOT written by hand. Every sample day is walked through the
// same ScheduleSetting the app uses, and every published range comes out of the
// Tier-1 bracket in SleepRecommendations. agePages.test.ts asserts each sample
// day sits inside its own age bracket, so a page cannot drift into claiming
// something the app would flag as out of range.

import { ScheduleSetting } from '../models/ScheduleSetting'
import { SleepRecommendationRepository } from '../models/SleepRecommendations'
import { formatClock, formatClockRange, formatDuration, roundToStep } from '../models/time'

export const SITE_ORIGIN = 'https://wakewindows.guru'
/** Every cluster-1 page lives under this path, so the SPA keeps `/` to itself. */
export const CLUSTER_BASE = '/sleep-schedule'

/** The Tier-1 recommendation (AAP / Sleep Foundation ranges) — the only source
 * these pages quote numeric ranges from. Tier-2 consultant frameworks stay in
 * the app, where the tier badge travels with them. */
export function generalGuidance() {
    const repo = new SleepRecommendationRepository()
    const source = repo.recommendations.find((r) => r.tier === 1)
    if (!source) throw new Error('agePages: no Tier-1 recommendation found')
    return source
}

/** The bracket covering an age in months, from the Tier-1 source. */
export function bracketForMonths(months: number) {
    const bracket = generalGuidance().currentBracket(months)
    if (!bracket) throw new Error(`agePages: no Tier-1 bracket covers ${months} months`)
    return bracket
}

export interface AgePageDefinition {
    /** URL segment, e.g. '4-month-old' → /sleep-schedule/4-month-old */
    slug: string
    /** Age the page is written for, in months. */
    months: number
    /** Display name, when "{n} month old" is not what a parent would call it
     * (the newborn page). Used in the H1, the prose, and the sibling links. */
    label?: string
    /** Hyphenated form for the title tag, when it differs from the label. */
    titleLabel?: string
    /** The query the page targets, verbatim. */
    keyword: string
    /** Monthly US search volume and difficulty at the time of research
     * (OpenSEO/DataForSEO, 2026-08-21) — kept next to the page so the build
     * order stays arguable later. */
    searchVolume: number
    keywordDifficulty: number
    /** Sample day: morning wake hour (AM), wake windows in hours, bedtime hour (PM). */
    wakeHour: number
    wws: number[]
    bedHour: number
    /** One paragraph under the H1. Written per age; the numbers around it are computed. */
    intro: string
    /** What the parent should expect to change next, in prose. */
    whatChangesNext: string
    faqs: { question: string; answer: string }[]
}

/** The five pages of the first tranche (highest volume at the lowest difficulty).
 * Wake windows are chosen to sit inside the age's Tier-1 bracket — the test
 * enforces it, so edit these only together with a passing test run. */
export const AGE_PAGES: AgePageDefinition[] = [
    {
        slug: 'newborn',
        months: 0,
        label: 'newborn',
        titleLabel: 'Newborn',
        keyword: 'newborn sleep schedule',
        searchVolume: 8100,
        keywordDifficulty: 40,
        wakeHour: 7,
        wws: [1, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25],
        bedHour: 10,
        intro:
            'A newborn does not have a schedule, and no amount of planning will produce one. Sleep in '
            + 'the first weeks is driven by hunger and sleep pressure, not by a body clock — the circadian '
            + 'rhythm that separates night from day has barely started to develop. The day below is a '
            + 'shape, not a plan: what it is really showing is how short the awake stretches are and how '
            + 'much total sleep a newborn needs.',
        whatChangesNext:
            'Over the first three months the awake stretches lengthen, night sleep starts to consolidate '
            + 'into longer blocks, and a rough rhythm appears on its own. That is development, not '
            + 'training — you cannot bring it forward, and nothing is wrong if it takes longer.',
        faqs: [
            {
                question: 'How long should a newborn stay awake?',
                answer:
                    'Roughly 35–90 minutes, and the shorter end is normal in the first weeks. Many newborns '
                    + 'are ready for sleep again before you would expect. Watch for the cues rather than the clock.',
            },
            {
                question: 'Should a newborn have a bedtime?',
                answer:
                    'Not really. Night sleep at this age is 8–10 hours in total, broken into feeds, and the '
                    + '"bedtime" in the sample above is just where the longest stretch tends to start. A fixed '
                    + 'bedtime becomes meaningful once the circadian clock matures, around three to four months.',
            },
            {
                question: 'How many naps does a newborn take?',
                answer:
                    'Four to six, sometimes more, and they vary in length from twenty minutes to three hours. '
                    + 'Total daytime sleep of 6–9 hours matters more than how it is divided up.',
            },
        ],
    },
    {
        slug: '1-month-old',
        months: 1,
        keyword: '1 month old sleep schedule',
        searchVolume: 2400,
        keywordDifficulty: 19,
        wakeHour: 7,
        wws: [1, 1.25, 1.25, 1.25, 1.25, 1.5],
        bedHour: 9,
        intro:
            'At one month, sleep still runs on hunger and sleep pressure rather than the clock. Awake '
            + 'stretches are short — often under an hour and a half including the feed — and the day looks '
            + 'different every day. The value of a schedule at this age is not the timing; it is knowing '
            + 'roughly how much sleep to expect in total so you can tell normal from worrying.',
        whatChangesNext:
            'Between one and three months the awake windows stretch toward two hours and night sleep '
            + 'starts to gather into longer blocks. Day/night confusion, if you have it, usually sorts '
            + 'itself out in this stretch.',
        faqs: [
            {
                question: 'How much should a 1 month old sleep?',
                answer:
                    'Around 6–9 hours during the day and 8–10 hours at night, so roughly 14–19 hours in 24. '
                    + 'That is a very wide band, and babies genuinely sit all across it.',
            },
            {
                question: 'Do wake windows include feeding time?',
                answer:
                    'Yes — the window is the whole awake stretch, feed included. At one month the feed often '
                    + 'is most of the window, which is why the numbers look so short.',
            },
            {
                question: 'Should I wake a 1 month old to feed?',
                answer:
                    'That is a question for your pediatrician, not a scheduler. Feeding intervals at this age '
                    + 'depend on weight gain and jaundice risk, and this tool does not know either.',
            },
        ],
    },
    {
        slug: '2-month-old',
        months: 2,
        keyword: '2 month old sleep schedule',
        searchVolume: 6600,
        keywordDifficulty: 17,
        wakeHour: 7,
        wws: [1.25, 1.5, 1.5, 1.5, 1.5],
        bedHour: 9,
        intro:
            'Two months is the age where a rhythm starts to be visible without being reliable. Awake '
            + 'windows stretch past an hour, the longest night stretch gets longer, and a first evening '
            + 'bedtime begins to make sense. It is still cue-led: a two-month-old who is tired at 45 '
            + 'minutes is not off schedule.',
        whatChangesNext:
            'Around three to four months the sleep cycles themselves change, which is the shift people '
            + 'call the four-month regression. Before that, expect the windows to keep stretching and the '
            + 'number of naps to start dropping from five toward four.',
        faqs: [
            {
                question: 'What are wake windows for a 2 month old?',
                answer:
                    'Roughly an hour to an hour and a half, shortest first thing in the morning. The Tier-1 '
                    + 'bracket for 0–2 months is 35–90 minutes.',
            },
            {
                question: 'When do babies start sleeping longer at night?',
                answer:
                    'The longest stretch usually lengthens through the second and third months, but "sleeping '
                    + 'through" is not a milestone with a date. Night waking at two months is expected, not a problem.',
            },
            {
                question: 'Is a 2 month old too young for a bedtime routine?',
                answer:
                    'No — a short, repeatable wind-down is fine at any age and costs nothing if it does not '
                    + '"work" yet. Just do not expect it to move the clock; the body clock is still maturing.',
            },
        ],
    },
    {
        slug: '3-month-old',
        months: 3,
        keyword: '3 month old sleep schedule',
        searchVolume: 9900,
        keywordDifficulty: 5,
        wakeHour: 7,
        wws: [1.5, 1.5, 1.5, 1.75, 1.75],
        bedHour: 7,
        intro:
            'At three months a baby is still mostly cue-led. The circadian clock — the internal '
            + 'day/night rhythm — is only starting to mature, so a schedule at this age is a shape '
            + 'to aim at, not a timetable to enforce. Most three-month-olds still take four naps, '
            + 'and the last one is often a short bridge nap that only exists to get everyone to bedtime.',
        whatChangesNext:
            'Between three and five months the wake windows stretch and the fourth nap starts to '
            + 'fall apart. Expect the day to reorganise itself around three naps rather than four.',
        faqs: [
            {
                question: 'How many naps should a 3 month old take?',
                answer:
                    'Usually four, sometimes five. The Tier-1 range for this age is 3–5 naps a day. '
                    + 'The last nap is often short and late; it is doing its job if it gets you to bedtime '
                    + 'without an overtired baby.',
            },
            {
                question: 'What are wake windows at 3 months?',
                answer:
                    'Roughly 75–150 minutes, starting shorter in the morning and lengthening through the day. '
                    + '"Wake window" is a practice-based heuristic, not a term from the sleep-medicine '
                    + 'literature — treat it as a starting estimate and let sleepy cues override it.',
            },
            {
                question: 'Should I wake a 3 month old from a nap?',
                answer:
                    'Capping a very long nap can protect the following night, but at three months the total '
                    + 'matters more than the distribution. If naps are long and nights are fine, leave it alone.',
            },
        ],
    },
    {
        slug: '4-month-old',
        months: 4,
        keyword: '4 month old sleep schedule',
        searchVolume: 12100,
        keywordDifficulty: 7,
        wakeHour: 7,
        wws: [1.5, 1.75, 1.75, 2, 2],
        bedHour: 7.5,
        intro:
            'Four months is when sleep changes shape. Sleep cycles mature into adult-like stages, so a '
            + 'baby who used to sleep through a transition now surfaces at the end of every cycle. This '
            + 'is what gets called the four-month sleep regression, and it is a permanent developmental '
            + 'change rather than a phase that reverses. The day usually still holds four naps, with the '
            + 'last one short.',
        whatChangesNext:
            'Over the next month the fourth nap drops and the wake windows lengthen toward two hours. '
            + 'If naps suddenly shorten to 30–45 minutes, the schedule is usually not the cause — the '
            + 'sleep-cycle change is.',
        faqs: [
            {
                question: 'How much sleep does a 4 month old need?',
                answer:
                    'The Tier-1 range is 3.5–5 hours of daytime sleep and 10–12 hours at night, so roughly '
                    + '13.5–17 hours in 24. Individual babies sit anywhere in that band; a baby at the low end '
                    + 'who wakes happy is not short on sleep.',
            },
            {
                question: 'Is the 4 month sleep regression about the schedule?',
                answer:
                    'Mostly not. The regression is a change in how sleep cycles are structured. A schedule '
                    + 'that is close to the age ranges will not prevent it, though an overtired day makes it '
                    + 'harder. Check the wake windows first, then stop adjusting.',
            },
            {
                question: 'What wake windows suit a 4 month old?',
                answer:
                    'About 90 minutes to 2 hours, shortest first thing in the morning and longest before '
                    + 'bedtime. The Tier-1 bracket for 3–5 months is 75–150 minutes.',
            },
        ],
    },
    {
        slug: '5-month-old',
        months: 5,
        keyword: '5 month old sleep schedule',
        searchVolume: 9900,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [2, 2, 2.25, 2.25],
        bedHour: 7,
        intro:
            'Five months is usually a three-nap day. Wake windows are comfortably over two hours, naps '
            + 'consolidate into longer blocks, and the day starts to look predictable enough that a clock '
            + 'schedule is genuinely useful rather than aspirational.',
        whatChangesNext:
            'Somewhere between five and eight months the third nap goes. The signal is the third nap '
            + 'refusing to happen or pushing bedtime late, not a date on the calendar.',
        faqs: [
            {
                question: 'How many naps at 5 months?',
                answer:
                    'Three is typical, four if the naps are short. The Tier-1 range for 3–5 months is 3–5 naps.',
            },
            {
                question: 'Why are my 5 month old’s naps only 30 minutes?',
                answer:
                    'A 30–45 minute nap is one sleep cycle. It is extremely common at this age and usually '
                    + 'resolves as sleep pressure and the circadian rhythm mature. Short naps mean you need more '
                    + 'of them; shorten the following wake window rather than pushing through.',
            },
            {
                question: 'When should a 5 month old go to bed?',
                answer:
                    'Bedtime is set by the last wake window, not by the clock. Take the end of the last nap, '
                    + 'add the age-appropriate window, and that is bedtime — which is why it moves on a bad nap day.',
            },
        ],
    },
    {
        slug: '6-month-old',
        months: 6,
        keyword: '6 month old sleep schedule',
        searchVolume: 12100,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [2, 2.25, 2.25, 2.25],
        bedHour: 7,
        intro:
            'Six months is the first age where a named schedule starts to fit. Wake windows are over two '
            + 'hours, the circadian clock is largely mature, and most babies are on three naps and moving '
            + 'toward two. It is also the age where the gap between a well-rested baby and an overtired one '
            + 'becomes obvious in the evening.',
        whatChangesNext:
            'The third nap drops between roughly six and eight months, which turns the day into the classic '
            + 'two-nap shape. Expect a few messy weeks where three naps is too many and two is not quite enough.',
        faqs: [
            {
                question: 'How many naps should a 6 month old take?',
                answer:
                    'Two or three. The Tier-1 range for 6–8 months is 2–3 naps with 2.5–3.5 hours of daytime '
                    + 'sleep in total.',
            },
            {
                question: 'What is the 2-3-4 schedule?',
                answer:
                    'A two-nap day with a 2-hour wake window before the first nap, 3 hours before the second, '
                    + 'and 4 hours before bed. It is a practice-based convention rather than a validated rule, and '
                    + 'it over-promises sleep for babies with lower sleep needs. It typically fits from about six months.',
            },
            {
                question: 'How much night sleep at 6 months?',
                answer:
                    '10–12 hours, usually still with one or more wakings. Night waking at six months is normal '
                    + 'and not by itself a sign the schedule is wrong.',
            },
        ],
    },
    {
        slug: '7-month-old',
        months: 7,
        keyword: '7 month old sleep schedule',
        searchVolume: 8100,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [2.5, 3, 3],
        bedHour: 7,
        intro:
            'Seven months is usually the two-nap day, and the wake windows are long enough that the third '
            + 'nap no longer fits without pushing bedtime late. Naps get longer as they get fewer: two solid '
            + 'blocks rather than three short ones.',
        whatChangesNext:
            'Two naps generally hold until somewhere between 13 and 18 months. The next real change is the '
            + '2-to-1 transition, not another drop in the next few months.',
        faqs: [
            {
                question: 'Should a 7 month old be on two naps?',
                answer:
                    'Most are. The Tier-1 range for 6–8 months allows 2–3 naps, so a third short nap is still '
                    + 'within normal — especially if the first two are short.',
            },
            {
                question: 'What are 7 month old wake windows?',
                answer:
                    'Roughly 2.5–3.5 hours, with the longest window before bedtime. The Tier-1 bracket for '
                    + '6–8 months is 120–180 minutes.',
            },
            {
                question: 'Why does my 7 month old wake at 5am?',
                answer:
                    'Early waking at this age is usually too much daytime sleep, too little daytime sleep, or '
                    + 'a bedtime that lands outside the last wake window. Change one variable at a time and give '
                    + 'it several days before judging it.',
            },
        ],
    },
    {
        slug: '8-month-old',
        months: 8,
        keyword: '8 month old sleep schedule',
        searchVolume: 6600,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [2.75, 3, 3],
        bedHour: 7,
        intro:
            'Eight months is a settled two-nap day for most babies, and it is also when a lot of parents '
            + 'first meet night waking that has nothing to do with the schedule. Crawling, pulling up, and '
            + 'separation awareness all land around now, and they show up at 2am before they show up in the '
            + 'day. Check the windows, then look at development.',
        whatChangesNext:
            'Two naps generally hold from here until 13-18 months. What changes in the next few months is '
            + 'the length of the wake windows, not the number of naps.',
        faqs: [
            {
                question: 'How long should an 8 month old be awake between naps?',
                answer:
                    'Roughly 2.5–3 hours, with the longest stretch before bed. The Tier-1 bracket for 6–8 '
                    + 'months is 120–180 minutes.',
            },
            {
                question: 'Is the 8 month sleep regression real?',
                answer:
                    'The night waking is real; the label is a convention rather than a defined clinical event. '
                    + 'It usually coincides with a burst of motor development. It passes, and it is not caused by '
                    + 'anything you did to the schedule.',
            },
            {
                question: 'Should an 8 month old still take three naps?',
                answer:
                    'Some do, and the guidance allows 2–3 at this age. If a third nap pushes bedtime past your '
                    + 'target, it is usually the one to drop first.',
            },
        ],
    },
    {
        slug: '9-month-old',
        months: 9,
        keyword: '9 month old sleep schedule',
        searchVolume: 5400,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [3, 3, 3.25],
        bedHour: 7,
        intro:
            'Nine months is two naps, three-hour wake windows, and a day that finally holds its shape from '
            + 'one week to the next. The guidance narrows here too — this is the first bracket where the '
            + 'expected nap count is exactly two rather than a range.',
        whatChangesNext:
            'Expect the wake windows to keep stretching toward three and a half hours by the first birthday. '
            + 'The morning nap gets shorter before it eventually disappears, but that is usually well after 12 months.',
        faqs: [
            {
                question: 'What is a good 9 month old nap schedule?',
                answer:
                    'Two naps, roughly mid-morning and early afternoon, with about three hours awake between '
                    + 'them and a slightly longer stretch before bed. Total daytime sleep of 2–3 hours.',
            },
            {
                question: 'My 9 month old fights the second nap — is it time to drop it?',
                answer:
                    'Almost certainly not. The 2-to-1 transition typically comes between 13 and 18 months. A '
                    + 'fought second nap at nine months usually means the first nap was too long or too late.',
            },
            {
                question: 'How much night sleep does a 9 month old need?',
                answer:
                    '10–12 hours. Waking in the night is still common at this age and does not by itself mean '
                    + 'the daytime schedule is wrong.',
            },
        ],
    },
    {
        slug: '10-month-old',
        months: 10,
        keyword: '10 month old sleep schedule',
        searchVolume: 6600,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [3, 3.25, 3.25],
        bedHour: 7,
        intro:
            'Ten months is the age where the morning nap starts to get unreliable for some babies — often '
            + 'the first hint of a nap transition that is still months away. Two naps and roughly three '
            + 'hours of daytime sleep is still the expectation.',
        whatChangesNext:
            'A short-lived "nap strike" around 10–11 months is common and usually passes within a couple of '
            + 'weeks. Dropping to one nap this early generally backfires: the day gets too long and bedtime '
            + 'turns into a fight.',
        faqs: [
            {
                question: 'Why is my 10 month old refusing the morning nap?',
                answer:
                    'Usually a temporary strike tied to a developmental burst — standing, cruising, first words. '
                    + 'Hold the two-nap shape, shorten the first window slightly if the refusal continues, and give '
                    + 'it two weeks before concluding anything.',
            },
            {
                question: 'How long should a 10 month old nap?',
                answer:
                    'Two naps totalling 2–3 hours. A single long midday nap with a short morning one is also '
                    + 'normal — the total is what the guidance ranges are about.',
            },
            {
                question: 'What wake windows does a 10 month old need?',
                answer:
                    'About 3–3.5 hours. The Tier-1 bracket for 9–11 months is 150–210 minutes.',
            },
        ],
    },
    {
        slug: '11-month-old',
        months: 11,
        keyword: '11 month old sleep schedule',
        searchVolume: 5400,
        keywordDifficulty: 4,
        wakeHour: 7,
        wws: [3, 3.25, 3.5],
        bedHour: 7,
        intro:
            'Eleven months is the last month of the "two naps, no argument" era for most babies. Wake '
            + 'windows are pushing three and a half hours, daytime sleep is down to around two and a half, '
            + 'and the morning nap is doing less work than it used to.',
        whatChangesNext:
            'The 2-to-1 nap transition is coming, but typically not for another two to seven months. False '
            + 'starts are normal: a week of refused morning naps followed by a month of needing them again.',
        faqs: [
            {
                question: 'Is my 11 month old ready for one nap?',
                answer:
                    'Usually not. Most babies transition between 13 and 18 months. Readiness looks like weeks of '
                    + 'consistently refusing or sleeping through one of the naps, not a bad fortnight.',
            },
            {
                question: 'How much sleep does an 11 month old need?',
                answer:
                    '2–3 hours during the day and 10–12 hours at night. That is the same bracket as 9 and 10 '
                    + 'months — the change at this age is in the wake windows, not the totals.',
            },
            {
                question: 'Why has bedtime got harder at 11 months?',
                answer:
                    'Often the last wake window is now too short. As the windows stretch, a bedtime that used to '
                    + 'be right becomes early, and an under-tired baby resists exactly like an overtired one.',
            },
        ],
    },
    {
        slug: '12-month-old',
        months: 12,
        keyword: '12 month old sleep schedule',
        searchVolume: 3600,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [3, 3.25, 3.5],
        bedHour: 7,
        intro:
            'At twelve months most babies are still on two naps, despite what the "one nap at one year" '
            + 'convention suggests. Daycare timetables push toward a single nap around now, which is a '
            + 'scheduling reality rather than a developmental one — and it is why so many one-year-olds go '
            + 'through a rough few months.',
        whatChangesNext:
            'The real 2-to-1 transition lands between 13 and 18 months. When it does, expect three to four '
            + 'weeks of alternating between one-nap and two-nap days, with an early bedtime on the one-nap ones.',
        faqs: [
            {
                question: 'Should a 12 month old be on one nap or two?',
                answer:
                    'Two, for most. The guidance allows 1–2 naps at 12–17 months, but the typical transition age '
                    + 'is 13–18 months. One nap at exactly twelve months is early, not late.',
            },
            {
                question: 'How do I handle daycare putting my 12 month old on one nap?',
                answer:
                    'Bridge it at home: an earlier bedtime on daycare days, and keep two naps at weekends until '
                    + 'the transition is genuinely done. A one-nap day with an early bedtime is not a failed day.',
            },
            {
                question: 'How much sleep does a 1 year old need?',
                answer:
                    '1.5–3 hours during the day and 10–12 hours at night. The daytime range is wide because it '
                    + 'straddles the transition from two naps to one.',
            },
        ],
    },
    {
        slug: '18-month-old',
        months: 18,
        keyword: '18 month old sleep schedule',
        searchVolume: 2400,
        keywordDifficulty: 0,
        wakeHour: 7,
        wws: [5, 5.5],
        bedHour: 7,
        intro:
            'Eighteen months is one nap, a long one, in the middle of the day — with five hours or more of '
            + 'awake time on either side of it. It is also the age of the most talked-about regression, and '
            + 'this one has an obvious cause: language, autonomy, and separation anxiety all arrive together, '
            + 'and bedtime is where they get tested.',
        whatChangesNext:
            'The single nap holds for another year or more. What usually needs adjusting at this age is the '
            + 'nap cap, not the nap count: a nap that runs past three hours starts eating into the night.',
        faqs: [
            {
                question: 'How long should an 18 month old nap?',
                answer:
                    'One nap of roughly 1–2.5 hours. If the nap is long and bedtime has become a battle, capping '
                    + 'the nap is usually more effective than moving bedtime later.',
            },
            {
                question: 'What is the 18 month sleep regression?',
                answer:
                    'A stretch of bedtime resistance and night waking that lines up with a developmental leap — '
                    + 'language, independence, and separation anxiety. It is a phase with a cause, not a schedule '
                    + 'problem, and holding the boundaries is usually what ends it.',
            },
            {
                question: 'What time should an 18 month old go to bed?',
                answer:
                    'Roughly five to six hours after the nap ends, which for a midday nap puts bedtime in the '
                    + 'usual 7–8pm window. If the nap ends late, bedtime moves — that is arithmetic, not stubbornness.',
            },
        ],
    },
]

export interface SampleDayRow {
    label: string
    time: string
    detail?: string
}

export interface AgePageModel extends AgePageDefinition {
    title: string
    heading: string
    /** Resolved display name — never undefined, unlike the definition's. */
    label: string
    /** Hyphenated form for prose that reads as a compound adjective
     * ("a sample 4-month-old day", "a sample newborn day"). */
    dayLabel: string
    description: string
    path: string
    url: string
    /** The day, as the app's generator computes it. */
    rows: SampleDayRow[]
    napCount: number
    napLength: string
    totalNapHours: number
    totalNightHours: number
    totalSleepHours: number
    /** Tier-1 published ranges for this age. */
    wakeWindowRange: [number, number]
    napRange: [number, number]
    daySleepRange: [number, number]
    nightSleepRange: [number, number]
    /** Deep link that opens the planner with this exact day loaded. */
    plannerHref: string
    /** Neighbouring ages, for the age±1 internal links. */
    previous?: { slug: string; label: string }
    next?: { slug: string; label: string }
}

/** Build the schedule for one page through the app's own generator, so a page
 * can never show a day the app would not produce. */
export function scheduleFor(page: AgePageDefinition): ScheduleSetting {
    const schedule = new ScheduleSetting()
    schedule.dwt = page.wakeHour
    schedule.bed = page.bedHour
    schedule.wws = [...page.wws]
    return schedule
}

function ageLabel(months: number): string {
    return `${months} month old`
}

/** What the page calls this age in prose — "newborn", not "0 month old". */
function displayLabel(page: AgePageDefinition): string {
    return page.label ?? ageLabel(page.months)
}

/** Sentence-case for a heading built from a label — "newborn sleep schedule"
 * reads as a typo in an H1, while "4 month old" must keep its digit. */
function sentenceCase(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

/** Round hours for display without implying more precision than the model has. */
function roundHours(hours: number): number {
    return Math.round(hours * 100) / 100
}

export function buildAgePage(page: AgePageDefinition, index: number, pages: AgePageDefinition[]): AgePageModel {
    const schedule = scheduleFor(page)
    const bracket = bracketForMonths(page.months)
    const naps = schedule.napTimes

    // Displayed to 5-minute marks. The generator's even split of total nap time
    // produces ends like 9:23, and a to-the-minute nap end on a page a parent
    // reads at 2am is false precision — the app rounds the same way.
    //
    // The length is rounded ONCE and reused for every nap, rather than rounding
    // each start and end separately: the splits are equal, so separate rounding
    // could print "naps of about 55 min each" above a row that spans 50.
    const napLengthMinutes = naps.length ? roundToStep(naps[0].end - naps[0].start) : 0
    const napBlocks = naps.map((nap) => {
        const start = roundToStep(nap.start)
        return { start, end: start + napLengthMinutes }
    })

    const rows: SampleDayRow[] = [
        { label: 'Wake', time: formatClock(schedule.wakeMinutes) },
        ...napBlocks.map((nap, i) => ({
            label: `Nap ${i + 1}`,
            time: formatClockRange(nap.start, nap.end),
            detail: `${formatDuration(page.wws[i] * 60)} awake first`,
        })),
        {
            label: 'Bedtime',
            time: formatClock(schedule.bedtimeMinutes),
            detail: `${formatDuration(page.wws[page.wws.length - 1] * 60)} awake first`,
        },
    ]

    const previous = pages[index - 1]
    const next = pages[index + 1]

    return {
        ...page,
        // Hyphenated in the title tag, spaced in the H1: both spellings are
        // searched, and this way the page carries each once without repeating
        // the phrase twice in the same element.
        // Kept under ~60 characters (SERP truncation), keyword first.
        title: `${page.titleLabel ?? `${page.months}-month-old`} sleep schedule: sample day & wake windows`,
        heading: sentenceCase(`${displayLabel(page)} sleep schedule`),
        label: displayLabel(page),
        dayLabel: page.label ?? `${page.months}-month-old`,
        // Kept under ~155 characters so the SERP snippet is not cut off.
        description:
            `A sample ${displayLabel(page)} sleep schedule: clock times, ${bracket.wwTime[0]}–${bracket.wwTime[1]} `
            + `minute wake windows, ${bracket.daySleep[0]}–${bracket.daySleep[1]} h of day sleep. `
            + `From cited guidance; tweak it in the free planner.`,
        path: `${CLUSTER_BASE}/${page.slug}/`,
        url: `${SITE_ORIGIN}${CLUSTER_BASE}/${page.slug}/`,
        rows,
        napCount: schedule.naps,
        napLength: formatDuration(napLengthMinutes),
        totalNapHours: roundHours(schedule.totalNap),
        totalNightHours: roundHours(schedule.totalNightSleep),
        totalSleepHours: roundHours(schedule.totalSleep),
        wakeWindowRange: bracket.wwTime,
        napRange: bracket.naps,
        daySleepRange: bracket.daySleep,
        nightSleepRange: bracket.nightSleep,
        plannerHref: `/?s=${page.wakeHour}-${page.wws.join('/')}-${page.bedHour}`,
        previous: previous ? { slug: previous.slug, label: displayLabel(previous) } : undefined,
        next: next ? { slug: next.slug, label: displayLabel(next) } : undefined,
    }
}

/** Every cluster-1 page, in build order. */
export function buildAgePages(): AgePageModel[] {
    return AGE_PAGES.map((page, i) => buildAgePage(page, i, AGE_PAGES))
}

export interface HubBracketRow {
    ageLabel: string
    wakeWindows: string
    naps: string
    daySleep: string
    nightSleep: string
    /** The spoke page for this bracket, when one is built. */
    href?: string
}

/** The hub's by-age table: every Tier-1 bracket, whether or not a spoke exists
 * for it yet, so the hub is a complete answer to `baby sleep schedule by age`. */
export function hubBracketRows(pages: AgePageModel[] = buildAgePages()): HubBracketRow[] {
    return generalGuidance()
        .brackets.slice()
        .sort((a, b) => a.months[0] - b.months[0])
        .map((bracket) => {
            const spoke = pages.find(
                (p) => p.months >= bracket.months[0] && p.months <= bracket.months[1],
            )
            return {
                ageLabel: `${bracket.months[0]}–${bracket.months[1]} months`,
                wakeWindows: `${bracket.wwTime[0]}–${bracket.wwTime[1]} min`,
                naps: bracket.naps[0] === bracket.naps[1]
                    ? `${bracket.naps[0]}`
                    : `${bracket.naps[0]}–${bracket.naps[1]}`,
                daySleep: `${bracket.daySleep[0]}–${bracket.daySleep[1]} h`,
                nightSleep: `${bracket.nightSleep[0]}–${bracket.nightSleep[1]} h`,
                href: spoke?.path,
            }
        })
}
