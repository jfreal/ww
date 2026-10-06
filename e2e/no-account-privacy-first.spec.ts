// @test:no-account-privacy-first
import { test, expect } from '@playwright/test';

test.describe('No-Account, Privacy-First [@feature:no-account-privacy-first]', () => {
  test('full plan renders from a bare URL with no account UI anywhere', async ({ page }) => {
    await page.goto('/?bd=2026-03-01&s=7-2/2/2/2-7');
    // exact: the descriptive H1 ("Infant Nap Schedule & Wake Windows Planner")
    // also contains "Nap Schedule"; scope to the section heading.
    await expect(page.getByRole('heading', { name: 'Rest of the day', exact: true })).toBeVisible();
    // No auth controls anywhere — the privacy copy *mentions* "no sign-up,
    // no password", so assert on inputs/buttons/links, not raw page text.
    await expect(page.locator('input[type="password"], input[type="email"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /sign.?up|log.?in/i })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /sign.?up|log.?in/i })).toHaveCount(0);
  });

  test('"What we don\'t collect" panel states the four promises in plain English', async ({ page }) => {
    await page.goto('/?tab=settings');
    await page.getByText("What we don't collect").click();
    await expect(page.getByText('No account', { exact: true })).toBeVisible();
    await expect(page.getByText('No data sold', { exact: true })).toBeVisible();
    // Analytics is disclosed, not denied.
    await expect(page.getByText(/Google Analytics counts page visits/)).toBeVisible();
    await expect(page.getByText('Local-first', { exact: true })).toBeVisible();
    await expect(page.getByText('No AI training', { exact: true })).toBeVisible();
    // The honest caveat about birthdays living in shared links.
    await expect(page.getByText(/anyone you send the link to/i)).toBeVisible();
  });

  test('analytics stays off outside the production host', async ({ page }) => {
    await page.goto('/?bd=2026-03-01&s=7-2/2/2/2-7');
    await expect(page.getByRole('heading', { name: 'Rest of the day', exact: true })).toBeVisible();
    expect(await page.evaluate(() => 'dataLayer' in window)).toBe(false);
    await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
  });

  test.describe('on the production host', () => {
    // A stale worker from another test would answer instead of the route below.
    test.use({ serviceWorkers: 'block' });

    test('Google Analytics gets the path only, never the plan in the query string', async ({ page, baseURL }) => {
      // Serve the local build under the real hostname, so gtag-init.js runs
      // its production branch; stub gtag.js so nothing reaches Google.
      await page.route('https://wakewindows.guru/**', async (route) => {
        const url = new URL(route.request().url());
        const response = await route.fetch({ url: `${baseURL}${url.pathname}${url.search}` });
        await route.fulfill({ response });
      });
      await page.route('https://www.googletagmanager.com/**', (route) =>
        route.fulfill({ contentType: 'text/javascript', body: '' }));

      // Referrer carries a plan too: the hop from the planner to a content page.
      await page.goto('https://wakewindows.guru/sleep-schedule/4-month-old/', {
        referer: 'https://wakewindows.guru/?bd=2026-03-01&s=7-2/2/2/2-7',
      });
      await expect(page.locator('script[src^="https://www.googletagmanager.com/gtag/js?id=G-5X9ECGGVGZ"]')).toHaveCount(1);

      const dataLayer = await page.evaluate(() =>
        JSON.stringify((window as any).dataLayer.map((args: IArguments) => Array.from(args))));
      expect(dataLayer).toContain('"page_location":"https://wakewindows.guru/sleep-schedule/4-month-old/"');
      expect(dataLayer).toContain('"page_referrer":"https://wakewindows.guru/"');
      expect(dataLayer).not.toContain('bd=');
      expect(dataLayer).not.toContain('2026-03-01');
      // The panel promises no ad trackers, so GA's ad features stay off.
      expect(dataLayer).toContain('"allow_google_signals":false');
      expect(dataLayer).toContain('"allow_ad_personalization_signals":false');
    });
  });
});
