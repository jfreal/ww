import { describe, it, expect } from 'vitest';
import {
    ageBandForMonths,
    recommendationForMonths,
    getSource,
    getSources,
    getTier,
    sources,
    tiers,
    ageBandRecommendations,
    meta,
} from './Citations';

describe('Citations data integrity', () => {
    it('loads sources, tiers, recommendations, and meta', () => {
        expect(sources.length).toBeGreaterThan(0);
        expect(tiers['1']).toBeDefined();
        expect(tiers['2']).toBeDefined();
        expect(tiers['3']).toBeDefined();
        expect(ageBandRecommendations.length).toBeGreaterThan(0);
        expect(meta.lastVerified).toBeTruthy();
    });

    it('every source has a known tier (1, 2, or 3)', () => {
        for (const s of sources) {
            expect([1, 2, 3]).toContain(s.tier);
        }
    });

    it('every source names an author/org with credentials and a link', () => {
        for (const s of sources) {
            expect(s.org).toBeTruthy();
            expect(s.credentials).toBeTruthy();
            expect(s.url).toMatch(/^https?:\/\//);
        }
    });

    it('every recommendation sourceId resolves to a real source', () => {
        for (const band of ageBandRecommendations) {
            for (const item of band.items) {
                expect(item.sourceIds.length).toBeGreaterThan(0);
                for (const id of item.sourceIds) {
                    expect(getSource(id), `missing source ${id}`).toBeDefined();
                }
            }
        }
    });

    it('wake-window items are Tier 2; total-sleep items are Tier 1', () => {
        for (const band of ageBandRecommendations) {
            for (const item of band.items) {
                if (item.metric === 'Wake window') expect(item.tier).toBe(2);
                if (item.metric === 'Total sleep / 24h') expect(item.tier).toBe(1);
            }
        }
    });
});

// @doc:regression-progression-explainer
describe('regression / progression explainer sources', () => {
    // B06 cites a mix of Tier-1 biology and consultant framing; these entries
    // must resolve so RegressionExplainer.vue never renders an empty citation.
    it('resolves every source id the explainer references', () => {
        const ids = [
            'henderson-2010',
            'jenni-lebourgeois-2006',
            'sleepfoundation-4mo-regression',
            'scher-2015',
            'tcb-separation-anxiety',
            'seehagen-2015',
            'huckleberry-regression-myth',
            'galland-2012',
            'littleones-night-waking',
            'babysleepscience-wakings',
        ];
        expect(getSources(ids).length).toBe(ids.length);
    });

    it('tiers the 4-month biology as Tier 1 and the disputed later regressions as Tier 3', () => {
        expect(getSource('henderson-2010')?.tier).toBe(1);
        expect(getSource('sleepfoundation-4mo-regression')?.tier).toBe(2);
        expect(getSource('huckleberry-regression-myth')?.tier).toBe(3);
    });
});

describe('sleep-regression cluster sources (docs/research/10)', () => {
    // The /sleep-regressions pages (#32) may only cite claims sourced in doc 10;
    // the Tier-1 studies it added here must resolve and stay Tier 1.
    it('resolves every Tier-1 source the sourcing doc added', () => {
        const ids = [
            'grigg-damberger-2007',
            'hammad-2026',
            'kennaway-1992',
            'scher-1991',
            'goodlin-jones-2001',
            'scher-cohen-2005',
            'atun-einy-2016',
            'demasi-2023',
            'scher-2001',
            'brooker-2013',
            'weinraub-2012',
            'pennestri-2018',
            'hysing-2014',
            'macknin-2000',
            'nakagawa-2016',
            'dionne-2011',
        ];
        expect(getSources(ids).length).toBe(ids.length);
        for (const id of ids) expect(getSource(id)?.tier, id).toBe(1);
    });

    it('has no duplicate source ids', () => {
        const ids = sources.map((s) => s.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

// @doc:sleep-training-overview
describe('sleep-training overview sources', () => {
    // B07 cites Tier-1 efficacy/safety evidence plus the weak (Tier-3) Middlemiss
    // cortisol study; these must resolve so SleepTrainingOverview.vue never renders
    // an empty citation.
    it('resolves every source id the overview references', () => {
        const ids = [
            'mindell-2006-aasm',
            'mindell-2009-routine-rct',
            'price-2012-followup',
            'middlemiss-2012',
            'paruthi-2016',
        ];
        expect(getSources(ids).length).toBe(ids.length);
    });

    it('tiers the efficacy/safety evidence as Tier 1 and the weak cortisol study as Tier 3', () => {
        expect(getSource('mindell-2006-aasm')?.tier).toBe(1);
        expect(getSource('mindell-2009-routine-rct')?.tier).toBe(1);
        expect(getSource('price-2012-followup')?.tier).toBe(1);
        expect(getSource('middlemiss-2012')?.tier).toBe(3);
    });
});

describe('ageBandForMonths', () => {
    it('maps months to the expected band', () => {
        expect(ageBandForMonths(0)).toBe('0-3mo');
        expect(ageBandForMonths(2)).toBe('0-3mo');
        expect(ageBandForMonths(3)).toBe('3-4mo');   // boundary → more advanced band
        expect(ageBandForMonths(4)).toBe('4-6mo');
        expect(ageBandForMonths(5)).toBe('4-6mo');
        expect(ageBandForMonths(6)).toBe('6-9mo');
        expect(ageBandForMonths(9)).toBe('9-12mo');
        expect(ageBandForMonths(12)).toBe('12-18mo');
        expect(ageBandForMonths(18)).toBe('18-24mo');
        expect(ageBandForMonths(23)).toBe('18-24mo');
    });

    it('clamps out-of-range ages', () => {
        expect(ageBandForMonths(-1)).toBe('0-3mo');
        expect(ageBandForMonths(24)).toBe('18-24mo');
        expect(ageBandForMonths(40)).toBe('18-24mo');
    });

    it('resolves a recommendation for every month 0..24', () => {
        for (let m = 0; m <= 24; m++) {
            expect(recommendationForMonths(m), `no rec for ${m} mo`).toBeDefined();
        }
    });
});

describe('source helpers', () => {
    it('getSource returns undefined for unknown ids', () => {
        expect(getSource('does-not-exist')).toBeUndefined();
    });

    it('getSources filters out unknown ids', () => {
        const result = getSources(['paruthi-2016', 'nope']);
        expect(result.length).toBe(1);
        expect(result[0].id).toBe('paruthi-2016');
    });

    it('getTier returns the tier definition', () => {
        expect(getTier(1).id).toBe(1);
        expect(getTier(2).id).toBe(2);
    });
});
