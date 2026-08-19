import { expect, test } from '@playwright/test';

test('keeps preferences visible and puts recent research below primary navigation', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'NEON 研究工作台主页' })).toBeVisible();
  const sidebar = page.locator('.sidebar');
  await expect(sidebar.getByRole('button', { name: '显示偏好' })).toBeVisible();
  await expect(sidebar.getByRole('link', { name: '关于与方法' })).toHaveCount(1);
  await expect(sidebar.locator('.recent-research').getByRole('link', { name: /铜价与库存/ })).toHaveAttribute('href', '/reports/copper-inventory');

  await sidebar.getByRole('button', { name: '收起最近研究' }).click();
  await expect(sidebar.locator('.recent-research a')).toHaveCount(0);
  await sidebar.getByRole('button', { name: '展开最近研究' }).click();
  await expect(sidebar.locator('.recent-research a')).toHaveCount(2);

  const sectionTops = await sidebar.locator('.nav, .recent-research, .sidebar-bottom').evaluateAll(
    (sections) => sections.map((section) => section.getBoundingClientRect().top),
  );
  expect(sectionTops[0]).toBeLessThan(sectionTops[1]);
  expect(sectionTops[1]).toBeLessThan(sectionTops[2]);
});
