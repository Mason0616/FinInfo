# Display Preferences Design

## Goal

Replace the non-actionable sidebar status block with a public website display-preferences control that applies immediately and persists locally in the visitor's browser.

## Entry and interaction

The lower-left sidebar shows one button labelled `显示偏好` with a settings icon. Activating it opens a compact, keyboard-accessible popover anchored to the button. Activating it again, pressing Escape, or clicking outside closes it.

The control is present on every route because it belongs to the shared workbench shell.

## Preferences

| Preference | Values | Immediate site effect |
| --- | --- | --- |
| 外观 | 浅色, 深色, 跟随系统 | Applies `data-theme` to the document root and changes the site color tokens. |
| 字号 | 小, 默认, 大 | Applies `data-font-size` to the document root and scales reading text. |
| 阅读密度 | 舒适, 紧凑 | Applies `data-density` and adjusts content/list spacing. |
| 时间格式 | 精确时间, 相对时间 | Stores a preference for future data-backed feeds; the static version labels it as applying after real-time data is connected. |
| 侧边栏 | 展开, 紧凑 | Applies `data-sidebar` and switches desktop navigation between labels and icon-first compact presentation. |

## Persistence and safety

- Store a single versioned JSON preference object at `localStorage['neon-display-preferences-v1']`.
- Use defaults when storage is unavailable, JSON is malformed, or a stored value is outside the allowed option list.
- System theme follows `prefers-color-scheme` only while the visitor chooses `跟随系统`.
- The static site does not claim that time-format selection changes the current fixture timestamps; it prepares the preference for the later live-data phase.

## Acceptance criteria

- The status block is replaced by a visible `显示偏好` control on every desktop route.
- Theme, font size, density and sidebar selections update root data attributes immediately.
- Reload restores saved selections.
- Invalid local storage falls back without breaking page rendering.
- The preference panel is dismissible with Escape.
- Browser tests cover persistence and one visible layout change.

## Scope exclusions

- No account synchronization, backend persistence or analytics.
- No motion preference setting.
- No retroactive rewriting of static fixture timestamps.

## Self-review

The settings have observable behavior, clear defaults and local-only persistence. Time format is intentionally represented as a saved future-data preference rather than falsely altering static timestamps.
