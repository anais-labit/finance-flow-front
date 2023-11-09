import React, { useState } from "react";
import "../assets/css/Login.css";

function LoginForm({ setIsConnected }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    let data = new FormData();
    data.append("login", login);
    data.append("password", password);
    data.append("submitLoginForm", "");

    let response = await fetch(
      "http://localhost/plateforme/finance-flow-back/index.php",
      {
        method: "POST",
        body: data,
        mode: "cors",
      }
    );
    let jsonResponse = await response.json();
    // console.log(jsonResponse);
    // setIsConnected(true);
  }

  return (
    <div className="login-form">
      <form id="loginForm" action="" method="post">
        <h2 className="text-center">Connexion</h2>
        <p id="message"></p>
        <div className="form-group">
          <label htmlFor="login" id="login"></label>
          <input
            type="text"
            name="login"
            className="form-control"
            placeholder="Login"
            required="required"
            autoComplete="off"
            onChange={(e) => {
              setLogin(e.target.value), console.log(login);
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
            onChange={(e) => {
              setPassword(e.target.value), console.log(password);
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
        <a href="inscription.php">Sign Up</a>
      </p>
    </div>
  );
}

export default LoginForm;
