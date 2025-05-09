import prisma from '../prisma/client';

export const getAllApartments = async () => {
  return await prisma.apartment.findMany({
    include: {
      project: {
        include: {
          developer: true
        }
      }
    }
  });
};

export const createApartment = async (data: CreateApartmentDTO) => {
  return await prisma.apartment.create({ data });
};
