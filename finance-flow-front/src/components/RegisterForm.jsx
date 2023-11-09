// RegistrationForm.jsx
import React, { useState } from "react";
import "../assets/css/RegisterForm.css";

const RegistrationForm = ({ setIsRegistered, onSignInClick }) => {
  const [login, setLogin] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegistration = async () => {
    let data = new FormData();
    data.append("login", login);
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("password", password);
    data.append("confPassword", confPassword);
    data.append("submitRegisterForm", "");

    let result = await fetch(
      "http://localhost/plateforme/finance-flow-back/index.php",
      {
        method: "POST",
        body: data,
        mode: "cors",
      }
    );
    let jsonResponse = await result.json();

    if (jsonResponse.success) {
      console.log(jsonResponse);
      setMessage(jsonResponse.message);
      setTimeout(() => {
        onSignInClick();
      }, 2500);
    } else {
      setMessage(jsonResponse.message);
    }
  };

  return (
    <div className="login-form">
      <form>
        <h2 className="text-center">Inscription</h2>
        <p id="message">{message}</p>
        <div className="form-group">
          <label htmlFor="login"></label>
          <input
            type="text"
            name="login"
            className="form-control"
            placeholder="Login"
            required="required"
            autoComplete="off"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname"></label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="Prénom"
            required="required"
            autoComplete="off"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname"></label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Nom"
            required="required"
            autoComplete="off"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mot de passe"
            required="required"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confPassword"></label>
          <input
            type="password"
            name="confPassword"
            className="form-control"
            placeholder="Confirmation de mot de passe"
            required="required"
            autoComplete="off"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            name="submit"
            className="btn btn-primary btn-block"
            onClick={handleRegistration}
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center">
        <button
          type="button"
          name="signInBtn"
          className="btn btn-primary btn-block"
          id="signInBtn"
          onClick={onSignInClick}
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default RegistrationForm;
