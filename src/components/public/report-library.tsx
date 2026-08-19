'use client';

import { useState } from 'react';
import type { PublicReport } from '@/lib/domain';
import { ReportCard } from './report-card';

export function ReportLibrary({ reports }: { reports: PublicReport[] }) {
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(reports.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleReports = reports.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return <>
    <div className="report-library">{visibleReports.map((report) => <ReportCard key={report.slug} report={report} />)}</div>
    <nav className="feed-pagination report-pagination" aria-label="报告分页"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>上一页</button><span>第 {currentPage} / {pageCount} 页</span><button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>下一页</button></nav>
  </>;
}
