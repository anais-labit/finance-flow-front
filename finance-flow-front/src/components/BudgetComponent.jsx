import React, { useState, useEffect } from "react";
import "../assets/css/BudgetComponent.css";

const BudgetComponent = ({ balance, setBalance }) => {
  const [amount, setAmount] = useState("");
  const [budgetSet, setBudgetSet] = useState(false);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        let userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost/plateforme/finance-flow-back/index.php?getUserBalance&userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.balance === "number") {
            setAmount(data.balance);
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
    fetchBudget();
  }, []);

  const handleBudgetChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSaveBudget = async (event) => {
    event.preventDefault();

    let data = new FormData();
    let userId = localStorage.getItem("userId");
    data.append("user_id", userId);
    data.append("amount", amount);
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
        setBalance(amount);
      } else {
        console.error("Échec de la sauvegarde du budget");
      }
    } catch (error) {
      console.error("Erreur lors de la requête fetch", error);
    }
  };

  return (
    <div className="budget-container">
      {budgetSet ? (
        <div>
          <p className="budget-amount">{amount}€</p>
        </div>
      ) : (
        <div>
          <label htmlFor="amount" className="budget-label">
            <p>Quel budget avez-vous pour le mois ?</p>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
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
  );
};

export default BudgetComponent;
