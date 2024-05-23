import React, { useEffect, useState } from 'react';
import { fetchData, postData } from './ApiService';

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const handlePostData = async () => {
    try {
      const response = await postData({ key: 'value' }); // Modify the object as needed
      console.log('Post response:', response);
      // Optionally, fetch data again after posting
      // await fetchData();
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
