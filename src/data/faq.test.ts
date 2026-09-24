import { describe, it, expect } from 'vitest';
import { faqEntries } from './faq';
import { getSource, getSources } from '../models/Citations';
import { SCOLDING_PATTERN } from '../models/tone';

// @doc:evidence-tier-badges-citations
// The FAQ is cited content: every entry must resolve to real sources so the
// panel never renders an empty citation, and the tone rules are enforced the
// same way the e2e anti-anxiety spec enforces them on the page.
describe('FAQ data integrity', () => {
    it('has a meaningful catalog', () => {
        expect(faqEntries.length).toBeGreaterThanOrEqual(15);
    });

    it('every entry has a unique id', () => {
        const ids = faqEntries.map((e) => e.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('every entry is a real question with a substantive answer', () => {
        for (const e of faqEntries) {
            expect(e.question.trim().endsWith('?'), `question "${e.id}" should end with ?`).toBe(true);
            expect(e.answer.length, `answer "${e.id}" too short`).toBeGreaterThan(80);
        }
    });

    it('every entry has a known tier and resolvable sources', () => {
        for (const e of faqEntries) {
            expect([1, 2, 3], `bad tier on "${e.id}"`).toContain(e.tier);
            expect(e.sourceIds.length, `no sources on "${e.id}"`).toBeGreaterThan(0);
            for (const id of e.sourceIds) {
                expect(getSource(id), `missing source "${id}" on faq "${e.id}"`).toBeDefined();
            }
            expect(getSources(e.sourceIds).length).toBe(e.sourceIds.length);
        }
    });

    // The badge must not outrank everything behind it. Deliberately "at least one
    // source at or above the claimed tier" rather than "every source" — an answer
    // is allowed to hang a Tier 3 practitioner explainer next to the Tier 1 study
    // it popularizes, which is the whole point of showing both. What this catches
    // is the real over-claim: a Tier 1 badge with nothing but blogs under it.
    it('no entry claims a stronger tier than its best source supports', () => {
        for (const e of faqEntries) {
            const tiers = getSources(e.sourceIds).map((s) => s.tier);
            expect(Math.min(...tiers), `"${e.id}" claims tier ${e.tier} with sources ${tiers.join('/')}`)
                .toBeLessThanOrEqual(e.tier);
        }
    });

    it('answers never scold (anti-anxiety tone rules)', () => {
        for (const e of faqEntries) {
            expect(e.answer, `scolding language in "${e.id}"`).not.toMatch(SCOLDING_PATTERN);
        }
    });

    // research/10 (H11, F12): no source gives the "regression" a duration — the
    // popular 2–6 weeks is blog-only. The answer rests on the permanent brain
    // change and the population studies instead.
    it('the 4-month regression answer states no duration', () => {
        const entry = faqEntries.find((e) => e.id === 'regression-4mo');
        expect(entry).toBeDefined();
        expect(entry!.answer).not.toMatch(/\d\s*[–-]\s*\d+\s*weeks?/);
        expect(entry!.sourceIds).toEqual(
            expect.arrayContaining(['grigg-damberger-2007', 'scher-1991', 'gilchrist-2025-frontiers']),
        );
    });

    it('covers the highest-frequency themes from the research sweep', () => {
        const ids = new Set(faqEntries.map((e) => e.id));
        // The top-ten FAQ themes (research/07) that had no prior app coverage.
        for (const required of [
            'ww-start',
            'contact-naps',
            'wake-sleeping-baby',
            'daycare',
            'crib-hour',
            'day-night-confusion',
            'charts-dont-fit',
        ]) {
            expect(ids.has(required), `missing FAQ "${required}"`).toBe(true);
        }
    });
});
