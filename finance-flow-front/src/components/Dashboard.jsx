import React, { useState } from "react";
import CategorySummary from "./CategorySummary";
import BudgetTracker from "./BudgetTracker";
import BalanceComponent from "./BalanceComponent";
import BurgerMenu from "./BurgerMenu";
import "../assets/css/Dashboard.css";

function Dashboard({ balance, setBalance, initialAmount, setInitialAmount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <BalanceComponent
        initialAmount={initialAmount}
        setInitialAmount={setInitialAmount}
        balance={balance}
        setBalance={setBalance}
      />
      <BurgerMenu onClick={toggleMenu} />
      {isMenuOpen && (
        <>
          <CategorySummary />
          <BudgetTracker />
        </>
      )}
    </section>
  );
}

export default Dashboard;
