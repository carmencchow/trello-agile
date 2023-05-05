import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import AddBoard from "./AddBoard";
import Navbar from "./Navbar";
import "./Workspaces.css";

const Workspaces = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [boardData, setBoardData] = useState("");

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("http://localhost:5000/api/user/me");
      setUserInfo(res.data);
      console.log(
        "Displaying user boards:",
        res.data.boards.map((board) => {
          return board._id;
        })
      );
    } catch (error) {
      throw error;
    }
  };

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
    console.log("Board:", id);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Navbar />
      {userInfo ? (
        <div className="greeting">
          👋 Hi, <strong>{userInfo.username}!</strong>
          <div className="boards-parent-container">
            {userInfo.boards.length > 0 ? (
              userInfo.boards.map((board, index) => {
                return (
                  <div key={board._id} className="boards-container">
                    <div
                      className="boards"
                      style={{
                        backgroundImage: `url(${
                          "/assets/" + board.background
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        height: "170px",
                        width: "230px",
                      }}
                      onClick={() => goToBoard(board._id)}
                    >
                      <h5 className="title">{board.title}</h5>
                    </div>
                  </div>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
          <h3 className="heading"> Create a board:</h3>
          <div className="container">
            <div className="newboard">
              <AddBoard />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>You're not logged in</h1>
          <Button component={Link} to="/login" variant="contained">
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Workspaces;
