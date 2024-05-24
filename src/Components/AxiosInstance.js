import axios from 'axios';

// Function to retrieve the token
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Create an instance of Axios
const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://64d60e47754d3e0f13618812.mockapi.io/form', 
    timeout: 10000, 
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken(); 
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.error('Unauthorized access - maybe redirect to login');
        } else if (error.response.status === 500) {
          console.error('Server error - try again later');
        }
      } else if (error.request) {
        console.error('Network error - please check your connection');
      } else {
        console.error('Error', error.message);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
