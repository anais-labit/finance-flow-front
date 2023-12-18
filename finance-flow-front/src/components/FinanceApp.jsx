import React, { useState } from "react";
import TransactionList from "./TransactionList";
import Dashboard from "./Dashboard";
import TransactionForm from "./TransactionForm";

function FinanceApp() {
  const [transactions, setTransactions] = useState([]);
    const [addTransaction, setAddTransaction] = useState(false);
    const [balance, setBalance] = useState(0);

  const updateTransactions = (newTransactions) => {
    setTransactions(newTransactions);
  };

  return (
    <div>
      <Dashboard
        transactions={transactions}
        balance={balance}
        setBalance={setBalance}
      />
      <TransactionList
        setAddTransaction={setAddTransaction}
        addTransaction={addTransaction}
        updateTransactions={updateTransactions}
      />
      <TransactionForm
        setAddTransaction={setAddTransaction}
        balance={balance}
        setBalance={setBalance}
      />
    </div>
  );
}

export default FinanceApp;
