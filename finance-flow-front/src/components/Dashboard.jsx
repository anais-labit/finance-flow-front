import React, { useEffect, useState } from 'react';
import CategorySummary from './CategorySummary';
import BudgetTracker from './BudgetTracker';
import '../assets/css/Dashboard.css';

function Dashboard() {
  const [budgets, setBudgets] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // Exemple de récupération des données
    fetch('/api/budgets')
      .then(response => response.json())
      .then(data => setBudgets(data));

    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {categories && <CategorySummary categories={categories} />}
      {budgets && <BudgetTracker budgets={budgets} />}
      {/* Autres composants */}
    </div>
  );
}

export default Dashboard;
