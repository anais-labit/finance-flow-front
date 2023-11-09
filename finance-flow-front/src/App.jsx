import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import LoginForm from "./components/LoginForm";
import { FinanceProvider } from "./contexts/FinanceContext";
import "./App.css";
import "./index.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [welcomeLogin, setWelcomeLogin] = useState("");

  return (
    <FinanceProvider>
      <div className="App">
        <Navbar />
        <main>
          {!isConnected ? (
            <LoginForm
              setIsConnected={setIsConnected}
              welcomeLogin={welcomeLogin}
            />
          ) : (
            <>
              <Dashboard />
              <TransactionForm />
              <TransactionList />
            </>
          )}
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;
