import { expect, test } from '@playwright/test';

test('primary navigation uses public URLs and marks the active route', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '开始研究' }).click();
  await expect(page).toHaveURL('/research');
  await expect(page.getByRole('link', { name: '开始研究' })).toHaveClass(/active/);
});
