import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/contants/constants';

/**
 * Service for handling notification-related API operations
 */
export const notificationService = {
  /**
   * Get notifications for the current user
   * @returns {Promise<Object>} Response with status and data
   */
  async getNotifications() {
    const startTime = Date.now();
    console.log(`[${startTime}] notificationService.getNotifications called`);
    try {
      // Check for authentication
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        console.error(`[${startTime}] Authentication required for fetching notifications`);
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }

      // Get user data
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (!userData) {
        console.error(`[${startTime}] User data not found`);
        return {
          success: false,
          statusCode: 400,
          message: 'User data not found',
          error: 'User data required to fetch notifications'
        };
      }

      const user = JSON.parse(userData);
      console.log(`[${startTime}] Fetching notifications for user: ${user.user_id}`);
      
      // Add timeout to the API call to prevent hanging indefinitely
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      try {
        const response = await apiClient.get(`/notifications/${user.user_id}`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log(`[${startTime}] Notification API response received: ${response.status}`);
        
        return {
          success: response.data.statusCode === 200,
          statusCode: response.data.statusCode,
          message: response.data.message,
          data: response.data.data
        };
      } catch (apiError) {
        clearTimeout(timeoutId);
        
        if (apiError.name === 'AbortError') {
          console.error(`[${startTime}] Notification API request timed out`);
          return {
            success: false,
            statusCode: 408,
            message: 'Request timed out',
            error: 'The server took too long to respond'
          };
        }
        
        throw apiError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      console.error(`[${startTime}] Error fetching notifications:`, error);
      
      // Create a more detailed error response
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to fetch notifications',
        error: error.toString(),
        details: {
          name: error.name,
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data
          } : 'No response data'
        }
      };
    } finally {
      console.log(`[${startTime}] notificationService.getNotifications finished, took ${Date.now() - startTime}ms`);
    }
  },

  /**
   * Mark a notification as read
   * @param {number} notificationId - ID of the notification to mark as read
   * @returns {Promise<Object>} Response with status and data
   */
  async markAsRead(notificationId) {
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

      const response = await apiClient.put(`/notifications/${notificationId}/mark-read`);
      
      return {
        success: response.data.statusCode === 200,
        statusCode: response.data.statusCode,
        message: response.data.message
      };
    } catch (error) {
      console.error(`Error marking notification as read:`, error);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to mark notification as read',
        error: error.toString()
      };
    }
  }
}; 