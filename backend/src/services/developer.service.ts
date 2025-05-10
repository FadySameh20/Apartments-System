import prisma from '../prisma/client';

export const getAllDeveloeprs = async () => {
  return await prisma.developer.findMany();
};
