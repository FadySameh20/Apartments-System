import prisma from '../prisma/client';
import { PaginationDTO, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../dto/pagination.dto';
import { ApartmentFilterDTO } from '../dto/apartment_filter.dto';
import { CreateApartmentDTO } from '../dto/create_apartment.dto';

export const getAllApartments = async (
  pagination: PaginationDTO = { page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE },
  filters: ApartmentFilterDTO = {}
) => {
  const { page, pageSize } = pagination;
  const skip = (page - 1) * pageSize;
  
  // Build filter conditions
  const where: any = {};
  
  if (filters.unitNumber) {
    where.unitNumber = { contains: filters.unitNumber };
  }
  
  if (filters.unitName) {
    where.unitName = { contains: filters.unitName };
  }
  
  if (filters.projectId) {
    where.projectId = parseInt(filters.projectId);
  }
  
  // Get total count for pagination
  const totalCount = await prisma.apartment.count({ where });
  
  // Get paginated results
  const apartments = await prisma.apartment.findMany({
    skip,
    take: pageSize,
    where,
    include: {
      project: {
        include: {
          developer: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc' // Most recent first
    }
  });
  
  return {
    data: apartments,
    meta: {
      currentPage: page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize)
    }
  };
};

export const getApartmentById = async (id: number) => {
  return await prisma.apartment.findUnique({
    where: { id },
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
