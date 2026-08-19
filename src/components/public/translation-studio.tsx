'use client';

import Link from 'next/link';
import { useState } from 'react';
import { publicReports, translationDrafts, type TranslationChannel } from '@/lib/public-fixtures';

const channels: { id: TranslationChannel; label: string }[] = [{ id: 'short-post', label: '短内容' }, { id: 'video-script', label: '短视频脚本' }, { id: 'article', label: '文章草稿' }];

export function TranslationStudio() {
  const [slug, setSlug] = useState(publicReports[0]?.slug ?? '');
  const [channel, setChannel] = useState<TranslationChannel>('short-post');
  const [copied, setCopied] = useState(false);
  const draft = translationDrafts[slug]?.[channel] ?? '';
  const copy = async () => { await navigator.clipboard.writeText(draft); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };

  return <section className="translation-studio"><label className="research-input-label" htmlFor="public-report">选择公开报告</label><select aria-label="选择公开报告" id="public-report" onChange={(event) => { setSlug(event.target.value); setCopied(false); }} value={slug}>{publicReports.map((report) => <option key={report.slug} value={report.slug}>{report.title}</option>)}</select><div className="translation-tabs" role="tablist" aria-label="内容渠道">{channels.map((item) => <button aria-selected={channel === item.id} className={`style-tab ${channel === item.id ? 'active' : ''}`} key={item.id} onClick={() => { setChannel(item.id); setCopied(false); }} role="tab">{item.label}</button>)}</div><div className="draft-notice">研究内容草稿，请自行核验</div><textarea aria-label="内容草稿" defaultValue={draft} key={`${slug}-${channel}`} /><div className="translation-footer"><Link href={`/reports/${slug}`}>查看来源报告</Link><button className="copy-button" onClick={copy}>{copied ? '已复制' : '复制草稿'}</button></div></section>;
}
