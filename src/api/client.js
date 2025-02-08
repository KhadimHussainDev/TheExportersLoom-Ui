import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.43.186:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;