// Dashboard.jsx
import React from 'react';
import CategorySummary from './CategorySummary';
import BudgetTracker from './BudgetTracker';
import AccountSummary from './AccountSummary'; // Assurez-vous d'avoir ce composant
import '../assets/css/Dashboard.css';

function Dashboard() {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <AccountSummary /> {/* Ajoutez le composant AccountSummary ici */}
      <CategorySummary />
      <BudgetTracker />
      {/* Vous pouvez ajouter d'autres composants de tableau de bord ici si nécessaire */}
    </section>
  );
}

export default Dashboard;
