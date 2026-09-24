import { describe, it, expect } from 'vitest';
import {
    answeredSteps,
    chooseOption,
    createSession,
    currentNode,
    goBack,
    isComplete,
    nodeById,
    validateTree,
    type TroubleshooterTree,
} from './Troubleshooter';
import { troubleshooterTrees } from '../data/troubleshooterTrees';
import { getSource, getTier } from './Citations';

// @doc:interactive-troubleshooter

const sample: TroubleshooterTree = {
    id: 'sample',
    title: 'Sample',
    tagline: 'test tree',
    rootId: 'q1',
    nodes: [
        {
            id: 'q1',
            kind: 'question',
            prompt: 'First question?',
            options: [
                { label: 'To q2', next: 'q2' },
                { label: 'To leaf A', next: 'a' },
            ],
        },
        {
            id: 'q2',
            kind: 'question',
            prompt: 'Second question?',
            options: [
                { label: 'To leaf A', next: 'a' },
                { label: 'To leaf B', next: 'b' },
            ],
        },
        {
            id: 'a',
            kind: 'leaf',
            leafKind: 'advice',
            title: 'Leaf A',
            body: ['Body A'],
            suggestion: 'Do a thing',
            patienceNote: 'Give it 1–2 weeks',
            tier: 3,
            sourceIds: ['tcb-early-waking'],
        },
        { id: 'b', kind: 'leaf', leafKind: 'medical', title: 'Leaf B', body: ['See a doctor'] },
    ],
};

describe('troubleshooter engine', () => {
    it('starts a session at the root, incomplete', () => {
        const s = createSession(sample);
        expect(currentNode(s).id).toBe('q1');
        expect(isComplete(s)).toBe(false);
        expect(answeredSteps(s)).toEqual([]);
    });

    it('advances on chooseOption and records the step', () => {
        let s = createSession(sample);
        s = chooseOption(s, 0);
        expect(currentNode(s).id).toBe('q2');
        expect(answeredSteps(s)).toEqual([{ prompt: 'First question?', answer: 'To q2' }]);
        s = chooseOption(s, 1);
        expect(currentNode(s).id).toBe('b');
        expect(isComplete(s)).toBe(true);
        expect(answeredSteps(s).length).toBe(2);
    });

    it('is immutable: choosing returns a new session, original untouched', () => {
        const s0 = createSession(sample);
        const s1 = chooseOption(s0, 0);
        expect(s0.path).toEqual(['q1']);
        expect(s1).not.toBe(s0);
        expect(s1.path).toEqual(['q1', 'q2']);
    });

    it('ignores an invalid option index and choices on a leaf', () => {
        const s = createSession(sample);
        expect(chooseOption(s, 99)).toBe(s);
        const atLeaf = chooseOption(s, 1);
        expect(currentNode(atLeaf).id).toBe('a');
        expect(chooseOption(atLeaf, 0)).toBe(atLeaf);
    });

    it('goBack pops one step and is a no-op at the root', () => {
        const s = createSession(sample);
        expect(goBack(s)).toBe(s);
        const forward = chooseOption(chooseOption(s, 0), 0);
        const back = goBack(forward);
        expect(currentNode(back).id).toBe('q2');
        expect(answeredSteps(back).length).toBe(1);
    });

    it('nodeById throws for an unknown node', () => {
        expect(() => nodeById(sample, 'nope')).toThrow(/no node "nope"/);
    });
});

