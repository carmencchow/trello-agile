import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css"; // import your css file
import Navbar from "./Navbar";

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
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Email:</label>
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
          <button type="submit">Log in</button>
          {serverResponse && (
            <p className="error-message">{serverResponse.message}</p>
          )}
        </form>
        {/* user profile if user exists */}
        <div className="user-panel">
          {/* This will be used in the workspaces section */}
          {userInfo && (
            <div>
              Hi, {userInfo.username}!<h4>Your boards:</h4>
              {userInfo.boards.length > 0 ? (
                userInfo.boards.map((board, index) => {
                  return (
                    <div key={index}>
                      <h5>{board.title}</h5>
                    </div>
                  );
                })
              ) : (
                <p>"You don't have any boards, yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
