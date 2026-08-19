import Link from 'next/link';
import type { PublicReport } from '@/lib/domain';

export function ReportView({ report }: { report: PublicReport }) {
  const updated = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(report.updatedAt));
  return <article className="report-view report-quick-read"><p className="eyebrow">PUBLIC REPORT / SYSTEM MAINTAINED</p><h1>{report.title}</h1><div className="report-byline"><span>系统维护</span><span>更新于 {updated}</span><span>{report.sourceCount} 个公开来源</span><span>{report.readingMinutes} 分钟阅读</span></div><section className="report-conclusion"><span className="eyebrow">结论先行</span><p>{report.conclusion}</p></section><div className="report-grid"><section><h2>发生了什么</h2><p>{report.whatHappened}</p></section><section><h2>为什么值得关注</h2><p>{report.whyItMatters}</p></section></div><section className="report-section"><div className="report-section-heading"><h2>证据与来源</h2><span>{report.evidence.length} 项公开资料</span></div><ul className="evidence-list">{report.evidence.map((item) => <li key={item.url}><a href={item.url} rel="noreferrer" target="_blank">{item.label} ↗</a><span>{item.note}</span></li>)}</ul></section><Link className="primary-button report-analysis-link" href={`/reports/${report.slug}/analysis`}>阅读完整分析 →</Link></article>;
}
