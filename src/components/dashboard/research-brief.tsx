import { researchDimensions } from '@/lib/demo-signals';
import type { Signal } from '@/lib/domain';

export function ResearchBrief({ signal }: { signal: Signal }) {
  return <>
    <h2 className="detail-title">{signal.title}</h2><p className="detail-summary">{signal.brief}</p>
    <div className="origin"><span className="importance">重要度 {signal.priority}</span><span>原始来源 <b>{signal.source}</b></span><span>·</span><span>{new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(signal.publishedAt))}</span></div>
    <div className="research-title"><h2>七维研究框架</h2><span>演示研究</span></div>
    <div className="dimensions">{researchDimensions.map((dimension, index) => <details className="dimension" key={dimension.number} open={index === 0}><summary><span className="dim-number">{dimension.number}</span>{dimension.title}<span className="dim-arrow">›</span></summary><p>{dimension.content}</p><span className="citation">{dimension.citation}</span></details>)}</div>
  </>;
}
