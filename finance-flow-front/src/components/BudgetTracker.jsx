import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/BudgetTracker.css';

function BudgetTracker({ budgets }) {
  // Données factices pour le test
  const fakeBudgets = budgets || [
    { id: 1, category: 'Alimentation', budget: 300, spent: 250 },
    { id: 2, category: 'Loisirs', budget: 150, spent: 85 },
    { id: 3, category: 'Santé', budget: 100, spent: 20 },
    { id: 4, category: 'Logement', budget: 500, spent: 500 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="budget-tracker">
      <h2>Budget Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Budget</th>
            <th>Dépensé</th>
            <th>Restant</th>
          </tr>
        </thead>
        <tbody>
          {fakeBudgets.map((budget) => (
            <tr key={budget.id} className={budget.spent > budget.budget ? 'over-budget' : ''}>
              <td>{budget.category}</td>
              <td>{formatCurrency(budget.budget)}</td>
              <td>{formatCurrency(budget.spent)}</td>
              <td>{formatCurrency(budget.budget - budget.spent)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BudgetTracker.propTypes = {
  budgets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    spent: PropTypes.number.isRequired
  }))
};

export default BudgetTracker;
