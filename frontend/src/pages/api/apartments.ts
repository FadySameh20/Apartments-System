import api from './axios';
import { Apartment } from '../types';

export const getApartments = async (): Promise<Apartment[]> => {
  const response = await api.get('/apartments');
  return response.data;
};

export const getApartment = async (id: number): Promise<Apartment> => {
  const response = await api.get(`/apartments/${id}`);
  return response.data;
}; 