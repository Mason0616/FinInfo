import { expect, test } from '@playwright/test';

test('research route gives a processing response and keeps the result in the workspace', async ({ page }) => {
  await page.goto('/research');
  await page.getByRole('tab', { name: '粘贴文本' }).click();
  await page.getByRole('textbox', { name: '研究输入' }).fill('比较固态电池量产的主要争议');
  await page.getByRole('button', { name: '开始研究' }).click();
  await expect(page.getByRole('status')).toContainText('正在拆解问题');
  await expect(page.getByRole('status')).toContainText('研究框架已准备好');
  await expect(page.getByRole('link', { name: '打开研究工作区' })).toHaveAttribute('href', '/research/preview');
  await page.getByRole('link', { name: '打开研究工作区' }).click();
  await expect(page).toHaveURL('/research/preview');
  await expect(page.getByRole('heading', { name: '研究工作区' })).toBeVisible();
});

test('keeps report quick read in one screen and opens full analysis on a dedicated route', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/reports/copper-inventory');
  await expect(page.getByRole('link', { name: '阅读完整分析' })).toHaveAttribute('href', '/reports/copper-inventory/analysis');
  await expect(page.locator('.evidence-list')).toHaveCSS('column-count', '3');
  await expect(page.locator('.evidence-list li').first()).toHaveCSS('break-inside', 'avoid');
  await expect(page.locator('.report-quick-read')).toBeInViewport();
  await page.getByRole('link', { name: '阅读完整分析' }).click();
  await expect(page).toHaveURL('/reports/copper-inventory/analysis');
  await expect(page.getByText('周期复盘')).toBeVisible();
});

test('switches public report draft channels and preserves provenance', async ({ page }) => {
  await page.goto('/translate');
  await page.getByRole('combobox', { name: '选择公开报告' }).selectOption('copper-inventory');
  await page.getByRole('tab', { name: '短视频脚本' }).click();
  await expect(page.getByText('研究内容草稿，请自行核验')).toBeVisible();
  await expect(page.getByRole('link', { name: '查看来源报告' })).toHaveAttribute('href', '/reports/copper-inventory');
});
