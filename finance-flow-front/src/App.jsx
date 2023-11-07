import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
// import Login from './components/Login';
import { FinanceProvider } from './contexts/FinanceContext';
import './App.css';
import './index.css';

function App() {
  return (
    <FinanceProvider>
      <div className="App">
        <Navbar />
        <main>
          {/* <Login /> */}
          <Dashboard />
          <TransactionForm />
          <TransactionList />
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;
