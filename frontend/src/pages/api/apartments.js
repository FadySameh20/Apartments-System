import api from './axios';

export const getApartments = async () => {
  const response = await api.get('/apartments');
  return response.data;
};

export const getApartment = async (id) => {
  const response = await api.get(`/apartments/${id}`);
  return response.data;
}; 