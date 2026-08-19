import { describe, expect, it } from 'vitest';
import { formatSignalCount } from '@/lib/presentation';

describe('formatSignalCount', () => {
  it('pads dashboard signal counts to two digits', () => {
    expect(formatSignalCount(6)).toBe('06 条信号');
  });
});
