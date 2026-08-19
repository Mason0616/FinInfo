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
