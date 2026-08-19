import { expect, test } from '@playwright/test';

test('persists theme and sidebar preferences in the browser', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: '收起侧边栏' })).toBeVisible();
  await page.getByRole('button', { name: '收起侧边栏' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-sidebar', 'compact');

  await page.getByRole('button', { name: '显示偏好' }).click();
  await page.getByRole('radio', { name: '深色' }).check();
  await expect(page.getByRole('group', { name: '侧边栏' })).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-sidebar', 'compact');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-sidebar', 'compact');
});

test('applies a clearly different text scale across public pages', async ({ page }) => {
  await page.goto('/reports');
  await page.getByRole('button', { name: '显示偏好' }).click();

  const reportTitle = page.getByRole('heading', { name: /铜价与库存/ }).first();
  const defaultSize = await reportTitle.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  await page.getByLabel('大').check();
  await expect.poll(async () => reportTitle.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThan(defaultSize * 1.15);

  await page.goto('/research');
  await expect(page.locator('html')).toHaveAttribute('data-font-size', 'large');
  const researchTitle = page.getByRole('heading', { name: '开始研究' });
  await expect.poll(async () => researchTitle.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThan(defaultSize * 1.15);
});

test('keeps the preferences panel above the workspace content', async ({ page }) => {
  await page.goto('/reports');
  await page.getByRole('button', { name: '显示偏好' }).click();
  const panel = page.getByRole('dialog', { name: '显示偏好' });
  await expect(panel).toBeVisible();

  const pointIsInPanel = await panel.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const topElement = document.elementFromPoint(bounds.left + 20, bounds.top + 20);
    return topElement === element || element.contains(topElement);
  });
  expect(pointIsInPanel).toBe(true);
});
