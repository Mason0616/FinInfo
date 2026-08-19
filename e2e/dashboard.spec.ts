import { expect, test } from '@playwright/test';

test('filters signals and switches the selected brief', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: '通知' })).toHaveCount(0);
  await expect(page.locator('.detail-panel')).toHaveCount(0);

  await page.getByRole('button', { name: '36氪', exact: true }).click();
  await expect(page.getByText('01 条信号')).toBeVisible();

  await page.getByRole('button', { name: /国产 GPU 厂商/ }).click();
  await expect(page.locator('.detail-panel').getByRole('heading', { name: /国产 GPU 厂商/ })).toBeVisible();

  await page.getByRole('button', { name: '关闭详情' }).click();
  await expect(page.locator('.detail-panel')).toHaveCount(0);
  await expect(page.locator('.main-area')).toHaveClass(/main-area-wide/);
});

test('paginates signals without leaving a stale brief open', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await expect(page.locator('.news-card')).toHaveCount(3);
  await page.getByRole('button', { name: /国产 GPU 厂商/ }).click();
  await expect(page.locator('.detail-panel')).toBeVisible();
  await page.getByRole('button', { name: '下一页' }).click();
  await expect(page.locator('.detail-panel')).toHaveCount(0);
  await expect(page.getByText('第 2 / 2 页')).toBeVisible();
  await expect(page.locator('.news-card')).toHaveCount(3);
});

test('shows today and a live Beijing clock in the dashboard header', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/2026年8月19日.*星期三/)).toBeVisible();
  await expect(page.locator('[data-testid="beijing-clock"]')).toHaveText(/^\d{2}:\d{2}:\d{2}$/);
});

test('adds a clearly labelled demo sector index context to each signal card', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await expect(page.getByRole('img', { name: '有色金属领域当日指数示意走势' })).toBeVisible();
  await expect(page.locator('.news-card').first().getByText('关键指标')).toBeVisible();
  await expect(page.locator('.news-card').first().getByText('待接入数据')).toBeVisible();
  const cardLayout = await page.locator('.news-card').first().evaluate((card) => {
    const chart = card.querySelector('.sector-index-context');
    const title = card.querySelector('h3');
    if (!chart || !title) return null;
    const chartBox = chart.getBoundingClientRect();
    const titleBox = title.getBoundingClientRect();
    return { chartLeft: chartBox.left, titleRight: titleBox.right, chartTop: chartBox.top, titleBottom: titleBox.bottom };
  });
  expect(cardLayout).not.toBeNull();
  expect(cardLayout!.chartLeft).toBeGreaterThan(cardLayout!.titleRight);
  expect(Math.abs(cardLayout!.chartTop - cardLayout!.titleBottom)).toBeLessThan(80);
  await expect(page.locator('.feed-pagination')).toBeInViewport();
});

test('switches between priority and publication-time sorting', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('SIGNALS / LIVE FEED')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /优先级排序/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /时间排序/ })).toBeVisible();
  await expect(page.locator('[aria-label="领域筛选"] .sort-controls')).toBeVisible();
  await page.getByRole('button', { name: /时间排序/ }).click();
  await expect(page.locator('.sort-button.active')).toContainText('时间排序');
  await expect(page.locator('.news-card').first()).toContainText('铜价突破');
  await page.getByRole('button', { name: /时间排序/ }).click();
  await expect(page.locator('.sort-button.active')).toContainText('时间排序');
});

test('filters signals by research domain independently from source', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '半导体与 AI', exact: true }).click();
  await expect(page.getByText('01 条信号')).toBeVisible();
  await expect(page.getByRole('button', { name: /国产 GPU 厂商/ })).toBeVisible();
});

test('offers a small, traceable source link on each signal', async ({ page }) => {
  await page.goto('/');
  const source = page.locator('.news-card').first().getByRole('link', { name: /华尔街见闻/ });
  await expect(source).toHaveAttribute('href', 'https://wallstreetcn.com/');
});
