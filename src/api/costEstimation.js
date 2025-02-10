import apiClient from './client';

const estimateCost = (userContent) => {
  return apiClient.post('/cost-estimation', { userContent });
};

export default estimateCost;