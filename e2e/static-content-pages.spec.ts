// @test:static-content-pages
import { test, expect } from '@playwright/test';

// Feature: Static content pages (H01). The /sleep-schedule pages are emitted by
// the build, not routed by the SPA, so the things worth testing end-to-end are
// the seams: that they are served as real documents, that the deep link into
// the planner actually loads the day the page prints, and that the service
// worker's SPA navigation fallback does not swallow them once it is installed.
test.describe('Static content pages [@feature:static-content-pages]', () => {
  test('hub is a real document that links every age page', async ({ page }) => {
    await page.goto('/sleep-schedule/');

    await expect(page.getByRole('heading', { level: 1, name: 'Baby sleep schedules by age' })).toBeVisible();
    for (const months of [3, 4, 5, 6, 7]) {
      await expect(page.getByRole('link', { name: `${months} month old sleep schedule` })).toBeVisible();
    }
  });

  test('age page prints a schedule and points at itself as canonical', async ({ page }) => {
    await page.goto('/sleep-schedule/4-month-old/');

    await expect(page.getByRole('heading', { level: 1, name: '4 month old sleep schedule' })).toBeVisible();
    await expect(page.getByRole('rowheader', { name: 'Nap 1' })).toBeVisible();

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://wakewindows.guru/sleep-schedule/4-month-old/');
  });

  // The whole cluster exists to be read without JavaScript — an article that
  // needs the bundle to render is invisible to the crawlers it is written for.
  // A fixture override rather than a hand-rolled context: a failed assertion
  // would leak a manually created context for the rest of the worker.
  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('renders with JavaScript disabled', async ({ page }) => {
      await page.goto('/sleep-schedule/6-month-old/');

      await expect(page.getByRole('heading', { level: 1, name: '6 month old sleep schedule' })).toBeVisible();
      // The published range for 6-8 months, straight from the Tier-1 bracket.
      await expect(page.getByText('120–180 min')).toBeVisible();
    });

    // The homepage is the SPA shell, so its crawlable text lives in index.html
    // inside #app (replaced on mount). An SEO audit read it as 0 words while
    // that text sat in <noscript>, which crawlers drop.
    test('homepage shows its static content and links into both clusters', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByRole('heading', { level: 1, name: /Infant Nap Schedule/ })).toBeVisible();
      await expect(page.getByRole('link', { name: '6 month old sleep schedule' })).toBeVisible();
      await expect(page.getByRole('link', { name: '6 month old wake windows' })).toBeVisible();
    });
  });

  test('homepage text is in the served HTML, outside <noscript>', async ({ request }) => {
    const html = await (await request.get('/')).text();
    const app = html.match(/<div id="app">([\s\S]*?)<\/div>/)?.[1] ?? '';

    expect(app).not.toContain('<noscript');
    const words = app.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean);
    expect(words.length).toBeGreaterThan(300);
    // The build fills the link lists; a leftover marker means it did not run.
    expect(html).not.toContain('-links-->');
  });

  test('the app replaces the static homepage content once it mounts', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#screen')).toBeVisible();
    await expect(page.locator('.prerender')).toHaveCount(0);
  });

  test('call to action opens the planner on the day the page printed', async ({ page }) => {
    await page.goto('/sleep-schedule/7-month-old/');

    const bedtime = await page.getByRole('row', { name: /Bedtime/ }).innerText();
    await page.getByRole('link', { name: 'Open this day in the planner' }).click();

    await expect(page).toHaveURL(/\/\?s=7-2\.5\/3\/3-7$/);
    // 7 months is a two-nap day in the page's sample; the planner should agree.
    await expect(page.getByText(/Naps \(2\)/)).toBeVisible();
    expect(bedtime).toContain('7:00 PM');
  });

  test('wake-windows hub links its spokes and the schedule cluster', async ({ page }) => {
    await page.goto('/wake-windows/');

    await expect(page.getByRole('heading', { level: 1, name: 'Wake windows by age' })).toBeVisible();
    await expect(page.getByRole('link', { name: '6 month old wake windows' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'sleep schedules by age' })).toBeVisible();
  });

  // The two clusters describe the same age from different angles. If they ever
  // disagreed about the windows, one of the two pages would be wrong.
  test('wake-window page and schedule page agree on the same age', async ({ page }) => {
    await page.goto('/wake-windows/6-month-old/');
    const windowPageCta = await page.getByRole('link', { name: 'Turn these windows into clock times' }).getAttribute('href');

    await page.goto('/sleep-schedule/6-month-old/');
    const schedulePageCta = await page.getByRole('link', { name: 'Open this day in the planner' }).getAttribute('href');

    expect(windowPageCta).toBe(schedulePageCta);
    // And the schedule page links back to the wake-window page for its age.
    await expect(page.getByRole('link', { name: '6 month old wake windows' })).toBeVisible();
  });

  test('survives the service worker\'s SPA navigation fallback', async ({ page }) => {
    // Install the worker from the app, then navigate to a content page: without
    // the denylist in src/sw.ts the fallback answers with the app shell.
    await page.goto('/');
    await page.waitForFunction(async () => {
      const reg = await navigator.serviceWorker?.ready;
      return !!reg?.active;
    });

    await page.goto('/sleep-schedule/5-month-old/');
    await expect(page.getByRole('heading', { level: 1, name: '5 month old sleep schedule' })).toBeVisible();

    // Same seam, second cluster — /wake-windows/* needs its own denylist entry.
    await page.goto('/wake-windows/chart/');
    await expect(page.getByRole('heading', { level: 1, name: 'Wake window chart' })).toBeVisible();
  });
});
