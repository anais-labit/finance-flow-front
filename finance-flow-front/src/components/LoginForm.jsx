import React, { useState, useEffect } from "react";
import "../assets/css/LoginForm.css";

const LoginForm = ({ setIsConnected, setIsRegistered }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // C'EST ICI QUE JE FAIS L'ÉQUIVALENT DE SESSION START // A ACTIVER LORSQUE L'ON AURA MIS EN PLACE DÉCO
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsConnected(true);
    }
  }, []);

  const handleLogin = async () => {
    let data = new FormData();
    data.append("login", login);
    data.append("password", password);
    data.append("submitLoginForm", "");

    const fetchParams = {
      method: "POST",
      body: data,
      mode: "cors",
    };

    let result = await fetch(
      "http://localhost/plateforme/finance-flow-back/index.php",
      fetchParams
    );

    if (result.ok) {
      let jsonResponse = await result.json();

      if (jsonResponse.success) {
        localStorage.setItem("token", login);
        let userId = jsonResponse.id;
        localStorage.setItem("userId", userId);

        setMessage(jsonResponse.message);
        setTimeout(() => {
          setIsConnected(true);
        }, 2000);
      } else {
        console.log(jsonResponse);
        setMessage(jsonResponse.message);
        console.log(message);
      }
    }
  };

  return (
    <div className="login-form">
      <form id="loginForm" action="" method="post">
        <h2 className="text-center">Connexion</h2>
        <p id="message">{message}</p>
        <div className="form-group">
          <label htmlFor="login" id="login"></label>
          <input
            type="text"
            name="login"
            className="form-control"
            placeholder="Login"
            required="required"
            autoComplete="off"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" id="password"></label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mot de passe"
            required="required"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            name="submit"
            className="btn btn-primary btn-block"
            id="signInBtn"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="text-center">
        <button
          type="button"
          name="signUpBtn"
          className="btn btn-primary btn-block"
          id="signUpBtn"
          onClick={() => setIsRegistered(false)}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
