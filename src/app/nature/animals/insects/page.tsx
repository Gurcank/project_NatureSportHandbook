import type { Metadata } from 'next';
import InsectsHandbook from '@/components/InsectsHandbook';

export const metadata: Metadata = {
  title: 'Insects | Nature & Sport Handbook',
  description: 'Field notes on insect species: names, habitats, diet, and descriptions.',
};

export default function InsectsPage() {
  return <InsectsHandbook />;
}
