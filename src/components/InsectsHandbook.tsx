'use client';

import AnimalCategoryHandbook from '@/components/AnimalCategoryHandbook';
import { insects } from '@/data/insects';

export default function InsectsHandbook() {
  return <AnimalCategoryHandbook items={insects} />;
}
