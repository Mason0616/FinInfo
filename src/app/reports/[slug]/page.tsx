import { notFound } from 'next/navigation';
import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { ReportView } from '@/components/public/report-view';
import { getPublicReport } from '@/lib/public-fixtures';

export default async function ReportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = getPublicReport(slug);
  if (!report) notFound();
  return <WorkbenchShell><main className="main-area public-page public-page-wide report-page"><Link className="back-link" href="/reports">← 返回公开报告</Link><ReportView report={report} /></main></WorkbenchShell>;
}
import Link from 'next/link';
