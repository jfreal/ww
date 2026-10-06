// @doc:static-content-pages
//
// Cluster 2 of docs/research/seo-topic-clusters.md: the wake-windows term
// itself. It matters more than its volume suggests — it is the phrase the app
// is named after, and `4/6/9/12 month old wake windows` are the only keywords
// in the whole research set tagged **transactional**. Those searchers want a
// tool, not an essay, so these pages lead with the number and the calculator
// and keep the prose underneath.
//
// Same discipline as agePages.ts: ranges come from the Tier-1 bracket in
// SleepRecommendations, the sample windows are the ones the matching age page
// publishes, and the tests assert both. A wake-window page and its sleep-
// schedule page can therefore never disagree about the same age.

import { AGE_PAGES, bracketForMonths, buildAgePages, CLUSTER_BASE, generalGuidance, SITE_ORIGIN } from './agePages'
import type { AgePageModel } from './agePages'
import { formatDuration } from '../models/time'

/** Cluster-2 pages live here. */
export const WAKE_WINDOW_BASE = '/wake-windows'

export interface WakeWindowPageDefinition {
    slug: string
    /** The age this page answers for, matched to an age page by month. */
    months: number
    keyword: string
    searchVolume: number
    keywordDifficulty: number
    /** True for the keywords research tagged transactional — those pages put
     * the planner above the prose rather than after it. */
    transactional: boolean
    intro: string
    /** What to do when the published window plainly does not fit this baby. */
    whenItDoesNotFit: string
    faqs: { question: string; answer: string }[]
}

