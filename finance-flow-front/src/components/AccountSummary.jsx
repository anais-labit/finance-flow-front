import React, { useState, useEffect } from "react";
import BudgetComponent from "./BudgetComponent";
import "../assets/css/AccountSummary.css";

function AccountSummary({ balance, setBalance }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost/finance-flow-back/index.php?getUserBalance&userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          setBalance(data.balance);
        } else {
          console.error(
            "Erreur lors de la récupération du solde. Réponse du serveur :",
            response
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du solde :", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="account-summary">
      <h3>Total balance</h3>
      {loading ? (
        <BudgetComponent balance={balance} setBalance={setBalance} />
      ) : balance !== undefined ? (
        <p>{balance + "€"}</p>
      ) : (
        <BudgetComponent balance={balance} setBalance={setBalance} />
      )}
    </div>
  );
}

export default AccountSummary;
