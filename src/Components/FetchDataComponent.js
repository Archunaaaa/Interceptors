import React, { useEffect, useRef, useState } from 'react';
import { fetchData, postData } from './ApiService';
import createAxiosInstance from './AxiosInstance';

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axiosInstance = useRef(createAxiosInstance()).current;

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(axiosInstance);
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, [axiosInstance]);

  const handlePostData = async () => {
    try {
      const response = await postData(axiosInstance, { key: 'value' });
      console.log('Post response:', response);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handlePostData}>Post Data</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchDataComponent;
