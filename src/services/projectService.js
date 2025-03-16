import { API_ENDPOINTS } from '../utils/contants/constants';
import apiClient from './apiClient';

/**
 * Project service for handling project-related API operations
 */
export const projectService = {
  /**
   * Create a new project
   * @param {object} projectData - The project data to create
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  createProject: async (projectData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PROJECTS, projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to create project',
        error: error.toString()
      };
    }
  },

  /**
   * Update an existing project
   * @param {number|string} projectId - The ID of the project to update
   * @param {object} projectData - The updated project data
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  updateProject: async (projectId, projectData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.PROJECTS}/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to update project',
        error: error.toString()
      };
    }
  },

  /**
   * Get a project by ID
   * @param {number|string} projectId - The ID of the project to retrieve
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getProjectById: async (projectId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PROJECTS}/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch project',
        error: error.toString()
      };
    }
  },

  /**
   * Get all projects
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getAllProjects: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROJECTS);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch projects',
        error: error.toString()
      };
    }
  },

  /**
   * Get projects for a specific user
   * @param {number} userId - User ID
   * @returns {Promise<object>} - Standard API response with user projects data
   */
  getUserProjects: async (userId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PROJECTS}?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching projects for user ${userId}:`, error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch user projects',
        error: error.toString()
      };
    }
  },

  /**
   * Get project statistics for a specific user
   * @param {number} userId - User ID
   * @returns {Promise<object>} - Standard API response with user project statistics
   */
  getUserProjectStatistics: async (userId) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PROJECTS}/statistics/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project statistics for user ${userId}:`, error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to fetch user project statistics',
        error: error.toString()
      };
    }
  }
}; 