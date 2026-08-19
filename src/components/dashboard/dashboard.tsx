'use client';

import { useEffect, useMemo, useState } from 'react';
import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { sources } from '@/lib/demo-signals';
import type { Signal } from '@/lib/domain';
import { ContentStudio } from './content-studio';
import { NewsFeed } from './news-feed';
import { ResearchBrief } from './research-brief';

export function Dashboard({ initialSignals }: { initialSignals: Signal[] }) {
  const [source, setSource] = useState('全部');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(initialSignals[0]?.id ?? '');
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'priority' | 'time'>('priority');
  const [descending, setDescending] = useState(true);
  const [syncTime, setSyncTime] = useState('08:16');
  const [toast, setToast] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(clock);
  }, []);
  const visibleSignals = useMemo(() => initialSignals.filter((signal) => (source === '全部' || signal.source === source) && `${signal.title}${signal.summary}${signal.tags.join('')}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => { const delta = sortBy === 'priority' ? a.priority - b.priority : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(); return descending ? -delta : delta; }), [descending, initialSignals, query, sortBy, source]);
  const selectedSignal = initialSignals.find((signal) => signal.id === selectedId) ?? visibleSignals[0] ?? initialSignals[0];
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); };
  const refresh = () => { const now = new Date(); setSyncTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })); notify('晨间情报已刷新：8 个源连接正常'); };

  const resetList = () => { setPage(1); setIsBriefOpen(false); };
  const beijingDate = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(now).replace('星期', '星期');
  const beijingTime = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now);

  return <WorkbenchShell>
    <main className={`main-area ${isBriefOpen ? '' : 'main-area-wide'}`}><header className="topbar"><div><p className="eyebrow">{beijingDate} · <time data-testid="beijing-clock">{beijingTime}</time> 北京时间</p><h1>晨间情报台</h1></div><div className="top-actions"><button className="refresh-button" onClick={refresh}><span>↻</span> 刷新情报</button></div></header>
      <section className="command-strip"><label className="search"><span>⌕</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); resetList(); }} placeholder="搜索公司、行业或关键词…" aria-label="搜索新闻" /></label><div className="sources" aria-label="资讯来源筛选">{sources.map((item) => <button className={`source-chip ${source === item ? 'active' : ''}`} key={item} onClick={() => { setSource(item); resetList(); }}>{item}</button>)}</div></section>
      <NewsFeed signals={visibleSignals} selectedId={selectedId} sortBy={sortBy} descending={descending} syncTime={syncTime} page={page} pageSize={pageSize} onSelect={(id) => { setSelectedId(id); setIsBriefOpen(true); }} onSort={(nextSort) => { setDescending(nextSort === sortBy ? !descending : true); setSortBy(nextSort); resetList(); }} onPageChange={(nextPage) => { setPage(nextPage); setIsBriefOpen(false); }} />
    </main>
    {isBriefOpen && <aside className="detail-panel"><div className="detail-head"><span className="eyebrow">RESEARCH BRIEF</span><button className="close-detail" aria-label="关闭详情" onClick={() => setIsBriefOpen(false)}>×</button></div>{selectedSignal && <ResearchBrief signal={selectedSignal} />}<ContentStudio onToast={notify} /></aside>}
    <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
  </WorkbenchShell>;
}
