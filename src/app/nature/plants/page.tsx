import type { Metadata } from 'next';
import PlantsHandbook from '@/components/PlantsHandbook';

export const metadata: Metadata = {
  title: 'Plants | Nature & Sport Handbook',
  description: 'Browse plant categories with field notes on climate, region, and type.',
};

export default function PlantsPage() {
  return <PlantsHandbook />;
}
