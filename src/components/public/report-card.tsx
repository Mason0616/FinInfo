import Link from 'next/link';
import type { PublicReport } from '@/lib/domain';

export function ReportCard({ report }: { report: PublicReport }) {
  return <Link className="report-card" href={`/reports/${report.slug}`}><div className="report-card-meta"><span>{report.topic}</span><span>系统维护</span></div><h2>{report.title}</h2><p>{report.conclusion}</p><div className="report-card-footer"><span>{report.sourceCount} 个公开来源</span><span>{report.readingMinutes} 分钟阅读</span></div><div className="news-tags">{report.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></Link>;
}
