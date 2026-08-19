'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { PublicReport } from '@/lib/domain';

const storageKey = 'neon-recent-report-slugs-v1';
const defaults = ['copper-inventory', 'gpu-inference'];

function readRecentSlugs(currentSlug?: string) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    const history = Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : [];
    const next = currentSlug ? [currentSlug, ...history.filter((slug) => slug !== currentSlug)] : history;
    const result = next.length ? next.slice(0, 3) : defaults;
    window.localStorage.setItem(storageKey, JSON.stringify(result));
    return result;
  } catch { return currentSlug ? [currentSlug, ...defaults.filter((slug) => slug !== currentSlug)].slice(0, 3) : defaults; }
}

export function RecentResearch({ pathname, reports }: { pathname: string; reports: PublicReport[] }) {
  const [open, setOpen] = useState(true);
  const currentSlug = pathname.startsWith('/reports/') ? pathname.split('/').at(-1) : undefined;
  const [slugs] = useState<string[]>(() => typeof window === 'undefined' ? defaults : readRecentSlugs(currentSlug));
  const recentReports = slugs.map((slug) => reports.find((report) => report.slug === slug)).filter((report): report is PublicReport => Boolean(report));

  return <section className="recent-research" aria-label="最近研究"><button className="recent-research-toggle" aria-expanded={open} aria-label={open ? '收起最近研究' : '展开最近研究'} onClick={() => setOpen(!open)}><span className="eyebrow">最近研究</span><span>{open ? '−' : '+'}</span></button>{open && recentReports.map((report) => <Link className={`recent-report-card ${pathname === `/reports/${report.slug}` ? 'active' : ''}`} href={`/reports/${report.slug}`} key={report.slug}><span className="recent-report-meta"><b>{report.topic}</b><em>已发布</em></span><strong>{report.title}</strong><small>{report.readingMinutes} 分钟阅读 <span>↗</span></small></Link>)}</section>;
}
