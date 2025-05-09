import prisma from '../prisma/client';

export const createApartment = async (data: CreateApartmentDTO) => {
  return await prisma.apartment.create({ data });
};
