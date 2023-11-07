import React, { useState, useContext } from 'react';
import { FinanceContext } from '../contexts/FinanceContext';
import '../assets/css/TransactionForm.css';

function TransactionForm() {
  const { addTransaction } = useContext(FinanceContext);
  const [transaction, setTransaction] = useState({
    date: '',
    title: '',
    amount: 0,
    category: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transaction);
    setTransaction({ date: '', title: '', amount: 0, category: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        type="date"
        value={transaction.date}
        onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
        required
      />
      <input
        type="text"
        value={transaction.title}
        onChange={(e) => setTransaction({ ...transaction, title: e.target.value })}
        placeholder="Title"
        required
      />
      <input
        type="number"
        value={transaction.amount}
        onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
        placeholder="Amount"
        required
      />
      <select
        value={transaction.category}
        onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        {/* Map through categories here */}
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
