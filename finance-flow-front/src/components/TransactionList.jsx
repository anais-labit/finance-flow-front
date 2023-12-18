import React, { useState, useEffect } from "react";
import "../assets/css/TransactionList.css";

function TransactionList({
  updateTransactions, 
  setAddTransaction,
  addTransaction,
}) {
  const [transactions, setTransactions] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState(3);

  const fetchTransactions = async () => {
    let userId = localStorage.getItem("userId");
    const response = await fetch(
      `http://localhost/plateforme/finance-flow-back/index.php?getUserTransactions&userId=${userId}`
    );

    if (response.ok) {
      const data = await response.json();
      setTransactions(data);
      updateTransactions(data);
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const showMoreTransactions = () => {
    setVisibleTransactions((prevValue) => prevValue + 3);
  };

  return (
    <>
      <div className="transaction-list">
        {transactions.slice(0, visibleTransactions).map((transaction) => (
          <div key={transaction.id} className="transaction-list-item">
            <p>{transaction.name}</p>
            <p>{formatDate(transaction.date)}</p>
            <p>{transaction.subcategory_name}</p>
            <p>{transaction.amount}€</p>
          </div>
        ))}
      </div>
      {visibleTransactions < transactions.length && (
        <button onClick={showMoreTransactions} className="load-more-button">
          More Transactions
        </button>
      )}
    </>
  );
}

export default TransactionList;
