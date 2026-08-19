import { WorkbenchShell } from '@/components/layout/workbench-shell';

const sections = [
  { number: '01', title: '来源与归因', body: '公开报告会列出可追溯的来源入口、更新时间和证据说明。当前静态演示只展示本地固定资料；接入真实数据后，仅使用有公开 API、RSS 或明确授权的来源。' },
  { number: '02', title: '事实、解释与不确定性', body: '我们会把可核验事实、研究解释和仍存在分歧的问题分开呈现。结论不是替代读者判断的答案，重要信息应回到原始来源再次核验。' },
  { number: '03', title: 'AI 的角色与限制', body: '后续 AI 可以帮助整理、比较和改写信息，但不能替代专业判断，也可能遗漏、误解或错误概括材料。任何 AI 草稿都需要人工复核，并保留来源链接。' },
  { number: '04', title: '更新与反馈', body: '真实数据接入后，每份报告会标示更新时间和来源覆盖范围。我们会优先修正来源、时间或引用有误的内容，并在报告中保留修订痕迹。' },
];

export default function AboutPage() {
  return <WorkbenchShell><main className="main-area public-page about-page"><p className="eyebrow">ABOUT / METHOD & LIMITS</p><h1>关于与方法</h1><p className="public-lede">NEON 是一个面向公众的研究助手：帮助你理解发生了什么、证据来自哪里，以及哪些问题仍不确定。</p><div className="method-grid">{sections.map((section) => <section key={section.number}><span>{section.number}</span><h2>{section.title}</h2><p>{section.body}</p></section>)}</div><section className="non-advice"><span className="eyebrow">重要说明</span><p>内容仅供信息参考，不是投资、法律或医疗建议，也不构成任何其他专业建议。</p></section></main></WorkbenchShell>;
}
