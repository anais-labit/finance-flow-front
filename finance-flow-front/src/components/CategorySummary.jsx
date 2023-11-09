import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/CategorySummary.css';

function CategorySummary({ summary }) {
  // Données factices pour le test
  const fakeSummary = summary || [
    { category: 'Alimentation', amount: 250 },
    { category: 'Loisirs', amount: 85 },
    { category: 'Santé', amount: 20 },
    { category: 'Logement', amount: 500 }
  ];

  return (
    <div className="category-summary">
      <h2>Summary by Category</h2>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {fakeSummary.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.amount} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

CategorySummary.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }))
};

export default CategorySummary;
