import { notFound } from 'next/navigation';
import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { ReportView } from '@/components/public/report-view';
import { getPublicReport } from '@/lib/public-fixtures';

export default async function ReportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = getPublicReport(slug);
  if (!report) notFound();
  return <WorkbenchShell><main className="main-area public-page report-page"><ReportView report={report} /></main></WorkbenchShell>;
}
