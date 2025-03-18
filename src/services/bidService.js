import { API_ENDPOINTS } from '../utils/contants/constants';
import apiClient from './apiClient';

/**
 * Bid service for handling bid-related API operations
 */
export const bidService = {
  /**
   * Create a new bid
   * @param {Object} bidData - Bid data including moduleId, title, description, price, and moduleType
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  createBid: async (bidData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BIDS, bidData);
      return response.data;
    } catch (error) {
      console.error('Error creating bid:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to create bid',
        error: error.toString()
      };
    }
  },

  /**
   * Post a module as a bid (legacy method - use createBid instead)
   * @deprecated Use createBid instead
   * @param {string} moduleType - The type of module (e.g., 'CuttingModule', 'StitchingModule')
   * @param {number} moduleId - The ID of the module to post
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  postModuleAsBid: async (moduleType, moduleId, title, description, price) => {
    try {
      // Create bid directly using the new endpoint
      return await bidService.createBid({
        moduleId,
        title: title || `New ${moduleType} Bid`,
        description: description || `Bid for ${moduleType} with ID ${moduleId}`,
        price: price || 0,
        moduleType
      });
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
  },

  /**
   * Create a response to a bid
   * @param {Object} bidResponseData - Bid response data including bid_id, price, message, machineId, and deadline
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  createBidResponse: async (bidResponseData) => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.BIDS}/responses`, bidResponseData);
      return response.data;
    } catch (error) {
      console.error('Error creating bid response:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to create bid response',
        error: error.toString()
      };
    }
  },

  /**
   * Get all responses for a bid
   * @param {number|string} bidId - The ID of the bid
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getBidResponses: async (bidId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BIDS}/${bidId}/responses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bid responses:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch bid responses',
        error: error.toString()
      };
    }
  },

  /**
   * Get all bid responses submitted by the current user (manufacturer)
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getMyBidResponses: async () => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BIDS}/responses/my-responses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching my bid responses:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch my bid responses',
        error: error.toString()
      };
    }
  },

  /**
   * Update a bid response
   * @param {number|string} responseId - The ID of the response to update
   * @param {Object} updateData - The data to update (price, message)
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  updateBidResponse: async (responseId, updateData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.BIDS}/responses/${responseId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating bid response:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to update bid response',
        error: error.toString()
      };
    }
  },

  /**
   * Accept a bid response (by the exporter)
   * @param {number|string} responseId - The ID of the response to accept
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  acceptBidResponse: async (responseId) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.BIDS}/responses/${responseId}/accept`);
      return response.data;
    } catch (error) {
      console.error('Error accepting bid response:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to accept bid response',
        error: error.toString()
      };
    }
  },

  /**
   * Reject a bid response (by the exporter)
   * @param {number|string} responseId - The ID of the response to reject
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  rejectBidResponse: async (responseId) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.BIDS}/responses/${responseId}/reject`);
      return response.data;
    } catch (error) {
      console.error('Error rejecting bid response:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to reject bid response',
        error: error.toString()
      };
    }
  },

  /**
   * Get a bid with its responses
   * @param {number|string} bidId - The ID of the bid
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getBidWithResponses: async (bidId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.BIDS}/${bidId}/with-responses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bid with responses:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch bid with responses',
        error: error.toString()
      };
    }
  }
}; 