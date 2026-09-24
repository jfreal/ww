import type { LeafNode, NodeId, TroubleshooterTree } from '../models/Troubleshooter'

// @doc:interactive-troubleshooter

// The three MVP troubleshooter trees (spec B05): early rising, short naps,
// and false start vs split night. Content is drawn from research file
// 02-sleep-foundations-and-nap-transitions.md §§2–4; every non-medical leaf
// carries a Tier 3 badge and named practitioner citations. Tone rules: ranges
// not rules, reassure never scold, disambiguate overtired vs undertired,
// treat pre-6 AM as night, and route red flags to the pediatrician.

const PATIENCE = 'Give any change at least 1–2 weeks before judging it — one better (or worse) day tells you very little.'

// Every tree opens with the same red-flag screen; ids are tree-scoped so the
// shared node id is fine.
const pediatricianLeaf = (id: NodeId): LeafNode => ({
     id,
     kind: 'leaf',
     leafKind: 'medical',
     title: 'Check in with your pediatrician first',
     body: [
          'Illness, fever, ear infections, reflux, or any concern about feeding or weight gain can all disrupt sleep — and none of them are schedule problems. This troubleshooter only covers schedule-shaped issues, so start with your pediatrician and come back once baby is well.',
     ],
})

const earlyRising: TroubleshooterTree = {
     id: 'early-rising',
     title: 'Waking too early',
     tagline: 'The day starts at 5-something and nobody voted for that.',
     rootId: 'screen',
     nodes: [
          {
               id: 'screen',
               kind: 'question',
               prompt: 'First, a quick check: is baby unwell (fever, illness, ear trouble), or do you have any concern about feeding or weight gain?',
               options: [
                    { label: 'Yes — something may be off medically', next: 'pediatrician' },
                    { label: 'No — baby is well', next: 'age' },
               ],
          },
          pediatricianLeaf('pediatrician'),
          // Age gate: schedule-shaped fixes (bedtime moves, nap caps, window
          // stretches) assume a working circadian clock, which only organizes
          // around 3–4 months — route younger babies to cues, not adjustments.
          {
               id: 'age',
               kind: 'question',
               prompt: 'How old is baby (adjusted age, if born early)?',
               options: [
                    { label: 'Under about 4 months', next: 'young-normal' },
                    { label: 'About 4 months or older', next: 'wake-time' },
               ],
          },
          {
               id: 'young-normal',
               kind: 'leaf',
               leafKind: 'reassurance',
               title: "Before ~4 months, early mornings aren't a schedule problem",
               body: [
                    "Regular day/night sleep cycles only begin to organize around 3–4 months, so before then wake-up times drift on their own and no bedtime or nap adjustment reliably moves them. Nothing is broken — the schedule machinery just isn't built yet.",
               ],
               suggestion:
                    'Follow sleepy cues and feed on need; keep nights dark, quiet, and boring, and mornings bright. The schedule-based fixes in this tree start to work from about 4 months (adjusted age) — come back then if early waking persists.',
               patienceNote: 'This one resolves on a developmental timeline measured in weeks and months — no 1–2 week experiment needed yet.',
               tier: 3,
               sourceIds: ['rivkees-2007', 'tcb-early-waking'],
          },
          {
               id: 'wake-time',
               kind: 'question',
               prompt: 'What time is baby waking for the day?',
               options: [
                    { label: 'Before about 6:00 AM', next: 'bedtime-check' },
                    { label: 'Between about 6:00 and 7:00 AM', next: 'normal-morning' },
               ],
          },
          {
               id: 'normal-morning',
               kind: 'leaf',
               leafKind: 'reassurance',
               title: "That's morning — not early rising",
               body: [
                    "It may not feel like it, but a wake-up between roughly 6:00 and 7:00 AM is a developmentally normal start to the day for babies. Sleep practitioners consistently draw the line at ~6:00 AM: before it counts as night, after it counts as morning.",
               ],
               suggestion:
                    'If mornings start earlier than your family would like, shift the whole day — naps, feeds, and bedtime — later in ~15-minute steps over several days, rather than trying to hold baby in bed longer.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-early-waking', 'littleones-early-waking'],
          },
          {
               id: 'bedtime-check',
               kind: 'question',
               prompt: 'Think about bedtime and the day before an early morning. Which sounds closest?',
               options: [
                    { label: 'Bedtime runs late (past ~8:00 PM), or baby is wired and fussy by bedtime', next: 'overtired' },
                    { label: 'Day sleep is generous — naps run past the typical total for their age', next: 'undertired' },
                    { label: 'Neither — bedtime and day sleep look about right', next: 'room-check' },
               ],
          },
          {
               id: 'overtired',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Likely overtired — try an earlier bedtime',
               body: [
                    'It sounds backwards, but a too-late bedtime is one of the most consistently cited causes of early waking. One proposed mechanism: an overtired baby may fall asleep with elevated stress hormones like cortisol, which can fragment the light early-morning sleep between roughly 2:00 and 7:00 AM.',
               ],
               suggestion:
                    'Move bedtime earlier in ~15-minute steps toward the 7:00–8:00 PM range that suits most babies on a stable nap schedule, and protect the last nap so the final wake window doesn\'t run long. After a rough-nap day, an even earlier bedtime helps rather than hurts.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-early-waking', 'littleones-early-waking', 'cozy-early-waking'],
          },
          {
               id: 'undertired',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Likely too much day sleep — trim gently',
               body: [
                    "By 4–5 AM, a night's sleep pressure is nearly spent. If naps give baby more day sleep than they need, there isn't enough pressure left for that final light stretch of night — so the day starts early.",
               ],
               suggestion:
                    "Trim total day sleep gradually — cap the last nap, or shave ~15–30 minutes off the day's naps every few days — or lengthen wake windows in ~15-minute steps, staying inside the typical range for baby's age (see how your plan compares, above).",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['huckleberry-early-risers', 'cozy-early-waking'],
          },
          {
               id: 'room-check',
               kind: 'question',
               prompt: "What's the room like around 5:00 AM?",
               options: [
                    { label: 'Light sneaks in, or the household or street gets noisy', next: 'light' },
                    { label: 'It may be chilly (or warm), or baby wakes genuinely hungry', next: 'comfort' },
                    { label: 'Dark, quiet, and comfortable', next: 'settling-check' },
               ],
          },
          {
               id: 'light',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Dawn light meets the lightest sleep of the night',
               body: [
                    'Sleep between roughly 2:00 and 7:00 AM is the lightest of the whole night, so even a small light leak at dawn — or the neighborhood waking up — can be enough to end it early.',
               ],
               suggestion:
                    'Blackout shades are the single most consistently recommended early-rising fix: aim for genuinely dark, not just dim. Add steady white noise if early-morning household or street sounds line up with the wake-ups.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-early-waking', 'cozy-early-waking'],
          },
          {
               id: 'comfort',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Check temperature both ways — and honor real hunger',
               body: [
                    'The coldest part of the night is just before dawn, and practitioners note babies often wake early simply from being cold. A too-warm room matters even more: overheating and overbundling raise sleep-related risk, so warmth is something to correct down as well as up. Genuine morning hunger is also real — especially in younger babies — and feeding it is not a sleep failure.',
               ],
               suggestion:
                    "Check the room and baby (back of the neck, not hands) and adjust in the right direction: if chilly, try a slightly warmer sleep sack or one extra layer for the second half of the night (about one layer more than an adult would wear); if warm or sweaty, remove a layer — never add one. If hunger drives the waking, a quiet, boring feed and back to bed is a fine answer at many ages — and if you ever suspect feeding or weight is the real issue, that's a pediatrician question, not a schedule one.",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['huckleberry-early-risers', 'littleones-early-waking'],
          },
          {
               id: 'settling-check',
               kind: 'question',
               prompt: 'How does baby usually fall asleep at bedtime?',
               options: [
                    { label: 'Fed, rocked, or held until fully asleep', next: 'settling' },
                    { label: 'Goes into the crib awake and settles independently', next: 'hold-steady' },
               ],
          },
          {
               id: 'settling',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Early morning is the hardest resettle of all',
               body: [
                    "At 5:00 AM sleep pressure is nearly gone, so a baby who needs help falling asleep at bedtime usually can't bridge that last, lightest sleep cycle alone. It's the toughest moment of the night for anyone to fall back asleep — adults included.",
               ],
               suggestion:
                    'Practice independent settling at bedtime first, when sleep pressure is highest and success is most likely — early mornings usually improve after bedtimes do. In the meantime, keep responses before ~6:00 AM brief, boring, and dark: treat it as night, not morning.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-early-waking', 'littleones-early-waking'],
          },
          {
               id: 'hold-steady',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Nothing looks broken — hold steady',
               body: [
                    "Early waking without an obvious cause often rides along with developmental leaps or an approaching nap transition, and it usually passes. Consistency is what teaches baby's body clock that 6:00 AM is still night.",
               ],
               suggestion:
                    'Keep responses before ~6:00 AM dark, quiet, and brief; keep wake-up and nap times steady; and check whether a nap transition is due — nap-fighting, short naps, and early waking arriving together is the classic tell.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['littleones-early-waking', 'huckleberry-early-risers'],
          },
     ],
}

