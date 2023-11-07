import React, { useContext } from 'react';
import { FinanceContext } from '../contexts/FinanceContext';
import '../assets/css/FilterBar.css';

function FilterBar() {
  const { filterTransactions, categories } = useContext(FinanceContext);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    filterTransactions(name, value);
  };

  return (
    <div className="filter-bar">
      <input
        type="date"
        name="date"
        onChange={handleFilterChange}
        placeholder="Filter by Date"
      />
      <input
        type="number"
        name="amount"
        onChange={handleFilterChange}
        placeholder="Filter by Amount"
      />
      <select name="category" onChange={handleFilterChange}>
        <option value="">Filter by Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* Add more filters as needed */}
    </div>
  );
}

export default FilterBar;
