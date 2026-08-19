type ReportEvidenceVisualProps = { slug: string; title: string };

function ChartFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return <svg aria-label={`${title}示意趋势图`} role="img" viewBox="0 0 320 88"><path className="evidence-grid" d="M0 18H320M0 44H320M0 70H320" />{children}</svg>;
}

export function ReportEvidenceVisual({ slug, title }: ReportEvidenceVisualProps) {
  const visualTitle = slug === 'copper-inventory' ? '铜价与库存' : slug === 'gpu-inference' ? '国产 GPU 推理成本' : slug === 'solid-state-battery-demo' ? '固态电池量产阶段' : slug === 'cross-border-commerce-demo' ? '跨境电商履约成本' : title;
  const visual = slug === 'copper-inventory'
    ? <ChartFrame title={visualTitle}><path className="evidence-line evidence-line-muted" d="M12 20C75 27 98 38 142 42S227 62 308 70" /><path className="evidence-line" d="M12 72C68 64 97 58 141 49S232 28 308 14" /><circle className="evidence-dot" cx="308" cy="14" r="4" /></ChartFrame>
    : slug === 'gpu-inference'
      ? <ChartFrame title={visualTitle}><path className="evidence-area" d="M12 16C67 25 82 39 137 51S228 69 308 74V82H12Z" /><path className="evidence-line" d="M12 16C67 25 82 39 137 51S228 69 308 74" /><circle className="evidence-dot" cx="308" cy="74" r="4" /></ChartFrame>
      : slug === 'solid-state-battery-demo'
        ? <ChartFrame title={visualTitle}><path className="evidence-stage" d="M25 64H94V46H163V29H232V15H295" /><circle className="evidence-dot" cx="25" cy="64" r="4" /><circle className="evidence-dot" cx="94" cy="46" r="4" /><circle className="evidence-dot" cx="163" cy="29" r="4" /><circle className="evidence-dot" cx="232" cy="15" r="4" /></ChartFrame>
        : <ChartFrame title={visualTitle}><rect className="evidence-bar" x="26" y="20" width="48" height="52" /><rect className="evidence-bar evidence-bar-secondary" x="101" y="33" width="48" height="39" /><rect className="evidence-bar evidence-bar-muted" x="176" y="43" width="48" height="29" /><rect className="evidence-bar evidence-bar-light" x="251" y="55" width="48" height="17" /></ChartFrame>;

  const indicator = slug === 'copper-inventory' ? '库存压力 / 价格动能' : slug === 'gpu-inference' ? '推理成本 / 部署采用度' : slug === 'solid-state-battery-demo' ? '中试验证 / 量产路径' : '履约成本 / 经营弹性';
  return <figure className="report-evidence-visual"><figcaption><span>关键验证指标</span><small>{indicator} · 待接入数据</small></figcaption>{visual}</figure>;
}