describe('validateTree', () => {
    it('accepts the sample tree', () => {
        expect(validateTree(sample)).toEqual([]);
    });

    it('flags a missing root', () => {
        expect(validateTree({ ...sample, rootId: 'ghost' })).toContain('rootId "ghost" does not exist');
    });

    it('flags dangling edges and unreachable nodes', () => {
        const broken: TroubleshooterTree = {
            ...sample,
            nodes: [
                {
                    id: 'q1',
                    kind: 'question',
                    prompt: '?',
                    options: [
                        { label: 'x', next: 'ghost' },
                        { label: 'y', next: 'a' },
                    ],
                },
                sample.nodes.find((n) => n.id === 'a')!,
                sample.nodes.find((n) => n.id === 'b')!,
            ],
        };
        const errors = validateTree(broken);
        expect(errors.some((e) => e.includes('missing node "ghost"'))).toBe(true);
        expect(errors.some((e) => e.includes('"b" is unreachable'))).toBe(true);
    });

    it('flags cycles', () => {
        const cyclic: TroubleshooterTree = {
            ...sample,
            nodes: [
                { id: 'q1', kind: 'question', prompt: '?', options: [{ label: 'x', next: 'q2' }, { label: 'y', next: 'a' }] },
                { id: 'q2', kind: 'question', prompt: '?', options: [{ label: 'back', next: 'q1' }, { label: 'out', next: 'a' }] },
                sample.nodes.find((n) => n.id === 'a')!,
            ],
        };
        expect(validateTree(cyclic).some((e) => e.includes('cycle'))).toBe(true);
    });

    it('flags an uncited or suggestion-less non-medical leaf', () => {
        const bare: TroubleshooterTree = {
            ...sample,
            rootId: 'q',
            nodes: [
                { id: 'q', kind: 'question', prompt: '?', options: [{ label: 'x', next: 'bad' }, { label: 'y', next: 'bad' }] },
                { id: 'bad', kind: 'leaf', leafKind: 'advice', title: 'Bad', body: ['no meta'] },
            ],
        };
        const errors = validateTree(bare);
        expect(errors.some((e) => e.includes('no evidence tier'))).toBe(true);
        expect(errors.some((e) => e.includes('no citations'))).toBe(true);
        expect(errors.some((e) => e.includes('no patience note'))).toBe(true);
        expect(errors.some((e) => e.includes('no concrete suggestion'))).toBe(true);
    });
});

describe('shipped trees (spec B05)', () => {
    it('ships the three MVP trees with unique ids', () => {
        expect(troubleshooterTrees.length).toBe(3);
        expect(new Set(troubleshooterTrees.map((t) => t.id)).size).toBe(3);
    });

    it('every tree validates clean', () => {
        for (const tree of troubleshooterTrees) {
            expect(validateTree(tree), tree.id).toEqual([]);
        }
    });

    it('every tree has a pediatrician red-flag exit', () => {
        for (const tree of troubleshooterTrees) {
            const medical = tree.nodes.filter((n) => n.kind === 'leaf' && n.leafKind === 'medical');
            expect(medical.length, tree.id).toBeGreaterThan(0);
            for (const leaf of medical) {
                if (leaf.kind !== 'leaf') continue;
                expect(leaf.body.join(' ')).toMatch(/pediatrician/i);
            }
        }
    });

    it('every non-medical leaf is Tier 3 with resolvable citations and a patience note', () => {
        expect(getTier(3)).toBeDefined();
        for (const tree of troubleshooterTrees) {
            for (const node of tree.nodes) {
                if (node.kind !== 'leaf' || node.leafKind === 'medical') continue;
                const label = `${tree.id}/${node.id}`;
                expect(node.tier, label).toBe(3);
                expect(node.patienceNote, label).toMatch(/1–2 week/);
                // Assert the list is non-empty first: the loop below is vacuous on
                // an empty or missing sourceIds, so an uncited leaf would sail
                // through a test whose name promises it can't.
                expect(node.sourceIds?.length ?? 0, `${label} has no citations`).toBeGreaterThan(0);
                for (const id of node.sourceIds ?? []) {
                    expect(getSource(id), `${label} cites missing source ${id}`).toBeDefined();
                }
            }
        }
    });

    // research/10 (E10, T6, X10): no source times a developmental "regression",
    // so no leaf may promise one settles within N weeks.
    it('no leaf states how long a developmental stretch lasts', () => {
        for (const tree of troubleshooterTrees) {
            for (const node of tree.nodes) {
                if (node.kind !== 'leaf') continue;
                const text = [...node.body, node.suggestion ?? '', node.patienceNote ?? ''].join(' ');
                expect(text, `${tree.id}/${node.id}`).not.toMatch(/2\s*[–-]\s*6 weeks/);
            }
        }
    });

    it('cites the practitioner set named in the spec', () => {
        const orgs = new Set<string>();
        for (const tree of troubleshooterTrees) {
            for (const node of tree.nodes) {
                if (node.kind !== 'leaf') continue;
                for (const id of node.sourceIds ?? []) {
                    const src = getSource(id);
                    if (src) orgs.add(src.org);
                }
            }
        }
        for (const name of ['Taking Cara Babies', 'Huckleberry', 'Little Ones', 'Cozy Baby Sleep', 'Baby Sleep Science']) {
            expect(orgs, `missing ${name}`).toContain(name);
        }
    });
});
