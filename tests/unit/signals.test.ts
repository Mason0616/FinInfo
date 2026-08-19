import { describe, expect, it } from 'vitest';
import type { Signal } from '@/lib/domain';
import { MAX_SIGNAL_CAPACITY, SIGNAL_PAGE_SIZE, retainNewestSignals } from '@/lib/signals';

const signal = (id: number): Signal => ({
  id: `signal-${id}`,
  source: '本地示例',
  publishedAt: `2026-08-${String((id % 28) + 1).padStart(2, '0')}T08:00:00+08:00`,
  priority: id,
  title: `情报 ${id}`,
  summary: '摘要',
  tags: ['测试'],
  topic: '测试',
  brief: '简报',
});

describe('retainNewestSignals', () => {
  it('keeps at most fifty three-signal pages, with the newest signals first', () => {
    const oldest = Array.from({ length: MAX_SIGNAL_CAPACITY }, (_, index) => ({ ...signal(index), publishedAt: new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString() }));
    const incoming = Array.from({ length: SIGNAL_PAGE_SIZE }, (_, index) => ({ ...signal(200 + index), publishedAt: `2026-08-${String(18 + index).padStart(2, '0')}T08:00:00+08:00` }));

    const retained = retainNewestSignals([...oldest, ...incoming]);

    expect(retained).toHaveLength(MAX_SIGNAL_CAPACITY);
    expect(retained.slice(0, SIGNAL_PAGE_SIZE).map((item) => item.id)).toEqual(['signal-202', 'signal-201', 'signal-200']);
    expect(retained.map((item) => item.id)).not.toContain('signal-0');
  });
});
