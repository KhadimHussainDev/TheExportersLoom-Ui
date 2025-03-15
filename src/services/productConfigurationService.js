import apiClient from './apiClient';
import { storageService } from './storageService';

/**
 * Product Configuration Service
 * Handles fetching and managing product configuration data
 */
export const productConfigurationService = {
  /**
   * Fetch all product configuration data in a single call
   * @returns {Promise<object>} - Object containing all product configuration data
   */
  async fetchAllProductConfigurations() {
    try {
      const [productTypes, printingMethods, logoPositions] = await Promise.all([
        this.getProductTypes(),
        this.getPrintingMethods(),
        this.getLogoPositions()
      ]);

      return {
        success: true,
        statusCode: 200,
        message: 'Product configurations fetched successfully',
        data: {
          productTypes: productTypes.data || [],
          categories: [], // Categories will be fetched when product type is selected
          printingMethods: printingMethods.data || [],
          logoPositions: logoPositions.data || []
        }
      };
    } catch (error) {
      console.error('Error fetching product configurations:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch product configurations',
        error: error.toString()
      };
    }
  },

  /**
   * Get all product types
   * @returns {Promise<object>} - Standard API response with product types data
   */
  async getProductTypes() {
    try {
      const response = await apiClient.get('/product-configuration/product-types');
      return response.data;
    } catch (error) {
      console.error('Error fetching product types:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch product types',
        error: error.toString()
      };
    }
  },

  /**
   * Get categories for a specific shirt type
   * @param {string} shirtType - The type of shirt to get categories for
   * @returns {Promise<object>} - Standard API response with categories data
   */
  async getCategories(shirtType) {
    if (!shirtType) {
      return {
        success: true,
        statusCode: 200,
        message: 'No shirt type provided',
        data: []
      };
    }

    try {
      const response = await apiClient.get(`/product-configuration/categories?shirtType=${encodeURIComponent(shirtType)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch categories',
        error: error.toString()
      };
    }
  },

  /**
   * Get subcategories for a specific category
   * @param {string} category - The category to get subcategories for
   * @returns {Promise<object>} - Standard API response with subcategories data
   */
  async getSubcategories(category) {
    try {
      const response = await apiClient.get(`/product-configuration/subcategories?category=${encodeURIComponent(category)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch subcategories',
        error: error.toString()
      };
    }
  },

  /**
   * Get all printing methods
   * @returns {Promise<object>} - Standard API response with printing methods data
   */
  async getPrintingMethods() {
    try {
      const response = await apiClient.get('/product-configuration/printing-methods');
      return response.data;
    } catch (error) {
      console.error('Error fetching printing methods:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch printing methods',
        error: error.toString()
      };
    }
  },

  /**
   * Get all logo positions
   * @returns {Promise<object>} - Standard API response with logo positions data
   */
  async getLogoPositions() {
    try {
      const response = await apiClient.get('/product-configuration/logo-positions');
      return response.data;
    } catch (error) {
      console.error('Error fetching logo positions:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch logo positions',
        error: error.toString()
      };
    }
  },

  /**
   * Save data to storage
   * @param {string} key - Storage key
   * @param {any} data - Data to store
   * @returns {Promise<boolean>} - Success status
   */
  async saveToStorage(key, data) {
    try {
      const result = await storageService.save(key, data);
      return {
        success: result,
        statusCode: result ? 200 : 500,
        message: result ? 'Data saved successfully' : 'Failed to save data'
      };
    } catch (error) {
      console.error('Error saving to storage:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to save data',
        error: error.toString()
      };
    }
  },

  /**
   * Get data from storage
   * @param {string} key - Storage key
   * @returns {Promise<any>} - Retrieved data
   */
  async getFromStorage(key) {
    try {
      const data = await storageService.get(key);
      return {
        success: true,
        statusCode: 200,
        message: data ? 'Data retrieved successfully' : 'No data found',
        data
      };
    } catch (error) {
      console.error('Error getting from storage:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to retrieve data',
        error: error.toString()
      };
    }
  },

  /**
   * Clear all storage
   * @returns {Promise<boolean>} - Success status
   */
  async clearStorage() {
    try {
      const result = await storageService.clearAll();
      return {
        success: result,
        statusCode: result ? 200 : 500,
        message: result ? 'Storage cleared successfully' : 'Failed to clear storage'
      };
    } catch (error) {
      console.error('Error clearing storage:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to clear storage',
        error: error.toString()
      };
    }
  }
}; 