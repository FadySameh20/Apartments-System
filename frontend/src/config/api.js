const API_CONFIG = {
  BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001/api',
  
  // Specific endpoint URLs
  ENDPOINTS: {
    APARTMENTS: {
      CREATE: process.env.NEXT_PUBLIC_APARTMENTS_CREATE_URL || 'http://localhost:3000/api/apartments'
    }
  }
};

export default API_CONFIG; 