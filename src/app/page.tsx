import { Dashboard } from '@/components/dashboard/dashboard';
import { demoSignals } from '@/lib/demo-signals';

export default function Home() {
  return <Dashboard initialSignals={demoSignals} />;
}
