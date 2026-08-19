'use client';
import Link from 'next/link';
import { useState } from 'react';
import { WorkbenchShell } from '@/components/layout/workbench-shell';
export default function ResearchPreviewPage() { const [input] = useState(() => typeof window === 'undefined' ? '' : window.sessionStorage.getItem('neon-research-input') ?? ''); return <WorkbenchShell><main className="main-area public-page public-page-wide research-preview-page"><Link className="back-link" href="/research">← 返回研究输入</Link><p className="eyebrow">RESEARCH WORKSPACE</p><h1>研究工作区</h1><p className="public-lede">围绕你的问题组织材料、验证事实并记录分歧。接入真实来源与模型分析后，结果会在这里持续更新。</p><section className="research-workspace-panel"><span className="eyebrow">当前问题</span><h2>{input || '尚未输入研究问题'}</h2><div className="workspace-columns"><section><b>待核验事实</b><p>补充可追溯来源，避免把标题或观点直接当作结论。</p></section><section><b>关键分歧</b><p>记录相互矛盾的材料，并标记没有证据支持的判断。</p></section><section><b>输出摘要</b><p>将结论、证据链接与不确定性保存在同一份研究记录中。</p></section></div></section></main></WorkbenchShell>; }
