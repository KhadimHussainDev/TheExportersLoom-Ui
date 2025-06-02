// Configuration for API endpoints and other environment variables
import { API_BASE_URL } from '../utils/contants/constants';

// Use the API_BASE_URL from constants to ensure consistency across the app
export const API_URL = API_BASE_URL;

// Development API URL backup in case constants are not available
// const DEV_API_URL = "http://10.0.2.2:5000/api"; // For Android emulator
// const DEV_API_URL = "http://localhost:5000/api"; // For web or iOS simulator

// Production API URL
// const PROD_API_URL = "https://your-production-api.com/api";

// Use different API URLs based on environment
// export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

console.log('API URL configured as:', API_URL);

// Other configuration settings
export const APP_CONFIG = {
  imageUploadLimit: 5, // Maximum number of images that can be uploaded
  defaultTimeout: 10000, // Default timeout for API requests in milliseconds
  maxFileSize: 5 * 1024 * 1024, // Maximum file size for uploads (5MB)
};

// Export additional configuration as needed
export default {
  API_URL,
  APP_CONFIG,
}; 