const shortNaps: TroubleshooterTree = {
     id: 'short-naps',
     title: 'Short naps',
     tagline: 'The 30–45 minute nap, a.k.a. the "45-minute intruder."',
     rootId: 'screen',
     nodes: [
          {
               id: 'screen',
               kind: 'question',
               prompt: 'First, a quick check: is baby unwell (fever, illness, ear trouble), or do you have any concern about feeding or weight gain?',
               options: [
                    { label: 'Yes — something may be off medically', next: 'pediatrician' },
                    { label: 'No — baby is well', next: 'age' },
               ],
          },
          pediatricianLeaf('pediatrician'),
          {
               id: 'age',
               kind: 'question',
               prompt: 'How old is baby (adjusted age, if born early)?',
               options: [
                    { label: 'Under about 3 months', next: 'newborn-normal' },
                    { label: 'About 3–6 months', next: 'intruder' },
                    { label: 'Over about 6 months', next: 'pressure' },
               ],
          },
          {
               id: 'newborn-normal',
               kind: 'leaf',
               leafKind: 'reassurance',
               title: 'Short naps are completely normal at this age',
               body: [
                    "Newborn catnaps of 30–45 minutes are normal and expected — daytime sleep is highly variable before consolidation begins around 12–16 weeks. There's nothing here to fix, and nothing you're doing wrong.",
               ],
               suggestion:
                    "Follow sleepy cues and age-range wake windows rather than chasing longer naps; longer, more predictable naps come from maturation, not training. Chronic catnapping most often resolves on its own around 5–6 months.",
               patienceNote: 'Nap consolidation runs on a developmental timeline measured in weeks and months — no 1–2 week experiment needed yet.',
               tier: 3,
               sourceIds: ['huckleberry-catnapping', 'tcb-short-naps'],
          },
          {
               id: 'intruder',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'The classic "45-minute intruder"',
               body: [
                    'Waking ~30–45 minutes into a nap is exactly one sleep cycle. It peaks around 4–5 months, when daytime sleep reorganizes into adult-style cycles, and the missing skill is linking one cycle to the next — which many babies learn on their own by ~5–6 months.',
               ],
               suggestion:
                    "Check the wake window before the short nap against the typical range for baby's age (see how your plan compares, above), then give baby ~10–15 unrushed minutes to resettle at the wake-up before ending the nap. A fully restorative nap is generally 1–1.5 hours, but one good nap a day plus catnaps is a perfectly fine pattern at this age.",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['peaceful-45min', 'huckleberry-catnapping', 'tcb-short-naps'],
          },
          {
               id: 'pressure',
               kind: 'question',
               prompt: 'How does baby act around the short nap?',
               options: [
                    { label: 'Fights going down, or wakes crying after ~30 minutes', next: 'nap-overtired' },
                    { label: 'Goes down easily but wakes cheerful, done with the nap', next: 'nap-undertired' },
                    { label: 'Settles fine, but reliably wakes at the same mark mid-nap', next: 'nap-settling' },
               ],
          },
          {
               id: 'nap-overtired',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Signs point to overtired going in',
               body: [
                    'Waking upset mid-nap is the classic overtired tell: the wake window before that nap likely ran too long. One possibility practitioners cite is that elevated stress hormones can break the nap at the first cycle end.',
               ],
               suggestion:
                    "Shorten the wake window before the short nap by ~15 minutes and hold it there for several days. If naps run short all day, look hardest at the first window of the morning — it should be the day's shortest.",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-short-naps', 'huckleberry-catnapping'],
          },
          {
               id: 'nap-undertired',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Signs point to undertired',
               body: [
                    "Waking cheerful after one cycle usually means there wasn't enough sleep pressure to carry into a second. Wake windows that were right a month ago quietly become too short as babies grow.",
               ],
               suggestion:
                    "Lengthen the wake window before the short nap by ~15 minutes every 2–3 days until naps stretch, staying inside the typical range for baby's age. If baby is 7–9 months and fighting the third nap too, the 3-to-2 nap transition may simply be starting.",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-short-naps', 'huckleberry-catnapping'],
          },
          {
               id: 'nap-settling',
               kind: 'question',
               prompt: 'How does baby fall asleep for naps?',
               options: [
                    { label: 'Fed, rocked, held, or on the go (stroller, car, carrier)', next: 'nap-associations' },
                    { label: 'Independently, in the crib', next: 'nap-practice' },
               ],
          },
          {
               id: 'nap-associations',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Baby may need the same help mid-nap',
               body: [
                    "Falling asleep runs on learned associations. A baby who is fed, rocked, or driven to sleep often needs those exact conditions again to bridge into the next cycle — and they're gone at the 40-minute mark.",
               ],
               suggestion:
                    'Practice one crib nap a day where baby goes down more awake and settles with less help, and keep the nap environment (dark room, white noise) the same at falling-asleep time as it will be mid-nap. Change the association gradually — this is a skill to build, not a switch to flip.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['huckleberry-catnapping', 'tcb-short-naps'],
          },
          {
               id: 'nap-practice',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Cycle-linking just needs practice — and steady timing',
               body: [
                    'Daytime sleep pressure is lower than at night, so linking daytime cycles is the last sleep skill to arrive; some babies simply need repetition. Short naps also cluster around schedule shifts and nap transitions.',
                    // "Crib hour" gets the honest-tiering treatment (research/08 T10):
                    // what it is, that it's a convention with mixed reports, and its
                    // prerequisite — which this branch (independent settling) meets.
                    'You may also see "crib hour" recommended: leaving baby in the crib for a full hour from nap start, if they\'re calm, so wake-ups mid-nap get a real chance to turn back into sleep. It\'s a widespread consultant convention, not a studied protocol — some families see naps lengthen within days, others see no change — and it only makes sense for a baby who already settles independently and stays content. A fussing baby is done; go get them. Nap time ending early is not a failure, theirs or yours.',
               ],
               suggestion:
                    'Hold nap timing steady and give baby ~10–15 minutes to resettle before ending the nap (a calm baby can have up to the full hour, if you want to try the crib-hour convention). If short naps arrived together with nap-fighting and early waking, check whether a nap transition is due; on a short-nap day, protect the night with a slightly earlier bedtime.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['peaceful-45min', 'huckleberry-catnapping', 'pls-short-naps'],
          },
     ],
}

