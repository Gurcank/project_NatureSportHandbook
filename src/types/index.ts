export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  climate: string[];
  region: string[];
  type: string;
  height?: string;
  blooming?: string;
}

export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  climate: string[];
  region: string[];
  type: string;
  diet?: string;
  habitat?: string;
}

export interface Stone {
  id: string;
  name: string;
  description: string;
  image: string;
  climate: string[];
  region: string[];
  type: string;
  hardness?: string;
  color?: string;
}

export interface Route {
  id: string;
  name: string;
  difficulty: string;
  distance: string;
  duration: string;
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
}