export const WAKE_WINDOW_PAGES: WakeWindowPageDefinition[] = [
    {
        slug: 'newborn',
        months: 0,
        keyword: 'wake windows newborn',
        searchVolume: 720,
        keywordDifficulty: 1,
        transactional: true,
        intro:
            'A newborn wake window is short — often shorter than the feed, the change, and the cuddle that '
            + 'fill it. In the first weeks many babies are ready to sleep again 35 to 60 minutes after waking, '
            + 'and the window includes every minute of that, feeding time included.',
        whenItDoesNotFit:
            'At this age the cues win, always. A newborn showing sleepy signs at 25 minutes is not off '
            + 'schedule, and one happily awake at 90 minutes does not need to be put down. The window is a '
            + 'rough expectation to plan around, not a target to hit.',
        faqs: [
            {
                question: 'Do wake windows include feeding time?',
                answer:
                    'Yes. The window is the entire awake stretch from opening their eyes to falling asleep '
                    + 'again, and at newborn age the feed is usually most of it.',
            },
            {
                question: 'What are newborn wake windows by week?',
                answer:
                    'They lengthen gradually rather than in steps: roughly 35–60 minutes in the first few weeks, '
                    + 'nearer 60–90 minutes by two months. Week-by-week charts imply a precision the evidence '
                    + 'does not support.',
            },
            {
                question: 'What if my newborn will not sleep in the window?',
                answer:
                    'Very common, and rarely a scheduling problem. Overtiredness makes settling harder, so the '
                    + 'usual fix is a shorter next window rather than a longer one.',
            },
        ],
    },
    {
        slug: '4-month-old',
        months: 4,
        keyword: '4 month old wake windows',
        searchVolume: 6600,
        keywordDifficulty: 0,
        transactional: true,
        intro:
            'A four-month-old typically manages 90 minutes to two hours awake, shortest first thing in the '
            + 'morning and longest before bed. This is the age where windows start to feel like they work — '
            + 'and also the age where sleep cycles mature, so a window that was right last month may need '
            + 'stretching this month.',
        whenItDoesNotFit:
            'If naps collapse to 30–45 minutes at four months, the wake window is usually not the culprit: '
            + 'that is one sleep cycle, and surfacing between cycles is what changes at this age. Try one '
            + 'adjustment, give it several days, and stop there.',
        faqs: [
            {
                question: 'How long should a 4 month old be awake?',
                answer:
                    'About 90 minutes to 2 hours. The Tier-1 bracket for 3–5 months is 75–150 minutes, and most '
                    + 'four-month-olds sit in the middle of it.',
            },
            {
                question: 'Should wake windows get longer through the day?',
                answer:
                    'Usually, yes — the first window of the day is the shortest and the one before bed the '
                    + 'longest. That is a practice-based convention rather than a rule; some babies do the opposite.',
            },
            {
                question: 'Are wake windows the same for a premature baby?',
                answer:
                    'Use corrected age, not birth age. A baby born eight weeks early has the wake windows of a '
                    + 'two-month-old at four months old. The planner does this adjustment for you.',
            },
        ],
    },
    {
        slug: '6-month-old',
        months: 6,
        keyword: '6 month old wake windows',
        searchVolume: 4400,
        keywordDifficulty: 2,
        transactional: true,
        intro:
            'By six months the awake stretches are over two hours, and the day is predictable enough that '
            + 'the windows become genuinely useful for planning. This is the age where named schedules like '
            + '2-3-4 start to be offered — though the 4-hour final window in that schedule is an hour longer '
            + 'than the published range for this age.',
        whenItDoesNotFit:
            'A six-month-old who takes 40 minutes to fall asleep for a nap is usually under-tired; one who '
            + 'screams before it is usually over-tired. Move the window by 15 minutes in the indicated '
            + 'direction, not by an hour.',
        faqs: [
            {
                question: 'How long can a 6 month old stay awake?',
                answer:
                    'Roughly 2 to 3 hours. The Tier-1 bracket for 6–8 months is 120–180 minutes.',
            },
            {
                question: 'Is 2-3-4 a good schedule at 6 months?',
                answer:
                    'It fits some six-month-olds and over-promises for others. Its 4-hour final window is 240 '
                    + 'minutes, above the 120–180 the Tier-1 guidance gives for this age — which is a fair '
                    + 'description of 2-3-4 generally: a practice-based convention, not validated guidance.',
            },
            {
                question: 'How many naps fit in a 6 month old wake-window day?',
                answer:
                    'Two or three, depending on how long the naps run. Three shorter naps and two longer ones are '
                    + 'both normal at this age.',
            },
        ],
    },
    {
        slug: '9-month-old',
        months: 9,
        keyword: '9 month old wake windows',
        searchVolume: 2900,
        keywordDifficulty: 0,
        transactional: true,
        intro:
            'Nine-month wake windows run about three hours, and the day settles into two naps with a longer '
            + 'stretch before bedtime. This is the first age bracket where the guidance expects exactly two '
            + 'naps rather than a range, so the windows do most of the work in shaping the day.',
        whenItDoesNotFit:
            'A refused second nap at nine months usually means the first window was too short or the first '
            + 'nap ran too long, not that the nap is ready to go. Lengthen the morning window before you '
            + 'consider dropping anything.',
        faqs: [
            {
                question: 'What are wake windows for a 9 month old?',
                answer:
                    'About 2.5 to 3.5 hours. The Tier-1 bracket for 9–11 months is 150–210 minutes.',
            },
            {
                question: 'Why does my 9 month old wake early?',
                answer:
                    'Early waking at this age is usually the last wake window being too short, or too much '
                    + 'daytime sleep. Change one variable and give it several days.',
            },
            {
                question: 'Should the last wake window be the longest?',
                answer:
                    'Usually. A final stretch of three and a half hours before bed is common at nine months, '
                    + 'even when the earlier windows are closer to three.',
            },
        ],
    },
    {
        slug: '12-month-old',
        months: 12,
        keyword: '12 month old wake windows',
        searchVolume: 1000,
        keywordDifficulty: 0,
        transactional: true,
        intro:
            'At twelve months the awake stretches are three to four hours, and most babies still need two '
            + 'naps to fill a day that long — despite the widespread assumption that one year means one nap.',
        whenItDoesNotFit:
            'If two naps no longer fit inside the day without pushing bedtime late, that is the beginning of '
            + 'the 2-to-1 transition rather than a broken schedule. It usually takes three to four weeks, and '
            + 'an early bedtime is the tool that gets you through it.',
        faqs: [
            {
                question: 'How long should a 12 month old be awake?',
                answer:
                    'Roughly 3 to 4 hours between sleeps. The Tier-1 bracket for 12–17 months is 180–240 minutes.',
            },
            {
                question: 'Does one year old mean one nap?',
                answer:
                    'No. The typical 2-to-1 transition is 13–18 months. One nap at twelve months is early, and '
                    + 'usually means an earlier bedtime is needed to cover the gap.',
            },
            {
                question: 'What wake window comes before bedtime at 12 months?',
                answer:
                    'Often the longest of the day, around 3.5 to 4 hours after the afternoon nap ends.',
            },
        ],
    },
]

