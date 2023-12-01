// App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import "./App.css";
import "./index.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [addTransaction, setAddTransaction] = useState(false);
  const [initialAmount, setInitialAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleSignUpClick = () => {
    setIsRegistered(false);
  };

  const handleSignInClick = () => {
    setIsRegistered(true);
  };

  const handleSuccessfulRegistration = () => {
    handleSignInClick();
  };

  return (
    <div className="App">
      <Navbar setIsConnected={setIsConnected} />
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
                <Dashboard
                  initialAmount={initialAmount}
                  setInitialAmount={setInitialAmount}
                  balance={balance}
                  setBalance={setBalance}
                />
                <TransactionForm
                  setAddTransaction={setAddTransaction}
                  initialAmount={initialAmount}
                  setInitialAmount={setInitialAmount}
                  balance={balance}
                  setBalance={setBalance}
                />
                <TransactionList
                  setAddTransaction={setAddTransaction}
                  addTransaction={addTransaction}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
