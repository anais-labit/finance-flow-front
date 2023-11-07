import React from 'react';
import CategorySummary from './CategorySummary';
import BudgetTracker from './BudgetTracker';
import '../assets/css/Dashboard.css';


function Dashboard() {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <CategorySummary />
      <BudgetTracker />
      {/* Add other dashboard components here */}
    </section>
  );
}

export default Dashboard;
