import api from "./axios";

export const getApartments = async (params = {}) => {
  const response = await api.get('/apartments', { params });
  return response.data;
};

export const getApartment = async (id) => {
  const response = await api.get(`/apartments/${id}`);
  return response.data;
};

export const createApartment = async (formData) => {
  await api.post(
    '/apartments', 
    formData
  );
}
