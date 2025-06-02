import { API_ENDPOINTS } from '../utils/contants/constants';
import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/contants/constants';

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
      const response = await apiClient.post('/bid', bidData);
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
  },

  /**
   * Get bid by moduleId and moduleType
   * @param {number} moduleId - The ID of the module
   * @param {string} moduleType - The type of the module
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getBidByModuleId: async (moduleId, moduleType) => {
    try {
      const response = await apiClient.get(`/bid/module/${moduleId}?moduleType=${moduleType}`);
      return response.data;
    } catch (error) {
      console.error('Error getting bid by moduleId:', error);
      // If the error is 404, return a formatted response
      if (error.response?.status === 404) {
        return {
          success: false,
          statusCode: 404,
          message: 'No bid found for this module',
          data: null
        };
      }
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to get bid',
        error: error.toString()
      };
    }
  },

  /**
   * Edit an existing bid
   * @param {number} bidId - The ID of the bid to edit
   * @param {object} bidData - The updated bid data (title, description, price)
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  editBid: async (bidId, bidData) => {
    try {
      console.log(bidData);
      const response = await apiClient.put(`/bid/${bidId}`, bidData);
      return response.data;
    } catch (error) {
      console.error('Error editing bid:', error.response?.data);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to edit bid',
        error: error.toString()
      };
    }
  },

  /**
   * Get recommended bids for the current manufacturer based on machine types
   * @returns {Promise<Object>} Response with status and data
   */
  async getRecommendedBids() {
    try {
      console.log('🔍 Getting recommended bids...');
      
      // Check for authentication
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        console.error('❌ Authentication required for fetching recommended bids');
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }
      console.log('✅ Authentication token found');

      // Get user data
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (!userData) {
        console.error('❌ User data not found');
        return {
          success: false,
          statusCode: 400,
          message: 'User data not found',
          error: 'User data required to fetch recommended bids'
        };
      }

      const user = JSON.parse(userData);
      console.log(`🧑‍💼 Fetching recommended bids for manufacturer: ${user.user_id}`);
      
      // Call the API endpoint to get recommended bids with additional logging
      console.log('🌐 Sending request to /recommend-bids endpoint...');
      
      try {
        // First, attempt to use the optimized endpoint that uses MODULE_TO_MACHINE_MAP on the backend
        const response = await apiClient.get('/recommend-bids', { 
          timeout: 30000, // 30 seconds timeout for this specific request
          headers: {
            'Authorization': `Bearer ${token}` // Explicitly add token to ensure it's included
          }
        });
        
        console.log('📊 Recommended bids API response status:', response.status);
        console.log('📊 Found bids:', response.data?.data?.length || 0);
        
        if (!response.data) {
          throw new Error('Empty response received from API');
        }
        
        return {
          success: response.data.statusCode === 200,
          statusCode: response.data.statusCode,
          message: response.data.message,
          data: response.data.data || [] // Ensure we always return at least an empty array
        };
      } catch (endpointError) {
        console.error('❌ Primary endpoint failed, trying fallback:', endpointError);
        
        // Fallback: If the optimized endpoint fails, try a more generic endpoint
        // This is a safety mechanism in case the backend implementation has issues
        const fallbackResponse = await apiClient.get('/bids/active', {
          timeout: 30000,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('📊 Fallback response status:', fallbackResponse.status);
        console.log('📊 Found bids (fallback):', fallbackResponse.data?.data?.length || 0);
        
        if (!fallbackResponse.data) {
          throw new Error('Empty response received from fallback API');
        }
        
        // Use the data from the fallback response
        return {
          success: fallbackResponse.data.statusCode === 200,
          statusCode: fallbackResponse.data.statusCode,
          message: 'Retrieved active bids (fallback method)',
          data: fallbackResponse.data.data || []
        };
      }
    } catch (error) {
      console.error('❌ Error fetching recommended bids:', error);
      // Check for specific error types to provide better error messages
      if (error.code === 'ECONNABORTED') {
        console.error('❌ Request timeout. The server took too long to respond.');
        return {
          success: false,
          statusCode: 408,
          message: 'Request timeout. Please try again later.',
          error: error.toString()
        };
      }
      
      if (!error.response) {
        console.error('❌ Network error. No response received.');
        return {
          success: false,
          statusCode: 0,
          message: 'Network error. Please check your connection.',
          error: error.toString()
        };
      }
      
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to fetch recommended bids',
        error: error.toString(),
        details: error.response?.data || 'No additional details available'
      };
    }
  },

  /**
   * Submit a bid response (accept or reject a bid)
   * @param {Object} bidResponseData - Bid response data
   * @returns {Promise<Object>} Response with status and data
   */
  async respondToBid(bidResponseData) {
    try {
      // Check for authentication
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }

      console.log('Submitting bid response:', bidResponseData);
      
      // Call the API endpoint to respond to a bid
      const response = await apiClient.post('/bid-responses', bidResponseData);
      
      return {
        success: response.data.statusCode === 201,
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error responding to bid:', error);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to respond to bid',
        error: error.toString()
      };
    }
  }
}; 