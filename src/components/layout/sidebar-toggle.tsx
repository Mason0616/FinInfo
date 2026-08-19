'use client';

import { useEffect, useState } from 'react';

const storageKey = 'neon-display-preferences-v1';

function currentSidebar(): 'expanded' | 'compact' {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? '{}');
    return parsed && typeof parsed === 'object' && (parsed as { sidebar?: unknown }).sidebar === 'compact' ? 'compact' : 'expanded';
  } catch { return 'expanded'; }
}

export function SidebarToggle() {
  const [sidebar, setSidebar] = useState<'expanded' | 'compact'>(() => typeof window === 'undefined' ? 'expanded' : currentSidebar());
  useEffect(() => { document.documentElement.dataset.sidebar = sidebar; }, [sidebar]);
  const toggle = () => {
    const next = sidebar === 'expanded' ? 'compact' : 'expanded';
    setSidebar(next);
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? '{}');
      const saved = parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
      window.localStorage.setItem(storageKey, JSON.stringify({ ...saved, sidebar: next }));
    } catch { window.localStorage.setItem(storageKey, JSON.stringify({ sidebar: next })); }
  };
  const label = sidebar === 'expanded' ? '收起侧边栏' : '展开侧边栏';
  return <button aria-label={label} className="sidebar-toggle" onClick={toggle} title={label}>{sidebar === 'expanded' ? '‹' : '›'}</button>;
}
