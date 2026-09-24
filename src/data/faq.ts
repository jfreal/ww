// @doc:evidence-tier-badges-citations @doc:methodology-sources-page

// The questions parents actually ask, cataloged and answered with citations.
// Curated from the 2026-08 research sweep: research/07-parent-faq-catalog.md
// (60+ questions from expert sites and search patterns) and
// research/08-reddit-field-notes.md (22 recurring community themes). This file
// carries the top questions by frequency; every answer resolves to real
// sources in citations.json and is asserted in faq.test.ts. Tone rules as
// everywhere: ranges not rules, reassure never scold, no diagnosis.

export interface FaqEntry {
    id: string
    question: string
    /** 1–3 sentence cited answer, in the app's calm register. */
    answer: string
    tier: number
    sourceIds: string[]
    /** Where in the app the fuller treatment lives, if anywhere. */
    inApp?: string
}

export const faqEntries: FaqEntry[] = [
    {
        id: 'ww-length',
        question: 'How long should wake windows be at my baby\'s age?',
        answer:
            'There is no studied number — published tables are consultant conventions that disagree by up to '
            + 'a few hours at the same age, which is why this app shows ranges. Start from the cited age '
            + 'ranges above, then adjust to your actual baby: windows that fit last month quietly stop '
            + 'fitting.',
        tier: 2,
        sourceIds: ['tcb-wake-windows', 'cleveland-wake-windows', 'sleepfoundation-wake-windows', 'canapari-critique'],
        inApp: 'the cited guidance panel, and How your plan compares',
    },
    {
        id: 'ww-start',
        question: 'When does the wake window start — and does feeding count?',
        answer:
            'It starts at the real wake-up (alert, eyes open for a while — dozy fussing still counts as '
            + 'sleep), and everything awake counts toward it, feeding included. Time spent settling at the '
            + 'end doesn\'t count against you. Definitions differ by a few minutes between sources; any '
            + 'consistent one lands inside these ranges.',
        tier: 3,
        sourceIds: ['tcb-wake-windows', 'cleveland-wake-windows'],
        inApp: 'What counts as awake?, under the nap schedule',
    },
    {
        id: 'short-naps',
        question: 'Why does my baby only nap 30–45 minutes?',
        answer:
            'That\'s exactly one sleep cycle — the famous "45-minute intruder." It\'s developmentally normal '
            + 'under ~5–6 months and usually resolves as cycle-linking matures; before then, chasing longer '
            + 'naps mostly chases the clock.',
        tier: 3,
        sourceIds: ['peaceful-45min', 'tcb-short-naps', 'pls-short-naps'],
        inApp: 'the Short naps troubleshooter',
    },
    {
        id: 'wake-sleeping-baby',
        question: 'Should I ever wake a sleeping baby?',
        answer:
            'The consultant convention: sometimes — cap marathon naps (~2 h on a multi-nap day, ~3 h on one '
            + 'nap) when nights are suffering. The newest measured evidence is gentler: naps trade only '
            + 'minutes against night sleep, and a nap\'s end time matters more than its length. If nights '
            + 'are fine, let naps be naps.',
        tier: 3,
        sourceIds: ['tcb-wake-sleeping', 'huckleberry-day-sleep', 'reynaud-2026-bmc'],
        inApp: 'Should I wake a sleeping baby?, under the nap schedule',
    },
    {
        id: 'nap-count',
        question: 'How many naps does my baby need?',
        answer:
            'The evidence-based trajectory is broad: roughly 3+ naps at 0–5 months (average 3.1), 2–3 at '
            + '6–11 months, and about 1 from 12–24 months — with wide normal variation at every age. The '
            + 'transitions between counts are bumpier than the counts themselves.',
        tier: 1,
        sourceIds: ['galland-2012', 'mayo-baby-naps'],
        inApp: 'How your plan compares',
    },
    {
        id: 'drop-to-one',
        question: 'When do babies drop to one nap?',
        answer:
            'Most consultant guidance says 13–18 months; mainstream medical sources put the morning-nap drop '
            + 'earlier, at 10–12 months — an honest disagreement. Persistent signs over 2+ weeks (fighting '
            + 'the second nap, EMW, split nights) matter more than the birthday.',
        tier: 3,
        sourceIds: ['huckleberry-nap-transitions', 'mayo-baby-naps'],
        inApp: 'the Nap transitions panel, which watches for this',
    },
    {
        id: 'early-waking',
        question: 'Why is my baby waking at 5 AM?',
        answer:
            'Sleep pressure and melatonin are at their lowest between 4 and 6 AM, so anything slightly off — '
            + 'dawn light, a too-late bedtime, too much day sleep, a chilly room — surfaces there first. '
            + 'Before ~6 AM counts as night; the fixes are gradual and take a week to judge.',
        tier: 3,
        sourceIds: ['tcb-early-waking', 'huckleberry-early-risers'],
        inApp: 'the Waking too early troubleshooter',
    },
    {
        id: 'false-start',
        question: 'Why does my baby wake up 30–45 minutes after bedtime?',
        answer:
            'A "false start" — one sleep cycle in. The tell is bedtime itself: crashing in under ~5 minutes '
            + 'leans overtired (earlier bedtime helps); taking 20+ minutes or waking ready to play leans '
            + 'undertired (a longer last window helps).',
        tier: 3,
        sourceIds: ['tcb-false-starts', 'babysleepscience-wakings'],
        inApp: 'the False start or split night troubleshooter',
    },
    {
        id: 'contact-naps',
        question: 'Are contact naps a bad habit?',
        answer:
            'No. Napping on you is normal, bonding-positive, and doesn\'t ruin independent sleep — many '
            + 'babies outgrow it on their own around 4–6 months. The only hard rule is safety: the adult '
            + 'stays awake, and never doze off together on a couch or armchair.',
        tier: 3,
        sourceIds: ['tcb-contact-naps', 'kellymom-comfort', 'aap-safesleep-2022'],
        inApp: 'Contact naps & naps on the go',
    },
    {
        id: 'cues-or-clock',
        question: 'Should I follow sleepy cues or the clock?',
        answer:
            'Age decides. Under ~5–6 months (corrected) the body clock is still developing, so cues beat '
            + 'the clock; from ~6 months a by-the-clock day becomes realistic, with cues as the second '
            + 'opinion — and after ~9 months cues alone get unreliable (boredom mimics tiredness).',
        tier: 1,
        sourceIds: ['rivkees-2007', 'mindell-2016-app', 'mcgraw-1999'],
        inApp: 'the guidance banner above, which switches modes by age automatically',
    },
    {
        id: 'science',
        question: 'Is there actually any science behind wake windows?',
        answer:
            'Behind the numbers, no — "wake windows" returns zero hits in the sleep-medicine literature, the '
            + 'concept traces to early-2000s sleep consulting, and published tables disagree with each other. '
            + 'Behind the idea, yes: sleep pressure and the circadian clock are real, well-studied biology. '
            + 'That\'s exactly the line this app\'s tier badges draw.',
        tier: 2,
        sourceIds: ['canapari-critique', 'flynnevans-critique', 'oster-parentdata-2024', 'romper-2024'],
        inApp: 'Sources & Evidence',
    },
    {
        id: 'day-night-confusion',
        question: 'My newborn sleeps all day and parties all night — help?',
        answer:
            'Day/night confusion is an immature body clock, not a habit. Bright, active days; dark, boring '
            + 'nights; and gently ending naps past ~2 hours all help it along. It typically resolves by '
            + 'around 8 weeks on its own.',
        tier: 3,
        sourceIds: ['huckleberry-day-night', 'mcgraw-1999'],
    },
    {
        id: 'daycare',
        question: 'Daycare\'s schedule is nothing like ours — is that a problem?',
        answer:
            'No — babies run two schedules better than the internet suggests. Keep your plan at home, let '
            + 'daycare be daycare, and absorb a short-nap day with an earlier bedtime (even ~6 PM) rather '
            + 'than a late rescue nap.',
        tier: 3,
        sourceIds: ['tcb-daycare'],
        inApp: 'Daycare days',
    },
    {
        id: 'preemie',
        question: 'My baby was born early — which age do I use?',
        answer:
            'Adjusted age (actual minus weeks early) is the standard starting point for all sleep '
            + 'expectations through about age two — this app does that automatically from "Weeks in Womb." '
            + 'Many preemies land between adjusted and actual; the baby outranks both numbers.',
        tier: 3,
        sourceIds: ['huckleberry-preemie'],
    },
    {
        id: 'twins',
        question: 'How do twins share one schedule?',
        answer:
            'Sync to the first twin awake and wake the other within ~15–30 minutes; give the sleepier twin '
            + 'the slack (longer nap or earlier bedtime) rather than a separate day. Room-sharing is fine — '
            + 'but one sleep surface each, always.',
        tier: 3,
        sourceIds: ['huckleberry-twins', 'aap-safesleep-2022'],
        inApp: 'Add sibling / twin, which shows both days on one timeline',
    },
    {
        id: 'crib-hour',
        question: 'What is "crib hour" — and does it work?',
        answer:
            'A consultant convention for short naps: leave a calm baby in the crib for the full hour from '
            + 'nap start so mid-nap wake-ups get a chance to turn back into sleep. No study tests it, '
            + 'reports are genuinely mixed, and it only fits a baby who already settles independently — a '
            + 'fussing baby is done, and that\'s fine.',
        tier: 3,
        sourceIds: ['pls-short-naps', 'peaceful-45min'],
        inApp: 'the Short naps troubleshooter',
    },
    {
        id: 'charts-dont-fit',
        question: 'My baby doesn\'t match any chart — is something wrong?',
        answer:
            'Almost certainly not. The landmark datasets show enormous normal variation — at 6 months, '
            + 'normal total sleep spans roughly 9 to 17 hours — and daytime sleep looks biologically driven, '
            + 'so your baby\'s own pattern is the anchor, not the average. High- and low-sleep-needs babies '
            + 'are both normal babies.',
        tier: 1,
        sourceIds: ['iglowstein-2003', 'galland-2012', 'mindell-2010-crosscultural'],
        inApp: 'the Today panel, which averages the days you have actually logged',
    },
    {
        id: 'regression-4mo',
        question: 'The 4-month sleep regression — what is it, and how long does it last?',
        answer:
            'Around 4 months, sleep starts to organize into adult-style stages, and that brain change is '
            + 'permanent — it only moves forward. No study has measured how long any unsettled stretch '
            + 'lasts, and studies that follow many babies have not shown a rise in night waking at 4 '
            + 'months. If your baby\'s sleep shifts, it\'s maturation, not a setback, and nothing you did '
            + 'caused it.',
        tier: 1,
        sourceIds: ['grigg-damberger-2007', 'scher-1991', 'gilchrist-2025-frontiers'],
        inApp: 'the regressions explainer below',
    },
]
