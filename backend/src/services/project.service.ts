import prisma from '../prisma/client';

export const getAllProjects = async () => {
  return await prisma.project.findMany();
};
