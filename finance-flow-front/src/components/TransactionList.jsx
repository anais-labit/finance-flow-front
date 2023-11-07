import React, { useContext } from 'react';
import { FinanceContext } from '../contexts/FinanceContext';
import TransactionItem from './TransactionItem';
import '../assets/css/TransactionList.css';

function TransactionList() {
  const { transactions } = useContext(FinanceContext);

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
