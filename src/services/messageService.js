import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/contants/constants';

/**
 * Message service for handling chat-related API operations
 */
export const messageService = {
  /**
   * Get messages between two users
   * @param {string} userId1 - First user ID
   * @param {string} userId2 - Second user ID
   * @returns {Promise<object>} - Standard API response with messages data
   */
  getMessagesBetweenUsers: async (userId1, userId2) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }

      const response = await apiClient.get('/messages', {
        data: { userId1, userId2 },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch messages',
        error: error.toString()
      };
    }
  },

  /**
   * Send a message from one user to another
   * @param {string} senderId - Sender user ID
   * @param {string} receiverId - Receiver user ID
   * @param {string} content - Message content
   * @returns {Promise<object>} - Standard API response with message data
   */
  sendMessage: async (senderId, receiverId, content) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }

      const response = await apiClient.post('/messages', {
        senderId,
        receiverId,
        content
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to send message',
        error: error.toString()
      };
    }
  },
  
  /**
   * Get recent chat contacts for a user
   * Note: This is a mock implementation since the backend endpoint might not exist yet
   * @param {string} userId - User ID
   * @returns {Promise<object>} - Standard API response with contacts data
   */
  getRecentContacts: async (userId) => {
    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll return mock data
      
      // Mock data - in a real app, this would come from the API
      const mockContacts = [
        {
          user_id: '1',
          name: 'John Smith',
          role: 'Exporter',
          last_message: 'When will my order be ready?',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          unread: 2,
          avatar: null
        },
        {
          user_id: '2',
          name: 'Maria Rodriguez',
          role: 'Manufacturer',
          last_message: 'The fabric has arrived, we can start production',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          unread: 0,
          avatar: null
        },
        {
          user_id: '3',
          name: 'Ahmed Hassan',
          role: 'Exporter',
          last_message: 'Please send me the updated pricing',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          unread: 1,
          avatar: null
        }
      ];
      
      return {
        success: true,
        statusCode: 200,
        message: 'Recent contacts retrieved successfully',
        data: mockContacts
      };
    } catch (error) {
      console.error('Error fetching recent contacts:', error);
      return {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch recent contacts',
        error: error.toString()
      };
    }
  }
}; 