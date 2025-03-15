import { STORAGE_KEYS } from '../utils/contants/constants';
import apiClient from './apiClient';
import { storageService } from './storageService';

/**
 * User service for handling user-related API operations
 */
export const userService = {
  /**
   * Get user profile by user ID
   * @param {number|string} userId - The ID of the user to retrieve profile for
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  async getUserProfile(userId) {
    try {
      const response = await apiClient.get(`/users/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return error.response?.data || {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.message || 'Failed to fetch user profile',
        error: error.toString()
      };
    }
  },

  /**
   * Get user reviews by user ID
   * @param {number|string} userId - The ID of the user to retrieve reviews for
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  async getUserReviews(userId) {
    try {
      const response = await apiClient.get(`/reviews/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      return error.response?.data || {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.message || 'Failed to fetch user reviews',
        error: error.toString()
      };
    }
  },

  /**
   * Update user profile
   * @param {number|string} userId - The ID of the user to update
   * @param {object} profileData - The updated profile data
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  async updateUserProfile(userId, profileData) {
    try {
      const response = await apiClient.put(`/users/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return error.response?.data || {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.message || 'Failed to update user profile',
        error: error.toString()
      };
    }
  },

  /**
   * Get current user ID from storage
   * @returns {Promise<number|null>} - The user ID or null if not found
   */
  async getCurrentUserId() {
    try {
      const userDataResponse = await storageService.get(STORAGE_KEYS.USER_DATA);
      if (userDataResponse.success && userDataResponse.data) {
        console.log("userDataResponse.data", userDataResponse.data);
        return userDataResponse.data.userId;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user ID:', error);
      return null;
    }
  }
}; 