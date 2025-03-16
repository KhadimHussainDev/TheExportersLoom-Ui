import apiClient from './apiClient';

/**
 * Order service for handling order-related API operations
 */
export const orderService = {
  /**
   * Get all orders
   * @returns {Promise<object>} - Standard API response with orders data
   */
  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch orders',
        error: error.toString()
      };
    }
  },

  /**
   * Get orders for a specific user
   * @param {number} userId - User ID
   * @returns {Promise<object>} - Standard API response with user orders data
   */
  getUserOrders: async (userId) => {
    try {
      const response = await apiClient.get(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch user orders',
        error: error.toString()
      };
    }
  },

  /**
   * Get order by ID
   * @param {number} orderId - Order ID
   * @returns {Promise<object>} - Standard API response with order data
   */
  getOrderById: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch order',
        error: error.toString()
      };
    }
  },

  /**
   * Get order statistics summary
   * @returns {Promise<object>} - Standard API response with order statistics
   */
  getOrderStatistics: async () => {
    try {
      const response = await apiClient.get('/orders/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching order statistics:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch order statistics',
        error: error.toString()
      };
    }
  },

  /**
   * Get order statistics for a specific user
   * @param {number} userId - User ID
   * @returns {Promise<object>} - Standard API response with user order statistics
   */
  getUserOrderStatistics: async (userId) => {
    try {
      const response = await apiClient.get(`/orders/statistics/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order statistics for user ${userId}:`, error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch user order statistics',
        error: error.toString()
      };
    }
  }
}; 