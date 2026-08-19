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
