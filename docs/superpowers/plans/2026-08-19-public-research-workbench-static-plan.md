# Public Research Workbench Static Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the React dashboard into a public, shareable static research product with distinct routes for intelligence, research input, public reports, content translation and methodology.

**Architecture:** Keep one shared dark-sidebar/paper-content shell in `src/components/layout/workbench-shell.tsx`. Use normal Next.js App Router links for primary navigation and route-specific page components for each public workflow. Keep all content in typed deterministic fixtures so later API, database, news ingestion and AI services can replace the data layer without changing route contracts.

**Tech Stack:** Next.js App Router, React, TypeScript, local fixture data, Vitest, Playwright, existing CSS tokens.

---

## File map

- `src/lib/domain.ts` — shared signal/report types.
- `src/lib/public-fixtures.ts` — deterministic reports, evidence, method copy and translation drafts.
- `src/components/layout/workbench-shell.tsx` — shared navigation, header and responsive shell.
- `src/components/public/research-form.tsx` — static research input mode and honest static-state feedback.
- `src/components/public/report-card.tsx` — public report library item.
- `src/components/public/report-view.tsx` — report summary, evidence, uncertainty and expandable analysis.
- `src/components/public/translation-studio.tsx` — report-bound channel draft UI.
- `src/app/page.tsx` — today intelligence route, adapted from current dashboard.
- `src/app/research/page.tsx` — research input route.
- `src/app/reports/page.tsx` — report library route.
- `src/app/reports/[slug]/page.tsx` — shareable report detail route.
- `src/app/translate/page.tsx` — content translation route.
- `src/app/about/page.tsx` — source, AI and limitation explanation.
- `src/app/globals.css` — shared shell plus page-specific responsive styles.
- `e2e/public-routes.spec.ts` — route and navigation coverage.
- `e2e/public-workflows.spec.ts` — research input, report expansion and translation coverage.

### Task 1: Make the shell route-aware

**Files:**
- Create: `src/components/layout/workbench-shell.tsx`
- Modify: `src/components/dashboard/dashboard.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `e2e/public-routes.spec.ts`

- [ ] **Step 1: Write the failing route test**

```ts
import { expect, test } from '@playwright/test';

test('primary navigation uses public URLs and marks the active route', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '开始研究' }).click();
  await expect(page).toHaveURL('/research');
  await expect(page.getByRole('link', { name: '开始研究' })).toHaveClass(/active/);
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run: `npm run test:e2e -- public-routes.spec.ts`

Expected: FAIL because current navigation renders state-only buttons and no `/research` route.

- [ ] **Step 3: Define route metadata and render normal links**

```tsx
const navigation = [
  { href: '/', label: '今日情报', icon: '◉' },
  { href: '/research', label: '开始研究', icon: '◇' },
  { href: '/reports', label: '公开报告', icon: '□' },
  { href: '/translate', label: '内容转译', icon: '⌁' },
];
```

Use `usePathname()` only inside `WorkbenchShell` to add `active` to the matching link. Keep the shell’s `children` slot typed as `React.ReactNode`; pages own their content and the shell owns navigation.

- [ ] **Step 4: Move the current dashboard into the shell**

Change `Dashboard` to render its existing main/detail columns inside `<WorkbenchShell title="晨间情报台">...</WorkbenchShell>`. Remove its state-only sidebar navigation and leave news filtering, selected signal, sort, refresh and content studio behavior unchanged.

- [ ] **Step 5: Verify route behavior and commit**

Run: `npm run lint && npm test -- --run && npm run build && npm run test:e2e -- public-routes.spec.ts`

Expected: the existing homepage interaction still works; clicking `开始研究` changes the URL to `/research` and highlights that link.

```bash
git add src e2e
git commit -m "feat: add route-aware public workbench shell"
```

### Task 2: Add the public research input route

