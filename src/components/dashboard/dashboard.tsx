'use client';

import { useMemo, useState } from 'react';
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
  const [descending, setDescending] = useState(true);
  const [syncTime, setSyncTime] = useState('08:16');
  const [toast, setToast] = useState('');
  const visibleSignals = useMemo(() => initialSignals.filter((signal) => (source === '全部' || signal.source === source) && `${signal.title}${signal.summary}${signal.tags.join('')}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => descending ? b.priority - a.priority : a.priority - b.priority), [descending, initialSignals, query, source]);
  const selectedSignal = initialSignals.find((signal) => signal.id === selectedId) ?? visibleSignals[0] ?? initialSignals[0];
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); };
  const refresh = () => { const now = new Date(); setSyncTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })); notify('晨间情报已刷新：8 个源连接正常'); };

  return <WorkbenchShell>
    <main className={`main-area ${isBriefOpen ? '' : 'main-area-wide'}`}><header className="topbar"><div><p className="eyebrow">08 / 18 · TUESDAY</p><h1>晨间情报台</h1></div><div className="top-actions"><button className="refresh-button" onClick={refresh}><span>↻</span> 刷新情报</button></div></header>
      <section className="command-strip"><label className="search"><span>⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索公司、行业或关键词…" aria-label="搜索新闻" /></label><div className="sources" aria-label="资讯来源筛选">{sources.map((item) => <button className={`source-chip ${source === item ? 'active' : ''}`} key={item} onClick={() => setSource(item)}>{item}</button>)}</div></section>
      <NewsFeed signals={visibleSignals} selectedId={selectedId} descending={descending} syncTime={syncTime} onSelect={(id) => { setSelectedId(id); setIsBriefOpen(true); }} onToggleSort={() => setDescending(!descending)} />
    </main>
    {isBriefOpen && <aside className="detail-panel"><div className="detail-head"><span className="eyebrow">RESEARCH BRIEF</span><button className="close-detail" aria-label="关闭详情" onClick={() => setIsBriefOpen(false)}>×</button></div>{selectedSignal && <ResearchBrief signal={selectedSignal} />}<ContentStudio onToast={notify} /></aside>}
    <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
  </WorkbenchShell>;
}
