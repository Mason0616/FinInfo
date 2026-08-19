import type { Signal } from '@/lib/domain';

const sectors: Record<string, { label: string; direction: string; path: string }> = {
  铜: { label: '有色金属', direction: '示意上行', path: 'M4 51C28 48 47 41 70 43S108 30 132 27S175 14 216 9' },
  光伏: { label: '新能源', direction: '示意反弹', path: 'M4 48C27 54 48 44 70 47S106 36 130 31S178 24 216 17' },
  AI算力: { label: '半导体 / AI 算力', direction: '示意走强', path: 'M4 53C26 48 48 50 69 42S105 39 131 30S174 21 216 13' },
  白酒: { label: '消费', direction: '示意震荡', path: 'M4 35C29 28 47 47 70 39S107 31 131 40S174 38 216 30' },
  出口链: { label: '出口链', direction: '示意波动', path: 'M4 31C27 42 47 24 70 35S108 50 131 38S175 24 216 33' },
  固态电池: { label: '新能源材料', direction: '影响待核验', path: 'M4 45C31 41 48 38 70 42S108 34 131 37S175 29 216 27' },
};

export function SectorIndexContext({ signal }: { signal: Signal }) {
  const sector = sectors[signal.topic] ?? { label: signal.topic, direction: '影响待核验', path: 'M4 42C32 42 49 33 70 38S108 30 131 34S175 28 216 26' };
  return <div className="sector-index-context"><div><span>{sector.label}</span><b>DEMO INDEX</b><small>{sector.direction} · 静态演示走势</small></div><svg aria-label={`${sector.label}领域当日指数示意走势`} role="img" viewBox="0 0 220 60"><path className="sector-grid" d="M0 15H220M0 30H220M0 45H220" /><path className="sector-line" d={sector.path} /></svg></div>;
}
