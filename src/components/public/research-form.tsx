'use client';

import { useState } from 'react';

const modes = [
  { id: 'question', label: '主题 / 问题', placeholder: '例如：固态电池量产进展如何？' },
  { id: 'url', label: '新闻链接', placeholder: '粘贴一个公开新闻链接' },
  { id: 'text', label: '粘贴文本', placeholder: '粘贴新闻或研究材料' },
] as const;

type Mode = (typeof modes)[number]['id'];
const examples = ['固态电池量产进展如何？', '为什么铜价和库存变化值得关注？', '国产 GPU 推理需求有哪些分歧？'];

export function ResearchForm() {
  const [mode, setMode] = useState<Mode>('question');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const selectedMode = modes.find((item) => item.id === mode) ?? modes[0];

  return <section className="research-form"><div className="research-tabs" role="tablist" aria-label="研究输入方式">{modes.map((item) => <button aria-selected={mode === item.id} className={`style-tab ${mode === item.id ? 'active' : ''}`} key={item.id} onClick={() => { setMode(item.id); setStatus(''); }} role="tab">{item.label}</button>)}</div><label className="research-input-label" htmlFor="research-input">{selectedMode.label}</label><textarea aria-label="研究输入" id="research-input" onChange={(event) => setValue(event.target.value)} placeholder={selectedMode.placeholder} value={value} /><div className="research-form-footer"><span>静态预览不会发送你的输入内容。</span><button className="primary-button" disabled={!value.trim()} onClick={() => setStatus('当前是静态演示：真实来源采集与 AI 研究将在后续版本接入。')}>开始研究</button></div>{status && <p className="form-status" role="status">{status}</p>}<div className="example-prompts"><span className="eyebrow">不知道从哪里开始？</span>{examples.map((example) => <button key={example} onClick={() => { setMode('question'); setValue(example); setStatus(''); }}>{example}</button>)}</div></section>;
}
