import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../utils";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const challenge = { email: email, password: password };
      const res = await axios.post(`${server}` + "/api/user/login", challenge);
      // const res = await axios.post(
      //   "https://trello-agile-project.onrender.com/api/user/login",
      //   challenge
      // );
      localStorage.setItem("token", res.data.token);
      setServerResponse(res.data.message);
      navigate("/workspaces");
    } catch (error) {
      setServerResponse(error.response.data);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="navbar-layout">
        <div className="w-style">
          <h1 className="trello-home">Trello</h1>
        </div>
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-content">
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-input">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="submit">
            Log in
          </button>

          {serverResponse && (
            <p className="error-message">{serverResponse.message}</p>
          )}

          <div className="register-row">
            <p className="no-acct">
              Don't have an account?
              <span className="register" onClick={() => navigate("/register")}>
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
