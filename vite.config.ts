/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { buildAgePages, hubBracketRows } from './src/content/agePages'
import { escapeHtml, renderContentPages, renderSitemap } from './src/content/renderContentPage'
import { buildWakeWindowPages, wakeWindowChartRows } from './src/content/wakeWindowPages'

/** Paths the generated content pages own. Keep in step with the navigation
 * denylist in src/sw.ts — both must cover exactly the same routes. */
const CONTENT_ROUTES = /^\/(sleep-schedule|wake-windows)(\/|$)/

/** Both clusters, in one list: the age schedules and the wake-window pages. */
function allContentPages() {
  const pages = buildAgePages()
  const wakeWindows = buildWakeWindowPages(pages)
  return renderContentPages(pages, hubBracketRows(pages), wakeWindows, wakeWindowChartRows(wakeWindows))
}

/** Fill the homepage's static link lists (index.html) from the same page data
 * the content pages are built from, so a new age page shows up there too. */
function homepageLinkLists(html: string): string {
  const pages = buildAgePages()
  const list = (items: { path: string; heading: string }[]) =>
    items.map((p) => `        <li><a href="${p.path}">${escapeHtml(p.heading)}</a></li>`).join('\n')
  return html
    .replace('<!--sleep-schedule-links-->', list(pages))
    .replace('<!--wake-window-links-->', list(buildWakeWindowPages(pages)))
}

// SEO clusters 1 and 2 (docs/research/seo-topic-clusters.md): emit the static
// `/sleep-schedule/*` and `/wake-windows/*` pages, plus the sitemap, at build
// time.
//
// Static emission rather than a router + SSG framework: these pages are
// documents with no app state, the app itself stays a single-route SPA, and
// nothing new is added to the client bundle. The sitemap is generated here so
// it can never fall behind the pages that exist — the hand-maintained
// public/sitemap.xml listed one URL and would have gone stale on the first
// page added.
function wakeWindowsContentPages(): Plugin {
  return {
    name: 'wake-windows-content-pages',
    // Dev serves the same rendered HTML from memory. Without this the pages
    // only exist after a production build, so `npm run dev` would 404 on the
    // footer link and there would be no way to look at them while editing.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? '').split('?')[0]
        // Boundary-aware, and deliberately the same shape as the service
        // worker's denylist in src/sw.ts: a plain startsWith would also claim
        // /sleep-schedule-archive and friends.
        if (!CONTENT_ROUTES.test(path)) return next()

        const emitted = allContentPages()
        const wanted = path.endsWith('/') ? `${path.slice(1)}index.html` : `${path.slice(1)}/index.html`
        const match = emitted.find((page) => page.fileName === wanted)
        if (!match) return next()

        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(match.html)
      })
    },
    transformIndexHtml: homepageLinkLists,
    generateBundle() {
      const emitted = allContentPages()

      for (const page of emitted) {
        this.emitFile({ type: 'asset', fileName: page.fileName, source: page.html })
      }
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: renderSitemap(emitted.map((page) => page.path)),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    wakeWindowsContentPages(),
    // F07 Offline Mode — precache the whole built app so a plan renders and
    // recomputes with no network. citations.json is bundled into the JS via
    // import (models/Citations.ts), so evidence content is covered by the JS
    // glob. registerType 'prompt' pairs with OfflineIndicator.vue: new deploys
    // are announced instead of silently pinning a stale service worker.
    //
    // F01 Reminders — the pre-nap nudge schedules notifications from inside the
    // SW (a backgrounded tab throttles setTimeout), so we host a custom worker
    // (src/sw.ts) via injectManifest instead of generateSW. That file still does
    // the F07 precache + SPA navigation fallback + prompt update handshake, so
    // offline behavior is unchanged; it just adds the nudge message handlers.
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'Wake Windows — Infant Nap Schedule Planner',
        short_name: 'Wake Windows',
        description:
          "Plan an infant's nap schedule from wake windows, age, and bedtime — checked against cited sleep guidance.",
        theme_color: '#f6f0e6',
        background_color: '#f6f0e6',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      injectManifest: {
        // Same precache surface generateSW used; cleanupOutdatedCaches is now
        // called from sw.ts instead of being a build flag.
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      },
    }),
  ],
  server: {
    // Dev-server port can be assigned externally (PORT env, e.g. by a preview
    // harness); Vite's default applies otherwise.
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  test: {
    // e2e/ holds Playwright specs (npm run test:e2e); Vitest must not load them.
    // .claude/worktrees/ holds full checkouts of parallel feature branches,
    // each with its own e2e/ — without this, `npm test` collects those too and
    // reports 44 failed files that are really just Playwright specs loaded by
    // the wrong runner, drowning the actual result.
    exclude: [...configDefaults.exclude, 'e2e/**', '.claude/**'],
  },
})
