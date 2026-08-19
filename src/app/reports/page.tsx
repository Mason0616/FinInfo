import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { ReportLibrary } from '@/components/public/report-library';
import { publicReports } from '@/lib/public-fixtures';

export default function ReportsPage() {
  return <WorkbenchShell><main className="main-area public-page public-page-wide"><p className="eyebrow">REPORT LIBRARY / PUBLIC</p><h1>公开报告</h1><p className="public-lede">由系统维护的专题研究。先读结论和证据，再决定是否展开完整分析。</p><ReportLibrary reports={publicReports} /></main></WorkbenchShell>;
}
