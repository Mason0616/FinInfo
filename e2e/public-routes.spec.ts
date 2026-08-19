import { expect, test } from '@playwright/test';

test('primary navigation uses public URLs and marks the active route', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '开始研究' }).click();
  await expect(page).toHaveURL('/research');
  await expect(page.getByRole('link', { name: '开始研究' })).toHaveClass(/active/);
});

test('opens a stable report URL from the public report library', async ({ page }) => {
  await page.goto('/reports');
  const pagination = page.getByRole('navigation', { name: '报告分页' });
  await expect(pagination).toBeVisible();
  await expect(pagination.getByText('第 1 / 1 页')).toBeVisible();
  await expect(pagination.getByRole('button', { name: '上一页' })).toBeDisabled();
  await expect(pagination.getByRole('button', { name: '下一页' })).toBeDisabled();
  await expect(page.locator('.report-library .report-card')).toHaveCount(4);
  await expect(page.getByRole('link', { name: /固态电池量产/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /跨境电商/ })).toBeVisible();
  const reportCardHeight = await page.locator('.report-card').first().evaluate((element) => element.getBoundingClientRect().height);
  expect(reportCardHeight).toBeLessThanOrEqual(190);
  const positions = await page.locator('.public-page, .report-pagination').evaluateAll((elements) => elements.map((element) => {
    const bounds = element.getBoundingClientRect();
    return { top: bounds.top, bottom: bounds.bottom };
  }));
  expect(positions[1].bottom).toBeLessThanOrEqual(positions[0].bottom - 20);
  expect(positions[1].bottom).toBeGreaterThan(positions[0].bottom - 80);
  await page.locator('.report-library').getByRole('link', { name: /铜价与库存/ }).click();
  await expect(page).toHaveURL('/reports/copper-inventory');
  await expect(page.getByRole('heading', { name: '发生了什么' })).toBeVisible();
  await expect(page.getByRole('link', { name: '返回公开报告' })).toHaveAttribute('href', '/reports');
});

test('about page explains provenance, AI limits and non-advice boundary', async ({ page }) => {
  await page.goto('/');
  const aboutLink = page.locator('.sidebar-bottom').getByRole('link', { name: '关于与方法' });
  await expect(aboutLink).toBeVisible();
  await aboutLink.click();
  await expect(page).toHaveURL('/about');
  await expect(aboutLink).toHaveClass(/active/);

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
