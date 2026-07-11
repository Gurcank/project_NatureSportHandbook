import type { Metadata } from 'next';
import FishHandbook from '@/components/FishHandbook';

export const metadata: Metadata = {
  title: 'Fish | Nature & Sport Handbook',
  description: 'Field notes on fish species: names, habitats, diet, and descriptions.',
};

export default function FishPage() {
  return <FishHandbook />;
}
