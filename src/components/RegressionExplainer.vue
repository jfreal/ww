<script setup lang="ts">
import { getSources, type CitationSource } from '../models/Citations'
import TierBadge from './TierBadge.vue'

// @doc:regression-progression-explainer
// Static, cited explainer that trades panic for understanding (B06, G03): the
// 4-month change is framed as a one-way progression, 8–10 months as a busy
// developmental window, and the 12/18/24-month "regressions" as commonly cited
// but weakly supported. No LLM, no account — plain content plus tier badges and
// citations, matching the SafeSleep / Troubleshooter panel pattern.

interface Phase {
     age: string
     heading: string
     tier: number
     // Growth-framed explanation; never implies the baby is broken or that a
     // parent caused it.
     body: string[]
     changes: string[]
     sources: CitationSource[]
}

const phases: Phase[] = [
     {
          age: '~4 months',
          heading: 'A permanent step forward, not a blip',
          tier: 1,
          body: [
               'Newborn sleep is simple. Around 4 months the brain’s sleep system matures into adult-style stages, and sleep settles into repeating cycles of about an hour, each ending in a brief stir. Settling back to sleep between cycles is a skill that builds over the months that follow.',
               'The brain change is one-way: it is your baby’s brain maturing on schedule, and it stays. What happens to sleep varies from baby to baby. Studies that follow many babies have not shown night waking rising at 4 months, so if sleep got rougher for yours, that is real, and if it didn’t, nothing was missed. Either way it is growth, not a slide backward — nothing is broken, and nothing went wrong.',
          ],
          changes: [
               'Sleep reorganizes into adult-style stages and cycles of about an hour, with brief stirs between them.',
               'Many parents notice more wakings or shorter naps for a while, though studies of many babies have not shown a 4-month rise.',
               'The skill being built is settling back to sleep between cycles.',
          ],
          sources: getSources(['grigg-damberger-2007', 'hammad-2026', 'scher-1991', 'gilchrist-2025-frontiers', 'henderson-2010', 'sleepfoundation-4mo-regression']),
     },
     {
          age: '~8–10 months',
          heading: 'A big-world, big-feelings window',
          tier: 1,
          body: [
               'Around 8–10 months many babies start crawling or pulling to stand. Small studies link starting to crawl with a stretch of more night waking — the change tracks the new skill, whenever it arrives, not a date on the calendar.',
               'Separation anxiety often gets the blame too, but no study has tested that link, and studies found a baby’s attachment type did not predict how often they wake. It is a busy developmental phase, not a problem to fix and not something you caused.',
          ],
          changes: [
               'Starting to crawl is linked to a temporary rise in night waking.',
               'In one small study, babies who pulled to stand early also slept more restlessly for a while.',
               'Separation anxiety is often blamed for night waking, but that link has not been tested.',
          ],
          sources: getSources(['scher-2015', 'scher-cohen-2005', 'atun-einy-2016', 'scher-2001', 'weinraub-2012']),
     },
     {
          age: '12 / 18 / 24 months',
          heading: 'Commonly cited, but weakly supported',
          tier: 3,
          body: [
               'You will see "12-month" and "18-month regressions" everywhere, but there is little evidence they are universal, built-in events. When sleep gets bumpy at these ages it usually tracks something specific — a nap transition, teething, an illness, or a language or motor burst — rather than a fixed calendar regression.',
               'That is genuinely reassuring: no scheduled setback is coming, and if your toddler is sleeping well, nothing is being skipped. If it is rough right now, that is real too — look at what is actually going on this week rather than blaming the age.',
          ],
          changes: [
               'Studies of many babies find night waking falls overall through toddlerhood, and have not found a setback at 12 or 18 months.',
               'Bumps usually cluster around nap transitions, teething, illness, or skill bursts.',
               'Many experts prefer "progression" over "regression" for this whole first stretch.',
          ],
          sources: getSources(['huckleberry-regression-myth', 'weinraub-2012', 'hysing-2014', 'scher-2015', 'galland-2012']),
     },
]

// Night wakings are normal and near-universal in year one — the reassurance that
// runs under everything above.
const reassuranceSources = getSources(['galland-2012', 'littleones-night-waking', 'babysleepscience-wakings'])
</script>

<template>
     <details class="rounded border border-slate-800">
          <summary class="cursor-pointer select-none px-3 py-3 text-slate-300 text-sm font-semibold">
               Regressions &amp; progressions
               <span class="text-muted font-normal">— what actually changes, and when</span>
          </summary>

          <div class="px-3 pb-3 space-y-3">
               <p class="text-xs text-slate-400">
                    "Sleep regression" is a parenting word, not a medical diagnosis. Most of what it
                    describes is your baby’s brain growing up — real changes, on their own schedule.
                    Here is what shifts at each stage, and how firmly the evidence backs it.
               </p>

               <!-- Reassurance runs first: wakings are normal, nobody is broken. -->
               <div class="rounded border border-emerald-400/30 bg-emerald-400/5 p-3">
                    <div class="flex flex-wrap items-center gap-2">
                         <h3 class="text-emerald-300 text-sm font-semibold">Night wakings are normal</h3>
                         <TierBadge :tier="1" />
                    </div>
                    <p class="mt-1.5 text-sm text-slate-200">
                         Waking between sleep cycles is how infant sleep works, and it stays common across
                         the whole first year. It is not a sign that anything is broken, or that you did
                         something wrong.
                    </p>
                    <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                         <a
                              v-for="src in reassuranceSources"
                              :key="src.id"
                              :href="src.url"
                              target="_blank"
                              rel="noopener noreferrer"
                              :title="src.title"
                              class="link-ext min-h-11"
                         >{{ src.org }} <span aria-hidden="true" class="text-muted">↗</span></a>
                    </div>
               </div>

               <!-- One card per developmental phase. -->
               <div
                    v-for="phase in phases"
                    :key="phase.age"
                    class="rounded border border-slate-800 bg-slate-800/40 p-3"
               >
                    <div class="flex flex-wrap items-center gap-2">
                         <span class="text-slate-100 text-sm font-semibold">{{ phase.age }}</span>
                         <span class="text-slate-400 text-sm">— {{ phase.heading }}</span>
                         <TierBadge :tier="phase.tier" />
                    </div>

                    <p v-for="(paragraph, i) in phase.body" :key="i" class="mt-2 text-sm text-slate-300">
                         {{ paragraph }}
                    </p>

                    <p class="mt-3 eyebrow">What changes</p>
                    <ul class="mt-1 space-y-1 text-sm text-slate-200 list-disc pl-5">
                         <li v-for="point in phase.changes" :key="point">{{ point }}</li>
                    </ul>

                    <div class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                         <a
                              v-for="src in phase.sources"
                              :key="src.id"
                              :href="src.url"
                              target="_blank"
                              rel="noopener noreferrer"
                              :title="src.title"
                              class="link-ext min-h-11"
                         >{{ src.org }} <span aria-hidden="true" class="text-muted">↗</span></a>
                    </div>
               </div>
          </div>
     </details>
</template>
