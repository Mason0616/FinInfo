import { expect, test } from '@playwright/test';

test('primary navigation uses public URLs and marks the active route', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '开始研究' }).click();
  await expect(page).toHaveURL('/research');
  await expect(page.getByRole('link', { name: '开始研究' })).toHaveClass(/active/);
});

test('opens a stable report URL from the public report library', async ({ page }) => {
  await page.goto('/reports');
  await page.getByRole('link', { name: /铜价与库存/ }).click();
  await expect(page).toHaveURL('/reports/copper-inventory');
  await expect(page.getByRole('heading', { name: '发生了什么' })).toBeVisible();
  await expect(page.getByRole('link', { name: '返回公开报告' })).toHaveAttribute('href', '/reports');
});

test('about page explains provenance, AI limits and non-advice boundary', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: '关于与方法' })).toBeVisible();
  await expect(page.getByText(/不是投资、法律或医疗建议/)).toBeVisible();
  await expect(page.getByRole('heading', { name: '来源与归因' })).toBeVisible();
});

test('public pages use the full workspace width', async ({ page }) => {
  for (const path of ['/research', '/reports', '/translate', '/about']) {
    await page.goto(path);
    await expect(page.locator('.public-page')).toHaveClass(/public-page-wide/);
  }
});
