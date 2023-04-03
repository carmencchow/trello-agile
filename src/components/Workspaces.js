import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AddBoard from './AddBoard';
import axios from "axios";
import "./Workspaces.css";

const Workspaces = ({ listId, id, handleFetchData }) => {
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    getUserProfile();
  }, []);

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
    console.log(id);
  };

  return (
    <div>
      <Navbar />
      <div>
        {userInfo ? (
          <div>
            <div>
              Hi, <strong>{userInfo.username}!</strong>
              <div className="boards-container">
              {userInfo.boards.length > 0 ? (
                userInfo.boards.map((board, index) => {
                  return (
                    <div key={board._id} className="boards-container">
                      <div
                        className="boards"
                        onClick={() => goToBoard(board._id)}
                      >
                        <h5 className="title">{board.title}</h5>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>You don't have any boards, yet.</p>
              )}
            </div>
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

        <h3 className="heading"> Create a board:</h3>    
      
        <div className="container">
          <div className="newboard" >
            <AddBoard
              listId={listId}
              id={id}
              handleFetchData={handleFetchData}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Workspaces;
