// import apiClient from './client';

// export const signIn = async (email, password) => {
//   try {
//     const response = await apiClient.post('/users/login', {
//       email,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error('Error signing in:', error.response.data);
//       console.error('Status:', error.response.status);
//       console.error('Headers:', error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error('Error signing in: No response received', error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error signing in:', error.message);
//     }
//     throw error;
//   }
// };

// export const signUp = async (email, password, userType) => {
//   try {
//     const response = await apiClient.post('/users/signup', {
//       email,
//       password,
//       userType,
//     });
//     console.log(response)
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       // console.error('Error signing up:', error.response.data);
//       // console.error('Status:', error.response.status);
//       // console.error('Headers:', error.response.headers);
//       let e = error.response.data.message;
//       if (Array.isArray(e)) {
//         e = e.join('\n');
//       } else if (typeof e !== 'string') {
//         e = String(e);
//       }
//       if (error.response.data.error) {
//         e += '\n' + error.response.data.error;
//       }
//       return { error: e , statusCode: error.response.status};
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error('Error signing up: No response received', error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error signing up:', error.message);
//     }
//     throw error;
//   }
// };