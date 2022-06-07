import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  // let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    window.location.reload();
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            placeholder="email"
            className="loginInput"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            required
            type="password"
            placeholder="password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <input type="submit" disabled={isFetching} />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}
