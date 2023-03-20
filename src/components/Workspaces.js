import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
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

export default Workspaces;
