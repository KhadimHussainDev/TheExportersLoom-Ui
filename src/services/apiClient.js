import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { STORAGE_KEYS } from '../utils/contants/constants';
import { storageService } from './storageService';
import { API_URL } from '../config/config';

// Configure axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Add a request interceptor to include the authentication token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get the token from storage
      const tokenResponse = await storageService.get(STORAGE_KEYS.USER_TOKEN);
      const token = tokenResponse.data;

      // If token exists, add it to the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No authentication token found. Request will be unauthenticated.');
      }

      console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
      return config;
    } catch (error) {
      console.error('Error adding auth token to request:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
apiClient.interceptors.response.use(
  response => {
    console.log(`API Response: ${response.status} for ${response.config.url}`);
    return response;
  },
  async error => {
    if (error.response) {
      const { status, config } = error.response;
      console.error(`API Error: ${status} for ${config.url}`, error.response.data);

      if (status === 401) {
        console.error('Authentication failed. Token might be invalid or expired.');
        // You could redirect to login or refresh token here
      }

      // Add friendly error message for common status codes
      switch (status) {
        case 400:
          console.error('Bad request. Please check your input data.');
          break;
        case 403:
          console.error('Access forbidden. You do not have permission for this action.');
          break;
        case 404:
          console.error('Resource not found.');
          break;
        case 500:
          console.error('Server error. Please try again later.');
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to manually set auth token (can be used in login flows)
apiClient.setAuthToken = async (token) => {
  try {
    if (token) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
      console.log('Auth token saved successfully.');
    } else {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
      console.log('Auth token removed.');
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export default apiClient; 