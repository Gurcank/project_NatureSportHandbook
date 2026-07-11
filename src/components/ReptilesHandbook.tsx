'use client';

import AnimalCategoryHandbook from '@/components/AnimalCategoryHandbook';
import { reptiles } from '@/data/reptiles';

export default function ReptilesHandbook() {
  return <AnimalCategoryHandbook items={reptiles} />;
}
