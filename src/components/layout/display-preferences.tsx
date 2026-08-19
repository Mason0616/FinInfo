'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'default' | 'large';
type Density = 'comfortable' | 'compact';
type TimeFormat = 'exact' | 'relative';
type Sidebar = 'expanded' | 'compact';
type Preferences = { theme: Theme; fontSize: FontSize; density: Density; timeFormat: TimeFormat; sidebar: Sidebar };

const storageKey = 'neon-display-preferences-v1';
const defaults: Preferences = { theme: 'system', fontSize: 'default', density: 'comfortable', timeFormat: 'exact', sidebar: 'expanded' };
const valid = <T extends string>(value: unknown, choices: readonly T[], fallback: T): T => typeof value === 'string' && choices.includes(value as T) ? value as T : fallback;

function readPreferences(): Preferences {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? '{}');
    const stored = parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
    return { theme: valid(stored.theme, ['light', 'dark', 'system'], defaults.theme), fontSize: valid(stored.fontSize, ['small', 'default', 'large'], defaults.fontSize), density: valid(stored.density, ['comfortable', 'compact'], defaults.density), timeFormat: valid(stored.timeFormat, ['exact', 'relative'], defaults.timeFormat), sidebar: valid(stored.sidebar, ['expanded', 'compact'], defaults.sidebar) };
  } catch { return defaults; }
}

function applyPreferences(preferences: Preferences) {
  const root = document.documentElement;
  root.dataset.theme = preferences.theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : preferences.theme;
  root.dataset.fontSize = preferences.fontSize;
  root.dataset.density = preferences.density;
  root.dataset.timeFormat = preferences.timeFormat;
  root.dataset.sidebar = preferences.sidebar;
}

const choices = [
  { key: 'theme', label: '外观', options: [['light', '浅色'], ['dark', '深色'], ['system', '跟随系统']] },
  { key: 'fontSize', label: '字号', options: [['small', '小'], ['default', '默认'], ['large', '大']] },
  { key: 'density', label: '阅读密度', options: [['comfortable', '舒适'], ['compact', '紧凑']] },
  { key: 'timeFormat', label: '时间格式', options: [['exact', '精确时间'], ['relative', '相对时间']] },
] as const;

export function DisplayPreferences() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(() => typeof window === 'undefined' ? defaults : readPreferences());
  useEffect(() => { applyPreferences(preferences); }, [preferences]);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  const update = (key: keyof Preferences, value: string) => { const sidebar = document.documentElement.dataset.sidebar === 'compact' ? 'compact' : 'expanded'; const next = { ...preferences, sidebar, [key]: value } as Preferences; setPreferences(next); applyPreferences(next); window.localStorage.setItem(storageKey, JSON.stringify(next)); };
  return <div className="display-preferences"><button aria-expanded={open} className="preference-trigger" onClick={() => setOpen(!open)}>⚙ 显示偏好</button>{open && <div className="preference-panel" role="dialog" aria-label="显示偏好"><p className="eyebrow">DISPLAY PREFERENCES</p>{choices.map((group) => <fieldset key={group.key}><legend>{group.label}</legend><div>{group.options.map(([value, label]) => <label key={value}><input checked={preferences[group.key] === value} name={group.key} onChange={() => update(group.key, value)} type="radio" value={value} />{label}</label>)}</div>{group.key === 'timeFormat' && <small>真实数据接入后生效</small>}</fieldset>)}</div>}</div>;
}
