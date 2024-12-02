import axios from 'axios';
import { API_URL } from './apiConstants';

// Create an axios instance to configure globally
const axiosInstance = axios.create({
  baseURL: API_URL, // Base URL for requests
  withCredentials: true,
});

// Add a request interceptor to include the token in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or invalidation
axiosInstance.interceptors.response.use(
  response => response, // Just return the response if it's successful
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token might be expired or invalid, clear localStorage and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
