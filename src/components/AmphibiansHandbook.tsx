'use client';

import AnimalCategoryHandbook from '@/components/AnimalCategoryHandbook';
import { amphibians } from '@/data/amphibians';

export default function AmphibiansHandbook() {
  return <AnimalCategoryHandbook items={amphibians} />;
}
