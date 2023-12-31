// App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
// import Dashboard from "./components/Dashboard";
// import TransactionForm from "./components/TransactionForm";
// import TransactionList from "./components/TransactionList";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import FinanceApp from "./components/FinanceApp";
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
    handleSignInClick();
  };

  return (
    <div className="App">
      <Navbar setIsConnected={setIsConnected} isConnected={isConnected} />
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
                <FinanceApp  />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
