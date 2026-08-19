import { expect, test } from '@playwright/test';

test('research route accepts a question and explains the static phase', async ({ page }) => {
  await page.goto('/research');
  await page.getByRole('tab', { name: '粘贴文本' }).click();
  await page.getByRole('textbox', { name: '研究输入' }).fill('比较固态电池量产的主要争议');
  await page.getByRole('button', { name: '开始研究' }).click();
  await expect(page.getByText('当前是静态演示')).toBeVisible();
});

test('expands a public report full analysis on demand', async ({ page }) => {
  await page.goto('/reports/copper-inventory');
  await page.getByRole('button', { name: '展开完整分析' }).click();
  await expect(page.getByText('周期复盘')).toBeVisible();
});

test('switches public report draft channels and preserves provenance', async ({ page }) => {
  await page.goto('/translate');
  await page.getByRole('combobox', { name: '选择公开报告' }).selectOption('copper-inventory');
  await page.getByRole('tab', { name: '短视频脚本' }).click();
  await expect(page.getByText('研究内容草稿，请自行核验')).toBeVisible();
  await expect(page.getByRole('link', { name: '查看来源报告' })).toHaveAttribute('href', '/reports/copper-inventory');
});
