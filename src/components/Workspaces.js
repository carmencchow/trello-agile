import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Workspaces = () => {
  const [userInfo, setUserInfo] = useState("");

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div className="user-panel">
          {userInfo ? (
            <div>
              <div className="logout-btn">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </div>
              <div>
                Hi, <strong>{userInfo.username}!</strong>
                <p>Your boards:</p>
                {userInfo.boards.length > 0 ? (
                  userInfo.boards.map((board, index) => {
                    return (
                      <div key={index}>
                        <h5>{board.title}</h5>
                      </div>
                    );
                  })
                ) : (
                  <p>You don't have any boards, yet.</p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h1>You're not logged in!</h1>
              <Button component={Link} to="/login" variant="contained">
                Log In
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
