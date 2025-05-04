export interface CatImage {
  id?: string;
  url: string;
  width?: number;
  height?: number;
}

export interface CatWeight {
  imperial?: string;
  metric?: string;
}

export interface CatBreed {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
  life_span: string;
  intelligence: number;
  image?: CatImage;
  weight?: CatWeight;
  adaptability?: number;
  affection_level?: number;
  energy_level?: number;
  child_friendly?: number;
}

export interface CatSearchParams {
  query: string;
  limit?: number;
}
