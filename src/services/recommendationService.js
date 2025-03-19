import apiClient from './apiClient';

export const recommendationService = {
  /**
   * Get recommended manufacturers for a bid
   * @param {number} exporterId - The ID of the exporter
   * @param {number} bidId - The ID of the bid
   * @returns {Promise<object>} - Standard API response with success, statusCode, message, and data properties
   */
  getRecommendations: async (exporterId, bidId) => {
    try {
      const response = await apiClient.get(`/recommendations/${exporterId}/${bidId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return error.response?.data || {
        success: false,
        statusCode: 500,
        message: error.message || 'Failed to get recommendations',
        error: error.toString()
      };
    }
  }
}; 