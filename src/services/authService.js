import { STORAGE_KEYS } from '../utils/contants/constants';
import apiClient from './apiClient';
import { storageService } from './storageService';

/**
 * Authentication service for handling login, signup, and user session management
 */
export const authService = {
  /**
   * Sign in a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  signIn: async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error signing in:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to sign in',
        error: error.toString()
      };
    }
  },

  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} userType - Type of user (e.g., 'Exporter', 'Manufacturer')
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  signUp: async (email, password, userType) => {
    try {
      const response = await apiClient.post('/users/signup', {
        email,
        password,
        userType,
      });
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response?.data) {
        // Format the backend error message for better display
        let errorMessage = error.response.data.message;
        if (Array.isArray(errorMessage)) {
          errorMessage = errorMessage.join('\n');
        }

        return {
          success: false,
          statusCode: error.response.status,
          message: errorMessage || 'Failed to sign up',
          error: error.response.data.error
        };
      }

      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to sign up',
        error: error.toString()
      };
    }
  },

  /**
   * Log out the current user
   * @param {object} navigation - React Navigation object for redirecting after logout
   * @returns {Promise<object>} - Standard API response with success, statusCode, message properties
   */
  logout: async (navigation) => {
    try {
      // Clear auth tokens and user data from storage
      const tokenRemoveResponse = await storageService.remove(STORAGE_KEYS.USER_TOKEN);
      const userDataRemoveResponse = await storageService.remove(STORAGE_KEYS.USER_DATA);

      // Check if both operations were successful
      if (!tokenRemoveResponse.success || !userDataRemoveResponse.success) {
        throw new Error('Failed to clear user session data');
      }

      // If navigation is provided, navigate to the sign-in screen
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }],
        });
      }

      return {
        success: true,
        statusCode: 200,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Error logging out:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to log out',
        error: error.toString()
      };
    }
  },

  /**
   * Request a password reset for a user
   * @param {string} email - User email
   * @returns {Promise<object>} - Standard API response with success, statusCode, message properties
   */
  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/users/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to request password reset',
        error: error.toString()
      };
    }
  },

  /**
   * Reset a user's password with a verification code
   * @param {string} email - User email
   * @param {string} resetToken - Verification code received via email
   * @param {string} newPassword - New password
   * @returns {Promise<object>} - Standard API response with success, statusCode, message properties
   */
  resetPassword: async (email, resetToken, newPassword) => {
    try {
      const response = await apiClient.post('/users/reset-password', {
        email,
        resetToken,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to reset password',
        error: error.toString()
      };
    }
  }
}; 