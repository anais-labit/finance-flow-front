// import React, { useState, useEffect } from "react";
// import "../assets/css/BudgetComponent.css";

// const BudgetComponent = ({ balance, setBalance }) => {
//   const [initialAmount, setInitialAmount] = useState("");
//   const [budgetSet, setBudgetSet] = useState(false);

//   useEffect(() => {
//     const isBudgetSet = false;

//     if (isBudgetSet) {
//       setBudgetSet(true);
//     }
//   }, []);

//   const handleBudgetChange = (e) => {
//     setInitialAmount(e.target.value);
//   };

//   const handleSaveBudget = async (event) => {
//     event.preventDefault();
//     // console.log("Budget saved:", initialAmount);
//     let data = new FormData();
//     let userId = localStorage.getItem("userId");
//     data.append("user_id", userId);
//     data.append("intial_amount", initialAmount);
//     data.append("submitBalanceForm", "");

//     console.log(data);

//     const fetchParams = {
//       method: "POST",
//       body: data,
//       mode: "cors",
//     };

//     let result = await fetch(
//       "http://localhost/plateforme/finance-flow-back/index.php",
//       fetchParams
//     );
//     setBudgetSet(true);
//     setBalance(initialAmount);
//   };

//   return (
//     <div>
//       {!budgetSet ? (
//         <div>
//           <label>
//             Quel budget avez-vous pour le mois ?
//             <input
//               type="number"
//               id="intial_amount"
//               name="intial_amount"
//               value={initialAmount}
//               onChange={handleBudgetChange}
//             />
//           </label>
//           <button type="submit" onClick={handleSaveBudget}>
//             Save
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p>Vous avez déjà défini un budget pour le mois.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BudgetComponent;

import React, { useState, useEffect } from "react";
import "../assets/css/BudgetComponent.css";

const BudgetComponent = ({ balance, setBalance }) => {
  const [initialAmount, setInitialAmount] = useState("");
  const [budgetSet, setBudgetSet] = useState(false);

  useEffect(() => {
    const isBudgetSet = false;

    if (isBudgetSet) {
      setBudgetSet(true);
    }
  }, []);

  const handleBudgetChange = (e) => {
    setInitialAmount(e.target.value);
  };

  const handleSaveBudget = async (event) => {
    event.preventDefault();

    let data = new FormData();
    let userId = localStorage.getItem("userId");
    data.append("user_id", userId);
    data.append("initial_amount", initialAmount); 
    data.append("submitBalanceForm", "");

    console.log(data);

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
        setBalance(initialAmount);
      } else {
        console.error("Échec de la sauvegarde du budget");
      }
    } catch (error) {
      console.error("Erreur lors de la requête fetch", error);
    }
  };

  return (
    <div className="budget-container">
      {!budgetSet ? (
        <div>
          <label htmlFor="initial_amount" className="budget-label">
            <p>Quel budget avez-vous pour le mois ?</p>
            <input
              type="number"
              id="initial_amount"
              name="initial_amount"
              value={initialAmount}
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
      ) : (
        <div>
          <p className="budget-message">
            Vous avez déjà défini un budget pour le mois.
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetComponent;
