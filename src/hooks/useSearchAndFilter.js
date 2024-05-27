import { useState, useEffect } from 'react';

const useSearchAndFilter = (data, searchTerm, filterCriteria) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => filterCriteria(item, searchTerm));
      setFilteredData(filtered);
    }
  }, [data, searchTerm, filterCriteria]);

  return filteredData;
};

export default useSearchAndFilter;
