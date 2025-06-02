import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/contants/constants';

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
  },
  
  /**
   * Create a new order from a bid
   * @param {Object} orderData - Order data including bidId, exporterId, manufacturerId, machineId, etc.
   * @returns {Promise<object>} - Standard API response with order data
   */
  createOrder: async (orderData) => {
    try {
      console.log('📦 Creating order with data:', orderData);
      
      // Check for authentication
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        console.error('❌ Authentication required for creating an order');
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }
      
      const response = await apiClient.post('/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}` // Explicitly add token to ensure it's included
        }
      });
      
      console.log('✅ Order created successfully:', response.data);
      
      return {
        success: response.data.statusCode === 201,
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error('❌ Error creating order:', error);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to create order',
        error: error.toString()
      };
    }
  }
}; 