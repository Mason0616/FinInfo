import { expect, test } from '@playwright/test';

test('research route accepts a question and explains the static phase', async ({ page }) => {
  await page.goto('/research');
  await page.getByRole('tab', { name: '粘贴文本' }).click();
  await page.getByRole('textbox', { name: '研究输入' }).fill('比较固态电池量产的主要争议');
  await page.getByRole('button', { name: '开始研究' }).click();
  await expect(page.getByText('当前是静态演示')).toBeVisible();
});
