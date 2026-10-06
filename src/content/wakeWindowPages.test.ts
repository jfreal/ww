import { describe, expect, it } from 'vitest'
import { buildAgePages, bracketForMonths, generalGuidance } from './agePages'
import {
    ageMonthsWithPages,
    buildWakeWindowPage,
    buildWakeWindowPages,
    WAKE_WINDOW_BASE,
    WAKE_WINDOW_PAGES,
    wakeWindowChartRows,
} from './wakeWindowPages'
import { renderContentPages, renderWakeWindowChart, renderWakeWindowHub, renderWakeWindowPage } from './renderContentPage'
import { hubBracketRows } from './agePages'
import { formatDuration } from '../models/time'

const agePages = buildAgePages()
const pages = buildWakeWindowPages(agePages)

describe('wake window page definitions', () => {
    it('has a unique slug per page', () => {
        const slugs = WAKE_WINDOW_PAGES.map((p) => p.slug)
        expect(new Set(slugs).size).toBe(slugs.length)
    })

    // A wake-window page borrows its sample day from the age page, so an age
    // with no schedule page would render an empty table — fail loudly instead.
    it('only covers ages that have a sleep-schedule page', () => {
        const covered = ageMonthsWithPages()
        for (const page of WAKE_WINDOW_PAGES) {
            expect(covered).toContain(page.months)
        }
    })

    it('throws rather than rendering an age with no schedule page', () => {
        expect(() =>
            buildWakeWindowPage({ ...WAKE_WINDOW_PAGES[0], months: 7.5 }, agePages),
        ).toThrow(/no sleep-schedule page/)
    })
})

describe('buildWakeWindowPages', () => {
    it('publishes the Tier-1 range for its age', () => {
        for (const page of pages) {
            expect(page.range).toEqual(bracketForMonths(page.months).wwTime)
        }
    })

    // The two clusters answer the same question from different angles. If they
    // ever printed different windows for one age, one of them would be lying.
    it('prints exactly the windows the matching schedule page prints', () => {
        for (const page of pages) {
            const agePage = agePages.find((p) => p.months === page.months)!
            expect(page.sampleWindows).toEqual(agePage.wws.map((ww) => formatDuration(ww * 60)))
            expect(page.plannerHref).toBe(agePage.plannerHref)
            expect(page.schedulePath).toBe(agePage.path)
        }
    })

    it('lives under the wake-windows base path', () => {
        for (const page of pages) {
            expect(page.path.startsWith(`${WAKE_WINDOW_BASE}/`)).toBe(true)
            expect(page.url.endsWith(page.path)).toBe(true)
        }
    })

    it('names the newborn page in words, not months', () => {
        const newborn = pages.find((p) => p.months === 0)!
        expect(newborn.heading).toBe('Newborn wake windows')
        expect(newborn.description).toContain('a newborn')
    })
})

describe('wakeWindowChartRows', () => {
    const rows = wakeWindowChartRows(pages)

    it('covers every Tier-1 bracket', () => {
        expect(rows).toHaveLength(generalGuidance().brackets.length)
        expect(rows[0].range).toBe('35–90 min')
    })

    it('links the brackets that have a page and leaves the rest unlinked', () => {
        expect(rows.find((r) => r.ageLabel === '0–2 months')?.href).toBe('/wake-windows/newborn/')
        // No page for 6-8 or 18-24 months in this tranche.
        expect(rows.find((r) => r.ageLabel === '18–24 months')?.href).toBeUndefined()
    })
})

describe('wake window rendering', () => {
    const page = pages.find((p) => p.months === 6)!

    it('leads with the range and the planner for transactional queries', () => {
        const html = renderWakeWindowPage(page)
        const ctaIndex = html.indexOf('class="cta"')
        const proseIndex = html.indexOf('class="lede"')
        expect(ctaIndex).toBeGreaterThan(-1)
        expect(ctaIndex).toBeLessThan(proseIndex)
    })

    it('cross-links to the matching sleep-schedule page', () => {
        expect(renderWakeWindowPage(page)).toContain(`href="${page.schedulePath}"`)
    })

    it('renders the hub and the chart with every bracket', () => {
        const rows = wakeWindowChartRows(pages)
        const hub = renderWakeWindowHub(pages, rows)
        const chart = renderWakeWindowChart(rows)
        for (const row of rows) {
            expect(hub).toContain(row.ageLabel)
            expect(chart).toContain(row.range)
        }
        expect(hub).toContain('href="/sleep-schedule/"')
    })

    // The term is Tier 2 and the app says so everywhere else; a page named after
    // it must not quietly promote it.
    it('says on the hub that the term is not from the medical literature', () => {
        expect(renderWakeWindowHub(pages, wakeWindowChartRows(pages)))
            .toContain('comes from sleep consultants rather than from the medical literature')
    })
})

describe('renderContentPages with both clusters', () => {
    const emitted = renderContentPages(agePages, hubBracketRows(agePages), pages, wakeWindowChartRows(pages))

    it('emits both hubs, the chart, and every spoke', () => {
        const paths = emitted.map((e) => e.path)
        expect(paths).toContain('/sleep-schedule/')
        expect(paths).toContain('/wake-windows/')
        expect(paths).toContain('/wake-windows/chart/')
        expect(emitted).toHaveLength(agePages.length + pages.length + 3)
    })

    it('cross-links age pages to their wake-window sibling', () => {
        const six = emitted.find((e) => e.path === '/sleep-schedule/6-month-old/')!
        expect(six.html).toContain('href="/wake-windows/6-month-old/"')

        // 8 months has no wake-window page; the link block must not render empty.
        const eight = emitted.find((e) => e.path === '/sleep-schedule/8-month-old/')!
        expect(eight.html).not.toContain('/wake-windows/8-month-old/')
        expect(eight.html).not.toContain('undefined')
    })

    // Search results cut titles past ~60 characters and descriptions past
    // ~155–160; an SEO audit flagged every templated page for running over.
    it('keeps every title and meta description inside SERP limits', () => {
        const unescape = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
        for (const file of emitted) {
            const title = unescape(file.html.match(/<title>(.*?)<\/title>/)![1])
            const description = unescape(file.html.match(/<meta name="description" content="(.*?)" \/>/)![1])
            expect(title.length, `${file.path} title: ${title}`).toBeLessThanOrEqual(60)
            expect(description.length, `${file.path} description: ${description}`).toBeLessThanOrEqual(155)
        }
    })

    it('still emits cluster 1 alone when no wake-window pages are passed', () => {
        const only = renderContentPages(agePages, hubBracketRows(agePages))
        expect(only).toHaveLength(agePages.length + 1)
    })
})
