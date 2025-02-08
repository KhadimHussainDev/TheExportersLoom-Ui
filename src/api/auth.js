import apiClient from './client';

const signIn = async (email, password) => {
  try {
    const response = await apiClient.post('/users/login', {
      email,
      password,
    });
    // console.log('Sign in response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export default signIn;