import apiClient from './apiClient';

/**
 * Cost Estimation Service
 * Handles project cost estimation API operations
 */
export const costEstimationService = {
  /**
   * Estimate cost based on user content
   * @param {object} userContent - User content for cost estimation
   * @returns {Promise<object>} - Standard API response with cost estimation data
   */
  estimateCost: async (userContent) => {
    try {
      const response = await apiClient.post('/cost-estimation', { userContent });
      return response.data;
    } catch (error) {
      console.error('Error estimating cost:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to estimate cost',
        error: error.toString()
      };
    }
  },

  /**
   * Get the cost details for a specific project
   * @param {number|string} projectId - The ID of the project to get cost for
   * @returns {Promise<object>} - Standard API response with project cost data
   */
  getProjectCost: async (projectId) => {
    try {
      const response = await apiClient.get(`/projects/${projectId}/cost`);
      return response.data;
    } catch (error) {
      console.error('Error getting project cost:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to get project cost',
        error: error.toString()
      };
    }
  }
}; 