import type { Signal } from '@/lib/domain';
import { formatSignalCount } from '@/lib/presentation';
import { SectorIndexContext } from './sector-index-context';

type NewsFeedProps = { signals: Signal[]; selectedId: string; syncTime: string; page: number; pageSize: number; onSelect: (id: string) => void; onPageChange: (page: number) => void };

export function NewsFeed({ signals, selectedId, syncTime, page, pageSize, onSelect, onPageChange }: NewsFeedProps) {
  const pageCount = Math.max(1, Math.ceil(signals.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageSignals = signals.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const openBrief = (signal: Signal) => onSelect(signal.id);
  return <section className="feed-panel"><div className="feed-meta"><span>{formatSignalCount(signals.length)}</span><span>最后同步于 <b>{syncTime}</b></span></div><div className="news-list">{pageSignals.map((signal) => <article className={`news-card ${signal.id === selectedId ? 'active' : ''}`} key={signal.id} onClick={() => openBrief(signal)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openBrief(signal); }} role="button" tabIndex={0}><div className="news-card-copy"><div className="news-top"><a className="source-link-card" href={signal.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><strong>{signal.source}</strong><small>查看原文 ↗</small></a><span className="time">{new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(signal.publishedAt))}</span><span className={`score ${signal.priority < 80 ? 'mid' : ''}`}>优先 {signal.priority}</span></div><h3>{signal.title}</h3><p>{signal.summary}</p><div className="news-tags">{signal.tags.map((tag, index) => <span className={`tag ${index === 0 && signal.priority > 85 ? 'hot' : ''}`} key={tag}>{tag}</span>)}</div></div><SectorIndexContext signal={signal} /></article>)}{signals.length === 0 && <p className="empty-state">未找到匹配的情报。</p>}</div>{signals.length > 0 && <nav className="feed-pagination" aria-label="信号分页"><button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>上一页</button><span>第 {currentPage} / {pageCount} 页</span><button disabled={currentPage === pageCount} onClick={() => onPageChange(currentPage + 1)}>下一页</button></nav>}</section>;
}
