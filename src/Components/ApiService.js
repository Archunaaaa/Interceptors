import axiosInstance from '../Components/AxiosInstance';

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/patient_registration');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (postData) => {
  try {
    const response = await axiosInstance.post('/patient_registration', postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};  

