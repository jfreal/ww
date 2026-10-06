<script setup lang="ts">
// @doc:no-account-privacy-first
// Plain-English "what we don't collect" panel. The architecture is already
// no-account (plan state lives in the URL, computed on-device); this page
// states that promise in words a tired parent can read in ten seconds.
const dontCollect = [
     { what: 'No account', detail: 'No sign-up, no email, no password. Your full plan works without telling us who you are.' },
     { what: 'No data sold', detail: 'Nothing is stored on our servers. There is no server-side profile to sell, share, or leak.' },
     { what: 'Local-first', detail: 'Everything is computed in your browser. The plan lives in the link in your address bar, and travels only when you choose to share that link.' },
     { what: 'No AI training', detail: 'The schedule is transparent arithmetic plus cited ranges. No model is trained on you or your baby.' },
     { what: 'No ads, no ad trackers', detail: "Google Analytics counts page visits. It gets the page address without the plan part, so never your plan, your baby's birthday, or your logs. Like any analytics, it also sees your browser and device type and a rough location from your IP address (Google says it does not store the IP), and sets a cookie (_ga) to tell repeat visits apart. Ad features are switched off. No ad networks, no data brokers." },
]
</script>

<template>
     <details class="rounded border border-slate-800">
          <!-- py-3: 20px line + 24px padding = 44px tap target (F08) -->
          <summary class="cursor-pointer select-none px-3 py-3 text-slate-300 text-sm font-semibold">
               What we don't collect
               <span class="text-muted font-normal">— no account, no data sold, local-first</span>
          </summary>

          <div class="px-3 pb-3 space-y-3">
               <div v-for="item in dontCollect" :key="item.what" class="text-xs">
                    <p class="text-slate-200 font-medium">{{ item.what }}</p>
                    <p class="text-slate-400 mt-0.5">{{ item.detail }}</p>
               </div>

               <p class="text-muted text-xs border-t border-slate-800 pt-2">
                    One honest caveat: because your plan lives in the link, anyone you send the
                    link to can see the birthday and schedule in it. Share it like you'd share
                    the schedule itself.
               </p>
          </div>
     </details>
</template>
