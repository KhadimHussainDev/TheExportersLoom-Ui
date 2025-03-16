import { API_ENDPOINTS } from '../utils/contants/constants';
import apiClient from './apiClient';

/**
 * Bid service for handling bid-related API operations
 */
export const bidService = {
  /**
   * Post a module as a bid by updating its status to "Posted"
   * @param {string} moduleType - The type of module (e.g., 'CuttingModule', 'StitchingModule')
   * @param {number} moduleId - The ID of the module to post
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  postModuleAsBid: async (moduleType, moduleId) => {
    try {
      // Determine the endpoint based on module type
      let endpoint;
      switch (moduleType) {
        case 'CuttingModule':
          endpoint = `${API_ENDPOINTS.CUTTING}/${moduleId}/status`;
          break;
        case 'StitchingModule':
          endpoint = `${API_ENDPOINTS.STITCHING}/${moduleId}/status`;
          break;
        case 'LogoPrintingModule':
          endpoint = `${API_ENDPOINTS.LOGO_PRINTING}/${moduleId}/status`;
          break;
        case 'FabricPricingModule':
          endpoint = `${API_ENDPOINTS.FABRIC_PRICING}/${moduleId}/status`;
          break;
        case 'PackagingModule':
          endpoint = `${API_ENDPOINTS.PACKAGING}/${moduleId}/status`;
          break;
        default:
          throw new Error(`Unsupported module type: ${moduleType}`);
      }

      // Update the module status to "Posted"
      const response = await apiClient.put(endpoint, { newStatus: 'Posted' });
      return response.data;
    } catch (error) {
      console.error('Error posting module as bid:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to post module as bid',
        error: error.toString()
      };
    }
  },

  /**
   * Get all bids
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getAllBids: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BIDS);
      return response.data;
    } catch (error) {
      console.error('Error fetching bids:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch bids',
        error: error.toString()
      };
    }
  },

  /**
   * Get a bid by ID
   * @param {number|string} bidId - The ID of the bid to retrieve
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getBidById: async (bidId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BIDS}/${bidId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bid:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch bid',
        error: error.toString()
      };
    }
  },

  /**
   * Get bids for a specific user
   * @param {number} userId - User ID
   * @returns {Promise<object>} - Standard API response with user bids data
   */
  getUserBids: async (userId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BIDS}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bids for user ${userId}:`, error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch user bids',
        error: error.toString()
      };
    }
  },

  /**
   * Deactivate a bid
   * @param {number|string} bidId - The ID of the bid to deactivate
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  deactivateBid: async (bidId) => {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.BIDS}/${bidId}/deactivate`);
      return response.data;
    } catch (error) {
      console.error('Error deactivating bid:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to deactivate bid',
        error: error.toString()
      };
    }
  }
}; 