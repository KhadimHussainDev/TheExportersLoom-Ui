import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

export const projectService = {
  createProject: async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROJECTS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },
}; 