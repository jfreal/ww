// Google Analytics (GA4), page-view counts only.
//
// A file rather than Google's inline snippet: the CSP in netlify.toml allows
// scripts from 'self' and googletagmanager.com, never inline ones.
//
// Production host only, so dev servers, e2e runs and Netlify deploy previews
// are not counted as visits.
//
// The plan lives in the query string (?bd= is the baby's birthday; s=, note=
// and friends carry the schedule and handoff notes), and gtag sends the full
// URL by default. Both the page and the referrer go out as path only. The
// referrer matters too: Referrer-Policy keeps the full URL on same-origin
// navigation, so planner -> /sleep-schedule/ would otherwise leak the plan.
//
// Enhanced measurement's "page changes based on browser history events" must
// stay OFF in the GA data stream: the planner rewrites its query string with
// history.replaceState, and that listener would report the full URL.
(function () {
  if (location.hostname !== 'wakewindows.guru') return

  var id = 'G-5X9ECGGVGZ'
  var pathOnly = function (url) { return url.split(/[?#]/)[0] }

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('set', { page_location: pathOnly(location.href), page_referrer: pathOnly(document.referrer) })
  gtag('config', id)

  var script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id
  document.head.appendChild(script)
})()
