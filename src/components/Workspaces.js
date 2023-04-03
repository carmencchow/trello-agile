import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "./Workspaces.css";

const Workspaces = ({ listId, id, handleFetchData }) => {
  const [userInfo, setUserInfo] = useState("");
  const [openNewCard, setOpenNewCard] = useState(false);
  const [input, setInput] = useState("");

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

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleNewBoard = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = axios.post('http://localhost:5000/api/board/',

        { title: `${input}` },

        { method: "POST", headers: { "Content-Type": "application/json",}, }
      
      );
      
      const data = res.data;
      console.log('New board', data);
      handleFetchData();
    } catch (err) {
      console.log(err);
    }
  }

  const createBoard = () => {
    console.log('Creating your board');
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
              <p>Example boards:</p>
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

      <div className="container">    
        <div className="newboard" onClick={handleInput}><p>Add new board</p>
          <button className="createBtn" onClick={createBoard}>Create</button>
        </div>

        <div className="newboard" onClick={handleInput}><p>Add new board</p>
          <button className="createBtn" onClick={createBoard}>Create</button>
        </div>

        <div className="newboard" onClick={handleInput}><p>Add new board</p>
          <button className="createBtn" onClick={createBoard}>Create</button>
        </div>
        
      <div className="input-field" open={openNewCard}/>
        {!openNewCard ? (
          // <div className="add-board" onClick={() => {
          //   setOpenNewCard(true);
          // }}

          <div className="add-board" onClick={handleNewBoard}>
         + Add a board </div>
        ) : (
          <div className="card-btns"></div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
