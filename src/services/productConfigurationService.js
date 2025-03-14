import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { storageService } from './storageService';

export const productConfigurationService = {
  // Fetch all product configuration data
  async fetchAllProductConfigurations() {
    try {
      const [productTypes, printingMethods, logoPositions] = await Promise.all([
        this.getProductTypes(),
        this.getPrintingMethods(),
        this.getLogoPositions()
      ]);

      return {
        productTypes,
        categories: [], // Categories will be fetched when product type is selected
        printingMethods,
        logoPositions
      };
    } catch (error) {
      console.error('Error fetching product configurations:', error);
      throw error;
    }
  },

  // API calls
  async getProductTypes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/product-configuration/product-types`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product types:', error);
      throw error;
    }
  },

  async getCategories(shirtType) {
    if (!shirtType) {
      return [];
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/product-configuration/categories?shirtType=${encodeURIComponent(shirtType)}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getSubcategories(category) {
    try {
      const response = await axios.get(`${API_BASE_URL}/product-configuration/subcategories?category=${encodeURIComponent(category)}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  },

  async getPrintingMethods() {
    try {
      const response = await axios.get(`${API_BASE_URL}/product-configuration/printing-methods`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching printing methods:', error);
      throw error;
    }
  },

  async getLogoPositions() {
    try {
      const response = await axios.get(`${API_BASE_URL}/product-configuration/logo-positions`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching logo positions:', error);
      throw error;
    }
  },

  // Storage operations using storageService
  async saveToStorage(key, data) {
    return await storageService.save(key, data);
  },

  async getFromStorage(key) {
    return await storageService.get(key);
  },

  async clearStorage() {
    return await storageService.clearAll();
  }
}; 