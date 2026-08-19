# 公开报告 2×2 证据图形 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the desktop public-report 2×2 grid with clearly labelled, static illustrative research visuals without claiming real data.

**Architecture:** Add a focused `ReportEvidenceVisual` component that chooses one inline SVG composition from a report slug. Render it inside the existing `ReportCard`; CSS makes the grid rows consume the report panel's free height while protecting title and evidence-label legibility. The existing `ReportLibrary` retains four-item paging and bottom pagination.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Grid, inline SVG, Playwright.

---

### Task 1: Add a failing visual-grid browser test

**Files:**
- Modify: `e2e/public-routes.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
await expect(page.locator('.report-library .report-card')).toHaveCount(4);
await expect(page.getByRole('img', { name: '铜价与库存示意趋势图' })).toBeVisible();
await expect(page.getByRole('img', { name: '国产 GPU 推理成本示意趋势图' })).toBeVisible();
const { gridBottom, paginationTop } = await page.locator('.report-library, .report-pagination').evaluateAll((items) => ({
  gridBottom: items[0].getBoundingClientRect().bottom,
  paginationTop: items[1].getBoundingClientRect().top,
}));
expect(paginationTop - gridBottom).toBeLessThanOrEqual(20);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/public-routes.spec.ts --grep "stable report"`

Expected: FAIL because no SVG has the named accessible image role.

### Task 2: Render labelled, static evidence visuals

**Files:**
- Create: `src/components/public/report-evidence-visual.tsx`
- Modify: `src/components/public/report-card.tsx`
- Test: `e2e/public-routes.spec.ts`

- [ ] **Step 1: Implement the focused component**

```tsx
export function ReportEvidenceVisual({ slug, title }: { slug: string; title: string }) {
  return <figure className="report-evidence-visual">
    <figcaption><span>DEMO TREND</span><small>静态演示，不构成数据引用</small></figcaption>
    <svg aria-label={`${title}示意趋势图`} role="img" viewBox="0 0 320 96">...</svg>
  </figure>;
}
```

Use a slug switch for the four known reports. The SVG compositions may use paths, dots, stage labels and neutral grid lines, but no unverified numeric labels.

- [ ] **Step 2: Render it below report metadata**

```tsx
<ReportEvidenceVisual slug={report.slug} title={report.title.replace('（演示样例）', '')} />
```

- [ ] **Step 3: Run the focused test**

Run: `npx playwright test e2e/public-routes.spec.ts --grep "stable report"`

Expected: PASS.

### Task 3: Fill the desktop report grid cleanly

**Files:**
- Modify: `src/app/globals.css`
- Test: `e2e/public-routes.spec.ts`

- [ ] **Step 1: Make the report library use its available height**

```css
@media (min-width: 641px) {
  .report-library-panel .report-library { grid-template-rows: repeat(2, minmax(0, 1fr)); }
  .report-library-panel .report-card { display: flex; flex-direction: column; }
  .report-evidence-visual { margin-top: auto; }
}
```

- [ ] **Step 2: Style visual provenance and SVG**

```css
.report-evidence-visual figcaption { display:flex; justify-content:space-between; }
.report-evidence-visual svg { width:100%; height:92px; }
```

- [ ] **Step 3: Run full verification**

Run: `npm run lint && npm test -- --run && npx playwright test && npm run build && git diff --check`

Expected: all commands exit 0.

- [ ] **Step 4: Commit**

```bash
git add src e2e docs/superpowers/specs/2026-08-19-report-grid-evidence-visuals-design.md docs/superpowers/plans/2026-08-19-report-grid-evidence-visuals.md
git commit -m "feat: fill report grid with demo evidence visuals"
```
