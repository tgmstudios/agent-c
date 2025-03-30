import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // TODO: Add any request interceptors (e.g., adding authentication tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // TODO: Handle common error responses (e.g., unauthorized, server errors)
    return Promise.reject(error);
  }
);

export default api;
