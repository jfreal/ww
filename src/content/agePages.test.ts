import { describe, expect, it } from 'vitest'
import {
    AGE_PAGES,
    bracketForMonths,
    buildAgePages,
    CLUSTER_BASE,
    generalGuidance,
    hubBracketRows,
    scheduleFor,
} from './agePages'
import { applyPlanParams } from '../models/planUrl'
import { ScheduleSetting } from '../models/ScheduleSetting'
import { formatDuration, roundToStep } from '../models/time'

/** Minutes between the two ends of a rendered range like "8:30–9:25 AM". The
 * AM/PM marker is only repeated when the range crosses noon (see formatClockRange). */
function minutesSpanned(range: string): number {
    const [rawStart, rawEnd] = range.split('–')
    const endPeriod = rawEnd.slice(-2)
    const start = toMinutes(rawStart.includes('M') ? rawStart : `${rawStart} ${endPeriod}`)
    return toMinutes(rawEnd) - start
}

function toMinutes(clock: string): number {
    const [time, period] = clock.trim().split(' ')
    const [hours, minutes] = time.split(':').map(Number)
    const base = (hours % 12) * 60 + minutes
    return period === 'PM' ? base + 12 * 60 : base
}

describe('age page definitions', () => {
    it('has a unique slug per page', () => {
        const slugs = AGE_PAGES.map((p) => p.slug)
        expect(new Set(slugs).size).toBe(slugs.length)
    })

    it('orders pages by age', () => {
        const months = AGE_PAGES.map((p) => p.months)
        expect(months).toEqual([...months].sort((a, b) => a - b))
    })
})

// The whole point of generating these pages from the models: a page cannot
// publish a day the app itself would flag as out of range. If an edit to the
// sample windows breaks one of these, the page was about to tell a tired parent
// something the guidance does not support.
describe('every sample day sits inside its own Tier-1 bracket', () => {
    it.each(AGE_PAGES.map((p) => [p.slug, p] as const))('%s', (_slug, page) => {
        const bracket = bracketForMonths(page.months)
        const schedule = scheduleFor(page)

        for (const ww of page.wws) {
            const minutes = ww * 60
            expect(minutes).toBeGreaterThanOrEqual(bracket.wwTime[0])
            expect(minutes).toBeLessThanOrEqual(bracket.wwTime[1])
        }

        expect(schedule.naps).toBeGreaterThanOrEqual(bracket.naps[0])
        expect(schedule.naps).toBeLessThanOrEqual(bracket.naps[1])

        expect(schedule.totalNap).toBeGreaterThanOrEqual(bracket.daySleep[0])
        expect(schedule.totalNap).toBeLessThanOrEqual(bracket.daySleep[1])

        expect(schedule.totalNightSleep).toBeGreaterThanOrEqual(bracket.nightSleep[0])
        expect(schedule.totalNightSleep).toBeLessThanOrEqual(bracket.nightSleep[1])

        expect(schedule.totalSleep).toBeGreaterThanOrEqual(bracket.minSleep)
        expect(schedule.totalSleep).toBeLessThanOrEqual(bracket.maxSleep)
    })

    it('walks the last wake window from the last nap to bedtime', () => {
        for (const page of AGE_PAGES) {
            const schedule = scheduleFor(page)
            const naps = schedule.napTimes
            const lastNapEnd = naps[naps.length - 1].end
            const lastWindowMinutes = page.wws[page.wws.length - 1] * 60
            expect(lastNapEnd + lastWindowMinutes).toBeCloseTo(schedule.bedtimeMinutes, 6)
        }
    })
})

describe('buildAgePages', () => {
    const pages = buildAgePages()

    it('builds one model per definition, at the cluster path', () => {
        expect(pages).toHaveLength(AGE_PAGES.length)
        expect(pages[0].path.startsWith(`${CLUSTER_BASE}/`)).toBe(true)
        expect(pages[0].url.endsWith(pages[0].path)).toBe(true)
    })

    it('renders a row for the wake, every nap, and bedtime', () => {
        for (const page of pages) {
            expect(page.rows).toHaveLength(page.napCount + 2)
            expect(page.rows[0].label).toBe('Wake')
            expect(page.rows[page.rows.length - 1].label).toBe('Bedtime')
        }
    })

    // "naps of about 55 min each" printed above a row spanning 50 minutes is the
    // kind of small contradiction that makes a page look generated. The rows and
    // the published length must come from one rounding, not two.
    it('publishes one nap length that every nap row actually spans', () => {
        for (const page of pages) {
            const napRows = page.rows.filter((row) => row.label.startsWith('Nap'))
            expect(napRows).toHaveLength(page.napCount)

            const expected = roundToStep(
                scheduleFor(page).napTimes[0].end - scheduleFor(page).napTimes[0].start,
            )
            expect(page.napLength).toBe(formatDuration(expected))

            for (const row of napRows) {
                expect(minutesSpanned(row.time)).toBe(expected)
            }
        }
    })

    it('chains previous/next between neighbouring ages', () => {
        expect(pages[0].previous).toBeUndefined()
        expect(pages[0].next?.slug).toBe(pages[1].slug)
        expect(pages[pages.length - 1].next).toBeUndefined()
        expect(pages[1].previous?.slug).toBe(pages[0].slug)
    })

    // The CTA is the only handoff from a content page into the app, so the link
    // has to survive the app's own parser — not just look plausible.
    it('deep-links a planner URL the app parses back to the same day', () => {
        for (const page of pages) {
            const query = new URLSearchParams(page.plannerHref.split('?')[1])
            const schedule = new ScheduleSetting()
            applyPlanParams(schedule, undefined, query.get('s') ?? undefined)
            expect(schedule.wws).toEqual(page.wws)
            expect(schedule.dwt).toBe(page.wakeHour)
            expect(schedule.bed).toBe(page.bedHour)
        }
    })

    it('describes the page with the age’s published ranges', () => {
        const six = pages.find((p) => p.months === 6)!
        expect(six.wakeWindowRange).toEqual([120, 180])
        expect(six.description).toContain('120–180 minute wake windows')
    })
})

describe('hubBracketRows', () => {
    const rows = hubBracketRows()

    it('lists every Tier-1 bracket, youngest first', () => {
        expect(rows).toHaveLength(generalGuidance().brackets.length)
        expect(rows[0].ageLabel).toBe('0–2 months')
    })

    // Every bracket now has at least one page in it. The row links the youngest
    // spoke inside the bracket, so a parent landing on the hub from a bracket
    // row arrives at the page nearest the age they were reading about.
    it('links each bracket to the youngest spoke inside it', () => {
        expect(rows.every((r) => r.href?.startsWith(CLUSTER_BASE))).toBe(true)
        expect(rows.find((r) => r.ageLabel === '0–2 months')?.href).toBe('/sleep-schedule/newborn/')
        expect(rows.find((r) => r.ageLabel === '3–5 months')?.href).toBe('/sleep-schedule/3-month-old/')
        expect(rows.find((r) => r.ageLabel === '18–24 months')?.href).toBe('/sleep-schedule/18-month-old/')
    })
})
