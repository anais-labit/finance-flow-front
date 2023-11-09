// App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import { FinanceProvider } from "./contexts/FinanceContext";
import "./App.css";
import "./index.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);

  const handleSignUpClick = () => {
    setIsRegistered(false);
  };

  const handleSignInClick = () => {
    setIsRegistered(true);
  };

  const handleSuccessfulRegistration = () => {
    // Appelé lorsque l'inscription réussit, tu peux également ajouter d'autres logiques ici si nécessaire.
    // Pour l'instant, on bascule simplement sur le formulaire de connexion.
    handleSignInClick();
  };

  return (
    <FinanceProvider>
      <div className="App">
        <Navbar />
        <main>
          {!isRegistered ? (
            <RegistrationForm
              setIsRegistered={setIsRegistered}
              onSignInClick={handleSignInClick}
              onSuccessfulRegistration={handleSuccessfulRegistration}
            />
          ) : (
            <>
              {!isConnected ? (
                <LoginForm
                  setIsConnected={setIsConnected}
                  setIsRegistered={setIsRegistered}
                />
              ) : (
                <>
                  <Dashboard />
                  <TransactionForm />
                  <TransactionList />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;