import { Stone } from '@/types';

export const stones: Stone[] = [
  {
    id: 'granite-1',
    name: 'Granite',
    description: 'An igneous plutonic rock composed of quartz, feldspar, and mica. One of the most common and useful rocks, forming the base of continental crust. Highly valued for construction and decoration.',
    image: 'https://images.unsplash.com/photo-1515562141207-5daa835b8dff?w=500&h=500&fit=crop',
    climate: ['All climates'],
    region: ['Worldwide'],
    type: 'Igneous Rock',
    hardness: '6-7 Mohs',
    color: 'Gray, pink, white'
  },
  {
    id: 'marble-1',
    name: 'Marble',
    description: 'A metamorphic rock composed of recrystallized carbonate minerals. Prized for sculpture and architecture since ancient times. Forms from limestone under heat and pressure.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&h=500&fit=crop',
    climate: ['All climates'],
    region: ['Worldwide'],
    type: 'Metamorphic Rock',
    hardness: '3-4 Mohs',
    color: 'White, gray, black, pink'
  },
  {
    id: 'amethyst-1',
    name: 'Amethyst',
    description: 'A purple variety of quartz, commonly used in jewelry and valued as a semi-precious gemstone. Found in geodes and crystal clusters. Associated with calmness and spirituality.',
    image: 'https://images.unsplash.com/photo-1585393859097-76efb1d68e7f?w=500&h=500&fit=crop',
    climate: ['Temperate'],
    region: ['Brazil', 'Uruguay', 'Europe', 'Asia'],
    type: 'Mineral/Gemstone',
    hardness: '7 Mohs',
    color: 'Purple, violet'
  }
];
