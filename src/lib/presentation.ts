export function formatSignalCount(count: number): string {
  return `${String(count).padStart(2, '0')} 条信号`;
}
