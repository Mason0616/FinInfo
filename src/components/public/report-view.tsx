'use client';

import { useState } from 'react';
import type { PublicReport } from '@/lib/domain';

export function ReportView({ report }: { report: PublicReport }) {
  const [expanded, setExpanded] = useState(false);
  const updated = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(report.updatedAt));
  return <article className="report-view"><p className="eyebrow">PUBLIC REPORT / SYSTEM MAINTAINED</p><h1>{report.title}</h1><div className="report-byline"><span>系统维护</span><span>更新于 {updated}</span><span>{report.sourceCount} 个公开来源</span><span>{report.readingMinutes} 分钟阅读</span></div><section className="report-conclusion"><span className="eyebrow">结论先行</span><p>{report.conclusion}</p></section><div className="report-grid"><section><h2>发生了什么</h2><p>{report.whatHappened}</p></section><section><h2>为什么值得关注</h2><p>{report.whyItMatters}</p></section></div><section className="report-section"><h2>证据与来源</h2><ul className="evidence-list">{report.evidence.map((item) => <li key={item.url}><a href={item.url} rel="noreferrer" target="_blank">{item.label} ↗</a><span>{item.note}</span></li>)}</ul></section><div className="report-grid"><section><h2>分歧与不确定性</h2><ul>{report.uncertainty.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>后续值得跟踪</h2><ul>{report.watchQuestions.map((item) => <li key={item}>{item}</li>)}</ul></section></div><section className="full-analysis"><button className="primary-button" onClick={() => setExpanded(!expanded)}>{expanded ? '收起完整分析' : '展开完整分析'}</button>{expanded && <div className="full-analysis-content">{report.fullAnalysis.map((item) => <section key={item.heading}><h2>{item.heading}</h2><p>{item.body}</p></section>)}</div>}</section></article>;
}
