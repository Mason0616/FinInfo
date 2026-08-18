import { formatSignalCount } from '@/lib/presentation';

export default function Home() {
  return (
    <main className="baseline-page">
      <p className="baseline-kicker">NEON / RESEARCH OS</p>
      <h1>投研工作台正在迁移</h1>
      <p>Next.js 基座已经启动，当前保留 {formatSignalCount(6)} 演示信号。</p>
    </main>
  );
}
