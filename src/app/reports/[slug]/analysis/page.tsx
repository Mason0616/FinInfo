import { notFound } from 'next/navigation';
import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { ReportAnalysis } from '@/components/public/report-analysis';
import { getPublicReport } from '@/lib/public-fixtures';

export default async function ReportAnalysisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = getPublicReport(slug);
  if (!report) notFound();
  return <WorkbenchShell><main className="main-area public-page public-page-wide report-page"><ReportAnalysis report={report} /></main></WorkbenchShell>;
}
