<p align="center">
  <img src="src/assets/logo.png" alt="Wake Windows" height="96" />
</p>

<h1 align="center">Wake Windows</h1>

<p align="center">
  A nap-schedule planner for parents of infants — turn a baby's age, wake windows,
  and bedtime into a clear daily sleep plan, checked against published guidance.
</p>

<p align="center">
  <a href="https://wake-windows.netlify.app"><img src="https://img.shields.io/badge/Live_Demo-wake--windows.netlify.app-2563eb?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white" alt="Vue 3.5" />
  <img src="https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind 4" />
  <img src="https://img.shields.io/badge/tested_with-Vitest-6da13f?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/tests-47_passing-2ea44f" alt="47 tests passing" />
</p>

---

## Overview

Newborn sleep runs on **wake windows** — the amount of awake time a baby can comfortably
handle between naps — not the clock. **Wake Windows** lets a parent enter their baby's
birthday, wake time, wake-window lengths, and bedtime, then instantly see:

- a **clock-time nap schedule** (`Wake 7:00 AM → Nap 1 9:00–10:20 → … → Bed 7:00 PM`),
- a **24-hour visual breakdown** of wake / nap / night sleep,
- and how the plan compares to **published, cited sleep guidance** for the baby's age.

> **[▶ Try the live app](https://wake-windows.netlify.app)** — enter a birthday and a few
> wake windows; the schedule and the shareable URL update as you type.

## Features

| | |
|---|---|
| 🍼 **Wake-window planner** | Computes total nap, night, and wake time and renders an actual clock schedule for each nap. |
| 📊 **24-hour visual breakdown** | A proportional bar shows the day split across wake, night sleep, and naps at a glance. |
| 👶 **Corrected-age adjustment** | Accounts for gestational age, so a premature baby is mapped to the right developmental stage. |
| 📚 **Cited recommendations** | Compares the schedule against age brackets (0–24 months) from multiple sources, each linked back to its origin, with values color-coded in / out of range. |
| 🔗 **Shareable schedules** | Full state lives in the URL query string, so a plan can be bookmarked or shared with a partner or caregiver. |
| 📄 **Static schedule pages** | Age-by-age sample schedules at `/sleep-schedule/` and wake-window guides at `/wake-windows/`, generated from the same models at build time and readable with no JavaScript. |
| 📱 **Responsive & accessible** | Mobile-first layout, dark theme, semantic markup, and decorative imagery hidden from screen readers. |

## Engineering highlights

This started as a stale 2022 prototype and was rebuilt into a small, production-grade app.
A few things worth calling out:

- **Framework-agnostic domain layer.** All the real logic — sleep math, gestational-age
  adjustment, nap-time computation, and recommendation matching — lives in plain TypeScript
  classes (`models/`) with **no Vue dependency**, so it's trivial to test and reason about.
- **Tested for correctness, not just coverage.** **47 Vitest unit tests** pin the domain
  behavior, including edge cases (over-scheduled days, premature babies, bracket boundaries).
  Several genuine bugs were found and fixed this way — e.g. an inverted night-sleep formula
  where a later wake time wrongly produced *less* night sleep.
- **Full toolchain modernization, zero regressions.** Migrated Vite 3 → 6, TypeScript 4.6 → 5.9,
  Vue 3.2 → 3.5, and **Tailwind CSS 3 → 4** (CSS-first config via the Vite plugin), validated
  by the test suite and a production build at each step.
- **Type-safe throughout.** `vue-tsc` runs on every build; nullable returns are modeled in the
  types so callers are forced to handle them.
- **CI/CD.** Pushes get an automated Netlify deploy preview; the build pins Node 20 for the
  Tailwind v4 toolchain.

## Tech stack

**Vue 3.5** (`<script setup>`, Composition API) · **TypeScript 5.9** · **Vite 6** ·
**Tailwind CSS 4** · **Vitest 4** · deployed on **Netlify**.

## Architecture

```text
src/
  main.ts                     App entry — mounts Vue
  App.vue                     Shell: tab nav, header, footer, sitter branch
  style.css                   Tailwind v4 entry + the paper palette + fonts
  views/                      One file per screen
    TodayView.vue             Countdown, day strip, nap schedule, ranges
    LogView.vue               The big asleep/awake toggle + the entry list
    LearnView.vue             The cited guidance library
    SettingsView.vue          Plan inputs, sharing, stances, delete
  stores/                     One plan, one log, one open tab, one sheet
  components/                 Presentational + feature panels
    Recommendations.vue       Age-matched guidance with cited, linked sources
  models/                     Framework-agnostic, unit-tested domain layer
    ScheduleSetting.ts        Sleep math, corrected age, nap-time computation
    SleepRecommendations.ts   Recommendation data, brackets, validation
    today.ts                  Day segments, what-happens-next, band geometry
    time.ts                   Clock-time formatting
    *.test.ts                 Vitest unit tests
```

The app is four screens — Today / Log / Learn / Settings — with the countdown to
the next nap as the largest thing on the first one. The plan is a single
reactive `ScheduleSetting` in `stores/plan.ts`, and it — along with the open
screen — is serialized to and restored from the URL query string, so a plan
needs no account and no server to travel. The sleep log is separate
(`stores/sleepLog.ts`) and stays on the device in localStorage; it is never part
of a shared link.

## Getting started

```bash
git clone https://github.com/jfreal/wake-windows.git
cd wake-windows
npm install
npm run dev        # start the dev server
```

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`vue-tsc`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest suite |

### Claude Code

`.claude/settings.json` registers and enables the shared Nightforge plugin, but that does not download it. Collaborators should install it once for this repo:

```bash
claude plugin install nightforge@nightforge --scope project
```

## Notes

This is a personal project built to help plan a real baby's naps — and to keep a clean,
well-tested, modern front-end codebase. Feedback and ideas are welcome.
