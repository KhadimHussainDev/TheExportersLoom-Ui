// API Base URL
export const API_BASE_URL = 'http://192.168.43.186:3000';

// Project Status Constants
export const PROJECT_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  POSTED: 'Posted',
  DRAFT: 'Draft',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
};

// Cutting Style Constants
export const CUTTING_STYLE = {
  REGULAR: 'regular',
  SUBLIMATION: 'sublimation'
};

// Storage Keys
export const STORAGE_KEYS = {
  PRODUCT_CONFIGURATIONS: 'product_configurations',
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data'
};

// API Endpoints
export const API_ENDPOINTS = {
  PROJECTS: '/projects',
  PRODUCT_CONFIGURATIONS: '/product-configurations',
  SUB_CATEGORIES: '/sub-categories',
  AUTH: '/auth'
};

// User Roles
export const ROLES = {
  MANUFACTURER: 'Manufacturer',
  EXPORTER: 'Exporter'
}; 

// Hardcoded sizes
export const SIZES = [
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
];

// Logo numbers array (0-5)
export const LOGO_NUMBERS = Array.from({ length: 6 }, (_, i) => ({
  label: i.toString(),
  value: i.toString()
}));

