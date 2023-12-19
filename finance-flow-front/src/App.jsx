import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import FinanceApp from "./components/FinanceApp";
import "./App.css";
import "./index.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleSignUpClick = () => {
    setIsRegistered(false);
  };

  const handleSignInClick = () => {
    setIsRegistered(true);
  };

  const handleSuccessfulRegistration = () => {
    handleSignInClick();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      {!isMobile && (
        <div className="warning-message">
          This app is optimized for mobile use
        </div>
      )}
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
                {!isMobile ? (
                  <div className="warning-message">
                    This app is optimized for mobile use
                  </div>
                ) : (
                  <FinanceApp />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
