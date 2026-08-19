import { useState } from 'react';
import { channelCopy } from '@/lib/demo-signals';

type Channel = keyof typeof channelCopy;
const labels: Record<Channel, string> = { xiaohongshu: '小红书', douyin: '抖音', wechat: '公众号' };
const outputs = [{ icon: '⌘', name: '短视频脚本', note: '结构已就绪' }, { icon: '<>', name: '公众号 HTML', note: '排版已就绪' }, { icon: '↓', name: 'PDF 研究报告', note: '12 页 · 待导出' }, { icon: '◒', name: '封面图', note: '1080 × 1440' }];

export function ContentStudio({ onToast }: { onToast: (message: string) => void }) {
  const [channel, setChannel] = useState<Channel>('xiaohongshu');
  const [text, setText] = useState<string>(channelCopy.xiaohongshu);
  const selectChannel = (next: Channel) => { setChannel(next); setText(channelCopy[next]); };
  const copy = async () => { await navigator.clipboard.writeText(text); onToast('文案已复制到剪贴板'); };
  return <>
    <section className="content-studio"><div className="studio-heading"><span className="eyebrow">CONTENT STUDIO</span><button className="expand-button" aria-label="展开内容工坊">↗</button></div>
      <div className="style-tabs">{(Object.keys(labels) as Channel[]).map((item) => <button className={`style-tab ${channel === item ? 'active' : ''}`} key={item} onClick={() => selectChannel(item)}>{labels[item]}</button>)}</div>
      <textarea aria-label="内容文稿" value={text} onChange={(event) => setText(event.target.value)} />
      <div className="studio-footer"><span>{text.replace(/\s/g, '').length} 字</span><button className="copy-button" onClick={copy}>复制文案</button></div>
    </section>
    <section className="outputs"><div className="output-heading"><span className="eyebrow">DELIVERABLES</span><button onClick={() => onToast('4 个输出已进入生成队列（演示模式）')}>+ 生成全部</button></div><div className="output-grid">{outputs.map((output) => <button className="output-card" key={output.name} onClick={() => onToast(`${output.name} 预览已准备（演示模式）`)}><span className="output-icon">{output.icon}</span><span className="ready-dot" /><b>{output.name}</b><small>{output.note}</small></button>)}</div></section>
  </>;
}
