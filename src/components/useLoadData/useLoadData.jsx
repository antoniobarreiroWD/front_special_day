import { useState, useEffect } from 'react';

const useLoadData = (serviceFunction, id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await serviceFunction(id);
        setData(result);
      } catch (err) {
        setError(err);
      }
    };
    loadData();
  }, [serviceFunction, id]);

  return { data, error };
};

export default useLoadData;