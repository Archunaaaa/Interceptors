export const fetchData = async (axiosInstance) => {
  const response = await axiosInstance.get('/Interceptors');
  return response.data;
};

export const postData = async (axiosInstance, data) => {
  const response = await axiosInstance.post('/Interceptors', data);
  return response.data;
};
