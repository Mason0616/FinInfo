import { expect, test } from '@playwright/test';

test('keeps preferences visible and puts recent research below primary navigation', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'NEON 研究工作台主页' })).toBeVisible();
  const sidebar = page.locator('.sidebar');
  await expect(sidebar.getByRole('button', { name: '显示偏好' })).toBeVisible();
  await expect(sidebar.getByRole('link', { name: '关于与方法' })).toHaveCount(1);
  await expect(sidebar.locator('.recent-research').getByRole('link', { name: /铜价与库存/ })).toHaveAttribute('href', '/reports/copper-inventory');
  await expect(sidebar.locator('.recent-report-card')).toHaveCount(2);
  await expect(sidebar.locator('.recent-report-card').first()).toContainText('大宗商品');
  await expect(sidebar.locator('.recent-report-card').first()).toContainText('已发布');

  await sidebar.getByRole('button', { name: '收起最近研究' }).click();
  await expect(sidebar.locator('.recent-research .recent-report-card').first()).toBeHidden();
  await sidebar.getByRole('button', { name: '展开最近研究' }).click();
  await expect(sidebar.locator('.recent-research .recent-report-card')).toHaveCount(2);

  const sectionTops = await sidebar.locator('.nav, .recent-research, .sidebar-bottom').evaluateAll(
    (sections) => sections.map((section) => section.getBoundingClientRect().top),
  );
  expect(sectionTops[0]).toBeLessThan(sectionTops[1]);
  expect(sectionTops[1]).toBeLessThan(sectionTops[2]);
});

test('moves opened reports into recent research in visit order', async ({ page }) => {
  await page.goto('/reports');
  await page.getByRole('link', { name: /固态电池量产/ }).click();
  await expect(page).toHaveURL('/reports/solid-state-battery-demo');
  await expect(page.locator('.recent-research .recent-report-card').first()).toContainText('固态电池量产');

  await page.goto('/reports');
  await page.getByRole('link', { name: /跨境电商履约成本/ }).click();
  await expect(page).toHaveURL('/reports/cross-border-commerce-demo');
  await expect(page.locator('.recent-research .recent-report-card').first()).toContainText('跨境电商履约成本');
  await expect(page.locator('.recent-research .recent-report-card')).toHaveCount(3);
});

test('updates recent research immediately when a report is opened from the sidebar', async ({ page }) => {
  await page.goto('/');
  await page.locator('.recent-research .recent-report-card').nth(1).click();
  await expect(page).toHaveURL('/reports/gpu-inference');
  await expect(page.locator('.recent-research .recent-report-card').first()).toContainText('GPU 推理');
});

test('uses a clear recent research icon when the sidebar is compact', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '收起侧边栏' }).click();
  await expect(page.getByRole('link', { name: /最近研究/ })).toBeVisible();
  await expect(page.locator('.recent-report-card').first()).toBeHidden();
});

test('anchors sidebar utilities to the same viewport position across workspace pages', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const utilityTops: number[] = [];

  for (const path of ['/', '/research', '/reports', '/translate']) {
    await page.goto(path);
    utilityTops.push(await page.locator('.sidebar-bottom').evaluate((element) => element.getBoundingClientRect().top));
  }

  expect(Math.max(...utilityTops) - Math.min(...utilityTops)).toBeLessThanOrEqual(1);

  await page.goto('/research');
  await page.getByRole('tab', { name: '粘贴文本' }).click();
  await page.getByRole('textbox', { name: '研究输入' }).fill('比较固态电池量产的主要争议');
  await page.getByRole('button', { name: '开始研究' }).click();
  await expect(page.getByRole('link', { name: '打开研究工作区' })).toBeVisible();
  const afterSubmitTop = await page.locator('.sidebar-bottom').evaluate((element) => element.getBoundingClientRect().top);
  expect(Math.abs(afterSubmitTop - utilityTops[1])).toBeLessThanOrEqual(1);
});
