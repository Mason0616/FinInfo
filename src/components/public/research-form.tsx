'use client';

import Link from 'next/link';
import { useState } from 'react';

const modes = [{ id: 'question', label: '主题 / 问题', placeholder: '例如：固态电池量产进展如何？' }, { id: 'url', label: '新闻链接', placeholder: '粘贴一个公开新闻链接' }, { id: 'text', label: '粘贴文本', placeholder: '粘贴新闻或研究材料' }] as const;
type Mode = (typeof modes)[number]['id'];
const examples = ['固态电池量产进展如何？', '为什么铜价和库存变化值得关注？', '国产 GPU 推理需求有哪些分歧？'];

export function ResearchForm() {
  const [mode, setMode] = useState<Mode>('question');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const selectedMode = modes.find((item) => item.id === mode) ?? modes[0];
  const beginResearch = () => { setIsReady(false); setIsProcessing(true); setStatus('正在拆解问题，整理可验证的研究维度…'); window.sessionStorage.setItem('neon-research-input', value.trim()); window.setTimeout(() => { setIsProcessing(false); setIsReady(true); setStatus('研究框架已准备好。'); }, 850); };
  const reset = () => { setStatus(''); setIsReady(false); };
  return <section className="research-form"><div className="research-tabs" role="tablist" aria-label="研究输入方式">{modes.map((item) => <button aria-selected={mode === item.id} className={`style-tab ${mode === item.id ? 'active' : ''}`} key={item.id} onClick={() => { setMode(item.id); reset(); }} role="tab">{item.label}</button>)}</div><label className="research-input-label" htmlFor="research-input">{selectedMode.label}</label><textarea aria-label="研究输入" id="research-input" onChange={(event) => setValue(event.target.value)} placeholder={selectedMode.placeholder} value={value} /><div className="research-form-footer"><span>你的输入只保留在当前浏览器中。</span><button className="primary-button" disabled={!value.trim() || isProcessing} onClick={beginResearch}>{isProcessing ? '正在整理…' : '开始研究'}</button></div>{status && <p className="form-status" role="status">{status}</p>}{isReady && <Link className="primary-button research-workspace-link" href="/research/preview">打开研究工作区 →</Link>}<div className="example-prompts"><span className="eyebrow">不知道从哪里开始？</span>{examples.map((example) => <button key={example} onClick={() => { setMode('question'); setValue(example); reset(); }}>{example}</button>)}</div></section>;
}
