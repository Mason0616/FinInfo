'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { DisplayPreferences } from './display-preferences';
import { RecentResearch } from './recent-research';
import { SidebarToggle } from './sidebar-toggle';
import { publicReports } from '@/lib/public-fixtures';

const navigation = [
  { href: '/', label: '今日情报', icon: '◉' },
  { href: '/research', label: '开始研究', icon: '◇' },
  { href: '/reports', label: '公开报告', icon: '□' },
  { href: '/translate', label: '内容转译', icon: '⌁' },
];

export function WorkbenchShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return <div className="app-shell workbench-shell"><aside className="sidebar"><div className="sidebar-top"><div className="brand-row"><Link className="brand" href="/" aria-label="NEON 研究工作台主页"><span className="brand-mark">N</span><span>NEON<span className="brand-slash">/</span></span></Link><SidebarToggle /></div><div className="workspace-label">PUBLIC RESEARCH <span>BETA</span></div><nav className="nav" aria-label="工作区">{navigation.map((item) => <Link className={`nav-item ${pathname === item.href ? 'active' : ''}`} href={item.href} key={item.href}><span>{item.icon}</span>{item.label}{item.href === '/' && <i>18</i>}</Link>)}</nav><RecentResearch key={pathname} pathname={pathname} reports={publicReports} /></div><div className="sidebar-bottom"><DisplayPreferences /><Link className={`sidebar-utility-link ${pathname === '/about' ? 'active' : ''}`} href="/about">关于与方法 <span>↗</span></Link></div></aside>{children}</div>;
}
