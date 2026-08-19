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
  await page.goto('/');

  await expect(page.getByRole('img', { name: '有色金属领域当日指数示意走势' })).toBeVisible();
  await expect(page.locator('.news-card').first().getByText('DEMO INDEX')).toBeVisible();
  await expect(page.locator('.news-card').first().getByText('静态演示走势')).toBeVisible();
});
