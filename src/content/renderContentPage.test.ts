import { describe, expect, it } from 'vitest'
import { buildAgePages, hubBracketRows, SITE_ORIGIN } from './agePages'
import {
    escapeHtml,
    renderAgePage,
    renderContentPages,
    renderHubPage,
    renderSitemap,
} from './renderContentPage'

const pages = buildAgePages()
const rows = hubBracketRows(pages)

/** Pull the JSON-LD graph back out of rendered HTML. */
function jsonLd(html: string): any {
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    expect(match).toBeTruthy()
    return JSON.parse(match![1])
}

describe('escapeHtml', () => {
    it('escapes the characters that would break out of an attribute or a tag', () => {
        expect(escapeHtml('a & b <c> "d"')).toBe('a &amp; b &lt;c&gt; &quot;d&quot;')
    })
})

describe('renderAgePage', () => {
    const page = pages.find((p) => p.months === 4)!
    const html = renderAgePage(page)

    it('carries a title, description, and self-referencing canonical', () => {
        // The title carries an ampersand, so this also pins that it is escaped.
        expect(html).toContain(`<title>${escapeHtml(page.title)}</title>`)
        expect(html).toContain('&amp; wake windows</title>')
        expect(html).toContain(`<meta name="description" content="${escapeHtml(page.description)}" />`)
        expect(html).toContain(`<link rel="canonical" href="${SITE_ORIGIN}${page.path}" />`)
    })

    it('prints the computed day rather than placeholder times', () => {
        for (const row of page.rows) {
            expect(html).toContain(row.time)
        }
    })

    it('links the planner, the hub, and both neighbouring ages', () => {
        expect(html).toContain(`href="${page.plannerHref}"`)
        expect(html).toContain('href="/sleep-schedule/"')
        expect(html).toContain(`href="/sleep-schedule/${page.previous!.slug}/"`)
        expect(html).toContain(`href="/sleep-schedule/${page.next!.slug}/"`)
    })

    it('emits Article, FAQPage, and BreadcrumbList structured data', () => {
        const graph = jsonLd(html)['@graph']
        const types = graph.map((node: any) => node['@type'])
        expect(types).toContain('Article')
        expect(types).toContain('FAQPage')
        expect(types).toContain('BreadcrumbList')

        const faq = graph.find((node: any) => node['@type'] === 'FAQPage')
        expect(faq.mainEntity).toHaveLength(page.faqs.length)
        expect(faq.mainEntity[0].acceptedAnswer.text).toBe(page.faqs[0].answer)
    })

    // YMYL page: the tier caveat and the not-medical-advice line are not
    // decoration, and a refactor that drops them changes what the page claims.
    it('keeps the evidence-tier caveat and the medical disclaimer', () => {
        expect(html).toContain('Tier 2 practice-based heuristic')
        expect(html).toContain('not medical advice')
    })

    it('renders no unresolved template holes', () => {
        expect(html).not.toContain('undefined')
        expect(html).not.toContain('NaN')
    })
})

describe('renderHubPage', () => {
    const html = renderHubPage(pages, rows)

    it('links every spoke', () => {
        for (const page of pages) {
            expect(html).toContain(`href="${page.path}"`)
        }
    })

    it('lists every bracket, including ages with no page yet', () => {
        for (const row of rows) {
            expect(html).toContain(row.ageLabel)
        }
    })

    it('describes itself as a CollectionPage covering the spokes', () => {
        const graph = jsonLd(html)['@graph']
        const collection = graph.find((node: any) => node['@type'] === 'CollectionPage')
        expect(collection.hasPart).toHaveLength(pages.length)
    })
})

describe('renderContentPages', () => {
    const emitted = renderContentPages(pages, rows)

    it('emits the hub first, then one directory-index per spoke', () => {
        expect(emitted[0].fileName).toBe('sleep-schedule/index.html')
        expect(emitted).toHaveLength(pages.length + 1)
        for (const file of emitted.slice(1)) {
            expect(file.fileName).toMatch(/^sleep-schedule\/[a-z0-9-]+\/index\.html$/)
        }
    })

    it('gives every emitted file a canonical path that matches its location', () => {
        for (const file of emitted) {
            expect(file.fileName).toBe(`${file.path.replace(/^\//, '')}index.html`)
        }
    })
})

describe('renderSitemap', () => {
    const emitted = renderContentPages(pages, rows)
    const xml = renderSitemap(emitted.map((e) => e.path), '2026-08-21')

    it('lists the app root plus every generated page', () => {
        expect(xml).toContain(`<loc>${SITE_ORIGIN}/</loc>`)
        for (const file of emitted) {
            expect(xml).toContain(`<loc>${SITE_ORIGIN}${file.path}</loc>`)
        }
        expect(xml.match(/<url>/g)).toHaveLength(emitted.length + 1)
    })

    it('keeps the app root at the highest priority', () => {
        expect(xml).toContain('<priority>1.0</priority>')
        expect(xml.match(/<priority>1\.0<\/priority>/g)).toHaveLength(1)
    })
})
