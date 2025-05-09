export interface Apartment {
  id: number;
  unitName: string;
  unitNumber: string;
  description?: string;
  price: number;
  area: number;
  bedroomsCount: number;
  bathroomsCount: number;
  floor: number;
  isFinished: boolean;
  images: string[];
  projectId: number;
  project?: Project;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  name: string;
  location?: string;
  developerId: number;
  developer?: Developer;
  createdAt: string;
  updatedAt: string;
}

export interface Developer {
  id: number;
  name: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
} 