import { useState, useEffect } from 'react';

const useFinanceData = () => {
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/finance-data');
        const data = await response.json();
        setFinanceData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return financeData;
};

export default useFinanceData;