**Files:**
- Create: `src/components/public/research-form.tsx`
- Create: `src/app/research/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `e2e/public-workflows.spec.ts`

- [ ] **Step 1: Write the failing workflow test**

```ts
test('research route accepts a question and explains the static phase', async ({ page }) => {
  await page.goto('/research');
  await page.getByRole('tab', { name: '粘贴文本' }).click();
  await page.getByRole('textbox', { name: '研究输入' }).fill('比较固态电池量产的主要争议');
  await page.getByRole('button', { name: '开始研究' }).click();
  await expect(page.getByText('当前是静态演示')).toBeVisible();
});
```

- [ ] **Step 2: Run it and verify the route is missing**

Run: `npm run test:e2e -- public-workflows.spec.ts`

Expected: FAIL because `/research` and its form do not exist.

- [ ] **Step 3: Implement the three input modes without pretending to call AI**

```tsx
const modes = [
  { id: 'question', label: '主题 / 问题', placeholder: '例如：固态电池量产进展如何？' },
  { id: 'url', label: '新闻链接', placeholder: '粘贴一个公开新闻链接' },
  { id: 'text', label: '粘贴文本', placeholder: '粘贴新闻或研究材料' },
] as const;
```

Use a controlled textarea, a mode tab group, three example prompt buttons that fill the textarea, and a submit handler that sets `status` to `当前是静态演示：真实来源采集与 AI 研究将在后续版本接入。`.

- [ ] **Step 4: Add the route copy and three-step explanation**

Render heading `开始研究`, subheading `从一个问题、链接或片段开始，把复杂信息整理成可核验的研究摘要。`, steps `收集来源 / 对比观点 / 写出带引用的摘要`, and a disclaimer that no external analysis is performed in the static phase.

- [ ] **Step 5: Verify and commit**

Run: `npm run lint && npm run test:e2e -- public-workflows.spec.ts && npm run build`

Expected: all three modes switch labels/placeholders, examples fill the input, and submit shows honest static status.

```bash
git add src e2e
git commit -m "feat: add public research intake route"
```

### Task 3: Build the public report library and shareable detail page

**Files:**
- Modify: `src/lib/domain.ts`
- Create: `src/lib/public-fixtures.ts`
- Create: `src/components/public/report-card.tsx`
- Create: `src/components/public/report-view.tsx`
- Create: `src/app/reports/page.tsx`
- Create: `src/app/reports/[slug]/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `e2e/public-routes.spec.ts`
- Modify: `e2e/public-workflows.spec.ts`

- [ ] **Step 1: Write report navigation and expansion tests**

```ts
test('opens a stable report URL and expands its full analysis', async ({ page }) => {
  await page.goto('/reports');
  await page.getByRole('link', { name: /铜价与库存/ }).click();
  await expect(page).toHaveURL('/reports/copper-inventory');
  await expect(page.getByRole('heading', { name: '发生了什么' })).toBeVisible();
  await page.getByRole('button', { name: '展开完整分析' }).click();
  await expect(page.getByText('周期复盘')).toBeVisible();
});
```

- [ ] **Step 2: Run before implementing fixtures and pages**

Run: `npm run test:e2e -- public-routes.spec.ts public-workflows.spec.ts`

Expected: FAIL because report routes and fixture data are absent.

- [ ] **Step 3: Add typed public report data**

```ts
export type PublicReport = {
  slug: string;
  title: string;
  topic: string;
  updatedAt: string;
  readingMinutes: number;
  conclusion: string;
  tags: string[];
  sourceCount: number;
  whatHappened: string;
  whyItMatters: string;
  evidence: { label: string; url: string; note: string }[];
  uncertainty: string[];
  watchQuestions: string[];
  fullAnalysis: { heading: string; body: string }[];
};
```

Create at least two reports, including `copper-inventory`, with deterministic source URLs (`https://example.com/...` placeholders are not allowed; use the actual public URLs already cited by the static demo or clearly labelled source homepages).

- [ ] **Step 4: Render library cards and the summary-first detail view**

Use `Link` from `next/link` for cards. The detail route looks up `params.slug`, renders a not-found state for an unknown slug, shows `系统维护`, update time, source count and reading time, then sections in this order: what happened, why it matters, evidence, uncertainty, watch questions, expandable full analysis.

- [ ] **Step 5: Verify and commit**

Run: `npm run lint && npm test -- --run && npm run test:e2e -- public-routes.spec.ts public-workflows.spec.ts && npm run build`

Expected: report cards navigate to stable URLs, evidence links are visible, unknown slugs return a proper 404, and full analysis is collapsed until requested.

```bash
git add src e2e
git commit -m "feat: add public report library and detail pages"
```

### Task 4: Add content translation tied to a public report

**Files:**
- Create: `src/components/public/translation-studio.tsx`
- Create: `src/app/translate/page.tsx`
- Modify: `src/lib/public-fixtures.ts`
- Modify: `src/app/globals.css`
- Modify: `e2e/public-workflows.spec.ts`

- [ ] **Step 1: Write the translation workflow test**

```ts
test('switches public report draft channels and preserves provenance', async ({ page }) => {
  await page.goto('/translate');
  await page.getByRole('combobox', { name: '选择公开报告' }).selectOption('copper-inventory');
  await page.getByRole('tab', { name: '短视频脚本' }).click();
  await expect(page.getByText('研究内容草稿，请自行核验')).toBeVisible();
  await expect(page.getByRole('link', { name: '查看来源报告' })).toHaveAttribute('href', '/reports/copper-inventory');
});
```

