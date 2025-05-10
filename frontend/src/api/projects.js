import api from "./axios";

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};
