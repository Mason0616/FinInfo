import { expect, test } from '@playwright/test';

test('keeps the brand and utility links ordered in a narrow desktop viewport', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'NEON 研究工作台主页' })).toBeVisible();
  await expect(page.getByRole('button', { name: '显示偏好' })).toBeVisible();
  await expect(page.getByRole('link', { name: '关于与方法' }).last()).toBeVisible();
  await expect(page.getByRole('link', { name: /铜价与库存/ }).last()).toHaveAttribute('href', '/reports/copper-inventory');
});
