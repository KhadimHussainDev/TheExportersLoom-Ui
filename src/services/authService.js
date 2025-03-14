import { STORAGE_KEYS } from '../utils/constants';
import apiClient from './apiClient';
import { storageService } from './storageService';

export const authService = {
  signIn: async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error signing in:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error signing in: No response received', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error signing in:', error.message);
      }
      throw error;
    }
  },

  signUp: async (email, password, userType) => {
    try {
      const response = await apiClient.post('/users/signup', {
        email,
        password,
        userType,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let e = error.response.data.message;
        if (Array.isArray(e)) {
          e = e.join('\n');
        } else if (typeof e !== 'string') {
          e = String(e);
        }
        if (error.response.data.error) {
          e += '\n' + error.response.data.error;
        }
        return { error: e, statusCode: error.response.status };
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error signing up: No response received', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error signing up:', error.message);
      }
      throw error;
    }
  },

  logout: async (navigation) => {
    try {
      // Clear auth tokens and user data from storage
      await storageService.remove(STORAGE_KEYS.USER_TOKEN);
      await storageService.remove(STORAGE_KEYS.USER_DATA);

      // If navigation is provided, navigate to the sign-in screen
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignInScreen' }],
        });
      }

      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  }
}; 