import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/contants/constants';

/**
 * Storage service for handling AsyncStorage operations
 * Provides standardized response format matching other services
 */
export const storageService = {
  /**
   * Save data to AsyncStorage
   * @param {string} key - The key to store the data under
   * @param {any} data - The data to store
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  async save(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return {
        success: true,
        statusCode: 200,
        message: 'Data saved successfully',
        data: data
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
   * Retrieve data from AsyncStorage
   * @param {string} key - The key to retrieve the data from
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  async get(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      const parsedData = data ? JSON.parse(data) : null;
      return {
        success: true,
        statusCode: 200,
        message: parsedData ? 'Data retrieved successfully' : 'No data found',
        data: parsedData
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
   * Remove data from AsyncStorage
   * @param {string} key - The key to remove
   * @returns {Promise<object>} - Standard API response with success, statusCode, message properties
   */
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return {
        success: true,
        statusCode: 200,
        message: 'Data removed successfully'
      };
    } catch (error) {
      console.error('Error removing from storage:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to remove data',
        error: error.toString()
      };
    }
  },

  /**
   * Clear all storage keys defined in STORAGE_KEYS
   * @returns {Promise<object>} - Standard API response with success, statusCode, message properties
   */
  async clearAll() {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
      return {
        success: true,
        statusCode: 200,
        message: 'All data cleared successfully'
      };
    } catch (error) {
      console.error('Error clearing storage:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to clear data',
        error: error.toString()
      };
    }
  },

  /**
   * Get multiple items from storage
   * @param {string[]} keys - Array of keys to retrieve
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  async getMultiple(keys) {
    try {
      const values = await AsyncStorage.multiGet(keys);
      const result = values.reduce((acc, [key, value]) => {
        acc[key] = value ? JSON.parse(value) : null;
        return acc;
      }, {});

      return {
        success: true,
        statusCode: 200,
        message: 'Multiple items retrieved successfully',
        data: result
      };
    } catch (error) {
      console.error('Error getting multiple from storage:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to retrieve multiple items',
        error: error.toString()
      };
    }
  },

  /**
   * Save multiple items to storage
   * @param {Object} keyValuePairs - Object containing key-value pairs to save
   * @returns {Promise<object>} - Standard API response with success, statusCode, message properties
   */
  async saveMultiple(keyValuePairs) {
    try {
      const entries = Object.entries(keyValuePairs).map(([key, value]) => [
        key,
        JSON.stringify(value)
      ]);
      await AsyncStorage.multiSet(entries);

      return {
        success: true,
        statusCode: 200,
        message: 'Multiple items saved successfully',
        data: keyValuePairs
      };
    } catch (error) {
      console.error('Error saving multiple to storage:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to save multiple items',
        error: error.toString()
      };
    }
  }
}; 