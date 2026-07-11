import type { Metadata } from 'next';
import BirdsHandbook from '@/components/BirdsHandbook';

export const metadata: Metadata = {
  title: 'Birds | Nature & Sport Handbook',
  description: 'Field notes on bird species: names, habitats, diet, and descriptions.',
};

export default function BirdsPage() {
  return <BirdsHandbook />;
}
