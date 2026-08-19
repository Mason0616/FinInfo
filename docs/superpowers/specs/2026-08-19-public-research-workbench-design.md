# Public Research Workbench Design

## Product intent

NEON is a public, professional-but-accessible research assistant. It helps a broad audience understand any timely topic through structured, source-aware research rather than investment advice or opaque AI answers.

The first public release is fully open: visitors do not create accounts, publish content, or maintain personal workspaces. Public reports are system-maintained. Login, saved work and user publishing are deliberately deferred.

## Information architecture

Use a hybrid public-workbench architecture: a persistent dark navigation shell and paper-toned content surfaces, with every primary view represented by a stable, shareable URL.

| Route | Navigation label | Public purpose |
| --- | --- | --- |
| `/` | 今日情报 | Browse current signals and open their short research summaries. |
| `/research` | 开始研究 | Enter a question, URL or pasted text; the first static version shows the future research workflow with examples. |
| `/reports` | 公开报告 | Browse system-maintained topic reports. |
| `/reports/[slug]` | Report detail | Share one report with its summary, evidence, uncertainty and full analysis. |
| `/translate` | 内容转译 | Create channel-specific drafts from a selected public report; clearly label all output as a draft. |
| `/about` | 关于与方法 | Explain sources, update logic, AI's role, limits and the non-investment-advice notice. |

The left navigation uses normal links, not state-only buttons. This makes browser back/forward, bookmarks, public sharing, search indexing and future domain deployment behave normally.

## Shared visual system

- Preserve the current dark green sidebar and light paper-content area as the core brand treatment.
- Retain the NEON wordmark for the prototype; do not purchase or bind a domain until naming and deployment are ready.
- Keep the existing mint color only for selected state, source status and low-risk actions.
- Use a reading-first content column on report pages. Desktop keeps a contextual side panel; mobile stacks panels in reading order.
- Every page has a concise plain-language subheading. Avoid financial-terminal vocabulary as the default public language.

## Page behavior

### Today intelligence (`/`)

The existing signal feed remains the default public entry point. Source filter, search, priority ordering, selected detail, research dimensions and content draft remain interactive. The detail area adds a visible "查看完整报告" action when a signal maps to a system report.

### Start research (`/research`)

This is a guided input screen, not a working AI endpoint in the static phase. It contains one input field with mode selector: question/topic, URL, or pasted text. It includes example prompts and a three-step explanation: collect sources, compare claims, write a source-linked brief. Submitting shows a clear static-phase message rather than implying real analysis has occurred.

### Public reports (`/reports` and `/reports/[slug]`)

The report library presents system-maintained report cards with topic, update date, reading time, one-sentence conclusion, tags and source count. The detail page starts with an at-a-glance brief:

1. What happened
2. Why it matters
3. Evidence and source links
4. Diverging views and uncertainty
5. Questions to monitor

The expandable full report follows the brief. Each report shows "系统维护" and its latest update time. No visitor publishing controls appear.

### Content translation (`/translate`)

Visitors choose a public report and a target channel (short social post, short-video script or article). In the static phase, it displays deterministic sample drafts tied to the selected report. The interface labels each result "研究内容草稿，请自行核验" and links back to the source report.

### About and method (`/about`)

Explain what the product does, how sources are attributed, how refresh time will work, what AI can and cannot do, and that content is informational rather than financial, legal, medical or other professional advice. This page is the public trust layer before real data and AI launch.

## Static content boundary

For this design phase, all report, source-count, update-time, research and translation data stays deterministic local fixture data. Buttons may navigate, filter, select, expand and copy. Buttons must not claim that external news was fetched, AI was called, a report was published, or a user account was created.

The later API/database phase will preserve the page contracts while replacing fixtures with server data. Real ingestion is limited to sources with an API, RSS feed or explicit permission; no access-control or paywall circumvention is in scope.

## Acceptance criteria

- Each primary module has its own route and active navigation state.
- A report has a stable shareable detail route.
- Today intelligence retains source filtering and selected-detail interaction.
- Research supports the three input modes and communicates its static status honestly.
- Reports present summary before expandable full analysis, with evidence and uncertainty visible.
- Translation is clearly tied to a report and visibly labelled as a draft.
- About page states provenance, AI limits and non-advice disclaimer.
- The paper-toned workbench visual style remains responsive.
- Browser tests cover route navigation, report detail navigation and one core interaction per primary page.

## Scope exclusions

- Authentication, billing, user profiles and saved research.
- User-generated publishing, moderation and social interaction.
- Production data ingestion, database persistence and AI provider calls.
- Domain purchase, DNS configuration and deployment. These follow after public content, hosting choice and brand name are ready.

## Self-review

- No placeholders: every public route, its responsibility and static-phase behavior are explicit.
- No conflict: open browsing and system-maintained public reports coexist because visitor publication is excluded.
- Scope is bounded: this design is a single static-information-architecture increment before backend integration.
