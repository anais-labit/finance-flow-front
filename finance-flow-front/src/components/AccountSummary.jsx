// AccountSummary.jsx
import React from 'react';
import '../assets/css/AccountSummary.css';

function AccountSummary() {
  // Ici, vous pouvez intégrer la logique pour récupérer les données du compte, 
  // comme le solde, les transactions récentes, etc.

  return (
    <div className="account-summary">
      <h3>Account Summary</h3>
      <p>Solde total: {8000}</p>
      {/* Autres détails du compte, comme les transactions récentes */}
    </div>
  );
}

export default AccountSummary;
