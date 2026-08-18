'use client';

import { useMemo, useState } from 'react';
import { sources } from '@/lib/demo-signals';
import type { Signal } from '@/lib/domain';
import { ContentStudio } from './content-studio';
import { NewsFeed } from './news-feed';
import { ResearchBrief } from './research-brief';

const views = { intelligence: '晨间情报台', research: '研究工坊', content: '内容转译', archive: '报告档案' } as const;

export function Dashboard({ initialSignals }: { initialSignals: Signal[] }) {
  const [source, setSource] = useState('全部');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(initialSignals[0]?.id ?? '');
  const [descending, setDescending] = useState(true);
  const [view, setView] = useState<keyof typeof views>('intelligence');
  const [syncTime, setSyncTime] = useState('08:16');
  const [toast, setToast] = useState('');
  const visibleSignals = useMemo(() => initialSignals.filter((signal) => (source === '全部' || signal.source === source) && `${signal.title}${signal.summary}${signal.tags.join('')}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => descending ? b.priority - a.priority : a.priority - b.priority), [descending, initialSignals, query, source]);
  const selectedSignal = initialSignals.find((signal) => signal.id === selectedId) ?? visibleSignals[0] ?? initialSignals[0];
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); };
  const refresh = () => { const now = new Date(); setSyncTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })); notify('晨间情报已刷新：8 个源连接正常'); };

  return <div className="app-shell">
    <aside className="sidebar"><a className="brand" href="#" aria-label="NEON 投研工作台主页"><span className="brand-mark">N</span><span>NEON<span className="brand-slash">/</span></span></a><div className="workspace-label">RESEARCH OS <span>V0.1</span></div>
      <nav className="nav" aria-label="工作区">{Object.entries(views).map(([key, label], index) => <button className={`nav-item ${view === key ? 'active' : ''}`} key={key} onClick={() => { setView(key as keyof typeof views); notify(`已切换至${label}（MVP 演示）`); }}><span>{['◉', '◇', '⌁', '□'][index]}</span>{label}{key === 'intelligence' && <i>18</i>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="source-status"><span className="pulse" /><div><b>8 / 8</b><small>情报源在线</small></div></div><button className="user-card"><span className="avatar">Z</span><span><b>Zicarus</b><small>基金研究员</small></span><em>···</em></button></div>
    </aside>
    <main className="main-area"><header className="topbar"><div><p className="eyebrow">08 / 18 · TUESDAY</p><h1>{views[view]}</h1></div><div className="top-actions"><button className="icon-button" aria-label="通知">⌁<span className="notification" /></button><button className="refresh-button" onClick={refresh}><span>↻</span> 刷新情报</button></div></header>
      <section className="command-strip"><label className="search"><span>⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索公司、行业或关键词…" aria-label="搜索新闻" /></label><div className="sources" aria-label="资讯来源筛选">{sources.map((item) => <button className={`source-chip ${source === item ? 'active' : ''}`} key={item} onClick={() => setSource(item)}>{item}</button>)}</div></section>
      <NewsFeed signals={visibleSignals} selectedId={selectedId} descending={descending} syncTime={syncTime} onSelect={setSelectedId} onToggleSort={() => setDescending(!descending)} />
    </main>
    <aside className="detail-panel"><div className="detail-head"><span className="eyebrow">RESEARCH BRIEF</span><button className="close-detail" aria-label="关闭详情">×</button></div>{selectedSignal && <ResearchBrief signal={selectedSignal} />}<ContentStudio onToast={notify} /></aside>
    <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
  </div>;
}
