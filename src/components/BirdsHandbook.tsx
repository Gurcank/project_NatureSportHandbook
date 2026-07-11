'use client';

import AnimalCategoryHandbook from '@/components/AnimalCategoryHandbook';
import { birds } from '@/data/birds';

export default function BirdsHandbook() {
  return <AnimalCategoryHandbook items={birds} />;
}
