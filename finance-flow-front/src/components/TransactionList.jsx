import React, { useState, useEffect } from "react";
import TransactionItem from "./TransactionItem";
import "../assets/css/TransactionList.css";

function TransactionList({ setAddTransaction, addTransaction }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    let userId = localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost/plateforme/finance-flow-back/index.php?getUserTransactions&userId=${userId}`
      );

    if (response.ok) {
      const data = await response.json();
      setTransactions(data);
    } else {
      console.error(
        "Erreur lors de la récupération des transactions. Réponse du serveur :",
        response
      );
    }
  };
  useEffect(() => {
    fetchTransactions();
    setAddTransaction(false);
  }, [addTransaction]);

  return (
    <>
      <h2>Transactions</h2>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-list-item">
            <p>Name: {transaction.name}</p>
            <p>Date: {transaction.date}</p>
            <p>Category: {transaction.subcategory_name}</p>
            <p>Amount: {transaction.amount}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TransactionList;
