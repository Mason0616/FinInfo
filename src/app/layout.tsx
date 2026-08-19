import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEON / 投研工作台',
  description: '基金投研工作台 MVP',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