- [ ] **Step 2: Run and verify the missing page failure**

Run: `npm run test:e2e -- public-workflows.spec.ts`

Expected: FAIL because `/translate` and its report-bound draft state are absent.

- [ ] **Step 3: Define deterministic channel drafts keyed by report slug**

```ts
export type TranslationDrafts = Record<string, Record<'short-post' | 'video-script' | 'article', string>>;
```

Add drafts for every report fixture. Drafts must include neutral language and a visible review label; no button may claim that AI generated or published the result.

- [ ] **Step 4: Implement report selector, channel tabs, editable draft and provenance link**

Use a native `<select>` for report choice and a tablist for channels. The textarea remains editable and the copy button uses the existing clipboard/toast pattern. The source report link must update with the selected slug.

- [ ] **Step 5: Verify and commit**

Run: `npm run lint && npm run test:e2e -- public-workflows.spec.ts && npm run build`

Expected: selecting a report changes its draft and source link; switching channels changes only the draft; no publication control exists.

```bash
git add src e2e
git commit -m "feat: add report-bound content translation"
```

### Task 5: Add public methodology and trust content

**Files:**
- Create: `src/app/about/page.tsx`
- Modify: `src/components/layout/workbench-shell.tsx`
- Modify: `src/app/globals.css`
- Modify: `e2e/public-routes.spec.ts`

- [ ] **Step 1: Write the trust-page test**

```ts
test('about page explains provenance, AI limits and non-advice boundary', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: '关于与方法' })).toBeVisible();
  await expect(page.getByText(/不是投资、法律或医疗建议/)).toBeVisible();
  await expect(page.getByText(/来源/)).toBeVisible();
});
```

- [ ] **Step 2: Run and observe the missing route failure**

Run: `npm run test:e2e -- public-routes.spec.ts`

Expected: FAIL because `/about` is not linked or implemented.

- [ ] **Step 3: Add an About link and plain-language trust sections**

Add `关于与方法` to the shell footer navigation. Render sections explaining source attribution and freshness, the distinction between facts and interpretation, AI limitations and review expectations, and the explicit statement `内容仅供信息参考，不构成投资、法律、医疗或其他专业建议。`.

- [ ] **Step 4: Verify and commit**

Run: `npm run lint && npm test -- --run && npm run test:e2e -- public-routes.spec.ts && npm run build`

Expected: footer navigation reaches `/about`; the trust statements are visible on desktop and mobile layouts.

```bash
git add src e2e
git commit -m "feat: add public methodology and trust page"
```

### Task 6: Complete responsive and public-route acceptance checks

**Files:**
- Modify: `src/app/globals.css`
- Create: `e2e/responsive-public.spec.ts`
- Modify: `package.json` only if a screenshot script is needed

- [ ] **Step 1: Write responsive acceptance checks**

```ts
test('public report remains readable on a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/reports/copper-inventory');
  await expect(page.getByRole('heading', { name: '铜价与库存' })).toBeVisible();
  await expect(page.locator('.workbench-shell')).toBeVisible();
});
```

- [ ] **Step 2: Run the full acceptance suite**

Run: `npm run lint && npm test -- --run && npm run test:e2e && npm run build`

Expected: all tests pass, every primary route is reachable, mobile content does not overflow horizontally, and Next.js production build succeeds.

- [ ] **Step 3: Review static-content boundary**

Search: `rg -n "AI 已生成|已发布|真实抓取|数据库已连接|外部来源已同步" src`

Expected: no false claims in the static phase.

- [ ] **Step 4: Commit the completed static experience**

```bash
git add src e2e package.json
git commit -m "feat: complete public static research experience"
```

## Acceptance gates

1. `/` remains the default intelligence feed and preserves its interaction.
2. `/research`, `/reports`, `/reports/[slug]`, `/translate` and `/about` each have distinct content and stable URLs.
3. Public reports are system-maintained and no visitor publishing/login controls appear.
4. Static fixtures are deterministic and every static action communicates its demo boundary.
5. The shared paper-toned workbench is usable at desktop and mobile widths.
6. Lint, unit tests, browser tests and production build pass before backend work resumes.

## Plan self-review

- **Spec coverage:** all six routes, shell behavior, summary-first reports, translation provenance, trust content, open access and responsive acceptance are mapped to tasks.
- **Placeholder scan:** no TBD/TODO steps; each task has concrete files, test commands and expected results. Fixture URLs must be real public source/homepage URLs, not invented placeholder URLs.
- **Type consistency:** `PublicReport.slug` keys report detail routing and `TranslationDrafts` lookup; shell links use the exact route names in the approved design.
