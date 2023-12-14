import React, { useState, useEffect } from "react";
import "../assets/css/BalanceComponent.css";

const BalanceComponent = ({
  balance,
  setBalance
}) => {
  const [budgetSet, setBudgetSet] = useState(false);

  useEffect(() => {
    const fetchCurrentBalance = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost/plateforme/finance-flow-back/index.php?getUserBalance&userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setBalance(data.balance);
            setBudgetSet(true);
          } else {
            setBudgetSet(false);
          }
        } else {
          console.error(
            "Erreur lors de la récupération du budget. Réponse du serveur :",
            response
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du budget :",
          error.message
        );
      }
    };
    fetchCurrentBalance();
  }, [balance]);

  const handleBudgetChange = (e) => {
    setBalance(e.target.value);
  };

  const handleSaveBudget = async (event) => {
    event.preventDefault();

    let data = new FormData();
    let userId = localStorage.getItem("userId");
    data.append("user_id", userId);
    data.append("amount", balance);
    data.append("submitBalanceForm", "");

    const fetchParams = {
      method: "POST",
      body: data,
      mode: "cors",
    };

    try {
      let result = await fetch(
        "http://localhost/plateforme/finance-flow-back/index.php",
        fetchParams
      );

      if (result.ok) {
        setBudgetSet(true);
        setBalance();
      } else {
        console.error("Échec de la sauvegarde du budget");
      }
    } catch (error) {
      console.error("Erreur lors de la requête fetch", error);
    }
  };

  return (
    <div className="budget-container">
      <div className="account-summary">
        <h3>Total balance</h3>
        {budgetSet ? (
          <div>
            <p className="budget-amount">{balance}€</p>
          </div>
        ) : (
          <div>
            <label htmlFor="amount" className="budget-label">
              <p>Renseignez votre budget du mois : <br/><p></p></p>
              <input
                type="number"
                id="amount"
                name="amount"
                value={balance}
                onChange={handleBudgetChange}
                className="budget-input"
              />
            </label>
            <button
              type="submit"
              onClick={handleSaveBudget}
              className="budget-button"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceComponent;
