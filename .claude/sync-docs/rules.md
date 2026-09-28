# sync-docs rules for Wake Windows

Repo-specific guidance for the shared `sync-docs` skill. The config in `config.json` says where
things are; this file says what to compare and how to write.

The app is a Vue 3 + TypeScript + Vite single-page app. The doc pages are the internal feature
specs under `docs/features/`, one file per feature, each with YAML frontmatter (`title`, `id`,
`docKey`, `category`, `priority`, `status`).

## Tags in Vue files

In a `.vue` file the tag is a JS comment inside `<script>`, or an HTML comment in the template:
`<!-- @doc:caregiver-handoff-notes — a short note on what it tags -->`. Text after the keys is allowed.

## What to compare

- **Numbers first.** Numeric values on a page must match the code: wake-window ranges, the default
  bedtime, the gestational-week default in `ScheduleSetting`, and the tier definitions in
  `citations.json`.
- The **Competitor verdict** line and the **Our approach (spec)** section are the page's main
  claims. Compare them against the tagged code before anything else.

## How to write a fix

- Edit the body, not the frontmatter, except to add a missing `docKey` or change `status`.
- Keep the page's 13-section template and its user-facing tone. These are specs a person reads, not
  code docs.
- A missing `docKey` comes from the file name with its id prefix removed:
  `A05-bedtime-calculator.md` → `bedtime-calculator`.

## The feature index

`docs/features/FEATURE-INDEX.md` lists each feature as a table row by its short id (`A05`), with
columns for id, feature, priority and verdict. A new row copies that format.

The category tables are headed by letter, and the headings do not repeat the frontmatter category
word for word. A page belongs in the table whose letter matches its id prefix:

| Id prefix | Heading | `category` value |
|---|---|---|
| A | A. Scheduling & Prediction Engine | Scheduling & Prediction |
| B | B. Guidance & Credibility Content | Guidance & Credibility |
| C | C. Tracking & Logging (local-only) | Tracking & Logging |
| D | D. Analytics & Insights | Analytics & Insights |
| E | E. Sharing & Collaboration | Sharing & Collaboration |
| F | F. Utility & Integrations | Utility & Integrations |
| G | G. Brand / Product / Monetization | Brand & Product |
| H | H. Reach & Discovery | Reach & Discovery |

A page whose `category` disagrees with its id letter is a finding to flag, not to fix.

## Tests

Every feature has a Playwright spec at `e2e/<docKey>.spec.ts`. It carries a `// @test:<docKey>`
comment and a `[@feature:<docKey>]` describe title. A `Proposed` feature keeps a `test.skip`
placeholder, so the matrix stays complete.

The audit reads spec files; it does not run them. After a fix that touched a `Built` feature, tell
the user to run `npm run test:e2e`. Set `E2E_BASE_URL` to point it at the live site instead of a
local `vite preview`.

## Rebuilding the registry

If the registry is lost, rebuild it from disk: read `docKey` and the mirrored fields from every
`docs/features/[A-H]*.md`, then fill `sources` from the `@doc:` tags under `src/` and `tests` from
the `@test:` tags under `e2e/`. The first registry was generated this way.
