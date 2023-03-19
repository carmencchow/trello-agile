import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [token, setToken] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const challenge = { email: email, password: password };
    axios
      .post("http://localhost:5000/api/user/login", challenge)
      .then((res) => setToken(res.data.token));

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const getUserProfile = async () => {
      axios
        .get("http://localhost:5000/api/user/me", {
          headers: {
            token: `${token}`,
          },
        })
        .then((res) => setUserInfo(res.data))
        .catch((error) => console.log(error));

      // .then((res) => console.log(res));
    };
    if (token) {
      getUserProfile();
    }
  }, [token]);

  // const getUserProfile = async () => {
  //   axios
  //     .get("http://localhost:5000/api/user/me", {
  //       headers: {
  //         token: `${token}`,
  //       },
  //     })
  //     .then((res) => setUserInfo(res.data))
  //     .catch((error) => console.log(error));

  //   // .then((res) => console.log(res));
  // };

  // const userPanel = userInfo.map((item, index) => {
  //   return (
  //     <div key={index}>
  //       <h1>Welcome {item.username}</h1>
  //     </div>
  //   );
  // });

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
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
      </form>
      {/* user profile if user exists */}
      <div>
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
  );
};

export default Login;
