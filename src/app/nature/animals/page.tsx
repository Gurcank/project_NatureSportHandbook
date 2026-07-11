import type { Metadata } from 'next';
import AnimalsHandbook from '@/components/AnimalsHandbook';

export const metadata: Metadata = {
  title: 'Animals | Nature & Sport Handbook',
  description: 'Browse animal categories: mammals, birds, reptiles, fish, amphibians, and insects.',
};

export default function AnimalsPage() {
  return <AnimalsHandbook />;
}
