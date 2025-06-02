import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/contants/constants';

/**
 * Service for handling machine-related API operations
 */
export const machineService = {
  /**
   * Register a new machine
   * @param {Object} machineData - Machine data object
   * @returns {Promise<Object>} Response with status and data
   */
  async registerMachine(machineData) {
    try {
      // Check for authentication
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        console.error('Authentication required for machine registration');
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }

      // Log the data being sent
      console.log('Registering machine with data:', machineData);
      
      const response = await apiClient.post('/machines/register', machineData);
      
      console.log('Machine registration response:', response.data);
      
      return {
        success: response.data.statusCode === 201,
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error registering machine:', error.response?.data || error.message);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to register machine',
        error: error.toString()
      };
    }
  },

  /**
   * Get all machines for the current user
   * @returns {Promise<Object>} Response with status and data
   */
  async getMachines() {
    try {
      // Check for authentication
      const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
      if (!token) {
        console.error('Authentication required for fetching machines');
        return {
          success: false,
          statusCode: 401,
          message: 'Authentication required',
          error: 'No authentication token found'
        };
      }

      // Check for user data
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (!userData) {
        console.error('User data not found');
        return {
          success: false,
          statusCode: 400,
          message: 'User data not found',
          error: 'User data required to filter machines'
        };
      }

      console.log('Fetching machines for user:', JSON.parse(userData).user_id);
      
      const response = await apiClient.get('/machines');
      
      console.log('Machines response:', response.data);
      
      // Filter machines to only show those belonging to the current user
      const user = JSON.parse(userData);
      
      const userMachines = response.data.data.filter(
        (machine) => machine.machine_owner.user_id === user.user_id
      );

      console.log(`Found ${userMachines.length} machines for this user`);

      return {
        success: response.data.statusCode === 200,
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: userMachines
      };
    } catch (error) {
      console.error('Error fetching machines:', error);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to fetch machines',
        error: error.toString()
      };
    }
  },

  /**
   * Get a specific machine by ID
   * @param {number} machineId - ID of the machine to retrieve
   * @returns {Promise<Object>} Response with status and data
   */
  async getMachineById(machineId) {
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

      const response = await apiClient.get(`/machines/${machineId}`);

      return {
        success: response.data.statusCode === 200,
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error(`Error fetching machine ${machineId}:`, error.response?.data || error.message);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to fetch machine',
        error: error.toString()
      };
    }
  },

  /**
   * Update a machine
   * @param {number} machineId - ID of the machine to update
   * @param {Object} machineData - Updated machine data
   * @returns {Promise<Object>} Response with status and data
   */
  async updateMachine(machineId, machineData) {
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

      console.log(`Updating machine ${machineId} with data:`, machineData);
      
      const response = await apiClient.put(`/machines/${machineId}`, machineData);

      return {
        success: response.data.statusCode === 200,
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error(`Error updating machine ${machineId}:`, error.response?.data || error.message);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to update machine',
        error: error.toString()
      };
    }
  },

  /**
   * Delete a machine
   * @param {number} machineId - ID of the machine to delete
   * @returns {Promise<Object>} Response with status and data
   */
  async deleteMachine(machineId) {
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

      console.log(`Deleting machine ${machineId}`);
      
      const response = await apiClient.delete(`/machines/${machineId}`);

      return {
        success: response.data.statusCode === 200,
        statusCode: response.data.statusCode,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error(`Error deleting machine ${machineId}:`, error.response?.data || error.message);
      return {
        success: false,
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to delete machine',
        error: error.toString()
      };
    }
  }
}; 