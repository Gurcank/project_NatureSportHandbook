import type { Metadata } from 'next';
import AmphibiansHandbook from '@/components/AmphibiansHandbook';

export const metadata: Metadata = {
  title: 'Amphibians | Nature & Sport Handbook',
  description: 'Field notes on amphibian species: names, habitats, diet, and descriptions.',
};

export default function AmphibiansPage() {
  return <AmphibiansHandbook />;
}
