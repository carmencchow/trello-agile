import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  useEffect(() => {
    const checkUser = async () => {
      if (isAuthenticated) {
        const response = await axios.get(
          `http://localhost:5000/api/user/verifyUser/${user.sub}`
        );
        const userExists = response.data;
        if (userExists) {
        } else {
          console.log("user exists in db");
        }
      }
    };
    checkUser();
  }, [isAuthenticated, user]);

  return (
    <div>
      <h2>Authentication</h2>
      <ul>
        <li>
          <button onClick={loginWithPopup}>Login with Popup</button>
        </li>
        <li>
          <button onClick={loginWithRedirect}>Login with Redirect</button>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <p> User is {isAuthenticated ? "Logged in" : "Not logged in"}</p>
      {isAuthenticated && <p>{JSON.stringify(user, null, 2)}</p>}
    </div>
  );
};

export default Profile;
