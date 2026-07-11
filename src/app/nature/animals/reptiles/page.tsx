import type { Metadata } from 'next';
import ReptilesHandbook from '@/components/ReptilesHandbook';

export const metadata: Metadata = {
  title: 'Reptiles | Nature & Sport Handbook',
  description: 'Field notes on reptile species: names, habitats, diet, and descriptions.',
};

export default function ReptilesPage() {
  return <ReptilesHandbook />;
}
