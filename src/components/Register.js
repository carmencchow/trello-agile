import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const alert =
    "Wait time will be approximately 30 seconds as we try to reach the server. Thank you for your patience!";

  const handleRegister = async (e) => {
    e.preventDefault();
    setShowAlert(true);
    try {
      const userInfo = {
        email: email,
        password: password,
        username: username,
      };
      const res = await api.post("/user/signup", userInfo);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      setServerResponse(res.data.message);
      navigate("/workspaces");
    } catch (error) {
      console.log("Registration error", error);
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
          <h1 className="trello-home">Trellify</h1>
        </div>
      </div>
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <h3>Sign Up</h3>

          {showAlert && <p className="alert">{alert}</p>}

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
              Have an account?
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
