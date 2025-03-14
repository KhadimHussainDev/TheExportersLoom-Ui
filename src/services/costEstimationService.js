import apiClient from './apiClient';

export const costEstimationService = {
  estimateCost: async (userContent) => {
    try {
      const response = await apiClient.post('/cost-estimation', { userContent });
      return response;
    } catch (error) {
      console.error('Error estimating cost:', error);
      throw error;
    }
  },

  getProjectCost: async (projectId) => {
    try {
      const response = await apiClient.get(`/projects/${projectId}/cost`);
      return response.data;
    } catch (error) {
      console.error('Error getting project cost:', error);
      throw error;
    }
  }
}; 