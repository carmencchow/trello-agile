import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const challenge = { email: email, password: password };
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        challenge
      );
      localStorage.setItem("token", res.data.token);
      setServerResponse(res.data.message);
      navigate("/workspaces");
      getUserProfile();
    } catch (error) {
      setServerResponse(error.response.data);
    }

    setEmail("");
    setPassword("");
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("http://localhost:5000/api/user/me");
      setUserInfo(res.data);
      console.log(res.data);
    } catch (error) {
      throw error;
    }
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
              Don't have an account?{" "}
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
