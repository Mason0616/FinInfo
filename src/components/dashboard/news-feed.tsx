import type { Signal } from '@/lib/domain';
import { formatSignalCount } from '@/lib/presentation';

type NewsFeedProps = {
  signals: Signal[];
  selectedId: string;
  descending: boolean;
  syncTime: string;
  onSelect: (id: string) => void;
  onToggleSort: () => void;
};

export function NewsFeed({ signals, selectedId, descending, syncTime, onSelect, onToggleSort }: NewsFeedProps) {
  return (
    <section className="feed-panel">
      <div className="feed-heading"><div><span className="eyebrow">SIGNALS / LIVE FEED</span><h2>需要你判断的事</h2></div><button className="sort-button" onClick={onToggleSort}>优先级排序 <span>{descending ? '↓' : '↑'}</span></button></div>
      <div className="feed-meta"><span>{formatSignalCount(signals.length)}</span><span>最后同步于 <b>{syncTime}</b></span></div>
      <div className="news-list">
        {signals.map((signal) => (
          <button className={`news-card ${signal.id === selectedId ? 'active' : ''}`} key={signal.id} onClick={() => onSelect(signal.id)}>
            <div className="news-top"><span className="signal-source">{signal.source}</span><span className="time">{new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(signal.publishedAt))}</span><span className={`score ${signal.priority < 80 ? 'mid' : ''}`}>优先 {signal.priority}</span></div>
            <h3>{signal.title}</h3><p>{signal.summary}</p><div className="news-tags">{signal.tags.map((tag, index) => <span className={`tag ${index === 0 && signal.priority > 85 ? 'hot' : ''}`} key={tag}>{tag}</span>)}</div>
          </button>
        ))}
        {signals.length === 0 && <p className="empty-state">未找到匹配的情报。</p>}
      </div>
    </section>
  );
}
