import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

export const storageService = {
  /**
   * Save data to AsyncStorage
   * @param {string} key - The key to store the data under
   * @param {any} data - The data to store
   * @returns {Promise<boolean>} - Success status
   */
  async save(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to storage:', error);
      return false;
    }
  },

  /**
   * Retrieve data from AsyncStorage
   * @param {string} key - The key to retrieve the data from
   * @returns {Promise<any>} - The stored data or null if not found
   */
  async get(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  },

  /**
   * Remove data from AsyncStorage
   * @param {string} key - The key to remove
   * @returns {Promise<boolean>} - Success status
   */
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from storage:', error);
      return false;
    }
  },

  /**
   * Clear all storage keys defined in STORAGE_KEYS
   * @returns {Promise<boolean>} - Success status
   */
  async clearAll() {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  /**
   * Get multiple items from storage
   * @param {string[]} keys - Array of keys to retrieve
   * @returns {Promise<Object>} - Object containing key-value pairs
   */
  async getMultiple(keys) {
    try {
      const values = await AsyncStorage.multiGet(keys);
      return values.reduce((acc, [key, value]) => {
        acc[key] = value ? JSON.parse(value) : null;
        return acc;
      }, {});
    } catch (error) {
      console.error('Error getting multiple from storage:', error);
      return {};
    }
  },

  /**
   * Save multiple items to storage
   * @param {Object} keyValuePairs - Object containing key-value pairs to save
   * @returns {Promise<boolean>} - Success status
   */
  async saveMultiple(keyValuePairs) {
    try {
      const entries = Object.entries(keyValuePairs).map(([key, value]) => [
        key,
        JSON.stringify(value)
      ]);
      await AsyncStorage.multiSet(entries);
      return true;
    } catch (error) {
      console.error('Error saving multiple to storage:', error);
      return false;
    }
  }
}; 