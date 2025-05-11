interface CreateApartmentDTO {
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
}
