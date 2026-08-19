import type { Signal } from './domain';

export const SIGNAL_PAGE_SIZE = 3;
export const MAX_SIGNAL_PAGES = 50;
export const MAX_SIGNAL_CAPACITY = SIGNAL_PAGE_SIZE * MAX_SIGNAL_PAGES;

export function retainNewestSignals(signals: Signal[]): Signal[] {
  return [...signals]
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
    .slice(0, MAX_SIGNAL_CAPACITY);
}
