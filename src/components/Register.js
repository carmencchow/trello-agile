import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const challenge = {
        email: email,
        password: password,
        username: username,
      };
      const res = await axios.post(`${server}` + "/api/user/signup", challenge);
      localStorage.setItem("token", res.data.token);
      setServerResponse(res.data.message);
      navigate("/login");
    } catch (error) {
      setServerResponse(error.response.data);
    }

    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div>
      <div className="navbar-layout">
        <div className="logo-style">
          <h1 className="trello-home">Trello</h1>
        </div>
      </div>
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-content">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="register-button" type="submit">
            Sign Up
          </button>
          {serverResponse && (
            <p className="error-message">{serverResponse.message}</p>
          )}

          <div className="register-row">
            <p className="have-acct">
              Have an account?{" "}
              <span className="login" onClick={() => navigate("/login")}>
                Log In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
