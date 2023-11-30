// AccountSummary.jsx
import React, { useEffect } from "react";
import "../assets/css/AccountSummary.css";

function AccountSummary({ balance, setBalance }) {
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost/plateforme/finance-flow-back/index.php?getUserBalance&userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          setBalance(data.initial_balance);
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
      <p>{balance !== null ? balance + "€" : "Chargement en cours..."}</p>
    </div>
  );
}

export default AccountSummary;