export interface WakeWindowPageModel extends WakeWindowPageDefinition {
    title: string
    heading: string
    label: string
    description: string
    path: string
    url: string
    /** Published range for the age, in minutes. */
    range: [number, number]
    rangeLabel: string
    napRange: [number, number]
    /** The windows the matching sleep-schedule page actually prints. */
    sampleWindows: string[]
    /** The sleep-schedule page for the same age. */
    schedulePath: string
    scheduleLabel: string
    plannerHref: string
}

export interface WakeWindowChartRow {
    ageLabel: string
    range: string
    naps: string
    /** The wake-window page for this bracket, when one exists. */
    href?: string
}

function labelFor(months: number, agePage: AgePageModel): string {
    return months === 0 ? 'newborn' : agePage.label
}

export function buildWakeWindowPage(
    page: WakeWindowPageDefinition,
    agePages: AgePageModel[] = buildAgePages(),
): WakeWindowPageModel {
    const agePage = agePages.find((p) => p.months === page.months)
    if (!agePage) {
        throw new Error(`wakeWindowPages: no sleep-schedule page for ${page.months} months`)
    }
    const bracket = bracketForMonths(page.months)
    const label = labelFor(page.months, agePage)

    return {
        ...page,
        // The keyword for the newborn page reads "wake windows newborn", which
        // would put a lowercase inverted phrase in the SERP headline. Every other
        // page's keyword already leads with the age.
        title: `${page.months === 0
            ? 'Newborn wake windows'
            : page.keyword.replace(/^(\d+) month old/, '$1-month-old')}: how long they stay awake`,
        heading: page.months === 0 ? 'Newborn wake windows' : `${agePage.label} wake windows`,
        label,
        description:
            `How long a ${label} can comfortably stay awake: ${bracket.wwTime[0]}–${bracket.wwTime[1]} minutes, `
            + `from cited guidance. With a sample day and a free planner for clock times.`,
        path: `${WAKE_WINDOW_BASE}/${page.slug}/`,
        url: `${SITE_ORIGIN}${WAKE_WINDOW_BASE}/${page.slug}/`,
        range: bracket.wwTime,
        rangeLabel: `${formatDuration(bracket.wwTime[0])}–${formatDuration(bracket.wwTime[1])}`,
        napRange: bracket.naps,
        sampleWindows: agePage.wws.map((ww) => formatDuration(ww * 60)),
        schedulePath: agePage.path,
        scheduleLabel: agePage.heading,
        plannerHref: agePage.plannerHref,
    }
}

export function buildWakeWindowPages(agePages: AgePageModel[] = buildAgePages()): WakeWindowPageModel[] {
    return WAKE_WINDOW_PAGES.map((page) => buildWakeWindowPage(page, agePages))
}

/** The chart page's table: every Tier-1 bracket as a wake-window range. This is
 * the whole answer to `wake window chart` on one screen. */
export function wakeWindowChartRows(pages: WakeWindowPageModel[] = buildWakeWindowPages()): WakeWindowChartRow[] {
    return generalGuidance()
        .brackets.slice()
        .sort((a, b) => a.months[0] - b.months[0])
        .map((bracket) => {
            const spoke = pages.find((p) => p.months >= bracket.months[0] && p.months <= bracket.months[1])
            return {
                ageLabel: `${bracket.months[0]}–${bracket.months[1]} months`,
                range: `${bracket.wwTime[0]}–${bracket.wwTime[1]} min`,
                naps: bracket.naps[0] === bracket.naps[1]
                    ? `${bracket.naps[0]}`
                    : `${bracket.naps[0]}–${bracket.naps[1]}`,
                href: spoke?.path,
            }
        })
}

/** Age pages that have a matching wake-window page, keyed by slug — used to
 * cross-link the two clusters in both directions. */
export function wakeWindowPathByMonths(pages: WakeWindowPageModel[] = buildWakeWindowPages()): Map<number, string> {
    return new Map(pages.map((page) => [page.months, page.path]))
}

/** Sanity check used by the tests: every wake-window page must name an age that
 * a sleep-schedule page also covers. */
export function ageMonthsWithPages(): number[] {
    return AGE_PAGES.map((page) => page.months)
}
