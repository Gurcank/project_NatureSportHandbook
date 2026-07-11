import type { Metadata } from 'next';
import MammalsHandbook from '@/components/MammalsHandbook';

export const metadata: Metadata = {
  title: 'Mammals | Nature & Sport Handbook',
  description: 'Field notes on 72 mammal species: names, habitats, diet, and descriptions.',
};

export default function MammalsPage() {
  return <MammalsHandbook />;
}
