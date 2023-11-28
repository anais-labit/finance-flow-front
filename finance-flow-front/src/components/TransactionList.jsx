import React, { useState, useEffect } from "react";
// import { FinanceContext } from "../contexts/FinanceContext";
import TransactionItem from "./TransactionItem";
import "../assets/css/TransactionList.css";

function TransactionList() {
  const  [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      var userId = localStorage.getItem("userId");


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
    fetchTransactions();
  },  [setTransactions]);

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
