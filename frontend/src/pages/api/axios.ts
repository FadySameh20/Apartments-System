import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust this to match your backend URL
});

export default api; 