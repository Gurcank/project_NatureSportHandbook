'use client';

import AnimalCategoryHandbook from '@/components/AnimalCategoryHandbook';
import { fish } from '@/data/fish';

export default function FishHandbook() {
  return <AnimalCategoryHandbook items={fish} />;
}
