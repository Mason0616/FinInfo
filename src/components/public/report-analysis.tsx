import Link from 'next/link';
import type { PublicReport } from '@/lib/domain';

export function ReportAnalysis({ report }: { report: PublicReport }) {
  return <article className="report-view report-analysis-page"><Link className="back-link" href={`/reports/${report.slug}`}>← 返回报告速读</Link><p className="eyebrow">REPORT ANALYSIS</p><h1>{report.title}</h1><div className="report-grid"><section><h2>分歧与不确定性</h2><ul>{report.uncertainty.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>后续值得跟踪</h2><ul>{report.watchQuestions.map((item) => <li key={item}>{item}</li>)}</ul></section></div><section className="full-analysis-content">{report.fullAnalysis.map((item) => <section key={item.heading}><h2>{item.heading}</h2><p>{item.body}</p></section>)}</section></article>;
}
