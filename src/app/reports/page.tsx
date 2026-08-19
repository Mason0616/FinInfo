import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { ReportCard } from '@/components/public/report-card';
import { publicReports } from '@/lib/public-fixtures';

export default function ReportsPage() {
  return <WorkbenchShell><main className="main-area public-page"><p className="eyebrow">REPORT LIBRARY / PUBLIC</p><h1>公开报告</h1><p className="public-lede">由系统维护的专题研究。先读结论和证据，再决定是否展开完整分析。</p><div className="report-library">{publicReports.map((report) => <ReportCard key={report.slug} report={report} />)}</div></main></WorkbenchShell>;
}
