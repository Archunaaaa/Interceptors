import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://64d60e47754d3e0f13618812.mockapi.io/form',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);               
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
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

export default axiosInstance;


