import React from 'react';
import '../assets/css/TransactionItem.css';

function TransactionItem({ transaction }) {
  return (
    <div className="transaction-item">
      <span>{transaction.date}</span>
      <span>{transaction.title}</span>
      <span>{transaction.amount}</span>
      {/* Add other details here */}
    </div>
  );
}

export default TransactionItem;
