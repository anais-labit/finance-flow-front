import React, { useState } from 'react';
import CategorySummary from './CategorySummary';
import BudgetTracker from './BudgetTracker';
import AccountSummary from './AccountSummary';
import BurgerMenu from './BurgerMenu';
import '../assets/css/Dashboard.css';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <AccountSummary /> {/* Affichage du solde général */}

      <BurgerMenu onClick={toggleMenu} /> {/* Bouton du menu burger */}

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