const nightWaking: TroubleshooterTree = {
     id: 'night-waking',
     title: 'False start or split night',
     tagline: 'Awake 45 minutes after bedtime — or wide awake at 2 AM.',
     rootId: 'screen',
     nodes: [
          {
               id: 'screen',
               kind: 'question',
               prompt: 'First, a quick check: is baby unwell (fever, illness, ear trouble), or do you have any concern about feeding or weight gain?',
               options: [
                    { label: 'Yes — something may be off medically', next: 'pediatrician' },
                    { label: 'No — baby is well', next: 'age' },
               ],
          },
          pediatricianLeaf('pediatrician'),
          // Age gate: settling and night-shortening advice below assumes
          // consolidated night sleep, which develops around 3–4 months —
          // younger babies get cue-and-feed reassurance instead.
          {
               id: 'age',
               kind: 'question',
               prompt: 'How old is baby (adjusted age, if born early)?',
               options: [
                    { label: 'Under about 4 months', next: 'young-normal' },
                    { label: 'About 4 months or older', next: 'when' },
               ],
          },
          {
               id: 'young-normal',
               kind: 'leaf',
               leafKind: 'reassurance',
               title: 'Before ~4 months, night wakings are how sleep works',
               body: [
                    'Night sleep consolidates around 3–4 months; before then, waking 45 minutes after bedtime or hanging out awake at 2 AM usually reflects immature sleep cycles plus genuine hunger — not a schedule problem, and not a settling problem to train away.',
               ],
               suggestion:
                    'Respond, feed when hungry, and keep night interactions dim, quiet, and brief. The schedule-shaped fixes in this tree become useful from about 4 months (adjusted age) — come back then if false starts or split nights persist.',
               patienceNote: 'Consolidation runs on a developmental timeline measured in weeks and months — no 1–2 week experiment needed yet.',
               tier: 3,
               sourceIds: ['rivkees-2007', 'babysleepscience-wakings'],
          },
          {
               id: 'when',
               kind: 'question',
               prompt: 'When is the waking happening?',
               options: [
                    { label: 'About 30–45 minutes after bedtime', next: 'bedtime-state' },
                    { label: 'A long stretch awake (1–3 hours) in the middle of the night, often calm or playful', next: 'day-sleep' },
                    { label: 'Brief wakings scattered through the night', next: 'normal-wakings' },
               ],
          },
          {
               id: 'normal-wakings',
               kind: 'leaf',
               leafKind: 'reassurance',
               title: 'Brief night wakings are normal — truly',
               body: [
                    'Everyone, babies and adults alike, surfaces briefly at the end of each sleep cycle. In the first year these arousals are near-universal: roughly 25–50% of babies still wake overnight at 6 months, and "sleeping through the night" in the literature usually means about 6 hours — not 10–12.',
                    'Frequent brief waking is not a sign that your baby is broken or that you have failed. It is how infant sleep works.',
               ],
               suggestion:
                    'If a waking needs a response, keep it dim, quiet, and brief. If baby resettles alone, no fix is required at all.',
               patienceNote: 'If you do change something, still give it at least 1–2 weeks — night-waking patterns shift slowly.',
               tier: 3,
               sourceIds: ['babysleepscience-wakings', 'littleones-night-waking'],
          },
          {
               id: 'bedtime-state',
               kind: 'question',
               prompt: 'A waking ~30–45 minutes after bedtime — one sleep cycle — is a "false start." How was baby at bedtime?',
               options: [
                    { label: 'Cranky and rubbing eyes; fell asleep almost instantly', next: 'fs-overtired' },
                    { label: 'Wide awake; took 20+ minutes to fall asleep, or woke up ready to party', next: 'fs-undertired' },
                    { label: 'Honestly hard to tell', next: 'fs-unclear' },
               ],
          },
          {
               id: 'fs-overtired',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'False start from overtiredness',
               body: [
                    'Crashing in under ~5 minutes and waking upset one cycle later usually means bedtime came too late or the last wake window ran too long: one possibility is that baby fell asleep with elevated stress hormones and popped awake at the first cycle end.',
               ],
               suggestion:
                    'Shorten the last wake window of the day, or move bedtime earlier in ~15-minute steps — a 7:00–8:00 PM bedtime suits most babies on a stable nap schedule. On short-nap days, go earlier still.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-false-starts', 'babysleepscience-wakings'],
          },
          {
               id: 'fs-undertired',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'False start from undertiredness',
               body: [
                    'Taking a long time to fall asleep — or waking up chatty and ready to play — points to low sleep pressure at bedtime: the last wake window was too short, or a long or late last nap ate into it.',
               ],
               suggestion:
                    'Lengthen the last wake window in ~15-minute steps, or cap the last nap (or end it earlier) so a full age-appropriate window fits before bed. Change one thing at a time so you can tell what worked.',
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-false-starts', 'babysleepscience-wakings'],
          },
          {
               id: 'fs-unclear',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Overtired and undertired look confusingly alike',
               body: [
                    'This is the most common trap in sleep troubleshooting — both can produce bedtime tears and a waking one cycle in. The most useful tell is time-to-fall-asleep: crashing in under ~5 minutes leans overtired; taking more than ~20 minutes, or waking cheerful, leans undertired.',
               ],
               suggestion:
                    "Watch bedtime for 3–4 nights and note how long falling asleep takes, then follow the branch that fits. Still ambiguous? Try the earlier-bedtime (overtired) fix first — it's the gentler mistake if the guess is wrong.",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['tcb-false-starts', 'babysleepscience-wakings'],
          },
          {
               id: 'day-sleep',
               kind: 'question',
               prompt: 'A calm, wide-awake stretch of 1–3 hours mid-night is a "split night," and it is almost always about sleep pressure. How does the daytime look?',
               options: [
                    { label: 'Day sleep is generous — long naps, or more total than typical for age', next: 'sn-daysleep' },
                    { label: 'Naps look right, but the night is very long (12+ hours in bed)', next: 'sn-longnight' },
                    { label: 'Neither — this is new, alongside a new skill or a possible nap transition', next: 'sn-developmental' },
               ],
          },
          {
               id: 'sn-daysleep',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Split night from too much day sleep',
               body: [
                    "A split night usually means the sleep-pressure budget ran out in the small hours: baby has already banked enough sleep to burn off the pressure, but the body clock says it's still night — so they lie awake, often perfectly content, until pressure rebuilds.",
               ],
               suggestion:
                    "Bring total day sleep back toward the typical range for baby's age (see how your plan compares, above) — cap marathon naps, or trim ~15–30 minutes gradually rather than all at once — and keep the morning wake-up consistent so it anchors the clock.",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['cozy-split-nights', 'babysleepscience-wakings'],
          },
          {
               id: 'sn-longnight',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'The night may be longer than baby can sleep',
               body: [
                    'If time in bed at night exceeds what baby can actually sleep — most infants max out around 10–12 hours of night sleep — the extra time tends to surface as a wakeful block in the middle of the night.',
               ],
               suggestion:
                    "Shorten the night window to match reality: a later bedtime or an earlier morning wake-up, moved in ~15-minute steps, until time-in-bed roughly matches baby's realistic night-sleep total.",
               patienceNote: PATIENCE,
               tier: 3,
               sourceIds: ['cozy-split-nights', 'babysleepscience-wakings'],
          },
          {
               id: 'sn-developmental',
               kind: 'leaf',
               leafKind: 'advice',
               title: 'Likely developmental — protect the schedule and wait',
               body: [
                    'New motor skills (rolling, crawling, pulling to stand) and looming nap transitions can unsettle night sleep for a while — starting to crawl, for example, is linked to more night waking. It tends to pass on its own; the main job is not to build new habits while it does.',
               ],
               suggestion:
                    'Keep mid-night responses dark, brief, and boring; give lots of daytime practice at the new skill; and if nap-fighting, short naps, and early waking arrive together, check whether a nap transition is due.',
               patienceNote:
                    'No study has timed how long these stretches last, so there is no clock to watch; still give any schedule change at least 1–2 weeks before judging it.',
               tier: 3,
               sourceIds: ['scher-2015', 'scher-cohen-2005', 'littleones-night-waking', 'babysleepscience-wakings'],
          },
     ],
}

export const troubleshooterTrees: TroubleshooterTree[] = [earlyRising, shortNaps, nightWaking]
