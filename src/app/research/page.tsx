import { WorkbenchShell } from '@/components/layout/workbench-shell';
import { ResearchForm } from '@/components/public/research-form';

export default function ResearchPage() {
  return <WorkbenchShell><main className="main-area public-page"><p className="eyebrow">RESEARCH / START HERE</p><h1>开始研究</h1><p className="public-lede">从一个问题、链接或片段开始，把复杂信息整理成可核验的研究摘要。</p><ResearchForm /><section className="research-steps" aria-label="研究流程"><div><b>01</b><h2>收集来源</h2><p>从公开、可追溯的材料中定位关键事实。</p></div><div><b>02</b><h2>对比观点</h2><p>区分共识、分歧与尚未证实的信息。</p></div><div><b>03</b><h2>写出带引用的摘要</h2><p>让结论可以回到来源核验，而非只相信一句话。</p></div></section></main></WorkbenchShell>;
}
